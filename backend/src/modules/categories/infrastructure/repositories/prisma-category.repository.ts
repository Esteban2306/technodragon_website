import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/infrastructure/database/prisma/prisma.service";
import { Category } from "../../domain/entities/category.entity";
import { CategoryRepository } from "../../domain/repositories/category.repository";
import { Category as PrismaCategory } from "@prisma/client";

@Injectable() 
export class PrismaCategoryRepository implements CategoryRepository {
    constructor(private prisma: PrismaService) {}

    async create(category: Category): Promise<Category> {
        const data = await this.prisma.category.create({
            data: {
                id: category.id,
                name: category.name,
                slug: category.slug,
                parentId: category.parentId
            }
        })

        return this.toDomain(data);
    }

    async findAll(): Promise<Category[]> {
        const data = await this.prisma.category.findMany()

        return data.map(this.toDomain)
    }

    async findById(id: string): Promise<Category | null> {
        const data = await this.prisma.category.findUnique({
            where: { id }
        })

        return data ? this.toDomain(data) : null;
    }

    async findBySlug(slug: string): Promise<Category | null> {
        const data = await this.prisma.category.findUnique({
            where: { slug }
        })

        return data ? this.toDomain(data) : null;
    }

    async update(category: Category): Promise<Category> {
        const data = await this.prisma.category.update({
            where: { id: category.id },
            data: {
                name: category.name,
                slug: category.slug,
                parentId: category.parentId
            }
        })

        return this.toDomain(data)
    }

    async delete(id: string): Promise<void> {
        await this.prisma.category.delete({
            where: { id }
        })
    }

    async getTree(): Promise<Category[]> {
        const data = await this.prisma.category.findMany();

        const category = data.map((item) => this.toDomain(item))

        const map = new Map<string, Category>()

        category.forEach((cat) => {
            map.set(cat.id, cat)
        })

        const tree: Category[] = []

        category.forEach((cat) => {
            if (cat.parentId) {
                const parent = map.get(cat.parentId)
                if (parent) {
                    parent.children.push(cat)
                }
            } else {
                tree.push(cat)
            }
        })

        return tree
    }

    private toDomain(data: PrismaCategory): Category {
        return new Category(
            data.id,
            data.name,
            data.slug,
            data.parentId ?? undefined,
            []
        )
    }
}