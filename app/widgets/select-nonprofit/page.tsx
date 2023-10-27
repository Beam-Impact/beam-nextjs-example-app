"use client";
import { BeamSelectNonprofit } from "@beamimpact/web-sdk/react";
import { useBeam } from "@/app/common/beamContext";

export default function Widget() {
  const beamConfig = useBeam();
  return (
    <div>
      <BeamSelectNonprofit {...beamConfig}></BeamSelectNonprofit>
    </div>
  );
}
