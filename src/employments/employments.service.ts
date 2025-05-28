import { Injectable } from '@nestjs/common';
import { CreateEmploymentDto } from './dto/create-employment.dto';
import { UpdateEmploymentDto } from './dto/update-employment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employment } from './entities/employment.entity';

@Injectable()
export class EmploymentsService {
  constructor(
    @InjectRepository(Employment)
    private employmentRepository: Repository<Employment>,
  ) {}

  async create(createEmploymentDto: CreateEmploymentDto) {
    const employment = this.employmentRepository.create(createEmploymentDto);
    const savedEmployment = await this.employmentRepository.save(employment);
    return savedEmployment;
  }

  async findAll() {
    return await this.employmentRepository.find();
  }

  async findOne(id: string) {
    return await this.employmentRepository.findOne({ where: { id } });
  }

  async update(id: string, updateEmploymentDto: UpdateEmploymentDto) {
    return await this.employmentRepository.update(id, updateEmploymentDto);
  }

  async remove(id: string) {
    return await this.employmentRepository.softDelete(id);
  }

  async findByEmployeeId(employeeId: string) {
    return await this.employmentRepository.find({ where: { employeeId } });
  }
}
