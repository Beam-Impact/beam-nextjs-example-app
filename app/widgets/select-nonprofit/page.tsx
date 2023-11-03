"use client";
import { BeamSelectNonprofit } from "@beamimpact/web-sdk/dist/react";
import { events } from "@beamimpact/web-sdk/dist/integrations/utils";
import { defaultBeamConfig, useBeam } from "@/app/common/beamContext";
import { useState } from "react";

export default function Widget() {
  const beamConfig = useBeam();
  const [selectedNonprofitHistory, setSelectedNonprofit] = useState<string[]>(
    [],
  );
  return (
    <div>
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
      <hr className={"mt-5"} />
      <ul className={"mt-5 text-gray-600"}>
        <strong>Selection Event History</strong>
        {selectedNonprofitHistory.map((npName, idx) => (
          <li key={npName + idx}>
            {idx + 1}. {npName}
          </li>
        ))}
      </ul>
    </div>
  );
}
