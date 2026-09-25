"use client";
import { useBeam } from "@/app/common/beamContext";
import { DemoNote, OrderConfirmation } from "@/app/common/storefront";
import { useState } from "react";
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
  // Generated once so re-renders don't register a new order
  const [orderId] = useState(
    () => "ORDER-" + Math.round(Math.random() * 1000000),
  );
  return (
    <div className="max-w-[1000px]">
      <DemoNote>
        Demo: mock storefront order confirmation. A new order ID is generated on
        each page load.
      </DemoNote>
      <OrderConfirmation>
        <BeamPostPurchase
          {...beamConfig}
          orderId={orderId}
          email={"jordan.lee@example.com"}
          cartTotal={125.0} // Cart subtotal before tax and shipping
        ></BeamPostPurchase>
      </OrderConfirmation>
    </div>
  );
}
