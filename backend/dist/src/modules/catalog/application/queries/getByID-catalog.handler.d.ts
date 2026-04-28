import { IQueryHandler } from "@nestjs/cqrs";
import { GetCatalogByIdQuery } from "./getByID-catalog.query";
import { CatalogItem } from "../../domain/entities/catalog.entity";
import { PrismaCatalogRepository } from "../../infrastructure/repositories/prisma-catalog.repository";
export declare class GetCatalogByIdHandler implements IQueryHandler<GetCatalogByIdQuery> {
    private readonly catalogRepository;
    constructor(catalogRepository: PrismaCatalogRepository);
    execute(query: GetCatalogByIdQuery): Promise<CatalogItem | null>;
}
