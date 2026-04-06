import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  Query,
  UseGuards
} from "@nestjs/common";

import { CreateProductHandler } from "../application/commands/product-handler.command";
import type { ProductFilters } from "../types/ProductFilters.types";
import { DeleteProductCommand } from "../application/commands/delete-product.command";
import { DeleteProductHandler } from "../application/commands/delete-product.handler";
import { UpdateBasicProductHandler } from "../application/commands/update-basic-product.handler";
import { UpdateProductHandler } from "../application/commands/update-product.handler";
import { UpdateProductCommand } from "../application/commands/update-product.command";
import { UpdateBasicProductCommand } from "../application/commands/updateBasic-product.command";
import { UpdateStockProductCommand } from "../application/commands/updateStock-product.command";
import { UpdateStockProductHandler } from "../application/commands/updateStock-product-handler";
import { CreateProductDto } from "../dto/create-product.dto";
import { GetProductByIdHandler } from "../application/queries/get-product-by-id.handler";
import { GetProductHandler } from "../application/queries/get-products.handler";
import { GetProductsQuery } from "../application/queries/get-products.query";
import { GetProductByIdQuery } from "../application/queries/get-product-by-id.query";
import { JwtGuard } from "src/modules/auth/guards/jwt-auth.guard";
import { AdminGuard } from "src/modules/auth/guards/admin.guard";

@Controller("products")
export class ProductController {
  constructor(
    private readonly createHandler: CreateProductHandler,
    private readonly deleteHandler: DeleteProductHandler,
    private readonly updateBasicHandler: UpdateBasicProductHandler,
    private readonly updateHandler: UpdateProductHandler,
    private readonly updateStockHandler: UpdateStockProductHandler,
    private readonly getProductsHandler: GetProductHandler,
    private readonly getProductByIdHandler: GetProductByIdHandler,
  ) {}

  @UseGuards(JwtGuard, AdminGuard)
  @Post()
  async create(@Body() body: CreateProductDto): Promise<void> {
    return this.createHandler.execute(body);
  }

  @Get()
  async findAll(@Query() query: ProductFilters) {
    return this.getProductsHandler.execute(
      new GetProductsQuery(query)
    );
  }

  @Get(":id")
  async findById(@Param("id") id: string) {
    return this.getProductByIdHandler.execute(
      new GetProductByIdQuery(id)
    );
  }

  @UseGuards(JwtGuard, AdminGuard)
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


  @UseGuards(JwtGuard, AdminGuard)
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

  @UseGuards(JwtGuard, AdminGuard)
  @Put("variants/:variantId/stock")
  async updateStock(
    @Param("variantId") variantId: string,
    @Body() Body: Omit<UpdateStockProductCommand, "variantId">
  ) {
    const command = new UpdateStockProductCommand(variantId, Body.stock)

    return this.updateStockHandler.execute(command)
  }

  @UseGuards(JwtGuard, AdminGuard)
  @Delete(":id")
  async delete(@Param("id") id: string) {
    const command = new DeleteProductCommand(id)

    return this.deleteHandler.execute(command)
  }
}