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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrandService = void 0;
const common_1 = require("@nestjs/common");
const brand_repository_1 = require("../domain/repositories/brand.repository");
const brand_entity_1 = require("../domain/entities/brand.entity");
const event_bus_service_1 = require("../../../infrastructure/events/event-bus.service");
const event_types_1 = require("../../../infrastructure/events/event.types");
let BrandService = class BrandService {
    brandRepo;
    eventBus;
    constructor(brandRepo, eventBus) {
        this.brandRepo = brandRepo;
        this.eventBus = eventBus;
    }
    async execute(fn, context) {
        try {
            return await fn();
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException ||
                error instanceof common_1.ConflictException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException(`Internal error in ${context}`);
        }
    }
    async create(dto) {
        return this.execute(async () => {
            const existing = await this.brandRepo.findBySlug(dto.slug);
            if (existing) {
                throw new common_1.ConflictException('Slug already exists');
            }
            const brand = new brand_entity_1.Brand(crypto.randomUUID(), dto.name, dto.slug, dto.logo);
            const created = await this.brandRepo.create(brand);
            this.eventBus.emit({
                name: event_types_1.EventTypes.BRAND_CREATED,
                payload: {
                    brandId: created.id,
                    name: created.getName(),
                    slug: created.getSlug(),
                },
                occurredAt: new Date(),
            });
            return created;
        }, 'Create Brand');
    }
    async findAll(params) {
        return this.execute(() => this.brandRepo.findAll(params), "findAll Brands");
    }
    async findById(id) {
        return this.execute(async () => {
            const data = await this.brandRepo.findById(id);
            if (!data) {
                throw new common_1.NotFoundException('Brand not found');
            }
            return data;
        }, 'findById brand succes');
    }
    async findBySlug(slug) {
        return this.execute(async () => {
            const data = await this.brandRepo.findBySlug(slug);
            if (!data) {
                throw new common_1.NotFoundException('Brand not found');
            }
            return data;
        }, 'findBySlug brand succes');
    }
    async update(id, dto) {
        return this.execute(async () => {
            const brand = await this.findById(id);
            if (dto.slug) {
                const existing = await this.brandRepo.findBySlug(dto.slug);
                if (existing && existing.id !== id) {
                    throw new common_1.ConflictException('Slug already exists');
                }
            }
            if (dto.name)
                brand.updateName(dto.name);
            if (dto.slug)
                brand.updateSlug(dto.slug);
            if (dto.logo)
                brand.updateLogo(dto.logo);
            if (dto.isActive !== undefined) {
                dto.isActive ? brand.activate() : brand.deactivate();
            }
            const updated = await this.brandRepo.update(brand);
            this.eventBus.emit({
                name: event_types_1.EventTypes.BRAND_UPDATED,
                payload: {
                    brandId: updated.id,
                },
                occurredAt: new Date(),
            });
            return updated;
        }, 'update brand');
    }
    async deactivate(id) {
        return this.execute(async () => {
            const brand = await this.findById(id);
            if (!brand.isBrandActive())
                return;
            await this.brandRepo.deactivate(id);
            this.eventBus.emit({
                name: event_types_1.EventTypes.BRAND_DEACTIVATED,
                payload: {
                    brandId: id,
                },
                occurredAt: new Date(),
            });
        }, 'deactivate brand');
    }
    async activate(id) {
        return this.execute(async () => {
            const brand = await this.findById(id);
            if (brand.isBrandActive())
                return;
            await this.brandRepo.activate(id);
            this.eventBus.emit({
                name: event_types_1.EventTypes.BRAND_ACTIVATED,
                payload: {
                    brandId: id,
                },
                occurredAt: new Date(),
            });
        }, 'activate brand');
    }
    async delete(id) {
        return this.execute(async () => {
            await this.findById(id);
            await this.brandRepo.delete(id);
        }, 'delete category');
    }
};
exports.BrandService = BrandService;
exports.BrandService = BrandService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [brand_repository_1.BrandRepository,
        event_bus_service_1.EventBusService])
], BrandService);
//# sourceMappingURL=brand.service.js.map