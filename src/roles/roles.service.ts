import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { Permission } from 'src/permissions/entities/permissions.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createRoleDto: {
    name: string;
    code: string;
    description?: string;
  }): Promise<Role> {
    const role = this.roleRepository.create(createRoleDto);
    return this.roleRepository.save(role);
  }

  async findAll(): Promise<Role[]> {
    return this.roleRepository.find({ relations: ['permissions'] });
  }

  async findOne(id: string): Promise<Role> {
    const role = await this.roleRepository.findOne({
      where: { id },
      relations: ['permissions'],
    });
    if (!role) {
      throw new NotFoundException(`Role with ID ${id} not found`);
    }
    return role;
  }

  async findByName(name: string): Promise<Role> {
    const role = await this.roleRepository.findOne({
      where: { name },
      relations: ['permissions'],
    });
    if (!role) {
      throw new NotFoundException(`Role with name ${name} not found`);
    }
    return role;
  }

  async update(id: string, name: string): Promise<Role> {
    const role = await this.findOne(id);
    role.name = name;
    return this.roleRepository.save(role);
  }

  async remove(id: string): Promise<void> {
    const role = await this.findOne(id);
    await this.roleRepository.remove(role);
  }

  async assignPermissions(
    roleId: string,
    permissionIds: string[],
  ): Promise<Role> {
    const role = await this.findOne(roleId);
    const permissions =
      await this.permissionRepository.findByIds(permissionIds);
    role.permissions = permissions;
    return this.roleRepository.save(role);
  }

  async removePermissions(
    roleId: string,
    permissionIds: string[],
  ): Promise<Role> {
    const role = await this.findOne(roleId);
    role.permissions = role.permissions.filter(
      (permission) => !permissionIds.includes(permission.id),
    );
    return this.roleRepository.save(role);
  }

  async assignRoleToUser(userId: string, roleId: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['roles'],
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const role = await this.findOne(roleId);
    user.roles = [...user.roles, role];
    return this.userRepository.save(user);
  }

  async removeRoleFromUser(userId: string, roleId: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['roles'],
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    user.roles = user.roles.filter((role) => role.id !== roleId);
    return this.userRepository.save(user);
  }

  async findByCode(code: string): Promise<Role | null> {
    return this.roleRepository.findOne({
      where: { code },
      relations: ['permissions'],
    });
  }
}
