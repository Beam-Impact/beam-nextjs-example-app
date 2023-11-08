"use client";
import { useBeam } from "@/app/common/beamContext";
import dynamic from "next/dynamic";

const BeamCommunityImpact = dynamic(
  () => import("@beamimpact/web-sdk/dist/react/community-impact"),
  {
    loading: () => null,
    ssr: false,
  },
);

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
