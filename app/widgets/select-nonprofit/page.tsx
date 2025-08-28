"use client";
import { events } from "@beamimpact/web-sdk/dist/integrations/utils";
import { useBeam } from "@/app/common/beamContext";
import { useState } from "react";
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
  const [selectedNonprofitHistory, setSelectedNonprofit] = useState<string[]>(
    [],
  );

  return (
    <>
      <BeamSelectNonprofit
        {...beamConfig}
        onNonprofitSelect={(event: events.BeamNonprofitSelectEvent) => {
          const { selectedNonprofitId, nonprofitName } = event.detail;
          console.log(event.detail);
          setSelectedNonprofit([
            ...selectedNonprofitHistory,
            nonprofitName || "No Selection",
          ]);
        }}
      ></BeamSelectNonprofit>
    </>
  );
}
