import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CategoryRepository } from '../../domain/repositories/category.repository';
import { CreateCategoryDto } from '../../dto/create-category.dto';
import { Category } from '../../domain/entities/category.entity';
import { UpdateCategoryDto } from '../../dto/update-category.dto';
import { EventBusService } from 'src/infrastructure/events/event-bus.service';
import { EventTypes } from 'src/infrastructure/events/event.types';

@Injectable()
export class CategoriesService {
  constructor(
    private readonly categoryRepo: CategoryRepository,
    private readonly eventBus: EventBusService,
  ) {}

  private async execute<T>(fn: () => Promise<T>, context: string): Promise<T> {
    try {
      return await fn();
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof ConflictException
      ) {
        throw error;
      }

      console.error(`[CategoriesService] ${context}`, error);

      throw new InternalServerErrorException(`Internal error in ${context}`);
    }
  }

  async create(dto: CreateCategoryDto): Promise<Category> {
    return this.execute(async () => {
      const existing = await this.categoryRepo.findBySlug(dto.slug);

      if (existing) {
        throw new ConflictException('Slug already exists');
      }

      if (dto.parentId) {
        await this.findById(dto.parentId);
      }

      const category = new Category(
        crypto.randomUUID(),
        dto.name,
        dto.slug,
        dto.parentId,
      );

      const created = await this.categoryRepo.create(category);
      this.eventBus.emit({
        name: EventTypes.CATEGORY_CREATED,
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

  async findAll(): Promise<Category[]> {
    return this.execute(
      () => this.categoryRepo.findAll(),
      'findAll categories',
    );
  }

  async findById(id: string): Promise<Category> {
    return this.execute(async () => {
      const category = await this.categoryRepo.findById(id);

      if (!category) {
        throw new NotFoundException('Category not found');
      }

      return category;
    }, 'findById category');
  }

  async findBySlug(slug: string): Promise<Category> {
    return this.execute(async () => {
      const category = await this.categoryRepo.findBySlug(slug);

      if (!category) {
        throw new NotFoundException(`Category with slug ${slug} not found`);
      }

      return category;
    }, 'findBySlug category');
  }

  async update(id: string, dto: UpdateCategoryDto): Promise<Category> {
    return this.execute(async () => {
      const category = await this.findById(id);

      if (dto.slug) {
        const existing = await this.categoryRepo.findBySlug(dto.slug);
        if (existing && existing.id !== id) {
          throw new ConflictException('Slug already exists');
        }
      }

      if (dto.parentId) {
        await this.findById(dto.parentId);
      }

      if (dto.name) category.updateName(dto.name);
      if (dto.slug) category.updateSlug(dto.slug);
      if (dto.parentId !== undefined) category.updateParent(dto.parentId);

      const update = await this.categoryRepo.update(category);

      this.eventBus.emit({
        name: EventTypes.CATEGORY_UPDATED,
        payload: {
          categoryId: update.id,
        },
        occurredAt: new Date(),
      });

      return update;
    }, 'update category');
  }

  async delete(id: string): Promise<void> {
    return this.execute(async () => {
      await this.findById(id);
      await this.categoryRepo.delete(id);

      this.eventBus.emit({
        name: EventTypes.CATEGORY_DELETED,
        payload: {
          categoryId: id,
        },
        occurredAt: new Date(),
      });
    }, 'delete category');
  }

  async getTree(): Promise<Category[]> {
    return this.execute(
      () => this.categoryRepo.getTree(),
      'getTree categories',
    );
  }
}