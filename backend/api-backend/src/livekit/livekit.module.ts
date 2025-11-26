import { Module } from '@nestjs/common';
import { LivekitController } from './livekit.controller';
import { LivekitService } from './livekit.service';
import { RoomsModule } from '../rooms/rooms.module';

@Module({
  imports: [RoomsModule],
  controllers: [LivekitController],
  providers: [LivekitService],
  exports: [LivekitService],
})
export class LivekitModule {}
