'use client';

import { Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react';
import { useState } from 'react';

import { AspectRatio } from '@/src/shared/components/aspect-ratio';
import { Button } from './button';
import { Separator } from '@/src/shared/components/separator';
import Image from 'next/image';
import { useCart } from '@/src/shared/context/cartContext';
import { CartItem } from '@/src/shared/context/cartContext';

const ShoppingCart2 = () => {
  const { items, updateQuantity, removeItem } = useCart();

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shipping = 9.99;
  const total = subtotal + shipping;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  if (items.length === 0) {
    return (
      <section className="py-32">
        <div className="container max-w-lg text-center">
          <h1 className="mb-4 text-2xl font-semibold">Tu carrito está vacío</h1>
          <p className="mb-8 text-muted-foreground">
            Parece que aún no has añadido nada.
          </p>
          <Button asChild>
            <a href="#">Continua explorando</a>
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8">
      <div className="container">
        <div className="flex flex-col gap-8 w-full">
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.variantId}
                  className="
                    grid grid-cols-[80px_1fr] 
                    sm:flex 
                    gap-3 sm:gap-4 
                    rounded-lg border bg-card p-3
                    border-gray-700/50
                  "
                >
                  <div className="w-[80px] sm:w-24 shrink-0">
                    <AspectRatio
                      ratio={1}
                      className="overflow-hidden rounded-md bg-muted"
                    >
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="size-full object-cover"
                      />
                    </AspectRatio>
                  </div>

                  <div className="flex flex-col justify-between min-w-0">
                    <div>
                      <h3 className="font-medium truncate ">{item.name}</h3>
                      {item.variantId && (
                        <p className="text-sm text-muted-foreground">
                          {item.variantLabel}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="size-8"
                        onClick={() => updateQuantity(item.variantId, -1)}
                      >
                        <Minus className="size-3" />
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="size-8"
                        onClick={() => updateQuantity(item.variantId, 1)}
                      >
                        <Plus className="size-3" />
                      </Button>
                    </div>
                  </div>

                  <div
                    className="
  col-span-2
  flex justify-between items-center
  sm:flex-col sm:items-end sm:justify-between
  gap-2 mt-2 sm:mt-0
"
                  >
                    
                    <div className="text-right">
                      <p className="font-semibold">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {formatPrice(item.price)} Cada
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-muted-foreground cursor-pointer p-4"
                      onClick={() => removeItem(item.variantId)}
                    >
                      <Trash2 className="mr-1 size-4" />
                      Eliminar
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1 w-full">
            <div className="rounded-lg border bg-card p-6">
              <h2 className="mb-4 text-lg font-semibold">Resumen del pedido</h2>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="flex items-center gap-1.5 text-muted-foreground">
                    <ShoppingCart className="size-4" />
                    {items.length} {items.length === 1 ? 'item' : 'items'}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>

                <Separator />

                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>

              <Button size="lg" className="mt-6 w-full">
                Consultar por whatsapp
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { ShoppingCart2 };
