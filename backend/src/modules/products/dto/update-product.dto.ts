import {
  IsString,
  IsUUID,
  IsBoolean,
  IsOptional,
  IsArray,
  IsNumber,
  IsEnum,
  ValidateNested,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ProductCondition } from '../domain/enums/product-condition.enum';

class UpdateAttributeDto {
  @IsString()
  name: string;

  @IsString()
  value: string;
}

class UpdateVariantDto {
  @IsOptional()
  @IsUUID()
  id?: string;

  @IsString()
  sku: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsNumber()
  @Min(0)
  stock: number;

  @IsEnum(ProductCondition)
  condition: ProductCondition;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateAttributeDto)
  attributes: UpdateAttributeDto[];
}

class UpdateImageDto {
  @IsOptional()
  @IsUUID()
  id?: string;

  @IsString()
  url: string;

  @IsOptional()
  @IsBoolean()
  isMain?: boolean;
}

export class UpdateProductDto {
  @IsString()
  name: string;

  @IsString()
  slug: string;

  @IsString()
  description: string;

  @IsUUID()
  categoryId: string;

  @IsUUID()
  brandId: string;

  @IsOptional()
  @IsBoolean()
  isFeatured?: boolean;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateVariantDto)
  variants: UpdateVariantDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateImageDto)
  images: UpdateImageDto[];
}