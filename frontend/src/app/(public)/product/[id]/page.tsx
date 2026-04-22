'use client'

import { useParams } from 'next/navigation'
import ProductDetailView from '@/src/modules/product/ ProductDetailView'
import { useProduct } from '@/src/modules/admin/hooks/useProducts'
import { EmptyState } from '@/src/shared/components/ui/EmptyState/ErrorState'

export default function ProductPage() {
  const params = useParams()
  const id = params?.id as string

  const { data, isLoading, isError } = useProduct(id)

  if (isLoading) {
    return (
      <div className="container py-10">
        <p className="text-muted-foreground">Cargando producto...</p>
      </div>
    )
  }

  if (isError || !data) {
    return (
      <EmptyState
        title="Producto no encontrado"
        description="No pudimos cargar la información del producto."
      />
    )
  }

  return <ProductDetailView product={data} />
}