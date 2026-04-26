import { CreateVariantForm, Props } from "../../createProduct/stepper/types/fromProps.types";
import VariantCard from "./VariantCard";

type VariantListProps = {
  variants: CreateVariantForm[];
  setForm: Props['setForm'];
};

export default function VariantList({ variants, setForm }: VariantListProps) {
  return (
    <div className="space-y-4">
      {variants.map((variant, i) => (
        <VariantCard
          key={variant.id}
          variant={variant}
          index={i}
          setForm={setForm}
        />
      ))}
    </div>
  );
}