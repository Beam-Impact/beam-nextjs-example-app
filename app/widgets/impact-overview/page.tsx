"use client";
import { useBeam } from "@/app/common/beamContext";
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
    <BeamImpactOverview
      {...beamConfig}
      userId={"b96b5607-38e2-4811-bdbc-72859865a103"}
      nonprofitId={1}
    ></BeamImpactOverview>
  );
}
