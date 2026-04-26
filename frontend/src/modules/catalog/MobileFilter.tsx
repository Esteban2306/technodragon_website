'use client';

import { useState } from 'react';
import ElasticSlider from '@/src/shared/components/ElasticSlider';
import { FilterSection } from './components/Filtersection';
import { ToggleItem } from './components/ToggleItem';
import { ProductCondition } from '@/src/shared/types/product-condition.enum';
import { Props } from './types/filter.type';
import { CONDITION_LABEL } from '@/src/shared/helper/conditionLabel';


const status = [
  { label: CONDITION_LABEL[ProductCondition.NEW], value: ProductCondition.NEW },
  { label: CONDITION_LABEL[ProductCondition.REFURBISHED], value: ProductCondition.REFURBISHED },
];

export default function MobileFilters({
  dynamicFilters,
  filters,
  setFilters,
}: Props) {
  const [price, setPrice] = useState(5000000);

  const safeFilters = filters ?? { page: 1, limit: 9 };

  function toggleValue<T>(list: T[] = [], value: T): T[] {
    return list.includes(value)
      ? list.filter((v) => v !== value)
      : [...list, value];
  }

  return (
    <div className="flex flex-col gap-3 p-3">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-semibold text-white">Filtros</h3>
        <button
          onClick={() =>
            setFilters({
              page: 1,
              limit: 9,
            })
          }
          className="text-xs text-red-500"
        >
          Limpiar
        </button>
      </div>

      <FilterSection title="Marca">
        {dynamicFilters?.brands.map((b) => {
          const current = filters.brandId || [];
          const realId = dynamicFilters.brandMap[b];

          return (
            <ToggleItem
              key={b}
              label={b}
              value={realId}
              selectedValues={current}
              onChange={() => {
                const next = toggleValue(current, realId);

                setFilters((prev) => ({
                  ...prev,
                  brandId: next.length ? next : undefined,
                  page: 1,
                }));
              }}
            />
          );
        })}
      </FilterSection>

      <FilterSection title="Estado">
        {status.map((s) => {
          const current = filters.condition || [];

          return (
            <ToggleItem
              key={s.value}
              label={s.label}
              value={s.value}
              selectedValues={current}
              onChange={() => {
                const next = toggleValue(current, s.value);

                setFilters((prev) => ({
                  ...prev,
                  condition: next.length ? next : undefined,
                  page: 1,
                }));
              }}
            />
          );
        })}
      </FilterSection>

      <FilterSection title="Precio">
        <div className="flex flex-col items-center gap-4 w-full px-2">
          <ElasticSlider
            defaultValue={price}
            startingValue={0}
            maxValue={10000000}
            isStepped
            stepSize={500000}
            onChange={(value: number) => {
              setPrice(value);

              setFilters((prev) => ({
                ...prev,
                minPrice: 0,
                maxPrice: value,
                page: 1,
              }));
            }}
            leftIcon={<span className="text-xs text-gray-400">$0</span>}
            rightIcon={<span className="text-xs text-gray-400">$10M</span>}
            className="w-[75%]"
          />
        </div>
      </FilterSection>

      {dynamicFilters?.attributes &&
        Object.entries(dynamicFilters.attributes).map(([attr, values]) => {
          const currentAttrValues = filters.attributes?.[attr] || [];

          return (
            <FilterSection key={attr} title={attr}>
              {values.map((v) => (
                <ToggleItem
                  key={v}
                  label={v}
                  value={v}
                  selectedValues={currentAttrValues}
                  onChange={() => {
                    const next = toggleValue(currentAttrValues, v);

                    setFilters((prev) => {
                      const newAttributes = {
                        ...(prev.attributes || {}),
                        [attr]: next,
                      };

                      if (next.length === 0) {
                        delete newAttributes[attr];
                      }

                      return {
                        ...prev,
                        attributes:
                          Object.keys(newAttributes).length > 0
                            ? newAttributes
                            : undefined,
                        page: 1,
                      };
                    });
                  }}
                />
              ))}
            </FilterSection>
          );
        })}
    </div>
  );
}
