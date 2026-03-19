import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { BrandRepository } from "../domain/repositories/brand.repository";
import { Brand } from "../domain/entities/brand.entity";
import { EventBusService } from "src/infrastructure/events/event-bus.service";
import { EventTypes } from "src/infrastructure/events/event.types";
import { CreateBrandDto } from "../dto/create-brand.dto";
import { UpdateBrandDto } from "../dto/update-brand.dto";

@Injectable()
export class BrandService {

    constructor(
        private readonly brandRepo: BrandRepository,
        private readonly eventBus: EventBusService
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
    
          console.error(`[BrandService] ${context}`, error);
    
          throw new InternalServerErrorException(`Internal error in ${context}`);
        }
    }

    async create(dto: CreateBrandDto): Promise<Brand> {
        return this.execute(async () => {
            const existing = await this.brandRepo.findBySlug(dto.slug)

            if (existing) {
                throw new ConflictException('Slug already exists');
            }

            const brand = new Brand(
                crypto.randomUUID(),
                dto.name,
                dto.slug,
                dto.logo
            )

            const created = await this.brandRepo.create(brand)

            this.eventBus.emit({
                name: EventTypes.BRAND_CREATED,
                payload: {
                    brandId: created.id,
                    name: created.getName(),
                    slug: created.getSlug(),
                },
                occurredAt: new Date(),
            });
            
            return created
        }, 'Create Brand')
    }

    async findAll(params?: {
        search?: string;
        isActive?: boolean;
        page?: number;
        limit?: number;
        }): Promise<Brand[]> {
        return this.execute(
            () => this.brandRepo.findAll(params),
            "findAll Brands"
        );
    }

    async findById(id: string): Promise<Brand> {
        return this.execute(async () => {
            const data = await this.brandRepo.findById(id);

            if (!data) {
                throw new NotFoundException('Brand not found');
            }

            return data
        }, 'findById brand succes')
    }

    async findBySlug (slug: string): Promise<Brand> {
        return this.execute(async () => {
            const data = await this.brandRepo.findBySlug(slug)

            if (!data) {
                throw new NotFoundException('Brand not found');
            }

            return data
        }, 'findBySlug brand succes')
    }


    async update(id: string, dto: UpdateBrandDto) : Promise<Brand> {
        return this.execute(async () => {
            const brand = await this. findById(id);

            if (dto.slug) {
                    const existing = await this.brandRepo.findBySlug(dto.slug);
                    if (existing && existing.id !== id) {
                    throw new ConflictException('Slug already exists');
                }
            }

            if (dto.name) brand.updateName(dto.name);
            if (dto.slug) brand.updateSlug(dto.slug);
            if (dto.logo) brand.updateLogo(dto.logo);
            if (dto.isActive !== undefined) {
                dto.isActive ? brand.activate() : brand.deactivate();
            }

            const updated = await this.brandRepo.update(brand)

            this.eventBus.emit({
                name: EventTypes.BRAND_UPDATED,
                payload: {
                    brandId: updated.id,
                },
                occurredAt: new Date(),
            });

            return updated
        }, 'update brand')
    }

    async deactivate(id: string): Promise<void> {
        return this.execute(async () => {
            const brand = await this.findById(id);

            if (!brand.isBrandActive()) return;

            await this.brandRepo.deactivate(id);

            this.eventBus.emit({
                name: EventTypes.BRAND_DEACTIVATED,
                payload: {
                    brandId: id,
                },
                occurredAt: new Date(),
            });
        }, 'deactivate brand');
    }

    async activate(id: string): Promise<void> {
        return this.execute(async () => {
            const brand = await this.findById(id);

            if (brand.isBrandActive()) return; // ya está activo

            await this.brandRepo.activate(id);

            this.eventBus.emit({
                name: EventTypes.BRAND_ACTIVATED,
                payload: {
                    brandId: id,
                },
                occurredAt: new Date(),
            });
        }, 'activate brand');
    }

    async delete(id: string): Promise<void> {
    return this.execute(async () => {
      await this.findById(id);
      await this.brandRepo.delete(id);
    }, 'delete category');
  }
}