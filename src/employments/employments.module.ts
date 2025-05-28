import { Module } from '@nestjs/common';
import { EmploymentsService } from './employments.service';
import { EmploymentsController } from './employments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employment } from './entities/employment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Employment])],
  controllers: [EmploymentsController],
  providers: [EmploymentsService],
})
export class EmploymentsModule {}
