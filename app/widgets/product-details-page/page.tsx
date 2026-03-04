"use client";
import { events } from "@beamimpact/web-sdk/dist/integrations/utils";
import { useBeam } from "@/app/common/beamContext";
import { useState } from "react";
import dynamic from "next/dynamic";

const BeamProductDetailsPage = dynamic(
  () => import("@beamimpact/web-sdk/dist/react/product-details-page"),
  {
    loading: () => null,
    ssr: false,
  },
);

export default function Widget() {
  const beamConfig = useBeam();

  return (
    <>
      <BeamProductDetailsPage {...beamConfig}></BeamProductDetailsPage>
    </>
  );
}
