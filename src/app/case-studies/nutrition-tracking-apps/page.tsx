import type { Metadata } from "next";
import { CaseStudy } from "./CaseStudy";

export const metadata: Metadata = {
  title: "Napkin Math vs Healthify vs MyFitnessPal",
  description:
    "A product comparison of Napkin Math, Healthify, and MyFitnessPal focused on logging friction, behavior loops, and retention.",
  openGraph: {
    title: "Napkin Math vs Healthify vs MyFitnessPal",
    description:
      "Why people keep using nutrition apps, based on logging friction, guidance systems, and precision tracking needs.",
    type: "article",
  },
};

export default function Page() {
  return <CaseStudy />;
}
