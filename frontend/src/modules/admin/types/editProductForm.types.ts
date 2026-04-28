import { CreateVariantForm } from "../createProduct/stepper/types/fromProps.types";

export type EditProductForm = {
  name: string;
  slug: string;
  description: string;
  brand: { id: string; name: string };
  category: { id: string; name: string };
  images: string[];
  variants: CreateVariantForm[];
};

export type SetEditFormFn = React.Dispatch<React.SetStateAction<EditProductForm | null>>;

export type WithVariants = { variants: CreateVariantForm[] };

export type SetFormWithVariants<T extends WithVariants> =
  React.Dispatch<React.SetStateAction<T | null>> |
  React.Dispatch<React.SetStateAction<T>>;