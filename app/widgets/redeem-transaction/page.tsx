"use client";
import { BeamRedeemTransaction } from "@beamimpact/web-sdk/dist/react";
import { useBeam } from "@/app/common/beamContext";

export default function Widget() {
  const beamConfig = useBeam();
  return (
    <div>
      <BeamRedeemTransaction
        {...beamConfig}
        transactionId={"1000"}
      ></BeamRedeemTransaction>
    </div>
  );
}
