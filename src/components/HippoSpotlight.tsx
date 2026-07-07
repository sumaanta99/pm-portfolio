"use client";

import { motion } from "framer-motion";
import { hippoSpotlight } from "@/lib/data";
import { useMobileLightweight } from "@/hooks/useMobileLightweight";

export function HippoSpotlight() {
  const lightweight = useMobileLightweight();

  const content = (
    <div className="group relative overflow-hidden rounded-3xl border border-line bg-surface/70 p-4 backdrop-blur-sm transition-colors duration-300 sm:rounded-4xl sm:p-7 md:hover:border-accent/40 md:hover:bg-surface/90">
      <div className="pointer-events-none absolute -right-20 -top-20 hidden h-56 w-56 rounded-full bg-[rgb(96_140_168/0.18)] blur-3xl sm:block md:opacity-70 md:transition-opacity md:duration-500 md:group-hover:opacity-100" />
      <div className="pointer-events-none absolute -bottom-16 -left-16 hidden h-48 w-48 rounded-full bg-accent/10 blur-3xl sm:block" />

      <div className="relative grid min-w-0 gap-5 sm:gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-center lg:gap-10">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-bg/50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted sm:text-[11px] sm:tracking-[0.18em]">
              <span className="relative flex h-2 w-2 shrink-0">
                {!lightweight && (
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent2 opacity-75" />
                )}
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent2" />
              </span>
              Latest build
            </span>
            <span className="rounded-full border border-line px-2.5 py-1 text-[10px] font-medium text-accent2">
              {hippoSpotlight.status}
            </span>
          </div>

          <h2 className="mt-3 font-display text-2xl font-bold tracking-tight sm:mt-4 sm:text-3xl md:text-4xl">
            {hippoSpotlight.title}
            <span className="gradient-text">.</span>
          </h2>
          <p className="mt-2 text-sm font-medium text-ink sm:text-base">
            {hippoSpotlight.tagline}
          </p>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted sm:mt-3">
            {hippoSpotlight.description}
          </p>

          <div className="mt-4 flex flex-wrap gap-1.5 sm:mt-5 sm:gap-2">
            {hippoSpotlight.roadmap.map((item) => (
              <span
                key={item.label}
                className={`rounded-full border px-2 py-1 text-[10px] font-medium sm:px-2.5 sm:text-[11px] ${
                  item.done
                    ? "border-accent2/40 bg-accent2/10 text-ink"
                    : "border-line bg-bg/30 text-muted"
                }`}
              >
                {item.done ? "✓ " : "⏳ "}
                {item.label}
              </span>
            ))}
          </div>
        </div>

        <div className="flex min-w-0 flex-col gap-3 sm:gap-4">
          <div className="min-w-0 overflow-hidden rounded-xl border border-line bg-bg/80 font-mono text-[11px] shadow-inner sm:rounded-2xl sm:text-xs">
            <div className="flex items-center gap-2 border-b border-line px-3 py-2 text-muted">
              <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-accent/70" />
              <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-accent2/50" />
              <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-line" />
              <span className="ml-1 truncate text-[10px]">hippo — zsh</span>
            </div>
            <div className="space-y-2 break-words px-3 py-3 text-muted">
              <p>
                <span className="text-accent2">hippo</span>{" "}
                <span className="text-ink/80">Everything you forget, remembered.</span>
              </p>
              <p className="text-accent2/90">✓ Hi, how can I help you today?</p>
              <p className="break-words">
                <span className="text-ink/70">&gt;</span> Where did I keep my passport?
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {hippoSpotlight.tech.map((t) => (
              <span
                key={t}
                className="rounded-full border border-line bg-bg/40 px-2 py-1 text-[10px] text-muted sm:px-2.5 sm:text-[11px]"
              >
                {t}
              </span>
            ))}
          </div>

          <a
            href={hippoSpotlight.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open hippo project site"
            className="flex min-h-11 w-full touch-manipulation items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-medium tracking-wide text-white shadow-glow transition-colors duration-300 active:bg-accent/80 sm:w-auto sm:px-7 sm:py-3.5 md:hover:bg-accent/90"
          >
            Try hippo
            <ExternalIcon />
          </a>
        </div>
      </div>
    </div>
  );

  return (
    <section
      id="hippo"
      className="relative mx-auto max-w-6xl scroll-mt-24 overflow-x-clip px-4 pb-12 pt-2 sm:scroll-mt-28 sm:px-6 sm:pb-20 sm:pt-6"
    >
      {lightweight ? (
        <div className="relative w-full">{content}</div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full"
        >
          {content}
        </motion.div>
      )}
    </section>
  );
}

function ExternalIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className="shrink-0"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}
