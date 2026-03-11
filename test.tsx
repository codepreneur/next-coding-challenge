import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CartProvider } from '@/context/CartContext';
import ProductGrid from '@/components/ProductGrid';
import { LocalizedProduct } from '@/types/product';

const mockProducts: LocalizedProduct[] = [
  { id: 1, name: 'Item 1', price: 9.99, stock: 10, currencySymbol: '£' },
  { id: 2, name: 'Item 2', price: 19.99, stock: 5, currencySymbol: '£' },
  { id: 3, name: 'Item 3', price: 29.99, stock: 0, currencySymbol: '£' },
  { id: 4, name: 'Item 4', price: 39.99, stock: 3, currencySymbol: '£' },
];

function renderWithCart(ui: React.ReactElement) {
  return render(<CartProvider>{ui}</CartProvider>);
}

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useParams: () => ({ region: 'uk' }),
}));

// Mock next/link
jest.mock('next/link', () => {
  return ({ children, href, ...props }: any) => (
    <a href={href} {...props}>{children}</a>
  );
});

describe('ProductGrid', () => {
  it('renders an empty basket', () => {
    renderWithCart(<ProductGrid products={mockProducts} region="uk" />);

    const basketLink = screen.getByText(/Basket:/i);
    expect(basketLink).toHaveTextContent('Basket: 0 items');
  });

  it('renders a basket with 1 item', async () => {
    const user = userEvent.setup();
    renderWithCart(<ProductGrid products={mockProducts} region="uk" />);

    const buttons = screen.getAllByRole('button', {
      name: /Add to basket/i,
    });

    await user.click(buttons[0]);

    const basketLink = screen.getByText(/Basket:/i);
    expect(basketLink).toHaveTextContent(/Basket: 1 item$/);
  });

  it('renders a basket with 1 of item 1 and 2 of item 2', async () => {
    const user = userEvent.setup();
    renderWithCart(<ProductGrid products={mockProducts} region="uk" />);

    const buttons = screen.getAllByRole('button', {
      name: /Add to basket/i,
    });

    await user.click(buttons[0]);
    await user.click(buttons[1]);
    await user.click(buttons[1]);

    const basketLink = screen.getByText(/Basket:/i);
    expect(basketLink).toHaveTextContent(/Basket: 3 items$/);
  });

  it('displays product prices with currency symbol', () => {
    renderWithCart(<ProductGrid products={mockProducts} region="uk" />);

    expect(screen.getByText('£9.99')).toBeInTheDocument();
    expect(screen.getByText('£19.99')).toBeInTheDocument();
  });

  it('disables out of stock products', () => {
    renderWithCart(<ProductGrid products={mockProducts} region="uk" />);

    const buttons = screen.getAllByRole('button', {
      name: /Add to basket/i,
    });

    // Item 3 has stock: 0
    expect(buttons[2]).toBeDisabled();
  });
});
