import { BadRequestException, Injectable } from '@nestjs/common';
import { ProductService } from '../services/product.service';
import { CreateProductCommand } from './product.command';
import { ProductVariant } from '../../domain/entities/product-varian.entity';
import { VariantAttribute } from '../../domain/entities/variant-attribute.entitt';
import { ProductImage } from '../../domain/entities/product-image.entity';
import { Product } from '../../domain/entities/product.entity';
import { ProductCondition } from '../../domain/enums/product-condition.enum';
import { randomUUID } from 'crypto';

@Injectable()
export class CreateProductHandler {
  constructor(private readonly service: ProductService) {}

  async execute(command: CreateProductCommand): Promise<void> {
    if (!command.name || !command.slug) {
      throw new BadRequestException('Name and slug are required.');
    }

    if (command.variants.length === 0) {
      throw new BadRequestException('At last of variants required.');
    }

    if (command.images.length === 0) {
      throw new BadRequestException('At last of images required.');
    }

    const variants = command.variants.map(
      (v) =>
        new ProductVariant(
          crypto.randomUUID(),
          v.sku,
          v.price,
          v.stock,
          v.condition ?? ProductCondition.NEW,
          v.attributes.map(
            (attr) =>
              new VariantAttribute(crypto.randomUUID(), attr.name, attr.value),
          ),
        ),
    );

    const images = command.images.map(
      (img) => new ProductImage(randomUUID(), img.url, img.isMain ?? false),
    );

    const product = new Product(
      crypto.randomUUID(),
      command.name,
      command.slug,
      command.description,
      command.brandId,
      command.categoryId,
      variants,
      images,
      true,
      false,
      new Date(),
      new Date(),
    );
    await this.service.create(product);
  }
}
