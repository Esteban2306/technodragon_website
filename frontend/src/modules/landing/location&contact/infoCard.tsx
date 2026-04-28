import { LucideIcon } from 'lucide-react';

type InfoCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  value: string;
};

export default function InfoCard({
  icon: Icon,
  title,
  description,
  value,
}: InfoCardProps) {
  return (
    <div className="bg-[#140d0d] border border-red-900/20 rounded-xl p-5 hover:border-red-700/40 transition-all duration-300">
      <div className="bg-red-900/30 p-3 rounded-lg w-fit mb-4">
        <Icon className="text-red-400 w-5 h-5" />
      </div>

      <h3 className="text-white font-semibold text-lg mb-2">{title}</h3>

      <p className="text-gray-400 text-sm mb-4 leading-relaxed">
        {description}
      </p>

      <p className="text-white text-sm font-medium whitespace-pre-line">
        {value}
      </p>
    </div>
  );
}
