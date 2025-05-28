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

@Controller('employments')
export class EmploymentsController {
  constructor(private readonly EmploymentsService: EmploymentsService) {}

  @Post()
  @CreateEmploymentSwagger()
  create(@Body() createEmploymentDto: CreateEmploymentDto) {
    return this.EmploymentsService.create(createEmploymentDto);
  }

  @Get()
  @GetAllEmploymentsSwagger()
  findAll() {
    return this.EmploymentsService.findAll();
  }

  @Get(':id')
  @GetEmploymentByIdSwagger()
  findOne(@Param('id') id: string) {
    return this.EmploymentsService.findOne(id);
  }

  @Patch(':id')
  @UpdateEmploymentSwagger()
  update(
    @Param('id') id: string,
    @Body() updateEmploymentDto: UpdateEmploymentDto,
  ) {
    return this.EmploymentsService.update(id, updateEmploymentDto);
  }

  @Delete(':id')
  @DeleteEmploymentSwagger()
  remove(@Param('id') id: string) {
    return this.EmploymentsService.remove(id);
  }

  @Get('/employee/:employeeId')
  @GetEmploymentsByEmployeeIdSwagger()
  findByEmployeeId(@Param('employeeId') employeeId: string) {
    return this.EmploymentsService.findByEmployeeId(employeeId);
  }
}
