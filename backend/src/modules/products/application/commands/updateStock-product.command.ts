export class UpdateStockProductCommand {
    constructor (
        public readonly variantId: string,
        public readonly stock: number
    ) {}
}