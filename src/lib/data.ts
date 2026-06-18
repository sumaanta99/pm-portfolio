export const profile = {
  name: "Sumaanta Munde",
  role: "Product Manager",
  tagline: "From Founding Engineer to PM",
  email: "sumaantamunde@gmail.com",
  phone: "+91 9550614763",
  location: "Bangalore, India",
  education: "CSE — NIT Warangal '22",
  summary:
    "I'm a product manager with a software engineering background and a passion for building user-centric software. I turn fuzzy problems into clear product bets and ship experiences that feel simple, useful, and loved.",
  socials: {
    linkedin: "https://www.linkedin.com/in/sumaanta-munde-97a751157/",
    github: "https://github.com/sumaanta99",
    medium: "https://medium.com/@sumaantamunde",
    email: "mailto:sumaantamunde@gmail.com",
  },
};

export type Metric = { value: number; suffix?: string; prefix?: string; label: string };

export type Project = {
  id: string;
  title: string;
  subtitle: string;
  category: "Product Work" | "Side Projects" | "Analysis" | "Open Source";
  year: string;
  status?: string;
  accent: string; // tailwind-ready rgb string for gradient
  summary: string;
  tags: string[];
  metrics: Metric[];
  links?: { label: string; href: string }[];
  caseStudyHref?: string;
  problem: string;
  research: string;
  solution: string;
  impact: string;
};

