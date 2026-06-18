"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { projects } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StaggerGroup, staggerItem } from "@/components/ui/Reveal";

export function CaseStudies() {
  const caseStudies = projects.filter((p) => p.caseStudyHref);

  if (caseStudies.length === 0) return null;

  return (
    <section
      id="case-studies"
      className="relative mx-auto max-w-6xl px-6 py-28 md:py-36"
    >
      <SectionHeading
        eyebrow="Deep dives"
        title="Case studies."
        description="End-to-end product breakdowns — problem, research, wireframes, flows and the specs that shipped."
      />

      <StaggerGroup className="mt-12 grid gap-6 md:grid-cols-2">
        {caseStudies.map((p) => (
          <motion.div key={p.id} variants={staggerItem}>
            <Link
              href={p.caseStudyHref!}
              className="group relative flex h-full flex-col overflow-hidden rounded-4xl border border-line bg-surface/60 p-8 transition-colors hover:border-accent/40"
            >
              <div
                className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full opacity-25 blur-3xl transition-opacity duration-500 group-hover:opacity-50"
                style={{ background: `rgb(${p.accent})` }}
              />

              <div className="relative flex items-center justify-between">
                <span
                  className="rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide"
                  style={{
                    color: `rgb(${p.accent})`,
                    background: `rgb(${p.accent} / 0.12)`,
                  }}
                >
                  {p.category}
                </span>
                <span className="text-xs text-muted">{p.year}</span>
              </div>

              <h3 className="relative mt-6 font-display text-2xl font-bold tracking-tight sm:text-3xl">
                {p.title}
              </h3>
              <p className="relative mt-1 text-sm font-medium text-muted">
                {p.subtitle}
              </p>

              <p className="relative mt-4 line-clamp-3 text-sm leading-relaxed text-muted">
                {p.summary}
              </p>

              <div className="relative mt-7 flex flex-wrap gap-x-8 gap-y-3">
                {p.metrics.slice(0, 3).map((m) => (
                  <div key={m.label}>
                    <p
                      className="font-display text-xl font-bold"
                      style={{ color: `rgb(${p.accent})` }}
                    >
                      {m.prefix}
                      {m.value.toLocaleString()}
                      {m.suffix}
                    </p>
                    <p className="text-[11px] leading-tight text-muted">
                      {m.label}
                    </p>
                  </div>
                ))}
              </div>

              <div
                className="relative mt-8 flex items-center gap-2 text-sm font-semibold"
                style={{ color: `rgb(${p.accent})` }}
              >
                <span>Read the full case study</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </StaggerGroup>
    </section>
  );
}
