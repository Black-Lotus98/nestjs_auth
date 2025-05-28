import { Exclude, Expose } from 'class-transformer';

export class EmploymentResponseDto {
  @Expose()
  id: string;

  @Expose()
  driverId: string;

  @Expose()
  startDate: Date;

  @Expose()
  endDate: Date;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Exclude()
  deletedAt: Date;
}
