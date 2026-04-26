export const whatsappKeys = {
  all: ['whatsapp'] as const,

  product: (variantId: string) =>
    [...whatsappKeys.all, 'product', variantId] as const,

  cart: (cartId: string) =>
    [...whatsappKeys.all, 'cart', cartId] as const,
};