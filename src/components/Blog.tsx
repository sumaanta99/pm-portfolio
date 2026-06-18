"use client";

import { motion } from "framer-motion";
import { profile } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function Blog() {
  return (
    <section id="blog" className="relative mx-auto max-w-6xl px-6 py-28 md:py-36">
      <SectionHeading
        eyebrow="Writing"
        title="My Life on Medium."
        description="I write about nothing in particular, just to see if I can write 🤷"
      />

      <Reveal direction="up" delay={0.1}>
        <div className="group relative mt-10 overflow-hidden rounded-4xl border border-line bg-surface/60 p-8 sm:p-10">
          <div className="pointer-events-none absolute -right-10 -top-12 h-44 w-44 rounded-full bg-accent/15 blur-3xl transition-transform duration-700 group-hover:scale-125" />
          <div className="pointer-events-none absolute -bottom-14 -left-10 h-44 w-44 rounded-full bg-accent2/15 blur-3xl transition-transform duration-700 group-hover:scale-125" />

          <div className="relative flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-muted">
                Medium profile
              </p>
              <p className="mt-2 font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                @sumaantamunde
              </p>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
                Read about my latest thoughts here.
              </p>
            </div>

            <motion.a
              href={profile.socials.medium}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-white shadow-glow"
            >
              Visit my Medium
              <span aria-hidden>↗</span>
            </motion.a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
