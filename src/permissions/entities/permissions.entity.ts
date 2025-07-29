// permission.entity.ts
import { BaseEntityWithSoftDelete } from 'src/common/entity/base-entity';
import { Role } from 'src/roles/entities/role.entity';
import { User } from 'src/user/entities/user.entity';
import { Entity, Column, ManyToMany } from 'typeorm';

@Entity()
export class Permission extends BaseEntityWithSoftDelete {
  @Column()
  name: string;

  @Column()
  code: string;

  @ManyToMany(() => Role)
  roles: Role[];

  @ManyToMany(() => User)
  users: User[];
}
