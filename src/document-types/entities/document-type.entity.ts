import { BaseEntityWithSoftDelete } from 'src/common/entity/base-entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Document } from 'src/documents/entities/document.entity';

@Entity()
export class DocumentType extends BaseEntityWithSoftDelete {
  @Column({ nullable: false })
  type: string;

  @Column({ nullable: true })
  description: string;

  @OneToMany(() => Document, (document) => document.documentType)
  documents: Document[];
}
