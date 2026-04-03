import { IsUUID, IsInt, Min } from "class-validator";

export class UpdateItemDto {
  @IsUUID()
  variantId: string;

  @IsInt()
  @Min(1)
  quantity: number;
}