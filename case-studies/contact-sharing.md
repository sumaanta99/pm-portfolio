# Case Study: Consent-Driven Contact Sharing in Port

**Product:** Port — a privacy-first secure messaging app (Android & iOS)
**Company:** Numberless
**My role:** Founding Engineer → Product Manager (owned discovery → spec → delivery → launch)
**Timeline:** Post-launch feature batch (2024)
**Type:** 0→1 feature on a 0→1 product
**Status:** Shipped — one of three top post-launch features

---

## TL;DR

Users wanted to introduce their contacts to each other inside Port ("you two should connect"). On a normal messenger you just forward a phone number — but Port is privacy-first and doesn't expose phone numbers or stable identities at all. The challenge was to enable warm introductions **without breaking the privacy guarantee** that is Port's entire reason to exist.

I shipped a **three-party, consent-driven contact-sharing flow**: the person being shared must approve, sharing is gated behind an explicit permission, and the introduction is delivered as a **fresh single-use connection bundle** rather than a reusable identity. The result: a feature that doubles as a soft distribution lever while staying true to the product's privacy model.

---

## 1. Context & Problem

### Background
Port is built on a privacy-first model: there are no phone numbers, no global user IDs, and no searchable directory. Connections are formed through cryptographic "Ports" (shareable connection bundles), not by looking someone up. This is the product's core differentiator versus WhatsApp and Signal.

### The problem
As the user base grew toward 14,000+ active users, a recurring behavior surfaced in feedback: **people wanted to introduce two of their contacts to each other** — a classic, high-intent social action ("you two should talk to each other").

But the privacy model made the obvious solution impossible:
- You **can't** just forward a phone number — Port doesn't use them.
- You **can't** expose a contact's identity to a third party without consent — that would violate the trust promise.
- A naive "share contact" button would leak connection details from the person being shared to someone they never agreed to talk to.

### Problem statement
> How might we let users make warm introductions between their contacts **without** either party's identity being exposed without their explicit consent?

---

## 2. Discovery (the What & Why)

### Signals
- Qualitative: recurring requests in post-launch user feedback to "share a contact" / "introduce."
- Behavioral: users were manually copy-describing contacts ("message my friend X, here's how to find them"), an obvious unmet need and friction point.
- Strategic: surfacing real connections inside the app is a known distribution lever — more of a user's real network present = higher retention and virality.

### The reframe (key insight)
The naive framing is "let me share my contact." The privacy-correct framing is:

> **The person being shared is the one who decides — not the person doing the sharing.**

This single reframing drove every downstream product decision. Consent moves from the sharer to the subject of the share.

### Non-goals
- Not building a public directory or search.
- Not exposing phone numbers or stable identifiers.
- Not auto-connecting people without approval.

---

## 3. Goals & Success Metrics

| Goal | Metric | Target signal |
|---|---|---|
| Enable introductions without privacy regression | 0 identity leaks; sharing always consent-gated | Hard requirement |
| Make it a real, used feature | Share requests initiated / week | Adoption |
| Convert intros into connections | Share request → approved → connection rate | Funnel health |
| Soft distribution lever | New connections attributable to sharing | Network growth |
| Don't add confusion | Support tickets / confusion reports re: sharing | Keep low |

> Note: exact dashboards were lightweight given 0→1 stage; the non-negotiable was the privacy guarantee, with adoption as the primary success signal. Contact sharing landed as **one of three top post-launch features**.

---

## 4. Users & Use Cases

### Primary persona — "The Connector"
A socially active user who wants to introduce two people in their network (e.g., "you should talk to my friend who's also a designer"). High intent, wants it to feel effortless.

### Secondary persona — "The Subject" (person being shared)
Privacy-conscious. Must retain full control over whether their connection is handed to a stranger. May have contact sharing turned **off** entirely.

### Core user stories
- As a Connector, I want to introduce Contact A to Contact B, so they can talk directly in Port.
- As the Subject (A), I want to approve before my connection is shared, so my privacy is never violated.
- As the Subject, I want to disable contact sharing entirely, so I'm never asked.
- As the Recipient (B), I want to receive a working connection to A, so I can start a chat immediately.
- As the Connector, I want to know if my request can't go through (e.g., A has sharing disabled), so I'm not left guessing.

---

## 5. The Solution

