import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { GetCatalogQuery } from "./get-catalog.query";
import { CATALOG_REPOSITORY } from "../../helpers/catalog-repository.token";
import { PrismaCatalogRepository } from "../../infrastructure/repositories/prisma-catalog.repository";

@QueryHandler(GetCatalogQuery)
export class GetCatalogHandler implements IQueryHandler<GetCatalogQuery> {

    constructor(
        @Inject(CATALOG_REPOSITORY)
        private readonly catalogRepository: PrismaCatalogRepository
    ) {}

    async execute(query: GetCatalogQuery) {
        const { filters } = query;

        return this.catalogRepository.findAll(filters);
    }
}