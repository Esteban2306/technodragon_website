import { CreateVariantForm } from '../../createProduct/stepper/types/fromProps.types';
import { WithVariants, SetFormWithVariants, EditProductForm } from '../../types/editProductForm.types';
import VariantCard from './VariantCard';

type VariantListProps<T extends WithVariants> = {
  variants: CreateVariantForm[];
  setForm: SetFormWithVariants<T>;
};

export default function VariantList<T extends WithVariants>({ variants, setForm }: VariantListProps<T>) {
  return (
    <div className="space-y-4">
      {variants.map((variant, i) => (
        <VariantCard
          key={variant.id}
          variant={variant}
          index={i}
          setForm={setForm as React.Dispatch<React.SetStateAction<EditProductForm | null>>}
        />
      ))}
    </div>
  );
}