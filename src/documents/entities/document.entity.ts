import { BaseEntityWithSoftDelete } from 'src/common/entity/base-entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { DocumentType } from 'src/document-types/entities/document-type.entity';

@Entity()
export class Document extends BaseEntityWithSoftDelete {
  @Column({ nullable: false })
  userId: string;

  @Column({ nullable: false })
  documentTypeId: string;

  @Column({ nullable: false })
  documentNumber: string;

  @Column({ type: 'date', nullable: false })
  issueDate: Date;

  @Column({ type: 'date', nullable: true })
  expiryDate: Date;

  @Column({ nullable: true })
  imageUrl: string;

  @ManyToOne(() => User, (user) => user.documents, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => DocumentType, (documentType) => documentType.documents, {
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'documentTypeId' })
  documentType: DocumentType;
}
