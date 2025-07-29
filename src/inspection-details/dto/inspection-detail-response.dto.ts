import { ApiProperty } from '@nestjs/swagger';

export class InspectionDetailResponseDto {
  @ApiProperty({ description: 'The inspection detail ID' })
  id: string;

  @ApiProperty({ description: 'The inspection item name' })
  inspectionItem: string;

  @ApiProperty({ description: 'The inspection item description' })
  description: string;

  @ApiProperty({ description: 'Additional notes about the inspection item' })
  notes: string;

  @ApiProperty({ description: 'Maximum score for this inspection item' })
  maxScore: number;

  @ApiProperty({ description: 'Creation date' })
  createdAt: Date;

  @ApiProperty({ description: 'Last update date' })
  updatedAt: Date;
}
