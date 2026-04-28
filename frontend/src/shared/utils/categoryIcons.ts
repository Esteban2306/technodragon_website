import {
  Laptop,
  Smartphone,
  Watch,
  Headphones,
  Cpu,
  Monitor,
  Keyboard,
  Mouse,
  HardDrive,
  Gamepad2,
  Camera,
  Package,
  LucideIcon,
} from 'lucide-react';

type Rule = {
  match: string[];
  icon: LucideIcon;
};

export const categoryIconRules: Rule[] = [
  {
    match: ['laptop', 'portatil', 'notebook', 'Portátiles', 'ultrabook', 'pc'],
    icon: Laptop,
  },
  {
    match: ['telefono', 'movil', 'celular', 'smartphone', 'iphone', 'android'],
    icon: Smartphone,
  },
  {
    match: ['reloj', 'watch', 'smartwatch'],
    icon: Watch,
  },
  {
    match: ['audio', 'auricular', 'audifono', 'headphone', 'sonido'],
    icon: Headphones,
  },
  {
    match: ['teclado', 'keyboard'],
    icon: Keyboard,
  },
  {
    match: ['mouse', 'raton'],
    icon: Mouse,
  },
  {
    match: ['monitor', 'pantalla', 'display'],
    icon: Monitor,
  },
  {
    match: ['procesador', 'cpu', 'chip'],
    icon: Cpu,
  },
  {
    match: ['disco', 'ssd', 'hdd', 'almacenamiento'],
    icon: HardDrive,
  },
  {
    match: ['gaming', 'consola', 'control', 'gamepad'],
    icon: Gamepad2,
  },
  {
    match: ['camara', 'fotografia'],
    icon: Camera,
  },
];

export function getCategoryIcon(categoryName: string) {
  const name = categoryName.toLowerCase();

  for (const rule of categoryIconRules) {
    if (rule.match.some((keyword) => name.includes(keyword))) {
      return rule.icon;
    }
  }

  return Package;
}
