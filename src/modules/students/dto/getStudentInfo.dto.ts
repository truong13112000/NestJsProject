import { ApiProperty } from '@nestjs/swagger';

export class GetStudentInfoDto {
  @ApiProperty({ required: false, nullable: true })
  studentName: string;
  @ApiProperty({ required: false, nullable: true })
  birthDay: Date;
  @ApiProperty({ required: false, nullable: true })
  schoolName: string;
  @ApiProperty({ required: false, nullable: true })
  lectureName: string;
  @ApiProperty({ required: false, nullable: true })
  age: number;
}
