"use client";

import { motion } from "framer-motion";
import { skillGroups, tools } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, StaggerGroup, staggerItem } from "@/components/ui/Reveal";

export function Skills() {
  return (
    <section id="skills" className="relative mx-auto max-w-6xl px-6 py-28 md:py-36">
      <div className="pointer-events-none absolute left-1/2 top-20 -z-10 h-96 w-96 -translate-x-1/2 rounded-full bg-accent/10 blur-[120px]" />

      <SectionHeading
        eyebrow="Skills"
        title="A full-cycle, AI-native product toolkit."
        description="From discovery and PRDs to SQL funnels and shipping production code with Claude and Cursor woven into the workflow."
        align="center"
      />

      <div className="mt-14 grid gap-6 md:grid-cols-2">
        {skillGroups.map((group, gi) => (
          <Reveal key={group.title} direction="up" delay={gi * 0.06}>
            <div className="h-full rounded-4xl border border-line bg-surface/50 p-7">
              <h3 className="mb-6 font-display text-lg font-semibold">
                {group.title}
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {group.skills.map((skill) => (
                  <span
                    key={skill.name}
                    className="rounded-full border border-line bg-bg/40 px-4 py-2 text-sm text-muted"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* floating tool chips */}
      <div className="mt-14">
        <Reveal>
          <p className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.22em] text-muted">
            Tools I reach for
          </p>
        </Reveal>
        <StaggerGroup className="flex flex-wrap justify-center gap-3">
          {tools.map((tool) => (
            <motion.span
              key={tool}
              variants={staggerItem}
              whileHover={{ y: -6, rotate: -2, scale: 1.06 }}
              transition={{ type: "spring", stiffness: 300, damping: 14 }}
              className="cursor-default rounded-full border border-line bg-surface/60 px-5 py-2.5 text-sm font-medium text-muted transition-colors hover:border-accent/60 hover:text-ink"
            >
              {tool}
            </motion.span>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
