import { IsString, IsBoolean, IsOptional, IsArray, ValidateNested, IsNumber, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { ProductCondition } from '../domain/enums/product-condition.enum';

class AttributeDto {
  @IsString() name: string;
  @IsString() value: string;
}

class VariantDto {
  @IsString() sku: string;
  @IsNumber() price: number;
  @IsNumber() stock: number;
  @IsEnum(ProductCondition) condition: ProductCondition;
  @IsArray() @ValidateNested({ each: true }) @Type(() => AttributeDto) attributes: AttributeDto[];
}

class ImageDto {
  @IsString() url: string;
  @IsOptional() @IsBoolean() isMain?: boolean;
}

export class CreateProductDto {
  @IsString() name: string;
  @IsString() slug: string;
  @IsString() description: string;
  @IsString() categoryId: string;
  @IsString() brandId: string;
  @IsOptional() @IsBoolean() isFeatured?: boolean;
  @IsArray() @ValidateNested({ each: true }) @Type(() => VariantDto) variants: VariantDto[];
  @IsArray() @ValidateNested({ each: true }) @Type(() => ImageDto) images: ImageDto[];
}