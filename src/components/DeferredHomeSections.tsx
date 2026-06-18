"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, type ReactNode } from "react";

const About = dynamic(() => import("@/components/About").then((m) => m.About), {
  ssr: false,
});
const Projects = dynamic(() => import("@/components/Projects").then((m) => m.Projects), {
  ssr: false,
});
const CaseStudies = dynamic(
  () => import("@/components/CaseStudies").then((m) => m.CaseStudies),
  { ssr: false }
);
const Blog = dynamic(() => import("@/components/Blog").then((m) => m.Blog), {
  ssr: false,
});
const Skills = dynamic(() => import("@/components/Skills").then((m) => m.Skills), {
  ssr: false,
});
const Contact = dynamic(() => import("@/components/Contact").then((m) => m.Contact), {
  ssr: false,
});

function LazyMount({
  children,
  placeholderHeight = "16rem",
}: {
  children: ReactNode;
  placeholderHeight?: string;
}) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current || visible) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "320px 0px" }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [visible]);

  return (
    <div ref={ref}>
      {visible ? (
        children
      ) : (
        <div
          className="mx-auto w-full max-w-6xl px-4 sm:px-6"
          style={{ minHeight: placeholderHeight }}
          aria-hidden="true"
        />
      )}
    </div>
  );
}

export function DeferredHomeSections() {
  return (
    <>
      <LazyMount placeholderHeight="20rem">
        <About />
      </LazyMount>
      <LazyMount>
        <Projects />
      </LazyMount>
      <LazyMount>
        <CaseStudies />
      </LazyMount>
      <LazyMount>
        <Blog />
      </LazyMount>
      <LazyMount>
        <Skills />
      </LazyMount>
      <LazyMount>
        <Contact />
      </LazyMount>
    </>
  );
}
