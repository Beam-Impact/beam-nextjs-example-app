"use client";
import Item from "@/app/examples/test-store/item";
import { ItemType, Items } from "@/app/types";
import { useEffect, useState, CSSProperties } from "react";
import Cart from "@/app/examples/test-store/cart";

export default function Store() {
  const gridContainerStyle: CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, 300px)",
    gap: "10px",
    justifyContent: "center",
  };

  const gridItemStyle: CSSProperties = {
    padding: "10px",
  };

  const [cart, setCart] = useState<ItemType[]>([]);

  const addToCart = (item: ItemType) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (cartItem) => cartItem.itemName === item.itemName,
      );
      if (existingItemIndex !== -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += item.quantity;
        return updatedCart;
      } else {
        return [...prevCart, { ...item, quantity: item.quantity }];
      }
    });
    const updatedCart = [...cart, item];
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeFromCart = (item: ItemType) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (cartItem) => cartItem.itemName === item.itemName,
      );
      if (existingItemIndex !== -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity -= item.quantity;
        if (updatedCart[existingItemIndex].quantity <= 0) {
          updatedCart.splice(existingItemIndex, 1);
        }
        localStorage.setItem("cart", JSON.stringify(updatedCart));

        return updatedCart;
      }
      return prevCart;
    });
  };

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  const items: Items[] = [
    {
      imageUrl:
        "https://wallpapers.com/images/hd/girl-painting-in-studio-ghibli-scenery-1nntqz6tmekfnrf7.jpg",
      itemName: "Studio Ghibli: Girl Painting",
      itemPrice: "9.99",
    },
    {
      imageUrl:
        "https://images.fineartamerica.com/images/artworkimages/medium/3/studio-ghibli-porco-rosso-neha.jpg",
      itemName: "Studio Ghibli: Porco Rosso",
      itemPrice: "22.22",
    },
  ];

  return (
    <>
      <div>
        <h1>Beam Store</h1>
        <div style={gridContainerStyle}>
          {items.map((item, index) => (
            <div key={index} style={gridItemStyle}>
              <Item
                imageUrl={item.imageUrl}
                itemName={item.itemName}
                itemPrice={item.itemPrice}
                onAddToCart={addToCart}
                onRemoveFromCart={removeFromCart}
              />
            </div>
          ))}
        </div>
      </div>
      <Cart cartItems={cart} />
    </>
  );
}
