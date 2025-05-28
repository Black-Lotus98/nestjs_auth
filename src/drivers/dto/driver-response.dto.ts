import { IsNotEmpty, IsString, IsOptional, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { EmploymentResponseDto } from 'src/employments/dto/employment-response.dto';

export class DriverResponseDto {
  @Expose()
  id: string;

  @Expose()
  nationalId: string;

  @Expose()
  firstName: string;

  @Expose()
  middleName: string;

  @Expose()
  lastName: string;

  @Expose()
  arabicName: string;

  @Expose()
  dateOfBirth: Date;

  @Expose()
  driverCode: string;

  @Expose()
  status: string;

  @Expose()
  phoneNumber: string;

  @Expose()
  truckExperience: string;

  @Expose()
  tankersExperience: string;

  @Expose()
  driverPhoto: string;

  @Expose()
  driverLicense: string;

  @Expose()
  employments: EmploymentResponseDto[];

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Exclude()
  deletedAt: Date;
}
