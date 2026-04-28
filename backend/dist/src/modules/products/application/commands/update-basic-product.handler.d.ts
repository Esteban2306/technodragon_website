import { UpdateBasicProductCommand } from './updateBasic-product.command';
import { ProductService } from '../services/product.service';
export declare class UpdateBasicProductHandler {
    private readonly service;
    constructor(service: ProductService);
    execute(command: UpdateBasicProductCommand): Promise<void>;
}
