"use client";
import { BeamCumulativeImpact } from "@beamimpact/web-sdk/react/cumulative-impact.esm.js";
import { useBeam } from "@/app/common/beamContext";

export default function Widget() {
  const beamConfig = useBeam();
  return (
    <div>
      <BeamCumulativeImpact {...beamConfig}></BeamCumulativeImpact>
    </div>
  );
}
