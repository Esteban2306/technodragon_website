export declare class ProductImage {
    readonly id: string;
    private url;
    private isFeatured;
    constructor(id: string, url: string, isFeatured?: boolean);
    getId(): string;
    getUrl(): string;
    isMain(): boolean;
    setAsMain(): void;
    removeAsMain(): void;
}
