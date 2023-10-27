"use client";
import { BeamPostPurchase } from "@beamimpact/web-sdk/react";
import { useBeam } from "@/app/common/beamContext";

export default function Widget() {
  const beamConfig = useBeam();
  return (
    <div>
      <BeamPostPurchase {...beamConfig}></BeamPostPurchase>
    </div>
  );
}
