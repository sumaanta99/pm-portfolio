"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { projects, type Project } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ProjectModal } from "@/components/projects/ProjectModal";

const filters = ["All", "Product Work", "Side Projects", "Open Source"] as const;
type Filter = (typeof filters)[number];
const selectedWorkProjects = projects.filter((p) => !p.caseStudyHref);

export function Projects() {
  const [filter, setFilter] = useState<Filter>("All");
  const [active, setActive] = useState<Project | null>(null);

  const visible = useMemo(
    () =>
      filter === "All"
        ? selectedWorkProjects
        : selectedWorkProjects.filter((p) => p.category === filter),
    [filter]
  );

  return (
    <section
      id="work"
      className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24 md:py-32"
    >
      <SectionHeading
        eyebrow="Selected work"
        title="Shipped products & side bets."
        description="Each card opens a full Problem → Research → Solution → Impact breakdown with the metrics that mattered."
      />

      {/* filters */}
      <div className="mt-9 flex flex-wrap gap-2 sm:mt-10">
        {filters.map((f) => {
          const isActive = filter === f;
          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="relative rounded-full px-4 py-2 text-xs font-medium transition-colors sm:px-5 sm:py-2.5 sm:text-sm"
            >
              <span className={isActive ? "text-white" : "text-muted hover:text-ink"}>
                {f}
              </span>
              {isActive && (
                <motion.span
                  layoutId="filter-pill"
                  className="absolute inset-0 -z-10 rounded-full bg-accent shadow-glow"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              {!isActive && (
                <span className="absolute inset-0 -z-10 rounded-full border border-line" />
              )}
            </button>
          );
        })}
      </div>

      {/* grid */}
      <LayoutGroup>
        <motion.div
          layout
          className="mt-9 grid gap-5 sm:mt-10 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {visible.map((p) => (
              <ProjectCard key={p.id} project={p} onOpen={() => setActive(p)} />
            ))}
          </AnimatePresence>
        </motion.div>
      </LayoutGroup>

      <ProjectModal project={active} onClose={() => setActive(null)} />
    </section>
  );
}
