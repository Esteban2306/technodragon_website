import { CartResponseDto } from "../../dto/cart-response.dto";
import { Cart } from "../../domain/entities/cart.entity";
export declare class CartResponseMapper {
    static toResponse(cart: Cart): CartResponseDto;
}
