'use client';

import {
  Collapsible,
  CollapsibleTrigger,
  CollapsiblePanel,
  useCollapsible,
} from '@/src/shared/components/collapsible';

import { ChevronDown } from 'lucide-react';
import { SidebarGroup } from '@/src/shared/components/sidebar';
import { motion } from 'motion/react';

function FilterChevron() {
  const { isOpen } = useCollapsible();

  return (
    <motion.div
      animate={{ rotate: isOpen ? 180 : 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      <ChevronDown className="w-4 h-4 opacity-60 group-hover:text-red-500 group-hover:opacity-100 transition-colors" />
    </motion.div>
  );
}

export function FilterSection({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  return (
    <Collapsible defaultOpen={defaultOpen}>
      <SidebarGroup className="p-0">
        <CollapsibleTrigger className="w-full group">
          <div className="flex items-center justify-between px-2 py-2 text-sm font-medium text-white hover:bg-red-900/40 cursor-pointer rounded-md transition">
            <span>{title}</span>
            <FilterChevron />
          </div>
        </CollapsibleTrigger>

        <CollapsiblePanel className="px-2 pt-1 pb-3 space-y-2">
          {children}
        </CollapsiblePanel>
      </SidebarGroup>
    </Collapsible>
  );
}