import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntityWithSoftDelete } from 'src/common/entity/base-entity';
import { User } from 'src/user/entities/user.entity';

@Entity()
export class Phone extends BaseEntityWithSoftDelete {
  @Column({ nullable: false })
  phoneNumber: string;

  @Column({ nullable: false })
  phoneType: string;

  @Column({ nullable: true })
  isPrimary: boolean;

  @Column({ nullable: false })
  user_id: string;

  @ManyToOne(() => User, (user) => user.phones)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
