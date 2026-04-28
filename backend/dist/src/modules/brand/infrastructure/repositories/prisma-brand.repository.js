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
exports.PrismaBrandRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../../infrastructure/database/prisma/prisma.service");
const brand_entity_1 = require("../../domain/entities/brand.entity");
let PrismaBrandRepository = class PrismaBrandRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(brand) {
        const data = await this.prisma.brand.create({
            data: {
                id: brand.id,
                name: brand.getName(),
                slug: brand.getSlug(),
                logo: brand.getLogo(),
                isActive: brand.isBrandActive()
            }
        });
        return this.toDomain(data);
    }
    async findAll(params) {
        const { isActive, search, page = 1, limit = 10 } = params || {};
        const data = await this.prisma.brand.findMany({
            where: {
                ...(isActive !== undefined && { isActive }),
                ...(search && {
                    name: {
                        contains: search,
                        mode: "insensitive"
                    }
                })
            },
            skip: (page - 1) * limit,
            take: limit,
            orderBy: {
                createdAt: "desc"
            }
        });
        return data.map((item) => this.toDomain(item));
    }
    async findById(id) {
        const data = await this.prisma.brand.findUnique({
            where: { id }
        });
        return data ? this.toDomain(data) : null;
    }
    async findBySlug(slug) {
        const data = await this.prisma.brand.findUnique({
            where: { slug }
        });
        return data ? this.toDomain(data) : null;
    }
    async update(brand) {
        const data = await this.prisma.brand.update({
            where: { id: brand.id },
            data: {
                name: brand.getName(),
                slug: brand.getSlug(),
                logo: brand.getLogo(),
                isActive: brand.isBrandActive(),
            }
        });
        return this.toDomain(data);
    }
    async deactivate(id) {
        await this.prisma.brand.update({
            where: { id },
            data: {
                isActive: false
            }
        });
    }
    async activate(id) {
        await this.prisma.brand.update({
            where: { id },
            data: {
                isActive: true
            }
        });
    }
    async delete(id) {
        const data = await this.prisma.brand.delete({
            where: { id }
        });
        return this.toDomain(data);
    }
    toDomain(data) {
        return new brand_entity_1.Brand(data.id, data.name, data.slug, data.logo ?? undefined, data.isActive, data.createdAt, data.updatedAt);
    }
};
exports.PrismaBrandRepository = PrismaBrandRepository;
exports.PrismaBrandRepository = PrismaBrandRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaBrandRepository);
//# sourceMappingURL=prisma-brand.repository.js.map