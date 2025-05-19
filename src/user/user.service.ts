import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ILike, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UserFilterDto } from './dto/user-filter.dto';
import { UserResponse } from 'src/common/responses/user.response';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  async findAll(filter: UserFilterDto): Promise<{
    data: User[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    const { page, limit, sort, sortBy, ...filterData } = filter;
    const skip = (page - 1) * limit;
    const take = limit;
    const query = this.userRepository.createQueryBuilder('user');

    // Dynamically build WHERE clauses
    Object.keys(filterData).forEach((key) => {
      if (filterData[key]) {
        query.andWhere(`user.${key} LIKE :${key}`, {
          [key]: `%${filterData[key]}%`,
        });
      }
    });

    const [users, total] = await query
      .skip(skip)
      .take(take)
      .orderBy(`user.${sortBy}`, sort)
      .getManyAndCount();

    if (users.length === 0) {
      throw new NotFoundException('No users found');
    }

    return {
      data: users,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findUserById(id: string): Promise<UserResponse> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findUserByEmail(email: string): Promise<any> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findUserByUsername(username: string): Promise<any> {
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return this.userRepository.save({ ...updateUserDto, id });
  }

  remove(id: string): Promise<DeleteResult> {
    return this.userRepository.softDelete(id);
  }
}
