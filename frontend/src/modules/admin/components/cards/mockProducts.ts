export type Variant = {
  id: string;
  price: number;
  sku: string;
  stock: number;
  isActive: boolean;
  attributes: { name: string; value: string }[];
};

export type ProductCardData = {
  id: string;
  name: string;
  description: string;
  sku: string | null;
  brand: string;
  category: string;
  image: string;
  variants: Variant[];
};

const createVariants = () => [
  {
    id: crypto.randomUUID(),
    price: 3499,
    sku: '',
    stock: 20,
    isActive: true,
    attributes: [
      { name: 'RAM', value: '16GB' },
      { name: 'SSD', value: '512GB' },
    ],
  },
  {
    id: crypto.randomUUID(),
    price: 3999,
    stock: 5,
    sku: '',
    isActive: true,
    attributes: [
      { name: 'RAM', value: '32GB' },
      { name: 'SSD', value: '1TB' },
    ],
  },
  {
    id: crypto.randomUUID(),
    price: 4999,
    stock: 0,
    sku: '',
    isActive: false,
    attributes: [
      { name: 'RAM', value: '64GB' },
      { name: 'SSD', value: '2TB' },
    ],
  },
];

export const mockProducts: ProductCardData[] = [
  {
    id: '1',
    name: 'MacBook Pro 16"',
    description: 'variante 1',
    sku: 'MBP16-2023',
    brand: 'Apple',
    category: 'Laptops',
    image: '/products/laptop.jpg',
    variants: createVariants(),
  },
  {
    id: '2',
    name: 'WH-1000XM5',
    description: 'variante 1',
    sku: 'WH1000XM5',
    brand: 'Sony',
    category: 'Audio',
    image: '/products/headphones.jpg',
    variants: createVariants(),
  },
  {
    id: '3',
    name: 'Galaxy S24 Ultra',
    description: 'variante 1',
    sku: 'S24Ultra',
    brand: 'Samsung',
    category: 'Phones',
    image: '/products/phone.jpg',
    variants: createVariants(),
  },
  {
    id: '4',
    name: 'iPad Pro M4',
    description: 'variante 1',
    sku: 'IPadProM4',
    brand: 'Apple',
    category: 'Tablets',
    image: '/products/tablet.jpg',
    variants: createVariants(),
  },
  {
    id: '5',
    name: 'RTX 4090',
    description: 'variante 1',
    sku: 'RTX4090',
    brand: 'Nvidia',
    category: 'GPU',
    image: '/products/gpu.jpg',
    variants: createVariants(),
  },
  {
    id: '6',
    name: 'PlayStation 5',
    description: 'variante 1',
    brand: 'Sony',
    sku: 'PS5',
    category: 'Gaming',
    image: '/products/ps5.jpg',
    variants: createVariants(),
  },
  {
    id: '7',
    name: 'Surface Laptop 6',
    description: 'variante 1',
    brand: 'Microsoft',
    sku: 'SurfaceLaptop6',
    category: 'Laptops',
    image: '/products/surface.jpg',
    variants: createVariants(),
  },
  {
    id: '8',
    name: 'AirPods Pro',
    description: 'variante 1',
    brand: 'Apple',
    sku: 'AirPodsPro',
    category: 'Audio',
    image: '/products/airpods.jpg',
    variants: createVariants(),
  },
  {
    id: '9',
    name: 'Keychron K8',
    description: 'variante 1',
    brand: 'Keychron',
    sku: 'K8',
    category: 'Keyboards',
    image: '/products/keyboard.jpg',
    variants: createVariants(),
  },
];