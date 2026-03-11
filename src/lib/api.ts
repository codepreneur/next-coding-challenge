import { Product } from "@/types/product";

const BASE_URL = "https://v0-api-endpoint-request.vercel.app/api";

export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch(`${BASE_URL}/products`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export async function fetchMoreProducts(): Promise<Product[]> {
  const res = await fetch(`${BASE_URL}/more-products`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch more products");
  return res.json();
}
