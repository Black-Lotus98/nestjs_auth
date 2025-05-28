import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { DriversService } from './drivers.service';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import {
  CreateDriverSwagger,
  DeleteDriverSwagger,
  GetAllDriversSwagger,
  GetDriverByIdSwagger,
  GetDriverByNationalIdSwagger,
  UpdateDriverSwagger,
} from './drivers.swagger';
import { DriverFilterDto } from './dto/driver-filter.dto';

@Controller('drivers')
export class DriversController {
  constructor(private readonly driversService: DriversService) {}

  @Post()
  @CreateDriverSwagger()
  create(@Body() createDriverDto: CreateDriverDto) {
    return this.driversService.create(createDriverDto);
  }

  @Get()
  @GetAllDriversSwagger()
  findAll(@Query() filter: DriverFilterDto) {
    return this.driversService.findAll(filter);
  }

  @Get(':id')
  @GetDriverByIdSwagger()
  findOne(@Param('id') id: string) {
    return this.driversService.findOne(id);
  }

  @Patch(':id')
  @UpdateDriverSwagger()
  update(@Param('id') id: string, @Body() updateDriverDto: UpdateDriverDto) {
    return this.driversService.update(id, updateDriverDto);
  }

  @Delete(':id')
  @DeleteDriverSwagger()
  remove(@Param('id') id: string) {
    return this.driversService.remove(id);
  }

  @Get('national-id/:nationalId')
  @GetDriverByNationalIdSwagger()
  findByNationalId(@Param('nationalId') nationalId: string) {
    return this.driversService.findByNationalId(nationalId);
  }
}
