import { CatalogItem } from '../domain/entities/catalog.entity';
import { ProductForCatalog } from '../types/mapper.types';
export declare class CatalogItemMapper {
    static fromProduct(product: ProductForCatalog): CatalogItem[];
    private static mapVariantToCatalogItem;
    private static mapAttributes;
    private static mapImages;
    private static mapIsActivate;
    private static buildId;
}
