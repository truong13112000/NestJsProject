import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { LectureController } from './controllers/lecture.controller';
import { LecturesEntity } from './entities/lecture.entity';
import { LectureService } from './services/lecture.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([LecturesEntity]),
    AuthModule,
    UsersModule,
  ],
  exports: [LectureService],
  controllers: [LectureController],
  providers: [LectureService],
})
export class LecturesModule {}