### Core principle: consent-first, three-party flow
Instead of a one-tap forward, sharing is a **request → consent → relay** flow with three roles:

- **Requester / Recipient (B):** the contact who will receive the introduction.
- **Source / Subject (A):** the contact being shared — the approver.
- **Connector (me):** the user initiating the introduction.

### Key product decisions (and the trade-offs)

1. **Consent is owned by the subject, not the sharer.**
   Nothing about A is shared until A explicitly approves. *Trade-off: more friction (an approval round-trip) in exchange for an unbreakable privacy promise.* I chose privacy over frictionlessness deliberately.

2. **Permission gating (opt-in by default).**
   Sharing only proceeds if the subject has the `contactSharing` permission enabled. Privacy is the default state; sharing is something you allow.

3. **Single-use connection bundle, generated per share.**
   When approved, the system mints a **fresh, single-use "Port" bundle** rather than reusing a stable identity — so we never over-expose the subject across multiple shares.

4. **Honest, upfront feedback.**
   The recipient's chat immediately gets an info message acknowledging the request is in flight and noting the subject may have sharing disabled — so the experience degrades gracefully instead of silently failing.

5. **Idempotency & safety.**
   A share request can't be double-approved; missing/expired messages throw explicit errors rather than producing a broken connection.

---

## 6. User Flow

### High-level flow

```
Connector wants to introduce A  →  B
        │
        ▼
  [Request sent to A]            [Info msg shown in B's chat: "request in progress"]
        │
        ▼
  Does A have contactSharing ON?
        │
   ┌────┴─────┐
   │          │
  YES        NO
   │          │
   ▼          ▼
A approves   Nothing shared
   │         (B's info msg notes sharing may be disabled)
   ▼
Generate fresh single-use Port bundle for A
   │
   ▼
Relay bundle into B's chat  →  B taps to connect  →  A & B are now connected
   │
   ▼
Mark request approved + info msg "shared = true" (idempotent)
```

### Sequence diagram (Mermaid)

```mermaid
sequenceDiagram
    participant C as Connector
    participant A as Source/Subject (being shared)
    participant SYS as Port System
    participant B as Recipient

    C->>SYS: Request to share A with B
    SYS->>A: contactBundleRequest (approve?)
    SYS->>B: Info message ("request in progress / may be disabled")
    Note over A: Permission check: contactSharing?
    alt contactSharing enabled & A approves
        A->>SYS: Approve
        SYS->>SYS: Generate fresh single-use Port bundle
        SYS->>B: contactBundle (connect to A)
        SYS->>SYS: Mark request approved (idempotent)
        SYS->>B: Update info msg → shared = true
        B->>A: Tap link → new direct chat established
    else disabled or not approved
        Note over SYS: No identity shared; info msg stands
    end
```

---

## 7. Wireframes (low-fidelity)

### Screen 1 — Connector initiates a share
```
┌──────────────────────────────┐
│  Chat with Bob            ⋮   │
├──────────────────────────────┤
│                              │
│   ┌────────────────────────┐ │
│   │  Attach ▸              │ │
│   │   📷  Photo            │ │
│   │   🎤  Voice note       │ │
│   │   👤  Share a contact ◀┼─┼── tap
│   │   📄  Document         │ │
│   └────────────────────────┘ │
│                              │
│  [ Type a message…      ➤ ]  │
└──────────────────────────────┘
```

### Screen 2 — Pick which contact to introduce
```
┌──────────────────────────────┐
│  ← Share a contact with Bob   │
├──────────────────────────────┤
│  Search contacts… 🔍          │
│                              │
│  ◯  Alice                    │
│  ◉  Asha            ◀────────┼── selected
│  ◯  Ravi                     │
│  ◯  Priya                    │
│                              │
│  ⓘ Asha will be asked to     │
│     approve before sharing.  │
│                              │
│        [  Send request  ]     │
└──────────────────────────────┘
```

### Screen 3 — Recipient (Bob) sees the in-progress info message
```
┌──────────────────────────────┐
│  Chat with You                │
├──────────────────────────────┤
│  ┌──────────────────────────┐ │
│  │ ⓘ You requested to        │ │
│  │   connect with "Asha".    │ │
│  │   Waiting for approval.   │ │
│  │   (They may have contact  │ │
│  │    sharing turned off.)   │ │
│  └──────────────────────────┘ │
└──────────────────────────────┘
```

