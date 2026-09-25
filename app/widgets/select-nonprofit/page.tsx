"use client";
import { events } from "@beamimpact/web-sdk/dist/integrations/utils";
import { useBeam } from "@/app/common/beamContext";
import {
  cartItems,
  DemoNote,
  ProductImage,
  QuantityInput,
  Totals,
} from "@/app/common/storefront";
import { useState } from "react";
import dynamic from "next/dynamic";

const BeamSelectNonprofit = dynamic(
  () => import("@beamimpact/web-sdk/dist/react/select-nonprofit"),
  {
    loading: () => null,
    ssr: false,
  },
);

export default function Widget() {
  const beamConfig = useBeam();
  // Toggles between a full cart page and a narrow slide-out cart drawer
  const [isDrawer, setIsDrawer] = useState(false);

  return (
    <div className="max-w-[1000px]">
      <DemoNote>
        Demo: mock storefront cart.
        <button
          type="button"
          className="ml-2 rounded border border-gray-400 bg-white px-2 py-0.5"
          onClick={() => setIsDrawer(!isDrawer)}
        >
          {isDrawer ? "Switch to full cart page" : "Switch to cart drawer"}
        </button>
      </DemoNote>

      <div
        role="region"
        aria-labelledby="cart-title"
        className={
          isDrawer
            ? "max-w-[420px] rounded-lg border border-gray-300 p-5 shadow-xl"
            : ""
        }
      >
        <div className="mb-4 flex items-baseline justify-between">
          <h1
            id="cart-title"
            className={`font-bold ${isDrawer ? "text-xl" : "text-2xl"}`}
          >
            Your cart
          </h1>
          {isDrawer ? (
            <button type="button" className="text-2xl" aria-label="Close cart">
              ×
            </button>
          ) : (
            <a href="#" className="text-sm text-gray-600 underline">
              Continue shopping
            </a>
          )}
        </div>

        <div
          className={`grid items-start ${
            isDrawer ? "" : "lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-10"
          }`}
        >
          <div>
            <ul
              className="border-t border-gray-300"
              aria-label="Items in your cart"
            >
              {cartItems.map((item) => (
                <li
                  key={item.name}
                  className={`grid border-b border-gray-300 py-4 ${
                    isDrawer
                      ? "grid-cols-[64px_minmax(0,1fr)_auto] gap-3"
                      : "grid-cols-[88px_minmax(0,1fr)_auto] gap-4"
                  }`}
                >
                  <ProductImage
                    gradient={item.gradient}
                    label={`${item.name}, ${item.variant}`}
                    className={`rounded-md ${
                      isDrawer ? "h-16 w-16" : "h-[88px] w-[88px]"
                    }`}
                  />
                  <div>
                    <p className="mb-1 font-bold">
                      <a href={item.href ?? "#"}>{item.name}</a>
                    </p>
                    <p className="mb-2.5 text-sm text-gray-500">
                      {item.variant}
                    </p>
                    <div className="flex items-center gap-3">
                      <QuantityInput
                        initial={item.quantity}
                        label={`quantity of ${item.name}`}
                        size="sm"
                      />
                      <button
                        type="button"
                        className="text-sm text-gray-600 underline"
                        aria-label={`Remove ${item.name}`}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <p className="text-right font-bold">
                    {item.price}
                    {item.originalPrice && (
                      <s
                        className="block text-sm font-normal text-gray-400"
                        aria-label={`Original price ${item.originalPrice}`}
                      >
                        {item.originalPrice}
                      </s>
                    )}
                  </p>
                </li>
              ))}
            </ul>

            <div className="my-6">
              <BeamSelectNonprofit
                {...beamConfig}
                onNonprofitSelect={(event: events.BeamNonprofitSelectEvent) => {
                  console.log(event.detail);
                }}
              ></BeamSelectNonprofit>
            </div>
          </div>

          <section
            className={isDrawer ? "pt-4" : "rounded-lg bg-stone-100 p-5"}
            aria-label="Order summary"
          >
            {!isDrawer && (
              <>
                <h2 className="mb-3 text-lg font-bold">Order summary</h2>
                <form
                  className="mb-4 flex gap-2"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <input
                    type="text"
                    placeholder="Discount code"
                    aria-label="Discount code"
                    className="min-w-0 flex-1 rounded border border-gray-400 p-2.5"
                  />
                  <button
                    type="submit"
                    className="rounded border border-neutral-800 bg-white px-3.5 py-2.5"
                  >
                    Apply
                  </button>
                </form>
              </>
            )}
            <div className="mb-4">
              <Totals
                rows={[
                  ["Subtotal", "$125.00"],
                  ["Shipping", "Free"],
                  ["Estimated tax", "Calculated at checkout"],
                  ["Total", "$125.00 USD"],
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
              Taxes and shipping calculated at checkout
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
