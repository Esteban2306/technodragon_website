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
exports.BrandController = void 0;
const common_1 = require("@nestjs/common");
const brand_service_1 = require("../application/brand.service");
const create_brand_dto_1 = require("../dto/create-brand.dto");
const update_brand_dto_1 = require("../dto/update-brand.dto");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const admin_guard_1 = require("../../auth/guards/admin.guard");
let BrandController = class BrandController {
    brandService;
    constructor(brandService) {
        this.brandService = brandService;
    }
    async create(dto) {
        console.log('controller dto req:', dto);
        return this.brandService.create(dto);
    }
    async findAll(search, isActive, page, limit) {
        return this.brandService.findAll({
            search,
            isActive: isActive !== undefined ? isActive === 'true' : undefined,
            page: page ? Number(page) : undefined,
            limit: limit ? Number(limit) : undefined,
        });
    }
    async findBySlug(slug) {
        return this.brandService.findBySlug(slug);
    }
    async findById(id) {
        return this.brandService.findById(id);
    }
    async update(id, dto) {
        return this.brandService.update(id, dto);
    }
    async deactivate(id) {
        return this.brandService.deactivate(id);
    }
    async activate(id) {
        return this.brandService.activate(id);
    }
    async delete(id) {
        return this.brandService.delete(id);
    }
};
exports.BrandController = BrandController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtGuard, admin_guard_1.AdminGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_brand_dto_1.CreateBrandDto]),
    __metadata("design:returntype", Promise)
], BrandController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('search')),
    __param(1, (0, common_1.Query)('isActive')),
    __param(2, (0, common_1.Query)('page')),
    __param(3, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], BrandController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('slug/:slug'),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BrandController.prototype, "findBySlug", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BrandController.prototype, "findById", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtGuard, admin_guard_1.AdminGuard),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_brand_dto_1.UpdateBrandDto]),
    __metadata("design:returntype", Promise)
], BrandController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtGuard, admin_guard_1.AdminGuard),
    (0, common_1.Patch)(':id/deactivate'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BrandController.prototype, "deactivate", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtGuard, admin_guard_1.AdminGuard),
    (0, common_1.Patch)(':id/activate'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BrandController.prototype, "activate", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtGuard, admin_guard_1.AdminGuard),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BrandController.prototype, "delete", null);
exports.BrandController = BrandController = __decorate([
    (0, common_1.Controller)('brands'),
    __metadata("design:paramtypes", [brand_service_1.BrandService])
], BrandController);
//# sourceMappingURL=brand.controller.js.map