### Screen 4 — Subject (Asha) approval prompt
```
┌──────────────────────────────┐
│  Chat with You                │
├──────────────────────────────┤
│  ┌──────────────────────────┐ │
│  │ Share your contact with   │ │
│  │ "Bob"?                    │ │
│  │                          │ │
│  │ They'll be able to start  │ │
│  │ a chat with you on Port.  │ │
│  │                          │ │
│  │   [ Decline ]  [ Share ]  │ │
│  └──────────────────────────┘ │
│                              │
│  Settings ▸ Privacy ▸         │
│  Contact sharing:  [ ON  ◖ ]  │
└──────────────────────────────┘
```

### Screen 5 — Recipient (Bob) receives the live connection
```
┌──────────────────────────────┐
│  Chat with You                │
├──────────────────────────────┤
│  ┌──────────────────────────┐ │
│  │ ✅ Asha shared their      │ │
│  │    contact.               │ │
│  │                          │ │
│  │   [  Connect with Asha → ]│ │
│  └──────────────────────────┘ │
└──────────────────────────────┘
```

---

## 8. Functional Spec / States

### State machine
```
DRAFT ──send──▶ REQUESTED ──(permission off / no action)──▶ STALLED (no leak)
                    │
                  approve
                    │
                    ▼
                APPROVED ──generate bundle──▶ RELAYED ──tap──▶ CONNECTED
                    │
                (re-approve attempt) ──▶ rejected: "already approved"
```

### Acceptance criteria
- [ ] A share request never reveals the subject's identity until the subject approves.
- [ ] If the subject's `contactSharing` permission is off, no bundle is generated and no identity is shared.
- [ ] On approval, a **fresh single-use** connection bundle is generated (no identity reuse).
- [ ] The recipient's chat shows an info message on request, updated to "shared" on completion.
- [ ] A request cannot be approved twice (idempotent); double-approval is rejected gracefully.
- [ ] Missing/expired underlying messages produce explicit, handled errors (no broken half-states).
- [ ] Works on both Android and iOS with no critical launch failures.

### Edge cases handled
| Edge case | Behavior |
|---|---|
| Subject has sharing disabled | No bundle; recipient info message notes it may be disabled |
| Subject ignores request | Request stays pending; nothing leaks |
| Double approval | Rejected: "request already approved" |
| Underlying request message missing | Explicit error; flow aborts cleanly |
| Info message lost on recipient side | Explicit error; no false "shared" state |

---

## 9. Delivery

As founding engineer–PM I owned the spec and trade-offs, and drove implementation with the team on the underlying state machine:
**request → permission check → approval → single-use bundle generation → relay → idempotent status update.**

The hard engineering/product work was in the **edge cases and integrity guarantees** (idempotency, missing-message handling, graceful degradation when sharing is disabled) — not the happy path.

**What I owned:** the consent-first reframing, the permission-gating decision, the friction-vs-privacy trade-off, the spec, acceptance criteria, and edge-case definition.
**What the team owned:** cryptographic bundle generation, client implementation, and platform-specific delivery.

---

## 10. Outcome & Impact

- Shipped on Android & iOS with **no critical launch failures**.
- Became **one of three top post-launch features** (alongside voice notes and multimedia sharing).
- Functioned as a **soft distribution lever** — surfacing real connections inside the app — while fully preserving Port's privacy model.
- Contributed to the broader engagement story: **3,000+ messages/day** in personal chat and **14,000+ active users**.

---

## 11. Learnings & Next Iterations

**What worked**
- Reframing consent ownership to the *subject* was the decision that made a privacy-safe feature possible at all.
- Treating "sharing disabled" as a first-class, communicated state (not a silent failure) kept the experience honest.

**What I'd do next**
- **Reduce approval friction** for trusted/mutual contacts (e.g., optional "auto-approve for people I'm already connected to").
- **Instrument the full funnel**: request → approve → relay → connection, to measure share→connection conversion and find drop-off.
- **Batch introductions** (introduce one contact to several) without multiplying approval prompts.
- **Expiry & revocation** UX for outstanding single-use bundles.

---

*Prepared by Sumaanta Munde — Product Manager | Ex-Founding Engineer.*
