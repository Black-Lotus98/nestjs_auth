import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EmploymentsService } from './employments.service';
import { CreateEmploymentDto } from './dto/create-employment.dto';
import { UpdateEmploymentDto } from './dto/update-employment.dto';
import {
  CreateEmploymentSwagger,
  DeleteEmploymentSwagger,
  GetAllEmploymentsSwagger,
  GetEmploymentByIdSwagger,
  GetEmploymentsByEmployeeIdSwagger,
  UpdateEmploymentSwagger,
} from './employments.swagger';
import { Permission } from 'src/common/enums/permission.enum';
import { Permissions } from 'src/auth/decorators/permissions.decorator';

@Controller('employments')
export class EmploymentsController {
  constructor(private readonly EmploymentsService: EmploymentsService) {}

  @Post()
  @Permissions(Permission.EMPLOYMENT_CREATE)
  @CreateEmploymentSwagger()
  create(@Body() createEmploymentDto: CreateEmploymentDto) {
    return this.EmploymentsService.create(createEmploymentDto);
  }

  @Get()
  @Permissions(Permission.EMPLOYMENT_READ)
  @GetAllEmploymentsSwagger()
  findAll() {
    return this.EmploymentsService.findAll();
  }

  @Get(':id')
  @Permissions(Permission.EMPLOYMENT_READ)
  @GetEmploymentByIdSwagger()
  findOne(@Param('id') id: string) {
    return this.EmploymentsService.findOne(id);
  }

  @Patch(':id')
  @Permissions(Permission.EMPLOYMENT_UPDATE)
  @UpdateEmploymentSwagger()
  update(
    @Param('id') id: string,
    @Body() updateEmploymentDto: UpdateEmploymentDto,
  ) {
    return this.EmploymentsService.update(id, updateEmploymentDto);
  }

  @Delete(':id')
  @Permissions(Permission.EMPLOYMENT_DELETE)
  @DeleteEmploymentSwagger()
  remove(@Param('id') id: string) {
    return this.EmploymentsService.remove(id);
  }

  @Get('/employee/:employeeId')
  @Permissions(Permission.EMPLOYMENT_READ)
  @GetEmploymentsByEmployeeIdSwagger()
  findByEmployeeId(@Param('employeeId') employeeId: string) {
    return this.EmploymentsService.findByEmployeeId(employeeId);
  }
}
