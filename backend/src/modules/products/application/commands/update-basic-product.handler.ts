import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdateBasicProductCommand } from './updateBasic-product.command';
import { ProductService } from '../services/product.service';

@Injectable()
export class UpdateBasicProductHandler {
  constructor(private readonly service: ProductService) {}

  async execute(command: UpdateBasicProductCommand): Promise<void> {
    if (!command.productId) {
      throw new BadRequestException('Product id is required');
    }

    await this.service.updateBasic(command.productId, {
      name: command.name,
      description: command.description,
      slug: command.slug,
    });

  }
}
