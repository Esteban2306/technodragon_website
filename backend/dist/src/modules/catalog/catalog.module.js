"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatalogModule = void 0;
const common_1 = require("@nestjs/common");
const catalog_repository_token_1 = require("./helpers/catalog-repository.token");
const prisma_catalog_repository_1 = require("./infrastructure/repositories/prisma-catalog.repository");
const cqrs_1 = require("@nestjs/cqrs");
const catalog_controller_1 = require("./controllers/catalog.controller");
const get_catalog_handler_1 = require("./application/queries/get-catalog.handler");
const getByID_catalog_handler_1 = require("./application/queries/getByID-catalog.handler");
const product_listener_1 = require("./listeners/product.listener");
const events_module_1 = require("../../infrastructure/events/events.module");
const catalog_listener_1 = require("./application/listener/catalog.listener");
const QueryHandlers = [
    get_catalog_handler_1.GetCatalogHandler,
    getByID_catalog_handler_1.GetCatalogByIdHandler
];
const EventListeners = [
    product_listener_1.ProductCreatedListener,
    product_listener_1.ProductUpdatedListener,
    product_listener_1.ProductDeletedListener,
];
let CatalogModule = class CatalogModule {
};
exports.CatalogModule = CatalogModule;
exports.CatalogModule = CatalogModule = __decorate([
    (0, common_1.Module)({
        imports: [cqrs_1.CqrsModule, events_module_1.EventsModule],
        controllers: [catalog_controller_1.CatalogController],
        providers: [
            {
                provide: catalog_repository_token_1.CATALOG_REPOSITORY,
                useClass: prisma_catalog_repository_1.PrismaCatalogRepository
            },
            ...QueryHandlers,
            ...EventListeners,
            catalog_listener_1.catalogListener,
            prisma_catalog_repository_1.PrismaCatalogRepository
        ],
        exports: [catalog_repository_token_1.CATALOG_REPOSITORY, prisma_catalog_repository_1.PrismaCatalogRepository]
    })
], CatalogModule);
//# sourceMappingURL=catalog.module.js.map