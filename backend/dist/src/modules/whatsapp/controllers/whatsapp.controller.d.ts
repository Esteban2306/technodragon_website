import { WhatsAppService } from '../application/services/whatsapp-message.service';
export declare class WhatsAppController {
    private readonly service;
    constructor(service: WhatsAppService);
    getProductUrl(variantId: string): Promise<{
        url: string;
    }>;
    getCartUrl(cartId: string): Promise<{
        url: string;
    }>;
}
