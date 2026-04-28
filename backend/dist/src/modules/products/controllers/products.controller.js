"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const common_1 = require("@nestjs/common");
const product_handler_command_1 = require("../application/commands/product-handler.command");
const delete_product_handler_1 = require("../application/commands/delete-product.handler");
const update_basic_product_handler_1 = require("../application/commands/update-basic-product.handler");
const update_product_handler_1 = require("../application/commands/update-product.handler");
const update_product_command_1 = require("../application/commands/update-product.command");
const updateBasic_product_command_1 = require("../application/commands/updateBasic-product.command");
const updateStock_product_command_1 = require("../application/commands/updateStock-product.command");
const updateStock_product_handler_1 = require("../application/commands/updateStock-product-handler");
const create_product_dto_1 = require("../dto/create-product.dto");
const get_product_by_id_handler_1 = require("../application/queries/get-product-by-id.handler");
const get_products_handler_1 = require("../application/queries/get-products.handler");
const get_products_query_1 = require("../application/queries/get-products.query");
const get_product_by_id_query_1 = require("../application/queries/get-product-by-id.query");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const admin_guard_1 = require("../../auth/guards/admin.guard");
const product_command_1 = require("../application/commands/product.command");
const update_product_dto_1 = require("../dto/update-product.dto");
const product_service_1 = require("../application/services/product.service");
const filter_product_dto_1 = require("../dto/filter-product.dto");
let ProductController = class ProductController {
    createHandler;
    deleteHandler;
    updateBasicHandler;
    updateHandler;
    updateStockHandler;
    getProductsHandler;
    getProductByIdHandler;
    productService;
    constructor(createHandler, deleteHandler, updateBasicHandler, updateHandler, updateStockHandler, getProductsHandler, getProductByIdHandler, productService) {
        this.createHandler = createHandler;
        this.deleteHandler = deleteHandler;
        this.updateBasicHandler = updateBasicHandler;
        this.updateHandler = updateHandler;
        this.updateStockHandler = updateStockHandler;
        this.getProductsHandler = getProductsHandler;
        this.getProductByIdHandler = getProductByIdHandler;
        this.productService = productService;
    }
    async create(body) {
        const command = new product_command_1.CreateProductCommand(body.name, body.slug, body.description, body.brandId, body.categoryId, body.variants, body.images, body.isFeatured ?? false);
        return this.createHandler.execute(command);
    }
    async findAll(query) {
        return this.getProductsHandler.execute(new get_products_query_1.GetProductsQuery(query));
    }
    async findAllPaginated(query) {
        return this.productService.findAllPaginated(query);
    }
    async findById(id) {
        return this.getProductByIdHandler.execute(new get_product_by_id_query_1.GetProductByIdQuery(id));
    }
    async update(id, body) {
        const command = new update_product_command_1.UpdateProductCommand(id, body.name, body.slug, body.description, body.brandId, body.categoryId, body.variants, body.images, body.isFeatured ?? false);
        return this.updateHandler.execute(command);
    }
    async updateBasic(id, body) {
        const command = new updateBasic_product_command_1.UpdateBasicProductCommand(id, body.name, body.description, body.slug);
        return this.updateBasicHandler.execute(command);
    }
    async updateStock(variantId, Body) {
        const command = new updateStock_product_command_1.UpdateStockProductCommand(variantId, Body.stock);
        return this.updateStockHandler.execute(command);
    }
    async delete(id) {
        return this.productService.delete(id);
    }
    async changeStatus(id, body) {
        return this.productService.changeProductStatus(id, body.isActive);
    }
    async changeVariantStatus(variantId, body) {
        return this.productService.changeVariantStatus(variantId, body.isActive);
    }
    async markAsFeatured(id) {
        return this.productService.markAsFeatured(id);
    }
};
exports.ProductController = ProductController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtGuard, admin_guard_1.AdminGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_product_dto_1.CreateProductDto]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filter_product_dto_1.ProductFilterDto]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('paginated'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filter_product_dto_1.ProductFilterDto]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "findAllPaginated", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "findById", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtGuard, admin_guard_1.AdminGuard),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_product_dto_1.UpdateProductDto]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtGuard, admin_guard_1.AdminGuard),
    (0, common_1.Put)(':id/basic'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "updateBasic", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtGuard, admin_guard_1.AdminGuard),
    (0, common_1.Put)('variants/:variantId/stock'),
    __param(0, (0, common_1.Param)('variantId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "updateStock", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtGuard, admin_guard_1.AdminGuard),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "delete", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtGuard, admin_guard_1.AdminGuard),
    (0, common_1.Patch)(':id/status'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "changeStatus", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtGuard, admin_guard_1.AdminGuard),
    (0, common_1.Patch)('variants/:variantId/status'),
    __param(0, (0, common_1.Param)('variantId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "changeVariantStatus", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtGuard, admin_guard_1.AdminGuard),
    (0, common_1.Patch)(':id/featured'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "markAsFeatured", null);
exports.ProductController = ProductController = __decorate([
    (0, common_1.Controller)('products'),
    __metadata("design:paramtypes", [product_handler_command_1.CreateProductHandler,
        delete_product_handler_1.DeleteProductHandler,
        update_basic_product_handler_1.UpdateBasicProductHandler,
        update_product_handler_1.UpdateProductHandler,
        updateStock_product_handler_1.UpdateStockProductHandler,
        get_products_handler_1.GetProductHandler,
        get_product_by_id_handler_1.GetProductByIdHandler,
        product_service_1.ProductService])
], ProductController);
//# sourceMappingURL=products.controller.js.map