import { BadRequestException, Injectable } from "@nestjs/common";
import { ProductService } from "../services/product.service";
import { Product } from "../../domain/entities/product.entity";
import { DeleteProductCommand } from "./delete-product.command";


@Injectable()
export class DeleteProductHandler {
    constructor (private service: ProductService) {}

    async execute (command: DeleteProductCommand): Promise<void> {

        if (!command.productId) {
            throw new BadRequestException("Product id is required.")
        }

        await this.service.delete(command.productId)
    }
}
