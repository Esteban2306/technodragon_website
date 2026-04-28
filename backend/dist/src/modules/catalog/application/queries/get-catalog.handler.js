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
exports.GetCatalogHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const common_1 = require("@nestjs/common");
const get_catalog_query_1 = require("./get-catalog.query");
const catalog_repository_token_1 = require("../../helpers/catalog-repository.token");
const prisma_catalog_repository_1 = require("../../infrastructure/repositories/prisma-catalog.repository");
let GetCatalogHandler = class GetCatalogHandler {
    catalogRepository;
    constructor(catalogRepository) {
        this.catalogRepository = catalogRepository;
    }
    async execute(query) {
        const { filters } = query;
        return this.catalogRepository.findAll(filters);
    }
};
exports.GetCatalogHandler = GetCatalogHandler;
exports.GetCatalogHandler = GetCatalogHandler = __decorate([
    (0, cqrs_1.QueryHandler)(get_catalog_query_1.GetCatalogQuery),
    __param(0, (0, common_1.Inject)(catalog_repository_token_1.CATALOG_REPOSITORY)),
    __metadata("design:paramtypes", [prisma_catalog_repository_1.PrismaCatalogRepository])
], GetCatalogHandler);
//# sourceMappingURL=get-catalog.handler.js.map