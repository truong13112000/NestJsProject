import {
  OrganisationDetailEntity,
  OrganisationDetailRolesEntity,
  OrganisationEntity,
  RolesEntity,
  RolesNameEntity,
  UserEventOrganisationDetailEntity,
} from './entities/role.entity';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      RolesEntity,
      UserEventOrganisationDetailEntity,
      OrganisationDetailRolesEntity,
      OrganisationDetailEntity,
      OrganisationEntity,
      RolesNameEntity,
    ]),
  ],
  exports: [UsersService],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
