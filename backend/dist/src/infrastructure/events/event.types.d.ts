export declare const EventTypes: {
    readonly CATEGORY_CREATED: "category.created";
    readonly CATEGORY_UPDATED: "category.updated";
    readonly CATEGORY_DELETED: "category.deleted";
    readonly BRAND_CREATED: "brand.created";
    readonly BRAND_UPDATED: "brand.updated";
    readonly BRAND_DEACTIVATED: "brand.deactivated";
    readonly BRAND_ACTIVATED: "brand.activated";
    readonly PRODUCT_CREATED: "product.created";
    readonly PRODUCT_UPDATED: "product.updated";
    readonly PRODUCT_DISABLED: "product.disabled";
    readonly PRODUCT_ACTIVATED: "product.activated";
    readonly PRODUCT_DELETED: "product.deleted";
    readonly CART_CREATED: "cart.created";
    readonly CART_PRODUCT_ADDED: "cart.product_added";
    readonly CART_PRODUCT_REMOVED: "cart.product_removed";
    readonly CART_PRODUCT_UPDATED: "cart.product_updated";
    readonly CART_CLEARED: "cart.cleared";
    readonly PRODUCT_FEATURED: "product.featured";
    readonly PRODUCT_UNFEATURED: "product.unfeatured";
    readonly VARIANT_ACTIVATED: "variant.activated";
    readonly VARIANT_DISABLED: "variant.disabled";
    readonly STOCK_UPDATED: "stock.updated";
    readonly STOCK_LOW: "stock.low";
    readonly STOCK_OUT_OF_STOCK: "stock.out_of_stock";
    readonly CHECKOUT_STARTED: "checkout.started";
    readonly WHATSAPP_MESSAGE_SENT: "whatsapp.message.sent";
};
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
    [EventTypes.PRODUCT_FEATURED]: {
        productId: string;
        isFeatured: boolean;
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
    [EventTypes.PRODUCT_UNFEATURED]: {
        productId: string;
    };
    [EventTypes.PRODUCT_ACTIVATED]: {
        productId: string;
    };
    [EventTypes.PRODUCT_DELETED]: {
        productId: string;
    };
    [EventTypes.VARIANT_ACTIVATED]: {
        variantId: string;
        productId: string;
    };
    [EventTypes.VARIANT_DISABLED]: {
        variantId: string;
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
