import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePhoneDto } from './dto/create-phone.dto';
import { UpdatePhoneDto } from './dto/update-phone.dto';
import { Phone } from './entities/phone.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class PhonesService {
  constructor(
    @InjectRepository(Phone)
    private phonesRepository: Repository<Phone>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createPhoneDto: CreatePhoneDto) {
    // Check if user exists
    const user = await this.userRepository.findOne({
      where: { id: createPhoneDto.user_id },
    });

    if (!user) {
      throw new NotFoundException(
        `User with ID ${createPhoneDto.user_id} not found`,
      );
    }

    const phone = this.phonesRepository.create(createPhoneDto);
    return await this.phonesRepository.save(phone);
  }

  async findAll() {
    return await this.phonesRepository.find({
      relations: ['user'],
    });
  }

  async findOne(id: string) {
    const phone = await this.phonesRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!phone) {
      throw new NotFoundException(`Phone with ID ${id} not found`);
    }

    return phone;
  }

  async update(id: string, updatePhoneDto: UpdatePhoneDto) {
    const phone = await this.findOne(id);

    // Check if user exists if user_id is being updated
    if (updatePhoneDto.user_id) {
      const user = await this.userRepository.findOne({
        where: { id: updatePhoneDto.user_id },
      });

      if (!user) {
        throw new NotFoundException(
          `User with ID ${updatePhoneDto.user_id} not found`,
        );
      }
    }

    Object.assign(phone, updatePhoneDto);
    return await this.phonesRepository.save(phone);
  }

  async remove(id: string) {
    const phone = await this.findOne(id);
    return await this.phonesRepository.remove(phone);
  }
}
