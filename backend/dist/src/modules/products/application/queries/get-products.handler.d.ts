import { PrismaProductRepository } from "../../infrastructure/repositories/prisma-product.repository";
import { GetProductsQuery } from "./get-products.query";
import { ProductResponse } from "../../types/product-response.types";
export declare class GetProductHandler {
    private readonly repository;
    constructor(repository: PrismaProductRepository);
    execute(query: GetProductsQuery): Promise<ProductResponse[]>;
}
