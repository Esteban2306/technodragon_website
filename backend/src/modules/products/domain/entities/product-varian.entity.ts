import { ProductCondition } from "../enums/product-condition.enum";
import { VariantAttribute } from "./variant-attribute.entitt";

export class ProductVariant {
    private sku: string;
    private price: number;
    private stock: number;
    private isActive: boolean;
    private condition: ProductCondition;

    private attributes: VariantAttribute[]

    private createdAt: Date;
    private updatedAt: Date;

    constructor (
        public readonly id : string,
        sku : string,
        price : number,
        stock : number,
        condition: ProductCondition = ProductCondition.NEW,
        attributes : VariantAttribute[] = [],
        isActive: boolean = true,
        createdAt?: Date,
        updatedAt?: Date
    ){
        this.validateSku(sku);
        this.validatePrice(price);
        this.validateStock(stock);
        this.validateCondition(condition);

        this.condition = condition;
        this.sku = sku;
        this.price = price;
        this.stock = stock;
        this.attributes = attributes;
        this.isActive = isActive;

        this.validateAttributes(this.attributes);

        this.createdAt = createdAt ?? new Date();
        this.updatedAt = updatedAt ?? new Date();
    }



    increaseStock (quantity: number) {
        if (quantity <= 0) {
            throw new Error("Quantity must be greater than 0");
        }

        this.stock += quantity
        this.touch()
    }

    decreaseStock (quantity: number) {
        if (quantity <= 0) {
            throw new Error("Quantity must be greater than 0");
        }

        if (this.stock - quantity < 0) {
            throw new Error("Insufficient stock");
        }

        this.stock -= quantity

        if (this.stock === 0) {
            this.isActive = false;
        }

        this.touch()
    }

    updatePrice (newprice: number) {
        this.validatePrice(newprice)
        this.price = newprice
        this.touch()
    }

    activate() {
        this.isActive = true;
        this.touch();
    }

    deactivate() {
        this.isActive = false;
        this.touch();
    }

    addAtribute(attribute: VariantAttribute) {
        const exists = this.attributes.some(
            (attr) => attr.getName() === attribute.getName()
        )

        if (exists) {
            throw new Error(`Attribute ${attribute.getName()} already exists`);
        }

        this.attributes.push(attribute);
        this.touch();
    }

    removeAttribute(attributeId: string) {
        this.attributes = this.attributes.filter(
        (attr) => attr.id !== attributeId
        );
        this.touch();
    }

    private validateSku(sku: string) {
        if (!sku || sku.trim().length < 3) {
            throw new Error("SKU must be at least 3 characters");
        }
    }

    private validateCondition(condition: ProductCondition) {
        if (!condition) {
            throw new Error("Product condition is required");
    }
}

    private validateAttributes(attributes: VariantAttribute[]) {
        if (!attributes || attributes.length === 0) {
            throw new Error("Variant must have attributes");
        }
    }

    private validatePrice(price: number) {
        if (price <= 0) {
            throw new Error("Price must be greater than 0");
        }
    }

    private validateStock(stock: number) {
        if (stock < 0) {
            throw new Error("Stock cannot be negative");
        }
    }

    private touch() {
        this.updatedAt = new Date();
    }

    getId() {
        return this.id;
    }

    getSku() {
    return this.sku;
    }

    getCondition() {
        return this.condition;
    }

    getPrice() {
        return this.price;
    }

    getStock() {
        return this.stock;
    }

    isVariantActive() {
        return this.isActive;
    }

    getAttributes() {
        return this.attributes;
    }

    getCreatedAt() {
        return this.createdAt;
    }

    getUpdatedAt() {
        return this.updatedAt;
    }
}