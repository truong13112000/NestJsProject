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
  checkName: string;

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
    const array = [];
    const lectureInfo = {};
    let scoreInfo = {};
    let scoreResult = await this.dataSource
      .getRepository(LecturesEntity)
      .createQueryBuilder('lecture')
      .select([
        'Max(score.score_value) as score_value',
        'Max(s.student_name) as student_name',
        'Max(lecture.lecture_name) as lecturelName',
        'ROW_NUMBER() OVER(PARTITION BY lecture.lecture_name ORDER BY Max(score.score_value) DESC) RN',
      ])
      .leftJoin('scores', 'score', 'score.lecture_id = lecture.id')
      .leftJoin('students', 's', 's.id = score.studentId')
      .groupBy('score.studentId,lecture.lecture_name')
      .orderBy('lecturelName')
      .addOrderBy('score_value', 'DESC')
      .getRawMany();
    scoreResult = scoreResult.filter((e) => e.rn <= 3);
    this.checkName = scoreResult[0].lecturelname;
    scoreResult.map((a) => {
      if (this.checkName == a.lecturelname) {
        scoreInfo[`${a.student_name}`] = a.score_value;
        lectureInfo[this.checkName] = scoreInfo;
      } else {
        scoreInfo = {};
        scoreInfo[`${a.student_name}`] = a.score_value;
      }
      this.checkName = a.lecturelname;
    });
    array.push(lectureInfo);
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
