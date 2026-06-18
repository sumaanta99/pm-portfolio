"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";

const ACCENT = "124 108 255"; // Port indigo-violet

/* ------------------------------------------------------------------ */
/* Small building blocks                                              */
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

/* ------------------------------------------------------------------ */
/* Phone mockup                                                        */
/* ------------------------------------------------------------------ */

function Phone({
  step,
  title,
  children,
}: {
  step: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-[230px] shrink-0 flex-col gap-3">
      <div className="relative mx-auto h-[440px] w-[218px] rounded-[2.2rem] border border-line bg-surface p-2.5 shadow-lift">
        {/* notch */}
        <div className="absolute left-1/2 top-2 z-10 h-1.5 w-16 -translate-x-1/2 rounded-full bg-line" />
        <div className="flex h-full flex-col overflow-hidden rounded-[1.7rem] bg-bg">
          {/* app bar */}
          <div className="flex items-center gap-2 border-b border-line px-3 py-2.5">
            <span className="text-muted">‹</span>
            <span className="grid h-6 w-6 place-items-center rounded-full bg-accent/15 text-[10px] font-bold text-accent">
              P
            </span>
            <span className="text-xs font-medium text-ink">Port</span>
          </div>
          {/* body */}
          <div className="flex flex-1 flex-col gap-2 px-3 py-3 text-[11px] leading-snug">
            {children}
          </div>
        </div>
      </div>
      <div className="text-center">
        <span className="text-[11px] font-semibold text-accent">{step}</span>
        <p className="mt-0.5 text-xs text-muted">{title}</p>
      </div>
    </div>
  );
}

function Bubble({
  side = "in",
  children,
  tone = "default",
}: {
  side?: "in" | "out";
  children: React.ReactNode;
  tone?: "default" | "info" | "accent" | "success";
}) {
  const toneClass =
    tone === "info"
      ? "border border-dashed border-line bg-surface/60 text-muted"
      : tone === "accent"
      ? "bg-accent/15 text-ink border border-accent/30"
      : tone === "success"
      ? "bg-accent2/15 text-ink border border-accent2/30"
      : side === "out"
      ? "bg-accent text-white"
      : "bg-elevated text-ink border border-line";
  return (
    <div className={side === "out" ? "flex justify-end" : "flex justify-start"}>
      <div className={`max-w-[88%] rounded-2xl px-2.5 py-1.5 ${toneClass}`}>
        {children}
      </div>
    </div>
  );
}

