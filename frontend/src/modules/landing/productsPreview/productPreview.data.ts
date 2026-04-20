import { ProductPreview } from "@/src/shared/types/catalog.types";
import { ProductCondition } from "@/src/shared/types/product-condition.enum";

export const producPreviewData: ProductPreview[] = [
  {
    id: "1",
    slug: "dell-latitude-7420-i7",
    name: "Dell Latitude 7420",
    brandName: "Dell",
    condition: ProductCondition.REFURBISHED,
    images: ["/products/dell-7420.png"],
    isAvailable: true,

    attributes: [
      { name: "CPU", value: "Intel Core i7" },
      { name: "Linea", value: "Latitude" }
    ],

    variants: [
      {
        id: "1-16-512",
        price: 2200000,
        stock: 5,
        image: "/products/dell-7420.png",
        attributes: [
          { name: "RAM", value: "16GB" },
          { name: "Storage", value: "512GB SSD" }
        ]
      },
      {
        id: "1-32-1tb",
        price: 2600000,
        stock: 2,
        image: "/products/dell-7420.png",
        attributes: [
          { name: "RAM", value: "32GB" },
          { name: "Storage", value: "1TB SSD" }
        ]
      }
    ]
  },

  {
    id: "2",
    slug: "hp-elitebook-840-g8",
    name: "HP EliteBook 840 G8",
    brandName: "HP",
    condition: ProductCondition.REFURBISHED,
    images: ["/products/hp-elitebook.png"],
    isAvailable: true,

    attributes: [
      { name: "CPU", value: "Intel Core i5" },
      { name: "Linea", value: "EliteBook" }
    ],

    variants: [
      {
        id: "2-8-256",
        price: 1800000,
        stock: 10,
        image: "/products/hp-elitebook.png",
        attributes: [
          { name: "RAM", value: "8GB" },
          { name: "Storage", value: "256GB SSD" }
        ]
      },
      {
        id: "2-16-512",
        price: 2100000,
        stock: 6,
        image: "/products/hp-elitebook.png",
        attributes: [
          { name: "RAM", value: "16GB" },
          { name: "Storage", value: "512GB SSD" }
        ]
      }
    ]
  },

  {
    id: "3",
    slug: "lenovo-thinkpad-x1-carbon",
    name: "Lenovo ThinkPad X1 Carbon",
    brandName: "Lenovo",
    condition: ProductCondition.NEW,
    images: ["/products/thinkpad-x1.png"],
    isAvailable: true,

    attributes: [
      { name: "CPU", value: "Intel Core i7" },
      { name: "Linea", value: "ThinkPad" }
    ],

    variants: [
      {
        id: "3-16-1tb",
        price: 3200000,
        stock: 4,
        image: "/products/thinkpad-x1.png",
        attributes: [
          { name: "RAM", value: "16GB" },
          { name: "Storage", value: "1TB SSD" }
        ]
      }
    ]
  },

  {
    id: "4",
    slug: "asus-vivobook-15",
    name: "ASUS VivoBook 15",
    brandName: "ASUS",
    condition: ProductCondition.NEW,
    images: ["/products/asus-vivobook.png"],
    isAvailable: true,

    attributes: [
      { name: "CPU", value: "Ryzen 5" },
      { name: "Linea", value: "VivoBook" }
    ],

    variants: [
      {
        id: "4-12-512",
        price: 1600000,
        stock: 8,
        image: "/products/asus-vivobook.png",
        attributes: [
          { name: "RAM", value: "12GB" },
          { name: "Storage", value: "512GB SSD" }
        ]
      }
    ]
  },

  {
    id: "5",
    slug: "acer-aspire-5",
    name: "Acer Aspire 5",
    brandName: "Acer",
    condition: ProductCondition.NEW,
    images: ["/products/acer-aspire.png"],
    isAvailable: true,

    attributes: [
      { name: "CPU", value: "Intel Core i5" },
      { name: "Linea", value: "Aspire" }
    ],

    variants: [
      {
        id: "5-8-512",
        price: 1400000,
        stock: 12,
        image: "/products/acer-aspire.png",
        attributes: [
          { name: "RAM", value: "8GB" },
          { name: "Storage", value: "512GB SSD" }
        ]
      }
    ]
  },

  {
    id: "6",
    slug: "msi-modern-14",
    name: "MSI Modern 14",
    brandName: "MSI",
    condition: ProductCondition.NEW,
    images: ["/products/msi-modern.png"],
    isAvailable: false,

    attributes: [
      { name: "CPU", value: "Intel Core i7" },
      { name: "Linea", value: "Modern" }
    ],

    variants: [
      {
        id: "6-16-512",
        price: 2500000,
        stock: 0,
        image: "/products/msi-modern.png",
        attributes: [
          { name: "RAM", value: "16GB" },
          { name: "Storage", value: "512GB SSD" }
        ]
      }
    ]
  }
];