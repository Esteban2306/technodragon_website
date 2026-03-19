export class Category {
    private name: string;
    private slug: string;
    private parentId?: string;
    private children: Category[] = []
    private createdAt: Date;
    private updatedAt: Date;

    constructor(
        public readonly id: string,
        name: string,
        slug: string,
        parentId?: string,
        children: Category[] = [],
        createdAt?: Date,
        updatedAt?: Date
    ) {
        this.validateName(name);
        this.name = name;

        this.slug = this.normalizeSlug(slug);
        this.parentId = parentId;

        this.children = children;

        this.createdAt = createdAt ?? new Date();
        this.updatedAt = updatedAt ?? new Date();
    }

    updateName(name: string) {
        this.validateName(name);
        this.name = name;
        this.touch();
    }

    updateSlug(slug: string) { 
        this.slug = slug;
        this.touch();
    }

    updateParent(parentId?: string) {

        if(parentId === this.id){
            throw new Error("Category cannot be its own parent");
        }

        this.parentId = parentId
        this.touch();

    }

    setChildren(children: Category[]) {
        this.children = children
    }

    private validateName(name: string) {
        if (!name || name.trim().length < 2) {
            throw new Error("Category name must be at least 2 characters");
        }
    }

    private normalizeSlug(slug: string): string {
        if (!slug) {
            throw new Error("Slug is required");
        }

        return slug.toLowerCase().trim().replace(/\s+/g, "-");
    }

    private touch() {
        this.updatedAt = new Date();
    }

    getName() {
        return this.name;
    }

    getSlug() {
        return this.slug;
    }

    getParentId() {
        return this.parentId;
    }

    getChildren() {
        return this.children;
    }

    getCreatedAt() {
        return this.createdAt;
    }

    getUpdatedAt() {
        return this.updatedAt;
    }
}