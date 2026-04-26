import { Transform, Type } from 'class-transformer';
import {
  IsOptional,
  IsNumber,
  IsString,
  IsEnum,
  IsIn,
  IsInt,
  Min,
  IsBoolean,
} from 'class-validator';
import { ProductCondition } from 'src/modules/products/domain/enums/product-condition.enum';

export class CatalogFilterDto {
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  minPrice?: number;

  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  maxPrice?: number;

  @IsOptional()
  @IsString()
  brandId?: string;

  @IsOptional()
  @IsString()
  categoryId?: string;

  @IsOptional()
  @IsEnum(ProductCondition)
  condition?: ProductCondition;

  @IsOptional()
  @Transform(({ value }) => {
    if (!value) return undefined;

    return Object.fromEntries(
      value.split(',').map((pair: string) => {
        const [key, val] = pair.split(':');
        return [key, val];
      }),
    );
  })
  attributes?: Record<string, string>;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number;

  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  isFeatured?: boolean;

  @IsOptional()
  @IsIn(['price', 'createdAt'])
  sortBy?: 'price' | 'createdAt';

  @IsOptional()
  @IsIn(['asc', 'desc'])
  sortOrder?: 'asc' | 'desc';
}
