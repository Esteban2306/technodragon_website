'use client';

import Link from 'next/link';
import Image from 'next/image';
import logo from '../../../../../public/landing/logoPage.png';
import { Menu, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { ShoppingCart } from 'lucide-react';

import { Sheet, SheetTrigger, SheetContent, SheetTitle } from '../../sheet';

import { catalogCategories } from './catalog-categorie.data';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

export function NavbarMobile() {
  const [openCatalog, setOpenCatalog] = useState(false);

  return (
    <div className="flex items-center justify-between w-full ">
      <Link href="/">
        <Image src={logo} alt="logo" className='max-w-25'/>
      </Link>

      <Sheet>
        <div className="flex items-center gap-2">
          {/* CARRITO */}
          <button
            className="
            relative p-2 rounded-xl
            bg-red-900/30 hover:bg-red-700/80
            transition-all duration-300
            shadow-[0_0_10px_rgba(220,38,38,0.3)]
            hover:shadow-[0_0_20px_rgba(220,38,38,0.6)]
            "
          >
            <ShoppingCart className="w-5 h-5 text-red-400" />

            <span
              className="
            absolute -top-1 -right-1
            bg-red-600 text-white text-[10px]
            px-1.5 py-0.5 rounded-full
            font-bold
            "
            >
              2
            </span>
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
                  {catalogCategories.map((category) => (
                    <Link
                      key={category.title}
                      href={category.href}
                      className="
                        bg-white/5 hover:bg-white/10
                        px-4 py-2 rounded-lg
                        text-left
                      "
                    >
                      <span className="block text-sm font-medium">
                        {category.title}
                      </span>
                      <span className="text-xs text-gray-400">
                        {category.description}
                      </span>
                    </Link>
                  ))}
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
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
