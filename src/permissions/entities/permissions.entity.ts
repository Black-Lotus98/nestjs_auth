// permission.entity.ts
import { BaseEntityWithSoftDelete } from 'src/common/entity/base-entity';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Permission extends BaseEntityWithSoftDelete {
  @Column()
  name: string;

  @Column()
  code: string;
}
