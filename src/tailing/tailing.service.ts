import { Injectable } from '@nestjs/common';
import { CreateTailingDto } from './dto/create-tailing.dto';
import { UpdateTailingDto } from './dto/update-tailing.dto';

@Injectable()
export class TailingService {
  create(createTailingDto: CreateTailingDto) {
    return 'This action adds a new tailing';
  }

  findAll() {
    return `This action returns all tailing`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tailing`;
  }

  update(id: number, updateTailingDto: UpdateTailingDto) {
    return `This action updates a #${id} tailing`;
  }

  remove(id: number) {
    return `This action removes a #${id} tailing`;
  }
}
