import { Module } from '@nestjs/common';
import { LivekitModule } from '../livekit/livekit.module';
import { TranscriptionController } from './transcription.controller';
import { TranscriptionService } from './transcription.service';

@Module({
  imports: [LivekitModule],
  controllers: [TranscriptionController],
  providers: [TranscriptionService],
  exports: [TranscriptionService],
})
export class TranscriptionModule {}
