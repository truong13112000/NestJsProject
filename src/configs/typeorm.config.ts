import { StudentsEntity } from './../modules/students/entities/student.entity';
import { ScoresEntity } from './../modules/scores/entities/socres.entity';
import {
  OrganisationDetailEntity,
  OrganisationDetailRolesEntity,
  OrganisationEntity,
  RolesEntity,
  RolesNameEntity,
  UserEventOrganisationDetailEntity,
} from './../modules/users/entities/role.entity';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { CountryEntity } from 'src/modules/country/entities/country.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { LecturesEntity } from 'src/modules/lectures/entities/lecture.entity';
import { SchoolsEntity } from 'src/modules/schools/entities/shool.entity';
import { ContentsEntity } from 'src/modules/content/entities/content.entity';
export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  port: 5432,
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: process.env.DATABASE_SYNC === 'true',
  logging: process.env.DATABASE_LOGGING === 'true',
  entities: [
    CountryEntity,
    User,
    RolesEntity,
    UserEventOrganisationDetailEntity,
    OrganisationDetailRolesEntity,
    OrganisationDetailEntity,
    OrganisationEntity,
    RolesNameEntity,
    LecturesEntity,
    SchoolsEntity,
    ScoresEntity,
    StudentsEntity,
    ContentsEntity,
  ],
};
