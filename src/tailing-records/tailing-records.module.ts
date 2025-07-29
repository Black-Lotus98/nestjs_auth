import { Module } from '@nestjs/common';
import { TailingRecordsService } from './tailing-records.service';
import { TailingRecordsController } from './tailing-records.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TailingRecord } from './entities/tailing-record.entity';
import { Driver } from 'src/drivers/entities/driver.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TailingRecord, Driver])],
  controllers: [TailingRecordsController],
  providers: [TailingRecordsService],
  exports: [TailingRecordsService],
})
export class TailingRecordsModule {}
