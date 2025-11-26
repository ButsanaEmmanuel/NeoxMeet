import { Body, Controller, Post, UploadedFile, UseGuards, UseInterceptors, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Response } from 'express';
import { AccessTokenGuard } from '../common/guards/access-token.guard';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { AiService } from './ai.service';
import type { RecapDto, TranslateDto, TtsDto, UploadedAudio } from './ai.dto';
import { recapSchema, translateSchema, ttsSchema } from './ai.dto';

@ApiTags('ai')
@ApiBearerAuth()
@UseGuards(AccessTokenGuard)
@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('transcribe')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('audio', {
      limits: { fileSize: 25 * 1024 * 1024 },
    }),
  )
  async transcribe(@UploadedFile() file: UploadedAudio, @Body('meetingSessionId') meetingSessionId?: string) {
    return this.aiService.transcribeAudio(file, meetingSessionId);
  }

  @Post('translate')
  translate(@Body(new ZodValidationPipe(translateSchema)) body: TranslateDto) {
    return this.aiService.translateText(body);
  }

  @Post('recap')
  recap(@Body(new ZodValidationPipe(recapSchema)) body: RecapDto) {
    return this.aiService.generateRecap(body);
  }

  @Post('tts')
  async tts(@Body(new ZodValidationPipe(ttsSchema)) body: TtsDto, @Res() res: Response) {
    const audio = await this.aiService.textToSpeech(body);
    res.setHeader('Content-Type', 'audio/mpeg');
    res.send(audio);
  }
}
