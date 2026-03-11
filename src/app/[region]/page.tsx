import { Suspense } from 'react';
import { fetchProducts } from '@/lib/api';
import { getLocalizedProduct } from '@/lib/region';
import { Region, Product } from '@/types/product';
import ProductGrid from '@/components/ProductGrid';
import MoreProducts from '@/components/MoreProducts';
import styles from './page.module.css';

export default async function RegionPage({
  params,
}: {
  params: { region: string };
}) {
  const region = params.region as Region;

  let products: Product[] = [];
  try {
    products = await fetchProducts();
  } catch {
    // fallback to empty array
  }

  const localized = products.map(p => getLocalizedProduct(p, region));
  const existingIds = products.map(p => p.id);

  return (
    <main className={styles.main}>
      <ProductGrid products={localized} region={region} />
      <Suspense fallback={<p>Loading more products...</p>}>
        <MoreProducts region={region} existingProductIds={existingIds} />
      </Suspense>
    </main>
  );
}
