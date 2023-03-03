import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
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
import { Like } from 'typeorm';
import { CreateCountryDto } from '../dto/createContryDto.dto';
import { CountryEntity } from '../entities/country.entity';
import { CountryService } from '../services/country.services';

@ApiTags('countries')
@Controller('countries')
@ApiBearerAuth()
@Roles(Role.Admin)
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Get('/find-all')
  @ApiOperation({ summary: 'Find one country by name' })
  @ApiResponse({
    status: 200,
    description: 'Create success',
    type: CountryEntity,
  })
  @Authenticated()
  @CheckRole()
  async findAll() {
    return await this.countryService.findAll();
  }

  @Get('/find-one')
  @ApiOperation({ summary: 'Find one country by name' })
  @ApiResponse({
    status: 200,
    type: CountryEntity,
  })
  @Authenticated()
  async findOneByName(@Query('name') name: string) {
    return await this.countryService.findOneBy({ formalName: Like(name) });
  }

  @Post('/create-country')
  @ApiOperation({ summary: 'Create country' })
  @ApiBody({
    type: CreateCountryDto,
  })
  @ApiResponse({
    status: 200,
    description: 'create country',
    type: CountryEntity,
  })
  async create(@Body() body: CreateCountryDto) {
    return await this.countryService.create(body);
  }

  @Patch('/update-country:id')
  async update(@Param('id') id: number, @Body() body: CreateCountryDto) {
    return await this.countryService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.countryService.delete(id);
  }
}
