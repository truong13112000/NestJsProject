import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { ContentController } from './controllers/content.controller';
import { ContentsEntity } from './entities/content.entity';
import { ContentService } from './services/content.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ContentsEntity]),
    AuthModule,
    UsersModule,
  ],
  exports: [ContentService],
  controllers: [ContentController],
  providers: [ContentService],
})
export class ContentsModule {}
