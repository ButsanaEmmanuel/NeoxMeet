import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Queue } from 'bullmq';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { LivekitService } from '../livekit/livekit.service';

export interface TranscriptionJobData {
  roomCode: string;
  meetingSessionId: string;
  serviceToken: string;
  livekitUrl: string;
  action: 'start' | 'stop';
}

@Injectable()
export class TranscriptionService {
  private readonly queue: Queue<TranscriptionJobData>;

  constructor(private readonly config: ConfigService, private readonly prisma: PrismaService, private readonly livekit: LivekitService) {
    const redisUrl = this.config.get<string>('REDIS_URL');
    this.queue = new Queue<TranscriptionJobData>('transcription-jobs', {
      connection: { url: redisUrl },
    });
  }

  async startTranscription(userId: number, roomCode: string) {
    const room = await this.prisma.room.findUnique({ where: { code: roomCode } });
    if (!room) {
      throw new NotFoundException('Room not found');
    }
    if (room.ownerId !== userId) {
      throw new UnauthorizedException('Only the owner can start transcription');
    }

    const activeSession = await this.prisma.meetingSession.findFirst({ where: { roomId: room.id, endedAt: null } });
    const meetingSession =
      activeSession ||
      (await this.prisma.meetingSession.create({
        data: {
          roomId: room.id,
          startedAt: new Date(),
        },
      }));

    const serviceToken = await this.livekit.mintServiceToken(room.code, 'transcriber-bot');
    await this.queue.add('start', {
      roomCode: room.code,
      meetingSessionId: meetingSession.id,
      serviceToken,
      livekitUrl: this.config.get<string>('LIVEKIT_URL', ''),
      action: 'start',
    });

    return { meetingSessionId: meetingSession.id, status: 'queued' };
  }

  async stopTranscription(userId: number, roomCode: string) {
    const room = await this.prisma.room.findUnique({ where: { code: roomCode } });
    if (!room) {
      throw new NotFoundException('Room not found');
    }
    if (room.ownerId !== userId) {
      throw new UnauthorizedException('Only the owner can stop transcription');
    }

    const session = await this.prisma.meetingSession.findFirst({ where: { roomId: room.id, endedAt: null }, orderBy: { startedAt: 'desc' } });
    if (!session) {
      throw new NotFoundException('No active meeting session');
    }

    await this.prisma.meetingSession.update({ where: { id: session.id }, data: { endedAt: new Date() } });
    await this.queue.add('stop', {
      roomCode: room.code,
      meetingSessionId: session.id,
      serviceToken: '',
      livekitUrl: this.config.get<string>('LIVEKIT_URL', ''),
      action: 'stop',
    });

    return { meetingSessionId: session.id, status: 'stopping' };
  }
}
