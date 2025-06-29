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
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { CurrentUser } from 'src/utility/decorators/current-user.decorator';
import { UserEntity } from 'src/user/entities/user.entity';
import { AuthenticationGuard } from 'src/utility/guards/authentication.guard';
import { ReviewEntity } from './entities/review.entity';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  @UseGuards(AuthenticationGuard)
  async create(
    @Body() createReviewDto: CreateReviewDto,
    @CurrentUser() currentUser: UserEntity,
  ): Promise<{ status: string; statusCode: number; data: ReviewEntity }> {
    return await this.reviewsService.create(createReviewDto, currentUser);
  }

  @Get()
  async findAll(): Promise<{
    count: number;
    statusCode: number;
    data: ReviewEntity[];
  }> {
    return await this.reviewsService.findAll();
  }

  @Get()
  async findAllByProduct(@Body('productId') productId: string) {
    return await this.reviewsService.findAllByProduct(productId);
  }

  @Get(':reviewId')
  async findOne(
    @Param('reviewId') reviewId: string,
  ): Promise<{ status: string; statusCode: number; data: ReviewEntity }> {
    return await this.reviewsService.findOne(reviewId);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
  //   return this.reviewsService.update(+id, updateReviewDto);
  // }

  @Delete(':reviewId')
  @UseGuards(AuthenticationGuard)
  async remove(
    @Param('reviewId') reviewId: string,
  ): Promise<{ status: string; statusCode: number; message: string }> {
    return await this.reviewsService.remove(reviewId);
  }
}
