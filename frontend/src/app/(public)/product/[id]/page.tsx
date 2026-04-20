import { mockProduct } from "@/src/modules/product/mock/product.mock"
import ProductDetailView from "@/src/modules/product/ ProductDetailView"
import { ProductPageProps } from "@/src/shared/types/product.types"

export default async function ProductPage({ params }: ProductPageProps) {
  //const product = await getProductById(params.id)
  const product = mockProduct

  return <ProductDetailView product={product} />
}