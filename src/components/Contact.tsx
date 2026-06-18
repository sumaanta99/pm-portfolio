"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { profile } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

function Field({
  label,
  name,
  type = "text",
  textarea = false,
  value,
  onChange,
}: {
  label: string;
  name: string;
  type?: string;
  textarea?: boolean;
  value: string;
  onChange: (v: string) => void;
}) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;
  return (
    <div className="relative">
      <label
        htmlFor={name}
        className={`pointer-events-none absolute left-0 origin-left transition-all duration-300 ${
          active ? "-top-3.5 text-xs text-accent" : "top-3 text-base text-muted"
        }`}
      >
        {label}
      </label>
      {textarea ? (
        <textarea
          id={name}
          name={name}
          rows={4}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full resize-none bg-transparent py-3 text-ink outline-none"
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full bg-transparent py-3 text-ink outline-none"
        />
      )}
      <div className="relative h-px w-full bg-line">
        <motion.span
          initial={false}
          animate={{ scaleX: active ? 1 : 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 origin-left bg-gradient-to-r from-accent to-accent2"
        />
      </div>
    </div>
  );
}

const socials = [
  { label: "Email", href: profile.socials.email, icon: MailIcon },
  { label: "LinkedIn", href: profile.socials.linkedin, icon: LinkedInIcon },
  { label: "GitHub", href: profile.socials.github, icon: GitHubIcon },
  { label: "Medium", href: profile.socials.medium, icon: MediumIcon },
];

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio inquiry from ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section
      id="contact"
      className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24 md:py-32"
    >
      <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <SectionHeading
            eyebrow="Contact"
            title="Let's build something together."
            description="Have a 0→1 idea, an ambiguous problem, or a role you think I'd love? I read every message."
          />
          <Reveal direction="up" delay={0.1}>
            <div className="mt-9 flex flex-col gap-3.5 sm:mt-10 sm:gap-4">
              <a
                href={profile.socials.email}
                className="break-all font-display text-lg font-semibold transition-colors hover:text-accent sm:text-2xl"
              >
                {profile.email}
              </a>
              <p className="text-muted">{profile.phone}</p>
              <p className="text-muted">{profile.location}</p>
            </div>
          </Reveal>

          <div className="mt-7 flex flex-wrap gap-3 sm:mt-8">
            {socials.map(({ label, href, icon: Icon }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                whileHover={{ y: -5, rotate: 6, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 14 }}
                className="grid h-12 w-12 place-items-center rounded-full border border-line bg-surface/60 text-muted transition-colors hover:border-accent/60 hover:text-accent"
              >
                <Icon />
              </motion.a>
            ))}
          </div>
        </div>

        <Reveal direction="up" delay={0.15}>
          <form
            onSubmit={submit}
            className="flex flex-col gap-7 rounded-4xl border border-line bg-surface/50 p-5 sm:gap-8 sm:p-8"
          >
            <Field
              label="Your name"
              name="name"
              value={form.name}
              onChange={(v) => setForm((f) => ({ ...f, name: v }))}
            />
            <Field
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={(v) => setForm((f) => ({ ...f, email: v }))}
            />
            <Field
              label="Message"
              name="message"
              textarea
              value={form.message}
              onChange={(v) => setForm((f) => ({ ...f, message: v }))}
            />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-accent px-7 py-4 font-medium text-white shadow-glow"
            >
              Send message
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </motion.button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function MailIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}
function LinkedInIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.4c0-1.29-.02-2.95-1.8-2.95-1.8 0-2.08 1.4-2.08 2.85V21h-4z" />
    </svg>
  );
}
function GitHubIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2z" />
    </svg>
  );
}

function MediumIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M4 7.5a1 1 0 0 0-.3-1.1L2.5 5.2V5h6l4.65 10.19L17.2 5H23v.2l-1.03.98a.66.66 0 0 0-.25.64v10.35a.66.66 0 0 0 .25.64l1 .98V19h-5.02v-.2l1.04-1.01c.1-.1.1-.13.1-.28V9.16l-4.84 9.82h-.65L8.96 9.16v7.01a1.56 1.56 0 0 0 .42 1.33l1.35 1.65V19H6.9v-.2l1.35-1.65a1.5 1.5 0 0 0 .39-1.33V7.7a1.17 1.17 0 0 0-.38-.97L7.06 5.2V5H4v.2l1.7 2.1V7.5z" />
    </svg>
  );
}
