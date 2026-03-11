import { Product, Region, LocalizedProduct } from "@/types/product";

interface RegionConfig {
  nameKey: "us" | "uk";
  priceKey: "usd" | "gbp";
  currencySymbol: string;
}

export const REGION_CONFIGS: Record<Region, RegionConfig> = {
  uk: { nameKey: "uk", priceKey: "gbp", currencySymbol: "\u00a3" },
  us: { nameKey: "us", priceKey: "usd", currencySymbol: "$" },
};

export const VALID_REGIONS: Region[] = ["uk", "us"];

export function getLocalizedProduct(
  product: Product,
  region: Region
): LocalizedProduct {
  const config = REGION_CONFIGS[region];
  return {
    id: product.id,
    name: product.name[config.nameKey],
    price: product.price[config.priceKey],
    stock: product.stock,
    currencySymbol: config.currencySymbol,
  };
}
