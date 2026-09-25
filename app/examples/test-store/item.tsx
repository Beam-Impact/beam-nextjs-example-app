import React from "react";
import { ProductImage } from "@/app/common/storefront";
import { Product } from "@/app/types";

const Item = ({
  product,
  onAddToCart,
}: {
  product: Product;
  onAddToCart: (product: Product) => void;
}) => {
  return (
    <li className="flex flex-col">
      <ProductImage
        gradient={product.gradient}
        label={`${product.name} in ${product.variant}`}
        className="mb-3 aspect-[4/5] rounded-lg"
      />
      <h2 className="font-bold">{product.name}</h2>
      <p className="mb-1 text-sm text-gray-500">{product.variant}</p>
      <p className="mb-3">${product.price.toFixed(2)}</p>
      <button
        type="button"
        className="mt-auto rounded border border-neutral-800 bg-white p-2.5 font-bold hover:bg-neutral-800 hover:text-white"
        onClick={() => onAddToCart(product)}
        aria-label={`Add ${product.name} to cart`}
      >
        Add to cart
      </button>
    </li>
  );
};

export default Item;
