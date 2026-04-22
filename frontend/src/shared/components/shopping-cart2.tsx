'use client';

import { Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react';
import Image from 'next/image';

import { AspectRatio } from '@/src/shared/components/aspect-ratio';
import { Button } from './button';
import { Separator } from '@/src/shared/components/separator';

import { useCart } from '@/src/modules/hooks/useCart';
import {
  useRemoveCartItem,
  useUpdateCartItem,
} from '@/src/modules/hooks/useAddToCart';
import { CartItem } from '../types/cart.types';
import CartSkeleton from './ui/skeleton/CartSkeleton';
import { EmptyState } from './ui/EmptyState/ErrorState';
import { useOpenCartWhatsApp } from '@/src/modules/hooks/useOpenWhatsApp';

const ShoppingCart2 = () => {
  const { data: cart, isLoading, isError } = useCart();

  const changeQty = useUpdateCartItem();
  const removeItem = useRemoveCartItem();
  const openWhatsApp = useOpenCartWhatsApp();

  if (isLoading) {
    return <CartSkeleton />;
  }

  if (isError) {
    return (
      <EmptyState
        title="Error al cargar el carrito"
        description="Algo salió mal. Intenta nuevamente más tarde."
      />
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <EmptyState
        title="Tu carrito está vacío"
        description="Añade productos para seguir con tu compra y consultar por whatsapp."
        icon={<ShoppingCart className="w-10 h-10" />}
      />
    );
  }

  const format = (n: number) =>
    new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
    }).format(n);

  const totalCart = cart.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const whatsappMessage = encodeURIComponent(
    `Hola, quiero consultar este pedido:\n\n${cart.items
      .map(
        (item) =>
          `• ${item.name} (${Object.entries(item.attributes)
            .map(([k, v]) => `${k}: ${v}`)
            .join(', ')}) x${item.quantity} - ${format(
            item.price * item.quantity,
          )}`,
      )
      .join('\n')}\n\nTotal: ${format(totalCart)}`,
  );

  const whatsappLink = `https://wa.me/573000000000?text=${whatsappMessage}`;

  return (
    <div className="p-4 space-y-6 max-w-4xl mx-auto">
      {cart.items.map((item: CartItem) => {
        const image = item.image || '/placeholder.png';
        const totalItem = item.price * item.quantity;

        return (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row gap-4 border border-neutral-800 rounded-xl p-4 bg-neutral-900/40 hover:border-neutral-700 transition"
          >
            <div className="w-full sm:w-28">
              <AspectRatio ratio={1}>
                <Image
                  src={image}
                  alt={item.name}
                  fill
                  className="object-cover rounded-md"
                />
              </AspectRatio>
            </div>

            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-white font-semibold text-lg line-clamp-2">
                  {item.name}
                </h3>

                <p className="text-sm text-neutral-400 mt-1">{item.brand}</p>

                <div className="flex flex-wrap gap-2 mt-2">
                  {Object.entries(item.attributes).map(([key, value]) => (
                    <span
                      key={key}
                      className="text-xs bg-neutral-800 text-neutral-300 px-2 py-1 rounded-md"
                    >
                      {key}: {value}
                    </span>
                  ))}
                </div>

                <div className="mt-3 space-y-1">
                  <p className="text-sm text-neutral-400">
                    Precio unitario: {format(item.price)}
                  </p>

                  {item.quantity > 1 && (
                    <p className="text-red-500 font-semibold">
                      Total: {format(totalItem)}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-2">
                  <Button
                    size="icon"
                    variant="outline"
                    disabled={item.quantity <= 1}
                    onClick={() =>
                      changeQty.mutate({
                        cartId: cart.id,
                        variantId: item.variantId,
                        quantity: item.quantity - 1,
                      })
                    }
                  >
                    <Minus size={16} />
                  </Button>

                  <span className="text-white w-6 text-center">
                    {item.quantity}
                  </span>

                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() =>
                      changeQty.mutate({
                        cartId: cart.id,
                        variantId: item.variantId,
                        quantity: item.quantity + 1,
                      })
                    }
                  >
                    <Plus size={16} />
                  </Button>
                </div>

                <Button
                  variant="ghost"
                  onClick={() =>
                    removeItem.mutate({
                      cartId: cart.id,
                      variantId: item.variantId,
                    })
                  }
                  className="text-red-500 hover:text-red-400"
                >
                  <Trash2 size={18} />
                </Button>
              </div>
            </div>
          </div>
        );
      })}

      <Separator />

      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 space-y-4">
        <div className="flex justify-between text-sm text-neutral-400">
          <span>Productos</span>
          <span>{cart.totalItems}</span>
        </div>

        <div className="space-y-2">
          {cart.items.map((item) => {
            const totalItem = item.price * item.quantity;

            return (
              <div
                key={item.id}
                className="flex justify-between text-sm text-neutral-300"
              >
                <span className="truncate max-w-[70%]">
                  {item.name} x{item.quantity}
                </span>
                <span className="font-medium text-white">
                  {format(totalItem)}
                </span>
              </div>
            );
          })}
        </div>

        <div className="flex justify-between text-lg font-semibold text-white pt-2 border-t border-neutral-800">
          <span>Total</span>
          <span>{format(totalCart)}</span>
        </div>

        <Button
          disabled={openWhatsApp.isPending}
          className="w-full bg-green-600 hover:bg-green-700 text-white text-sm font-medium py-3 rounded-md transition"
          onClick={() => openWhatsApp.mutate(cart.id)}
        >
          {openWhatsApp.isPending
            ? 'Generando enlace...'
            : 'Consultar por WhatsApp'}
        </Button>
      </div>
    </div>
  );
};

export { ShoppingCart2 };
