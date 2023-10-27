"use client";
import { BeamRedeemTransaction } from "@beamimpact/web-sdk/react";
import { useBeam } from "@/app/common/beamContext";

export default function Widget() {
  const beamConfig = useBeam();
  return (
    <div>
      <BeamRedeemTransaction {...beamConfig}></BeamRedeemTransaction>
    </div>
  );
}
