import { IsBoolean, IsOptional, IsString } from "class-validator";

export class UpdateBrandDto {

    @IsString()
    @IsOptional()
    name! : string

    @IsString()
    @IsOptional()
    slug! : string

    @IsString()
    @IsOptional()
    logo? : string

    @IsBoolean()
    @IsOptional()
    isActive: string

}