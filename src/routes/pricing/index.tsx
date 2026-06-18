import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { PACKAGES } from "@/lib/content";
import { PageHero } from "../services";
import { ArrowUpRight, Check } from "lucide-react";

export const Route = createFileRoute("/pricing/")({
  head: () => ({
    meta: [
      { title: "Pricing — Hire Career Coach" },
      { name: "description", content: "Transparent career document packages for early, mid, senior and executive professionals." },
      { property: "og:title", content: "Pricing — Hire Career Coach" },
      { property: "og:description", content: "Career packages tailored to your stage, with single-service add-ons." },
    ],
  }),
  component: PricingOverview,
});

function PricingOverview() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title={[{ t: "Transparent" }, { t: "packages,", gold: true, italic: true }, { t: "no surprises." }]}
        sub="Choose the package that matches your career stage. Every plan includes ATS optimization and a senior writer — no juniors, no offshoring."
      />

      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-16 sm:py-20">
        <div className="grid gap-6 md:grid-cols-2">
          {PACKAGES.map((group, gi) => {
            const pro = group.tiers.find((t) => t.highlight) ?? group.tiers[group.tiers.length - 1];
            const from = Math.min(...group.tiers.map((t) => t.price));
            return (
              <Reveal
                key={group.id}
                delay={gi * 80}
                className="group relative flex flex-col rounded-3xl border border-border bg-card p-8 sm:p-10 shadow-soft transition-colors hover:border-gold/60"
              >
                <p className="text-xs uppercase tracking-[0.28em] text-gold">Package 0{gi + 1}</p>
                <h2 className="mt-3 font-display text-3xl sm:text-4xl leading-tight">{group.level}</h2>
                <p className="mt-4 text-foreground/70 leading-relaxed">{group.blurb}</p>

                <div className="mt-6 flex items-baseline gap-2">
                  <span className="text-sm text-muted-foreground">from</span>
                  <span className="font-display text-4xl text-navy">${from}</span>
                  <span className="text-sm text-muted-foreground">· {group.tiers.length} tiers</span>
                </div>

                <ul className="mt-6 grid gap-2.5 text-sm text-foreground/80 sm:grid-cols-2">
                  {pro.features.slice(0, 6).map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-navy-deep" strokeWidth={2.5} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to="/pricing/$id"
                  params={{ id: group.id }}
                  className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-navy px-6 py-3 text-sm font-medium text-ivory transition-colors hover:bg-navy-deep"
                >
                  View plans &amp; pricing
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>
    </>
  );
}
