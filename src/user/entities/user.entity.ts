import { BeforeInsert, Column, Entity, ManyToMany, JoinTable } from 'typeorm';
import { Exclude } from 'class-transformer';
import { BaseEntityWithSoftDelete } from 'src/common/entity/base-entity';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/roles/entities/role.entity';
import { Permission } from 'src/permissions/entities/permissions.entity';

@Entity()
export class User extends BaseEntityWithSoftDelete {
  @Column({ nullable: false })
  firstName: string;

  @Column({ nullable: false })
  lastName: string;

  @Column({ nullable: true })
  username: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  address: string;

  @Column()
  profilePicture: string;

  @Exclude()
  @Column()
  password: string;

  @ManyToMany(() => Role)
  @JoinTable()
  roles: Role[];

  @ManyToMany(() => Permission)
  @JoinTable()
  permissions: Permission[];

  @BeforeInsert()
  prepareUser() {
    this.hashPassword();
    this.setUsername();
    this.setProfilePicture();
  }

  private hashPassword() {
    const salt = parseInt(process.env.SALT_ROUNDS as string) || 10;
    this.password = bcrypt.hashSync(this.password, salt);
  }

  private setUsername() {
    if (!this.username) {
      this.username = `${this.firstName.toLowerCase()}.${this.lastName.toLowerCase()}`;
    }
  }

  private setProfilePicture() {
    this.profilePicture = `https://ui-avatars.com/api/?name=${this.firstName}+${this.lastName}`;
  }

  comparePassword(inputPassword: string): Promise<boolean> {
    return bcrypt.compare(inputPassword, this.password);
  }
}
