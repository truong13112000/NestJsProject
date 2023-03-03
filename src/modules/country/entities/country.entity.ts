import { snowflake } from 'src/helps/common';
import { Entity, BaseEntity, Column, DeepPartial } from 'typeorm';

@Entity({
  name: 'countries',
})
export class CountryEntity extends BaseEntity {
  @Column('bigint', {
    primary: true,
    unsigned: true,
  })
  id: number;

  @Column({
    name: 'formal_name',
    length: 50,
    nullable: true,
  })
  formalName: string;

  @Column({
    name: 'country_iso3',
    type: 'char',
    length: 3,
    nullable: true,
  })
  countryIso3: string;

  @Column({
    name: 'population',
    type: 'int4',
    nullable: true,
  })
  population: number;

  @Column({
    name: 'gdp',
    type: 'int4',
    nullable: true,
  })
  gdp: number;

  @Column({
    name: 'economy',
    length: 50,
    nullable: true,
  })
  economy: string;

  @Column({
    name: 'income_group',
    length: 50,
    nullable: true,
  })
  incomeGroup: string;

  @Column({
    name: 'continent',
    length: 50,
    nullable: true,
  })
  continent: string;

  @Column({
    name: 'subregion',
    length: 50,
    nullable: true,
  })
  subregion: string;

  @Column({
    name: 'region_world_bank',
    length: 50,
    nullable: true,
  })
  regionWorldBank: string;

  //   @Index({ spatial: true })
  //   @Column({
  //     // type: 'geometry',
  //     srid: 4326,
  //     nullable: true,
  //     spatialFeatureType: 'Point',
  //     transformer: {
  //       to: (v: any) => {
  //         return { type: 'Point', coordinates: [...v] };
  //       },
  //       from: (v: any) => {
  //         return v;
  //       },
  //     },
  //   })
  //   geog: string;

  constructor(data: DeepPartial<CountryEntity>) {
    super();
    Object.assign(this, { id: snowflake.nextId(), ...data });
  }
}
