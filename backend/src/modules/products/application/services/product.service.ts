import { BadRequestException, ConflictException, Injectable, NotFoundException, Inject } from "@nestjs/common";
import { PrismaProductRepository } from "../../infrastructure/repositories/prisma-product.repository";
import { EventBusService } from "src/infrastructure/events/event-bus.service";
import { Product } from "../../domain/entities/product.entity";
import { ProductFilters } from "../../types/ProductFilters.types";
import { EventTypes } from "src/infrastructure/events/event.types";
import { PRODUCT_REPOSITORY } from "../../constants/product.tokens";
import { ProductCondition } from "../../domain/enums/product-condition.enum";

@Injectable()
export class ProductService {

    constructor (
        @Inject(PRODUCT_REPOSITORY)
        private productRepository: PrismaProductRepository, 
        private eventBus: EventBusService
    ) {}

    private readonly ERRORS = {
        NOT_FOUND: (id: string) => `Product whit id ${id} not found.`,
        SLUG_EXISTS: (slug: string) => `Producto Slug ${slug} already exist.`,
        NO_VARIANTS: "Product must have at least one variant",
        NO_IMAGES: "Product must have at least one image",
        INVALID_VARIANT: "Variant must have attributes",
    }

    async create(product: Product): Promise<void> {
        await this.ensureSlugIsUnique(product.getSlug());
        this.validateProduct(product);

        this.ensureValidConditions(product);

        await this.productRepository.save(product);

        this.eventBus.emit({
            name: EventTypes.PRODUCT_CREATED,
            occurredAt: new Date(),
            payload: {
            productId: product.id
            }
        });
    }

    async update(product: Product): Promise<void> {
        const existing = await this.productRepository.findById(product.id)

        if (!existing) {
            throw new NotFoundException(this.ERRORS.NOT_FOUND(product.id))
        }

        await this.ensureSlugIsUniqueOnUpdate(product, existing)
        this.validateProduct(product)

        this.ensureValidConditions(product);

        await this.productRepository.update(product)

        this.eventBus.emit({
            name: EventTypes.PRODUCT_UPDATED,
            occurredAt: new Date(),
            payload:{
                productId: product.id
            }
        })

    }

    async updateBasic (
        id: string,
        data: {
            name? : string,
            description?: string,
            slug? : string
        }
    ): Promise<void> {
        const product = await this.productRepository.findById(id);

        if (!product) {
        throw new NotFoundException(this.ERRORS.NOT_FOUND(id));
        }

        if (data.name) product.updatedName(data.name);
        if (data.slug) product.updateSlug(data.slug);
        if (data.description) product.updateDescription(data.description);

        await this.ensureSlugIsUniqueOnUpdate(product, product)

        this.ensureValidConditions(product);

        await this.productRepository.update(product)
    }

    async updateStock(variantId: string, stock: number): Promise<void> {
        const product = await this.productRepository.findByVariantId(variantId)

        if (!product) {
            throw new NotFoundException(`Variant ${variantId} not found`);
        }

        this.ensureValidConditions(product);

        await this.productRepository.updateStock(variantId, stock)

        this.eventBus.emit({
            name: EventTypes.STOCK_UPDATED,
            occurredAt: new Date(),
            payload: {
                productId: product.id,
                variantId,
                stock
            }
        });

        if (stock === 0) {
            this.eventBus.emit({
                name: EventTypes.STOCK_OUT_OF_STOCK,
                occurredAt: new Date(),
                payload: { variantId }
            });
        }

        if (stock < 5) {
            this.eventBus.emit({
                name: EventTypes.STOCK_LOW,
                occurredAt: new Date(),
                payload: {
                    variantId,
                    stock
                }
            });
        }
    }

    async findById(id: string): Promise<Product> {
        const product = await this.productRepository.findById(id);

        if (!product) {
        throw new NotFoundException(this.ERRORS.NOT_FOUND(id));
        }

        return product;
    }

    async findAll (filters: ProductFilters): Promise<Product[]> {
        return this.productRepository.findAll(filters)
    }

    async delete(id: string): Promise<void> {
        const product = await this.productRepository.findById(id);

        if (!product) {
        throw new NotFoundException(this.ERRORS.NOT_FOUND(id));
        }

        product.desactive();

        await this.productRepository.update(product);

        this.eventBus.emit({
            name: EventTypes.PRODUCT_DELETED,
            occurredAt: new Date(),
            payload: {
                productId: id
            }
        })
    }

    private async ensureSlugIsUnique(slug: string) {
        const exist = await this.productRepository.existsBySlug(slug);

        if (exist) {
            throw new ConflictException(this.ERRORS.SLUG_EXISTS(slug))
        }
    }

    private validateProduct(product: Product) {
        if (product.getVariants().length === 0) {
            throw new BadRequestException(this.ERRORS.NO_VARIANTS);
        }

        if (product.getImages().length === 0) {
            throw new BadRequestException(this.ERRORS.NO_IMAGES);
        }

        product.getVariants().forEach(v => {
            if (v.getAttributes().length === 0) {
                throw new BadRequestException(this.ERRORS.INVALID_VARIANT);
            }

            if (!Object.values(ProductCondition).includes(v.getCondition())) {
                throw new BadRequestException("Invalid condition");
            }
        });
    }

    private ensureValidConditions(product: Product) {
        const allowed = Object.values(ProductCondition);

        product.getVariants().forEach(v => {
            if (!allowed.includes(v.getCondition())) {
                throw new BadRequestException(
                    `Invalid condition: ${v.getCondition()}`
                );
            }
        });
    }

    private async ensureSlugIsUniqueOnUpdate (
        incoming: Product,
        existing:Product
    ) {
        if (incoming.getSlug() !== existing.getSlug()) {
            await this.ensureSlugIsUnique(incoming.getSlug())
        }
    }
}