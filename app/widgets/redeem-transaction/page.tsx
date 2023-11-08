"use client";
import { useBeam } from "@/app/common/beamContext";
import dynamic from "next/dynamic";

const BeamRedeemTransaction = dynamic(
  () => import("@beamimpact/web-sdk/dist/react/redeem-transaction"),
  {
    loading: () => null,
    ssr: false,
  },
);

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
