import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { CurrentUser } from '../utility/decorators/current-user.decorator';
import { AuthenticationGuard } from 'src/utility/guards/authentication.guard';
import { AuthroizeRoles } from 'src/utility/decorators/authorize-roles.decorator';
import { Roles } from 'src/utility/common/user-roles.enum';
import { AuthorizationGuard } from 'src/utility/guards/authorization.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @AuthroizeRoles(Roles.ADMIN)
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @AuthroizeRoles(Roles.ADMIN)
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  async findAll(): Promise<{
    count: number;
    data: UserEntity[];
    statusCode: number;
  }> {
    return await this.userService.findAll();
  }

  @Get('me')
  @UseGuards(AuthenticationGuard)
  getProfile(@CurrentUser() currentUser: UserEntity) {
    return currentUser;
  }

  @Get(':userId')
  async findOne(@Param('userId') userId: string): Promise<{
    statusCode: number;
    status: string;
    data: UserEntity;
  }> {
    return await this.userService.findOne(userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':userId')
  @AuthroizeRoles(Roles.ADMIN)
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  remove(@Param('userId') userId: string): Promise<{
    statusCode: number;
    status: string;
    message: string;
  }> {
    return this.userService.remove(userId);
  }
}
