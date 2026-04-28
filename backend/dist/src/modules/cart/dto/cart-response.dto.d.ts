export declare class CartItemResponseDto {
    id: string;
    variantId: string;
    quantity: number;
    price: number;
    name: string;
    image: string;
    brand: string;
    attributes: Record<string, string>;
}
export declare class CartResponseDto {
    id: string;
    totalItems: number;
    items: CartItemResponseDto[];
}
