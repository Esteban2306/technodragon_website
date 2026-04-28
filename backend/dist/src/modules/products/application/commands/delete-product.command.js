"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteProductCommand = void 0;
class DeleteProductCommand {
    productId;
    performdeBy;
    reason;
    constructor(productId, performdeBy, reason) {
        this.productId = productId;
        this.performdeBy = performdeBy;
        this.reason = reason;
    }
}
exports.DeleteProductCommand = DeleteProductCommand;
//# sourceMappingURL=delete-product.command.js.map