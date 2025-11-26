import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AccessToken, RoomServiceClient, TrackSource, DataPacket_Kind } from 'livekit-server-sdk';
import { ConfigService } from '@nestjs/config';
import { RoomsService } from '../rooms/rooms.service';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LivekitService {
  private readonly apiKey: string;
  private readonly apiSecret: string;
  private readonly livekitUrl: string;
  private readonly roomService: RoomServiceClient;

  constructor(private readonly configService: ConfigService, private readonly roomsService: RoomsService, private readonly prisma: PrismaService) {
    this.apiKey = this.configService.get<string>('LIVEKIT_API_KEY', '');
    this.apiSecret = this.configService.get<string>('LIVEKIT_API_SECRET', '');
    this.livekitUrl = this.configService.get<string>('LIVEKIT_URL', '');
    this.roomService = new RoomServiceClient(this.livekitUrl, this.apiKey, this.apiSecret);
  }

  async createAccessToken(userId: number, role: 'host' | 'participant', roomCode: string, displayName: string) {
    const room = await this.roomsService.getByCode(userId, roomCode).catch(async (err) => {
      if (role === 'participant') {
        const fallback = await this.prisma.room.findUnique({ where: { code: roomCode } });
        if (fallback) {
          return fallback;
        }
      }
      throw err;
    });

    if (role === 'host' && room.ownerId !== userId) {
      throw new UnauthorizedException('Only room owners can host');
    }

    const identity = `user:${userId}`;
    const token = new AccessToken(this.apiKey, this.apiSecret, {
      identity,
      name: displayName,
      ttl: 60 * 60,
    });
    token.addGrant({
      room: room.code,
      roomJoin: true,
      canPublish: true,
      canSubscribe: true,
      roomAdmin: role === 'host',
      canPublishSources: [TrackSource.MICROPHONE, TrackSource.SCREEN_SHARE, TrackSource.CAMERA],
    });

    return {
      livekitUrl: this.livekitUrl,
      token: await token.toJwt(),
      room,
    };
  }

  async mintServiceToken(roomCode: string, identity: string) {
    const token = new AccessToken(this.apiKey, this.apiSecret, {
      identity,
      name: identity,
      ttl: 60 * 60,
    });
    token.addGrant({ room: roomCode, roomJoin: true, canSubscribe: true });
    return token.toJwt();
  }

  async sendCaption(roomCode: string, payload: Uint8Array | string) {
    const data = typeof payload === 'string' ? Buffer.from(payload) : payload;
    await this.roomService.sendData(roomCode, data, DataPacket_Kind.RELIABLE, { destinationSids: [] });
  }
}
