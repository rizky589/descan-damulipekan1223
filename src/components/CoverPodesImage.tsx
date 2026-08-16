"use client";

import { useState, useRef, useEffect } from "react";

export default function CoverPodesImage() {
  const [loaded, setLoaded] = useState(false);
  const [showIframe, setShowIframe] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Delay iframe mount by 800ms so page content loads first
  useEffect(() => {
    const timer = setTimeout(() => setShowIframe(true), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="rounded-xl overflow-hidden shadow-lg border border-gray-200 aspect-[3/4] relative bg-gray-100">
      {/* Shimmer placeholder */}
      {!loaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-green-600 to-green-900 text-center p-4">
          {/* Shimmer animation */}
          <div className="absolute inset-0 overflow-hidden">
            <div
              className="absolute inset-0 -translate-x-full"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)",
                animation: "shimmer 1.8s infinite",
              }}
            />
          </div>
          <svg
            className="w-10 h-10 text-white/60 mb-3 relative z-10"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <p className="text-xs text-white/70 relative z-10">Memuat dokumen...</p>
        </div>
      )}

      {/* Iframe — mounted after delay so page loads first */}
      {showIframe && (
        <iframe
          ref={iframeRef}
          src="/publikasi-data-podes-2025.pdf#page=1&toolbar=0&navpanes=0&scrollbar=0&view=FitH"
          className={`w-full h-full border-0 transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
          onLoad={() => setLoaded(true)}
          title="Cover Publikasi Data Podes 2025"
          style={{ pointerEvents: "none" }}
          loading="lazy"
        />
      )}

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
      `}</style>
    </div>
  );
}