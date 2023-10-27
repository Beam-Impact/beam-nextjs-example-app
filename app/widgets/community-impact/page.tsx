"use client";
import { BeamCommunityImpact } from "@beamimpact/web-sdk/react";
import { useBeam } from "@/app/common/beamContext";

export default function Widget() {
  const beamConfig = useBeam();
  return (
    <div>
      <BeamCommunityImpact
        {...beamConfig}
        cardStyle={"image"}
      ></BeamCommunityImpact>
    </div>
  );
}
