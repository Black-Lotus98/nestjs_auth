import { PartialType } from '@nestjs/swagger';
import { CreateInspectionDetailDto } from './create-inspection-detail.dto';

export class UpdateInspectionDetailDto extends PartialType(
  CreateInspectionDetailDto,
) {}
