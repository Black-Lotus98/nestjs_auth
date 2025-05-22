import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from './entities/permissions.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(name: string): Promise<Permission> {
    const permission = this.permissionRepository.create({ name });
    return this.permissionRepository.save(permission);
  }

  async findAll(): Promise<Permission[]> {
    return this.permissionRepository.find();
  }

  async findOne(id: string): Promise<Permission> {
    const permission = await this.permissionRepository.findOne({
      where: { id },
    });
    if (!permission) {
      throw new NotFoundException(`Permission with ID ${id} not found`);
    }
    return permission;
  }

  async findByName(name: string): Promise<Permission> {
    const permission = await this.permissionRepository.findOne({
      where: { name },
    });
    if (!permission) {
      throw new NotFoundException(`Permission with name ${name} not found`);
    }
    return permission;
  }

  async update(id: string, name: string): Promise<Permission> {
    const permission = await this.findOne(id);
    permission.name = name;
    return this.permissionRepository.save(permission);
  }

  async remove(id: string): Promise<void> {
    const permission = await this.findOne(id);
    await this.permissionRepository.remove(permission);
  }

  async assignDirectPermissionToUser(
    userId: string,
    permissionId: string,
  ): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['permissions'],
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const permission = await this.findOne(permissionId);
    user.permissions = [...user.permissions, permission];
    return this.userRepository.save(user);
  }

  async removeDirectPermissionFromUser(
    userId: string,
    permissionId: string,
  ): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['permissions'],
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    user.permissions = user.permissions.filter(
      (permission) => permission.id !== permissionId,
    );
    return this.userRepository.save(user);
  }

  async getUserPermissions(userId: string): Promise<Permission[]> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['permissions', 'roles', 'roles.permissions'],
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    // Get direct permissions
    const directPermissions = user.permissions;

    // Get permissions from roles
    const rolePermissions = user.roles.flatMap((role) => role.permissions);

    // Combine and remove duplicates
    const allPermissions = [...directPermissions, ...rolePermissions];
    const uniquePermissions = Array.from(
      new Map(allPermissions.map((p) => [p.id, p])).values(),
    );

    return uniquePermissions;
  }
}
