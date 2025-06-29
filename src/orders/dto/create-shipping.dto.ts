import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateShippingDto {
  @IsNotEmpty({ message: 'Phone is required' })
  @IsString({ message: 'Phone must be string' })
  phone: string;

  @IsOptional()
  @IsString({ message: 'Name must be string' })
  name: string;

  @IsNotEmpty({ message: 'Address is required' })
  @IsString({ message: 'Address must be string' })
  address: string;

  @IsNotEmpty({ message: 'City is required' })
  @IsString({ message: 'City must be string' })
  city: string;

  @IsNotEmpty({ message: 'PostCode is required' })
  @IsString({ message: 'PostCode must be string' })
  postCode: string;

  @IsNotEmpty({ message: 'State is required' })
  @IsString({ message: 'State must be string' })
  state: string;

  @IsNotEmpty({ message: 'Country is required' })
  @IsString({ message: 'Country must be string' })
  country: string;
}
