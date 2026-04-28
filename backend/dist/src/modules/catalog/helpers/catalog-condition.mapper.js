"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapPrismaConditionToDomain = mapPrismaConditionToDomain;
const client_1 = require("@prisma/client");
const product_condition_enum_1 = require("../../products/domain/enums/product-condition.enum");
function mapPrismaConditionToDomain(condition) {
    switch (condition) {
        case client_1.ProductCondition.NEW:
            return product_condition_enum_1.ProductCondition.NEW;
        case client_1.ProductCondition.REFURBISHED:
            return product_condition_enum_1.ProductCondition.REFURBISHED;
        default:
            throw new Error(`Unknown condition: ${condition}`);
    }
}
//# sourceMappingURL=catalog-condition.mapper.js.map