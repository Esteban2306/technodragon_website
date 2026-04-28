'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import CartSidebar from '@/src/modules/catalog/cart/CartSidebar';

import logo from '../../../../../public/landing/logoPage.png';
import { ShoppingCart, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { getCategoryIcon } from '@/src/shared/utils/categoryIcons';

import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
} from '../../navigation-menu';

import { useScrolled } from '@/src/shared/hooks/useScrolled';
import { NavbarMobile } from './NavbarMobile';
import { useCart } from '@/src/modules/hooks/useCart';

import AuthDialog from '@/src/modules/auth/components/AuthDialog';
import { useAuth } from '@/src/modules/auth/provider/AuthProvider';
import { useCategories } from '@/src/modules/admin/hooks/useCategories';
import { getCategoryDescription } from '@/src/shared/utils/categoryDescriptions';

export default function Navbar() {
  const { data: cart } = useCart();
  const { data: categories, isLoading } = useCategories();

  const totalItems =
    cart?.items.reduce((acc, item) => acc + item.quantity, 0) || 0;
  const [cartOpen, setCartOpen] = useState(false);
  const { user } = useAuth();
  const scrolled = useScrolled(20);

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
    <>
      <header className="w-full fixed top-0 left-0 z-50 bg-gray-900/10 backdrop-blur-md p-2">
        <motion.div
          className="absolute top-20 left-1/2 -translate-x-1/2 min-w-520 w-screen pointer-events-none"
          initial={false}
          animate={{
            opacity: scrolled ? 1 : 0,
          }}
          transition={{ duration: 0.35 }}
        >
          <div className="w-full h-0.5 bg-red-600/40" />

          <div className="w-full h-1.5 bg-red-600/70 blur-md" />

          <div className="w-full h-7.5 bg-linear-to-b from-red-600/40 via-red-500/10 to-transparent blur-lg" />
        </motion.div>

        <div className="max-w-7xl mx-auto px-2 h-16 flex items-center justify-between">
          <div className="flex w-full lg:hidden">
            <NavbarMobile />
          </div>

          <div className="hidden lg:flex w-full items-center justify-between">
            <Link href="/">
              <Image src={logo} alt="logo technodragon" />
            </Link>

            <NavigationMenu>
              <NavigationMenuList className="gap-2">
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/">Inicio</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger>Catálogo</NavigationMenuTrigger>

                  <NavigationMenuContent>
                    <div className="grid w-100 gap-3 p-4 md:w-125 md:grid-cols-2">
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
                            <Icon className="w-8 h-8 text-red-400 mt-1 min-w-4.75 min-h-4.75" />

                            <div>
                              <span className="block text-sm font-medium text-white">
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
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/#service">Servicios</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/#contact" passHref>
                      Contacto
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <div className="flex items-center gap-3">
              {user ? <AuthDialog /> : <AuthDialog />}

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
            </div>
          </div>
        </div>
      </header>
      <CartSidebar open={cartOpen} onOpenChange={setCartOpen} />
    </>
  );
}
