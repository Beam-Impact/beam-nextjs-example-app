"use client";
import { useBeam } from "@/app/common/beamContext";
import { DemoNote, OrderConfirmation } from "@/app/common/storefront";
import dynamic from "next/dynamic";

const BeamImpactOverview = dynamic(
  () => import("@beamimpact/web-sdk/dist/react/impact-overview"),
  {
    loading: () => null,
    ssr: false,
  },
);

export default function Widget() {
  const beamConfig = useBeam();
  return (
    <div className="max-w-[1000px]">
      <DemoNote>
        Demo: mock storefront order confirmation, after the customer has chosen
        a nonprofit.
      </DemoNote>
      <OrderConfirmation>
        <BeamImpactOverview
          {...beamConfig}
          userId={"b96b5607-38e2-4811-bdbc-72859865a103"}
          nonprofitId={1}
        ></BeamImpactOverview>
      </OrderConfirmation>
    </div>
  );
}
