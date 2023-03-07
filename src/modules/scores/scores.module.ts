import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { LecturesEntity } from '../lectures/entities/lecture.entity';
import { LecturesModule } from '../lectures/lectures.module';
import { UsersModule } from '../users/users.module';
import { ScoresController } from './controllers/scores.controller';
import { ScoresEntity } from './entities/socres.entity';
import { ScoreService } from './services/score.service';

@Module({
  imports: [TypeOrmModule.forFeature([ScoresEntity]), AuthModule, UsersModule],
  exports: [ScoreService],
  controllers: [ScoresController],
  providers: [ScoreService],
})
export class ScoresModule {}
