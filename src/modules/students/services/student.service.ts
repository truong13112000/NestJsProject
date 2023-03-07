import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';
import { StudentsEntity } from '../entities/student.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(StudentsEntity)
    private studentRepository: Repository<StudentsEntity>,
  ) {}

  async findAll(): Promise<StudentsEntity[]> {
    return await this.studentRepository.find();
  }

  async findOneBy(
    where:
      | FindOptionsWhere<StudentsEntity>
      | FindOptionsWhere<StudentsEntity>[],
  ): Promise<StudentsEntity | null> {
    return await this.studentRepository.findOneBy(where);
  }

  async create(input: DeepPartial<StudentsEntity>): Promise<StudentsEntity> {
    const data = await this.studentRepository.create(input);
    return await this.studentRepository.save(data);
  }

  async update(
    id: number,
    studentUpdateDto: DeepPartial<StudentsEntity>,
  ): Promise<string> {
    let message = 'Update fail !';
    const user = this.studentRepository.findOne({ where: { id } });
    if (user) {
      this.studentRepository
        .createQueryBuilder()
        .update()
        .set({
          studentName: studentUpdateDto.studentName,
          schoolId: studentUpdateDto.schoolId,
        })
        .where('id = :id', { id })
        .execute();
      message = 'Update Success!';
    }
    return await message;
  }

  delete(id: number): Promise<any> {
    return this.studentRepository
      .createQueryBuilder()
      .delete()
      .where('id = :id', { id })
      .execute();
  }
}
