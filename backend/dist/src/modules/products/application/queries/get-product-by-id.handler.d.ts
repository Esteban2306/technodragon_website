import { PrismaProductRepository } from "../../infrastructure/repositories/prisma-product.repository";
import { GetProductByIdQuery } from "./get-product-by-id.query";
export declare class GetProductByIdHandler {
    private readonly repository;
    constructor(repository: PrismaProductRepository);
    execute(query: GetProductByIdQuery): Promise<import("../../types/product-response.types").ProductResponse>;
}
