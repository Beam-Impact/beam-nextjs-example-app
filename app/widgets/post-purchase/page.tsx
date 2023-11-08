"use client";
import { useBeam } from "@/app/common/beamContext";
import dynamic from "next/dynamic";

const BeamPostPurchase = dynamic(
  () => import("@beamimpact/web-sdk/dist/react/post-purchase"),
  {
    loading: () => null,
    ssr: false,
  },
);

export default function Widget() {
  const beamConfig = useBeam();
  return (
    <div>
      <BeamPostPurchase
        {...beamConfig}
        orderId={"ORDER-" + Math.round(Math.random() * 10000)}
        email={"customer@example.com"}
        cartTotal={100.0}
      ></BeamPostPurchase>
    </div>
  );
}
