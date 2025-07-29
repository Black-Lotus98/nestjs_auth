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
  UpdateDriverSwagger,
} from './drivers.swagger';
import { DriverFilterDto } from './dto/driver-filter.dto';
import { Permission } from 'src/common/enums/permission.enum';
import { Permissions } from 'src/auth/decorators/permissions.decorator';

@Controller('drivers')
export class DriversController {
  constructor(private readonly driversService: DriversService) {}

  @Post()
  @Permissions(Permission.DRIVER_CREATE)
  @CreateDriverSwagger()
  create(@Body() createDriverDto: CreateDriverDto) {
    return this.driversService.create(createDriverDto);
  }

  @Get()
  @Permissions(Permission.DRIVER_READ)
  @GetAllDriversSwagger()
  findAll(@Query() filter: DriverFilterDto) {
    return this.driversService.findAll(filter);
  }

  @Get(':id')
  @Permissions(Permission.DRIVER_READ)
  @GetDriverByIdSwagger()
  findOne(@Param('id') id: string) {
    return this.driversService.findOne(id);
  }

  @Patch(':id')
  @Permissions(Permission.DRIVER_UPDATE)
  @UpdateDriverSwagger()
  update(@Param('id') id: string, @Body() updateDriverDto: UpdateDriverDto) {
    return this.driversService.update(id, updateDriverDto);
  }

  @Delete(':id')
  @Permissions(Permission.DRIVER_DELETE)
  @DeleteDriverSwagger()
  remove(@Param('id') id: string) {
    return this.driversService.remove(id);
  }
}
