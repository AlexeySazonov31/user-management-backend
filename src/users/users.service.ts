import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginatedUsers } from './dto/pagination';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findAllWithPagination(
    page: number,
    pageSize: number,
  ): Promise<PaginatedUsers> {
    const users = await this.usersRepository.find({
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
    if (!users.length) {
      throw new NotFoundException('There is no such page');
    }
    const total_results = await this.usersRepository.count();
    const total_pages = Math.ceil(total_results / pageSize);
    return {
      results: users,
      page,
      total_pages,
      total_results,
    };
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException();
    }
    return user;
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
