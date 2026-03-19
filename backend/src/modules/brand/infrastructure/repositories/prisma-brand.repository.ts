import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/infrastructure/database/prisma/prisma.service";
import { Brand } from "../../domain/entities/brand.entity";
import { BrandRepository } from "../../domain/repositories/brand.repository";
import { Brand as PrismaBrand } from "@prisma/client";

@Injectable()
export class PrismaBrandRepository implements BrandRepository {
    
    constructor(private prisma: PrismaService) {}

    async create (brand: Brand): Promise<Brand> {
        const data = await this.prisma.brand.create({
            data: {
                id : brand.id,
                name: brand.getName(),
                slug: brand.getSlug(),
                logo: brand.getLogo(),
                isActive: brand.isBrandActive()
            }
        })
        return this.toDomain(data);
    }

        async findAll(params?: {
        isActive?: boolean;
        search?: string;
        page?: number;
        limit?: number;
    }): Promise<Brand[]> {

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

    async findById (id: string): Promise<Brand | null> {
        const data = await this.prisma.brand.findUnique({
            where: {id}
        })

        return data ? this.toDomain(data) : null
    }

    async findBySlug (slug: string): Promise<Brand | null> {
        const data = await this.prisma.brand.findUnique({
            where: {slug}
        })

        return data ? this.toDomain(data) : null
    }

    async update (brand: Brand): Promise<Brand> {
        const data = await this.prisma.brand.update({
            where: {id: brand.id},
            data: {
                name: brand.getName(),
                slug: brand.getSlug(),
                logo: brand.getLogo(),
                isActive: brand.isBrandActive(),
            }
        })

        return this.toDomain(data)
    }

    async deactivate(id: string): Promise<void> {
        await this.prisma.brand.update({
            where: { id },
            data: {
                isActive: false
            }
        });
    }

    async activate(id: string): Promise<void> {
        await this.prisma.brand.update({
            where: { id },
            data: {
                isActive: true
            }
        });
    }

    async delete (id: string): Promise<Brand | null> {
         const data = await this.prisma.brand.delete({
             where: {id}
         })
         return this.toDomain(data)
    }

    private toDomain(data: PrismaBrand): Brand {
            return new Brand(
                data.id,
                data.name,
                data.slug,
                data.logo ?? undefined,
                data.isActive,
                data.createdAt,
                data.updatedAt
            )
        }

}