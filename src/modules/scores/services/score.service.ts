import { ScoreAndStudentInfo } from './../Dto/scoreAndStudentInfo.dto';
import { LecturesEntity } from 'src/modules/lectures/entities/lecture.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ScoresEntity } from './../entities/socres.entity';
import { Injectable } from '@nestjs/common';
import { DataSource, DeepPartial, FindOptionsWhere, Repository } from 'typeorm';
import { GetLectureAndScoreInfo } from '../Dto/getLectureAndScoreInfo.dto';

@Injectable()
export class ScoreService {
  constructor(
    @InjectRepository(ScoresEntity)
    private scoreRepository: Repository<ScoresEntity>,
    private dataSource: DataSource,
  ) {}
  result: GetLectureAndScoreInfo[] = [];

  async findAll(): Promise<ScoresEntity[]> {
    return await this.scoreRepository.find();
  }

  async findOneBy(
    where: FindOptionsWhere<ScoresEntity> | FindOptionsWhere<ScoresEntity>[],
  ): Promise<ScoresEntity | null> {
    return await this.scoreRepository.findOneBy(where);
  }

  async create(input: DeepPartial<ScoresEntity>): Promise<ScoresEntity> {
    const data = await this.scoreRepository.create(input);
    return await this.scoreRepository.save(data);
  }

  async getData(): Promise<any[]> {
    const listLecture = await this.dataSource
      .getRepository(LecturesEntity)
      .find();
    const array = [];
    for (let i = 0; i < listLecture.length; i++) {
      const lectureInfo = {};
      const scoreInfo = {};
      const scoreResult = await this.scoreRepository
        .createQueryBuilder('score')
        .select([
          'Max(score.score_value) as score_value',
          'Max(s.student_name) as student_name',
        ])
        .leftJoin('students', 's', 's.id = score.studentId')
        .where(`score.lectureId = ${listLecture[i].id}`)
        .groupBy('score.studentId')
        .orderBy('score_value', 'DESC')
        .limit(3)
        .getRawMany();
      scoreResult.forEach((a: ScoreAndStudentInfo) => {
        scoreInfo[`${a.student_name}`] = a.score_value;
      });
      lectureInfo[`${listLecture[i].lecturelName}`] = scoreInfo;
      array.push(lectureInfo);
      console.log(array);
    }
    return array;
  }

  async update(
    id: number,
    ScoreUpdateDto: DeepPartial<ScoresEntity>,
  ): Promise<string> {
    let message = 'Update fail !';
    const user = this.scoreRepository.findOne({ where: { id } });
    if (user) {
      this.scoreRepository
        .createQueryBuilder()
        .update()
        .set({
          scoreValue: ScoreUpdateDto.scoreValue,
          lectureId: ScoreUpdateDto.lectureId,
          studentId: ScoreUpdateDto.studentId,
        })
        .where('id = :id', { id })
        .execute();
      message = 'Update Success!';
    }
    return await message;
  }

  delete(id: number): Promise<any> {
    return this.scoreRepository
      .createQueryBuilder()
      .delete()
      .where('id = :id', { id })
      .execute();
  }
}
