"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { profile, timeline } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, StaggerGroup, staggerItem } from "@/components/ui/Reveal";

const highlights = [
  { value: "4.5 yrs", label: "Eng-led product" },
  { value: "3", label: "Domains: B2C · SaaS · Logistics" },
  { value: "0→1", label: "Builder mindset" },
];

export function About() {
  const lineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: lineRef,
    offset: ["start 70%", "end 60%"],
  });
  const progressHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="about"
      className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24 md:py-32"
    >
      <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            eyebrow="About me"
            title="Product thinking, built with engineering depth."
            description={profile.summary}
          />

          {/* clip-path reveal portrait card */}
          <Reveal direction="up" delay={0.1}>
            <motion.div
              initial={{ clipPath: "inset(100% 0 0 0)" }}
              whileInView={{ clipPath: "inset(0% 0 0 0)" }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="group relative mt-10 overflow-hidden rounded-4xl border border-line bg-gradient-to-br from-elevated to-surface p-6 sm:p-8"
            >
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent/20 blur-3xl transition-transform duration-700 group-hover:scale-150" />
              <div className="relative flex items-center gap-4 sm:gap-5">
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border border-white/15 shadow-glow">
                  <Image
                    src="/images/profile-photo.png"
                    alt={`${profile.name} portrait`}
                    fill
                    sizes="80px"
                    className="object-cover"
                    priority
                  />
                </div>
                <div>
                  <p className="font-display text-xl font-semibold">
                    {profile.name}
                  </p>
                  <p className="text-sm text-muted">{profile.role}</p>
                  <p className="mt-1 text-xs text-muted">
                    {profile.education} · {profile.location}
                  </p>
                </div>
              </div>
              <StaggerGroup className="relative mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {highlights.map((h) => (
                  <motion.div
                    key={h.label}
                    variants={staggerItem}
                    className="rounded-2xl border border-line bg-surface/60 p-4"
                  >
                    <p className="font-display text-lg font-bold text-accent">
                      {h.value}
                    </p>
                    <p className="mt-1 text-[11px] leading-tight text-muted">
                      {h.label}
                    </p>
                  </motion.div>
                ))}
              </StaggerGroup>
            </motion.div>
          </Reveal>
        </div>

        {/* timeline */}
        <div ref={lineRef} className="relative">
          <Reveal>
            <h3 className="mb-10 font-display text-sm font-semibold uppercase tracking-[0.2em] text-muted">
              The path here
            </h3>
          </Reveal>

          <div className="relative pl-8 sm:pl-10">
            {/* track */}
            <div className="absolute left-[10px] top-2 h-full w-px bg-line sm:left-[14px]" />
            {/* animated progress */}
            <motion.div
              style={{ height: progressHeight }}
              className="absolute left-[10px] top-2 w-px bg-gradient-to-b from-accent via-accent2 to-transparent sm:left-[14px]"
            />

            <div className="flex flex-col gap-10">
              {timeline.map((item, i) => (
                <Reveal key={item.org} direction="up" delay={i * 0.05}>
                  <div className="group relative">
                    <span className="absolute -left-[30px] top-1.5 grid h-5 w-5 place-items-center rounded-full border border-line bg-bg sm:-left-[38px]">
                      <motion.span
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 + i * 0.05, type: "spring" }}
                        className="h-2.5 w-2.5 rounded-full bg-accent shadow-glow"
                      />
                    </span>
                    <div className="rounded-2xl border border-transparent p-1 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-line group-hover:bg-surface/40 group-hover:px-5 group-hover:py-4">
                      <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                        <p className="font-display text-lg font-semibold">
                          {item.org}
                        </p>
                        <span className="text-xs font-medium text-accent2">
                          {item.period}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-muted">{item.role}</p>
                      <p className="mt-2 text-sm leading-relaxed text-muted">
                        {item.blurb}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
