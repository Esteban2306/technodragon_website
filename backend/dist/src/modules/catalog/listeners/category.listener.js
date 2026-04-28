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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryListener = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const event_types_1 = require("../../../infrastructure/events/event.types");
let CategoryListener = class CategoryListener {
    handleCategoryCreated(payload) {
        console.log("Category created:", payload);
    }
    handleCategoryUpdated(payload) {
        console.log("Category updated:", payload);
    }
    handleCategoryDeleted(payload) {
        console.log("Category deleted:", payload);
    }
};
exports.CategoryListener = CategoryListener;
__decorate([
    (0, event_emitter_1.OnEvent)(event_types_1.EventTypes.CATEGORY_CREATED),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CategoryListener.prototype, "handleCategoryCreated", null);
__decorate([
    (0, event_emitter_1.OnEvent)(event_types_1.EventTypes.CATEGORY_UPDATED),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CategoryListener.prototype, "handleCategoryUpdated", null);
__decorate([
    (0, event_emitter_1.OnEvent)(event_types_1.EventTypes.CATEGORY_DELETED),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CategoryListener.prototype, "handleCategoryDeleted", null);
exports.CategoryListener = CategoryListener = __decorate([
    (0, common_1.Injectable)()
], CategoryListener);
//# sourceMappingURL=category.listener.js.map