export const EventTypes = {
    PRODUCT_CREATED: "product.created",
    PRODUCT_UPDATED: "product.updated",
    PRODUCT_DISABLED: "product.disable",
    PRODUCT_DELETED: "product.deleted",

    CART_PRODUCT_ADDED: "cart.product_added",
    CART_PRODUCT_REMOVED: "cart.product_removed",

    STOCK_UPDATED: "stock.updated",
    STOCK_LOW: "stock.low",
    STOCK_OUT_OF_STOCK: "stock.out_of_stock",

    CHECKOUT_STARTED: "checkout.started",
    WHATSAPP_MESSAGE_SENT: "whatsapp.message_sent"
} as const;

export type EventType = (typeof EventTypes)[keyof typeof EventTypes];

export interface EventPayloadMap {
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
        variantId: string;
        slug: string
    }

    [EventTypes.STOCK_LOW]: {
        variantId: string;
        slug: string
    }

    [EventTypes.STOCK_OUT_OF_STOCK]: {
        variantId: string;
        slug: string
    }


    [EventTypes.CHECKOUT_STARTED]: {
        cartId: string;
    };

    [EventTypes.WHATSAPP_MESSAGE_SENT]: {
        cartId: string;
        message: string;
    }
}