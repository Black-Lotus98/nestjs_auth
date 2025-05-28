import { Module } from '@nestjs/common';
import { DriversService } from './drivers.service';
import { DriversController } from './drivers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Driver } from './entities/driver.entity';
import { EmploymentsService } from '../employments/employments.service';
import { Employment } from 'src/employments/entities/employment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Driver, Employment])],
  controllers: [DriversController],
  providers: [DriversService, EmploymentsService],
})
export class DriversModule {}
