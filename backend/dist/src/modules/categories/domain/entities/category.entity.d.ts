export declare class Category {
    readonly id: string;
    private name;
    private slug;
    private parentId?;
    private children;
    private createdAt;
    private updatedAt;
    constructor(id: string, name: string, slug: string, parentId?: string, children?: Category[], createdAt?: Date, updatedAt?: Date);
    updateName(name: string): void;
    updateSlug(slug: string): void;
    updateParent(parentId?: string): void;
    setChildren(children: Category[]): void;
    private validateName;
    private normalizeSlug;
    private touch;
    getName(): string;
    getSlug(): string;
    getParentId(): string | undefined;
    getChildren(): Category[];
    getCreatedAt(): Date;
    getUpdatedAt(): Date;
}
