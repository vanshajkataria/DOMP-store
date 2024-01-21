
import React, { useEffect } from "react";

interface CartItem {
  product: string;
  quantity: number;
}

interface Product {
  id: number;
  name: string;
  price: number;
}

interface CartOverlayProps {
  cart: CartItem[];
  products: Product[];
  onClose: () => void;
  onRemoveFromCart: (product: string) => void;
  onBuyNow: () => void;
}

const CartOverlay: React.FC<CartOverlayProps> = ({
  cart,
  products,
  onClose,
  onRemoveFromCart,
  onBuyNow,
}) => {
  // Function to close the cart when clicking outside
const closeCartOnOutsideClick = (event: MouseEvent) => {
  if (!document.getElementById("cart-overlay")?.contains(event.target as Node)) {
    onClose();
  }
};

useEffect(() => {
  // Add a click event listener to the document
  document.addEventListener("mousedown", closeCartOnOutsideClick);

  // Remove the event listener when the component unmounts
  return () => {
    document.removeEventListener("mousedown", closeCartOnOutsideClick);
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [onClose]);
  return (
    <div className="fixed top-0 right-0 w-1/3 h-full flex flex-col bg-white/80 backdrop-blur-lg shadow-lg z-10 text-black">
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-2xl">Your Cart</h2>
        <button onClick={onClose}>
          <span className="material-symbols-outlined ">close</span>
        </button>
      </div>
      <ul className="p-4 flex-1 overflow-y-auto text-lg">
        {cart.map((cartItem) => {
          const product = products.find(
            (product) => product.name === cartItem.product
          );
          if (product) {
            return (
              <li key={product.id} className="mb-2 flex justify-between">
                <div>
                  <p className="text-2xl">{product.name}</p>
                  <p className="text-sm text-gray-600">(Quantity: {cartItem.quantity})</p>
                </div>
                <button
                  onClick={() => onRemoveFromCart(product.name)}
                  className="bg-transparent border-none cursor-pointer ml-2"
                >
                  <span className="material-symbols-outlined text-red-600">delete</span>
                </button>
              </li>
            );
          } else {
            return null;
          }
        })}
      </ul>
      <button onClick={onBuyNow} className="bg-orange-400 text-white p-2">
        Buy Now
      </button>
    </div>
  );
};

export default CartOverlay;
