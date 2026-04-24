"use client";

import { SectionHeader } from "../../components/SectionHeader";

/**
 * Renders a section header preview using the actual SectionHeader component
 * Wraps it in section styling for admin preview
 */
export function SectionHeaderPreview({
  label,
  title1,
  title2,
  intro,
  bgClass = "bg-muted",
}: {
  label?: string;
  title1?: string;
  title2?: string;
  intro?: string;
  bgClass?: string;
}) {
  return (
    <section className={`py-12 ${bgClass} rounded-xl`}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-2xl mx-auto">
          <SectionHeader
            label={label}
            title1={title1}
            title2={title2}
            intro={intro}
          />
        </div>
      </div>
    </section>
  );
}
