import { PartialType } from '@nestjs/swagger';
import { CreateTailingRecordDto } from './create-tailing-record.dto';

export class UpdateTailingRecordDto extends PartialType(
  CreateTailingRecordDto,
) {}
