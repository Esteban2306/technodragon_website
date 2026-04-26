import { X } from 'lucide-react';

type Props = {
  attr: {
    name: string;
    value: string;
  };
  onRemove: () => void;
};

export default function AttributeItem({ attr, onRemove }: Props) {
  return (
    <div className="flex items-center gap-1 px-2 py-1 bg-[#111] border border-[#1a1a1a] rounded-md text-xs">
      {attr.name}: {attr.value}

      <button onClick={onRemove}>
        <X className="size-3 text-gray-400 hover:text-red-500 cursor-pointer" />
      </button>
    </div>
  );
}