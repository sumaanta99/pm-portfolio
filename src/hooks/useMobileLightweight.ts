"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const MOBILE_QUERY = "(max-width: 767px), (pointer: coarse)";

export function useMobileLightweight() {
  const reduce = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(MOBILE_QUERY);
    const apply = () => setIsMobile(media.matches);
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);

  return reduce || isMobile;
}
