import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';
import { LecturesEntity } from '../entities/lecture.entity';

@Injectable()
export class LectureService {
  constructor(
    @InjectRepository(LecturesEntity)
    private lectureRepository: Repository<LecturesEntity>,
  ) {}

  async findAll(): Promise<LecturesEntity[]> {
    return await this.lectureRepository.find();
  }

  async findOneBy(
    where:
      | FindOptionsWhere<LecturesEntity>
      | FindOptionsWhere<LecturesEntity>[],
  ): Promise<LecturesEntity | null> {
    return await this.lectureRepository.findOneBy(where);
  }

  async create(input: DeepPartial<LecturesEntity>): Promise<LecturesEntity> {
    const data = await this.lectureRepository.create(input);
    return await this.lectureRepository.save(data);
  }

  async update(
    id: number,
    lectureUpdateDto: DeepPartial<LecturesEntity>,
  ): Promise<string> {
    let message = 'Update fail !';
    const user = this.lectureRepository.findOne({ where: { id } });
    if (user) {
      this.lectureRepository
        .createQueryBuilder()
        .update()
        .set({
          lecturelName: lectureUpdateDto.lecturelName,
        })
        .where('id = :id', { id })
        .execute();
      message = 'Update Success!';
    }
    return await message;
  }

  delete(id: number): Promise<any> {
    return this.lectureRepository
      .createQueryBuilder()
      .delete()
      .where('id = :id', { id })
      .execute();
  }
}
