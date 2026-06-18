import { shelfBooks } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Shelf } from "@/components/onshelf/Shelf";

export function OnShelf() {
  return (
    <section
      id="shelf"
      className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24 md:py-32"
    >
      <div className="pointer-events-none absolute right-1/2 top-24 -z-10 h-64 w-64 translate-x-1/2 rounded-full bg-accent2/10 blur-[90px] sm:h-80 sm:w-80 sm:blur-[120px]" />

      <SectionHeading
        eyebrow="Reading"
        title="On My Shelf"
        description="A few books currently shaping how I think about products, technology, psychology, and building things."
      />

      <Shelf books={shelfBooks} />
    </section>
  );
}
