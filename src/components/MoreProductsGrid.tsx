'use client';

import { useCart } from '@/context/CartContext';
import { LocalizedProduct } from '@/types/product';
import styles from '@/app/[region]/page.module.css';

interface MoreProductsGridProps {
  products: LocalizedProduct[];
}

export default function MoreProductsGrid({ products }: MoreProductsGridProps) {
  const { addToCart } = useCart();

  return (
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
  );
}
