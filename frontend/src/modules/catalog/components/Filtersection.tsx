import {
  Collapsible,
  CollapsibleTrigger,
  CollapsiblePanel,
} from '@/src/shared/components/collapsible';

import { ChevronDown } from 'lucide-react';

import {
  SidebarGroup,
} from '@/src/shared/components/sidebar';

export function FilterSection({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  return (
    <Collapsible defaultOpen={defaultOpen}>
      <SidebarGroup>
        <CollapsibleTrigger className="w-full">
          <div className="flex items-center justify-between px-2 py-2 text-sm font-medium text-white hover:bg-red-900/40 cursor-pointer rounded-md transition">
            <span>{title}</span>
            <ChevronDown className="w-4 h-4 opacity-60" />
          </div>
        </CollapsibleTrigger>

        <CollapsiblePanel className="px-2 pt-2 pb-3 space-y-2">
          {children}
        </CollapsiblePanel>
      </SidebarGroup>
    </Collapsible>
  );
}