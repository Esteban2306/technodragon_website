export type Variant = {
  id: string;
  price: number;
  stock: number;
  isActive: boolean;
  attributes: { name: string; value: string }[];
};

export type ProductCardData = {
  id: string;
  name: string;
  brand: string;
  category: string;
  image: string;
  variants: Variant[];
};

const createVariants = () => [
  {
    id: crypto.randomUUID(),
    price: 3499,
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
    brand: 'Apple',
    category: 'Laptops',
    image: '/products/laptop.jpg',
    variants: createVariants(),
  },
  {
    id: '2',
    name: 'WH-1000XM5',
    brand: 'Sony',
    category: 'Audio',
    image: '/products/headphones.jpg',
    variants: createVariants(),
  },
  {
    id: '3',
    name: 'Galaxy S24 Ultra',
    brand: 'Samsung',
    category: 'Phones',
    image: '/products/phone.jpg',
    variants: createVariants(),
  },
  {
    id: '4',
    name: 'iPad Pro M4',
    brand: 'Apple',
    category: 'Tablets',
    image: '/products/tablet.jpg',
    variants: createVariants(),
  },
  {
    id: '5',
    name: 'RTX 4090',
    brand: 'Nvidia',
    category: 'GPU',
    image: '/products/gpu.jpg',
    variants: createVariants(),
  },
  {
    id: '6',
    name: 'PlayStation 5',
    brand: 'Sony',
    category: 'Gaming',
    image: '/products/ps5.jpg',
    variants: createVariants(),
  },
  {
    id: '7',
    name: 'Surface Laptop 6',
    brand: 'Microsoft',
    category: 'Laptops',
    image: '/products/surface.jpg',
    variants: createVariants(),
  },
  {
    id: '8',
    name: 'AirPods Pro',
    brand: 'Apple',
    category: 'Audio',
    image: '/products/airpods.jpg',
    variants: createVariants(),
  },
  {
    id: '9',
    name: 'Keychron K8',
    brand: 'Keychron',
    category: 'Keyboards',
    image: '/products/keyboard.jpg',
    variants: createVariants(),
  },
];