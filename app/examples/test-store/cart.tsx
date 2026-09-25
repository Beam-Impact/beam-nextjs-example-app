import React, { type ReactNode } from "react";
import { ProductImage, QuantityInput, Totals } from "@/app/common/storefront";
import { CartItem } from "@/app/types";

const FREE_SHIPPING_THRESHOLD = 75;

interface CartProps {
  cartItems: CartItem[];
  isOpen: boolean;
  onClose: () => void;
  onQuantityChange: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
  /** Rendered below the line items, e.g. the Beam nonprofit selector */
  children?: ReactNode;
}

// Slide-out cart drawer. Stays mounted while closed so the Beam widget keeps its state.
const Cart: React.FC<CartProps> = ({
  cartItems,
  isOpen,
  onClose,
  onQuantityChange,
  onRemove,
  children,
}) => {
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const toFreeShipping = FREE_SHIPPING_THRESHOLD - subtotal;

  return (
    <>
      <div
        className={`fixed inset-0 z-10 bg-black/40 transition-opacity ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
        aria-hidden={!isOpen}
        className={`fixed inset-y-0 right-0 z-20 flex w-full max-w-[420px] flex-col bg-white shadow-xl transition-[transform,visibility] duration-300 ${
          isOpen ? "visible translate-x-0" : "invisible translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-gray-300 px-5 py-4">
          <h2 id="cart-title" className="text-xl font-bold">
            Your cart
          </h2>
          <button
            type="button"
            className="h-8 w-8 text-2xl"
            aria-label="Close cart"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5">
          {cartItems.length === 0 ? (
            <div className="py-16 text-center">
              <p className="mb-4 text-gray-600">Your cart is empty.</p>
              <button
                type="button"
                className="rounded bg-neutral-800 px-5 py-3 font-bold text-white"
                onClick={onClose}
              >
                Continue shopping
              </button>
            </div>
          ) : (
            <>
              <p className="py-4 text-sm">
                {toFreeShipping > 0 ? (
                  <>
                    You&apos;re <strong>${toFreeShipping.toFixed(2)}</strong>{" "}
                    away from free shipping
                  </>
                ) : (
                  <>You&apos;ve unlocked free shipping!</>
                )}
                <span className="mt-2 block h-1.5 overflow-hidden rounded-full bg-gray-200">
                  <span
                    className="block h-full bg-green-700"
                    style={{
                      width: `${Math.min(
                        100,
                        (subtotal / FREE_SHIPPING_THRESHOLD) * 100,
                      )}%`,
                    }}
                  />
                </span>
              </p>
              <ul
                className="border-t border-gray-300"
                aria-label="Items in your cart"
              >
                {cartItems.map((item) => (
                  <li
                    key={item.id}
                    className="grid grid-cols-[64px_minmax(0,1fr)_auto] gap-3 border-b border-gray-300 py-4"
                  >
                    <ProductImage
                      gradient={item.gradient}
                      label={`${item.name} in ${item.variant}`}
                      className="h-16 w-16 rounded-md"
                    />
                    <div>
                      <p className="mb-1 font-bold">{item.name}</p>
                      <p className="mb-2.5 text-sm text-gray-500">
                        {item.variant}
                      </p>
                      <div className="flex items-center gap-3">
                        <QuantityInput
                          value={item.quantity}
                          onChange={(quantity) =>
                            onQuantityChange(item.id, quantity)
                          }
                          label={`quantity of ${item.name}`}
                          size="sm"
                        />
                        <button
                          type="button"
                          className="text-sm text-gray-600 underline"
                          aria-label={`Remove ${item.name}`}
                          onClick={() => onRemove(item.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                    <p className="text-right font-bold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </li>
                ))}
              </ul>
            </>
          )}
          {/* Hidden rather than unmounted when the cart is empty */}
          <div className={`my-6 ${cartItems.length === 0 ? "hidden" : ""}`}>
            {children}
          </div>
        </div>

        {cartItems.length > 0 && (
          <div className="border-t border-gray-300 px-5 py-4">
            <div className="mb-4">
              <Totals
                rows={[
                  [
                    "Shipping",
                    toFreeShipping > 0 ? "Calculated at checkout" : "Free",
                  ],
                  ["Subtotal", `$${subtotal.toFixed(2)} USD`],
                ]}
              />
            </div>
            <button
              type="button"
              className="w-full rounded bg-neutral-800 p-3.5 font-bold text-white"
            >
              Check out
            </button>
            <p className="mt-3 text-center text-xs text-gray-500">
              Taxes and discounts calculated at checkout
            </p>
          </div>
        )}
      </aside>
    </>
  );
};

export default Cart;
