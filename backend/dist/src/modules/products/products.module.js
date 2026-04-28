"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModule = void 0;
const common_1 = require("@nestjs/common");
const products_controller_1 = require("./controllers/products.controller");
const product_service_1 = require("./application/services/product.service");
const prisma_product_repository_1 = require("./infrastructure/repositories/prisma-product.repository");
const product_tokens_1 = require("./constants/product.tokens");
const events_module_1 = require("../../infrastructure/events/events.module");
const product_handler_command_1 = require("./application/commands/product-handler.command");
const delete_product_handler_1 = require("./application/commands/delete-product.handler");
const update_basic_product_handler_1 = require("./application/commands/update-basic-product.handler");
const update_product_handler_1 = require("./application/commands/update-product.handler");
const updateStock_product_handler_1 = require("./application/commands/updateStock-product-handler");
const get_products_handler_1 = require("./application/queries/get-products.handler");
const get_product_by_id_handler_1 = require("./application/queries/get-product-by-id.handler");
const cloudinary_service_1 = require("../../infrastructure/service/cloudinary/cloudinary.service");
const CommandHandlers = [
    product_handler_command_1.CreateProductHandler,
    update_product_handler_1.UpdateProductHandler,
    updateStock_product_handler_1.UpdateStockProductHandler,
    update_basic_product_handler_1.UpdateBasicProductHandler,
    delete_product_handler_1.DeleteProductHandler
];
const QueryHandlers = [
    get_products_handler_1.GetProductHandler,
    get_product_by_id_handler_1.GetProductByIdHandler,
];
let ProductModule = class ProductModule {
};
exports.ProductModule = ProductModule;
exports.ProductModule = ProductModule = __decorate([
    (0, common_1.Module)({
        controllers: [products_controller_1.ProductController],
        imports: [events_module_1.EventsModule],
        providers: [
            cloudinary_service_1.CloudinaryService,
            product_service_1.ProductService,
            ...CommandHandlers,
            ...QueryHandlers,
            {
                provide: product_tokens_1.PRODUCT_REPOSITORY,
                useClass: prisma_product_repository_1.PrismaProductRepository,
            },
        ],
        exports: [product_service_1.ProductService, cloudinary_service_1.CloudinaryService],
    })
], ProductModule);
//# sourceMappingURL=products.module.js.map