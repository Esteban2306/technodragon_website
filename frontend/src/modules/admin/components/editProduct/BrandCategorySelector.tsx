'use client';

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/src/shared/components/popover';

type Option = {
  id: string;
  name: string;
};

type Props = {
  label: string;
  value: string;
  options: Option[];
  onChange: (id: string) => void;
};

export default function BrandCategorySelector({
  label,
  value,
  options,
  onChange,
}: Props) {
  const selected = options.find((o) => o.id === value);

  return (
    <div className="">
      <p className="text-xs text-gray-400">{label}</p>

      <Popover>
        <PopoverTrigger asChild> 
          <button className=" min-w-30 w-full text-left focus:border-red-800/80 px-3 py-2 bg-[#111] border border-[#1a1a1a] rounded-md text-sm">
            {selected?.name ?? 'Seleccionar'}
          </button>
        </PopoverTrigger>

        <PopoverContent className="bg-[#111] border border-[#1a1a1a] text-white">
          <div className="space-y-1 max-h-40 overflow-y-auto">
            {options.map((opt) => (
              <button
                key={opt.id}
                onClick={() => onChange(opt.id)}
                className="w-full text-left px-2 py-1 text-sm hover:bg-[#222] rounded"
              >
                {opt.name}
              </button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}