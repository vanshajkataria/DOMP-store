import React from "react";
import Image, { StaticImageData } from "next/image";

interface Product {
  id: number;
  name: string;
  price: number;
  alt: string;
  src: StaticImageData;
}

interface ProductListProps {
  products: Product[];
  onAddToCart: (product: string) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onAddToCart }) => {
  return (
    <div className="container mx-auto">
      <h2 className="text-3xl font-bold p-4">Products</h2>
      <div className="container mx-auto px-8">
        <ul className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <li key={product.id} className="grid mx-auto text-center">
              <Image
                alt={product.alt}
                src={product.src}
                width={250}
                height={250}
              />
              <p className="text-xl max-md:text-center">{product.name}</p>
              <p className="text-sm pb-2">Price: ₹{product.price}</p>
              <button
                className="w-fit mx-auto px-2 rounded-lg border-2 bg-orange-400 border-orange-400 hover:bg-transparent hover:text-orange-400 duration-300 ease-in-out"
                onClick={() => onAddToCart(product.name)}
              >
                Add to Cart
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductList;
