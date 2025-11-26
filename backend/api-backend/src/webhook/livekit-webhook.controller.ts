import { Body, Controller, Headers, Post, Req } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { WebhookEvent, WebhookReceiver } from 'livekit-server-sdk';
import { PrismaService } from '../prisma/prisma.service';

@Controller('webhooks')
export class LivekitWebhookController {
  private readonly receiver: WebhookReceiver;
  constructor(private readonly config: ConfigService, private readonly prisma: PrismaService) {
    this.receiver = new WebhookReceiver(
      this.config.get<string>('LIVEKIT_API_KEY', ''),
      this.config.get<string>('LIVEKIT_API_SECRET', ''),
    );
  }

  @Post('livekit')
  async handleWebhook(@Body() _body: any, @Headers('authorization') auth: string, @Req() req: any) {
    const event = (await this.receiver.receive(req.rawBody, auth)) as WebhookEvent;
    const roomCode = event?.room?.name;
    if (!roomCode) {
      return { received: true };
    }

    const room = await this.prisma.room.findUnique({ where: { code: roomCode } });
    if (!room) {
      return { received: true };
    }

    if (event.event === 'room_started' || event.event === 'participant_joined') {
      const existing = await this.prisma.meetingSession.findFirst({ where: { roomId: room.id, endedAt: null } });
      if (!existing) {
        await this.prisma.meetingSession.create({ data: { roomId: room.id, startedAt: new Date() } });
      }
    }

    if (event.event === 'room_finished' || event.event === 'participant_left') {
      const activeSession = await this.prisma.meetingSession.findFirst({ where: { roomId: room.id, endedAt: null } });
      if (activeSession) {
        await this.prisma.meetingSession.update({ where: { id: activeSession.id }, data: { endedAt: new Date() } });
      }
    }

    return { received: true };
  }
}
