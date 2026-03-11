'use client';

import { useCart } from '@/context/CartContext';
import { LocalizedProduct } from '@/types/product';
import { Region } from '@/types/product';
import styles from '@/app/[region]/page.module.css';
import Link from 'next/link';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: LocalizedProduct[];
  region: Region;
}

export default function ProductGrid({ products, region }: ProductGridProps) {
  const { totalItems, addToCart } = useCart();

  return (
    <>
      <div className={styles.description}>
        <p>Michael&apos;s Amazing Web Store</p>
        <div>
          <Link href={`/${region}/checkout`} className={styles.basket}>
            Basket: {totalItems} {totalItems === 1 ? 'item' : 'items'}
          </Link>
        </div>
      </div>

      <div className={styles.grid}>
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={() => addToCart(product.id, product.name, product.price, product.currencySymbol)}
          />
        ))}
      </div>
    </>
  );
}
