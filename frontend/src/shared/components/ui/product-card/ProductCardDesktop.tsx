import { ProductPreview } from '@/src/shared/types/catalog.types';
import { ProductCardBase } from './ProductCardBase';
import { useCart, CartItem } from '@/src/shared/context/cartContext';
import Link from 'next/link';

export const ProductCardDesktop = ({
  product,
}: {
  product: ProductPreview;
}) => {
  const { addItem } = useCart();

  const defaultVariant = product.variants?.[0];

  const handleAddToCart = () => {
    if (!defaultVariant) return;

    const cartItem: CartItem = {
      variantId: defaultVariant.id,
      productId: product.id,

      name: product.name,
      image: defaultVariant.image || product.images?.[0] || '',
      price: defaultVariant.price,

      quantity: 1,

      variantLabel: defaultVariant.attributes
        ?.map((attr) => `${attr.name}: ${attr.value}`)
        .join(', '),
    };

    addItem(cartItem);
  };

  return (
    <div
      className="
        group relative w-fit
        transition-transform duration-300
        hover:scale-103
      "
    >
      <ProductCardBase
        product={product}
        className="transition-all duration-300 group-hover:border-white/40"
      />

      <div
        className="
          absolute inset-0
          flex flex-col items-center justify-center gap-3
          rounded-2xl
          bg-black/60

          opacity-0 group-hover:opacity-100
          transition-all duration-300
        "
      >
        <Link href={`/product/${product.id}`}>
          <button
            className="
            cursor-pointer
            bg-white text-black px-4 py-2 rounded-lg text-sm
            hover:scale-103 transition
          "
          >
            Ver producto
          </button>
        </Link>
      </div>
    </div>
  );
};
