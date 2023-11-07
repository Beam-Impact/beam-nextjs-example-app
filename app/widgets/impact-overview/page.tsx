"use client";
import { BeamImpactOverview } from "@beamimpact/web-sdk/dist/react";
import { useBeam } from "@/app/common/beamContext";

export default function Widget() {
  const beamConfig = useBeam();
  return (
    <BeamImpactOverview
      {...beamConfig}
      userId={"b96b5607-38e2-4811-bdbc-72859865a103"}
      nonprofitId={1}
    ></BeamImpactOverview>
  );
}
