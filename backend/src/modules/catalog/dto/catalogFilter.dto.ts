import { Transform } from "class-transformer";
import {
  IsOptional,
  IsNumber,
  IsString,
  IsEnum,
  IsIn,
} from "class-validator";
import { ProductCondition } from "src/modules/products/domain/enums/product-condition.enum";

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

  // 👇 aquí transformas string → objeto
  @IsOptional()
  @Transform(({ value }) => {
    if (!value) return undefined;

    // "color:red,size:m"
    return Object.fromEntries(
      value.split(",").map((pair: string) => {
        const [key, val] = pair.split(":");
        return [key, val];
      })
    );
  })
  attributes?: Record<string, string>;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @Transform(({ value }) => Number(value) || 1)
  page?: number;

  @IsOptional()
  @Transform(({ value }) => Number(value) || 12)
  limit?: number;

  @IsOptional()
  @IsIn(["price", "createdAt"])
  sortBy?: "price" | "createdAt";

  @IsOptional()
  @IsIn(["asc", "desc"])
  sortOrder?: "asc" | "desc";
}