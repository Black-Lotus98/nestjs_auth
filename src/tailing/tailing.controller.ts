import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TailingService } from './tailing.service';
import { CreateTailingDto } from './dto/create-tailing.dto';
import { UpdateTailingDto } from './dto/update-tailing.dto';

@Controller('tailing')
export class TailingController {
  constructor(private readonly tailingService: TailingService) {}

  @Post()
  create(@Body() createTailingDto: CreateTailingDto) {
    return this.tailingService.create(createTailingDto);
  }

  @Get()
  findAll() {
    return this.tailingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tailingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTailingDto: UpdateTailingDto) {
    return this.tailingService.update(+id, updateTailingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tailingService.remove(+id);
  }
}
