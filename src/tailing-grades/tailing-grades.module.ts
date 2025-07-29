import { Module } from '@nestjs/common';
import { TailingGradesService } from './tailing-grades.service';
import { TailingGradesController } from './tailing-grades.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TailingGrade } from './entities/tailing-grade.entity';
import { TailingRecord } from 'src/tailing-records/entities/tailing-record.entity';
import { InspectionDetail } from 'src/inspection-details/entities/inspection-detail.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TailingGrade, TailingRecord, InspectionDetail]),
  ],
  controllers: [TailingGradesController],
  providers: [TailingGradesService],
  exports: [TailingGradesService],
})
export class TailingGradesModule {}
