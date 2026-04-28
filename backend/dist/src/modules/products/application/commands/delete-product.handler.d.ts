import { ProductService } from "../services/product.service";
import { DeleteProductCommand } from "./delete-product.command";
export declare class DeleteProductHandler {
    private service;
    constructor(service: ProductService);
    execute(command: DeleteProductCommand): Promise<void>;
}
