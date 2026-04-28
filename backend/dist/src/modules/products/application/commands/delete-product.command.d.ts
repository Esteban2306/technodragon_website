export declare class DeleteProductCommand {
    readonly productId: string;
    readonly performdeBy?: string | undefined;
    readonly reason?: string | undefined;
    constructor(productId: string, performdeBy?: string | undefined, reason?: string | undefined);
}
