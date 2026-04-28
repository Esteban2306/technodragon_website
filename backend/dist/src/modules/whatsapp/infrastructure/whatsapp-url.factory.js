"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhatsAppUrlFactory = void 0;
const common_1 = require("@nestjs/common");
class WhatsAppUrlFactory {
    static BASE_URL = 'https://wa.me';
    static create(options) {
        if (!options) {
            throw new common_1.BadRequestException('Options are required to create a WhatsApp URL');
        }
        const { phone, message } = options;
        if (!phone || typeof phone !== 'string') {
            throw new common_1.BadRequestException('Invalid phone number');
        }
        if (!message || typeof message !== 'string') {
            throw new common_1.BadRequestException('Message is required');
        }
        const normalizedPhone = this.normalizePhone(phone);
        const sanitizedMessage = this.sanitizeMessage(message);
        const params = new URLSearchParams({
            text: sanitizedMessage,
        });
        return `${this.BASE_URL}/${normalizedPhone}?${params.toString()}`;
    }
    static normalizePhone(phone) {
        const digits = phone.replace(/\D/g, '');
        if (digits.length < 10) {
            throw new Error('Phone number is too short');
        }
        return digits;
    }
    static sanitizeMessage(message) {
        return message
            .trim()
            .replace(/\r\n/g, '\n')
            .replace(/\n{3,}/g, '\n\n');
    }
}
exports.WhatsAppUrlFactory = WhatsAppUrlFactory;
//# sourceMappingURL=whatsapp-url.factory.js.map