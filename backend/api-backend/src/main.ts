import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import cors from 'cors';
import { json, urlencoded } from 'express';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ZodValidationPipe } from './common/pipes/zod-validation.pipe';
import { Logger as PinoLogger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  const logger = app.get(PinoLogger);
  app.useLogger(logger);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('app.port', 3000);
  const globalPrefix = configService.get<string>('app.prefix', '');
  if (globalPrefix) {
    app.setGlobalPrefix(globalPrefix);
  }

  app.use(helmet());
  app.use(cors({ origin: true, credentials: true }));
  app.use(
    json({
      limit: '10mb',
      verify: (req: any, _res, buf) => {
        req.rawBody = buf;
      },
    }),
  );
  app.use(urlencoded({ extended: true }));

  app.useGlobalPipes(new ZodValidationPipe());

  const swaggerConfig = new DocumentBuilder()
    .setTitle('NeoxMeet API')
    .setDescription('LiveKit-first meeting backend with AI capabilities')
    .setVersion('0.1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document);

  await app.listen(port, () => {
    Logger.log(`🚀 API is running on http://localhost:${port}${globalPrefix ? `/${globalPrefix}` : ''}`);
  });
}

bootstrap();