function MiniBtn({ children, primary }: { children: React.ReactNode; primary?: boolean }) {
  return (
    <span
      className={`inline-block rounded-full px-2.5 py-1 text-[10px] font-semibold ${
        primary ? "bg-accent text-white" : "border border-line text-muted"
      }`}
    >
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Flow step                                                           */
/* ------------------------------------------------------------------ */

function FlowNode({
  n,
  title,
  desc,
  tone = "default",
}: {
  n: string;
  title: string;
  desc: string;
  tone?: "default" | "gate" | "success";
}) {
  const ring =
    tone === "gate"
      ? "border-accent2/50 bg-accent2/10"
      : tone === "success"
      ? "border-accent/50 bg-accent/10"
      : "border-line bg-surface/60";
  return (
    <div className={`relative rounded-2xl border ${ring} p-4`}>
      <span className="font-display text-xs font-bold text-accent">{n}</span>
      <h4 className="mt-1 text-sm font-semibold text-ink">{title}</h4>
      <p className="mt-1 text-xs leading-relaxed text-muted">{desc}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

const metrics = [
  { v: "14,000+", l: "Active users (app)" },
  { v: "3,000+", l: "Msgs/day, personal" },
  { v: "Top 3", l: "Post-launch feature" },
  { v: "0", l: "Identity leaks by design" },
];

const decisions = [
  {
    t: "Consent owned by the subject",
    d: "Nothing about the person being shared is exposed until they explicitly approve. Consent is controlled by the subject, not the sharer.",
    trade: "More friction (an approval round-trip) for an unbreakable privacy promise.",
  },
  {
    t: "Permission-gated, opt-in by default",
    d: "Sharing only proceeds if the subject has the contactSharing permission enabled. Privacy is the default state; sharing is something you allow.",
    trade: "Some requests end without completion, but users stay in control.",
  },
  {
    t: "Fresh single-use connection bundle",
    d: "On approval, the system mints a new single-use 'Port' bundle instead of reusing a stable identity, so we never over-expose someone across shares.",
    trade: "More bundles to generate vs. reusing one identifier.",
  },
  {
    t: "Honest, upfront feedback",
    d: "The recipient chat shows a request-in-progress message that may resolve to decline or disabled sharing. This avoids silent failure.",
    trade: "Reveals a request exists, but never the subject's identity.",
  },
];

const personas = [
  {
    name: "The Connector",
    sub: "initiates the intro",
    d: "Socially active user who wants to introduce two people in their network. High intent, wants it effortless.",
  },
  {
    name: "The Subject",
    sub: "is being shared, and approves",
    d: "Privacy-conscious. Must retain full control over whether their connection is handed to a stranger; may have sharing off entirely.",
  },
  {
    name: "The Recipient",
    sub: "receives the intro",
    d: "Should receive a working connection to the subject and be able to start a chat immediately on approval.",
  },
];

const goals = [
  ["No privacy regression", "0 identity leaks; always consent-gated", "Hard requirement"],
  ["Real, used feature", "Share requests initiated / week", "Adoption"],
  ["Intros → connections", "Request → approved → connected rate", "Funnel health"],
  ["Soft distribution", "New connections from sharing", "Network growth"],
];

const acceptance = [
  "Subject's identity is never revealed until they approve.",
  "If contactSharing is off, no bundle is generated and nothing is shared.",
  "On approval, a fresh single-use bundle is generated (no identity reuse).",
  "Recipient sees an info message on request, updated to 'shared' on completion.",
  "A request cannot be approved twice (idempotent); double-approval is rejected.",
  "Missing or expired messages produce explicit handled errors, with no partial completion state.",
  "Works on Android & iOS with no critical launch failures.",
];

const edges = [
  ["Subject has sharing disabled", "No bundle; recipient info note explains it may be off"],
  ["Subject ignores request", "Stays pending; nothing leaks"],
  ["Double approval", "Rejected: 'request already approved'"],
  ["Underlying request message missing", "Explicit error; flow aborts cleanly"],
  ["Recipient info message lost", "Explicit error; no false 'shared' state"],
];

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export function CaseStudy() {
  return (
    <main className="relative mx-auto max-w-5xl px-4 pb-24 pt-24 sm:px-6 sm:pb-32 sm:pt-32">
      {/* ambient glow */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px] opacity-50 blur-3xl"
        style={{
          background: `radial-gradient(60% 60% at 50% 0%, rgb(${ACCENT} / 0.22), transparent 70%)`,
        }}
      />

      {/* back link */}
      <Link
        href="/#work"
        className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink"
      >
        <span className="transition-transform group-hover:-translate-x-1">←</span>
        Back to work
      </Link>

      {/* hero */}
      <header className="mt-8">
        <Reveal direction="up">
          <span
            className="rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide"
            style={{ color: `rgb(${ACCENT})`, background: `rgb(${ACCENT} / 0.14)` }}
          >
            Product Work · Port · 2024
          </span>
        </Reveal>
        <Reveal direction="up" delay={0.06}>
          <h1 className="mt-5 max-w-3xl font-display text-3xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
            Consent-driven contact sharing
          </h1>
        </Reveal>
        <Reveal direction="up" delay={0.12}>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
            Letting users introduce their contacts to each other on a privacy-first
            messenger, without exposing someone&apos;s identity without their
            explicit consent.
          </p>
        </Reveal>

        <Reveal direction="up" delay={0.18}>
          <dl className="mt-8 grid grid-cols-2 gap-x-8 gap-y-4 border-t border-line pt-6 sm:grid-cols-4">
            {[
              ["Role", "Founding Engineer → PM"],
              ["Scope", "Discovery → launch"],
              ["Platforms", "Android & iOS"],
              ["Type", "Initial feature launch"],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="text-[11px] uppercase tracking-[0.18em] text-muted">{k}</dt>
                <dd className="mt-1 text-sm font-medium text-ink">{v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </header>

      {/* metrics */}
      <section className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {metrics.map((m, i) => (
          <Reveal key={m.l} direction="up" delay={0.05 * i}>
            <div className="rounded-3xl border border-line bg-surface/60 p-5">
              <p className="font-display text-2xl font-bold" style={{ color: `rgb(${ACCENT})` }}>
                {m.v}
              </p>
              <p className="mt-1 text-xs leading-tight text-muted">{m.l}</p>
            </div>
          </Reveal>
        ))}
      </section>

      {/* TL;DR */}
      <section className="mt-20">
        <SectionTitle eyebrow="TL;DR" title="Overview" />
        <Reveal direction="up" delay={0.1}>
          <div className="mt-6 rounded-3xl border border-line bg-surface/40 p-6 sm:p-8">
            <p className="text-[15px] leading-relaxed text-ink/90">
              Users wanted to introduce their contacts to each other (&quot;you two should
              connect&quot;). On a normal messenger you forward a number, but Port
              has no phone numbers or stable identities, so the obvious solution would
              have leaked a person&apos;s connection to a stranger. I shipped a{" "}
              <strong className="text-ink">three-party, consent-driven flow</strong>: the
              person being shared must approve, sharing is gated behind an explicit
              permission, and the introduction is delivered as a fresh single-use
              connection bundle. The result is a feature that supports user growth
              while preserving Port&apos;s privacy model.
            </p>
          </div>
        </Reveal>
      </section>

      {/* Problem */}
      <section className="mt-20">
        <SectionTitle
          eyebrow="Problem"
          title="A privacy model that broke the obvious solution"
          description="Port is built on a privacy-first model: no phone numbers, no global IDs, and no searchable directory. Connections form through cryptographic 'Ports' instead of lookup-based identity."
        />
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            ["The behavior", "Approaching 14k users, we saw repeated requests to introduce two contacts to each other."],
            ["The constraint", "You can't forward a number (there are none), and you can't expose a contact's identity to a third party without consent without breaking the trust promise."],
            ["The friction", "Users manually described contacts in chat, which created avoidable friction and incomplete introductions."],
          ].map(([t, d], i) => (
            <Reveal key={t} direction="up" delay={0.06 * i}>
              <div className="h-full rounded-3xl border border-line bg-surface/40 p-6">
                <h4 className="text-sm font-semibold text-ink">{t}</h4>
                <p className="mt-2 text-sm leading-relaxed text-muted">{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal direction="up" delay={0.1}>
          <div
            className="mt-6 rounded-3xl border p-6 sm:p-8"
            style={{ borderColor: `rgb(${ACCENT} / 0.4)`, background: `rgb(${ACCENT} / 0.07)` }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
              Problem statement
            </p>
            <p className="mt-2 font-display text-lg font-medium text-ink sm:text-xl">
              How might we let users make warm introductions between their contacts{" "}
              <span style={{ color: `rgb(${ACCENT})` }}>
                without either party&apos;s identity being exposed without their explicit
                consent?
              </span>
            </p>
          </div>
        </Reveal>
      </section>

      {/* Discovery + reframe */}
      <section className="mt-20">
        <SectionTitle
          eyebrow="Discovery"
          title="The product reframe"
          description="The initial framing was 'let me share my contact.' The privacy-safe framing is that the subject controls consent."
        />
        <Reveal direction="up" delay={0.1}>
          <div className="mt-6 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
            <div className="flex-1 rounded-3xl border border-line bg-surface/40 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
                Naive
              </p>
              <p className="mt-2 text-sm text-ink/80">
                &quot;Let me share my contact&quot;, the sharer decides and identity is
                forwarded instantly.
              </p>
            </div>
            <div className="grid place-items-center text-2xl text-accent">→</div>
            <div
              className="flex-1 rounded-3xl border p-6"
              style={{ borderColor: `rgb(${ACCENT} / 0.4)`, background: `rgb(${ACCENT} / 0.08)` }}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
                Privacy-correct
              </p>
              <p className="mt-2 text-sm font-medium text-ink">
                The person being shared is the one who decides, not the person doing the
                sharing.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Goals */}
      <section className="mt-20">
        <SectionTitle eyebrow="Goals & metrics" title="What success looked like" />
        <Reveal direction="up" delay={0.1}>
          <div className="mt-6 overflow-x-auto rounded-3xl border border-line" data-lenis-prevent>
            <table className="w-full min-w-[680px] text-left text-sm">
              <thead className="bg-surface/60 text-xs uppercase tracking-wide text-muted">
                <tr>
                  <th className="px-5 py-3 font-medium">Goal</th>
                  <th className="px-5 py-3 font-medium">Metric</th>
                  <th className="px-5 py-3 font-medium">Signal</th>
                </tr>
              </thead>
              <tbody>
                {goals.map((g) => (
                  <tr key={g[0]} className="border-t border-line">
                    <td className="px-5 py-3 font-medium text-ink">{g[0]}</td>
                    <td className="px-5 py-3 text-muted">{g[1]}</td>
                    <td className="px-5 py-3 text-muted">{g[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
        <p className="mt-3 text-xs text-muted">
          Dashboards were lightweight during initial launch; the non-negotiable was the privacy
          guarantee, with adoption as the primary success signal.
        </p>
      </section>

      {/* Personas */}
      <section className="mt-20">
        <SectionTitle eyebrow="Users" title="Three roles, one introduction" />
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {personas.map((p, i) => (
            <Reveal key={p.name} direction="up" delay={0.06 * i}>
              <div className="h-full rounded-3xl border border-line bg-surface/40 p-6">
                <h4 className="font-display text-lg font-bold text-ink">{p.name}</h4>
                <p className="mt-0.5 text-xs font-medium" style={{ color: `rgb(${ACCENT})` }}>
                  {p.sub}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted">{p.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Key decisions */}
      <section className="mt-20">
        <SectionTitle
          eyebrow="Solution"
          title="Four product decisions (and their trade-offs)"
          description="Sharing is a request → consent → relay flow, not a one-tap forward. Each decision traded friction for privacy on purpose."
        />
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {decisions.map((d, i) => (
            <Reveal key={d.t} direction="up" delay={0.05 * i}>
              <div className="flex h-full flex-col rounded-3xl border border-line bg-surface/40 p-6">
                <div className="flex items-start gap-3">
                  <span
                    className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-bold"
                    style={{ background: `rgb(${ACCENT} / 0.15)`, color: `rgb(${ACCENT})` }}
                  >
                    {i + 1}
                  </span>
                  <h4 className="text-base font-semibold text-ink">{d.t}</h4>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted">{d.d}</p>
                <p className="mt-4 border-t border-line pt-3 text-xs text-muted">
                  <span className="font-semibold text-ink/80">Trade-off:</span> {d.trade}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Flow */}
      <section className="mt-20">
        <SectionTitle
          eyebrow="User flow"
          title="Request → consent → relay"
          description="A three-party state machine with a permission gate at its heart."
        />
        <div className="mt-8 grid gap-4 md:grid-cols-5">
          <Reveal direction="up" delay={0.0}>
            <FlowNode n="01" title="Request" desc="Connector asks to share Subject with Recipient. A request goes to the Subject and does not share instantly." />
          </Reveal>
          <Reveal direction="up" delay={0.06}>
            <FlowNode n="02" title="Info message" desc="Recipient's chat shows the request is in progress and may be declined or disabled." />
          </Reveal>
          <Reveal direction="up" delay={0.12}>
            <FlowNode n="03" title="Permission gate" desc="Proceeds only if the Subject has contact sharing enabled. Otherwise the flow ends safely." tone="gate" />
          </Reveal>
          <Reveal direction="up" delay={0.18}>
            <FlowNode n="04" title="Approve & mint" desc="On approval, a fresh single-use Port bundle is generated for the Subject." />
          </Reveal>
          <Reveal direction="up" delay={0.24}>
            <FlowNode n="05" title="Relay & connect" desc="Bundle is relayed into the Recipient's chat; they tap to connect. Status update is idempotent." tone="success" />
          </Reveal>
        </div>
      </section>

      {/* Wireframes */}
      <section className="mt-20">
        <SectionTitle
          eyebrow="Wireframes"
          title="The flow, screen by screen"
          description="Low-fidelity mockups of the five key moments. Scroll horizontally."
        />
        <div className="mt-8 -mx-4 overflow-x-auto px-4 pb-4 sm:-mx-6 sm:px-6" data-lenis-prevent>
          <div className="flex gap-5">
            <Phone step="01" title="Connector picks 'Share a contact'">
              <Bubble side="in">Hey, you should talk to my friend!</Bubble>
              <div className="mt-auto rounded-2xl border border-line bg-surface/60 p-2">
                <p className="mb-1.5 text-[10px] uppercase tracking-wide text-muted">Attach</p>
                <div className="space-y-1">
                  <p className="text-muted">📷 Photo</p>
                  <p className="text-muted">🎤 Voice note</p>
                  <p className="rounded-lg bg-accent/15 px-1.5 py-1 font-semibold text-accent">
                    👤 Share a contact
                  </p>
                  <p className="text-muted">📄 Document</p>
                </div>
              </div>
            </Phone>

            <Phone step="02" title="Pick who to introduce">
              <p className="text-[10px] uppercase tracking-wide text-muted">Share with Bob</p>
              <div className="space-y-1.5">
                <p className="text-muted">◯ Alice</p>
                <p className="rounded-lg bg-accent/15 px-1.5 py-1 font-semibold text-accent">
                  ◉ Asha
                </p>
                <p className="text-muted">◯ Ravi</p>
              </div>
              <Bubble tone="info">
                ⓘ Asha will be asked to approve before anything is shared.
              </Bubble>
              <div className="mt-auto text-center">
                <MiniBtn primary>Send request</MiniBtn>
              </div>
            </Phone>

            <Phone step="03" title="Recipient: request in progress">
              <Bubble tone="info">
                ⓘ You asked to connect with &quot;Asha&quot;. Waiting for approval, they
                may have contact sharing turned off.
              </Bubble>
            </Phone>

            <Phone step="04" title="Subject approves (or not)">
              <Bubble tone="accent">
                Share your contact with &quot;Bob&quot;? They&apos;ll be able to start a
                chat with you on Port.
                <div className="mt-2 flex gap-1.5">
                  <MiniBtn>Decline</MiniBtn>
                  <MiniBtn primary>Share</MiniBtn>
                </div>
              </Bubble>
              <div className="mt-auto rounded-2xl border border-line bg-surface/60 p-2 text-[10px] text-muted">
                Settings ▸ Privacy ▸ Contact sharing:{" "}
                <span className="font-semibold text-accent2">ON</span>
              </div>
            </Phone>

            <Phone step="05" title="Recipient connects">
              <Bubble tone="success">
                ✅ Asha shared their contact.
                <div className="mt-2">
                  <MiniBtn primary>Connect with Asha →</MiniBtn>
                </div>
              </Bubble>
            </Phone>
          </div>
        </div>
      </section>

      {/* Spec */}
      <section className="mt-20">
        <SectionTitle
          eyebrow="Functional spec"
          title="States, criteria & edge cases"
          description="The critical work was integrity guarantees and edge-case handling, not only the happy path."
        />

        {/* state machine */}
        <Reveal direction="up" delay={0.08}>
          <div className="mt-8 flex flex-wrap items-center gap-2 rounded-3xl border border-line bg-surface/40 p-6 text-xs font-medium">
            {["DRAFT", "REQUESTED", "APPROVED", "RELAYED", "CONNECTED"].map((s, i, arr) => (
              <span key={s} className="flex items-center gap-2">
                <span
                  className="rounded-full px-3 py-1.5"
                  style={{ background: `rgb(${ACCENT} / 0.12)`, color: `rgb(${ACCENT})` }}
                >
                  {s}
                </span>
                {i < arr.length - 1 && <span className="text-muted">→</span>}
              </span>
            ))}
            <span className="ml-2 rounded-full border border-dashed border-line px-3 py-1.5 text-muted">
              permission off → STALLED (no leak)
            </span>
          </div>
        </Reveal>

        {/* acceptance criteria */}
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <Reveal direction="up" delay={0.06}>
            <div className="h-full rounded-3xl border border-line bg-surface/40 p-6">
              <h4 className="text-sm font-semibold text-ink">Acceptance criteria</h4>
              <ul className="mt-4 space-y-2.5">
                {acceptance.map((a) => (
                  <li key={a} className="flex gap-2.5 text-sm text-muted">
                    <span className="mt-0.5 text-accent2">✓</span>
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* edge cases */}
          <Reveal direction="up" delay={0.12}>
            <div className="h-full rounded-3xl border border-line bg-surface/40 p-6">
              <h4 className="text-sm font-semibold text-ink">Edge cases handled</h4>
              <ul className="mt-4 space-y-3">
                {edges.map(([e, b]) => (
                  <li key={e} className="text-sm">
                    <p className="font-medium text-ink/90">{e}</p>
                    <p className="mt-0.5 text-muted">{b}</p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Delivery: owned vs team */}
      <section className="mt-20">
        <SectionTitle eyebrow="Delivery" title="What I owned vs. the team" />
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <Reveal direction="up">
            <div
              className="h-full rounded-3xl border p-6"
              style={{ borderColor: `rgb(${ACCENT} / 0.4)`, background: `rgb(${ACCENT} / 0.07)` }}
            >
              <h4 className="text-sm font-semibold text-ink">I owned</h4>
              <ul className="mt-3 space-y-2 text-sm text-muted">
                <li>The consent-first reframing</li>
                <li>The permission-gating decision</li>
                <li>The friction-vs-privacy trade-off</li>
                <li>The spec, acceptance criteria & edge-case definition</li>
              </ul>
            </div>
          </Reveal>
          <Reveal direction="up" delay={0.08}>
            <div className="h-full rounded-3xl border border-line bg-surface/40 p-6">
              <h4 className="text-sm font-semibold text-ink">The team owned</h4>
              <ul className="mt-3 space-y-2 text-sm text-muted">
                <li>Cryptographic bundle generation</li>
                <li>Client implementation across platforms</li>
                <li>Platform-specific delivery & QA</li>
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Outcome */}
      <section className="mt-20">
        <SectionTitle eyebrow="Outcome" title="Impact" />
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {[
            "Shipped on Android & iOS with no critical launch failures.",
            "Became one of three top post-launch features (with voice notes & multimedia).",
            "Functioned as a user growth lever by surfacing real connections in-app.",
            "Maintained Port's privacy model with zero identity leaks by design.",
          ].map((o, i) => (
            <Reveal key={o} direction="up" delay={0.05 * i}>
              <div className="flex h-full items-start gap-3 rounded-3xl border border-line bg-surface/40 p-6">
                <span className="text-accent2">★</span>
                <p className="text-sm leading-relaxed text-ink/90">{o}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Learnings */}
      <section className="mt-20">
        <SectionTitle eyebrow="Learnings" title="What I'd do next" />
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {[
            ["Reduce approval friction", "Optional auto-approve for people you're already connected to."],
            ["Instrument the full funnel", "Measure request → approve → relay → connection to find drop-off."],
            ["Batch introductions", "Introduce one contact to several without multiplying prompts."],
            ["Expiry & revocation", "UX for outstanding single-use bundles."],
          ].map(([t, d], i) => (
            <Reveal key={t} direction="up" delay={0.05 * i}>
              <div className="h-full rounded-3xl border border-line bg-surface/40 p-6">
                <h4 className="text-sm font-semibold text-ink">{t}</h4>
                <p className="mt-2 text-sm leading-relaxed text-muted">{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mt-24 rounded-4xl border border-line bg-surface/40 p-8 text-center sm:p-12">
        <p className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
          Want the deep dive?
        </p>
        <p className="mx-auto mt-3 max-w-xl text-muted">
          This pattern was later distilled into{" "}
          <span className="text-ink">Consento</span>, an open-source SDK for consent-driven
          data sharing. Happy to walk through either.
        </p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/#contact"
            className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-white shadow-glow transition-transform hover:scale-105"
          >
            Get in touch
          </Link>
          <Link
            href="/#work"
            className="rounded-full border border-line px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-accent/60 hover:text-accent"
          >
            ← Back to all work
          </Link>
        </div>
      </section>

      {/* signature */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-12 text-center text-xs text-muted"
      >
        Prepared by Sumaanta Munde. Built with Claude and Cursor.
      </motion.p>
    </main>
  );
}
