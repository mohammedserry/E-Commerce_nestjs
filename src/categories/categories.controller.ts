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
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CurrentUser } from 'src/utility/decorators/current-user.decorator';
import { UserEntity } from 'src/user/entities/user.entity';
import { AuthenticationGuard } from 'src/utility/guards/authentication.guard';
import { AuthorizationGuard } from 'src/utility/guards/authorization.guard';
import { AuthroizeRoles } from 'src/utility/decorators/authorize-roles.decorator';
import { Roles } from 'src/utility/common/user-roles.enum';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @AuthroizeRoles(Roles.ADMIN)
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
    @CurrentUser() currentUser: UserEntity,
  ): Promise<{ status: string; statusCode: number; data: {} }> {
    return await this.categoriesService.create(createCategoryDto, currentUser);
  }

  @Get()
  @UseGuards(AuthenticationGuard)
  async findAll() {
    return await this.categoriesService.findAll();
  }

  @Get(':categoryId')
  @UseGuards(AuthenticationGuard)
  async findOne(@Param('categoryId') categoryId: string) {
    return await this.categoriesService.findOne(categoryId);
  }

  @Patch(':categoryId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @AuthroizeRoles(Roles.ADMIN)
  async update(
    @Param('categoryId') categoryId: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return await this.categoriesService.update(categoryId, updateCategoryDto);
  }

  @Delete(':categoryId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @AuthroizeRoles(Roles.ADMIN)
  remove(@Param('categoryId') categoryId: string) {
    return this.categoriesService.remove(categoryId);
  }
}
