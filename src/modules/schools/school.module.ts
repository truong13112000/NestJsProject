import { SchoolController } from './controllers/school.controller';
import { SchoolService } from './services/school.service';
import { SchoolsEntity } from './entities/shool.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([SchoolsEntity]), AuthModule, UsersModule],
  exports: [SchoolService],
  controllers: [SchoolController],
  providers: [SchoolService],
})
export class SchoolsModule {}
