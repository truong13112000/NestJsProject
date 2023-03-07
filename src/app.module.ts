import { LecturesModule } from './modules/lectures/lectures.module';
import { ScoresModule } from './modules/scores/scores.module';
import { SchoolsModule } from './modules/schools/school.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import 'reflect-metadata';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './configs/typeorm.config';
import { CountryModule } from './modules/country/country.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { StudentsModule } from './modules/students/student.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => typeORMConfig,
    }),
    CountryModule,
    UsersModule,
    AuthModule,
    StudentsModule,
    SchoolsModule,
    ScoresModule,
    LecturesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
