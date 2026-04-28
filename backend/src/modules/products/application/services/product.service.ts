import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  Inject,
} from '@nestjs/common';
import { PrismaProductRepository } from '../../infrastructure/repositories/prisma-product.repository';
import { EventBusService } from 'src/infrastructure/events/event-bus.service';
import { Product } from '../../domain/entities/product.entity';
import { ProductFilters } from '../../types/ProductFilters.types';
import { EventTypes } from 'src/infrastructure/events/event.types';
import { PRODUCT_REPOSITORY } from '../../constants/product.tokens';
import { ProductCondition } from '../../domain/enums/product-condition.enum';
import { ProductResponse } from '../../types/product-response.types';

@Injectable()
export class ProductService {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private productRepository: PrismaProductRepository,
    private eventBus: EventBusService,
  ) {}

  private readonly ERRORS = {
    NOT_FOUND: (id: string) => `Product whit id ${id} not found.`,
    SLUG_EXISTS: (slug: string) => `Producto Slug ${slug} already exist.`,
    NO_VARIANTS: 'Product must have at least one variant',
    NO_IMAGES: 'Product must have at least one image',
    INVALID_VARIANT: 'Variant must have attributes',
  };

  async create(product: Product): Promise<void> {
    await this.ensureSlugIsUnique(product.getSlug());
    this.validateProduct(product);

    this.ensureValidConditions(product);

    await this.productRepository.save(product);

    this.eventBus.emit({
      name: EventTypes.PRODUCT_CREATED,
      occurredAt: new Date(),
      payload: {
        productId: product.id,
      },
    });
  }

  async update(product: Product): Promise<Product> {
    const existing = await this.productRepository.findDomainById(product.id);

    if (!existing) {
      throw new NotFoundException(this.ERRORS.NOT_FOUND(product.id));
    }

    const prevSlug = existing.getSlug();

    existing.updateName(product.getName());
    existing.updateSlug(product.getSlug());
    existing.updateDescription(product.getDescription());

    existing.updateBrand(product.getBrandId());
    existing.updateCategory(product.getCategoryId());

    existing.updateVariants([...product.getVariants()]);
    existing.updateImages([...product.getImages()]);

    if (prevSlug !== existing.getSlug()) {
      await this.ensureSlugIsUnique(existing.getSlug());
    }

    this.validateProduct(existing);
    this.ensureValidConditions(existing);

    await this.productRepository.update(existing);

    this.eventBus.emit({
      name: EventTypes.PRODUCT_UPDATED,
      occurredAt: new Date(),
      payload: {
        productId: existing.id,
      },
    });

    const updated = await this.productRepository.findById(existing.id);

    if (!updated) {
      throw new NotFoundException(this.ERRORS.NOT_FOUND(existing.id));
    }

    return updated;
  }

  async updateBasic(
    id: string,
    data: {
      name?: string;
      description?: string;
      slug?: string;
    },
  ): Promise<Product> {
    const product = await this.productRepository.findDomainById(id);

    if (!product) {
      throw new NotFoundException(this.ERRORS.NOT_FOUND(id));
    }

    if (data.name) product.updateName(data.name);
    if (data.slug) product.updateSlug(data.slug);
    if (data.description) product.updateDescription(data.description);

    await this.ensureSlugIsUniqueOnUpdate(product, product);
    this.ensureValidConditions(product);

    await this.productRepository.update(product);

    const updated = await this.productRepository.findById(id);

    if (!updated) {
      throw new NotFoundException(this.ERRORS.NOT_FOUND(id));
    }

    return updated;
  }

  async updateStock(variantId: string, stock: number): Promise<void> {
    const product = await this.productRepository.findByVariantId(variantId);

    if (!product) {
      throw new NotFoundException(`Variant ${variantId} not found`);
    }

    this.ensureValidConditions(product);

    await this.productRepository.updateStock(variantId, stock);

    this.eventBus.emit({
      name: EventTypes.STOCK_UPDATED,
      occurredAt: new Date(),
      payload: {
        productId: product.id,
        variantId,
        stock,
      },
    });

    if (stock === 0) {
      this.eventBus.emit({
        name: EventTypes.STOCK_OUT_OF_STOCK,
        occurredAt: new Date(),
        payload: { variantId },
      });
    }

    if (stock < 5) {
      this.eventBus.emit({
        name: EventTypes.STOCK_LOW,
        occurredAt: new Date(),
        payload: {
          variantId,
          stock,
        },
      });
    }
  }

  async findById(id: string): Promise<ProductResponse> {
    const product = await this.productRepository.findById(id);

    if (!product) {
      throw new NotFoundException(this.ERRORS.NOT_FOUND(id));
    }

    return product;
  }

  async findAll(filters: ProductFilters): Promise<ProductResponse[]> {
    return this.productRepository.findAll(filters);
  }

  async findAllPaginated(
    filters: ProductFilters,
  ): Promise<{ data: ProductResponse[]; total: number }> {
    return this.productRepository.findAllPaginated(filters);
  }

  async delete(id: string): Promise<void> {
    const product = await this.productRepository.findById(id);

    if (!product) {
      throw new NotFoundException(this.ERRORS.NOT_FOUND(id));
    }

    await this.productRepository.delete(id);

    this.eventBus.emit({
      name: EventTypes.PRODUCT_DELETED,
      occurredAt: new Date(),
      payload: {
        productId: id,
      },
    });
  }

  async markAsFeatured(productId: string): Promise<void> {
    const product = await this.productRepository.findById(productId);

    if (!product) {
      throw new NotFoundException(this.ERRORS.NOT_FOUND(productId));
    }

    const newState =
      await this.productRepository.markProductAsFeatured(productId);

    this.eventBus.emit({
      name: newState
        ? EventTypes.PRODUCT_FEATURED
        : EventTypes.PRODUCT_UNFEATURED,
      occurredAt: new Date(),
      payload: {
        productId,
        isFeatured: newState,
      },
    });
  }

  async changeProductStatus(id: string, isActive: boolean): Promise<void> {
    const product = await this.productRepository.findDomainById(id);

    if (!product) {
      throw new NotFoundException(this.ERRORS.NOT_FOUND(id));
    }

    await this.productRepository.toggleActive(id, isActive);

    this.eventBus.emit({
      name: isActive
        ? EventTypes.PRODUCT_ACTIVATED
        : EventTypes.PRODUCT_DISABLED,
      occurredAt: new Date(),
      payload: {
        productId: id,
      },
    });
  }

  async changeVariantStatus(
    variantId: string,
    isActive: boolean,
  ): Promise<void> {
    const product = await this.productRepository.findByVariantId(variantId);

    if (!product) {
      throw new NotFoundException(`Variant ${variantId} not found`);
    }

    await this.productRepository.toggleVariantStatus(variantId, isActive);

    this.eventBus.emit({
      name: isActive
        ? EventTypes.VARIANT_ACTIVATED
        : EventTypes.VARIANT_DISABLED,
      occurredAt: new Date(),
      payload: {
        variantId,
        productId: product.id,
      },
    });
  }

  private async ensureSlugIsUnique(slug: string) {
    const exist = await this.productRepository.existsBySlug(slug);

    if (exist) {
      throw new ConflictException(this.ERRORS.SLUG_EXISTS(slug));
    }
  }

  private validateProduct(product: Product) {
    if (product.getVariants().length === 0) {
      throw new BadRequestException(this.ERRORS.NO_VARIANTS);
    }

    if (product.getImages().length === 0) {
      throw new BadRequestException(this.ERRORS.NO_IMAGES);
    }

    product.getVariants().forEach((v) => {
      if (v.getAttributes().length === 0) {
        throw new BadRequestException(this.ERRORS.INVALID_VARIANT);
      }

      if (!Object.values(ProductCondition).includes(v.getCondition())) {
        throw new BadRequestException('Invalid condition');
      }
    });
  }

  private ensureValidConditions(product: Product) {
    const allowed = Object.values(ProductCondition);

    product.getVariants().forEach((v) => {
      if (!allowed.includes(v.getCondition())) {
        throw new BadRequestException(`Invalid condition: ${v.getCondition()}`);
      }
    });
  }

  private async ensureSlugIsUniqueOnUpdate(
    incoming: Product,
    existing: Product,
  ) {
    if (incoming.getSlug() !== existing.getSlug()) {
      await this.ensureSlugIsUnique(incoming.getSlug());
    }
  }
}
