import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { AccessTokenGuard } from '../common/guards/access-token.guard';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import type { CreateRoomDto } from './rooms.dto';
import { createRoomSchema } from './rooms.dto';
import { RoomsService } from './rooms.service';

@ApiTags('rooms')
@ApiBearerAuth()
@UseGuards(AccessTokenGuard)
@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post()
  create(@CurrentUser('userId') userId: number, @Body(new ZodValidationPipe(createRoomSchema)) body: CreateRoomDto) {
    return this.roomsService.createRoom(userId, body);
  }

  @Get()
  list(@CurrentUser('userId') userId: number) {
    return this.roomsService.listRooms(userId);
  }

  @Get(':code')
  getRoom(@CurrentUser('userId') userId: number, @Param('code') code: string) {
    return this.roomsService.getByCode(userId, code);
  }
}
