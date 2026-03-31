import { Injectable, NotFoundException, Inject } from "@nestjs/common";
import { PRODUCT_REPOSITORY } from "../../constants/product.tokens";
import { PrismaProductRepository } from "../../infrastructure/repositories/prisma-product.repository";
import { GetProductByIdQuery } from "./get-product-by-id.query";

@Injectable()
export class GetProductByIdHandler {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly repository: PrismaProductRepository
  ) {}

  async execute(query: GetProductByIdQuery) {
    const product = await this.repository.findById(query.id);

    if (!product) {
      throw new NotFoundException(`Product ${query.id} not found`);
    }

    return product;
  }
}