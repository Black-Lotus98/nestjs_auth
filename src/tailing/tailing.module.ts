import { Module } from '@nestjs/common';
import { TailingService } from './tailing.service';
import { TailingController } from './tailing.controller';

@Module({
  controllers: [TailingController],
  providers: [TailingService],
})
export class TailingModule {}
