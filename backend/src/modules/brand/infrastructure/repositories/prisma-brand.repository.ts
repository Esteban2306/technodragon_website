import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/database/prisma/prisma.service';
import { Brand } from '../../domain/entities/brand.entity';
import { BrandRepository } from '../../domain/repositories/brand.repository';
import { Prisma, Brand as PrismaBrand } from '@prisma/client';
import { FindBrandsQueryDto } from '../../dto/find-brand.dto';
import { PaginatedResponseDto } from 'src/common/shared/paginated-response.dto';

@Injectable()
export class PrismaBrandRepository implements BrandRepository {
  constructor(private prisma: PrismaService) {}

  async create(brand: Brand): Promise<Brand> {
    const data = await this.prisma.brand.create({
      data: {
        id: brand.id,
        name: brand.getName(),
        slug: brand.getSlug(),
        logo: brand.getLogo(),
        isActive: brand.isBrandActive(),
      },
    });
    return this.toDomain(data);
  }

  async findAll(
    params?: FindBrandsQueryDto,
  ): Promise<PaginatedResponseDto<Brand>> {
    const {
      isActive,
      search,
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      order = 'desc',
    } = params || {};

    const where: Prisma.BrandWhereInput = {
      ...(isActive !== undefined && { isActive }),
      ...(search && {
        name: { contains: search, mode: 'insensitive' },
      }),
    };

    const [items, total] = await this.prisma.$transaction([
      this.prisma.brand.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { [sortBy]: order },
      }),
      this.prisma.brand.count({ where }),
    ]);

    return {
      data: items.map((item) => this.toDomain(item)),
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  async findById(id: string): Promise<Brand | null> {
    const data = await this.prisma.brand.findUnique({
      where: { id },
    });

    return data ? this.toDomain(data) : null;
  }

  async findBySlug(slug: string): Promise<Brand | null> {
    const data = await this.prisma.brand.findUnique({
      where: { slug },
    });

    return data ? this.toDomain(data) : null;
  }

  async update(brand: Brand): Promise<Brand> {
    const data = await this.prisma.brand.update({
      where: { id: brand.id },
      data: {
        name: brand.getName(),
        slug: brand.getSlug(),
        logo: brand.getLogo(),
        isActive: brand.isBrandActive(),
      },
    });

    return this.toDomain(data);
  }

  async deactivate(id: string): Promise<void> {
    await this.prisma.brand.update({
      where: { id },
      data: {
        isActive: false,
      },
    });
  }

  async activate(id: string): Promise<void> {
    await this.prisma.brand.update({
      where: { id },
      data: {
        isActive: true,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.brand.delete({ where: { id } });
  }

  private toDomain(data: PrismaBrand): Brand {
    return new Brand(
      data.id,
      data.name,
      data.slug,
      data.logo ?? undefined,
      data.isActive,
      data.createdAt,
      data.updatedAt,
    );
  }
}
