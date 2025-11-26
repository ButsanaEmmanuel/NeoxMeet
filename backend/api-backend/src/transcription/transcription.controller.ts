import { Controller, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { AccessTokenGuard } from '../common/guards/access-token.guard';
import { TranscriptionService } from './transcription.service';

@ApiTags('transcription')
@ApiBearerAuth()
@UseGuards(AccessTokenGuard)
@Controller('rooms/:code/transcription')
export class TranscriptionController {
  constructor(private readonly transcriptionService: TranscriptionService) {}

  @Post('start')
  start(@CurrentUser('userId') userId: number, @Param('code') code: string) {
    return this.transcriptionService.startTranscription(userId, code);
  }

  @Post('stop')
  stop(@CurrentUser('userId') userId: number, @Param('code') code: string) {
    return this.transcriptionService.stopTranscription(userId, code);
  }
}
