import {
  Laptop,
  Smartphone,
  Watch,
  Headphones,
  Package,
} from 'lucide-react';

export const categoryIcons: Record<string, any> = {
  laptops: Laptop,
  smartphones: Smartphone,
  watches: Watch,
  audio: Headphones,
  default: Package,
};

export const categoryIconRules = [
  { match: ['laptop', 'pc', 'computador'], icon: Laptop },
  { match: ['phone', 'movil', 'smartphone'], icon: Smartphone },
  { match: ['watch', 'reloj'], icon: Watch },
  { match: ['accesorios', 'auricular'], icon: Headphones },
];

export function getCategoryIcon(categoryName: string) {
  const name = categoryName.toLowerCase();

  for (const rule of categoryIconRules) {
    if (rule.match.some(keyword => name.includes(keyword))) {
      return rule.icon;
    }
  }

  return Package;
}

