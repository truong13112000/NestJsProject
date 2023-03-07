import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { StudentController } from './controllers/student.controller';
import { StudentsEntity } from './entities/student.entity';
import { StudentService } from './services/student.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([StudentsEntity]),
    AuthModule,
    UsersModule,
  ],
  exports: [StudentService],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentsModule {}
