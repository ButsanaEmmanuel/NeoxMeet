import { NestFactory } from '@nestjs/core';
import { Worker } from 'bullmq';
import { Logger } from '@nestjs/common';
import { AppModule } from '../app.module';
import { TranscriptionJobData } from '../transcription/transcription.service';
import { ConfigService } from '@nestjs/config';
import { LivekitService } from '../livekit/livekit.service';
import { PrismaService } from '../prisma/prisma.service';

async function bootstrapWorker() {
  const app = await NestFactory.createApplicationContext(AppModule, { bufferLogs: true });
  const config = app.get(ConfigService);
  const livekit = app.get(LivekitService);
  const prisma = app.get(PrismaService);
  const logger = new Logger('TranscriberWorker');

  const worker = new Worker<TranscriptionJobData>(
    'transcription-jobs',
    async (job) => {
      logger.log(`Processing ${job.name} for room ${job.data.roomCode}`);
      if (job.data.action === 'stop') {
        await livekit.sendCaption(job.data.roomCode, Buffer.from(JSON.stringify({ type: 'transcriber-status', status: 'stopped' })));
        return { status: 'stopped' };
      }

      await prisma.transcriptSegment.create({
        data: {
          meetingSessionId: job.data.meetingSessionId,
          speakerIdentity: 'transcriber-bot',
          lang: 'auto',
          startMs: 0,
          endMs: 0,
          text: 'Transcriber bot is active. Real-time audio streaming will be captured from LiveKit participants.',
        },
      });

      await livekit.sendCaption(
        job.data.roomCode,
        Buffer.from(
          JSON.stringify({
            type: 'transcriber-status',
            status: 'listening',
            meetingSessionId: job.data.meetingSessionId,
          }),
        ),
      );

      return { status: 'listening' };
    },
    { connection: { url: config.get<string>('REDIS_URL') } },
  );

  worker.on('completed', (job) => logger.log(`Job ${job.id} completed`));
  worker.on('failed', (job, err) => logger.error(`Job ${job?.id} failed: ${err?.message}`));
}

bootstrapWorker();
