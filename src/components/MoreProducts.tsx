import { fetchMoreProducts } from '@/lib/api';
import { getLocalizedProduct } from '@/lib/region';
import { Region, LocalizedProduct } from '@/types/product';
import MoreProductsGrid from './MoreProductsGrid';

interface MoreProductsProps {
  region: Region;
  existingProductIds: number[];
}

export default async function MoreProducts({ region, existingProductIds }: MoreProductsProps) {
  try {
    const moreProducts = await fetchMoreProducts();

    const deduplicated = moreProducts.filter(
      p => !existingProductIds.includes(p.id)
    );

    const localized: LocalizedProduct[] = deduplicated.map(p =>
      getLocalizedProduct(p, region)
    );

    if (localized.length === 0) return null;

    return (
      <>
        <h2 style={{ marginTop: '2rem', marginBottom: '1rem' }}>More Products</h2>
        <MoreProductsGrid products={localized} />
      </>
    );
  } catch {
    return null;
  }
}
