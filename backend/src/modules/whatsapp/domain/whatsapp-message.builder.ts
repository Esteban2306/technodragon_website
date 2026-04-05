import { CartMessageInput, ProductMessageInput } from '../types/inputs.types';

export class WhatsAppMessageBuilder {
  private static formatPrice(price: number): string {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(price);
  }

  private static sanitize(text: string): string {
    return text.trim();
  }

  static buildProductMessage(input: ProductMessageInput): string {
    const lines = [
      'Hola, estoy interesado en el siguiente producto:',
      '',
      `• Producto: ${input.name}`,
      `• Variante: ${input.variant}`,
      `• Precio: ${this.formatPrice(input.price)}`,
      '',
      '¿Podrían confirmarme disponibilidad y proceso de compra?',
    ];
    return lines.join('\n');
  }

  static buildCartMessage(input: CartMessageInput): string {
    if (!input.items.length) {
      throw new Error('Cart is empty');
    }

    const lines: string[] = [
      'Hola, estoy interesado en los siguientes productos:',
      '',
    ];

    let total = 0;

    input.items.forEach((item, index) => {
      const priceFormatted = this.formatPrice(item.price);
      const subtotal = item.price * item.quantity;

      total += subtotal;

      lines.push(
        `${index + 1}. ${item.name}`,
        `   - ${item.variant}`,
        `   - ${priceFormatted} x${item.quantity}`,
        '',
      );
    });

    lines.push(
  `Total: ${this.formatPrice(total)}`,
  "",
  "¿Podrían ayudarme con la compra?"
);
  }
}
