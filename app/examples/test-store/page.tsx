"use client";
import { Suspense } from "react";
import dynamic from "next/dynamic";

const Store = dynamic(() => import("@/app/examples/test-store/store"), {
  ssr: false,
});

export default function StorePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Store />
    </Suspense>
  );
}
