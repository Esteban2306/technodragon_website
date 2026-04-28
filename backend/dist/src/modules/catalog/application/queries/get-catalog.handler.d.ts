import { IQueryHandler } from "@nestjs/cqrs";
import { GetCatalogQuery } from "./get-catalog.query";
import { PrismaCatalogRepository } from "../../infrastructure/repositories/prisma-catalog.repository";
export declare class GetCatalogHandler implements IQueryHandler<GetCatalogQuery> {
    private readonly catalogRepository;
    constructor(catalogRepository: PrismaCatalogRepository);
    execute(query: GetCatalogQuery): Promise<import("../../types/pagination.types").PaginatedResult<import("../../domain/entities/catalog.entity").CatalogItem>>;
}
