export class Brand {
    private name: string;
    private slug: string
    private logo: string;
    private isActive: boolean;
    private createdAt: Date;
    private updatedAt: Date;
    constructor(
        public readonly id:string,
         name: string,
         slug: string,
         logo?: string, 
         isActive: boolean = true,
         createdAt?: Date,
         updatedAt?: Date
    ) {
        this.validateName(name);
        this.name = name;
        this.slug = slug;
        this.logo = logo || '';
        this.isActive = isActive;
        this.createdAt = createdAt || new Date();
        this.updatedAt = updatedAt || new Date();
    }

    updateName(name: string ) {
        this.validateName(name);
        this.name = name;
        this.touch()
    }

    updateSlug(slug: string) {
        this.slug = this.normalizeSlug(slug)
        this.touch()
    }

    updateLogo(url: string) {

        if(!url || !url.startsWith('http')) {}

        this.logo = url
        this.touch()
    }

    deactivate() {
        this.isActive = false;
        this.touch();
    }

    activate() {
        this.isActive = true;
        this.touch();
    }

    private validateName(name: string) {
        if (!name || name.trim().length === 0 ) {
            throw new Error('Brand name cannot be empty');
        }
    }

    private normalizeSlug(slug: string): string {
        if (!slug) {
            throw new Error('Slug required');
        }

        return slug.toLowerCase().trim().replace(/\s+/g, '-')
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

    getLogo() {
        return this.logo;
    }

    isBrandActive() {
        return this.isActive;
    }

    getCreatedAt() {
        return this.createdAt;
    }

    getUpdatedAt() {
        return this.updatedAt;
    }
}