import { GetStudentInfoDto } from './../dto/getStudentInfo.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, DeepPartial, FindOptionsWhere, Repository } from 'typeorm';
import { StudentsEntity } from '../entities/student.entity';
import { ScoresEntity } from 'src/modules/scores/entities/socres.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(StudentsEntity)
    private studentRepository: Repository<StudentsEntity>,
    private dataSource: DataSource,
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

  async getStudentInfo(input: GetStudentInfoDto) {
    let result = await this.studentRepository
      .createQueryBuilder('student')
      .select([
        'student.student_name',
        'student.birthday',
        'school.school_name',
        'score.score_value',
        'lecture.lecture_name',
        `DATE_PART('year', now() ::date) - DATE_PART('year', student.birthday ::date) age`,
      ])
      .leftJoin('schools', 'school', 'student.school_id = school.id')
      .leftJoin('scores', 'score', 'student.id = score.student_id')
      .leftJoin('lecture', 'lecture', 'lecture.id = score.lecture_id')
      .where(
        `( student.student_name like :studentName or ${
          input.studentName == null
        }) AND  (student.birthday = :birthDay or ${
          input.birthDay == null
        } ) AND (school.school_name like :schoolName  or ${
          input.schoolName == null
        }) AND (lecture.lecture_name like :lectureName or ${
          input.lectureName == null
        })`,
        {
          studentName: `%${input.studentName}%`,
          birthDay: input.birthDay,
          schoolName: `%${input.schoolName}%`,
          lectureName: `%${input.lectureName}%`,
        },
      )
      .getRawMany();
    if (input.age) {
      result = result.filter((e) => e.age == input.age);
    }
    return result;
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
          birthday: studentUpdateDto.birthday,
        })
        .where('id = :id', { id })
        .execute();
      message = 'Update Success!';
    }
    return await message;
  }

  async delete(id: number) {
    // create a new query runner
    const queryRunner = this.dataSource.createQueryRunner();
    // establish real database connection using our new query runner
    await queryRunner.connect();
    // lets now open a new transaction:
    await queryRunner.startTransaction();

    try {
      this.studentRepository
        .createQueryBuilder()
        .delete()
        .where('id = :id', { id })
        .execute();

      this.dataSource
        .getRepository(ScoresEntity)
        .createQueryBuilder()
        .delete()
        .where('student_id = :id', { id })
        .execute();

      await queryRunner.commitTransaction();
    } catch (error) {
      console.log(error);
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
