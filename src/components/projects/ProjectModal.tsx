"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useEffect } from "react";
import type { Project } from "@/lib/data";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

const sections = [
  { key: "problem", label: "Problem", icon: "◆" },
  { key: "research", label: "Research", icon: "◇" },
  { key: "solution", label: "Solution", icon: "✦" },
  { key: "impact", label: "Impact", icon: "★" },
] as const;

export function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", onKey);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto bg-bg/70 p-3 backdrop-blur-md sm:p-8"
        >
          <motion.div
            layout
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            data-lenis-prevent
            className="relative my-4 w-full max-w-3xl overflow-hidden rounded-4xl border border-line bg-surface shadow-lift sm:my-8"
          >
            {/* header */}
            <div
              className="relative overflow-hidden px-5 pb-6 pt-8 sm:px-8 sm:pb-8 sm:pt-10"
              style={{
                background: `linear-gradient(135deg, rgb(${project.accent} / 0.18), transparent 70%)`,
              }}
            >
              <div
                className="absolute -right-12 -top-12 h-48 w-48 rounded-full opacity-40 blur-3xl"
                style={{ background: `rgb(${project.accent})` }}
              />
              <button
                onClick={onClose}
                aria-label="Close"
                className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-line bg-bg/60 text-ink transition-transform hover:rotate-90 sm:right-6 sm:top-6 sm:h-10 sm:w-10"
              >
                ✕
              </button>
              <span
                className="relative rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide"
                style={{
                  color: `rgb(${project.accent})`,
                  background: `rgb(${project.accent} / 0.14)`,
                }}
              >
                {project.category} · {project.year}
              </span>
              <h2 className="relative mt-4 font-display text-2xl font-bold tracking-tight sm:text-4xl">
                {project.title}
              </h2>
              <p className="relative mt-1 text-base text-muted">
                {project.subtitle}
              </p>

              {/* animated metric counters */}
              <div className="relative mt-6 grid grid-cols-2 gap-3 sm:mt-7 sm:grid-cols-3 sm:gap-4">
                {project.metrics.map((m) => (
                  <div
                    key={m.label}
                    className="rounded-2xl border border-line bg-bg/40 p-3 sm:p-4"
                  >
                    <p
                      className="font-display text-xl font-bold sm:text-2xl"
                      style={{ color: `rgb(${project.accent})` }}
                    >
                      <AnimatedCounter
                        value={m.value}
                        prefix={m.prefix}
                        suffix={m.suffix}
                      />
                    </p>
                    <p className="mt-1 text-[11px] leading-tight text-muted">
                      {m.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* body: P → R → S → I */}
            <div className="space-y-6 px-5 py-6 sm:space-y-7 sm:px-8 sm:py-8">
              {sections.map((s, i) => (
                <motion.div
                  key={s.key}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.1, duration: 0.5 }}
                  className="relative pl-6 sm:pl-8"
                >
                  <span
                    className="absolute left-0 top-0.5 text-sm"
                    style={{ color: `rgb(${project.accent})` }}
                  >
                    {s.icon}
                  </span>
                  <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                    {s.label}
                  </h4>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink/90">
                    {project[s.key]}
                  </p>
                  {i < sections.length - 1 && (
                    <div className="absolute left-[6px] top-6 h-[calc(100%-8px)] w-px bg-line" />
                  )}
                </motion.div>
              ))}

              {project.caseStudyHref && (
                <Link
                  href={project.caseStudyHref}
                  onClick={onClose}
                  className="group flex items-center justify-between gap-3 rounded-2xl border px-5 py-4 transition-colors"
                  style={{
                    borderColor: `rgb(${project.accent} / 0.5)`,
                    background: `rgb(${project.accent} / 0.08)`,
                  }}
                >
                  <span>
                    <span
                      className="block text-sm font-semibold"
                      style={{ color: `rgb(${project.accent})` }}
                    >
                      Read the full case study
                    </span>
                    <span className="mt-0.5 block text-xs text-muted">
                      Consent-driven contact sharing — wireframes, flow & spec
                    </span>
                  </span>
                  <span
                    className="text-lg transition-transform group-hover:translate-x-1"
                    style={{ color: `rgb(${project.accent})` }}
                  >
                    →
                  </span>
                </Link>
              )}

              {project.links && project.links.length > 0 && (
                <div className="flex flex-wrap gap-3 pt-2">
                  {project.links.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-line bg-bg/40 px-5 py-2.5 text-sm font-medium transition-colors hover:border-accent/60 hover:text-accent"
                    >
                      {l.label}
                      <span>↗</span>
                    </a>
                  ))}
                </div>
              )}

              <div className="flex flex-wrap gap-2 border-t border-line pt-6">
                {project.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-line px-3 py-1 text-xs text-muted"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
