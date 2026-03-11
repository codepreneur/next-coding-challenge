'use client';

import { LocalizedProduct } from '@/types/product';
import styles from '@/app/[region]/page.module.css';

interface ProductCardProps {
  product: LocalizedProduct;
  onAddToCart: () => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <button
      className={styles.card}
      onClick={onAddToCart}
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
  );
}
