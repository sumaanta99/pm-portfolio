"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";

const ACCENT = "106 170 100"; // Wordle "correct" green

/* ------------------------------------------------------------------ */
/* Building blocks                                                     */
/* ------------------------------------------------------------------ */

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/50 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-muted">
      <span className="h-1.5 w-1.5 rounded-full bg-accent2" />
      {children}
    </span>
  );
}

function SectionTitle({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="flex max-w-2xl flex-col gap-4">
      <Reveal direction="up">
        <Eyebrow>{eyebrow}</Eyebrow>
      </Reveal>
      <Reveal direction="up" delay={0.08}>
        <h2 className="font-display text-2xl font-bold leading-tight tracking-tight sm:text-3xl md:text-4xl">
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal direction="up" delay={0.16}>
          <p className="text-base leading-relaxed text-muted">{description}</p>
        </Reveal>
      )}
    </div>
  );
}

function Prose({ paragraphs }: { paragraphs: string[] }) {
  return (
    <Reveal direction="up" delay={0.08}>
      <div className="mt-7 space-y-5">
        {paragraphs.map((p, i) => (
          <p key={i} className="text-[15px] leading-[1.85] text-ink/85">
            {p}
          </p>
        ))}
      </div>
    </Reveal>
  );
}

function Note({ children }: { children: React.ReactNode }) {
  return (
    <Reveal direction="up" delay={0.1}>
      <div
        className="mt-6 rounded-2xl border p-5 text-sm leading-relaxed"
        style={{
          borderColor: `rgb(${ACCENT} / 0.4)`,
          background: `rgb(${ACCENT} / 0.07)`,
        }}
      >
        <span
          className="mr-2 text-[11px] font-semibold uppercase tracking-[0.18em]"
          style={{ color: `rgb(${ACCENT})` }}
        >
          Source note
        </span>
        <span className="text-muted">{children}</span>
      </div>
    </Reveal>
  );
}

