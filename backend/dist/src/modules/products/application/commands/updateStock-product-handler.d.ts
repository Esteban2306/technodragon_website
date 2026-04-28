import { ProductService } from "../services/product.service";
import { UpdateStockProductCommand } from "./updateStock-product.command";
export declare class UpdateStockProductHandler {
    private readonly service;
    constructor(service: ProductService);
    execute(command: UpdateStockProductCommand): Promise<void>;
}
