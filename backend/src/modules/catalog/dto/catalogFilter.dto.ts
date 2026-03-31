import { Type } from "class-transformer";
import { IsEnum, IsIn, IsNumber, IsOptional, IsString } from "class-validator";
import { ProductCondition } from "src/modules/products/domain/enums/product-condition.enum";

export class CatalogFilterDto {

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    minPrice: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    maxPrice: number;

    @IsOptional()
    @IsString()
    brandId: string;

    @IsOptional()
    @IsString()
    categoryId: string;

    @IsOptional()
    @IsEnum(ProductCondition)
    condition: ProductCondition;

    @IsOptional()
    @IsString()
    attributes: string;

    @IsOptional()
    @IsString()
    search: string;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    page: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    limit: number;

    @IsOptional()
    @IsIn(["price", "createdAt"])
    sortBy?: "price" | "createdAt";

    @IsOptional()
    @IsIn(["asc", "desc"])
    sortOrder?: "asc" | "desc";
}