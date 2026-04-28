import { CreateProductHandler } from '../application/commands/product-handler.command';
import { DeleteProductHandler } from '../application/commands/delete-product.handler';
import { UpdateBasicProductHandler } from '../application/commands/update-basic-product.handler';
import { UpdateProductHandler } from '../application/commands/update-product.handler';
import { UpdateBasicProductCommand } from '../application/commands/updateBasic-product.command';
import { UpdateStockProductCommand } from '../application/commands/updateStock-product.command';
import { UpdateStockProductHandler } from '../application/commands/updateStock-product-handler';
import { CreateProductDto } from '../dto/create-product.dto';
import { GetProductByIdHandler } from '../application/queries/get-product-by-id.handler';
import { GetProductHandler } from '../application/queries/get-products.handler';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ProductService } from '../application/services/product.service';
import { ProductFilterDto } from '../dto/filter-product.dto';
export declare class ProductController {
    private readonly createHandler;
    private readonly deleteHandler;
    private readonly updateBasicHandler;
    private readonly updateHandler;
    private readonly updateStockHandler;
    private readonly getProductsHandler;
    private readonly getProductByIdHandler;
    private readonly productService;
    constructor(createHandler: CreateProductHandler, deleteHandler: DeleteProductHandler, updateBasicHandler: UpdateBasicProductHandler, updateHandler: UpdateProductHandler, updateStockHandler: UpdateStockProductHandler, getProductsHandler: GetProductHandler, getProductByIdHandler: GetProductByIdHandler, productService: ProductService);
    create(body: CreateProductDto): Promise<void>;
    findAll(query: ProductFilterDto): Promise<import("../types/product-response.types").ProductResponse[]>;
    findAllPaginated(query: ProductFilterDto): Promise<{
        data: import("../types/product-response.types").ProductResponse[];
        total: number;
    }>;
    findById(id: string): Promise<import("../types/product-response.types").ProductResponse>;
    update(id: string, body: UpdateProductDto): Promise<void>;
    updateBasic(id: string, body: Omit<UpdateBasicProductCommand, 'productId'>): Promise<void>;
    updateStock(variantId: string, Body: Omit<UpdateStockProductCommand, 'variantId'>): Promise<void>;
    delete(id: string): Promise<void>;
    changeStatus(id: string, body: {
        isActive: boolean;
    }): Promise<void>;
    changeVariantStatus(variantId: string, body: {
        isActive: boolean;
    }): Promise<void>;
    markAsFeatured(id: string): Promise<void>;
}
