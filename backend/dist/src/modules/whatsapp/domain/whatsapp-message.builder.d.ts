import { CartMessageInput, ProductMessageInput } from '../types/inputs.types';
export declare class WhatsAppMessageBuilder {
    private static formatPrice;
    private static sanitize;
    static buildProductMessage(input: ProductMessageInput): string;
    static buildCartMessage(input: CartMessageInput): string;
}
