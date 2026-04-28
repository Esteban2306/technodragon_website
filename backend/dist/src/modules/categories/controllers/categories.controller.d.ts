import { CategoriesService } from '../application/services/categories.service';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
export declare class CategoriesController {
    private readonly service;
    constructor(service: CategoriesService);
    create(dto: CreateCategoryDto): Promise<import("../domain/entities/category.entity").Category>;
    findAll(): Promise<import("../domain/entities/category.entity").Category[]>;
    getTree(): Promise<import("../domain/entities/category.entity").Category[]>;
    findBySlug(slug: string): Promise<import("../domain/entities/category.entity").Category>;
    findById(id: string): Promise<import("../domain/entities/category.entity").Category>;
    update(id: string, dto: UpdateCategoryDto): Promise<import("../domain/entities/category.entity").Category>;
    delete(id: string): Promise<void>;
}
