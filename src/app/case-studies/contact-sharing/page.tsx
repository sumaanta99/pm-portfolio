import type { Metadata } from "next";
import { CaseStudy } from "./CaseStudy";

export const metadata: Metadata = {
  title: "Consent-driven Contact Sharing: Port Case Study",
  description:
    "How I shipped a three-party, consent-driven contact sharing flow on Port, allowing warm introductions without exposing identity before approval.",
  openGraph: {
    title: "Consent-driven Contact Sharing: Port Case Study",
    description:
      "A privacy-first contact sharing feature with request, consent, and relay states, permission gating, and single-use connection bundles.",
    type: "article",
  },
};

export default function Page() {
  return <CaseStudy />;
}
