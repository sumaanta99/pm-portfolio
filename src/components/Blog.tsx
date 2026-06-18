"use client";

import { motion } from "framer-motion";
import { profile } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function Blog() {
  return (
    <section
      id="blog"
      className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24 md:py-32"
    >
      <SectionHeading
        eyebrow="Writing"
        title="My Life on Medium."
        description="I write about nothing in particular, just to see if I can write 🤷"
      />

      <Reveal direction="up" delay={0.1}>
        <div className="group relative mt-9 overflow-hidden rounded-3xl border border-line bg-surface/60 p-5 sm:mt-10 sm:rounded-4xl sm:p-10">
          <div className="pointer-events-none absolute -right-10 -top-12 hidden h-44 w-44 rounded-full bg-accent/15 blur-3xl transition-transform duration-700 group-hover:scale-125 md:block" />
          <div className="pointer-events-none absolute -bottom-14 -left-10 hidden h-44 w-44 rounded-full bg-accent2/15 blur-3xl transition-transform duration-700 group-hover:scale-125 md:block" />

          <div className="relative flex flex-col gap-6 sm:gap-8 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-muted sm:text-sm sm:tracking-[0.18em]">
                Medium profile
              </p>
              <p className="mt-2 break-all font-display text-xl font-semibold tracking-tight sm:break-normal sm:text-3xl">
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
              className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-white shadow-glow sm:w-auto"
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
