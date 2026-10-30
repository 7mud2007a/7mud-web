"use client";

import Script from "next/script";

export function MeshBackground() {
  return (
    <>
      <canvas
        id="mesh-bg"
        aria-hidden="true"
        data-quality="auto"
        data-max-dpr="1.75"
      />
      <Script src="/mesh-background.js" strategy="afterInteractive" />
    </>
  );
}
