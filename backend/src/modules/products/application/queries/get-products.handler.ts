import { Inject, Injectable } from "@nestjs/common";
import { PrismaProductRepository } from "../../infrastructure/repositories/prisma-product.repository";
import { PRODUCT_REPOSITORY } from "../../constants/product.tokens";
import { GetProductsQuery } from "./get-products.query";
import { Product } from "../../domain/entities/product.entity";

@Injectable()
export class GetProductHandler {
    constructor (
        @Inject(PRODUCT_REPOSITORY)
        private readonly repository: PrismaProductRepository
    ) {}

    async execute (query: GetProductsQuery): Promise<Product[]> {
        return this.repository.findAll(query.filters)
    }
}