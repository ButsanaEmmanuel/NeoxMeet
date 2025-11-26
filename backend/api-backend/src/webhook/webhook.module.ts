import { Module } from '@nestjs/common';
import { WebhookController } from './webhook.controller';
import { LivekitWebhookController } from './livekit-webhook.controller';

@Module({
  controllers: [LivekitWebhookController, WebhookController],
})
export class WebhookModule {}
