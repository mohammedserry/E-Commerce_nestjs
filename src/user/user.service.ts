import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAll(): Promise<{
    count: number;
    statusCode: number;
    data: UserEntity[];
  }> {
    const users = await this.usersRepository.find();
    return {
      count: users.length,
      statusCode: 200,
      data: users,
    };
  }

  async findOne(userId: string): Promise<{
    statusCode: number;
    status: string;
    data: UserEntity;
  }> {
    const user = await this.usersRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    return {
      statusCode: 200,
      status: 'Success',
      data: user,
    };
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(userId: string): Promise<{
    statusCode: number;
    status: string;
    message: string;
  }> {
    const user = await this.usersRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    await this.usersRepository.delete(userId);

    return {
      statusCode: 200,
      status: 'Success',
      message: 'User deleted successfully',
    };
  }
}
