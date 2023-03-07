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
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiBody,
} from '@nestjs/swagger';
import { Authenticated } from 'src/modules/auth/decorators/allow.decorater';
import { Like } from 'typeorm';
import { SchoolsEntity } from '../entities/shool.entity';
import { SchoolService } from '../services/school.service';

@ApiTags('schools')
@Controller('schools')
@ApiBearerAuth()
export class SchoolController {
  constructor(private readonly schoolService: SchoolService) {}

  @Get('/find-all')
  @ApiOperation({ summary: 'Find one school by name' })
  @ApiResponse({
    status: 200,
    description: 'Create success',
    type: SchoolsEntity,
  })
  @Authenticated()
  async findAll() {
    return await this.schoolService.findAll();
  }

  @Get('/find-one')
  @ApiOperation({ summary: 'Find one school by name' })
  @ApiResponse({
    status: 200,
    type: SchoolsEntity,
  })
  @Authenticated()
  async findOneByName(@Query('name') name: string) {
    return await this.schoolService.findOneBy({
      schoolName: Like(`%${name}%`),
    });
  }

  @Post('/create-school')
  @ApiOperation({ summary: 'Create school' })
  @ApiBody({
    type: SchoolsEntity,
  })
  @ApiResponse({
    status: 200,
    description: 'create school',
    type: SchoolsEntity,
  })
  async create(@Body() body: SchoolsEntity) {
    return await this.schoolService.create(body);
  }

  @Patch('/update-school:id')
  async update(@Param('id') id: number, @Body() body: SchoolsEntity) {
    return await this.schoolService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.schoolService.delete(id);
  }
}
