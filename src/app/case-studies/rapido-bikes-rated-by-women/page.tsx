import type { Metadata } from "next";
import { CaseStudy } from "./CaseStudy";

export const metadata: Metadata = {
  title: "Rapido's 'Bikes Rated by Women': Trust Signal Product Analysis",
  description:
    "A product analysis of how Rapido can reduce women riders' booking drop-off by surfacing trust signals from existing rating data.",
  openGraph: {
    title: "Rapido's 'Bikes Rated by Women': Trust Signal Product Analysis",
    description:
      "How trust filters can improve conversion in two-sided mobility marketplaces using existing data and lightweight dispatch changes.",
    type: "article",
  },
};

export default function Page() {
  return <CaseStudy />;
}
