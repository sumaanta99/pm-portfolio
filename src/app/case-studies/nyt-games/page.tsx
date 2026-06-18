import type { Metadata } from "next";
import { CaseStudy } from "./CaseStudy";

export const metadata: Metadata = {
  title: "NYT Games: Why Subscription Changes Product Decisions",
  description:
    "A product teardown of how The New York Times uses daily puzzle habits to support subscription retention, and what free-to-play teams can apply.",
  openGraph: {
    title: "NYT Games: Why Subscription Changes Product Decisions",
    description:
      "Subscription bundling versus free-to-play, with analysis of streak design, sharing loops, and retention economics in NYT Games.",
    type: "article",
  },
};

export default function Page() {
  return <CaseStudy />;
}
