'use client';

import Link from 'next/link';
import Image from 'next/image';
import logo from '../../../../../public/landing/logoPage.png';
import { ShoppingCart } from 'lucide-react';
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

import { catalogCategories } from './catalog-categorie.data';
import { useScrolled } from '@/src/shared/hooks/useScrolled';
import { NavbarMobile } from './NavbarMobile';
import { NavLinks } from './navLinks';

export default function Navbar() {
  const scrolled = useScrolled(20);

  return (
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
                    {catalogCategories.map((category) => {
                      const Icon = getCategoryIcon(category.title);

                      return (
                        <NavigationMenuLink asChild key={category.title}>
                          <Link
                            href={category.href}
                            className="
                            flex items-start gap-3 p-2 rounded-lg
                            hover:bg-white/5 transition
                            "
                          >
                            {/* ICONO */}
                            <div className="mt-1">
                              <Icon className="w-5 h-5 text-red-500" />
                            </div>

                            {/* TEXTO */}
                            <div className="flex flex-col">
                              <span className="font-medium text-white">
                                {category.title}
                              </span>
                              <span className="text-sm text-muted-foreground">
                                {category.description}
                              </span>
                            </div>
                          </Link>
                        </NavigationMenuLink>
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

          <button className="p-2">
            <ShoppingCart className="w-5 h-5 text-red-700" />
          </button>
        </div>
      </div>
    </header>
  );
}
