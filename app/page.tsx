"use client";
// Home.js

import Head from "next/head";
import Auth from "../components/Auth";
import ProductList from "../components/ProductList";
import CartOverlay from "../components/CartOverlay";
import DarkModeToggle from "../components/DarkModeToggle";
import { useState, useEffect } from "react";

import nft1 from "../assets/nft1.webp";
import nft2 from "../assets/nft2.webp";
import nft3 from "../assets/nft3.webp";
import nft4 from "../assets/nft4.webp";
import logo from "../assets/logo.png";
import Image from "next/image";

const products = [
  { id: 1, name: "Cool Ape", price: 100, alt: "p-1", src: nft1 },
  { id: 2, name: "Cyborg Ape", price: 125, alt: "p-2", src: nft2 },
  { id: 3, name: "Alien Ape", price: 150, alt: "p-3", src: nft3 },
  { id: 4, name: "ETH Ape", price: 175, alt: "p-4", src: nft4 },
];

export default function Home() {
  const [cart, setCart] = useState<{ product: string; quantity: number }[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    // Cart is initialized from localStorage
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  const addToCart = (product: string) => {
    // Check if the product is already in the cart
    const existingItem = cart.find((item) => item.product === product);

    if (existingItem) {
      // If it exists, update the quantity
      const updatedCart = cart.map((item) =>
        item.product === product
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCart(updatedCart);
    } else {
      // If it doesn't exist, add it with a quantity of 1
      setCart([...cart, { product, quantity: 1 }]);
    }
  };

  const removeItemFromCart = (product: string) => {
    const updatedCart = cart.filter((item) => item.product !== product);
    setCart(updatedCart);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  // Function to calculate the total item count in the cart
  const calculateTotalItemCount = () => {
    return cart.reduce((total, cartItem) => total + cartItem.quantity, 0);
  };

  return (
    <div>
      <Head>
        <title>Online Marketplace</title>
      </Head>

      <main>
        <nav className="grid md:flex justify-center md:justify-evenly container mx-auto items-center gap-4 ">
          <div>
            <Image alt="dOMP Logo" src={logo} width={200} className="mx-auto" />
          </div>
          <h1 className="text-4xl text-center p-8 font-bold">
            Welcome to the Online Marketplace
          </h1>
          <div className="flex gap-4 justify-end">
            <DarkModeToggle />
            <button onClick={toggleCart}>
              <span className="material-symbols-outlined items-center">
                local_mall
              </span>
              ({calculateTotalItemCount()}) 
            </button>
            {isCartOpen && (
              <CartOverlay
                cart={cart}
                products={products}
                onClose={toggleCart}
                onRemoveFromCart={removeItemFromCart} onBuyNow={function (): void {
                  throw new Error("Function not implemented.");
                } }              />
            )}
          </div>
        </nav>
        <Auth />
        <ProductList products={products} onAddToCart={addToCart} />
      </main>

      <footer>{/* Footer content */}</footer>
    </div>
  );
}
