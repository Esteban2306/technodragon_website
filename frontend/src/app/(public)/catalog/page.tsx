import CatalogPage from '@/src/modules/catalog/CatalogPage';
import { Suspense } from 'react';

export default function Catalog({
  searchParams,
}: {
  searchParams: { categoryId?: string };
}) {
  return (
    <>
      <Suspense>
        <CatalogPage initialCategoryId={searchParams.categoryId} />
      </Suspense>
    </>
  );
}
