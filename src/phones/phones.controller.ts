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
import { PhonesService } from './phones.service';
import { CreatePhoneDto } from './dto/create-phone.dto';
import { UpdatePhoneDto } from './dto/update-phone.dto';
import {
  CreatePhoneSwagger,
  DeletePhoneSwagger,
  GetAllPhonesSwagger,
  GetPhoneByIdSwagger,
  UpdatePhoneSwagger,
} from './phones.swagger';
import { PhonesFilterDto } from './dto/phones-filter.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Permission } from 'src/common/enums/permission.enum';
import { Permissions } from 'src/auth/decorators/permissions.decorator';

@Controller('phones')
export class PhonesController {
  constructor(private readonly phonesService: PhonesService) {}

  @Post()
  @Permissions(Permission.USER_CREATE)
  @CreatePhoneSwagger()
  create(@Body() createPhoneDto: CreatePhoneDto) {
    return this.phonesService.create(createPhoneDto);
  }

  @Get()
  @Permissions(Permission.PHONE_READ)
  @GetAllPhonesSwagger()
  @ApiBearerAuth('JWT-auth')
  findAll(@Query() filter: PhonesFilterDto) {
    return this.phonesService.findAll(filter);
  }

  @Get(':id')
  @Permissions(Permission.PHONE_READ)
  @GetPhoneByIdSwagger()
  @ApiBearerAuth('JWT-auth')
  findOne(@Param('id') id: string) {
    return this.phonesService.findOne(id);
  }

  @Patch(':id')
  @Permissions(Permission.PHONE_UPDATE)
  @UpdatePhoneSwagger()
  @ApiBearerAuth('JWT-auth')
  update(@Param('id') id: string, @Body() updatePhoneDto: UpdatePhoneDto) {
    return this.phonesService.update(id, updatePhoneDto);
  }

  @Delete(':id')
  @Permissions(Permission.PHONE_DELETE)
  @DeletePhoneSwagger()
  @ApiBearerAuth('JWT-auth')
  remove(@Param('id') id: string) {
    return this.phonesService.remove(id);
  }
}
