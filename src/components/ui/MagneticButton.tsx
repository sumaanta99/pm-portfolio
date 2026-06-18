"use client";

import {
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useRef, type ReactNode } from "react";
import { useMobileLightweight } from "@/hooks/useMobileLightweight";

type Props = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "ghost";
  className?: string;
  strength?: number;
  ariaLabel?: string;
};

export function MagneticButton({
  children,
  href,
  onClick,
  variant = "primary",
  className = "",
  strength = 0.4,
  ariaLabel,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const lightweight = useMobileLightweight();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });

  const base =
    "relative inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium tracking-wide transition-colors duration-300 sm:px-7 sm:py-3.5";
  const styles =
    variant === "primary"
      ? "bg-accent text-white shadow-glow hover:bg-accent/90"
      : "border border-line bg-surface/40 text-ink hover:border-accent/60";

  if (lightweight) {
    if (href) {
      return (
        <a
          href={href}
          aria-label={ariaLabel}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
          className={`${base} ${styles} ${className}`}
        >
          {children}
        </a>
      );
    }
    return (
      <button
        type="button"
        aria-label={ariaLabel}
        onClick={onClick}
        className={`${base} ${styles} ${className}`}
      >
        {children}
      </button>
    );
  }

  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(relX * strength);
    y.set(relY * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const inner = (
    <motion.span
      className="relative z-10 inline-flex items-center gap-2"
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
    >
      {children}
    </motion.span>
  );

  const content = href ? (
    <a
      href={href}
      aria-label={ariaLabel}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      className={`${base} ${styles} will-change-transform ${className}`}
    >
      {inner}
    </a>
  ) : (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      className={`${base} ${styles} will-change-transform ${className}`}
    >
      {inner}
    </button>
  );

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      className="inline-block"
    >
      {content}
    </motion.div>
  );
}
