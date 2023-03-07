import { LectureService } from './../services/lecture.service';
import { LecturesEntity } from './../entities/lecture.entity';
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
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Authenticated } from 'src/modules/auth/decorators/allow.decorater';
import { Like } from 'typeorm';

@ApiTags('lectures')
@Controller('lectures')
@ApiBearerAuth()
export class LectureController {
  constructor(private readonly lectureService: LectureService) {}

  @Get('/find-all')
  @ApiOperation({ summary: 'Find one lectures by name' })
  @ApiResponse({
    status: 200,
    description: 'Create success',
    type: LecturesEntity,
  })
  @Authenticated()
  async findAll() {
    return await this.lectureService.findAll();
  }

  @Get('/find-one')
  @ApiOperation({ summary: 'Find one lectures by name' })
  @ApiResponse({
    status: 200,
    type: LecturesEntity,
  })
  @Authenticated()
  async findOneByName(@Query('name') name: string) {
    return await this.lectureService.findOneBy({
      lecturelName: Like(`%${name}%`),
    });
  }

  @Post('/create-lectures')
  @ApiOperation({ summary: 'Create lectures' })
  @ApiBody({
    type: LecturesEntity,
  })
  @ApiResponse({
    status: 200,
    description: 'create lectures',
    type: LecturesEntity,
  })
  async create(@Body() body: LecturesEntity) {
    return await this.lectureService.create(body);
  }

  @Patch('/update-lectures:id')
  async update(@Param('id') id: number, @Body() body: LecturesEntity) {
    return await this.lectureService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.lectureService.delete(id);
  }
}
