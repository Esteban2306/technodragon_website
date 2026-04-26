'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Minus, Plus } from 'lucide-react';

type Props = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;

  // 🔥 control de tamaño
  size?: 'sm' | 'md' | 'lg';

  // 🔥 override total (pro level)
  className?: string;
};

export default function StockCounter({
  value,
  onChange,
  min = 0,
  max = 9999,
  size = 'md',
  className = '',
}: Props) {
  const [internal, setInternal] = useState(String(value));
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [isFocused, setIsFocused] = useState(false);

  const parsed = parseInt(internal) || 0;

  useEffect(() => {
    setInternal(String(value));
  }, [value]);

  const sizes = {
    sm: {
      container: 'h-7',
      button: 'px-1 text-xs',
      input: 'w-8 text-xs',
      icon: 12,
    },
    md: {
      container: 'h-8',
      button: 'px-2 text-sm',
      input: 'w-10 text-sm',
      icon: 14,
    },
    lg: {
      container: 'h-10',
      button: 'px-3 text-base',
      input: 'w-14 text-base',
      icon: 18,
    },
  };

  const s = sizes[size];

  const handleWheel = (e: React.WheelEvent) => {
    if (!isFocused) return;

    e.preventDefault();

    if (e.deltaY < 0) increment();
    else decrement();
  };

  const increment = () => {
    const newVal = Math.min(parsed + 1, max);
    setInternal(String(newVal));
    onChange(newVal);
  };

  const decrement = () => {
    const newVal = Math.max(parsed - 1, min);
    setInternal(String(newVal));
    onChange(newVal);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (/^\d*$/.test(val)) setInternal(val);
  };

  const handleBlur = () => {
    let num = parseInt(internal);
    if (isNaN(num)) num = min;

    num = Math.max(min, Math.min(max, num));

    setInternal(String(num));
    onChange(num);
  };

  const startHold = (action: () => void) => {
    action();
    intervalRef.current = setInterval(action, 120);
  };

  const stopHold = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  return (
    <div
      onWheel={handleWheel}
      className={`flex items-center bg-[#111] border border-[#1a1a1a] rounded-md overflow-hidden ${s.container} ${className}`}
    >
      {/* ➖ */}
      <motion.button
        type="button"
        onMouseDown={() => startHold(decrement)}
        onMouseUp={stopHold}
        onMouseLeave={stopHold}
        whileTap={{ scale: 0.85 }}
        disabled={parsed <= min}
        className={`${s.button} ${
          parsed <= min
            ? 'text-gray-600 cursor-not-allowed'
            : 'text-white cursor-pointer p-2 hover:bg-[#222]'
        }`}
      >
        <Minus size={s.icon} />
      </motion.button>

      <div className={`relative text-center ${s.input}`}>
        <input
          value={internal}
          onChange={handleInput}
          onBlur={() => {
            setIsFocused(false);
            handleBlur();
          }}
          onFocus={() => setIsFocused(true)}
          className="w-full bg-transparent text-center outline-none text-white"
        />
        <AnimatePresence mode="wait">
          <motion.span
            key={internal}
            initial={{ y: -6, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 6, opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none text-white"
          >
            {internal}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* ➕ */}
      <motion.button
        type="button"
        onMouseDown={() => startHold(increment)}
        onMouseUp={stopHold}
        onMouseLeave={stopHold}
        whileTap={{ scale: 0.85 }}
        disabled={parsed >= max}
        className={`${s.button} ${
          parsed >= max
            ? 'text-gray-600 cursor-not-allowed'
            : 'text-white cursor-pointer p-2 hover:bg-[#222]'
        }`}
      >
        <Plus size={s.icon} />
      </motion.button>
    </div>
  );
}
