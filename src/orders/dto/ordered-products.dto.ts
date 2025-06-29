import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class OrderedProductsDto {
  @IsNotEmpty({ message: 'ProductId is required' })
  id: string;

  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'Price must be number & max decimal precission 2' },
  )
  @IsPositive({ message: 'Price must be positive number' })
  product_unit_price: number;

  @IsNumber({}, { message: 'Quantity must be number' })
  @IsPositive({ message: 'Quantity must be positive number' })
  product_quantity: number;
}
