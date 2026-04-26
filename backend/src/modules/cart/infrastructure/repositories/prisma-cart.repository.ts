import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/database/prisma/prisma.service';
import { CartRepository } from '../../domain/repositories/cart.repository';
import { Cart } from '../../domain/entities/cart.entity';
import { Prisma } from '@prisma/client';

@Injectable()
export class PrismaCartRepository implements CartRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(cartId: string): Promise<Cart | null> {
    const cart = await this.prisma.cart.findUnique({
      where: { id: cartId },
      include: {
        items: {
          include: {
            variant: {
              include: {
                attributes: true,
                product: {
                  include: {
                    images: true,
                    brand: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    return cart ? this.toDomain(cart) : null;
  }

  async save(cart: Cart): Promise<void> {
    const data = cart.toPersistence();

    await this.prisma.$transaction(async (tx) => {
      await tx.cart.upsert({
        where: { id: data.id },
        update: {
          isActive: data.isActive,
        },
        create: {
          id: data.id,
          isActive: data.isActive,
        },
      });

      const existingItems = await tx.cartItem.findMany({
        where: { cartId: data.id },
      });

      const existingMap = new Map(existingItems.map((i) => [i.variantId, i]));

      const incomingMap = new Map(data.items.map((i) => [i.variantId, i]));

      const toDelete = existingItems
        .filter((i) => !incomingMap.has(i.variantId))
        .map((i) => i.id);

      if (toDelete.length) {
        await tx.cartItem.deleteMany({
          where: { id: { in: toDelete } },
        });
      }

      const variantIds = data.items.map((i) => i.variantId);

      const variants = await tx.productVariant.findMany({
        where: {
          id: { in: variantIds },
        },
        select: {
          id: true,
          stock: true,
          isActive: true,
        },
      });

      const variantMap = new Map(variants.map((v) => [v.id, v]));

      for (const item of data.items) {
        const variant = variantMap.get(item.variantId);

        if (!variant) {
          throw new Error(`Variant ${item.variantId} not found`);
        }

        if (!variant.isActive) {
          throw new Error(`Variant ${item.variantId} is inactive`);
        }

        if (variant.stock < item.quantity) {
          throw new Error(`Stock insuficiente para ${item.variantId}`);
        }
      }

      await Promise.all(
        data.items.map((item) => {
          const existing = existingMap.get(item.variantId);

          if (existing) {
            if (existing.quantity !== item.quantity) {
              return tx.cartItem.update({
                where: { id: existing.id },
                data: { quantity: item.quantity },
              });
            }
            return Promise.resolve();
          }

          return tx.cartItem.create({
            data: {
              id: item.id,
              cartId: data.id,
              variantId: item.variantId,
              quantity: item.quantity,
            },
          });
        }),
      );
    });
  }

  async removeItem(cartId: string, variantId: string): Promise<void> {
    await this.prisma.cartItem.delete({
      where: {
        cartId_variantId: {
          cartId,
          variantId,
        },
      },
    });
  }

  async clear(cartId: string): Promise<void> {
    await this.prisma.cartItem.deleteMany({
      where: { cartId },
    });
  }

  private toDomain(
    cart: Prisma.CartGetPayload<{
      include: {
        items: {
          include: {
            variant: {
              include: {
                product: {
                  include: {
                    images: true;
                    brand: true;
                  };
                };
                attributes: true;
              };
            };
          };
        };
      };
    }>,
  ): Cart {
    return Cart.fromPersistence({
      id: cart.id,
      isActive: cart.isActive,
      createdAt: cart.createdAt,
      updatedAt: cart.updatedAt,

      items: cart.items.map((i) => ({
        id: i.id,
        variantId: i.variantId,
        quantity: i.quantity,
        variant: i.variant
          ? {
              id: i.variant.id,
              price: Number(i.variant.price),

              attributes: Object.fromEntries(
                (i.variant.attributes ?? []).map((attr) => [
                  attr.name,
                  attr.value,
                ]),
              ),
              product: i.variant.product
                ? {
                    name: i.variant.product.name,

                    brand: i.variant.product.brand?.name ?? 'Unknown',

                    images: i.variant.product.images.map((img) => ({
                      url: img.url,
                    })),
                  }
                : null,
            }
          : null,
      })),
    });
  }
}
