import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ILike, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UserFilterDto } from './dto/user-filter.dto';
import { UserResponse } from 'src/common/responses/user.response';
import { RolesService } from 'src/roles/roles.service';
import { PermissionsService } from 'src/permissions/permissions.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private rolesService: RolesService,
    private permissionsService: PermissionsService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { roleIds, permissionIds, ...userData } = createUserDto;
    const user = this.userRepository.create(userData);
    const savedUser = await this.userRepository.save(user);

    if (!roleIds?.length) {
      let defaultRole = await this.rolesService.findByCode('user');

      if (!defaultRole) {
        defaultRole = await this.rolesService.create({
          name: 'User',
          code: 'user',
          description: 'Default user role',
        });
      }

      await this.rolesService.assignRoleToUser(savedUser.id, defaultRole.id);
    } else {
      for (const roleId of roleIds) {
        await this.rolesService.assignRoleToUser(savedUser.id, roleId);
      }
    }

    if (permissionIds?.length) {
      for (const permissionId of permissionIds) {
        await this.permissionsService.assignDirectPermissionToUser(
          savedUser.id,
          permissionId,
        );
      }
    }

    return this.findUserById(savedUser.id);
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
    const query = this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.roles', 'roles')
      .leftJoinAndSelect('user.permissions', 'permissions');

    Object.keys(filterData).forEach((key) => {
      if (filterData[key]) {
        if (key === 'role') {
          query.andWhere('roles.name LIKE :role', {
            role: `%${filterData[key]}%`,
          });
        } else if (key === 'permission') {
          query.andWhere('permissions.name LIKE :permission', {
            permission: `%${filterData[key]}%`,
          });
        } else {
          query.andWhere(`user.${key} LIKE :${key}`, {
            [key]: `%${filterData[key]}%`,
          });
        }
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
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['roles', 'permissions'],
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findUserByEmail(email: string): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { email },
      relations: ['roles', 'permissions'],
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findUserByUsername(username: string): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { username },
      relations: ['roles', 'permissions'],
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserResponse> {
    const { roleIds, permissionIds, ...userData } = updateUserDto;
    const user = await this.userRepository.save({ ...userData, id });

    if (roleIds) {
      const existingUser = await this.userRepository.findOne({
        where: { id },
        relations: ['roles'],
      });
      for (const role of existingUser?.roles || []) {
        await this.rolesService.removeRoleFromUser(id, role.id);
      }
      for (const roleId of roleIds) {
        await this.rolesService.assignRoleToUser(id, roleId);
      }
    }

    if (permissionIds) {
      const existingUser = await this.userRepository.findOne({
        where: { id },
        relations: ['permissions'],
      });
      for (const permission of existingUser?.permissions || []) {
        await this.permissionsService.removeDirectPermissionFromUser(
          id,
          permission.id,
        );
      }
      for (const permissionId of permissionIds) {
        await this.permissionsService.assignDirectPermissionToUser(
          id,
          permissionId,
        );
      }
    }

    return this.findUserById(id);
  }

  remove(id: string): Promise<DeleteResult> {
    return this.userRepository.softDelete(id);
  }
}
