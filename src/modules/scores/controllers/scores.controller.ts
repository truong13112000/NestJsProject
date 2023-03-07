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
import {
  Authenticated,
  CheckRole,
} from 'src/modules/auth/decorators/allow.decorater';
import { Roles } from 'src/modules/auth/decorators/role.decorater';
import { Role } from 'src/modules/auth/enum/role.enum';
import { Equal } from 'typeorm';
import { ScoresEntity } from '../entities/socres.entity';
import { ScoreService } from '../services/score.service';

@ApiTags('scores')
@Controller('scores')
@ApiBearerAuth()
@Roles(Role.User)
export class ScoresController {
  constructor(private readonly scoreService: ScoreService) {}

  @Get('/getData')
  @ApiOperation({ summary: 'Find one scores by name' })
  @ApiResponse({
    status: 200,
    description: 'getData success',
  })
  @CheckRole()
  @Authenticated()
  async getData() {
    return await this.scoreService.getData();
  }

  @Get('/find-all')
  @ApiOperation({ summary: 'Find one scores by name' })
  @ApiResponse({
    status: 200,
    description: 'Create success',
    type: ScoresEntity,
  })
  @Authenticated()
  async findAll() {
    return await this.scoreService.findAll();
  }

  @Get('/find-one')
  @ApiOperation({ summary: 'Find one scores by name' })
  @ApiResponse({
    status: 200,
    type: ScoresEntity,
  })
  @Authenticated()
  async findOneByName(@Query('name') name: number) {
    return await this.scoreService.findOneBy({
      scoreValue: Equal(name),
    });
  }

  @Post('/create-scores')
  @ApiOperation({ summary: 'Create scores' })
  @ApiBody({
    type: ScoresEntity,
  })
  @ApiResponse({
    status: 200,
    description: 'create scores',
    type: ScoresEntity,
  })
  async create(@Body() body: ScoresEntity) {
    return await this.scoreService.create(body);
  }

  @Patch('/update-scores:id')
  async update(@Param('id') id: number, @Body() body: ScoresEntity) {
    return await this.scoreService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.scoreService.delete(id);
  }
}
