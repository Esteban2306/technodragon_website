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
exports.CatalogController = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const get_catalog_query_1 = require("../application/queries/get-catalog.query");
const getByID_catalog_query_1 = require("../application/queries/getByID-catalog.query");
const catalogFilter_dto_1 = require("../dto/catalogFilter.dto");
let CatalogController = class CatalogController {
    queryBus;
    constructor(queryBus) {
        this.queryBus = queryBus;
    }
    async getCatalog(query) {
        return this.queryBus.execute(new get_catalog_query_1.GetCatalogQuery(query));
    }
    async getById(id) {
        const result = await this.queryBus.execute(new getByID_catalog_query_1.GetCatalogByIdQuery(id));
        if (!result) {
            throw new common_1.NotFoundException(`Catalog item ${id} not found`);
        }
        return result;
    }
};
exports.CatalogController = CatalogController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [catalogFilter_dto_1.CatalogFilterDto]),
    __metadata("design:returntype", Promise)
], CatalogController.prototype, "getCatalog", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CatalogController.prototype, "getById", null);
exports.CatalogController = CatalogController = __decorate([
    (0, common_1.Controller)("catalog"),
    __metadata("design:paramtypes", [cqrs_1.QueryBus])
], CatalogController);
//# sourceMappingURL=catalog.controller.js.map