import { Module } from '@nestjs/common';
import { ProductController } from './controllers/products.controller';
import { ProductService } from './application/services/product.service';
import { PrismaProductRepository } from './infrastructure/repositories/prisma-product.repository';
import type { ProductRepository } from './domain/repositories/product.repository.interface';
import { PRODUCT_REPOSITORY } from './constants/product.tokens';
import { EventsModule } from 'src/infrastructure/events/events.module';
import { CreateProductHandler } from './application/commands/product-handler.command';
import { DeleteProductHandler } from './application/commands/delete-product.handler';
import { UpdateBasicProductHandler } from './application/commands/update-basic-product.handler';
import { UpdateProductHandler } from './application/commands/update-product.handler';
import { UpdateStockProductHandler } from './application/commands/updateStock-product-handler';
import { GetProductHandler } from './application/queries/get-products.handler';
import { GetProductByIdHandler } from './application/queries/get-product-by-id.handler';
import { CloudinaryService } from 'src/infrastructure/service/cloudinary/cloudinary.service';

const CommandHandlers = [
  CreateProductHandler,
  UpdateProductHandler,
  UpdateStockProductHandler,
  UpdateBasicProductHandler,
  DeleteProductHandler
];

const QueryHandlers = [
  GetProductHandler,
  GetProductByIdHandler,
];


@Module({
  controllers: [ProductController],
  imports: [EventsModule],
  providers: [
    CloudinaryService,
    ProductService,
    ...CommandHandlers,
    ...QueryHandlers,
    {
      provide: PRODUCT_REPOSITORY,
      useClass: PrismaProductRepository,
    },
  ],
  exports: [ProductService, CloudinaryService],
})
export class ProductModule {}
