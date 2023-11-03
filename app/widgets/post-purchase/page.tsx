"use client";
import { BeamPostPurchase } from "@beamimpact/web-sdk/dist/react";
import { useBeam } from "@/app/common/beamContext";

export default function Widget() {
  const beamConfig = useBeam();
  return (
    <div>
      <BeamPostPurchase
        {...beamConfig}
        orderId={"ORDER-1000"}
        email={"customer@example.com"}
        cartTotal={100.0}
      ></BeamPostPurchase>
    </div>
  );
}
