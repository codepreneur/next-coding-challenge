'use client';

import { useCart } from '@/context/CartContext';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import styles from '../page.module.css';

export default function CheckoutPage() {
  const { items, totalItems, totalPrice } = useCart();
  const params = useParams();
  const region = params.region as string;

  const currencySymbol = items.length > 0 ? items[0].currencySymbol : '';

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>Checkout</p>
        <div>
          <Link href={`/${region}`} className={styles.basket}>
            Back to shopping
          </Link>
        </div>
      </div>

      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className={styles.checkoutList}>
          <table className={styles.checkoutTable}>
            <thead>
              <tr>
                <th>Item</th>
                <th>Unit Price</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item.productId}>
                  <td>{item.name}</td>
                  <td>{item.currencySymbol}{item.price.toFixed(2)}</td>
                  <td>{item.quantity}</td>
                  <td>{item.currencySymbol}{(item.price * item.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className={styles.checkoutSummary}>
            <p>
              Total: {totalItems} {totalItems === 1 ? 'item' : 'items'} &mdash;{' '}
              {currencySymbol}{totalPrice.toFixed(2)}
            </p>
          </div>
        </div>
      )}
    </main>
  );
}
