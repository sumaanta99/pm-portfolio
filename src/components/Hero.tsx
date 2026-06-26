"use client";

import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { profile } from "@/lib/data";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useMobileLightweight } from "@/hooks/useMobileLightweight";

const headline = ["Products", "people want", "to use."];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.3 } },
};

const word = {
  hidden: { y: "110%", opacity: 0 },
  show: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const HeroScene = dynamic(
  () => import("@/components/three/HeroScene").then((mod) => mod.HeroScene),
  { ssr: false }
);

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const lightweightMode = useMobileLightweight();

  const headlineContainer = lightweightMode
    ? { hidden: {}, show: { transition: { staggerChildren: 0.04 } } }
    : container;
  const headlineWord = lightweightMode
    ? {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { duration: 0.3, ease: "easeOut" } },
      }
    : word;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, lightweightMode ? 0 : 180]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, lightweightMode ? 1 : 0]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-[100svh] items-start overflow-hidden py-24 sm:items-center sm:py-0"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/3 hidden h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-accent/20 blur-[120px] md:block" />
        <div className="absolute right-0 top-1/4 hidden h-80 w-80 rounded-full bg-accent2/15 blur-[100px] md:block" />
        <div className="absolute bottom-0 left-0 hidden h-72 w-72 rounded-full bg-accent/10 blur-[100px] md:block" />
        <div className="hero-glow-mobile md:hidden" />
      </div>

      <motion.div
        style={lightweightMode ? undefined : { y, opacity }}
        className="relative mx-auto grid w-full max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,30rem)] lg:gap-14"
      >
        <div className="max-w-2xl">
          <motion.span
            initial={{ opacity: 0, y: lightweightMode ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: lightweightMode ? 0 : 0.15,
              duration: lightweightMode ? 0.3 : 0.6,
            }}
            className="mb-4 mt-6 inline-flex items-center gap-2 rounded-full border border-line bg-surface/90 px-3.5 py-2 text-[11px] font-medium tracking-wide text-muted sm:mb-6 sm:mt-20 sm:bg-surface/40 sm:px-4 sm:text-xs sm:backdrop-blur"
          >
            <span className="relative flex h-2 w-2">
              {!lightweightMode && (
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent2 opacity-75" />
              )}
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent2" />
            </span>
            {profile.tagline}
          </motion.span>

          <motion.h1
            variants={headlineContainer}
            initial="hidden"
            animate="show"
            className="font-display text-[2.45rem] font-bold leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl xl:text-8xl"
          >
            {headline.map((line, i) => (
              <span key={i} className="block overflow-hidden py-1">
                <motion.span
                  variants={headlineWord}
                  className={`inline-block ${i === 2 ? "gradient-text" : ""}`}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: lightweightMode ? 0 : 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: lightweightMode ? 0.08 : 0.9,
              duration: lightweightMode ? 0.3 : 0.7,
            }}
            className="mt-5 max-w-xl text-sm leading-relaxed text-muted sm:mt-7 sm:text-lg"
          >
            Hi, I&apos;m Sumaanta Munde. 👋
            <br />
            Product manager, software engineer, national powerlifting athlete and a
            home cook.
            <br />
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: lightweightMode ? 0 : 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={
              lightweightMode
                ? { delay: 0.12, duration: 0.3 }
                : { delay: 1.15, duration: 0.6, type: "spring", bounce: 0.4 }
            }
            className="mt-7 flex flex-col items-stretch gap-3 sm:mt-9 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4"
          >
            <MagneticButton href="#work" variant="primary" className="w-full sm:w-auto">
              Review my work
              <ArrowIcon />
            </MagneticButton>
            <MagneticButton
              href={profile.socials.linkedin}
              variant="ghost"
              className="w-full sm:w-auto"
            >
              LinkedIn
            </MagneticButton>
            <MagneticButton href="#contact" variant="ghost" className="w-full sm:w-auto">
              Let&apos;s build together
            </MagneticButton>
          </motion.div>
        </div>

        {!lightweightMode && (
          <div className="relative hidden lg:block">
            <HeroScene />
          </div>
        )}
      </motion.div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-muted sm:flex"
      >
        <span className="text-[11px] uppercase tracking-[0.25em]">Scroll</span>
        <span className="flex h-9 w-5 justify-center rounded-full border border-line p-1">
          <motion.span
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="h-1.5 w-1.5 rounded-full bg-accent"
          />
        </span>
      </motion.a>
    </section>
  );
}

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
