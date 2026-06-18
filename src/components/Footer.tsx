"use client";

import { profile } from "@/lib/data";

export function Footer() {
  return (
    <footer className="relative border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 py-10 sm:flex-row">
        <div className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-accent font-display font-bold text-white">
            S
          </span>
          <div>
            <p className="font-display text-sm font-semibold">{profile.name}</p>
            <p className="text-xs text-muted">{profile.role} · {profile.location}</p>
          </div>
        </div>

        <p className="text-xs text-muted">
          Built with Next.js, Framer Motion & Three.js · © {new Date().getFullYear()}
        </p>

        <a
          href="#top"
          className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink"
        >
          Back to top
          <span className="transition-transform group-hover:-translate-y-1">↑</span>
        </a>
      </div>
    </footer>
  );
}
