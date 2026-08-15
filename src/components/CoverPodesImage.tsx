"use client";

import { useState } from "react";

export default function CoverPodesImage() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="rounded-xl overflow-hidden shadow-lg border border-gray-200 aspect-[3/4] relative bg-gray-100">
      {!loaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-green-600 to-green-900 text-center p-4">
          <svg className="w-10 h-10 text-white/60 animate-pulse mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p className="text-xs text-white/70">Memuat cover...</p>
        </div>
      )}
      <iframe
        src="/publikasi-data-podes-2025.pdf#page=1&toolbar=0&navpanes=0&scrollbar=0&view=FitH"
        className="w-full h-full border-0"
        onLoad={() => setLoaded(true)}
        title="Cover Publikasi Data Podes 2025"
        style={{ pointerEvents: "none" }}
      />
    </div>
  );
}