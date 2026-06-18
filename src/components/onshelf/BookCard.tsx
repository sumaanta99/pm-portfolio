"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import type { ShelfBook } from "@/lib/data";
import { staggerItem } from "@/components/ui/Reveal";
import { useMobileLightweight } from "@/hooks/useMobileLightweight";

export function BookCard({ book }: { book: ShelfBook }) {
  const [broken, setBroken] = useState(false);
  const lightweight = useMobileLightweight();
  const hasCover = book.cover && !broken;

  const card = (
    <>
      <div className="relative aspect-[2/3] w-full overflow-hidden rounded-2xl border border-line bg-elevated shadow-lift">
        {hasCover ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={book.cover}
            alt={`Cover of ${book.title}`}
            loading="lazy"
            onError={() => setBroken(true)}
            className="h-full w-full object-cover transition-transform duration-500 ease-out md:group-hover:scale-[1.06]"
          />
        ) : (
          <div className="flex h-full w-full flex-col justify-end gap-1 bg-gradient-to-br from-surface to-elevated p-4">
            <span className="font-display text-sm font-semibold leading-snug line-clamp-5">
              {book.title}
            </span>
            {book.author && (
              <span className="text-[11px] text-muted">{book.author}</span>
            )}
          </div>
        )}

        <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/5" />
        <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 md:group-hover:opacity-100 [box-shadow:0_0_0_1px_rgb(var(--accent)/0.5),0_30px_60px_-20px_rgb(var(--accent)/0.45)]" />
      </div>

      <div className="mt-3 px-0.5 sm:mt-3.5">
        <h3 className="line-clamp-2 text-[13px] font-semibold leading-snug tracking-tight sm:text-sm">
          {book.title}
        </h3>
        {book.author && (
          <p className="mt-1 line-clamp-1 text-[11px] text-muted sm:text-xs">
            {book.author}
          </p>
        )}
      </div>
    </>
  );

  if (lightweight) {
    return (
      <div className="group w-[10.75rem] shrink-0 snap-start text-left sm:w-auto sm:shrink">
        {card}
      </div>
    );
  }

  return (
    <motion.div
      variants={staggerItem}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="group w-[10.75rem] shrink-0 snap-start text-left sm:w-auto sm:shrink"
    >
      {card}
    </motion.div>
  );
}
