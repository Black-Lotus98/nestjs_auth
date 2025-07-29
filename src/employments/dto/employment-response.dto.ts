import { ApiProperty } from '@nestjs/swagger';

export class EmploymentResponseDto {
  @ApiProperty({ description: 'The employment ID' })
  id: string;

  @ApiProperty({ description: 'The user ID' })
  userId: string;

  @ApiProperty({ description: 'Employment start date' })
  startDate: Date;

  @ApiProperty({ description: 'Employment end date' })
  endDate: Date;

  @ApiProperty({ description: 'Creation date' })
  createdAt: Date;

  @ApiProperty({ description: 'Last update date' })
  updatedAt: Date;
}
