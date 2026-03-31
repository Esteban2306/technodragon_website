import { CatalogAttributes } from "../../types/catalogItem.types";
import { CatalogImages } from "../../types/catalogItem.types";
import { ProductCondition } from "src/modules/products/domain/enums/product-condition.enum";

export class CatalogItem {
    constructor (
        private readonly id: string,
        private readonly productId: string,
        private readonly variantId: string,

        private name: string,
        private slug: string,

        private brandId: string,
        private brandName: string,

        private categoryId: string,
        private categoryName: string,

        private price: number,
        private stock: number,
        private condition: ProductCondition,

        private attributes: CatalogAttributes,
        private images: CatalogImages,

        private isActive: boolean,

        private createdAt: Date,
        private updatedAt: Date
    ) {
        this.validate()
    }

    static fromPersistence(data: {
        id: string,
        productId: string,
        variantId: string,
        name: string,
        slug: string,
        brandId: string,
        brandName: string,
        categoryId: string,
        categoryName: string,
        price: number ,
        stock: number,
        condition: ProductCondition;
        attributes: CatalogAttributes;
        images: string[];
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }) {
        return new CatalogItem(
            data.id,
            data.productId,
            data.variantId,
            data.name,
            data.slug,
            data.brandId,
            data.brandName,
            data.categoryId,
            data.categoryName,
            data.price,
            data.stock,
            data.condition,
            data.attributes,
            data.images,
            data.isActive,
            data.createdAt,
            data.updatedAt
        );
    }

    private validate() {
        if (!this.productId) throw new Error("productId required");
        if (!this.variantId) throw new Error("variantId required");

        if (this.price < 0) throw new Error("invalid price");
        if (this.stock < 0) throw new Error("invalid stock");

        if (!Object.values(ProductCondition).includes(this.condition)) {
        throw new Error("invalid condition");
        }
    }

    toPersistence() {
        return {
            id: this.id,
            productId: this.productId,
            variantId: this.variantId,

            name: this.name,
            slug: this.slug,

            brandId: this.brandId,
            brandName: this.brandName,

            categoryId: this.categoryId,
            categoryName: this.categoryName,

            price: this.price,
            stock: this.stock,
            condition: this.condition,

            attributes: this.attributes,
            images: this.images ?? [],

            isActive: this.isActive,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    }

    updateStock(stock: number) {
        if(stock < 0) throw new Error("invalid stock")

        this.stock = stock;
        this.isActive = stock > 0;
        this.touch()
    }

    updatePrice(price: number) {
        if (price <= 0) throw new Error("invalid price");
        this.price = price;
        this.touch()
    }

    updateAttributes(attrs: CatalogAttributes) {
        this.attributes = attrs;
        this.touch()
    }

    updateImages(images: CatalogImages) {
        this.images = images;
        this.touch()
    }

    deactivate() {
        this.isActive = false;
        this.touch()
    }

    activate() {
        this.isActive = true;
        this.touch()
    }


    getId() {
        return this.id;
    }

    getVariantId() {
        return this.variantId;
    }

    getProductId() {
        return this.productId;
    }

    getPrice() {
        return this.price;
    }

    getAttributes() {
        return this.attributes;
    }

    isAvailable() {
        return this.isActive && this.stock > 0;
    }
    
    private touch() {
        this.updatedAt = new Date()
    }

}