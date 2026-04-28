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
exports.CategoriesService = void 0;
const common_1 = require("@nestjs/common");
const category_repository_1 = require("../../domain/repositories/category.repository");
const category_entity_1 = require("../../domain/entities/category.entity");
const event_bus_service_1 = require("../../../../infrastructure/events/event-bus.service");
const event_types_1 = require("../../../../infrastructure/events/event.types");
let CategoriesService = class CategoriesService {
    categoryRepo;
    eventBus;
    constructor(categoryRepo, eventBus) {
        this.categoryRepo = categoryRepo;
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
            const existing = await this.categoryRepo.findBySlug(dto.slug);
            if (existing) {
                throw new common_1.ConflictException('Slug already exists');
            }
            if (dto.parentId) {
                await this.findById(dto.parentId);
            }
            const category = new category_entity_1.Category(crypto.randomUUID(), dto.name, dto.slug, dto.parentId);
            const created = await this.categoryRepo.create(category);
            this.eventBus.emit({
                name: event_types_1.EventTypes.CATEGORY_CREATED,
                payload: {
                    categoryId: created.id,
                    name: created.getName(),
                    slug: created.getSlug(),
                },
                occurredAt: new Date(),
            });
            return created;
        }, 'create category');
    }
    async findAll() {
        return this.execute(() => this.categoryRepo.findAll(), 'findAll categories');
    }
    async findById(id) {
        return this.execute(async () => {
            const category = await this.categoryRepo.findById(id);
            if (!category) {
                throw new common_1.NotFoundException('Category not found');
            }
            return category;
        }, 'findById category');
    }
    async findBySlug(slug) {
        return this.execute(async () => {
            const category = await this.categoryRepo.findBySlug(slug);
            if (!category) {
                throw new common_1.NotFoundException(`Category with slug ${slug} not found`);
            }
            return category;
        }, 'findBySlug category');
    }
    async update(id, dto) {
        return this.execute(async () => {
            const category = await this.findById(id);
            if (dto.slug) {
                const existing = await this.categoryRepo.findBySlug(dto.slug);
                if (existing && existing.id !== id) {
                    throw new common_1.ConflictException('Slug already exists');
                }
            }
            if (dto.parentId) {
                await this.findById(dto.parentId);
            }
            if (dto.name)
                category.updateName(dto.name);
            if (dto.slug)
                category.updateSlug(dto.slug);
            if (dto.parentId !== undefined)
                category.updateParent(dto.parentId);
            const update = await this.categoryRepo.update(category);
            this.eventBus.emit({
                name: event_types_1.EventTypes.CATEGORY_UPDATED,
                payload: {
                    categoryId: update.id,
                },
                occurredAt: new Date(),
            });
            return update;
        }, 'update category');
    }
    async delete(id) {
        return this.execute(async () => {
            await this.findById(id);
            await this.categoryRepo.delete(id);
            this.eventBus.emit({
                name: event_types_1.EventTypes.CATEGORY_DELETED,
                payload: {
                    categoryId: id,
                },
                occurredAt: new Date(),
            });
        }, 'delete category');
    }
    async getTree() {
        return this.execute(() => this.categoryRepo.getTree(), 'getTree categories');
    }
};
exports.CategoriesService = CategoriesService;
exports.CategoriesService = CategoriesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [category_repository_1.CategoryRepository,
        event_bus_service_1.EventBusService])
], CategoriesService);
//# sourceMappingURL=categories.service.js.map