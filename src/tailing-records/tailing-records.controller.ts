import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TailingRecordsService } from './tailing-records.service';
import { CreateTailingRecordDto } from './dto/create-tailing-record.dto';
import { UpdateTailingRecordDto } from './dto/update-tailing-record.dto';
import {
  CreateTailingRecordSwagger,
  DeleteTailingRecordSwagger,
  GetAllTailingRecordsSwagger,
  GetTailingRecordByIdSwagger,
  UpdateTailingRecordSwagger,
} from './tailing-records.swagger';
import { Permission } from 'src/common/enums/permission.enum';
import { Permissions } from 'src/auth/decorators/permissions.decorator';
import { JwtGuard } from 'src/common/guards/jwt.guard';
import { PermissionsGuard } from 'src/common/guards/permissions.guard';

@Controller('tailing-records')
@UseGuards(JwtGuard, PermissionsGuard)
export class TailingRecordsController {
  constructor(private readonly tailingRecordsService: TailingRecordsService) {}

  @Post()
  @Permissions(Permission.TAILING_RECORD_CREATE)
  @CreateTailingRecordSwagger()
  create(@Body() createTailingRecordDto: CreateTailingRecordDto) {
    return this.tailingRecordsService.create(createTailingRecordDto);
  }

  @Get()
  @Permissions(Permission.TAILING_RECORD_READ)
  @GetAllTailingRecordsSwagger()
  findAll() {
    return this.tailingRecordsService.findAll();
  }

  @Get(':id')
  @Permissions(Permission.TAILING_RECORD_READ)
  @GetTailingRecordByIdSwagger()
  findOne(@Param('id') id: string) {
    return this.tailingRecordsService.findOne(id);
  }

  @Patch(':id')
  @Permissions(Permission.TAILING_RECORD_UPDATE)
  @UpdateTailingRecordSwagger()
  update(
    @Param('id') id: string,
    @Body() updateTailingRecordDto: UpdateTailingRecordDto,
  ) {
    return this.tailingRecordsService.update(id, updateTailingRecordDto);
  }

  @Delete(':id')
  @Permissions(Permission.TAILING_RECORD_DELETE)
  @DeleteTailingRecordSwagger()
  remove(@Param('id') id: string) {
    return this.tailingRecordsService.remove(id);
  }
}
