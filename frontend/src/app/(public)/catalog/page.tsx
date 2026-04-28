import CatalogPage from '@/src/modules/catalog/CatalogPage';

export default function Catalog({
  searchParams,
}: {
  searchParams: { categoryId?: string };
}) {
  return (
    <>
      <CatalogPage initialCategoryId={searchParams.categoryId} />
    </>
  );
}
