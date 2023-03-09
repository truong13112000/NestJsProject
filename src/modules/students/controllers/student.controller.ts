import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Authenticated } from 'src/modules/auth/decorators/allow.decorater';
import { Like } from 'typeorm';
import { GetStudentInfoDto } from '../dto/getStudentInfo.dto';
import { StudentsEntity } from '../entities/student.entity';
import { StudentService } from '../services/student.service';

@ApiTags('student')
@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post('/get-student-info')
  @ApiOperation({ summary: 'Find one lectures by name' })
  @ApiResponse({
    status: 200,
    description: 'Create success',
  })
  async getStudentInfo(@Body() input: GetStudentInfoDto) {
    return await this.studentService.getStudentInfo(input);
  }

  @Get('/find-all')
  @ApiOperation({ summary: 'Find one lectures by name' })
  @ApiResponse({
    status: 200,
    description: 'Create success',
    type: StudentsEntity,
  })
  @Authenticated()
  async findAll() {
    return await this.studentService.findAll();
  }

  @Get('/find-one')
  @ApiOperation({ summary: 'Find one lectures by name' })
  @ApiResponse({
    status: 200,
    type: StudentsEntity,
  })
  async findOneByName(@Query('name') name: string) {
    return await this.studentService.findOneBy({
      studentName: Like(`%${name}%`),
    });
  }

  @Post('/create-students')
  @ApiOperation({ summary: 'Create students' })
  @ApiBody({
    type: StudentsEntity,
  })
  @ApiResponse({
    status: 200,
    description: 'create students',
    type: StudentsEntity,
  })
  async create(@Body() body: StudentsEntity) {
    return await this.studentService.create(body);
  }

  @Patch('/update-students:id')
  async update(@Param('id') id: number, @Body() body: StudentsEntity) {
    return await this.studentService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.studentService.delete(id);
  }
}
