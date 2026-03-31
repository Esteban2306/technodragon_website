import { Controller, Get, NotFoundException, Param, Query } from "@nestjs/common";
import { QueryBus } from "@nestjs/cqrs";
import { GetCatalogQuery } from "../application/queries/get-catalog.query";
import { GetCatalogByIdQuery } from "../application/queries/getByID-catalog.query";
import { CatalogFilterDto } from "../dto/catalogFilter.dto";

@Controller("catalog")
export class CatalogController {

    constructor(
        private readonly queryBus: QueryBus
    ) {}

    @Get()
    async getCatalog(@Query() query: CatalogFilterDto) {

        return this.queryBus.execute(
            new GetCatalogQuery(query)
        );
    }

    @Get(":id")
    async getById(@Param("id") id: string) {

        const result = await this.queryBus.execute(
            new GetCatalogByIdQuery(id)
        );

        if (!result) {
            throw new NotFoundException(`Catalog item ${id} not found`);
        }

        return result;
    }
}