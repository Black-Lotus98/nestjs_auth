import { Module } from '@nestjs/common';
import { InspectionDetailsService } from './inspection-details.service';
import { InspectionDetailsController } from './inspection-details.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InspectionDetail } from './entities/inspection-detail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InspectionDetail])],
  controllers: [InspectionDetailsController],
  providers: [InspectionDetailsService],
  exports: [InspectionDetailsService],
})
export class InspectionDetailsModule {}
