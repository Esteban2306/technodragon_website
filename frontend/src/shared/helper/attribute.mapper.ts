import { CatalogAttribute } from "@/src/shared/types/catalog.types";

export function mapAttributesToArray(
  attributes: Record<string, string[]>
): CatalogAttribute[] {
  const result: CatalogAttribute[] = [];

  for (const key in attributes) {
    const values = attributes[key];

    for (const value of values) {
      result.push({
        name: key,
        value,
      });
    }
  }

  return result;
}