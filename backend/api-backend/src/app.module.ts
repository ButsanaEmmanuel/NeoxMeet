import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { LoggerModule } from 'nestjs-pino';
import crypto from 'node:crypto';
import { HealthModule } from './health/health.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { RoomsModule } from './rooms/rooms.module';
import { LivekitModule } from './livekit/livekit.module';
import { AiModule } from './ai/ai.module';
import { envValidationSchema } from './config/env.validation';
import { TranscriptionModule } from './transcription/transcription.module';
import { WebhookModule } from './webhook/webhook.module';
import { appConfig } from './config/app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: (config) => envValidationSchema.parse(config),
      load: [appConfig],
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        genReqId: (req) => req.headers['x-request-id'] || crypto.randomUUID(),
        transport: process.env.NODE_ENV !== 'production' ? { target: 'pino-pretty' } : undefined,
        autoLogging: true,
        customProps: (req) => ({
          requestId: req.id,
        }),
      },
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60,
        limit: 100,
      },
    ]),
    PrismaModule,
    HealthModule,
    AuthModule,
    RoomsModule,
    LivekitModule,
    AiModule,
    TranscriptionModule,
    WebhookModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
