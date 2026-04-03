import {
  Controller,
  Post,
  Get,
  Delete,
  Patch,
  Param,
  Body,
  HttpCode,
  HttpStatus,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";

import { CartService } from "../application/services/cart.service";
import { AddItemDto } from "../dto/addItem.dto";
import { UpdateItemDto } from "../dto/updateItem.dto";

@Controller("cart")
export class CartController {
  constructor(private readonly cartService: CartService) {}


  @Post()
  async createCart() {
    const cart = await this.cartService.createCart();

    return {
      id: cart.getId(),
      items: cart.getItems(),
      totalItems: cart.getTotalItems()
    };
  }

  @Get(":cartId")
  async getCart(@Param("cartId") cartId: string) {
    const cart = await this.cartService.getCart(cartId);

    return {
      id: cart.getId(),
      items: cart.getItems(),
      totalItems: cart.getTotalItems()
    };
  }


  @Post(":cartId/items")
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async addItem(
    @Param("cartId") cartId: string,
    @Body() dto: AddItemDto
  ) {
    const cart = await this.cartService.addItem({
      cartId,
      variantId: dto.variantId,
      quantity: dto.quantity
    });

    return {
      id: cart.getId(),
      items: cart.getItems(),
      totalItems: cart.getTotalItems()
    };
  }


  @Patch(":cartId/items")
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async updateItem(
    @Param("cartId") cartId: string,
    @Body() dto: UpdateItemDto
  ) {
    const cart = await this.cartService.updateItem({
      cartId,
      variantId: dto.variantId,
      quantity: dto.quantity
    });

    return {
      id: cart.getId(),
      items: cart.getItems(),
      totalItems: cart.getTotalItems()
    };
  }


  @Delete(":cartId/items/:variantId")
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeItem(
    @Param("cartId") cartId: string,
    @Param("variantId") variantId: string
  ) {
    await this.cartService.removeItem({ cartId, variantId });
  }


  @Delete(":cartId/items")
  @HttpCode(HttpStatus.NO_CONTENT)
  async clearCart(@Param("cartId") cartId: string) {
    await this.cartService.clearCart(cartId);
  }
}