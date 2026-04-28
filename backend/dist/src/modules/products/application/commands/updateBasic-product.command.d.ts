export declare class UpdateBasicProductCommand {
    readonly productId: string;
    readonly name?: string | undefined;
    readonly description?: string | undefined;
    readonly slug?: string | undefined;
    constructor(productId: string, name?: string | undefined, description?: string | undefined, slug?: string | undefined);
}
