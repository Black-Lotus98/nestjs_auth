import { PartialType } from '@nestjs/swagger';
import { CreateTailingDto } from './create-tailing.dto';

export class UpdateTailingDto extends PartialType(CreateTailingDto) {}
