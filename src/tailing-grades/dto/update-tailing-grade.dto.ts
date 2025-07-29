import { PartialType } from '@nestjs/swagger';
import { CreateTailingGradeDto } from './create-tailing-grade.dto';

export class UpdateTailingGradeDto extends PartialType(CreateTailingGradeDto) {}
