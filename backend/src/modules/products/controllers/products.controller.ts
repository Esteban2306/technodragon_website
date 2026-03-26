import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  Query
} from "@nestjs/common";

import { CreateProductHandler } from "../application/commands/product-handler.command";
import { CreateProductCommand } from "../application/commands/product.command";
import { ProductService } from "../application/services/product.service";
import type { ProductFilters } from "../types/ProductFilters.types";
import { DeleteProductCommand } from "../application/commands/delete-product.command";
import { DeleteProductHandler } from "../application/commands/delete-product.handler";
import { UpdateBasicProductHandler } from "../application/commands/update-basic-product.handler";
import { UpdateProductHandler } from "../application/commands/update-product.handler";
import { UpdateProductCommand } from "../application/commands/update-product.command";
import { UpdateBasicProductCommand } from "../application/commands/updateBasic-product.command";
import { UpdateStockProductCommand } from "../application/commands/updateStock-product.command";
import { UpdateStockProductHandler } from "../application/commands/updateStock-product-handler";

@Controller("products")
export class ProductController {
  constructor(
    private readonly createHandler: CreateProductHandler,
    private readonly deleteHandler: DeleteProductHandler,
    private readonly updateBasicHandler: UpdateBasicProductHandler,
    private readonly updateHandler: UpdateProductHandler,
    private readonly updateStockHandler: UpdateStockProductHandler,
    private readonly productService: ProductService
  ) {}

  @Post()
  async create(@Body() body: CreateProductCommand): Promise<void> {
    return this.createHandler.execute(body);
  }

  @Get()
  async findAll(@Query() query: ProductFilters) {
    return this.productService.findAll(query);
  }

  @Get(":id")
  async findById(@Param("id") id: string) {
    return this.productService.findById(id);
  }

  @Put(":id")
  async update(
    @Param("id") id: string,
    @Body() body: Omit<UpdateProductCommand, "productId">
  ) {
    const command = new UpdateProductCommand(
      id,
      body.name,
      body.slug,
      body.description,
      body.brandId,
      body.categoryId,
      body.variants,
      body.images
    );

    return this.updateHandler.execute(command);
  }


  @Put(":id/basic")
  async updateBasic(
    @Param("id") id: string,
    @Body() body: Omit<UpdateBasicProductCommand, "productId">
  ) {
    const command = new UpdateBasicProductCommand(
      id,
      body.name,
      body.slug,
      body.description
    );

    return this.updateBasicHandler.execute(command);
  }

  @Put("variants/:variantId/stock")
  async updateStock(
    @Param("variantId") variantId: string,
    @Body() Body: Omit<UpdateStockProductCommand, "variantId">
  ) {
    const command = new UpdateStockProductCommand(variantId, Body.stock)

    return this.updateStockHandler.execute(command)
  }

  @Delete(":id")
  async delete(@Param("id") id: string) {
    const command = new DeleteProductCommand(id)

    return this.deleteHandler.execute(command)
  }
}