import { ProductPreview } from "@/src/shared/types/catalog.types";
import { ProductCondition } from "@/src/shared/types/product-condition.enum";

export const producPreviewData: ProductPreview[] = [
  {
    id: "1",
    slug: "dell-latitude-7420-i7-16gb",
    name: "Dell Latitude 7420",
    brandName: "Dell",
    price: 2200000,
    condition: ProductCondition.REFURBISHED,
    attributes: [
      { name: "CPU", value: "Intel Core i7" },
      { name: "RAM", value: "16GB" },
      { name: "Storage", value: "512GB SSD" }
    ],
    images: ["/products/dell-7420.png"],
    isAvailable: true
  },
  {
    id: "2",
    slug: "hp-elitebook-840-g8-i5-8gb",
    name: "HP EliteBook 840 G8",
    brandName: "HP",
    price: 1800000,
    condition: ProductCondition.REFURBISHED,
    attributes: [
      { name: "CPU", value: "Intel Core i5" },
      { name: "RAM", value: "8GB" },
      { name: "Storage", value: "256GB SSD" }
    ],
    images: ["/products/hp-elitebook.png"],
    isAvailable: true
  },
  {
    id: "3",
    slug: "lenovo-thinkpad-x1-carbon-i7",
    name: "Lenovo ThinkPad X1 Carbon",
    brandName: "Lenovo",
    price: 3200000,
    condition: ProductCondition.NEW,
    attributes: [
      { name: "CPU", value: "Intel Core i7" },
      { name: "RAM", value: "16GB" },
      { name: "Storage", value: "1TB SSD" }
    ],
    images: ["/products/thinkpad-x1.png"],
    isAvailable: true
  },
  {
    id: "4",
    slug: "asus-vivobook-ryzen5-12gb",
    name: "ASUS VivoBook 15",
    brandName: "ASUS",
    price: 1600000,
    condition: ProductCondition.NEW,
    attributes: [
      { name: "CPU", value: "Ryzen 5" },
      { name: "RAM", value: "12GB" },
      { name: "Storage", value: "512GB SSD" }
    ],
    images: ["/products/asus-vivobook.png"],
    isAvailable: true
  },
  {
    id: "5",
    slug: "acer-aspire-5-i5-8gb",
    name: "Acer Aspire 5",
    brandName: "Acer",
    price: 1400000,
    condition: ProductCondition.NEW,
    attributes: [
      { name: "CPU", value: "Intel Core i5" },
      { name: "RAM", value: "8GB" },
      { name: "Storage", value: "512GB SSD" }
    ],
    images: ["/products/acer-aspire.png"],
    isAvailable: true
  },
  {
    id: "6",
    slug: "msi-modern-14-i7-16gb",
    name: "MSI Modern 14",
    brandName: "MSI",
    price: 2500000,
    condition: ProductCondition.NEW,
    attributes: [
      { name: "CPU", value: "Intel Core i7" },
      { name: "RAM", value: "16GB" },
      { name: "Storage", value: "512GB SSD" }
    ],
    images: ["/products/msi-modern.png"],
    isAvailable: false
  }
];
