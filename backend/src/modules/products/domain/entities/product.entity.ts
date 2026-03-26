import { ProductImage } from "./product-image.entity";
import { ProductVariant } from "./product-varian.entity";

export class Product {
    private name : string;
    private slug : string;
    private description : string;

    private brandId: string;
    private categoryId: string;

    private variants: ProductVariant[];
    private images: ProductImage[];

    private isActive: boolean;

    private createdAt: Date;
    private updatedAt: Date;

    constructor (
        public readonly id: string,
        name: string,
        slug: string,
        description: string,
        brandId: string,
        categoryId: string,
        variants: ProductVariant[] = [],
        images: ProductImage[] = [],
        isActive: boolean,
        createdAt: Date,
        updatedAt: Date
    ) {
        this.validateName(name);
        this.name = name;
        this.slug = slug;
        this.description = description;
        this.brandId = brandId
        this.categoryId = categoryId
        this.variants = variants
        this.images = images
        this.isActive = isActive
        this.validateUniqueSku();
        this.validateUniqueVariants();
        this.validateImages(this.images);
        this.validateVariants(this.variants)
        this.createdAt = createdAt ?? new Date()
        this.updatedAt = updatedAt ?? new Date()
    }

    updatedName(name: string) {
        this.validateName(name)
        this.name = name
        this.touch()
    }

    updateSlug(slug: string) {
        this.slug = this.normalizeSlug(slug)
        this.touch()
    }

    updateDescription(description: string) {
        this.description = description
        this.touch()
    }

    active() {
        this.isActive = true;
        this.touch()
    }

    desactive() {
        this.isActive = false
        this.variants.forEach(v => v.deactivate())
        this.touch()
    }

    addVariants(variant: ProductVariant){
        this.variants.push(variant)
        this.touch()
    }

    removeVariants(variantId: string) {
        this.variants = this.variants.filter(v => v.getId() !== variantId)
        this.touch()
    }

    getActiveVariants() {
        return this.variants.filter(v => v.isVariantActive())
    }

    addImage(image: ProductImage) {
        this.images.push(image)
        this.touch()
    }

    removeImage(imageId: string) {
        this.images = this.images.filter(img => img.getId() !== imageId);
        this.touch();
    }

    private validateName(name: string) {
        if (!name || name.trim().length < 2) {
            throw new Error("Product name must be at least 2 characters");
        }
    }

    private normalizeSlug(slug: string): string {
        if (!slug) {
            throw new Error("Slug is required");
        }

        return slug.toLowerCase().trim().replace(/\s+/g, "-");
    }

    private validateUniqueSku() {
        const skus = new Set();

        for (const variant of this.variants) {
            if (skus.has(variant.getSku())) {
                throw new Error("Duplicate SKU in product");
            }
            skus.add(variant.getSku());
        }
    }

    private validateUniqueVariants() {
        const seen = new Set();

        for (const variant of this.variants) {
            const key = variant.getAttributes()
                .map(a => `${a.getName()}-${a.getValue()}`)
                .sort()
                .join("|");

            if (seen.has(key)) {
                throw new Error("Duplicate variant detected");
            }

            seen.add(key);
        }
    }

    private validateImages(images: ProductImage[]) {
        if (!images || images.length === 0) {
            throw new Error("Product must have at least one image");
        }
    }

    private validateVariants(variants: ProductVariant[]) {
        if (!variants || variants.length === 0) {
            throw new Error("Product must have at least one variant");
        }
    }

    private touch() {
        this.updatedAt = new Date();
    }

    getName() { return this.name; }
    getSlug() { return this.slug; }
    getDescription() { return this.description; }
    getBrandId() { return this.brandId; }
    getCategoryId() { return this.categoryId; }
    getVariants() { return this.variants; }
    getImages() { return this.images; }
    isProductActive() { return this.isActive; }
    getCreatedAt() { return this.createdAt; }
    getUpdatedAt() { return this.updatedAt; }
}