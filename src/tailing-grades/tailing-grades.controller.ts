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
import { TailingGradesService } from './tailing-grades.service';
import { CreateTailingGradeDto } from './dto/create-tailing-grade.dto';
import { UpdateTailingGradeDto } from './dto/update-tailing-grade.dto';
import {
  CreateTailingGradeSwagger,
  DeleteTailingGradeSwagger,
  GetAllTailingGradesSwagger,
  GetTailingGradeByIdSwagger,
  UpdateTailingGradeSwagger,
} from './tailing-grades.swagger';
import { Permission } from 'src/common/enums/permission.enum';
import { Permissions } from 'src/auth/decorators/permissions.decorator';
import { JwtGuard } from 'src/common/guards/jwt.guard';
import { PermissionsGuard } from 'src/common/guards/permissions.guard';

@Controller('tailing-grades')
@UseGuards(JwtGuard, PermissionsGuard)
export class TailingGradesController {
  constructor(private readonly tailingGradesService: TailingGradesService) {}

  @Post()
  @Permissions(Permission.TAILING_GRADE_CREATE)
  @CreateTailingGradeSwagger()
  create(@Body() createTailingGradeDto: CreateTailingGradeDto) {
    return this.tailingGradesService.create(createTailingGradeDto);
  }

  @Get()
  @Permissions(Permission.TAILING_GRADE_READ)
  @GetAllTailingGradesSwagger()
  findAll() {
    return this.tailingGradesService.findAll();
  }

  @Get(':id')
  @Permissions(Permission.TAILING_GRADE_READ)
  @GetTailingGradeByIdSwagger()
  findOne(@Param('id') id: string) {
    return this.tailingGradesService.findOne(id);
  }

  @Patch(':id')
  @Permissions(Permission.TAILING_GRADE_UPDATE)
  @UpdateTailingGradeSwagger()
  update(
    @Param('id') id: string,
    @Body() updateTailingGradeDto: UpdateTailingGradeDto,
  ) {
    return this.tailingGradesService.update(id, updateTailingGradeDto);
  }

  @Delete(':id')
  @Permissions(Permission.TAILING_GRADE_DELETE)
  @DeleteTailingGradeSwagger()
  remove(@Param('id') id: string) {
    return this.tailingGradesService.remove(id);
  }
}
