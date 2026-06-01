'use client';

export function StatCard({
  label,
  value,
  sub,
}: {
  label: string;
  value: string | number;
  sub?: string;
}) {
  return (
    <div className="bg-[#111] border border-[#1f1f1f] rounded-xl p-4 flex flex-col gap-1">
      <span className="text-xs text-gray-500 uppercase tracking-wider">
        {label}
      </span>
      <span className="text-2xl font-semibold text-white">{value}</span>
      {sub && <span className="text-xs text-green-500">{sub}</span>}
    </div>
  );
}

export function Badge({ active }: { active: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
        active
          ? 'bg-green-500/10 text-green-400 border border-green-500/20'
          : 'bg-gray-700/40 text-gray-500 border border-gray-700/40'
      }`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${active ? 'bg-green-400' : 'bg-gray-500'}`}
      />
      {active ? 'Activo' : 'Inactivo'}
    </span>
  );
}
