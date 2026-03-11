export type Region = "uk" | "us";

export interface Product {
  id: number;
  name: { us: string; uk: string };
  price: { usd: number; gbp: number };
  stock: number;
}

export interface LocalizedProduct {
  id: number;
  name: string;
  price: number;
  stock: number;
  currencySymbol: string;
}

export interface CartItem {
  productId: number;
  name: string;
  price: number;
  currencySymbol: string;
  quantity: number;
}
