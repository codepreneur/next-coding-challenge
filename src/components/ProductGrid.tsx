'use client';

import { useCart } from '@/context/CartContext';
import { LocalizedProduct } from '@/types/product';
import { Region } from '@/types/product';
import styles from '@/app/[region]/page.module.css';
import Link from 'next/link';

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
          <button
            key={product.id}
            className={styles.card}
            onClick={() => addToCart(product.id, product.name, product.price)}
            aria-label="Add to basket"
            disabled={product.stock === 0}
          >
            <h2>
              {product.name} <span>-&gt;</span>
            </h2>
            <p>
              {product.currencySymbol}
              {product.price.toFixed(2)}
              {product.stock === 0 && ' (Out of stock)'}
            </p>
          </button>
        ))}
      </div>
    </>
  );
}
