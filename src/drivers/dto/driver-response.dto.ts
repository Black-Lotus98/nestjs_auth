import { ApiProperty } from '@nestjs/swagger';

export class DriverResponseDto {
  @ApiProperty({ description: 'The driver ID' })
  id: string;

  @ApiProperty({ description: 'The user ID' })
  userId: string;

  @ApiProperty({ description: 'The driver code' })
  driverCode: string;

  @ApiProperty({ description: 'The driver status' })
  status: string;

  @ApiProperty({ description: 'Truck experience' })
  truckExperience: string;

  @ApiProperty({ description: 'Tankers experience' })
  tankersExperience: string;

  @ApiProperty({ description: 'Driver photo URL' })
  driverPhoto: string;

  @ApiProperty({ description: 'Creation date' })
  createdAt: Date;

  @ApiProperty({ description: 'Last update date' })
  updatedAt: Date;
}
