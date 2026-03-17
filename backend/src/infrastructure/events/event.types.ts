export const EventTypes = {

    CATEGORY_CREATED: "category.created",
    CATEGORY_UPDATED: "category.updated",
    CATEGORY_DELETED: "category.deleted",

    PRODUCT_CREATED: "product.created",
    PRODUCT_UPDATED: "product.updated",
    PRODUCT_DISABLED: "product.disabled",
    PRODUCT_DELETED: "product.deleted",

    CART_PRODUCT_ADDED: "cart.product_added",
    CART_PRODUCT_REMOVED: "cart.product_removed",

    STOCK_UPDATED: "stock.updated",
    STOCK_LOW: "stock.low",
    STOCK_OUT_OF_STOCK: "stock.out_of_stock",

    CHECKOUT_STARTED: "checkout.started",

    WHATSAPP_MESSAGE_SENT: "whatsapp.message.sent"
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

    [EventTypes.PRODUCT_CREATED]: { 
        productId: string;
    };

    [EventTypes.PRODUCT_UPDATED]: {
        productId: string;
    }

    [EventTypes.PRODUCT_DISABLED] : {
        productId: string;
    }

    [EventTypes.PRODUCT_DELETED]: {
        productId: string;
    }


    [EventTypes.CART_PRODUCT_ADDED]: {
        cartId: string;
    };

    [EventTypes.CART_PRODUCT_REMOVED]: {
        cartId: string;
    };

    [EventTypes.STOCK_UPDATED]: {
        productId: string;
        variantId: string;
        stock: number;
    }

    [EventTypes.STOCK_LOW]: {
        variantId: string;
        stock: number;
    }

    [EventTypes.STOCK_OUT_OF_STOCK]: {
        variantId: string;
    }


    [EventTypes.CHECKOUT_STARTED]: {
        cartId: string;
    };

    [EventTypes.WHATSAPP_MESSAGE_SENT]: {
        cartId: string;
        message: string;
    }
}