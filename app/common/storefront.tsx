"use client";
// Mock storefront chrome shared by the widget pages. Only the Beam components are SDK code.
import { useState, type PropsWithChildren, type ReactNode } from "react";

export type LineItem = {
  name: string;
  variant: string;
  price: string;
  originalPrice?: string;
  quantity: number;
  gradient: string;
  href?: string;
};

export const cartItems: LineItem[] = [
  {
    name: "Trailhead Fleece Jacket",
    variant: "Sage / M",
    price: "$89.00",
    originalPrice: "$110.00",
    quantity: 1,
    gradient: "linear-gradient(135deg, #d9e4dd 0%, #a7c4b5 100%)",
    href: "/widgets/product-details-page",
  },
  {
    name: "Merino Trail Socks",
    variant: "Oatmeal / L",
    price: "$36.00",
    quantity: 2,
    gradient: "linear-gradient(135deg, #e9e2d6 0%, #c9b79a 100%)",
  },
];

export function DemoNote({ children }: PropsWithChildren) {
  return (
    <p className="mb-4 rounded bg-gray-100 px-3 py-2 text-xs text-gray-600">
      {children}
    </p>
  );
}

export function StoreHeader({ name = "Ridgeline Outfitters" }) {
  return (
    <header className="mb-6 border-b border-gray-300 pb-4 text-xl font-bold tracking-wide">
      {name}
    </header>
  );
}

export function SiteHeader({ current }: { current: string }) {
  const links = ["Shop coffee", "Subscriptions", "Our impact", "About us"];
  return (
    <header className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-300 pb-4">
      <span className="text-xl font-bold tracking-wide">
        Ridgeline Roasters
      </span>
      <nav className="flex flex-wrap gap-5" aria-label="Main">
        {links.map((link) => (
          <a
            key={link}
            href="#"
            aria-current={link === current ? "page" : undefined}
            className={
              link === current
                ? "text-sm font-bold underline underline-offset-4"
                : "text-sm text-gray-700"
            }
          >
            {link}
          </a>
        ))}
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-gray-300 pt-5 text-xs text-gray-500">
      © 2026 Ridgeline Roasters · Small-batch coffee, roasted in Colorado
    </footer>
  );
}

export function ProductImage({
  gradient,
  label,
  className = "",
  children,
}: PropsWithChildren<{ gradient: string; label: string; className?: string }>) {
  return (
    <div
      className={className}
      style={{ background: gradient }}
      role="img"
      aria-label={label}
    >
      {children}
    </div>
  );
}

export function QuantityInput({
  initial = 1,
  value,
  onChange,
  label,
  size = "md",
}: {
  initial?: number;
  /** Pass `value` and `onChange` to control the quantity from outside */
  value?: number;
  onChange?: (quantity: number) => void;
  label: string;
  size?: "sm" | "md";
}) {
  const [ownQuantity, setOwnQuantity] = useState(initial);
  const quantity = value ?? ownQuantity;
  const setQuantity = (next: number) => {
    setOwnQuantity(next);
    onChange?.(next);
  };
  const buttonSize = size === "sm" ? "h-8 w-8" : "h-9 w-9 text-lg";
  return (
    <div className="inline-flex items-center rounded border border-gray-400">
      <button
        type="button"
        className={buttonSize}
        aria-label={`Decrease ${label}`}
        onClick={() => setQuantity(Math.max(1, quantity - 1))}
      >
        −
      </button>
      <input
        type="text"
        inputMode="numeric"
        className="w-10 text-center"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value) || 1)}
        aria-label={label}
      />
      <button
        type="button"
        className={buttonSize}
        aria-label={`Increase ${label}`}
        onClick={() => setQuantity(quantity + 1)}
      >
        +
      </button>
    </div>
  );
}

export function Totals({ rows }: { rows: [string, string][] }) {
  const last = rows.length - 1;
  return (
    <dl className="grid grid-cols-[1fr_auto] gap-y-2">
      {rows.map(([term, value], i) => {
        const total =
          i === last ? "border-t border-gray-300 pt-2 text-base font-bold" : "";
        return (
          <div key={term} className="contents">
            <dt className={total}>{term}</dt>
            <dd className={`pl-3 text-right ${total}`}>{value}</dd>
          </div>
        );
      })}
    </dl>
  );
}

