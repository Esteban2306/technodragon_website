import { QueryBus } from "@nestjs/cqrs";
import { CatalogFilterDto } from "../dto/catalogFilter.dto";
export declare class CatalogController {
    private readonly queryBus;
    constructor(queryBus: QueryBus);
    getCatalog(query: CatalogFilterDto): Promise<any>;
    getById(id: string): Promise<any>;
}
