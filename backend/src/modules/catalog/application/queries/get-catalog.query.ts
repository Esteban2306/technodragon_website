import { CatalogFilters } from "../../types/catalogRepository.types";

export class GetCatalogQuery {
    constructor(
        public readonly filters: CatalogFilters
    ) {}
}