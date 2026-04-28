"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateBasicProductCommand = void 0;
class UpdateBasicProductCommand {
    productId;
    name;
    description;
    slug;
    constructor(productId, name, description, slug) {
        this.productId = productId;
        this.name = name;
        this.description = description;
        this.slug = slug;
    }
}
exports.UpdateBasicProductCommand = UpdateBasicProductCommand;
//# sourceMappingURL=updateBasic-product.command.js.map