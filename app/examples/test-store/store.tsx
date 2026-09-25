"use client";
import Item from "@/app/examples/test-store/item";
import { CartItem, Product } from "@/app/types";
import { useEffect, useState } from "react";
import Cart from "@/app/examples/test-store/cart";
import { updateCart } from "@beamimpact/web-sdk/dist/integrations/cart";
import { useBeam } from "@/app/common/beamContext";
import { DemoNote } from "@/app/common/storefront";
import dynamic from "next/dynamic";
import Link from "next/link";

const BeamSelectNonprofit = dynamic(
  () => import("@beamimpact/web-sdk/dist/react/select-nonprofit"),
  { ssr: false },
);

const products: Product[] = [
  {
    id: "trailhead-fleece-sage",
    name: "Trailhead Fleece Jacket",
    variant: "Sage",
    price: 89,
    gradient: "linear-gradient(135deg, #d9e4dd 0%, #a7c4b5 100%)",
  },
  {
    id: "merino-socks-oatmeal",
    name: "Merino Trail Socks",
    variant: "Oatmeal",
    price: 18,
    gradient: "linear-gradient(135deg, #e9e2d6 0%, #c9b79a 100%)",
  },
  {
    id: "ridge-beanie-rust",
    name: "Ridge Rib Beanie",
    variant: "Rust",
    price: 28,
    gradient: "linear-gradient(135deg, #f0d9c8 0%, #c47a4e 100%)",
  },
  {
    id: "summit-daypack-charcoal",
    name: "Summit 22L Daypack",
    variant: "Charcoal",
    price: 110,
    gradient: "linear-gradient(135deg, #d6d8db 0%, #6b7178 100%)",
  },
  {
    id: "canyon-flannel-navy",
    name: "Canyon Flannel Shirt",
    variant: "Navy Plaid",
    price: 64,
    gradient: "linear-gradient(135deg, #d3dbe8 0%, #5a6f93 100%)",
  },
  {
    id: "insulated-bottle-sand",
    name: "Insulated Trail Bottle",
    variant: "Sand · 24 oz",
    price: 32,
    gradient: "linear-gradient(135deg, #efe6d6 0%, #b9a27c 100%)",
  },
];

const filters = ["All", "Outerwear", "Accessories", "Packs"];

function loadCart(): CartItem[] {
  try {
    const stored: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");
    // Drop entries saved in an older cart format
    return stored.filter(
      (item) => typeof item.id === "string" && typeof item.price === "number",
    );
  } catch {
    return [];
  }
}

export default function Store() {
  const beamConfig = useBeam();
  // Stable for the life of the page, so every update goes to the same Beam cart
  const [cartId] = useState(() => crypto.randomUUID());
  // This component only renders client-side (ssr: false), so localStorage is available
  const [cart, setCart] = useState<CartItem[]>(loadCart);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Persist the cart and keep Beam in sync whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart(beamConfig, {
      cartId,
      currencyCode: "USD",
      itemCount,
      subtotal: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
      schema: { source: "generic" },
      content: {
        items: cart.map((item) => ({
          remoteProductIdentifier: item.id,
          localAmount: item.price * item.quantity,
        })),
      },
    });
  }, [beamConfig, cartId, cart, itemCount]);

  const addToCart = (product: Product) => {
    setCart((prevCart) =>
      prevCart.some((item) => item.id === product.id)
        ? prevCart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          )
        : [...prevCart, { ...product, quantity: 1 }],
    );
    setIsCartOpen(true);
  };

  const changeQuantity = (id: string, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) => (item.id === id ? { ...item, quantity } : item)),
    );
  };

  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  return (
    <div className="max-w-[1000px]">
      <DemoNote>
        Demo: mock storefront collection page with a working cart drawer. The
        cart is saved in localStorage and sent to Beam on every change.
      </DemoNote>

      <p className="mb-4 rounded bg-[#2f4a3d] px-4 py-2 text-center text-sm text-white">
        Free shipping on orders over $75 · 1% of every order goes to a nonprofit
        you choose
      </p>

      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-300 pb-4">
        <span className="text-xl font-bold tracking-wide">
          Ridgeline Outfitters
        </span>
        <nav className="flex flex-wrap gap-5 text-sm" aria-label="Main">
          <a
            href="#"
            aria-current="page"
            className="font-bold underline underline-offset-4"
          >
            Shop all
          </a>
          <a href="#" className="text-gray-700">
            New arrivals
          </a>
          <Link href="/widgets/community-impact" className="text-gray-700">
            Our impact
          </Link>
        </nav>
        <button
          type="button"
          className="relative rounded border border-neutral-800 px-3 py-1.5 text-sm font-bold"
          onClick={() => setIsCartOpen(true)}
          aria-label={`Open cart, ${itemCount} ${
            itemCount === 1 ? "item" : "items"
          }`}
        >
          Cart
          <span className="ml-2 inline-block min-w-[20px] rounded-full bg-neutral-800 px-1.5 text-center text-xs leading-5 text-white">
            {itemCount}
          </span>
        </button>
      </header>

      <main>
        <div className="mb-6 mt-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="mb-1 text-3xl font-bold">Shop all</h1>
            <p className="text-gray-600">
              Gear for the trail, made to last. {products.length} products
            </p>
          </div>
          <div
            className="flex flex-wrap gap-2"
            role="group"
            aria-label="Filter products"
          >
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                aria-pressed={filter === "All"}
                className={`rounded-full border px-3 py-1 text-sm ${
                  filter === "All"
                    ? "border-neutral-800 bg-neutral-800 text-white"
                    : "border-gray-400"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <ul className="grid grid-cols-2 gap-x-5 gap-y-8 md:grid-cols-3">
          {products.map((product) => (
            <Item key={product.id} product={product} onAddToCart={addToCart} />
          ))}
        </ul>
      </main>

      <Cart
        cartItems={cart}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onQuantityChange={changeQuantity}
        onRemove={removeFromCart}
      >
        <BeamSelectNonprofit {...beamConfig} />
      </Cart>
    </div>
  );
}