function Card({ title, children }: PropsWithChildren<{ title: string }>) {
  return (
    <section className="mb-4 rounded-lg border border-gray-300 px-5 py-4">
      <h2 className="mb-2 font-bold">{title}</h2>
      {children}
    </section>
  );
}

/**
 * Order confirmation ("thank you") page, as rendered by most checkouts.
 * The Beam widget is passed as children and rendered below the confirmation card.
 */
export function OrderConfirmation({
  orderNumber = "2187",
  children,
}: PropsWithChildren<{ orderNumber?: string }>) {
  const customerInfo: [string, ReactNode][] = [
    ["Contact information", "jordan.lee@example.com"],
    ["Payment method", "Mastercard ending in 5100 — $135.63"],
    [
      "Shipping address",
      <>
        Jordan Lee
        <br />
        88 Aspen Way
        <br />
        Boulder, CO 80302
        <br />
        United States
      </>,
    ],
    ["Billing address", "Same as shipping address"],
    ["Shipping method", "Free standard (3–5 business days)"],
  ];

  return (
    <>
      <StoreHeader />
      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-10">
        <div>
          <div className="mb-5 flex items-center gap-3.5">
            <span
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-green-700 text-xl text-green-700"
              aria-hidden="true"
            >
              ✓
            </span>
            <div>
              <p className="text-sm text-gray-500">Order #{orderNumber}</p>
              <h1 className="mt-0.5 text-2xl font-bold">Thank you, Jordan!</h1>
            </div>
          </div>

          <Card title="Your order is confirmed">
            <p className="leading-relaxed text-gray-700">
              We&apos;ve sent a confirmation email with your receipt. We&apos;ll
              email you again with tracking details when your order ships.
            </p>
            <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm">
              <span>
                Estimated delivery: <strong>Sep 29 – Oct 1</strong>
              </span>
              <a href="#" className="font-bold underline">
                View order status
              </a>
            </div>
          </Card>

          <section className="mb-4" aria-label="Your impact">
            {children}
          </section>

          <Card title="Customer information">
            <div className="grid gap-x-6 gap-y-4 sm:grid-cols-2">
              {customerInfo.map(([heading, value]) => (
                <div key={heading} className="text-sm">
                  <h3 className="mb-1 font-bold">{heading}</h3>
                  <p className="text-gray-700">{value}</p>
                </div>
              ))}
            </div>
          </Card>

          <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
            <a href="#" className="text-sm text-gray-600 underline">
              Need help? Contact us
            </a>
            <a
              href="#"
              className="rounded bg-neutral-800 px-5 py-3.5 text-sm font-bold text-white"
            >
              Continue shopping
            </a>
          </div>
        </div>

        <section
          className="order-first rounded-lg bg-stone-100 p-5 lg:order-none"
          aria-labelledby="summary-title"
        >
          <h2 id="summary-title" className="mb-4 font-bold">
            Order summary
          </h2>
          <ul className="mb-4 flex flex-col gap-4 border-b border-gray-300 pb-4">
            {cartItems.map((item) => (
              <li
                key={item.name}
                className="grid grid-cols-[64px_minmax(0,1fr)_auto] items-center gap-3"
              >
                <ProductImage
                  gradient={item.gradient}
                  label={`${item.name}, ${item.variant}`}
                  className="relative h-16 w-16 rounded-md"
                >
                  <span
                    className="absolute -right-1.5 -top-1.5 h-5 min-w-[20px] rounded-full bg-gray-500 px-1.5 text-center text-[11px] leading-5 text-white"
                    aria-label={`Quantity ${item.quantity}`}
                  >
                    {item.quantity}
                  </span>
                </ProductImage>
                <div>
                  <p className="font-bold">{item.name}</p>
                  <p className="text-xs text-gray-500">{item.variant}</p>
                </div>
                <p>{item.price}</p>
              </li>
            ))}
          </ul>
          <Totals
            rows={[
              ["Subtotal", "$125.00"],
              ["Shipping", "Free"],
              ["Taxes", "$10.63"],
              ["Total", "$135.63 USD"],
            ]}
          />
        </section>
      </div>
    </>
  );
}
