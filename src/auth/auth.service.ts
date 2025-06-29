import { Injectable, NotFoundException } from '@nestjs/common';
import { UserSignUpDto } from './dto/user-signup.dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { UserSignInDto } from './dto/user-signin.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  async signup(
    userSignUpDto: UserSignUpDto,
  ): Promise<{ data: Omit<UserEntity, 'password'>; accessToken: string }> {
    const userExists = await this.usersRepository.findOneBy({
      email: userSignUpDto.email,
    });
    if (userExists) {
      throw new NotFoundException('Email is already exists');
    }

    const hashedPassword = await bcrypt.hash(userSignUpDto.password, 10);
    const newUser = this.usersRepository.create({
      name: userSignUpDto.name,
      email: userSignUpDto.email,
      password: hashedPassword,
    });

    const user = await this.usersRepository.save(newUser);

    // Create Token By PayLoad
    const payload = {
      id: user.id,
      email: user.email,
    };
    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.ACCESS_TOKEN_SECRET_KEY,
      expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME,
    });

    // Don't return the password
    const { password, ...userWithoutPassword } = user;
    return {
      data: userWithoutPassword,
      accessToken: accessToken,
    };
  }

  async signin(
    userSignInDto: UserSignInDto,
  ): Promise<{ data: Omit<UserEntity, 'password'>; accessToken: string }> {
    const { email, password } = userSignInDto;
    const user = await this.usersRepository.findOne({
      where: { email: email },
      select: ['id', 'email', 'password', 'roles'],
    });
    if (!user) {
      throw new NotFoundException('Email is not exists');
    }

    const hashPassword = user.password;
    const isMatch = await bcrypt.compare(password, hashPassword);
    if (!isMatch) {
      throw new NotFoundException('Some thing wrong');
    }

    // Create Token By PayLoad
    const payload = {
      id: user.id,
      email: user.email,
    };
    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.ACCESS_TOKEN_SECRET_KEY,
      expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME,
    });

    // Don't return the password
    const { password: _, ...userWithoutPassword } = user;

    return {
      data: userWithoutPassword,
      accessToken: accessToken,
    };
  }
}
