import * as React from 'react';

import { cn } from '@/lib/utils';

function Input({
  className,
  type,
  isValid,
  isError,
  ...props
}: React.ComponentProps<'input'> & {
  isValid?: boolean;
  isError?: boolean;
}) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'h-11 w-full rounded-xl border bg-transparent px-4 text-sm text-white transition-all outline-none',
        'placeholder:text-neutral-500',
        'border-neutral-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30',

        isValid &&
          'border-green-500 focus:border-green-500 focus:ring-green-500/30',
        isError && 'border-red-500 focus:border-red-500 focus:ring-red-500/30',

        className,
      )}
      {...props}
    />
  );
}

export { Input };
