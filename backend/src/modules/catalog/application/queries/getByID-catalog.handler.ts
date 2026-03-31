import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { GetCatalogByIdQuery } from "./getByID-catalog.query";
import { CATALOG_REPOSITORY } from "../../helpers/catalog-repository.token";
import { CatalogItem } from "../../domain/entities/catalog.entity";
import { PrismaCatalogRepository } from "../../infrastructure/repositories/prisma-catalog.repository";

@QueryHandler(GetCatalogByIdQuery)
export class GetCatalogByIdHandler
    implements IQueryHandler<GetCatalogByIdQuery>
{

    constructor(
        @Inject(CATALOG_REPOSITORY)
        private readonly catalogRepository: PrismaCatalogRepository
    ) {}

    async execute(query: GetCatalogByIdQuery): Promise<CatalogItem | null> {

        const { id } = query;

        if (!id) {
            throw new Error("Catalog id is required");
        }

        const item = await this.catalogRepository.findById(id);

        return item;
    }
}