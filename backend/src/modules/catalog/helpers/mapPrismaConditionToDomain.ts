import { ProductCondition as PrismaCondition } from "@prisma/client";
import { ProductCondition as DomainCondition } from "src/modules/products/domain/enums/product-condition.enum";

export function mapPrismaConditionToDomain(
  condition: PrismaCondition
): DomainCondition {

  switch (condition) {
    case PrismaCondition.NEW:
      return DomainCondition.NEW;

    case PrismaCondition.REFURBISHED:
      return DomainCondition.REFURBISHED;

    default:
      throw new Error(`Unknown condition: ${condition}`);
  }
}