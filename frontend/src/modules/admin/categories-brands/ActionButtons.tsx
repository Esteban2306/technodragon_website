'use client';

import { Pencil, Trash2, ToggleLeft, ToggleRight, Loader2 } from 'lucide-react';

export function ActionButtons({
  onEdit,
  onDelete,
  onToggle,
  isActive,
  showToggle,
  isDeleting,
  isToggling,
}: {
  onEdit: () => void;
  onDelete: () => void;
  onToggle?: () => void;
  isActive?: boolean;
  showToggle?: boolean;
  isDeleting?: boolean;
  isToggling?: boolean;
}) {
  return (
    <div className="flex items-center gap-1">
      {showToggle && onToggle && (
        <button
          onClick={onToggle}
          disabled={isToggling}
          className="p-1.5 rounded-lg text-gray-500 hover:text-white hover:bg-[#1f1f1f] transition-colors disabled:opacity-40"
          title={isActive ? 'Desactivar' : 'Activar'}
        >
          {isToggling ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : isActive ? (
            <ToggleRight className="w-4 h-4 text-green-400" />
          ) : (
            <ToggleLeft className="w-4 h-4" />
          )}
        </button>
      )}
      <button
        onClick={onEdit}
        className="p-1.5 rounded-lg text-gray-500 hover:text-white hover:bg-[#1f1f1f] transition-colors"
        title="Editar"
      >
        <Pencil className="w-4 h-4" />
      </button>
      <button
        onClick={onDelete}
        disabled={isDeleting}
        className="p-1.5 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-colors disabled:opacity-40"
        title="Eliminar"
      >
        {isDeleting ? (
          <Loader2 className="w-4 h-4 animate-spin text-red-400" />
        ) : (
          <Trash2 className="w-4 h-4" />
        )}
      </button>
    </div>
  );
}
