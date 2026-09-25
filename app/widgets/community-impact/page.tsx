"use client";
import { useBeam } from "@/app/common/beamContext";
import { DemoNote, SiteFooter, SiteHeader } from "@/app/common/storefront";
import dynamic from "next/dynamic";

const BeamCommunityImpact = dynamic(
  () => import("@beamimpact/web-sdk/dist/react/community-impact"),
  {
    loading: () => null,
    ssr: false,
  },
);

const steps = [
  [
    "Shop as usual",
    "Buy coffee, gear, or a subscription. Nothing is added to your total.",
  ],
  [
    "Choose a nonprofit",
    "Pick the cause you care about in your cart or after checkout.",
  ],
  [
    "See your impact",
    "We donate 1% of your order and show you exactly what it funded.",
  ],
];

function SectionHeading({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children?: string;
}) {
  return (
    <div className="mb-5 max-w-[640px]">
      <h2 id={id} className="mb-2 text-2xl font-bold">
        {title}
      </h2>
      {children && <p className="leading-relaxed text-gray-600">{children}</p>}
    </div>
  );
}

export default function Widget() {
  const beamConfig = useBeam();
  return (
    <div className="max-w-[1000px]">
      <DemoNote>
        Demo: mock brand &quot;Our impact&quot; page. Shows both{" "}
        <code>cardStyle=&quot;image&quot;</code> and{" "}
        <code>cardStyle=&quot;icon&quot;</code>.
      </DemoNote>

      <SiteHeader current="Our impact" />

      <main>
        <section
          className="mb-10 mt-6 rounded-lg bg-gradient-to-br from-[#2f4a3d] to-[#5d7f69] px-5 py-9 text-white sm:px-10 sm:py-14"
          aria-labelledby="hero-title"
        >
          <p className="mb-2 text-xs font-bold uppercase tracking-widest opacity-80">
            Our impact
          </p>
          <h1
            id="hero-title"
            className="mb-3 max-w-[620px] text-4xl font-bold leading-tight"
          >
            Every bag you brew gives back to the communities we share
          </h1>
          <p className="max-w-[560px] leading-relaxed opacity-90">
            Since 2019, 1% of every order has gone to a nonprofit our customers
            choose, at no extra cost to you. Here&apos;s what our community has
            made possible together.
          </p>
        </section>

        <section className="mb-12" aria-labelledby="community-title">
          <SectionHeading
            id="community-title"
            title="What our community is funding"
          >
            Progress toward each goal updates as orders come in. Pick a cause at
            checkout to add to it.
          </SectionHeading>
          <BeamCommunityImpact
            {...beamConfig}
            cardStyle={"image"}
          ></BeamCommunityImpact>
        </section>

        <section className="mb-12" aria-labelledby="how-title">
          <SectionHeading id="how-title" title="How it works" />
          <ol className="grid gap-5 md:grid-cols-3">
            {steps.map(([title, description], i) => (
              <li key={title} className="rounded-lg border border-gray-300 p-5">
                <span className="mb-3 flex h-7 w-7 items-center justify-center rounded-full bg-[#2f4a3d] font-bold text-white">
                  {i + 1}
                </span>
                <h3 className="mb-1.5 font-bold">{title}</h3>
                <p className="leading-relaxed text-gray-600">{description}</p>
              </li>
            ))}
          </ol>
        </section>

        <section
          className="mb-12 grid items-center gap-8 md:grid-cols-2"
          aria-labelledby="story-title"
        >
          <div
            className="aspect-[4/3] rounded-lg bg-gradient-to-br from-[#e3d5c6] to-[#8a6a4f]"
            role="img"
            aria-label="Coffee farmers sorting harvested cherries"
          />
          <div>
            <h2 id="story-title" className="mb-2 text-2xl font-bold">
              From farm to cup to community
            </h2>
            <p className="mb-3 leading-relaxed text-gray-700">
              We buy directly from the growers behind every roast and pay above
              fair-trade prices. Giving back through our customers&apos; orders
              is how we extend that care to the neighborhoods we roast in.
            </p>
            <a href="#" className="font-bold text-[#2f4a3d] underline">
              Read our sourcing report
            </a>
          </div>
        </section>

        <section className="mb-12" aria-labelledby="causes-title">
          <SectionHeading id="causes-title" title="Causes you can support">
            Every order, you choose where your 1% goes.
          </SectionHeading>
          <BeamCommunityImpact
            {...beamConfig}
            cardStyle={"icon"}
          ></BeamCommunityImpact>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
