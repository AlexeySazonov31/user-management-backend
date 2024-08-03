import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(page: number = 1, pageSize: number = 10): Promise<User[]> {
    return await this.usersRepository.find({
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
  }

  async findOne(id: number): Promise<User> {
    return await this.usersRepository.findOne({
      where: { id },
    });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create(createUserDto);
    return await this.usersRepository.save(user);
  }

  async update(id: number, UpdateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException();
    }
    Object.assign(user, UpdateUserDto);
    return await this.usersRepository.save(user);
  }

  async remove(id: number): Promise<User> {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException();
    }
    return await this.usersRepository.remove(user);
  }
}
