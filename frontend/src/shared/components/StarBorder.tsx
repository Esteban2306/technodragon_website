import React from 'react';

type StarBorderProps<T extends React.ElementType> =
  React.ComponentPropsWithoutRef<T> & {
    as?: T;
    className?: string;
    children?: React.ReactNode;
    color?: string;
    background?: string;
    speed?: React.CSSProperties['animationDuration'];
    thickness?: number;
  };

const StarBorder = <T extends React.ElementType = 'button'>({
  as,
  className = '',
  color = 'white',
  speed = '6s',
  thickness = 1,
  background,
  children,
  ...rest
}: StarBorderProps<T>) => {
  const Component = as || 'button';

  return (
    <Component
      className={`relative inline-block overflow-hidden rounded-[20px] ${className}`}
      {...(rest as any)}
      style={{
        padding: `${thickness}px 0`,
        ...(rest as any).style,
      }}
    >
      <div
        className="absolute w-[300%] h-[50%] opacity-70 -bottom-2.75 right-[-250%] rounded-full animate-star-bottom z-0"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed,
        }}
      ></div>
      <div
        className="absolute w-[300%] h-[50%] opacity-70 -top-2.5 left-[-250%] rounded-full animate-star-top z-0"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed,
        }}
      ></div>
      <div
        className="relative z-10 border border-black text-white text-center text-[16px] py-4 px-6.5 rounded-[20px]"
        style={{
          background: background || 'linear-gradient(to bottom, #000, #111)',
        }}
      >
        {children}
      </div>
    </Component>
  );
};

export default StarBorder;
