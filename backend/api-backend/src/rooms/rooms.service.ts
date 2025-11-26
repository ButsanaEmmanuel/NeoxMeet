import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { nanoid } from 'nanoid';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRoomDto } from './rooms.dto';

@Injectable()
export class RoomsService {
  constructor(private readonly prisma: PrismaService) {}

  async createRoom(ownerId: number, dto: CreateRoomDto) {
    const code = nanoid(10).toLowerCase();
    return this.prisma.room.create({
      data: {
        code,
        title: dto.title,
        ownerId,
      },
    });
  }

  async listRooms(ownerId: number) {
    return this.prisma.room.findMany({ where: { ownerId }, orderBy: { createdAt: 'desc' } });
  }

  async getByCode(requestingUserId: number, code: string) {
    const room = await this.prisma.room.findUnique({ where: { code } });
    if (!room) {
      throw new NotFoundException('Room not found');
    }
    if (room.ownerId !== requestingUserId) {
      throw new UnauthorizedException('Not allowed to view this room');
    }
    return room;
  }
}
