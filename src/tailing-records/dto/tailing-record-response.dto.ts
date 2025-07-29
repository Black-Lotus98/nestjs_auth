import { ApiProperty } from '@nestjs/swagger';

export class TailingRecordResponseDto {
  @ApiProperty({ description: 'The tailing record ID' })
  id: string;

  @ApiProperty({ description: 'The driver ID' })
  driverId: string;

  @ApiProperty({ description: 'The inspection date' })
  inspectionDate: Date;

  @ApiProperty({ description: 'Start time of the tailing' })
  startTime: string;

  @ApiProperty({ description: 'End time of the tailing' })
  endTime: string;

  @ApiProperty({ description: 'Starting place of the tailing' })
  startPlace: string;

  @ApiProperty({ description: 'Finishing place of the tailing' })
  finishPlace: string;

  @ApiProperty({ description: 'Distance traveled in kilometers' })
  distance: number;

  @ApiProperty({ description: 'Additional notes about the tailing record' })
  notes: string;

  @ApiProperty({ description: 'Creation date' })
  createdAt: Date;

  @ApiProperty({ description: 'Last update date' })
  updatedAt: Date;
}
