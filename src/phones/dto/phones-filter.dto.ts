import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { FilterDto } from 'src/common/dto/filter.dto';

export class PhonesFilterDto extends FilterDto {
  @ApiPropertyOptional({
    description: 'Phone number',
    example: '0599999999',
  })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  phoneNumber: string;

  @ApiPropertyOptional({
    description: 'Phone type',
    example: 'mobile',
  })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  phoneType: string;

  @ApiPropertyOptional({
    description: 'Is primary',
    example: true,
  })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  isPrimary: boolean;

  @ApiPropertyOptional({
    description: 'User id',
    example: '1',
  })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  userId: string;
}
