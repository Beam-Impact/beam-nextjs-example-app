"use client";
import { useBeam } from "@/app/common/beamContext";
import { DemoNote, OrderConfirmation } from "@/app/common/storefront";
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
    <div className="max-w-[1000px]">
      <DemoNote>
        Demo: mock storefront order confirmation, where the customer chooses a
        nonprofit for an existing transaction.
      </DemoNote>
      <OrderConfirmation>
        <BeamRedeemTransaction
          {...beamConfig}
          transactionId={"1000"}
        ></BeamRedeemTransaction>
      </OrderConfirmation>
    </div>
  );
}
