'use client';

import Link from 'next/link';
import Image from 'next/image';
import logo from '../../../../../public/landing/logoPage.png';
import { Menu, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { ShoppingCart } from 'lucide-react';

import { Sheet, SheetTrigger, SheetContent, SheetTitle } from '../../sheet';

import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { getCategoryIcon } from '@/src/shared/utils/categoryIcons';
import CartSidebar from '@/src/modules/catalog/cart/CartSidebar';
import { useCart } from '@/src/modules/hooks/useCart';
import { useAuth } from '@/src/modules/auth/provider/AuthProvider';
import AuthDialog from '@/src/modules/auth/components/AuthDialog';
import { useCategories } from '@/src/modules/admin/hooks/useCategories';
import { getCategoryDescription } from '@/src/shared/utils/categoryDescriptions';

export function NavbarMobile() {
  const { data: cart } = useCart();
  const { user } = useAuth();
  const { data: categories, isLoading } = useCategories();

  const totalItems =
    cart?.items.reduce((acc, item) => acc + item.quantity, 0) || 0;
  const [openCatalog, setOpenCatalog] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const navCategories =
    categories?.map((cat) => {
      return {
        id: cat.id,
        title: cat.name,
        href: `/catalog?categoryId=${cat.id}`,
        description: getCategoryDescription(cat.name),
        icon: getCategoryIcon(cat.name),
      };
    }) || [];

  return (
    <div className="flex items-center justify-between w-full ">
      <Link href="/">
        <Image src={logo} alt="logo" className="max-w-25" />
      </Link>

      <Sheet>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCartOpen(true)}
            className="
              relative p-2 rounded-xl
              bg-red-900/30 hover:bg-red-700/80
              transition-all duration-300
              shadow-[0_0_10px_rgba(220,38,38,0.3)]
              hover:shadow-[0_0_20px_rgba(220,38,38,0.6)]
            "
          >
            <ShoppingCart className="w-5 h-5 text-red-400" />

            {totalItems > 0 && (
              <span
                className="
                  absolute -top-1 -right-1
                  bg-red-600 text-white text-[10px]
                  px-1.5 py-0.5 rounded-full
                  font-bold
                  min-w-4.5 text-center
                "
              >
                {totalItems}
              </span>
            )}
          </button>

          <SheetTrigger asChild>
            <button className="p-2 rounded-lg hover:bg-white/10 transition">
              <Menu className="w-6 h-6 text-white" />
            </button>
          </SheetTrigger>
        </div>

        <VisuallyHidden>
          <SheetTitle>Menú de navegación</SheetTitle>
        </VisuallyHidden>

        <SheetContent
          side="right"
          className="
            w-[85%] sm:w-100 overflow-y-hidden max-h-screen h-full text-white
            bg-black/70 backdrop-blur-xl
            border-l border-transparent
            p-6
          "
        >
          <div className="absolute left-0 top-0 h-full w-1.5 pointer-events-none">
            <div className="w-full h-full bg-red-600/70 blur-md" />
            <div className="w-full h-full bg-linear-to-r from-red-600/40 to-transparent blur-lg" />
          </div>

          <div className="mt-10 flex flex-col items-center gap-6">
            <Link
              href="/"
              className="
                w-full text-center
                bg-red-900/20 hover:bg-red-800/80
                transition
                py-3 rounded-xl
                font-medium
              "
            >
              Inicio
            </Link>

            <div className="w-full">
              <button
                onClick={() => setOpenCatalog(!openCatalog)}
                className="
                  w-full flex items-center justify-center
                  bg-red-900/20 hover:bg-red-800/80
                  transition
                  py-3 px-4 rounded-xl
                  font-medium
                "
              >
                Catálogo
                <ChevronDown
                  className={`transition-transform ${
                    openCatalog ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <div
                className={`
                  overflow-hidden transition-all duration-300
                  ${openCatalog ? 'max-h-96 mt-3' : 'max-h-0'}
                `}
              >
                <div className="flex flex-col gap-2">
                  {isLoading && (
                    <span className="text-sm text-gray-400 px-4">
                      Cargando categorías...
                    </span>
                  )}

                  {navCategories.map((category) => {
                    const Icon = category.icon;

                    return (
                      <Link
                        key={category.id}
                        href={category.href}
                        className="
                          flex items-start gap-3
                          bg-white/5 hover:bg-white/10
                          px-4 py-2 rounded-lg
                        "
                      >
                        <Icon className="w-8 h-8 text-red-400 mt-1 min-w-4.75 min-h-4.75 max-w-4.75 max-h-4.75" />

                        <div>
                          <span className="block text-sm font-medium">
                            {category.title}
                          </span>
                          <span className="text-xs text-gray-400">
                            {category.description}
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>

            <Link
              href="#"
              className="
                w-full text-center
                bg-red-900/20 hover:bg-red-800/80
                transition
                py-3 rounded-xl
                font-medium
              "
            >
              Servicios
            </Link>

            <Link
              href="#"
              className="
                w-full text-center
                bg-red-900/20 hover:bg-red-800/80
                transition
                py-3 rounded-xl
                font-medium
              "
            >
              Contacto
            </Link>

            <div className="flex items-center gap-3">
              {user ? <AuthDialog /> : <AuthDialog />}
            </div>
          </div>
        </SheetContent>
      </Sheet>
      <CartSidebar open={cartOpen} onOpenChange={setCartOpen} />
    </div>
  );
}