export const projects: Project[] = [
  {
    id: "rapido-bikes-rated-by-women",
    title: "Rapido: Bikes Rated by Women",
    subtitle: "Trust filter product analysis · Marketplace",
    category: "Analysis",
    year: "2026",
    accent: "236 72 153",
    summary:
      "How Rapido can reduce women riders' booking anxiety by surfacing trust signals from existing ratings data instead of waiting years for supply-side expansion.",
    tags: ["Marketplace", "Trust", "Mobility", "Conversion"],
    caseStudyHref: "/case-studies/rapido-bikes-rated-by-women",
    metrics: [
      { value: 280, suffix: "M", label: "Bike-taxi rides (India, 2022)" },
      { value: 500, suffix: "+", label: "Rapido cities (claim)" },
      { value: 75, suffix: "M+", label: "Rapido users/community (claim)" },
    ],
    problem:
      "Women riders hesitate before booking unknown male bike captains, causing cancellation and conversion loss at the final booking step.",
    research:
      "Analyzed publicly available signals on ride-hailing safety behavior, Rapido's trust tooling, and two-sided marketplace conversion dynamics under supply constraints.",
    solution:
      "Use existing ratings and ride-history data to surface a dedicated 'Bikes Rated by Women' option in booking UI, creating immediate trust signaling without new supply infrastructure.",
    impact:
      "Demonstrates a fast, constraint-driven path to improve demand-side conversion while long-term women-captain supply initiatives continue scaling.",
  },
  {
    id: "nyt-games",
    title: "NYT Games",
    subtitle: "Subscription strategy teardown · Analysis",
    category: "Analysis",
    year: "2026",
    accent: "106 170 100",
    summary:
      "A practitioner's teardown of how The New York Times turned a daily puzzle habit into a subscription-retention machine and what any free-to-play word-games studio should copy or deliberately ignore.",
    tags: ["Strategy", "Subscription", "Word Games", "Retention"],
    caseStudyHref: "/case-studies/nyt-games",
    metrics: [
      { value: 4.8, suffix: "B", label: "Wordle plays in 2022" },
      { value: 11, suffix: "M", label: "NYT subscribers (~)" },
      { value: 1, suffix: "M", label: "Games subs in 2021" },
    ],
    problem:
      "How does NYT dominate word games without the free-to-play playbook — no ads, no coins, no in-app purchases and what is transferable to a free-to-play studio?",
    research:
      "Worked from public data only: NYT filings and year-in-review posts (4.8B Wordle plays in 2022, 1M Games subscriptions by 2021), the Wordle acquisition terms, and Josh Wardle's player counts — flagging every inferred number.",
    solution:
      "Reframed NYT Games as a subscription-retention business, not a games business: scarcity (one daily puzzle), streaks (loss aversion), a spoiler-safe share grid (near-zero-cost virality), no in-game ads (quality as moat), and a portfolio tuned to deepen one subscription.",
    impact:
      "A clear strategic read: NYT borrows pricing power from its bundle and under-monetizes on purpose to protect the habit. The one transferable, bundle-free lever for any studio is a synchronized daily puzzle with a spoiler-safe, shareable result.",
  },
  {
    id: "nutrition-tracking-apps",
    title: "Napkin Math vs Healthify vs MyFitnessPal",
    subtitle: "Food tracking experience comparison · Analysis",
    category: "Analysis",
    year: "2026",
    accent: "59 130 246",
    summary:
      "A first-person product essay on why people keep using nutrition apps: Napkin Math for joy, Healthify for guidance, and MyFitnessPal for discipline.",
    tags: ["Nutrition", "User Behavior", "Retention", "Mobile UX"],
    caseStudyHref: "/case-studies/nutrition-tracking-apps",
    metrics: [
      { value: 2, suffix: " days", label: "Hands-on Napkin Math usage" },
      { value: 3, label: "Apps compared" },
      { value: 1, label: "Core insight: feeling drives habit" },
    ],
    problem:
      "Food tracking apps often lose users because logging feels tedious, judgmental, and too clinical for daily life.",
    research:
      "Built around direct two-day Napkin Math usage notes and compared against known user behavior patterns in Healthify and MyFitnessPal.",
    solution:
      "Compared each app through product feeling and retention behavior instead of feature checklists: joy (Napkin Math), guidance (Healthify), discipline (MyFitnessPal).",
    impact:
      "Clear user-behavior insight: in nutrition tracking, reducing emotional friction can matter as much as data depth.",
  },
  {
    id: "port",
    title: "Port",
    subtitle: "Secure messaging platform · 0→1",
    category: "Product Work",
    year: "2023–25",
    accent: "124 108 255",
    summary:
      "Joined pre-launch as Founding Engineer turned PM. Owned end-to-end product definition and delivery of a secure messaging app on Android & iOS, scaling to 14,000+ users.",
    tags: ["0→1", "Consumer", "Mobile", "Messaging"],
    caseStudyHref: "/case-studies/contact-sharing",
    metrics: [
      { value: 14000, suffix: "+", label: "Active users" },
      { value: 3000, suffix: "+", label: "Msgs/day (personal)" },
      { value: 3, label: "Top post-launch features" },
    ],
    problem:
      "Build a secure messaging platform that could pull habitual users off WhatsApp and Signal — with no critical launch failures and a credible privacy story.",
    research:
      "Ran a 30-person research cohort and a structured feedback loop to surface communication friction. Identified that professionals needed to separate work and personal chats, and that voice, multimedia and contact sharing were table-stakes for retention.",
    solution:
      "Wrote PRDs and MVP specs for core messaging (personal, group, multi-select chat). Drove voice notes, multimedia & contact sharing from discovery to launch, and shipped folder creation / chat organization. Built an invite/referral growth loop and a priority-based UI bug reporting system for the eng team.",
    impact:
      "Scaled to 14,000+ active users with personal chat sustaining 3,000+ messages/day. Three of the discovery-driven features became the top post-launch features. Zero critical launch failures.",
  },
  {
    id: "mosaic",
    title: "Mosaic Wellness",
    subtitle: "Checkout, auth & tele-consult · Growth",
    category: "Product Work",
    year: "2022–23",
    accent: "56 224 201",
    summary:
      "Rebuilt purchase flows across three brands in a unified codebase and shipped mobile-native tele-consultation, lifting conversion and retention while cutting code duplication.",
    tags: ["Growth", "Checkout", "Healthcare", "A/B Testing"],
    links: [
      { label: "Man Matters", href: "https://manmatters.com/" },
      {
        label: "Be Bodywise",
        href: "https://bebodywise.com/?utm_source=google_Search&utm_medium=170250923217&utm_campaign=726021315733&utm_term=bebodywise&gad_source=1&gad_campaignid=22043735672&gbraid=0AAAAA-iuV2pU95U2rKvbrpZigyYASMvZR&gclid=Cj0KCQjwrs7RBhDuARIsAIVfBD35yGT69k572P9-ISpHvC7ZCT4poJqG5HqHMapEEiMLblcZW1eNt30aAjMqEALw_wcB",
      },
      {
        label: "Little Joys",
        href: "https://ourlittlejoys.com/shop/all?utm_source=google_Search&utm_medium=172340042820&utm_campaign=724028387900&utm_term=our%20little%20joys&gad_source=1&gad_campaignid=21976723436&gbraid=0AAAAA-h0Bq9ijDI_G1XCkTTGeLQ8upW5c&gclid=Cj0KCQjwrs7RBhDuARIsAIVfBD33FW_Idfs83HOI9LYtIzUy7CRIr1Ya75uuvQfGnkxBrMy43LfpFLQaApqHEALw_wcB",
      },
    ],
    metrics: [
      { value: 28, suffix: "%", label: "Tele-consult completion ↑" },
      { value: 12, suffix: "%", label: "Checkout conversion ↑" },
      { value: 60, suffix: "%", label: "Code duplication ↓" },
    ],
    problem:
      "Three consumer health brands each maintained separate, friction-heavy purchase flows — slowing shipping velocity and leaking conversion at checkout.",
    research:
      "Used Mixpanel & CleverTap funnel and retention analysis to locate drop-off in cart, address and payment steps, and to quantify tele-consult completion gaps.",
    solution:
      "Rebuilt checkout, cart, address and payments into one unified codebase with the PM and growth team. Shipped mobile-native tele-consultation and prescription workflows with doctors and business leads. Drove automated testing and CI/CD adoption.",
    impact:
      "Lifted checkout conversion 12% and tele-consult completion 28%. Cut 60% of cross-brand code duplication so one team could ship for all three, and raised release frequency 50% while holding production stability.",
  },
  {
    id: "optym",
    title: "Optym — DockAi",
    subtitle: "Server-driven form engine · B2B SaaS",
    category: "Product Work",
    year: "2025–26",
    accent: "245 158 66",
    summary:
      "Translated ambiguous logistics requirements into a JSON-config-driven form engine, owning the DockAi exception workflow end-to-end as Product Owner.",
    tags: ["B2B SaaS", "Logistics", "Config-driven", "AI-native"],
    metrics: [
      { value: 32, suffix: "%", label: "Processing time ↓" },
      { value: 40, suffix: "%", label: "Shipment variants covered" },
      { value: 16, suffix: "+", label: "Design docs owned" },
    ],
    problem:
      "Logistics clients shipped wildly different requirements; every shipment variant demanded custom code, slowing processing and ballooning engineering debt.",
    research:
      "Worked with QA and clients to map shipment variants and lock acceptance criteria. Used Claude and Cursor to draft PRDs and pressure-test edge cases before build.",
    solution:
      "Designed a JSON-config-driven form engine covering 40% of shipment variants with zero code changes. Owned the DockAi exception workflow, the Final Duties compliance modal, and the Login & Authentication flow from definition to production. Drove a monolithic Dropdown refactor adopted across all dockworker screens.",
    impact:
      "Cut shipment processing time 32% and unblocked dock supervisor & worker onboarding. Aligned engineering, QA and business async across 16+ design docs, cutting component debt.",
  },
  {
    id: "mewsly",
    title: "Mewsly",
    subtitle: "Home cat boarding · Live business",
    category: "Side Projects",
    year: "2025",
    status: "Live",
    accent: "255 138 168",
    summary:
      "A live cage-free home cat boarding business in Indiranagar, Bangalore — built the brand, landing site and booking funnel end to end. Real customers, real reviews.",
    tags: ["0→1", "Brand", "Marketing", "Live business"],
    metrics: [
      { value: 3, label: "Pricing tiers" },
      { value: 5, suffix: "★", label: "Customer rating" },
      { value: 100, suffix: "%", label: "WhatsApp booking funnel" },
    ],
    links: [
      { label: "Visit site", href: "https://mewslyhomecatboarding.netlify.app/" },
      {
        label: "Instagram",
        href: "https://www.instagram.com/mewslypets?igsh=bWRnMzZ5c3NzM2Y4&utm_source=qr",
      },
    ],
    problem:
      "Cat parents in Bangalore distrust cage-based boarding and want a homely, transparent option they can book without friction.",
    research:
      "Talked to cat parents about anxieties — cages, missed updates, medication. Found that daily photo updates and a real-home environment were the biggest trust drivers.",
    solution:
      "Positioned Mewsly as cage-free 'home away from home', built a conversion-focused landing page with clear tiered pricing (₹600 / ₹750 / ₹900) and a one-tap WhatsApp booking funnel, plus daily photo drops and medication care as differentiators.",
    impact:
      "An operating business with five-star reviews from repeat customers across Bangalore and a frictionless WhatsApp-first booking flow.",
  },
  {
    id: "quickwalk",
    title: "QuickWalk",
    subtitle: "Dog-walking marketplace",
    category: "Side Projects",
    year: "2026",
    status: "In progress",
    accent: "96 165 250",
    summary:
      "A two-sided marketplace connecting dog owners with vetted walkers — currently in active build, applying marketplace liquidity and trust patterns from the ground up.",
    tags: ["Marketplace", "0→1", "Two-sided", "In progress"],
    metrics: [
      { value: 2, label: "Sided marketplace" },
      { value: 1, label: "MVP in build" },
    ],
    links: [
      {
        label: "PRD",
        href: "https://docs.google.com/document/d/1J2-5fn_7mIZeTbiQdIItEb051DPJpcxLUioThu8o8QU/edit?usp=sharing",
      },
    ],
    problem:
      "Dog owners struggle to find trustworthy, on-demand walkers; walkers lack a reliable stream of nearby bookings.",
    research:
      "Studying marketplace cold-start: how to seed supply, build trust signals (ratings, verification) and concentrate liquidity in a single neighborhood before expanding.",
    solution:
      "Designing a trust-first booking flow with walker verification, live updates and geo-matching — sequencing scope to launch in one neighborhood first.",
    impact:
      "In progress — building toward an MVP launch with a focused liquidity wedge.",
  },
  {
    id: "consento",
    title: "Consento",
    subtitle: "Permissioned data-sharing SDK",
    category: "Open Source",
    year: "2026",
    accent: "168 85 247",
    summary:
      "A headless TypeScript SDK for approval-based, multi-party data sharing flows with cryptographic guarantees. Published on npm.",
    tags: ["Open Source", "TypeScript", "SDK", "Security"],
    metrics: [
      { value: 100, suffix: "%", label: "TypeScript" },
      { value: 3, label: "State machine stages" },
      { value: 4, label: "Security guarantees" },
    ],
    links: [
      { label: "GitHub", href: "https://github.com/sumaanta99/consento" },
      { label: "npm", href: "https://www.npmjs.com/package/consento" },
    ],
    problem:
      "Approval-based sharing flows (share a contact, unlock details after consent) are asynchronous, multi-party, stateful and easy to get wrong or insecure.",
    research:
      "Distilled recurring patterns across messaging, marketplaces and privacy-first apps into a single deterministic protocol modeled as a state machine: REQUESTED → APPROVED → RELAYED.",
    solution:
      "Built a headless SDK with Ed25519 signatures, tamper-proof bundles, destination-bound sharing and validation guards that prevent invalid state transitions.",
    impact:
      "Published, documented and packaged on npm with a node example — a reusable primitive for consent-driven data exchange.",
  },
  {
    id: "rateit",
    title: "RateIt",
    subtitle: "Should I watch this? · Chrome extension",
    category: "Open Source",
    year: "2026",
    accent: "250 204 21",
    summary:
      "A Manifest V3 Chrome extension that shows a compact, spoiler-free verdict on hover across Netflix, Prime, Hotstar and YouTube — combining IMDb, RT, Metacritic and Reddit signals.",
    tags: ["Chrome Extension", "TypeScript", "Consumer", "AI signals"],
    metrics: [
      { value: 4, label: "Platforms supported" },
      { value: 4, label: "Signal sources" },
      { value: 0, label: "Setup keys for users" },
    ],
    links: [{ label: "GitHub", href: "https://github.com/sumaanta99/rateit" }],
    problem:
      "Streaming decision fatigue: people waste time deciding whether a title is worth watching, jumping between rating sites.",
    research:
      "Identified that a single, spoiler-free verdict with 'Best For / Avoid If' tags reduces decision fatigue better than raw scores scattered across tabs.",
    solution:
      "Built per-platform adapters that extract titles and render a shadow-DOM panel on hover; a background worker fetches OMDb, TMDB and Reddit in parallel and synthesizes a verdict (MUST WATCH, WORTH WATCHING, SKIP, ONLY FOR FANS OF).",
    impact:
      "A working, privacy-conscious extension across four major platforms with zero end-user configuration.",
  },
];

