import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { snowflake } from 'src/helps/common';
import { Role } from 'src/modules/auth/enum/role.enum';
import {
  Entity,
  BaseEntity,
  Column,
  OneToMany,
  DeepPartial,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { UserEventOrganisationDetailEntity } from './role.entity';

@Entity({
  name: 'users',
})
export class User extends BaseEntity {
  @Column('bigint', {
    primary: true,
    unsigned: true,
  })
  @ApiProperty()
  id: string;

  @Column({ nullable: true })
  @ApiProperty()
  username: string;

  @Column({ nullable: true })
  @IsEmail()
  @ApiProperty()
  email: string;

  @Column({ select: true })
  @IsNotEmpty()
  @ApiProperty()
  password: string;

  @Column({ nullable: true })
  @ApiProperty()
  role: string;

  // @Column({ nullable: true })
  // @ApiProperty()
  // organisation: string;

  @OneToMany(() => UserEventOrganisationDetailEntity, (x) => x.user)
  userRole: UserEventOrganisationDetailEntity[];

  constructor(data: DeepPartial<User>) {
    super();
    Object.assign(this, { id: snowflake.nextId(), ...data });
  }
}

@Entity({
  name: 'users_token',
})
export class UserTokenEntity extends BaseEntity {
  @Column('bigint', {
    primary: true,
    unsigned: true,
  })
  @ApiProperty()
  id: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @Column({ nullable: true })
  @ApiProperty()
  token: string;

  @CreateDateColumn({ name: 'expiration_date' })
  @ApiProperty()
  expirationDate: Date;

  @CreateDateColumn({ name: 'created_at' })
  @ApiProperty()
  createdAt: Date;

  constructor(data: DeepPartial<UserTokenEntity>) {
    super();
    Object.assign(this, { id: snowflake.nextId(), ...data });
  }
}
