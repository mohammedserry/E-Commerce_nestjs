import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateReviewDto {
  @IsNotEmpty({message: "Ratings are required"})
  @IsNumber({}, {message: "Ratings must be number"})
  ratings: number;

  @IsNotEmpty({message: "Comment is required"})
  @IsString({message: "Comment must be string"})
  comment: string;

  @IsNotEmpty({message: "ProductId is required"})
  @IsString({message: "ProductId must be string"})
  productId: string;
}
