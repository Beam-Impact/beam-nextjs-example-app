"use client";
import { useBeam } from "@/app/common/beamContext";
import { DemoNote, SiteFooter, SiteHeader } from "@/app/common/storefront";
import dynamic from "next/dynamic";

const BeamCumulativeImpact = dynamic(
  () => import("@beamimpact/web-sdk/dist/react/cumulative-impact"),
  {
    loading: () => null,
    ssr: false,
  },
);

const commitments = [
  [
    "1% of every order",
    "Donated on every purchase and subscription renewal, never added to your total.",
  ],
  [
    "You choose the cause",
    "Pick a nonprofit in your cart or after checkout, and change it any time.",
  ],
  [
    "Full transparency",
    "Every donation is tracked, so the totals on this page are the real numbers.",
  ],
];

const faqs = [
  [
    "Does giving back cost me anything?",
    "No. The donation comes out of our revenue, not your order total.",
  ],
  [
    "How are nonprofits chosen?",
    "We partner with vetted nonprofits working on food access, climate, and community causes.",
  ],
  [
    "Can I see what my own orders funded?",
    "Yes. After checkout and in your account, you can see the impact of your personal orders.",
  ],
];

export default function Widget() {
  const beamConfig = useBeam();
  return (
    <div className="max-w-[1000px]">
      <DemoNote>Demo: mock brand &quot;Our impact&quot; page.</DemoNote>

      <SiteHeader current="Our impact" />

      <main>
        <section
          className="mb-12 mt-10 grid items-start gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12"
          aria-labelledby="intro-title"
        >
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#5d7f69]">
              Impact report
            </p>
            <h1
              id="intro-title"
              className="mb-4 text-3xl font-bold leading-tight"
            >
              What your coffee has made possible
            </h1>
            <p className="mb-3 leading-relaxed text-gray-700">
              We believe a good cup of coffee should do good, too. That&apos;s
              why 1% of every order goes to a nonprofit you choose, at no extra
              cost to you.
            </p>
            <p className="mb-3 leading-relaxed text-gray-700">
              These totals add up every donation our customers have directed so
              far. Every order moves them forward.
            </p>
            <a href="#" className="font-bold text-[#2f4a3d] underline">
              Shop coffee that gives back
            </a>
          </div>
          <div
            className="rounded-lg bg-[#f4f1ea] p-6"
            role="region"
            aria-label="Our impact, all time"
          >
            <BeamCumulativeImpact {...beamConfig}></BeamCumulativeImpact>
          </div>
        </section>

        <section
          className="mb-12 rounded-lg bg-[#2f4a3d] p-8 text-white"
          aria-labelledby="commitments-title"
        >
          <h2 id="commitments-title" className="mb-5 text-2xl font-bold">
            Our commitments
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {commitments.map(([title, description]) => (
              <div key={title}>
                <h3 className="mb-1.5 font-bold">{title}</h3>
                <p className="leading-relaxed opacity-[0.85]">{description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12 max-w-[720px]" aria-labelledby="faq-title">
          <h2 id="faq-title" className="mb-3 text-2xl font-bold">
            Questions
          </h2>
          <div className="divide-y divide-gray-300 border-y border-gray-300">
            {faqs.map(([question, answer]) => (
              <details key={question} className="py-3.5">
                <summary className="cursor-pointer font-bold">
                  {question}
                </summary>
                <p className="mt-2 leading-relaxed text-gray-700">{answer}</p>
              </details>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
