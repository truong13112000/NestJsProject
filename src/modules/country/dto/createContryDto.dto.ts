import { ApiProperty } from '@nestjs/swagger';

export class CreateCountryDto {
  @ApiProperty()
  formal_name: string;
  @ApiProperty()
  country_iso3: string;
  @ApiProperty()
  population: number;
  @ApiProperty()
  gdp: number;
  @ApiProperty()
  economy: string;
  @ApiProperty()
  income_group: string;
  @ApiProperty()
  continent: string;
  @ApiProperty()
  subregion: string;
  @ApiProperty()
  region_world_bank: string;
}
