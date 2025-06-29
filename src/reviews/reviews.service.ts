import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReviewEntity } from './entities/review.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { UserEntity } from 'src/user/entities/user.entity';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(ReviewEntity)
    private readonly reviewRepository: Repository<ReviewEntity>,
  ) {}

  async create(
    createReviewDto: CreateReviewDto,
    currentUser: UserEntity,
  ): Promise<{ status: string; statusCode: number; data: ReviewEntity }> {
    const newReview = this.reviewRepository.create(createReviewDto);
    newReview.user = currentUser;
    const savedReview = await this.reviewRepository.save(newReview);

    return {
      status: 'success',
      statusCode: 201,
      data: savedReview,
    };
  }

  async findAll(): Promise<{
    count: number;
    statusCode: number;
    data: ReviewEntity[];
  }> {
    const [reviews, count] = await this.reviewRepository.findAndCount();
    return {
      count,
      statusCode: 200,
      data: reviews,
    };
  }

  async findAllByProduct(productId: string): Promise<{
    count: number;
    statusCode: number;
    data: ReviewEntity[];
  }> {
    const [reviews, count] = await this.reviewRepository.findAndCount({
      where: { product: { id: productId } },
      relations: ['user', 'product'],
    });
    return {
      count,
      statusCode: 200,
      data: reviews,
    };
  }

  async findOne(
    reviewId: string,
  ): Promise<{ status: string; statusCode: number; data: ReviewEntity }> {
    const review = await this.reviewRepository.findOne({
      where: { id: reviewId },
      relations: ['user'],
    });

    if (!review) {
      throw new Error('Review not found');
    }

    return {
      status: 'success',
      statusCode: 200,
      data: review,
    };
  }

  async update(
    id: string,
    updateReviewDto: UpdateReviewDto,
  ): Promise<{ status: string; statusCode: number; data: ReviewEntity }> {
    await this.reviewRepository.update(id, updateReviewDto);
    const updatedReview = await this.reviewRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!updatedReview) {
      throw new Error('Review not found');
    }

    return {
      status: 'success',
      statusCode: 200,
      data: updatedReview,
    };
  }

  async remove(
    reviewId: string,
  ): Promise<{ status: string; statusCode: number; message: string }> {
    const result = await this.reviewRepository.delete(reviewId);

    if (result.affected === 0) {
      throw new Error('Review not found');
    }

    return {
      status: 'success',
      statusCode: 200,
      message: 'Review deleted successfully',
    };
  }
}