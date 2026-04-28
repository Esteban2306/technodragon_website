import { WhatsAppUrlOptions } from '../types/url.types';
export declare class WhatsAppUrlFactory {
    private static readonly BASE_URL;
    static create(options: WhatsAppUrlOptions): string;
    private static normalizePhone;
    private static sanitizeMessage;
}
