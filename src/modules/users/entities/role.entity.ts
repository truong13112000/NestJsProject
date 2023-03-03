import { ApiProperty } from '@nestjs/swagger';
import { snowflake } from 'src/helps/common';
import {
  Entity,
  BaseEntity,
  Column,
  OneToMany,
  DeepPartial,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from './user.entity';

@Entity({
  name: 'roles',
})
export class RolesEntity extends BaseEntity {
  @Column('bigint', {
    primary: true,
    unsigned: true,
  })
  @ApiProperty()
  id: string;

  @Column()
  @ApiProperty()
  name: string;

  @ApiProperty()
  @OneToMany(() => OrganisationDetailRolesEntity, (x) => x.role)
  organisationDetailRole: OrganisationDetailRolesEntity[];

  constructor(data: DeepPartial<RolesEntity>) {
    super();
    Object.assign(this, { id: snowflake.nextId(), ...data });
  }
}

@Entity({
  name: 'organisation',
})
export class OrganisationEntity extends BaseEntity {
  @Column('bigint', {
    primary: true,
    unsigned: true,
  })
  @ApiProperty()
  id: string;

  @Column()
  @ApiProperty()
  name: string;

  @CreateDateColumn({ name: 'created_at' })
  @ApiProperty()
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  @ApiProperty()
  updatedAt: Date;

  @OneToMany(() => OrganisationDetailEntity, (x) => x.organisation)
  detail: OrganisationDetailEntity[];

  constructor(data: DeepPartial<OrganisationEntity>) {
    super();
    Object.assign(this, { id: snowflake.nextId(), ...data });
  }
}

@Entity({
  name: 'roles_name',
})
export class RolesNameEntity extends BaseEntity {
  @Column('bigint', {
    primary: true,
    unsigned: true,
  })
  @ApiProperty()
  id: string;

  @Column()
  @ApiProperty()
  name: string;

  @OneToMany(() => OrganisationDetailEntity, (x) => x.roleName)
  detail: OrganisationDetailEntity[];

  constructor(data: DeepPartial<RolesNameEntity>) {
    super();
    Object.assign(this, { id: snowflake.nextId(), ...data });
  }
}

@Entity({
  name: 'organisation_detail',
})
export class OrganisationDetailEntity extends BaseEntity {
  @Column('bigint', {
    primary: true,
    unsigned: true,
  })
  @ApiProperty()
  id: string;

  @ApiProperty()
  @ManyToOne(() => OrganisationEntity, (org) => org.detail)
  organisation: OrganisationEntity;

  @ApiProperty()
  @ManyToOne(() => RolesNameEntity, (x) => x.detail)
  roleName: RolesNameEntity;

  @ApiProperty()
  @OneToMany(
    () => UserEventOrganisationDetailEntity,
    (x) => x.organisationDetail,
  )
  userRole: UserEventOrganisationDetailEntity[];

  @ApiProperty()
  @OneToMany(() => OrganisationDetailRolesEntity, (x) => x.organisationDetail)
  detailRole: OrganisationDetailRolesEntity[];

  constructor(data: DeepPartial<OrganisationDetailEntity>) {
    super();
    Object.assign(this, { id: snowflake.nextId(), ...data });
  }
}

@Entity({
  name: 'organisation_detail_roles',
})
export class OrganisationDetailRolesEntity extends BaseEntity {
  @Column('bigint', {
    primary: true,
    unsigned: true,
  })
  @ApiProperty()
  id: string;

  @ApiProperty()
  @ManyToOne(() => OrganisationDetailEntity, (org) => org.detailRole)
  organisationDetail: OrganisationDetailEntity;

  @ApiProperty()
  @ManyToOne(() => RolesEntity, (x) => x.organisationDetailRole)
  role: RolesEntity;

  constructor(data: DeepPartial<OrganisationDetailRolesEntity>) {
    super();
    Object.assign(this, { id: snowflake.nextId(), ...data });
  }
}

@Entity({
  name: 'user_event_organisation_detail',
})
export class UserEventOrganisationDetailEntity extends BaseEntity {
  @Column('bigint', {
    primary: true,
    unsigned: true,
  })
  @ApiProperty()
  id: string;

  @ApiProperty()
  @ManyToOne(() => OrganisationDetailEntity, (org) => org.userRole)
  organisationDetail: OrganisationDetailEntity;

  @ApiProperty()
  @ManyToOne(() => User, (x) => x.userRole)
  user: User;

  // @ApiProperty()
  // @ManyToOne(() => EventEntity, (x) => x.userOrganisation)
  // event: EventEntity;

  constructor(data: DeepPartial<UserEventOrganisationDetailEntity>) {
    super();
    Object.assign(this, { id: snowflake.nextId(), ...data });
  }
}
