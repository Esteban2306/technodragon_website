import { Check } from 'lucide-react';
import BorderGlow from '@/src/shared/components/BorderGlow';

type Props = {
  icon: React.ElementType;
  title: string;
  subtitle: string;
  descriptions: string[];
};

export default function RepairCardInfo({
  icon: Icon,
  title,
  subtitle,
  descriptions,
}: Props) {
  return (
    <BorderGlow
      edgeSensitivity={69}
      glowColor="350 60% 35%"
      backgroundColor="#060010"
      borderRadius={28}
      glowRadius={50}
      glowIntensity={2}
      coneSpread={25}
      animated={false}
      colors={[
        'rgba(120, 0, 40, 0.9)',
        'rgba(180, 0, 60, 0.7)',
        'rgba(60, 0, 20, 0.8)',
      ]}
    >
      <div className="relative bg-[#1B1B1B]/70 w-full min-h-100 h-full max-w-100 rounded-3xl p-5 sm:p-6 border m-auto border-[#2A2A2A] overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-0.5 bg-linear-to-r from-[#1B1B1B]/60 via-[#FB0000]/80 to-[#1B1B1B]/60" />

        <div className="flex flex-col gap-4">
          <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-[#27181C]">
            <Icon className="text-red-600" size={24} />
          </div>

          <h5 className="text-white text-xl font-semibold">{title}</h5>

          <p className="text-[#797979] text-sm leading-relaxed">{subtitle}</p>
        </div>

        <ul className="mt-6 flex flex-col gap-3">
          {descriptions.map((item, index) => (
            <li
              key={index}
              className="flex items-center gap-2 text-sm text-gray-300"
            >
              <Check className="text-red-600" size={16} />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </BorderGlow>
  );
}
