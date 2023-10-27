"use client";
import { BeamImpactOverview } from "@beamimpact/web-sdk/react";
import { useBeam } from "@/app/common/beamContext";

export default function Widget() {
  const beamConfig = useBeam();
  return (
    <BeamImpactOverview
      {...beamConfig}
      userId={"user-111"}
      nonprofitId={1}
    ></BeamImpactOverview>
  );
}
