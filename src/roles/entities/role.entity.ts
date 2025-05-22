import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntityWithSoftDelete } from 'src/common/entity/base-entity';
import { Permission } from 'src/permissions/entities/permissions.entity';

@Entity()
export class Role extends BaseEntityWithSoftDelete {
  @Column()
  name: string;

  @Column()
  code: string;

  @ManyToMany(() => Permission)
  @JoinTable()
  permissions: Permission[];
}
