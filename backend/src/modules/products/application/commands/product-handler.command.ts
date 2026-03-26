import { BadRequestException, Injectable } from "@nestjs/common";
import { ProductService } from "../services/product.service";
import { CreateProductCommand } from "./product.command";
import { ProductVariant } from "../../domain/entities/product-varian.entity";
import { VariantAttribute } from "../../domain/entities/variant-attribute.entitt";
import { ProductImage } from "../../domain/entities/product-image.entity";
import { Product } from "../../domain/entities/product.entity";

@Injectable()
export class CreateProductHandler {

    constructor(private service: ProductService) {}

    async execute (command: CreateProductCommand): Promise<void> {

        if(!command.name || !command.slug) {
            throw new BadRequestException("Name and slug are required.")
        }

        if(command.variants.length === 0) {
            throw new BadRequestException("At last of variants required.")
        }

        if(command.images.length === 0) {
            throw new BadRequestException("At last of images required.")
        }

        const variants = command.variants.map(v =>
        new ProductVariant(
            crypto.randomUUID(),
            v.sku,
            v.price,
            v.stock,
            v.attributes.map(attr =>
            new VariantAttribute(
                crypto.randomUUID(),
                attr.name,
                attr.value
            )
            )
        )
        );

        const images = command.images.map(img => 
             new ProductImage(
                crypto.randomUUID(),
                img.url
            )
        )

        const product = new Product(
            crypto.randomUUID(),
            command.name,
            command.slug,
            command.description,
            command.categoryId,
            command.brandId,
            variants,
            images,
            true,
            new Date(),
            new Date()
        )
        await this.service.create(product);
    }
}