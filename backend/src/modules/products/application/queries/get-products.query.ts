import { ProductFilters } from "../../types/ProductFilters.types";

export class GetProductsQuery {
    constructor (
        public readonly filters?: ProductFilters
    ) {}
}