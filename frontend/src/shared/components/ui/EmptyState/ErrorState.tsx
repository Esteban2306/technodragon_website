'use client';

import { ReactNode } from 'react';
import { AlertCircle } from 'lucide-react';

type Props = {
  title?: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
};

export const EmptyState = ({
  title = 'Nada por aquí...',
  description = 'No encontramos resultados para mostrar.',
  icon,
  action,
}: Props) => {
  return (
    <div className="w-full flex flex-col items-center justify-center py-20 text-center">
      
      <div className="mb-4 text-red-500">
        {icon ?? <AlertCircle className="w-10 h-10" />}
      </div>

      <h3 className="text-lg font-semibold text-white mb-2">
        {title}
      </h3>

      <p className="text-sm text-gray-400 max-w-md mb-4">
        {description}
      </p>

      {action && <div>{action}</div>}
    </div>
  );
};