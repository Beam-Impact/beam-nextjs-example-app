"use client";
import { useBeam } from "@/app/common/beamContext";
import dynamic from "next/dynamic";

const BeamSelectNonprofit = dynamic(
  () => import("@beamimpact/web-sdk/dist/react/select-nonprofit"),
  {
    loading: () => null,
    ssr: false,
  },
);

export default function Widget() {
  const beamConfig = useBeam();
  return (
    <>
      <BeamSelectNonprofit {...beamConfig}></BeamSelectNonprofit>
    </>
  );
}
