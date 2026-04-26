import { IsNumber, IsString } from 'class-validator';

export class CartItemResponseDto {
  @IsString()
  id: string;

  @IsString()
  variantId: string; 

  @IsNumber()
  quantity: number;

  @IsNumber()
  price: number;

  @IsString()
  name: string;

  @IsString()
  image: string;

  @IsString()
  brand: string;

  attributes: Record<string, string>; 
}

export class CartResponseDto {
  @IsString()
  id: string;

  @IsNumber()
  totalItems: number;

  items: CartItemResponseDto[];
}