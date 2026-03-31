

export class UpdateBasicProductCommand {
    constructor (
        public readonly productId: string,
        public readonly name?: string,
        public readonly description?: string,
        public readonly slug?: string
    ) {}
}