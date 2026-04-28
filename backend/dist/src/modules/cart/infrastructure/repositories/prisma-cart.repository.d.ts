import { PrismaService } from 'src/infrastructure/database/prisma/prisma.service';
import { CartRepository } from '../../domain/repositories/cart.repository';
import { Cart } from '../../domain/entities/cart.entity';
export declare class PrismaCartRepository implements CartRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findById(cartId: string): Promise<Cart | null>;
    save(cart: Cart): Promise<void>;
    removeItem(cartId: string, variantId: string): Promise<void>;
    clear(cartId: string): Promise<void>;
    private toDomain;
}
