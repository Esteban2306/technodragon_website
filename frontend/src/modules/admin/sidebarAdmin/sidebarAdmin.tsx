'use client';

import { useState } from 'react';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
  SidebarFooter,
  SidebarProvider,
} from '@/src/shared/components/sidebar';

import {
  Package,
  PlusCircle,
  Pencil,
  Boxes,
  Tags,
  Settings,
} from 'lucide-react';

import Image from 'next/image';

import logo from '../../../../public/landing/logoPage.png';

export default function AdminSidebar({
  active,
  setActive,
}: {
  active: string;
  setActive: (value: any) => void;
}) {
  

  return (
    <SidebarProvider>
      <Sidebar
        variant="inset"
        collapsible="none"
        className="bg-transparent min-h-screen w-full "
      >
        <SidebarHeader>
          <div className="flex items-center mx-auto px-2 py-2">
            <Image src={logo} alt="Logo TechnoDragon" />
          </div>
        </SidebarHeader>

        <SidebarContent className="text-gray-300">
          <SidebarGroup>
            <SidebarGroupLabel className="text-gray-500 uppercase text-xs">
              Gestión
            </SidebarGroupLabel>

            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    isActive={active === 'product'}
                    onClick={() => setActive('product')}
                    className="data-[active=true]:bg-[#7a1c1c] data-[active=true]:text-black hover:bg-[#7a1c1c]/80 cursor-pointer"
                  >
                    <Package />
                    <span>Gestion de producto</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton
                    isActive={active === 'create'}
                    onClick={() => setActive('create')}
                    className="data-[active=true]:bg-[#7a1c1c] data-[active=true]:text-black hover:bg-[#7a1c1c]/80 cursor-pointer"
                  >
                    <PlusCircle />
                    <span>Crear producto</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel className="text-gray-500 uppercase text-xs">
              Inventario
            </SidebarGroupLabel>

            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    isActive={active === 'stock'}
                    onClick={() => setActive('stock')}
                    className="data-[active=true]:bg-[#7a1c1c] data-[active=true]:text-black hover:bg-[#7a1c1c]/80 cursor-pointer"
                  >
                    <Boxes />
                    <span>Gestion de Stock</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton
                    isActive={active === 'brand'}
                    onClick={() => setActive('brand')}
                    className="data-[active=true]:bg-[#7a1c1c] data-[active=true]:text-black hover:bg-[#7a1c1c]/80 cursor-pointer"
                  >
                    <Tags />
                    <span>Categorias / Marcas</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <SidebarMenu className="text-white">
            <SidebarMenuItem>
              <SidebarMenuButton className="hover:bg-[#7a1c1c]/80">
                <Settings />
                <span>Settings</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    </SidebarProvider>
  );
}
