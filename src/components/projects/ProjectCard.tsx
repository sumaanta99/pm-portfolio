"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { useRef } from "react";
import type { Project } from "@/lib/data";

export function ProjectCard({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: () => void;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLButtonElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [8, -8]), {
    stiffness: 150,
    damping: 18,
  });
  const ry = useSpring(useTransform(mx, [0, 1], [-8, 8]), {
    stiffness: 150,
    damping: 18,
  });

  const onMove = (e: React.MouseEvent) => {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  };
  const onLeave = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  return (
    <motion.button
      ref={ref}
      layout
      onClick={onOpen}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-4xl border border-line bg-surface/60 p-7 text-left will-change-transform"
    >
      {/* glow following accent */}
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full opacity-30 blur-3xl transition-all duration-500 group-hover:opacity-60"
        style={{ background: `rgb(${project.accent})` }}
      />

      <div className="relative flex items-center justify-between">
        <span
          className="rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide"
          style={{
            color: `rgb(${project.accent})`,
            background: `rgb(${project.accent} / 0.12)`,
          }}
        >
          {project.category}
        </span>
        <span className="text-xs text-muted">{project.year}</span>
      </div>

      <div className="relative mt-6 flex items-center gap-3">
        <h3 className="font-display text-2xl font-bold tracking-tight">
          {project.title}
        </h3>
        {project.status && (
          <span className="rounded-full border border-line px-2 py-0.5 text-[10px] font-medium text-accent2">
            {project.status}
          </span>
        )}
      </div>
      <p className="mt-1 text-sm font-medium text-muted">{project.subtitle}</p>

      <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-muted">
        {project.summary}
      </p>

      {/* metrics */}
      <div className="relative mt-6 flex flex-wrap gap-x-6 gap-y-2">
        {project.metrics.slice(0, 3).map((m) => (
          <div key={m.label}>
            <p
              className="font-display text-lg font-bold"
              style={{ color: `rgb(${project.accent})` }}
            >
              {m.prefix}
              {m.value.toLocaleString()}
              {m.suffix}
            </p>
            <p className="text-[11px] leading-tight text-muted">{m.label}</p>
          </div>
        ))}
      </div>

      <div className="relative mt-auto flex flex-wrap gap-2 pt-6">
        {project.tags.slice(0, 3).map((t) => (
          <span
            key={t}
            className="rounded-full border border-line bg-bg/40 px-2.5 py-1 text-[11px] text-muted"
          >
            {t}
          </span>
        ))}
      </div>

      {/* hover reveal cue */}
      <div className="relative mt-5 flex items-center gap-2 text-sm font-medium text-ink opacity-0 transition-all duration-300 group-hover:opacity-100">
        <span>More about this project</span>
        <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
      </div>

      <div
        className="pointer-events-none absolute inset-0 rounded-4xl border opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ borderColor: `rgb(${project.accent} / 0.5)` }}
      />
    </motion.button>
  );
}
