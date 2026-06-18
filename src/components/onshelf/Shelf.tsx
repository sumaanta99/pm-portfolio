"use client";

import type { ShelfBook } from "@/lib/data";
import { Reveal, StaggerGroup } from "@/components/ui/Reveal";
import { BookCard } from "./BookCard";

export function Shelf({ books }: { books: ShelfBook[] }) {
  if (books.length === 0) {
    return (
      <Reveal direction="up" delay={0.1}>
        <div className="mt-10 flex flex-col items-center justify-center rounded-4xl border border-dashed border-line bg-surface/40 px-6 py-16 text-center sm:py-20">
          <p className="font-display text-lg font-semibold text-ink sm:text-xl">
            Nothing on the shelf right now.
          </p>
          <p className="mt-2 text-sm text-muted">
            Probably building something instead.
          </p>
        </div>
      </Reveal>
    );
  }

  return (
    <StaggerGroup className="-mx-4 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 pr-6 touch-pan-x [scrollbar-width:none] [&::-webkit-scrollbar]:hidden after:h-px after:w-0.5 after:shrink-0 after:content-[''] sm:mx-0 sm:mt-12 sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-0 sm:pr-0 sm:after:hidden md:grid-cols-3 lg:grid-cols-4">
      {books.map((book) => (
        <BookCard key={book.title} book={book} />
      ))}
    </StaggerGroup>
  );
}
