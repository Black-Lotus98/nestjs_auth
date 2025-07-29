import { BaseEntityWithSoftDelete } from 'src/common/entity/base-entity';
import { Column, ManyToOne, Entity, JoinColumn } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Entity()
export class Employment extends BaseEntityWithSoftDelete {
  @Column({ nullable: false })
  userId: string;

  @ManyToOne(() => User, (user) => user.employments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ type: 'date' })
  startDate: Date;

  @Column({ type: 'date', nullable: true })
  endDate: Date;
}
