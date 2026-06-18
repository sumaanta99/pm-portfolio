"use client";

import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";

const ACCENT = "176 30 38";

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

function BulletList({ items }: { items: string[] }) {
  return (
    <Reveal direction="up" delay={0.08}>
      <ul className="mt-7 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-[15px] leading-relaxed text-ink/85">
            <span
              className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
              style={{ background: `rgb(${ACCENT})` }}
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}

const executiveSummary = [
  "Rapido launched 'Bikes Rated by Women' to reduce booking hesitation among women riders without waiting for long-cycle supply changes.",
  "The feature converts existing women-rider safety feedback into a visible booking-time signal: captains with consistently positive safety feedback from women are grouped under a separate bike option.",
  "The strategy is demand-side. It keeps fare unchanged, avoids new onboarding workflows, and uses current data and dispatch infrastructure to improve trust at the exact point where riders decide whether to book or leave.",
];

const userProblem = [
  "The core problem is uncertainty before confirmation: women riders do not know if the assigned captain will feel safe to ride with.",
  "The affected users are women passengers booking bike taxis, especially for late-hour trips, unfamiliar routes, or locations with lower perceived safety.",
  "Behavioral evidence typically shows up as mode switching to autos or cabs despite higher fares, increased cancellation before or shortly after captain assignment, and longer decision time on the booking screen.",
  "From a funnel perspective, this is avoidable leakage at the final decision point after demand intent is already established.",
];

const whyExistingSolutionsFallShort = [
  "More women captains is a structurally important solution but slow in practice: recruitment, verification, onboarding, and city-level density take time before riders feel impact.",
  "Safety campaigns can improve brand perception, but they are broad messages and do not change uncertainty for a rider choosing a specific captain in a specific moment.",
  "Standard ratings systems aggregate all riders and all dimensions. They rarely isolate safety-relevant signals for women at booking time, which limits decision utility.",
  "Customer support interventions are post-incident controls. They matter for recovery and accountability, but they do not reduce pre-ride anxiety during selection.",
  "Each alternative has value, but none provides fast, visible, trip-level trust information inside the booking flow.",
];

const productInsight = [
  "The likely insight was that Rapido already had underused behavioral data from women riders who report whether they felt safe during or after a ride.",
  "Women riders are likely to treat women-specific feedback as more diagnostic for their own risk than global captain ratings averaged across all riders.",
  "That makes this a signal design problem, not a data collection problem: capture exists, but relevance was not surfaced where decisions happen.",
];

const featureDesign = [
  "Safety feedback collection: women passengers are prompted during or after rides with a direct safety question, and unsafe experiences can be tagged with reasons such as rash driving, harassment, extra-money demands, dirty helmet, or other concerns.",
  "Classification logic: captains are scored on consistency and recency of women-reported safety outcomes, with minimum-volume thresholds so sparse or noisy data does not overfit ranking.",
  "Trust signal generation: captains meeting threshold quality are grouped into the 'Bikes Rated by Women' pool, creating a clear and bounded label rather than exposing raw moderation complexity.",
  "Ride selection experience: the signal appears as a booking option at fare parity with regular bikes, reducing cognitive load by letting users choose reassurance without evaluating trade-offs in price.",
  "Booking-time placement matters because it targets the exact moment of decision anxiety; surfacing the signal after assignment would miss the primary conversion barrier.",
];

const marketplaceThinking = [
  "Rapido solved a trust constraint without changing supply composition. The number of available captains stays constant; matching logic changes how confidence is distributed.",
  "This protects marketplace liquidity because the feature does not remove captains from the system or create an entirely separate fleet with low utilization.",
  "Supply constraints remain real, but the feature improves marketplace efficiency by reallocating high-trust captains to riders with higher trust sensitivity.",
  "The move also reuses an existing data asset. Instead of collecting new operational inputs, the team repackages current safety telemetry into a booking decision layer.",
  "In marketplace terms, the feature increases conversion quality on the demand side while long-term supply-side programs continue independently.",
];

const userPsychology = [
  "Perceived safety drives behavior even when objective ride parameters are unchanged. A trusted label can reduce subjective risk enough to convert intent into action.",
  "Decision anxiety is highest when uncertainty is personal and irreversible for that trip. A women-specific signal narrows uncertainty from abstract to comparable peer experience.",
  "Social proof works here through relevance, not volume. Feedback from a similar user group is likely weighted more heavily than large but generic ratings.",
  "Trust transfer occurs from prior women-rider experiences to the next rider through the product surface. The system turns private post-ride outcomes into public pre-ride confidence.",
  "Choice architecture is deliberate: keeping price constant and exposing a clear alternative reduces decision friction and prevents users from needing to infer safety from weak proxies.",
];

const successMetrics = [
  "Bike booking conversion rate among women: primary metric to confirm whether the trust signal changes booking decisions.",
  "Ride completion rate and cancellation rate among women: validate whether confidence persists after assignment, not only at tap-to-book.",
  "Time-to-book: measure whether the feature reduces hesitation and decision latency on the bike selector.",
  "Repeat usage among women (7-day and 30-day): indicates whether trust improvement is persistent rather than novelty-driven.",
  "NPS and women-reported safety ratings post-ride: checks experience quality and ensures the signal aligns with actual outcomes.",
  "Share of women choosing bike versus auto/cab for comparable routes: tests whether the feature shifts mode mix, not just channel-level conversion.",
];

const risksAndEdgeCases = [
  "Cold-start captains: new captains may have insufficient women-rider data and can be excluded by default, which may delay fair exposure.",
  "Rating manipulation: coordinated behavior, false positives, or malicious reporting can distort classification if abuse checks are weak.",
  "Sparse data environments: smaller cities or low women-rider volume windows may produce unstable confidence and inconsistent availability.",
  "Regional variation: safety expectations and reporting patterns differ by city, so one threshold model can underperform across markets.",
  "Fairness concerns: a women-only trust label can indirectly penalize captains with low eligible volume or historically biased feedback distributions.",
];

const productOpportunities = [
  "Add confidence explainability in plain language (for example, recent women-rider safety consistency over a defined sample window).",
  "Expose confidence indicators when data is thin so users understand when the signal is strong versus provisional.",
  "Introduce personalized matching that weighs rider history (time, route, cancellation sensitivity) against trusted-captain availability.",
  "Expand from binary label to tiered safety badges with clear qualification criteria and periodic revalidation.",
  "Build proactive quality coaching for captains based on recurring unsafe tags to improve supply quality, not only demand filtering.",
];

const productLessons = [
  "Behavioral data becomes strategic when placed at the decision point where users hesitate.",
  "In marketplaces, solving trust bottlenecks on the demand side can deliver faster impact than waiting for supply-side structural fixes.",
  "User anxiety is a product variable that should be designed explicitly, measured directly, and tied to funnel outcomes.",
  "High-leverage features often come from repackaging existing data and flows rather than introducing heavy operational layers.",
  "Good PM decisions separate immediate conversion interventions from long-term structural bets and run both in parallel.",
];

export function CaseStudy() {
  return (
    <main className="relative mx-auto max-w-3xl px-4 pb-24 pt-24 sm:px-6 sm:pb-32 sm:pt-32">
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
            Product analysis · Marketplace trust · 2026
          </span>
        </Reveal>
        <Reveal direction="up" delay={0.06}>
          <h1 className="mt-5 font-display text-3xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
            Rapido&apos;s &apos;Bikes Rated by Women&apos;: A PM Case Analysis
          </h1>
        </Reveal>
        <Reveal direction="up" delay={0.12}>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            Reverse-engineering how Rapido used existing women-rider feedback to reduce booking
            uncertainty, improve conversion, and preserve marketplace efficiency.
          </p>
        </Reveal>
      </header>

      <section className="mt-20">
        <SectionTitle
          eyebrow="01 · Executive Summary"
          title="Executive Summary"
        />
        <Prose paragraphs={executiveSummary} />
      </section>

      <section className="mt-20">
        <SectionTitle eyebrow="02 · User Problem" title="User Problem" />
        <Prose paragraphs={userProblem} />
      </section>

      <section className="mt-20">
        <SectionTitle
          eyebrow="03 · Why Existing Solutions Fall Short"
          title="Why Existing Solutions Fall Short"
        />
        <Prose paragraphs={whyExistingSolutionsFallShort} />
      </section>

      <section className="mt-20">
        <SectionTitle eyebrow="04 · Product Insight" title="Product Insight" />
        <Prose paragraphs={productInsight} />
      </section>

      <section className="mt-20">
        <SectionTitle eyebrow="05 · Feature Design" title="Feature Design" />
        <Prose paragraphs={featureDesign} />
      </section>

      <section className="mt-20">
        <SectionTitle
          eyebrow="06 · Marketplace Thinking"
          title="Marketplace Thinking"
        />
        <Prose paragraphs={marketplaceThinking} />
      </section>

      <section className="mt-20">
        <SectionTitle eyebrow="07 · User Psychology" title="User Psychology" />
        <Prose paragraphs={userPsychology} />
      </section>

      <section className="mt-20">
        <SectionTitle eyebrow="08 · Success Metrics" title="Success Metrics" />
        <BulletList items={successMetrics} />
      </section>

      <section className="mt-20">
        <SectionTitle eyebrow="09 · Risks & Edge Cases" title="Risks & Edge Cases" />
        <BulletList items={risksAndEdgeCases} />
      </section>

      <section className="mt-20">
        <SectionTitle eyebrow="10 · Product Opportunities" title="Product Opportunities" />
        <BulletList items={productOpportunities} />
      </section>

      <section className="mt-20">
        <SectionTitle eyebrow="11 · Product Lessons" title="Product Lessons" />
        <BulletList items={productLessons} />
      </section>

      <section className="mt-24 rounded-4xl border border-line bg-surface/40 p-8 text-center sm:p-12">
        <p className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
          Need this turned into an experiment spec?
        </p>
        <p className="mx-auto mt-3 max-w-xl text-muted">
          This analysis can be mapped to a rollout plan with hypotheses, instrumentation, and
          guardrails by city and rider cohort.
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

      <p className="mt-12 text-center text-xs text-muted">
        Independent product analysis using public information.
      </p>
    </main>
  );
}
