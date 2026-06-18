"use client";

import { useEffect, useState, type ReactNode } from "react";

export function LoadingGate({ children }: { children: ReactNode }) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let frameId = 0;

    const markReady = () => {
      frameId = window.requestAnimationFrame(() => {
        setIsReady(true);
      });
    };

    if (document.readyState === "complete") {
      markReady();
    } else {
      window.addEventListener("load", markReady, { once: true });
    }

    return () => {
      window.removeEventListener("load", markReady);
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <>
      <div
        className={`app-loader ${isReady ? "app-loader-hidden" : ""}`}
        aria-hidden={isReady}
      >
        <div className="app-loader-spinner" />
      </div>
      <div className={`app-shell ${isReady ? "app-shell-ready" : ""}`}>
        {children}
      </div>
    </>
  );
}
