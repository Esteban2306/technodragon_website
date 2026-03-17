export class Category {
    constructor(
        public readonly id: string,
        public name: string,
        public slug: string,
        public parentId?: string,
        public children: Category[] = []
    ) {}

    updateName(name: string) {
        this.name = name;
    }

    updateSlug(slug: string) { 
        this.slug = slug;
    }

    updateParent(parentId: string) {
        this.parentId = parentId
    }
}