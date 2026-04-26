import { BadRequestException, Injectable } from "@nestjs/common";
import { ProductService } from "../services/product.service";
import { UpdateStockProductCommand } from "./updateStock-product.command";

@Injectable()
export class UpdateStockProductHandler {
    constructor (private readonly service: ProductService) {}

    async execute (command: UpdateStockProductCommand): Promise<void> {
        if (command.stock < 0) {
            throw new BadRequestException("Stock cannot be negative.")
        }

        await this.service.updateStock(command.variantId, command.stock)
    }
}