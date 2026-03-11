'use client';

import { useCart } from '@/context/CartContext';
import { LocalizedProduct } from '@/types/product';
import styles from '@/app/[region]/page.module.css';
import ProductCard from './ProductCard';

interface MoreProductsGridProps {
  products: LocalizedProduct[];
}

export default function MoreProductsGrid({ products }: MoreProductsGridProps) {
  const { addToCart } = useCart();

  return (
    <div className={styles.grid}>
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={() => addToCart(product.id, product.name, product.price, product.currencySymbol)}
        />
      ))}
    </div>
  );
}
