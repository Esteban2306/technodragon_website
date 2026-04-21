import { ProductCondition } from '@/src/shared/types/product-condition.enum';

export const CONDITION_LABEL: Record<ProductCondition, string> = {
  [ProductCondition.NEW]: 'Nuevo',
  [ProductCondition.REFURBISHED]: 'Reacondicionado',
};