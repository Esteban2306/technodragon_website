import { BadRequestException } from '@nestjs/common';
import { WhatsAppUrlOptions } from '../types/url.types';

export class WhatsAppUrlFactory {
  private static readonly BASE_URL = 'https://wa.me';

  static create(options: WhatsAppUrlOptions): string {
    if (!options) {
      throw new BadRequestException(
        'Options are required to create a WhatsApp URL',
      );
    }

    const { phone, message } = options;

    if (!phone || typeof phone !== 'string') {
      throw new BadRequestException('Invalid phone number');
    }

    if (!message || typeof message !== 'string') {
      throw new BadRequestException('Message is required');
    }

    const normalizedPhone = this.normalizePhone(phone);

    const sanitizedMessage = this.sanitizeMessage(message);

    const params = new URLSearchParams({
      text: sanitizedMessage,
    });
    
    return `${this.BASE_URL}/${normalizedPhone}?${params.toString()}`;
  }

  private static normalizePhone(phone: string): string {
    const digits = phone.replace(/\D/g, '');

    if (digits.length < 10) {
      throw new Error('Phone number is too short');
    }

    return digits;
  }

  private static sanitizeMessage(message: string): string {
    return message
      .trim()
      .replace(/\r\n/g, '\n')
      .replace(/\n{3,}/g, '\n\n');
  }
}
