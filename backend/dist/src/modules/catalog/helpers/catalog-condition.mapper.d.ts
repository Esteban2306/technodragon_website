import { ProductCondition as PrismaCondition } from "@prisma/client";
import { ProductCondition as DomainCondition } from "src/modules/products/domain/enums/product-condition.enum";
export declare function mapPrismaConditionToDomain(condition: PrismaCondition): DomainCondition;