function PullQuote({ children }: { children: React.ReactNode }) {
  return (
    <Reveal direction="up" delay={0.1}>
      <blockquote className="mt-8 border-l-2 pl-6" style={{ borderColor: `rgb(${ACCENT})` }}>
        <p className="font-display text-xl font-medium leading-snug text-ink sm:text-2xl">
          {children}
        </p>
      </blockquote>
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
/* Data                                                               */
/* ------------------------------------------------------------------ */

const stats = [
  { v: "4.8B", l: "Wordle plays in 2022 (NYT)" },
  { v: "~11M", l: "NYT total subscribers (2024)" },
  { v: "1M", l: "Games subs before Wordle (2021)" },
  { v: "~$1M+", l: "Wordle purchase (low 7 figures)" },
];

const compare: [string, string, string][] = [
  ["How it makes money", "One recurring subscription, bundled with News, Cooking, Audio, The Athletic", "Ads + in-app purchases, including hint packs, coins, remove-ads, and level unlocks"],
  ["The number that matters", "Subscriber retention and churn", "ARPDAU, ad impressions per session, IAP conversion rate"],
  ["In-game friction", "Zero ads, no mid-puzzle paywall, no energy gate", "Interstitial + rewarded ads, coin gates, lives/energy systems"],
  ["Content cadence", "One puzzle per game per day, deliberately scarce", "Hundreds to thousands of levels, always-on, infinite"],
  ["The moat", "Brand, editorial quality, the bundle", "User-acquisition efficiency, LiveOps, content volume"],
  ["Growth engine", "Organic word-of-mouth and share grids", "Paid UA across ad networks"],
];

const ctx = [
  "I play Wordle, Connections, the Mini crossword, and Spelling Bee most mornings. That routine explains the product strategy better than any slide. NYT Games is built around repeat daily use.",
  "NYT Games is The New York Times puzzle business. The Crossword is the anchor, and the modern phase started in 2014 when the Times launched a standalone digital Crossword subscription. That proved puzzles could drive direct paid demand.",
  "The portfolio expanded with the Mini, Spelling Bee, Letter Boxed, Tiles, Vertex, and Sudoku. Wordle was acquired in January 2022, Connections launched in June 2023, and Strands followed in 2024.",
  "The business scale is significant. NYT said Games passed one million subscriptions in 2021 before Wordle. Wordle logged 4.8 billion plays in 2022. The Times has roughly 11 million total subscribers and a public target of 15 million by 2027. Games supports that goal with Cooking, Audio, and The Athletic.",
];

const model = [
  "NYT does not monetize each game session directly. There are no ads, hint packs, coin packs, or remove-ads offers inside the core loop. Revenue comes from subscriptions, including bundles with News, Cooking, Wirecutter, The Athletic, Audio, and Games.",
  "Most mobile word games run a free-to-play model. Revenue comes from ad impressions and a small share of players buying hints, coins, or ad-free access. That pushes teams to increase monetizable sessions.",
  "These models create different incentives. In ad-supported games, teams optimize for ad yield and conversion to in-app purchases. In NYT Games, teams optimize for habit strength and lower churn across the broader subscription bundle.",
  "The unit-economics implications are direct. Free-to-play LTV is sensitive to churn and ad demand. NYT LTV is tied to recurring subscription revenue. In that setup, protecting daily habit and reducing cancellation risk is the central product objective.",
  "This incentive design explains the player experience. Fewer monetization interruptions increase completion quality and make daily return behavior easier to sustain.",
];

const product = [
  "The daily puzzle format is core product design. Users get one puzzle per game per day. That creates a repeat cadence tied to the day, not long binge sessions.",
  "Streaks reinforce that cadence. Wordle and Spelling Bee make progress visible and create a clear cost to skipping a day. This supports return frequency without adding reward currencies or login bonuses.",
  "The share grid is the strongest growth mechanic in the portfolio. It communicates performance without spoilers and encourages social posting. That turns regular players into a low-cost distribution channel for the next day.",
  "The in-game experience has low friction. There are no ad breaks or coin prompts during completion. This keeps solve quality high and protects the habit loop.",
  "Portfolio design spreads retention risk across game types. Wordle pulls broad top-of-funnel traffic, while Crossword and Spelling Bee anchor deeper daily engagement. Connections, Mini, and Strands expand session variety.",
  "Cross-promotion serves subscription retention. The goal is to increase games played per subscriber, which reduces cancellation risk over time.",
];

const growth = [
  "Wordle grew from about 90 players on Nov 1, 2021 to roughly 300,000 by early Jan 2022, then reached millions within days. The key driver was social sharing, not paid acquisition.",
  "This was a coordinated social effect. Everyone solved the same daily word, conversations happened on the same timeline, and those conversations became distribution.",
  "NYT acquired Wordle in January 2022 for a low seven-figure price and kept the core loop simple. The game stayed free while migration to NYT systems happened gradually.",
  "The acquisition value came from funnel impact, not direct Wordle revenue. Organic traffic entered a larger subscription ecosystem where repeat puzzle behavior could convert and retain paying users.",
  "The practical lesson is conversion readiness. Viral attention only matters if the product has a clear path from engagement to durable revenue.",
];

const metrics = [
  "Public data is incomplete. NYT does not publish full Games DAU, retention curves, or per-title LTV, so conclusions here combine filings, NYT statements, and observed product behavior.",
  "Engagement signal is strong. NYT reported 4.8 billion Wordle plays in 2022. The company also said Connections became its second-most-played game soon after launch. Session length is short, but frequency is high and daily.",
  "Monetization logic differs by model. Free-to-play titles depend on ARPDAU and ad yield per session. NYT relies on subscription revenue allocated across the bundle. Per-user economics and optimization targets are therefore different.",
  "Retention is likely the main structural advantage for NYT. Daily habit loops plus portfolio breadth reduce dependence on constant paid reacquisition.",
  "What transfers well: daily appointment design, visible streaks, and spoiler-safe sharing. What does not transfer directly: the bundle-based subscription model.",
];

const take = [
  "NYT's approach works because it operates inside a trusted paid bundle with pricing power. Most game studios do not have that context.",
  "Keeping Wordle free after acquisition made strategic sense because it fed a broader subscription funnel. For teams without that funnel, the same choice would be hard to sustain.",
  "Free-to-play teams should not copy the monetization structure directly. They can still copy the habit design discipline: protect the solve moment, reduce friction, and optimize for daily return behavior.",
  "The most portable mechanic is the spoiler-safe share artifact linked to one synchronized daily puzzle. It is low cost, easy to test, and can improve organic growth.",
];

const sources = [
  "NYT Company public statements & year-in-review posts (Wordle ~4.8B plays in 2022; Games passing 1M subscriptions in 2021; Connections as #2 most-played game).",
  "NYT acquisition announcement for Wordle, January 2022 (price described as the low seven figures).",
  "Josh Wardle's reported player counts (~90 on Nov 1 2021, ~300k early Jan 2022, millions within weeks).",
  "NYT subscriber totals (~11M, 2024) and the publicly stated 15M-by-2027 goal.",
  "Casual-games ARPDAU ranges are industry rules of thumb, not official disclosures. Treat as directional.",
];

/* ------------------------------------------------------------------ */
/* Page                                                               */
/* ------------------------------------------------------------------ */

export function CaseStudy() {
  return (
    <main className="relative mx-auto max-w-3xl px-4 pb-24 pt-24 sm:px-6 sm:pb-32 sm:pt-32">
      {/* ambient glow */}
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

      {/* hero */}
      <header className="mt-8">
        <Reveal direction="up">
          <span
            className="rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide"
            style={{ color: `rgb(${ACCENT})`, background: `rgb(${ACCENT} / 0.14)` }}
          >
            Strategy teardown · Word games · 2026
          </span>
        </Reveal>
        <Reveal direction="up" delay={0.06}>
          <h1 className="mt-5 font-display text-3xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
            NYT Games: Why Subscription Changes Product Decisions
          </h1>
        </Reveal>
        <Reveal direction="up" delay={0.12}>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            A product teardown of how The New York Times uses daily puzzle habits
            to support subscription retention, and which parts are transferable
            to free-to-play teams.
          </p>
        </Reveal>

        <Reveal direction="up" delay={0.18}>
          <dl className="mt-8 grid grid-cols-2 gap-x-8 gap-y-4 border-t border-line pt-6 sm:grid-cols-4">
            {[
              ["Format", "Strategy teardown"],
              ["Lens", "PM / growth"],
              ["Focus", "Subscription vs. F2P"],
              ["Sources", "Public data only"],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="text-[11px] uppercase tracking-[0.18em] text-muted">{k}</dt>
                <dd className="mt-1 text-sm font-medium text-ink">{v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </header>

      {/* stat strip */}
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

      {/* 1. Context */}
      <section className="mt-20">
        <SectionTitle
          eyebrow="01 · Context"
          title="What NYT Games actually is"
        />
        <Prose paragraphs={ctx} />
      </section>

      {/* 2. Business model */}
      <section className="mt-20">
        <SectionTitle
          eyebrow="02 · The business model choice"
          title="They monetize the habit"
        />
        <Prose paragraphs={model} />
        <PullQuote>
          When your revenue is a monthly subscription, your only job is to make
          people not cancel.
        </PullQuote>

        {/* comparison table */}
        <Reveal direction="up" delay={0.1}>
          <div className="mt-10 overflow-x-auto rounded-3xl border border-line" data-lenis-prevent>
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="bg-surface/60 text-xs uppercase tracking-wide text-muted">
                <tr>
                  <th className="px-5 py-3 font-medium"> </th>
                  <th className="px-5 py-3 font-medium" style={{ color: `rgb(${ACCENT})` }}>
                    NYT Games (subscription)
                  </th>
                  <th className="px-5 py-3 font-medium">F2P word games (ads + IAP)</th>
                </tr>
              </thead>
              <tbody>
                {compare.map((row) => (
                  <tr key={row[0]} className="border-t border-line align-top">
                    <td className="px-5 py-3 font-medium text-ink">{row[0]}</td>
                    <td className="px-5 py-3 text-muted">{row[1]}</td>
                    <td className="px-5 py-3 text-muted">{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </section>

      {/* 3. Product strategy */}
      <section className="mt-20">
        <SectionTitle
          eyebrow="03 · Product strategy & retention"
          title="Scarcity, streaks, and a share grid"
          description="The mechanics that create a daily return loop and reduce churn."
        />
        <Prose paragraphs={product} />
      </section>

      {/* 4. Acquisition & growth */}
      <section className="mt-20">
        <SectionTitle
          eyebrow="04 · Acquisition & growth"
          title="Organic growth driven by sharing"
        />
        <Prose paragraphs={growth} />
        <Note>
          Wordle player-count milestones come from Josh Wardle&apos;s public
          interviews; the ~$1M+ purchase price is NYT&apos;s own &quot;low seven
          figures&quot; description. Treat exact weekly counts as approximate.
        </Note>
      </section>

      {/* 5. Metrics & insights */}
      <section className="mt-20">
        <SectionTitle
          eyebrow="05 · Key metrics & insights"
          title="What the numbers do (and don't) tell us"
        />
        <Prose paragraphs={metrics} />
      </section>

      {/* 6. My take */}
      <section className="mt-20">
        <SectionTitle
          eyebrow="06 · My take"
          title="Copy the obsession, not the business model"
        />
        <Prose paragraphs={take} />
      </section>

      {/* Sources */}
      <section className="mt-20">
        <SectionTitle eyebrow="Sources & assumptions" title="Where these numbers come from" />
        <Reveal direction="up" delay={0.08}>
          <ul className="mt-7 space-y-3">
            {sources.map((s) => (
              <li key={s} className="flex gap-3 text-sm leading-relaxed text-muted">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: `rgb(${ACCENT})` }} />
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      {/* CTA */}
      <section className="mt-24 rounded-4xl border border-line bg-surface/40 p-8 text-center sm:p-12">
        <p className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
          Want to talk word games?
        </p>
        <p className="mx-auto mt-3 max-w-xl text-muted">
          I think about retention design, daily-habit loops, and the line between
          subscription and free-to-play often. Happy to discuss in detail.
        </p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/#contact"
            className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-white shadow-glow transition-transform hover:scale-105"
          >
            Get in touch
          </Link>
          <Link
            href="/#case-studies"
            className="rounded-full border border-line px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-accent/60 hover:text-accent"
          >
            ← Back to case studies
          </Link>
        </div>
      </section>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-12 text-center text-xs text-muted"
      >
        Prepared by Sumaanta Munde. Independent teardown using public data.
      </motion.p>
    </main>
  );
}
