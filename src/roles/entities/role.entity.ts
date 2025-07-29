import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntityWithSoftDelete } from 'src/common/entity/base-entity';
import { Permission } from 'src/permissions/entities/permissions.entity';
import { User } from 'src/user/entities/user.entity';

@Entity()
export class Role extends BaseEntityWithSoftDelete {
  @Column()
  name: string;

  @Column()
  code: string;

  @ManyToMany(() => Permission)
  @JoinTable({ name: 'role_permissions' })
  permissions: Permission[];

  @ManyToMany(() => User, (user) => user.roles)
  users: User[];
}
