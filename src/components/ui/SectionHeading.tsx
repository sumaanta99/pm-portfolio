"use client";

import { motion } from "framer-motion";
import { Reveal } from "./Reveal";
import { useMobileLightweight } from "@/hooks/useMobileLightweight";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  const lightweight = useMobileLightweight();
  const alignment =
    align === "center" ? "items-center text-center mx-auto" : "items-start text-left";

  const underline = (
    <div
      className={`h-px w-24 origin-left bg-gradient-to-r from-accent to-transparent ${
        align === "center" ? "mx-auto" : ""
      }`}
    />
  );

  return (
    <div className={`flex max-w-2xl flex-col gap-4 ${alignment}`}>
      <Reveal direction="up">
        <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-line bg-surface/50 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.16em] text-muted sm:px-4 sm:text-xs sm:tracking-[0.18em]">
          <span className="h-1.5 w-1.5 rounded-full bg-accent2" />
          {eyebrow}
        </span>
      </Reveal>
      <Reveal direction="up" delay={0.08}>
        <h2 className="font-display text-2xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl">
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal direction="up" delay={0.16}>
          <p className="text-sm leading-relaxed text-muted sm:text-lg">
            {description}
          </p>
        </Reveal>
      )}
      {lightweight ? (
        underline
      ) : (
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className={`h-px w-24 origin-left bg-gradient-to-r from-accent to-transparent ${
            align === "center" ? "mx-auto" : ""
          }`}
        />
      )}
    </div>
  );
}
