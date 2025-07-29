import { ApiProperty } from '@nestjs/swagger';

export class TailingGradeResponseDto {
  @ApiProperty({ description: 'The tailing grade ID' })
  id: string;

  @ApiProperty({ description: 'The tailing record ID' })
  recordId: string;

  @ApiProperty({ description: 'The inspection detail ID' })
  itemId: string;

  @ApiProperty({ description: 'Score for this inspection item' })
  score: number;

  @ApiProperty({ description: 'Creation date' })
  createdAt: Date;

  @ApiProperty({ description: 'Last update date' })
  updatedAt: Date;
}
