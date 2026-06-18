"use client";

import { useEffect, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";

const MOBILE_QUERY = "(max-width: 767px), (pointer: coarse)";

export function LoadingGate({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [isReady, setIsReady] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(MOBILE_QUERY);
    const apply = () => setIsMobile(media.matches);
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (isMobile) {
      setIsReady(true);
      return;
    }

    let frameId = 0;
    let timeoutId = 0;
    let observer: MutationObserver | null = null;

    const markReady = () => {
      frameId = window.requestAnimationFrame(() => {
        setIsReady(true);
      });
    };

    if (pathname !== "/") {
      markReady();
    } else {
      const heroSection = document.getElementById("top");
      if (heroSection) {
        markReady();
      } else {
        observer = new MutationObserver(() => {
          if (document.getElementById("top")) {
            markReady();
            observer?.disconnect();
            observer = null;
          }
        });
        observer.observe(document.body, { childList: true, subtree: true });
        timeoutId = window.setTimeout(markReady, 3000);
      }
    }

    return () => {
      if (timeoutId) window.clearTimeout(timeoutId);
      observer?.disconnect();
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, [pathname, isMobile]);

  return (
    <>
      {!isMobile && (
        <div
          className={`app-loader ${isReady ? "app-loader-hidden" : ""}`}
          aria-hidden={isReady}
        >
          <div className="app-loader-spinner" />
        </div>
      )}
      <div className={`app-shell ${isReady ? "app-shell-ready" : ""}`}>
        {children}
      </div>
    </>
  );
}
