export declare class Brand {
    readonly id: string;
    private name;
    private slug;
    private logo;
    private isActive;
    private createdAt;
    private updatedAt;
    constructor(id: string, name: string, slug: string, logo?: string, isActive?: boolean, createdAt?: Date, updatedAt?: Date);
    updateName(name: string): void;
    updateSlug(slug: string): void;
    updateLogo(url: string): void;
    deactivate(): void;
    activate(): void;
    private validateName;
    private normalizeSlug;
    private touch;
    getName(): string;
    getSlug(): string;
    getLogo(): string;
    isBrandActive(): boolean;
    getCreatedAt(): Date;
    getUpdatedAt(): Date;
}
