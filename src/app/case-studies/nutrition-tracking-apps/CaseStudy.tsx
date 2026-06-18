"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";

const ACCENT = "59 130 246";

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/50 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-muted">
      <span className="h-1.5 w-1.5 rounded-full bg-accent2" />
      {children}
    </span>
  );
}

function SectionTitle({ title }: { title: string }) {
  return (
    <div className="flex max-w-2xl flex-col gap-4">
      <Reveal direction="up">
        <Eyebrow>Case Study</Eyebrow>
      </Reveal>
      <Reveal direction="up" delay={0.08}>
        <h2 className="font-display text-2xl font-bold leading-tight tracking-tight sm:text-3xl md:text-4xl">
          {title}
        </h2>
      </Reveal>
    </div>
  );
}

function Prose({ paragraphs }: { paragraphs: string[] }) {
  return (
    <Reveal direction="up" delay={0.08}>
      <div className="mt-7 space-y-5">
        {paragraphs.map((p, i) => (
          <p key={i} className="text-[15px] leading-[1.9] text-ink/85">
            {p}
          </p>
        ))}
      </div>
    </Reveal>
  );
}

const stats = [
  { v: "2 days", l: "Active Napkin Math usage" },
  { v: "3 apps", l: "Compared side by side" },
  { v: "1 flow", l: "Photo -> AI -> calories" },
  { v: "1 key shift", l: "Lower logging resistance" },
];

const problem = [
  "Most people do not quit food tracking because they stop caring. They quit because logging is repetitive work.",
  "Typical flow is heavy: search foods, choose uncertain matches, estimate portions, and repeat after every meal.",
  "Many apps also feel punitive. Numeric overload and warning-heavy UI can increase dropout even when the data is accurate.",
  "The category challenge is behavior, not awareness. Users need a flow they will still use on busy weekdays.",
];

const napkinMath = [
  "I used Napkin Math for two days. The camera-first flow reduced the main friction point: manual search and entry.",
  "The fastest loop was consistent: take photo, get AI estimate, confirm calories. I logged meals immediately instead of batching later.",
  "That behavior change matters. In many trackers, delayed logging turns into backlog and then abandonment.",
  "The interface helped. Visual hierarchy is simple, and screens are less dense than traditional tracking apps.",
  "Referral rewards through photo filters matched the product loop better than generic invite prompts.",
  "Two-day conclusion: reducing entry friction increased logging consistency.",
];

const healthify = [
  "Healthify is optimized for coaching and accountability, not lightweight logging.",
  "Core value comes from plans, check-ins, and guided behavior change.",
  "Its local food context is a strong advantage for Indian users where generic global databases can be awkward.",
  "Compared with Napkin Math, Healthify is stronger for users who need structure and sustained guidance.",
];

const myFitnessPal = [
  "MyFitnessPal is strong on database depth and precision tracking.",
  "Longtime users stay because of history, routine familiarity, and reliable macro control.",
  "The trade-off is interaction weight. Logging is powerful but can feel labor-intensive for mainstream users.",
  "Retention is often driven by habit and accumulated history more than day-to-day product delight.",
];

const difference = [
  "This is less a feature race and more a product-positioning split.",
  "Napkin Math prioritizes low-friction entry, Healthify prioritizes guidance, and MyFitnessPal prioritizes precision control.",
  "All three approaches can work for different user states. The deciding factor is whether the daily logging action feels sustainable.",
];

const learned = [
  "Two days is a short window, but one result was clear: lower input friction increased real-time logging.",
  "The loop that worked was simple: photo, AI estimate, confirm calories, continue.",
  "For this category, sustained logging behavior is the main outcome. Database size matters, but repeated daily use matters more.",
];

export function CaseStudy() {
  return (
    <main className="relative mx-auto max-w-3xl px-6 pb-32 pt-28 sm:pt-32">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px] opacity-50 blur-3xl"
        style={{
          background: `radial-gradient(60% 60% at 50% 0%, rgb(${ACCENT} / 0.22), transparent 70%)`,
        }}
      />

      <Link
        href="/#case-studies"
        className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink"
      >
        <span>←</span>
        Back to case studies
      </Link>

      <header className="mt-8">
        <Reveal direction="up">
          <span
            className="rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide"
            style={{ color: `rgb(${ACCENT})`, background: `rgb(${ACCENT} / 0.14)` }}
          >
            Product essay · Nutrition tracking · 2026
          </span>
        </Reveal>
        <Reveal direction="up" delay={0.06}>
          <h1 className="mt-5 font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
            Napkin Math vs Healthify vs MyFitnessPal
          </h1>
        </Reveal>
        <Reveal direction="up" delay={0.12}>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            Notes after two days of active Napkin Math usage, with a direct
            comparison against Healthify and MyFitnessPal retention patterns.
          </p>
        </Reveal>
      </header>

      <section className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.l} direction="up" delay={0.05 * i}>
            <div className="h-full rounded-3xl border border-line bg-surface/60 p-5">
              <p className="font-display text-2xl font-bold" style={{ color: `rgb(${ACCENT})` }}>
                {s.v}
              </p>
              <p className="mt-1 text-xs leading-tight text-muted">{s.l}</p>
            </div>
          </Reveal>
        ))}
      </section>

      <section className="mt-20">
        <SectionTitle title="The Problem With Most Food Tracking Apps" />
        <Prose paragraphs={problem} />
      </section>

      <section className="mt-20">
        <SectionTitle title="Napkin Math: Low-Friction Logging in Practice" />
        <Prose paragraphs={napkinMath} />
      </section>

      <section className="mt-20">
        <SectionTitle title="Healthify: Solving a Different Problem" />
        <Prose paragraphs={healthify} />
      </section>

      <section className="mt-20">
        <SectionTitle title="MyFitnessPal: High-Control Tracking at Scale" />
        <Prose paragraphs={myFitnessPal} />
      </section>

      <section className="mt-20">
        <SectionTitle title="The Real Difference" />
        <Prose paragraphs={difference} />
      </section>

      <section className="mt-20">
        <SectionTitle title="What I Learned After Using Napkin Math" />
        <Prose paragraphs={learned} />
      </section>

      <section className="mt-24 rounded-4xl border border-line bg-surface/40 p-8 text-center sm:p-12">
        <p className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
          If logging is easier, consistency improves.
        </p>
        <p className="mx-auto mt-3 max-w-xl text-muted">
          That simple idea might be the most important product insight in this whole
          category.
        </p>
      </section>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-12 text-center text-xs text-muted"
      >
        Based on firsthand Napkin Math usage and product behavior observations.
      </motion.p>
    </main>
  );
}
