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
exports.PrismaCategoryRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../../infrastructure/database/prisma/prisma.service");
const category_entity_1 = require("../../domain/entities/category.entity");
let PrismaCategoryRepository = class PrismaCategoryRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(category) {
        const data = await this.prisma.category.create({
            data: {
                id: category.id,
                name: category.getName(),
                slug: category.getSlug(),
                parentId: category.getParentId()
            }
        });
        return this.toDomain(data);
    }
    async findAll() {
        const data = await this.prisma.category.findMany();
        return data.map(this.toDomain);
    }
    async findById(id) {
        const data = await this.prisma.category.findUnique({
            where: { id }
        });
        return data ? this.toDomain(data) : null;
    }
    async findBySlug(slug) {
        const data = await this.prisma.category.findUnique({
            where: { slug }
        });
        return data ? this.toDomain(data) : null;
    }
    async update(category) {
        const data = await this.prisma.category.update({
            where: { id: category.id },
            data: {
                name: category.getName(),
                slug: category.getSlug(),
                parentId: category.getParentId()
            }
        });
        return this.toDomain(data);
    }
    async delete(id) {
        await this.prisma.category.delete({
            where: { id }
        });
    }
    async getTree() {
        const data = await this.prisma.category.findMany();
        const category = data.map((item) => this.toDomain(item));
        const map = new Map();
        category.forEach((cat) => {
            map.set(cat.id, cat);
        });
        const tree = [];
        category.forEach((cat) => {
            if (cat.getParentId()) {
                const parent = map.get(cat.getParentId());
                if (parent) {
                    const currentChildren = parent.getChildren();
                    parent.setChildren([...currentChildren, cat]);
                }
            }
            else {
                tree.push(cat);
            }
        });
        return tree;
    }
    toDomain(data) {
        return new category_entity_1.Category(data.id, data.name, data.slug, data.parentId ?? undefined, []);
    }
};
exports.PrismaCategoryRepository = PrismaCategoryRepository;
exports.PrismaCategoryRepository = PrismaCategoryRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaCategoryRepository);
//# sourceMappingURL=prisma-category.repository.js.map