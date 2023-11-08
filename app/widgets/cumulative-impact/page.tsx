"use client";
import { useBeam } from "@/app/common/beamContext";
import dynamic from "next/dynamic";

const BeamCumulativeImpact = dynamic(
  () => import("@beamimpact/web-sdk/dist/react/cumulative-impact"),
  {
    loading: () => null,
    ssr: false,
  },
);

export default function Widget() {
  const beamConfig = useBeam();
  return (
    <div>
      <BeamCumulativeImpact {...beamConfig}></BeamCumulativeImpact>
    </div>
  );
}
