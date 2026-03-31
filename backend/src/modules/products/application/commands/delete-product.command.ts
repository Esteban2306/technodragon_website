export class DeleteProductCommand {
    constructor (
        public readonly productId: string,
        public readonly performdeBy?: string,
        public readonly reason?: string 
    ) {}
}