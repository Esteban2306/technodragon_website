"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const prisma_product_repository_1 = require("../../infrastructure/repositories/prisma-product.repository");
const event_bus_service_1 = require("../../../../infrastructure/events/event-bus.service");
const event_types_1 = require("../../../../infrastructure/events/event.types");
const product_tokens_1 = require("../../constants/product.tokens");
const product_condition_enum_1 = require("../../domain/enums/product-condition.enum");
let ProductService = class ProductService {
    productRepository;
    eventBus;
    constructor(productRepository, eventBus) {
        this.productRepository = productRepository;
        this.eventBus = eventBus;
    }
    ERRORS = {
        NOT_FOUND: (id) => `Product whit id ${id} not found.`,
        SLUG_EXISTS: (slug) => `Producto Slug ${slug} already exist.`,
        NO_VARIANTS: 'Product must have at least one variant',
        NO_IMAGES: 'Product must have at least one image',
        INVALID_VARIANT: 'Variant must have attributes',
    };
    async create(product) {
        await this.ensureSlugIsUnique(product.getSlug());
        this.validateProduct(product);
        this.ensureValidConditions(product);
        await this.productRepository.save(product);
        this.eventBus.emit({
            name: event_types_1.EventTypes.PRODUCT_CREATED,
            occurredAt: new Date(),
            payload: {
                productId: product.id,
            },
        });
    }
    async update(product) {
        const existing = await this.productRepository.findDomainById(product.id);
        if (!existing) {
            throw new common_1.NotFoundException(this.ERRORS.NOT_FOUND(product.id));
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
            name: event_types_1.EventTypes.PRODUCT_UPDATED,
            occurredAt: new Date(),
            payload: {
                productId: existing.id,
            },
        });
        const updated = await this.productRepository.findById(existing.id);
        if (!updated) {
            throw new common_1.NotFoundException(this.ERRORS.NOT_FOUND(existing.id));
        }
        return updated;
    }
    async updateBasic(id, data) {
        const product = await this.productRepository.findDomainById(id);
        if (!product) {
            throw new common_1.NotFoundException(this.ERRORS.NOT_FOUND(id));
        }
        if (data.name)
            product.updateName(data.name);
        if (data.slug)
            product.updateSlug(data.slug);
        if (data.description)
            product.updateDescription(data.description);
        await this.ensureSlugIsUniqueOnUpdate(product, product);
        this.ensureValidConditions(product);
        await this.productRepository.update(product);
        const updated = await this.productRepository.findById(id);
        if (!updated) {
            throw new common_1.NotFoundException(this.ERRORS.NOT_FOUND(id));
        }
        return updated;
    }
    async updateStock(variantId, stock) {
        const product = await this.productRepository.findByVariantId(variantId);
        if (!product) {
            throw new common_1.NotFoundException(`Variant ${variantId} not found`);
        }
        this.ensureValidConditions(product);
        await this.productRepository.updateStock(variantId, stock);
        this.eventBus.emit({
            name: event_types_1.EventTypes.STOCK_UPDATED,
            occurredAt: new Date(),
            payload: {
                productId: product.id,
                variantId,
                stock,
            },
        });
        if (stock === 0) {
            this.eventBus.emit({
                name: event_types_1.EventTypes.STOCK_OUT_OF_STOCK,
                occurredAt: new Date(),
                payload: { variantId },
            });
        }
        if (stock < 5) {
            this.eventBus.emit({
                name: event_types_1.EventTypes.STOCK_LOW,
                occurredAt: new Date(),
                payload: {
                    variantId,
                    stock,
                },
            });
        }
    }
    async findById(id) {
        const product = await this.productRepository.findById(id);
        if (!product) {
            throw new common_1.NotFoundException(this.ERRORS.NOT_FOUND(id));
        }
        return product;
    }
    async findAll(filters) {
        return this.productRepository.findAll(filters);
    }
    async findAllPaginated(filters) {
        return this.productRepository.findAllPaginated(filters);
    }
    async delete(id) {
        const product = await this.productRepository.findById(id);
        if (!product) {
            throw new common_1.NotFoundException(this.ERRORS.NOT_FOUND(id));
        }
        await this.productRepository.delete(id);
        this.eventBus.emit({
            name: event_types_1.EventTypes.PRODUCT_DELETED,
            occurredAt: new Date(),
            payload: {
                productId: id,
            },
        });
    }
    async markAsFeatured(productId) {
        const product = await this.productRepository.findById(productId);
        if (!product) {
            throw new common_1.NotFoundException(this.ERRORS.NOT_FOUND(productId));
        }
        const newState = await this.productRepository.markProductAsFeatured(productId);
        this.eventBus.emit({
            name: newState
                ? event_types_1.EventTypes.PRODUCT_FEATURED
                : event_types_1.EventTypes.PRODUCT_UNFEATURED,
            occurredAt: new Date(),
            payload: {
                productId,
                isFeatured: newState,
            },
        });
    }
    async changeProductStatus(id, isActive) {
        const product = await this.productRepository.findDomainById(id);
        if (!product) {
            throw new common_1.NotFoundException(this.ERRORS.NOT_FOUND(id));
        }
        await this.productRepository.toggleActive(id, isActive);
        this.eventBus.emit({
            name: isActive
                ? event_types_1.EventTypes.PRODUCT_ACTIVATED
                : event_types_1.EventTypes.PRODUCT_DISABLED,
            occurredAt: new Date(),
            payload: {
                productId: id,
            },
        });
    }
    async changeVariantStatus(variantId, isActive) {
        const product = await this.productRepository.findByVariantId(variantId);
        if (!product) {
            throw new common_1.NotFoundException(`Variant ${variantId} not found`);
        }
        await this.productRepository.toggleVariantStatus(variantId, isActive);
        this.eventBus.emit({
            name: isActive
                ? event_types_1.EventTypes.VARIANT_ACTIVATED
                : event_types_1.EventTypes.VARIANT_DISABLED,
            occurredAt: new Date(),
            payload: {
                variantId,
                productId: product.id,
            },
        });
    }
    async ensureSlugIsUnique(slug) {
        const exist = await this.productRepository.existsBySlug(slug);
        if (exist) {
            throw new common_1.ConflictException(this.ERRORS.SLUG_EXISTS(slug));
        }
    }
    validateProduct(product) {
        if (product.getVariants().length === 0) {
            throw new common_1.BadRequestException(this.ERRORS.NO_VARIANTS);
        }
        if (product.getImages().length === 0) {
            throw new common_1.BadRequestException(this.ERRORS.NO_IMAGES);
        }
        product.getVariants().forEach((v) => {
            if (v.getAttributes().length === 0) {
                throw new common_1.BadRequestException(this.ERRORS.INVALID_VARIANT);
            }
            if (!Object.values(product_condition_enum_1.ProductCondition).includes(v.getCondition())) {
                throw new common_1.BadRequestException('Invalid condition');
            }
        });
    }
    ensureValidConditions(product) {
        const allowed = Object.values(product_condition_enum_1.ProductCondition);
        product.getVariants().forEach((v) => {
            if (!allowed.includes(v.getCondition())) {
                throw new common_1.BadRequestException(`Invalid condition: ${v.getCondition()}`);
            }
        });
    }
    async ensureSlugIsUniqueOnUpdate(incoming, existing) {
        if (incoming.getSlug() !== existing.getSlug()) {
            await this.ensureSlugIsUnique(incoming.getSlug());
        }
    }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(product_tokens_1.PRODUCT_REPOSITORY)),
    __metadata("design:paramtypes", [prisma_product_repository_1.PrismaProductRepository,
        event_bus_service_1.EventBusService])
], ProductService);
//# sourceMappingURL=product.service.js.map