'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
} from 'framer-motion';

const MAX_OVERFLOW = 50;

interface ElasticSliderProps {
  defaultValue?: number;
  startingValue?: number;
  maxValue?: number;
  className?: string;
  isStepped?: boolean;
  stepSize?: number;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onChange?: (value: number) => void; 
}

const ElasticSlider: React.FC<ElasticSliderProps> = ({
  defaultValue = 50,
  startingValue = 0,
  maxValue = 100,
  className = '',
  isStepped = false,
  stepSize = 1,
  leftIcon = <>-</>,
  rightIcon = <>+</>,
  onChange,
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-4 w-full ${className}`}
    >
      <Slider
        defaultValue={defaultValue}
        startingValue={startingValue}
        maxValue={maxValue}
        isStepped={isStepped}
        stepSize={stepSize}
        leftIcon={leftIcon}
        rightIcon={rightIcon}
        onChange={onChange}
      />
    </div>
  );
};

interface SliderProps {
  defaultValue: number;
  startingValue: number;
  maxValue: number;
  isStepped: boolean;
  stepSize: number;
  leftIcon: React.ReactNode;
  rightIcon: React.ReactNode;
  onChange?: (value: number) => void;
}

const Slider: React.FC<SliderProps> = ({
  defaultValue,
  startingValue,
  maxValue,
  isStepped,
  stepSize,
  leftIcon,
  rightIcon,
  onChange,
}) => {
  const [value, setValue] = useState<number>(defaultValue);
  const sliderRef = useRef<HTMLDivElement>(null);

  const [region, setRegion] = useState<'left' | 'middle' | 'right'>('middle');

  const clientX = useMotionValue(0);
  const overflow = useMotionValue(0);
  const scale = useMotionValue(1);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  useMotionValueEvent(clientX, 'change', (latest: number) => {
    if (!sliderRef.current) return;

    const { left, right } = sliderRef.current.getBoundingClientRect();

    let newValue = 0;

    if (latest < left) {
      setRegion('left');
      newValue = left - latest;
    } else if (latest > right) {
      setRegion('right');
      newValue = latest - right;
    } else {
      setRegion('middle');
    }

    overflow.set(decay(newValue, MAX_OVERFLOW));
  });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!sliderRef.current || e.buttons === 0) return;

    const { left, width } = sliderRef.current.getBoundingClientRect();

    let newValue =
      startingValue + ((e.clientX - left) / width) * (maxValue - startingValue);

    if (isStepped) {
      newValue = Math.round(newValue / stepSize) * stepSize;
    }

    newValue = Math.min(Math.max(newValue, startingValue), maxValue);

    setValue(newValue);
    onChange?.(newValue);

    clientX.set(e.clientX);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    handlePointerMove(e);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerUp = () => {
    animate(overflow, 0, { type: 'spring', bounce: 0.4 });
  };

  const percentage =
    ((value - startingValue) / (maxValue - startingValue)) * 100;

  const scaleX = useTransform(overflow, (v) => 1 + v / 300);
  const scaleY = useTransform(overflow, [0, MAX_OVERFLOW], [1, 0.85]);

  return (
    <div className="w-full">
      <motion.div
        onHoverStart={() => animate(scale, 1.15)}
        onHoverEnd={() => animate(scale, 1)}
        style={{
          scale,
          opacity: useTransform(scale, [1, 1.15], [0.7, 1]),
        }}
        className="flex items-center gap-4"
      >
        <motion.div
          animate={{
            scale: region === 'left' ? [1, 1.3, 1] : 1,
          }}
        >
          {leftIcon}
        </motion.div>

        <div
          ref={sliderRef}
          className="relative flex-1 cursor-grab py-4"
          onPointerMove={handlePointerMove}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
        >
          <motion.div
            style={{
              scaleX,
              scaleY,
              height: 8,
            }}
            className="bg-gray-400 rounded-full overflow-hidden"
          >
            <div
              className="h-full bg-red-500 rounded-full"
              style={{ width: `${percentage}%` }}
            />
          </motion.div>
        </div>

        <motion.div
          animate={{
            scale: region === 'right' ? [1, 1.3, 1] : 1,
          }}
        >
          {rightIcon}
        </motion.div>
      </motion.div>

      {/* VALOR */}
      <p className="text-xs text-gray-400 text-center mt-1">
        ${Math.round(value).toLocaleString()}
      </p>
    </div>
  );
};

function decay(value: number, max: number): number {
  if (max === 0) return 0;

  const entry = value / max;
  const sigmoid = 2 * (1 / (1 + Math.exp(-entry)) - 0.5);

  return sigmoid * max;
}

export default ElasticSlider;
