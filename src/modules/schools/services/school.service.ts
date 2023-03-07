import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere, DeepPartial } from 'typeorm';
import { SchoolsEntity } from '../entities/shool.entity';

@Injectable()
export class SchoolService {
  constructor(
    @InjectRepository(SchoolsEntity)
    private schoolRepository: Repository<SchoolsEntity>,
  ) {}

  async findAll(): Promise<SchoolsEntity[]> {
    return await this.schoolRepository.find();
  }

  async findOneBy(
    where: FindOptionsWhere<SchoolsEntity> | FindOptionsWhere<SchoolsEntity>[],
  ): Promise<SchoolsEntity | null> {
    return await this.schoolRepository.findOneBy(where);
  }

  async create(input: DeepPartial<SchoolsEntity>): Promise<SchoolsEntity> {
    const data = await this.schoolRepository.create(input);
    return await this.schoolRepository.save(data);
  }

  async update(
    id: number,
    schoolUpdateDto: DeepPartial<SchoolsEntity>,
  ): Promise<string> {
    let message = 'Update fail !';
    const user = this.schoolRepository.findOne({ where: { id } });
    if (user) {
      this.schoolRepository
        .createQueryBuilder()
        .update()
        .set({
          schoolName: schoolUpdateDto.schoolName,
        })
        .where('id = :id', { id })
        .execute();
      message = 'Update Success!';
    }
    return await message;
  }

  delete(id: number): Promise<any> {
    return this.schoolRepository
      .createQueryBuilder()
      .delete()
      .where('id = :id', { id })
      .execute();
  }
}
