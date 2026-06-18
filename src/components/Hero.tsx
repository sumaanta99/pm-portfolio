"use client";

import dynamic from "next/dynamic";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { profile } from "@/lib/data";
import { MagneticButton } from "@/components/ui/MagneticButton";

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
});

const headline = ["Products", "that feel", "alive."];

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

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [reduceOnMobile, setReduceOnMobile] = useState(false);
  const [showScene, setShowScene] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const apply = () => setShowScene(media.matches);
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);
  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px), (pointer: coarse)");
    const apply = () => setReduceOnMobile(media.matches);
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);

  const lightweightMode = reduce || reduceOnMobile;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, lightweightMode ? 0 : 180]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const sceneScale = useTransform(scrollYProgress, [0, 1], [1, 1.25]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-[100svh] items-center overflow-hidden"
    >
      {/* gradient mesh background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/3 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-accent/20 blur-[120px]" />
        <div className="absolute right-0 top-1/4 h-80 w-80 rounded-full bg-accent2/15 blur-[100px]" />
        <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-accent/10 blur-[100px]" />
      </div>

      {/* 3D scene */}
      <motion.div
        style={{ scale: sceneScale }}
        className="pointer-events-none absolute right-0 top-0 -z-[5] hidden h-full w-full md:block md:w-3/5"
      >
        {showScene ? <HeroScene /> : null}
      </motion.div>

      <motion.div
        style={{ y, opacity }}
        className="relative mx-auto w-full max-w-6xl px-4 sm:px-6"
      >
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="mb-5 mt-20 inline-flex items-center gap-2 rounded-full border border-line bg-surface/40 px-3.5 py-2 text-[11px] font-medium tracking-wide text-muted backdrop-blur sm:mb-6 sm:mt-20 sm:px-4 sm:text-xs"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent2 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent2" />
          </span>
          {profile.tagline}
        </motion.span>

        <motion.h1
          variants={container}
          initial="hidden"
          animate="show"
          className="font-display text-[2.7rem] font-bold leading-[0.95] tracking-tight sm:text-6xl lg:text-8xl"
        >
          {headline.map((line, i) => (
            <span key={i} className="block overflow-hidden py-1">
              <motion.span
                variants={word}
                className={`inline-block ${i === 2 ? "gradient-text" : ""}`}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.7 }}
          className="mt-6 max-w-xl text-sm leading-relaxed text-muted sm:mt-7 sm:text-lg"
        >
          Hi, I&apos;m Sumaanta Munde. 👋
          <br />
          Product manager, software engineer, national powerlifting athlete and a
          home cook.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.15, duration: 0.6, type: "spring", bounce: 0.4 }}
          className="mt-8 flex flex-wrap items-center gap-3.5 sm:mt-9 sm:gap-4"
        >
          <MagneticButton href="#work" variant="primary">
            Review my work
            <ArrowIcon />
          </MagneticButton>
          <MagneticButton href={profile.socials.linkedin} variant="ghost">
            LinkedIn
          </MagneticButton>
          <MagneticButton href="#contact" variant="ghost">
            Let&apos;s build together
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* scroll prompt */}
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
