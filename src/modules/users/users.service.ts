import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Repository, DeepPartial } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(input: DeepPartial<User>): Promise<User> {
    const { password } = input;
    let data = Object.assign(input, { role: 'admin' });
    const hashPashword = this.hashPassword(password);
    input.password = (await hashPashword).toString();
    data = Object.assign({ password: hashPashword }, data);
    const createData = await this.userRepository.create(data);
    return this.userRepository.save(createData);
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSaltSync();
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }

  async checkPassword(
    password: string,
    passwordHash: string,
  ): Promise<boolean> {
    const result = await bcrypt.compareSync(password, passwordHash);
    return result;
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(params): Promise<User> {
    return this.userRepository.findOne(params);
  }

  async findByUsername(username: string): Promise<User> {
    return await this.userRepository.findOne({ where: { username } });
  }

  async update(id: string, userUpdateDto: DeepPartial<User>): Promise<string> {
    let message = 'Update fail !';
    const user = this.userRepository.findOne({ where: { id } });
    if (user) {
      this.userRepository
        .createQueryBuilder()
        .update()
        .set({
          username: userUpdateDto.username,
          email: userUpdateDto.email,
          role: userUpdateDto.role,
        })
        .where('id = :id', { id })
        .execute();
      message = 'Update Success!';
    }
    return await message;
  }

  delete(id: string): Promise<any> {
    return this.userRepository
      .createQueryBuilder()
      .delete()
      .where('id = :id', { id })
      .execute();
  }
}
