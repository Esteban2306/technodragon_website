export const EventTypes = {
  CATEGORY_CREATED: 'category.created',
  CATEGORY_UPDATED: 'category.updated',
  CATEGORY_DELETED: 'category.deleted',

  BRAND_CREATED: 'brand.created',
  BRAND_UPDATED: 'brand.updated',
  BRAND_DEACTIVATED: 'brand.deactivated',
  BRAND_ACTIVATED: 'brand.activated',

  PRODUCT_CREATED: 'product.created',
  PRODUCT_UPDATED: 'product.updated',
  PRODUCT_DISABLED: 'product.disabled',
  PRODUCT_DELETED: 'product.deleted',

  CART_CREATED: 'cart.created',
  CART_PRODUCT_ADDED: 'cart.product_added',
  CART_PRODUCT_REMOVED: 'cart.product_removed',
  CART_PRODUCT_UPDATED: 'cart.product_updated',
  CART_CLEARED: 'cart.cleared',

  STOCK_UPDATED: 'stock.updated',
  STOCK_LOW: 'stock.low',
  STOCK_OUT_OF_STOCK: 'stock.out_of_stock',

  CHECKOUT_STARTED: 'checkout.started',

  WHATSAPP_MESSAGE_SENT: 'whatsapp.message.sent',
} as const;

export type EventType = (typeof EventTypes)[keyof typeof EventTypes];

export interface EventPayloadMap {
  [EventTypes.CATEGORY_CREATED]: {
    categoryId: string;
    name: string;
    slug: string;
  };

  [EventTypes.CATEGORY_UPDATED]: {
    categoryId: string;
  };

  [EventTypes.CATEGORY_DELETED]: {
    categoryId: string;
  };

  [EventTypes.BRAND_CREATED]: {
    brandId: string;
    name: string;
    slug: string;
  };

  [EventTypes.BRAND_UPDATED]: {
    brandId: string;
  };

  [EventTypes.BRAND_DEACTIVATED]: {
    brandId: string;
  };

  [EventTypes.BRAND_ACTIVATED]: {
    brandId: string;
  };

  [EventTypes.PRODUCT_CREATED]: {
    productId: string;
  };

  [EventTypes.PRODUCT_UPDATED]: {
    productId: string;
  };

  [EventTypes.PRODUCT_DISABLED]: {
    productId: string;
  };

  [EventTypes.PRODUCT_DELETED]: {
    productId: string;
  };

  [EventTypes.CART_CREATED]: {
    cartId: string;
    userId?: string;
    sessionId?: string;
  };

  [EventTypes.CART_PRODUCT_ADDED]: {
    cartId: string;
    variantId: string;
    quantity: number;
  };

  [EventTypes.CART_PRODUCT_UPDATED]: {
    cartId: string;
    variantId: string;
    quantity: number;
  };

  [EventTypes.CART_PRODUCT_REMOVED]: {
    cartId: string;
    variantId: string;
  };

  [EventTypes.CART_CLEARED]: {
    cartId: string;
  };

  [EventTypes.STOCK_UPDATED]: {
    productId: string;
    variantId: string;
    stock: number;
  };

  [EventTypes.STOCK_LOW]: {
    variantId: string;
    stock: number;
  };

  [EventTypes.STOCK_OUT_OF_STOCK]: {
    variantId: string;
  };

  [EventTypes.CHECKOUT_STARTED]: {
    cartId: string;
  };

  [EventTypes.WHATSAPP_MESSAGE_SENT]: {
    cartId: string;
    message: string;
  };
}
