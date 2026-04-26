import { CartResponseDto } from "../../dto/cart-response.dto";
import { Cart } from "../../domain/entities/cart.entity";

export class CartResponseMapper {
  static toResponse(cart: Cart): CartResponseDto {
    return {
      id: cart.getId(),
      totalItems: cart.getTotalItems(),
      items: cart.getItems().map((item) => {
        const variant = item.getVariant();

        if (!variant) {
          throw new Error('Variant should never be null at this stage');
        }

        return {
          id: item.getId(),
          variantId: item.getVariantId(), 
          quantity: item.getQuantity(),
          price: variant.price,

          name: variant.product?.name ?? '',
          image: variant.product?.images[0]?.url ?? '',
          brand: variant.product?.brand ?? 'Unknown',

          attributes: variant.attributes,
        };
      }),
    };
  }
}