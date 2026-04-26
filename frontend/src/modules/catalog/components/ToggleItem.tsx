import { Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Toggle } from '@/src/shared/components/toggle';

export function ToggleItem({
  label,
  value,
  selectedValues,
  onChange,
}: {
  label: string;
  value: string;
  selectedValues: string[];
  onChange: (value: string) => void;
}) {
  const isActive = selectedValues.includes(value);

  return (
    <div
      onClick={() => onChange(value)}
      className="
        flex items-center gap-3
        cursor-pointer
        group
      "
    >
      <Toggle
        pressed={isActive}
        className="
          w-4 h-7 p-0 cursor-pointer
          flex items-center justify-center
          border border-[#2D2F32]
          bg-[#0F1316]
          rounded-md
          transition

          group-hover:border-red-500/50

          data-[state=on]:bg-red-600
          data-[state=on]:border-red-500
        "
      >
        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              <Check className="w-3.5 h-3.5 text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </Toggle>

      <span
        className="
          text-sm text-gray-300
          group-hover:text-white
          transition
        "
      >
        {label}
      </span>
    </div>
  );
}