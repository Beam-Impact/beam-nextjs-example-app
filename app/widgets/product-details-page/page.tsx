"use client";
import { useBeam } from "@/app/common/beamContext";
import { DemoNote, ProductImage, QuantityInput } from "@/app/common/storefront";
import { useState } from "react";
import dynamic from "next/dynamic";

const BeamProductDetailsPage = dynamic(
  () => import("@beamimpact/web-sdk/dist/react/product-details-page"),
  {
    loading: () => null,
    ssr: false,
  },
);

const views = [
  {
    label: "Front view",
    gradient: "linear-gradient(135deg, #d9e4dd 0%, #a7c4b5 100%)",
  },
  {
    label: "Back view",
    gradient: "linear-gradient(135deg, #e8eee9 0%, #c3d6cb 100%)",
  },
  {
    label: "Detail view",
    gradient: "linear-gradient(135deg, #c3d6cb 0%, #8fae9d 100%)",
  },
];
const colors = ["Sage", "Charcoal", "Rust"];
const sizes = ["XS", "S", "M", "L", "XL"];
const soldOutSizes = ["XL"];

function OptionGroup({
  name,
  legend,
  options,
  value,
  onChange,
  disabled = [],
}: {
  name: string;
  legend: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  disabled?: string[];
}) {
  return (
    <fieldset className="mb-4">
      <legend className="mb-2 font-bold">{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <label key={option} className="relative">
            <input
              type="radio"
              name={name}
              value={option}
              checked={value === option}
              disabled={disabled.includes(option)}
              onChange={() => onChange(option)}
              className="peer absolute opacity-0"
            />
            <span className="inline-block min-w-[48px] cursor-pointer rounded border border-gray-400 px-3 py-2 text-center peer-checked:border-neutral-800 peer-checked:bg-neutral-800 peer-checked:text-white peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-blue-600 peer-disabled:cursor-not-allowed peer-disabled:text-gray-400 peer-disabled:line-through">
              {option}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export default function Widget() {
  const beamConfig = useBeam();
  const [view, setView] = useState(views[0]);
  const [color, setColor] = useState("Sage");
  const [size, setSize] = useState("M");

  return (
    <div className="max-w-[1000px]">
      <DemoNote>Demo: mock storefront product page.</DemoNote>

      <nav className="mb-4 text-xs text-gray-500" aria-label="Breadcrumb">
        <a href="#" className="underline">
          Home
        </a>{" "}
        /{" "}
        <a href="#" className="underline">
          Outerwear
        </a>{" "}
        / <span aria-current="page">Trailhead Fleece Jacket</span>
      </nav>

      <div className="grid gap-6 md:grid-cols-2 md:gap-10">
        <section aria-label="Product images">
          <ProductImage
            gradient={view.gradient}
            label={`Trailhead Fleece Jacket in ${color}, ${view.label.toLowerCase()}`}
            className="flex aspect-square items-center justify-center rounded-lg text-lg text-[#3d5a4c]"
          >
            Product image
          </ProductImage>
          <div className="mt-2 flex gap-2">
            {views.map((v) => (
              <button
                key={v.label}
                type="button"
                aria-label={v.label}
                aria-pressed={v === view}
                onClick={() => setView(v)}
                className={`h-16 w-16 rounded border-2 ${
                  v === view ? "border-neutral-800" : "border-transparent"
                }`}
                style={{ background: v.gradient }}
              />
            ))}
          </div>
        </section>

        <section aria-labelledby="product-title">
          <h1 id="product-title" className="mb-1 text-2xl font-bold">
            Trailhead Fleece Jacket
          </h1>
          <p className="mb-3 text-sm text-gray-500">
            ★★★★☆ 4.6 ·{" "}
            <a href="#reviews" className="underline">
              128 reviews
            </a>
          </p>
          <p className="mb-5 text-xl font-bold">
            $89.00{" "}
            <s
              className="ml-1 text-base font-normal text-gray-400"
              aria-label="Original price $110.00"
            >
              $110.00
            </s>
          </p>

          <form onSubmit={(e) => e.preventDefault()}>
            <OptionGroup
              name="color"
              legend={`Color: ${color}`}
              options={colors}
              value={color}
              onChange={setColor}
            />
            <OptionGroup
              name="size"
              legend="Size"
              options={sizes}
              value={size}
              onChange={setSize}
              disabled={soldOutSizes}
            />
            <fieldset className="mb-4">
              <legend className="mb-2 font-bold">Quantity</legend>
              <QuantityInput label="quantity" />
            </fieldset>

            <div className="my-4">
              <BeamProductDetailsPage {...beamConfig}></BeamProductDetailsPage>
            </div>

            <div className="flex flex-col gap-2">
              <button
                type="submit"
                className="rounded bg-neutral-800 p-3.5 font-bold text-white"
              >
                Add to cart
              </button>
              <button
                type="button"
                className="rounded border border-neutral-800 bg-white p-3.5 font-bold"
              >
                Buy it now
              </button>
            </div>
          </form>

          <ul className="my-4 text-sm leading-7 text-gray-600">
            <li>Free shipping on orders over $75</li>
            <li>Free 30-day returns</li>
            <li>In stock — ships in 1–2 business days</li>
          </ul>

          <div className="divide-y divide-gray-300 border-y border-gray-300 [&_p]:mt-2 [&_p]:leading-relaxed [&_p]:text-gray-700 [&_summary]:cursor-pointer [&_summary]:font-bold [&_ul]:mt-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:leading-relaxed [&_ul]:text-gray-700">
            <details open className="py-3">
              <summary>Description</summary>
              <p>
                A midweight fleece built for cool mornings on the trail and
                everyday layering. Made from 100% recycled polyester with a
                brushed interior, zippered hand pockets, and a stand-up collar
                that blocks the wind.
              </p>
            </details>
            <details className="py-3">
              <summary>Materials &amp; care</summary>
              <ul>
                <li>100% recycled polyester fleece</li>
                <li>Machine wash cold, tumble dry low</li>
                <li>Do not bleach or iron</li>
              </ul>
            </details>
            <details className="py-3">
              <summary>Size &amp; fit</summary>
              <p>Relaxed fit. Model is 5&apos;10&quot; and wears a size M.</p>
            </details>
          </div>
        </section>
      </div>
    </div>
  );
}