export const timeline = [
  {
    org: "Optym",
    role: "Senior Software Engineer (Product Owner — DockAi)",
    period: "Nov '25 – Apr '26",
    blurb:
      "Owned a config-driven form engine and the DockAi exception workflow end-to-end; cut shipment processing time 32%.",
  },
  {
    org: "Port, by Numberless",
    role: "Founding Engineer → Product Manager",
    period: "Oct '23 – Aug '25",
    blurb:
      "Defined and shipped a secure messaging platform on Android & iOS, scaling 0→14,000+ users with research-driven prioritization.",
  },
  {
    org: "Mosaic Wellness",
    role: "Software Developer I (Product & Growth)",
    period: "Feb '22 – Jul '23",
    blurb:
      "Rebuilt purchase flows across three brands and shipped tele-consult workflows; +12% conversion, +28% completion.",
  },
  {
    org: "NIT Warangal",
    role: "B.Tech, Computer Science & Engineering",
    period: "2018 – 2022",
    blurb: "Computer Science foundation — the engineering bedrock behind a product career.",
  },
];

export type SkillGroup = {
  title: string;
  skills: { name: string; level: number }[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Product",
    skills: [
      { name: "Product Strategy & Roadmap", level: 92 },
      { name: "PRD & Spec Writing", level: 95 },
      { name: "Stakeholder Management", level: 88 },
      { name: "GTM & A/B Testing", level: 84 },
    ],
  },
  {
    title: "AI & LLM-native",
    skills: [
      { name: "LLM Workflow Design", level: 90 },
      { name: "AI-native Prototyping", level: 92 },
      { name: "Prompt Engineering", level: 90 },
      { name: "Claude & Cursor", level: 95 },
    ],
  },
  {
    title: "Analytics & Data",
    skills: [
      { name: "SQL & Funnel Analysis", level: 86 },
      { name: "Retention & Cohort Analysis", level: 84 },
      { name: "North Star Metrics", level: 88 },
      { name: "Mixpanel & CleverTap", level: 85 },
    ],
  },
  {
    title: "Engineering",
    skills: [
      { name: "React Native & Next.js", level: 90 },
      { name: "PostgreSQL & Firebase", level: 82 },
      { name: "REST APIs & System Design", level: 84 },
      { name: "Zustand / State Mgmt", level: 86 },
    ],
  },
];

