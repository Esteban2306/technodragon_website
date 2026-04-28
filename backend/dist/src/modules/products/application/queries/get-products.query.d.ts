import { ProductFilters } from "../../types/ProductFilters.types";
export declare class GetProductsQuery {
    readonly filters?: ProductFilters | undefined;
    constructor(filters?: ProductFilters | undefined);
}
