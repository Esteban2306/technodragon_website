import { ProductService } from '../services/product.service';
import { CreateProductCommand } from './product.command';
export declare class CreateProductHandler {
    private readonly service;
    constructor(service: ProductService);
    execute(command: CreateProductCommand): Promise<void>;
}