export const tools = [
  "Jira",
  "Confluence",
  "Mixpanel",
  "CleverTap",
  "Figma",
  "Claude",
  "Cursor",
  "Next.js",
  "React Native",
  "PostgreSQL",
  "Firebase",
  "SQL",
];

// "On My Shelf" — manually curated. Add a cover image URL (or a path to a file
// in /public, e.g. "/books/atomic-habits.jpg"). Leave `cover` empty to fall
// back to a clean title tile.
export type ShelfBook = {
  title: string;
  author?: string;
  cover?: string;
};

export const shelfBooks: ShelfBook[] = [
  {
    title: "Range",
    author: "David Epstein",
    cover: "https://covers.openlibrary.org/b/isbn/9780735214484-L.jpg",
  },
  {
    title: "Mother Mary Comes to Me",
    author: "Arundhati Roy",
    cover: "https://covers.openlibrary.org/b/id/14981460-L.jpg",
  },
  {
    title: "Children of Time",
    author: "Adrian Tchaikovsky",
    cover: "https://covers.openlibrary.org/b/isbn/9781447273301-L.jpg",
  },
  {
    title: "Children of Ruin",
    author: "Adrian Tchaikovsky",
    cover: "https://covers.openlibrary.org/b/isbn/9781509865857-L.jpg",
  },
  {
    title: "The Museum of Innocence",
    author: "Orhan Pamuk",
    cover: "https://covers.openlibrary.org/b/isbn/9780307386243-L.jpg",
  },
  {
    title: "Tuesdays with Morrie",
    author: "Mitch Albom",
    cover: "https://covers.openlibrary.org/b/isbn/9780767905923-L.jpg",
  },
  {
    title: "Lolita",
    author: "Vladimir Nabokov",
    cover: "https://covers.openlibrary.org/b/isbn/9780679723165-L.jpg",
  },
  {
    title: "The Gene",
    author: "Siddhartha Mukherjee",
    cover: "https://covers.openlibrary.org/b/id/11320163-L.jpg",
  },
  {
    title: "Dark Places",
    author: "Gillian Flynn",
    cover: "https://covers.openlibrary.org/b/id/5728115-L.jpg",
  },
  {
    title: "Human Acts",
    author: "Han Kang",
    cover: "https://covers.openlibrary.org/b/id/8047485-L.jpg",
  },
];

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Case Studies", href: "#case-studies" },
  { label: "Blog", href: "#blog" },
  { label: "Skills", href: "#skills" },
  { label: "Shelf", href: "#shelf" },
  { label: "Contact", href: "#contact" },
];
