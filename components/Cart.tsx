// components/Cart.tsx
import React, { useEffect } from 'react';

interface CartProps {
  cart: { product: string; quantity: number }[];
  onCartChange: (cart: { product: string; quantity: number }[]) => void;
}

const Cart: React.FC<CartProps> = ({ cart, onCartChange }) => {
  // Function to update the cart and store it in localStorage
  const updateCart = (newCart: { product: string; quantity: number }[]) => {
    onCartChange(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  // Use the cart from props and store it in localStorage
  useEffect(() => {
    if (cart.length === 0) {
      const storedCart = localStorage.getItem('cart');
      if (storedCart) {
        onCartChange(JSON.parse(storedCart));
      }
    }
  }, [cart, onCartChange]);

  return (
    <div>
      <h2>Shopping Cart</h2>
      <ul>
        {cart.map((item, index) => (
          <li key={index}>
            {item.product} - Quantity: {item.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;
