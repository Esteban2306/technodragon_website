export const formatPriceCOP = (price: number) => {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0
  }).format(price);
};

export const parseNumber = (value: string) => {
  return Number(value.replace(/\D/g, '')) || 0;
};