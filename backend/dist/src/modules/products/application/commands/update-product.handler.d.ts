import { UpdateProductCommand } from './update-product.command';
import { ProductService } from '../services/product.service';
export declare class UpdateProductHandler {
    private readonly service;
    constructor(service: ProductService);
    execute(command: UpdateProductCommand): Promise<void>;
}
