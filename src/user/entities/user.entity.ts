import {
  BeforeInsert,
  Column,
  Entity,
  ManyToMany,
  JoinTable,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { BaseEntityWithSoftDelete } from 'src/common/entity/base-entity';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/roles/entities/role.entity';
import { Permission } from 'src/permissions/entities/permissions.entity';
import { Phone } from 'src/phones/entities/phone.entity';
import { Driver } from 'src/drivers/entities/driver.entity';
import { Employment } from 'src/employments/entities/employment.entity';
import { Document } from 'src/documents/entities/document.entity';

@Entity()
export class User extends BaseEntityWithSoftDelete {
  @Column({ nullable: false })
  firstName: string;

  @Column({ nullable: false })
  middleName: string;

  @Column({ nullable: false })
  lastName: string;

  @Column({ nullable: false })
  arabicFirstName: string;

  @Column({ nullable: false })
  arabicMiddleName: string;

  @Column({ nullable: false })
  arabicLastName: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: true })
  dob: Date;

  @Column()
  profilePicture: string;

  @Exclude()
  @Column()
  password: string;

  @ManyToMany(() => Role)
  @JoinTable({ name: 'user_roles' })
  roles: Role[];

  @ManyToMany(() => Permission)
  @JoinTable({ name: 'user_permissions' })
  permissions: Permission[];

  @OneToMany(() => Phone, (phone) => phone.user)
  phones: Phone[];

  @OneToMany(() => Employment, (employment) => employment.user, {
    cascade: true,
  })
  employments: Employment[];

  @OneToMany(() => Document, (document) => document.user, {
    cascade: true,
  })
  documents: Document[];

  @OneToOne(() => Driver, (driver) => driver.user, {
    cascade: true,
  })
  driver: Driver;

  @BeforeInsert()
  prepareUser() {
    this.hashPassword();
    this.setProfilePicture();
  }

  private hashPassword() {
    const salt = parseInt(process.env.SALT_ROUNDS as string) || 10;
    this.password = bcrypt.hashSync(this.password, salt);
  }

  private setProfilePicture() {
    this.profilePicture = `https://ui-avatars.com/api/?name=${this.firstName}+${this.lastName}`;
  }

  comparePassword(inputPassword: string): Promise<boolean> {
    return bcrypt.compare(inputPassword, this.password);
  }
}
