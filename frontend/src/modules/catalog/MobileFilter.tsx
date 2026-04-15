import ElasticSlider from '@/src/shared/components/ElasticSlider';
import { FilterSection } from './components/Filtersection';
import { ToggleItem } from './components/ToggleItem';
import { useState } from 'react';
import { ProductCondition } from '@/src/shared/types/product-condition.enum';
import { AttributeMap, FilterOption } from './types/filter.type';

const mockAttributes: AttributeMap = {
  RAM: [
    { label: '8GB', value: '8' },
    { label: '16GB', value: '16' },
    { label: '32GB', value: '32' },
  ],
  SSD: [
    { label: '256GB', value: '256' },
    { label: '512GB', value: '512' },
    { label: '1TB', value: '1024' },
  ],
};

const brandId: FilterOption[] = [
  { label: 'Apple', value: 'apple' },
  { label: 'Dell', value: 'dell' },
  { label: 'HP', value: 'hp' },
];

const status: FilterOption[] = [
  { label: 'Nuevo', value: ProductCondition.NEW },
  { label: 'Reacondicionado', value: ProductCondition.REFURBISHED },
];

export default function MobileFilters() {
  const [selectedFilters, setSelectedFilters] = useState<{
    brandId: string[];
    condition: ProductCondition[];
    attributes: Record<string, string[]>;
    minPrice: number;
    maxPrice: number;
  }>({
    brandId: [],
    condition: [],
    attributes: {},
    minPrice: 0,
    maxPrice: 10000000,
  });

  const [price, setPrice] = useState(5000000);

  function toggleValue<T>(list: T[], value: T): T[] {
    return list.includes(value)
      ? list.filter((v) => v !== value)
      : [...list, value];
  }
  return (
    <div className="flex flex-col gap-3">
      <FilterSection title="Marca">
        {brandId.map((b) => (
          <ToggleItem
            key={b.value}
            label={b.label}
            value={b.value}
            selectedValues={selectedFilters.brandId}
            onChange={(value) =>
              setSelectedFilters((prev) => ({
                ...prev,
                brandId: toggleValue(prev.brandId, value),
              }))
            }
          />
        ))}
      </FilterSection>

      <FilterSection title="Estado">
        {status.map((s) => (
          <ToggleItem
            key={s.value}
            label={s.label}
            value={s.value}
            selectedValues={selectedFilters.condition}
            onChange={(value) =>
              setSelectedFilters((prev) => ({
                ...prev,
                condition: toggleValue(
                  prev.condition,
                  value as ProductCondition,
                ),
              }))
            }
          />
        ))}
      </FilterSection>

      <FilterSection title="Precio">
        <div className="flex flex-col items-center gap-4 w-full px-2">
            <ElasticSlider
              defaultValue={price}
              startingValue={0}
              maxValue={10000000}
              isStepped
              stepSize={500000}
              leftIcon={<span className="text-xs text-gray-400">$0</span>}
              rightIcon={<span className="text-xs text-gray-400">$10M</span>}
              className="w-[75%]"
            />
          </div>
      </FilterSection>

      {Object.entries(mockAttributes).map(([attr, values]) => (
        <FilterSection key={attr} title={attr}>
          {values.map((v) => (
            <ToggleItem
              key={v.value}
              label={v.label}
              value={v.value}
              selectedValues={selectedFilters.attributes[attr] || []}
              onChange={(value) =>
                setSelectedFilters((prev) => ({
                  ...prev,
                  attributes: {
                    ...prev.attributes,
                    [attr]: toggleValue(prev.attributes[attr] || [], value),
                  },
                }))
              }
            />
          ))}
        </FilterSection>
      ))}
    </div>
  );
}
