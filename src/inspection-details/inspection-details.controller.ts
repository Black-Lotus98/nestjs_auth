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
import { InspectionDetailsService } from './inspection-details.service';
import { CreateInspectionDetailDto } from './dto/create-inspection-detail.dto';
import { UpdateInspectionDetailDto } from './dto/update-inspection-detail.dto';
import {
  CreateInspectionDetailSwagger,
  DeleteInspectionDetailSwagger,
  GetAllInspectionDetailsSwagger,
  GetInspectionDetailByIdSwagger,
  UpdateInspectionDetailSwagger,
} from './inspection-details.swagger';
import { Permission } from 'src/common/enums/permission.enum';
import { Permissions } from 'src/auth/decorators/permissions.decorator';
import { JwtGuard } from 'src/common/guards/jwt.guard';
import { PermissionsGuard } from 'src/common/guards/permissions.guard';

@Controller('inspection-details')
@UseGuards(JwtGuard, PermissionsGuard)
export class InspectionDetailsController {
  constructor(
    private readonly inspectionDetailsService: InspectionDetailsService,
  ) {}

  @Post()
  @Permissions(Permission.INSPECTION_DETAIL_CREATE)
  @CreateInspectionDetailSwagger()
  create(@Body() createInspectionDetailDto: CreateInspectionDetailDto) {
    return this.inspectionDetailsService.create(createInspectionDetailDto);
  }

  @Get()
  @Permissions(Permission.INSPECTION_DETAIL_READ)
  @GetAllInspectionDetailsSwagger()
  findAll() {
    return this.inspectionDetailsService.findAll();
  }

  @Get(':id')
  @Permissions(Permission.INSPECTION_DETAIL_READ)
  @GetInspectionDetailByIdSwagger()
  findOne(@Param('id') id: string) {
    return this.inspectionDetailsService.findOne(id);
  }

  @Patch(':id')
  @Permissions(Permission.INSPECTION_DETAIL_UPDATE)
  @UpdateInspectionDetailSwagger()
  update(
    @Param('id') id: string,
    @Body() updateInspectionDetailDto: UpdateInspectionDetailDto,
  ) {
    return this.inspectionDetailsService.update(id, updateInspectionDetailDto);
  }

  @Delete(':id')
  @Permissions(Permission.INSPECTION_DETAIL_DELETE)
  @DeleteInspectionDetailSwagger()
  remove(@Param('id') id: string) {
    return this.inspectionDetailsService.remove(id);
  }
}
