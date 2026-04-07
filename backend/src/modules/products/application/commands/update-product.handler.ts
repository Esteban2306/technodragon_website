import { BadRequestException, Injectable } from "@nestjs/common";
import { UpdateProductCommand } from "./update-product.command";
import { ProductService } from "../services/product.service";
import { ProductVariant } from "../../domain/entities/product-varian.entity";
import { randomUUID } from "crypto";
import { VariantAttribute } from "../../domain/entities/variant-attribute.entitt";
import { ProductImage } from "../../domain/entities/product-image.entity";
import { Product } from "../../domain/entities/product.entity";
import { ProductCondition } from "../../domain/enums/product-condition.enum";

@Injectable()
export class UpdateProductHandler { 
    constructor (private readonly service: ProductService) {}

    async execute (command: UpdateProductCommand): Promise<void> {
        if (!command.productId) {
            throw new BadRequestException("Product id is requires.")
        }

        const variants = command.variants.map(v => 
            new ProductVariant(
                v.id ?? randomUUID(),
                v.sku,
                v.price,
                v.stock,
                v.condition ?? ProductCondition.NEW,
                v.attributes.map(attr => 
                    new VariantAttribute(
                        crypto.randomUUID(),
                        attr.name,
                        attr.value
                    )
                )

            )
        );

        const image = command.images.map(img => 
            new ProductImage(
                img.id ?? randomUUID(),
                img.url
            )
        )

        const product = new Product(
            command.productId,
            command.name,
            command.slug,
            command.description,
            command.brandId,
            command.categoryId,
            variants,
            image,
            true,
            new Date(),
            new Date()
        )

        await this.service.update(product)
    }
}