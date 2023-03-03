import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { CountryController } from './controllers/country.controller';
import { CountryEntity } from './entities/country.entity';
import { CountryService } from './services/country.services';

@Module({
  imports: [TypeOrmModule.forFeature([CountryEntity]), AuthModule, UsersModule],
  providers: [CountryService],
  exports: [CountryService],
  controllers: [CountryController],
})
export class CountryModule {}
