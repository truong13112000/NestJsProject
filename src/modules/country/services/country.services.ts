import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';
import { CountryEntity } from '../entities/country.entity';

@Injectable()
export class CountryService {
  constructor(
    @InjectRepository(CountryEntity)
    private countryRepository: Repository<CountryEntity>,
  ) {}

  async findAll(): Promise<CountryEntity[]> {
    return await this.countryRepository.find();
  }

  async findOneBy(
    where: FindOptionsWhere<CountryEntity> | FindOptionsWhere<CountryEntity>[],
  ): Promise<CountryEntity | null> {
    return await this.countryRepository.findOneBy(where);
  }

  async create(input: DeepPartial<CountryEntity>): Promise<CountryEntity> {
    const data = await this.countryRepository.create(input);
    return await this.countryRepository.save(data);
  }

  async update(
    id: number,
    countryUpdateDto: DeepPartial<CountryEntity>,
  ): Promise<string> {
    let message = 'Update fail !';
    const user = this.countryRepository.findOne({ where: { id } });
    if (user) {
      this.countryRepository
        .createQueryBuilder()
        .update()
        .set({
          formalName: countryUpdateDto.formalName,
          countryIso3: countryUpdateDto.countryIso3,
          population: countryUpdateDto.population,
          gdp: countryUpdateDto.gdp,
          economy: countryUpdateDto.economy,
          incomeGroup: countryUpdateDto.incomeGroup,
          continent: countryUpdateDto.continent,
          subregion: countryUpdateDto.subregion,
          regionWorldBank: countryUpdateDto.regionWorldBank,
        })
        .where('id = :id', { id })
        .execute();
      message = 'Update Success!';
    }
    return await message;
  }

  delete(id: number): Promise<any> {
    return this.countryRepository
      .createQueryBuilder()
      .delete()
      .where('id = :id', { id })
      .execute();
  }
}
