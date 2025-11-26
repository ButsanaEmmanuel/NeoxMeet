import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { AccessTokenGuard } from '../common/guards/access-token.guard';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { LivekitService } from './livekit.service';
import type { LivekitTokenDto } from './livekit.dto';
import { livekitTokenSchema } from './livekit.dto';

@ApiTags('livekit')
@ApiBearerAuth()
@UseGuards(AccessTokenGuard)
@Controller('livekit')
export class LivekitController {
  constructor(private readonly livekitService: LivekitService) {}

  @Post('token')
  async issueToken(@CurrentUser('userId') userId: number, @Body(new ZodValidationPipe(livekitTokenSchema)) body: LivekitTokenDto) {
    return this.livekitService.createAccessToken(userId, body.role, body.roomCode, body.displayName);
  }
}
