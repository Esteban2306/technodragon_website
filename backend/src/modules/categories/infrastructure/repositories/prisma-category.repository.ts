import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/database/prisma/prisma.service';
import { Category } from '../../domain/entities/category.entity';
import { CategoryRepository } from '../../domain/repositories/category.repository';
import { Prisma, Category as PrismaCategory } from '@prisma/client';
import { FindCategoriesQueryDto } from '../../dto/find-categories.dto';
import { PaginatedResponseDto } from 'src/common/shared/paginated-response.dto';

@Injectable()
export class PrismaCategoryRepository implements CategoryRepository {
  constructor(private prisma: PrismaService) {}

  async create(category: Category): Promise<Category> {
    const data = await this.prisma.category.create({
      data: {
        id: category.id,
        name: category.getName(),
        slug: category.getSlug(),
        parentId: category.getParentId(),
      },
    });

    return this.toDomain(data);
  }

  async findAll(
    query: FindCategoriesQueryDto,
  ): Promise<PaginatedResponseDto<Category>> {
    const {
      search,
      parentId,
      page = 1,
      limit = 20,
      sortBy = 'createdAt',
      order = 'desc',
    } = query;

    const where: Prisma.CategoryWhereInput = {
      ...(search && {
        name: { contains: search, mode: 'insensitive' },
      }),
      // 'root' filtra solo categorías sin padre
      ...(parentId === 'root'
        ? { parentId: null }
        : parentId
          ? { parentId }
          : {}),
    };

    const [items, total] = await this.prisma.$transaction([
      this.prisma.category.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { [sortBy]: order },
      }),
      this.prisma.category.count({ where }),
    ]);

    return {
      data: items.map(this.toDomain),
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findById(id: string): Promise<Category | null> {
    const data = await this.prisma.category.findUnique({
      where: { id },
    });

    return data ? this.toDomain(data) : null;
  }

  async findBySlug(slug: string): Promise<Category | null> {
    const data = await this.prisma.category.findUnique({
      where: { slug },
    });

    return data ? this.toDomain(data) : null;
  }

  async update(category: Category): Promise<Category> {
    const data = await this.prisma.category.update({
      where: { id: category.id },
      data: {
        name: category.getName(),
        slug: category.getSlug(),
        parentId: category.getParentId(),
      },
    });

    return this.toDomain(data);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.category.delete({
      where: { id },
    });
  }

  async getTree(): Promise<Category[]> {
    const data = await this.prisma.category.findMany();

    const category = data.map((item) => this.toDomain(item));

    const map = new Map<string, Category>();

    category.forEach((cat) => {
      map.set(cat.id, cat);
    });

    const tree: Category[] = [];

    category.forEach((cat) => {
      if (cat.getParentId()) {
        const parent = map.get(cat.getParentId()!);
        if (parent) {
          const currentChildren = parent.getChildren();
          parent.setChildren([...currentChildren, cat]);
        }
      } else {
        tree.push(cat);
      }
    });

    return tree;
  }

  private toDomain(data: PrismaCategory): Category {
    return new Category(
      data.id,
      data.name,
      data.slug,
      data.parentId ?? undefined,
      [],
    );
  }
}
