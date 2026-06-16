import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { PACKAGES } from "@/lib/content";
import { PageHero } from "./services";
import { Check, Sparkles } from "lucide-react";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — Hire Career Coach" },
      { name: "description", content: "Transparent career document packages for early, mid, senior and executive professionals." },
      { property: "og:title", content: "Pricing — Hire Career Coach" },
      { property: "og:description", content: "Career packages tailored to your stage, with single-service add-ons." },
    ],
  }),
  component: PricingPage,
});

function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title={[{ t: "Transparent" }, { t: "packages,", gold: true, italic: true }, { t: "no surprises." }]}
        sub="Choose a tier by career stage. Every package includes ATS optimization and a senior writer — no juniors, no offshoring."
      />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {PACKAGES.map((group, gi) => (
          <section key={group.id} id={group.id} className="py-16 sm:py-20 border-b border-border last:border-0 scroll-mt-28">
            <Reveal className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-gold">Tier 0{gi + 1}</p>
                <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl mt-3 leading-[1.05]">{group.level}</h2>
                <p className="mt-4 max-w-2xl text-foreground/70 text-lg leading-relaxed">{group.blurb}</p>
              </div>
            </Reveal>

            <div className="grid gap-6 lg:grid-cols-3">
              {group.tiers.map((t, i) => (
                <Reveal
                  key={t.name}
                  delay={i * 100}
                  className={[
                    "relative rounded-3xl p-8 border transition-colors flex flex-col",
                    t.highlight
                      ? "bg-navy text-ivory border-navy shadow-soft"
                      : "bg-card border-border hover:border-gold/60",
                  ].join(" ")}
                >
                  {t.highlight && (
                    <span className="absolute -top-3 left-8 inline-flex items-center gap-1.5 rounded-full bg-gold text-navy-deep px-3 py-1 text-[11px] font-semibold uppercase tracking-wider">
                      <Sparkles className="h-3 w-3" /> Most chosen
                    </span>
                  )}
                  <p className={["text-xs uppercase tracking-[0.22em]", t.highlight ? "text-gold" : "text-muted-foreground"].join(" ")}>{t.name}</p>
                  <div className="mt-6 flex items-baseline gap-2">
                    <span className="font-display text-6xl">${t.price}</span>
                    <span className={["text-sm", t.highlight ? "text-ivory/60" : "text-muted-foreground"].join(" ")}>one-time</span>
                  </div>
                  <ul className={["mt-8 space-y-3 text-sm flex-1", t.highlight ? "text-ivory/85" : "text-foreground/80"].join(" ")}>
                    {t.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5">
                        <Check className={["h-4 w-4 shrink-0 mt-0.5", t.highlight ? "text-gold" : "text-gold"].join(" ")} />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/contact"
                    className={[
                      "mt-10 inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium transition-colors",
                      t.highlight ? "bg-gold text-navy-deep hover:bg-gold-soft" : "bg-navy text-ivory hover:bg-navy-deep",
                    ].join(" ")}
                  >
                    Choose {t.name}
                  </Link>
                </Reveal>
              ))}
            </div>

            <Reveal delay={300} className="mt-12 rounded-3xl bg-cream border border-border p-8 sm:p-10">
              <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
                <p className="text-xs uppercase tracking-[0.22em] text-gold">À la carte — Individual services</p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-px bg-border rounded-2xl overflow-hidden border border-border">
                {group.addOns.map((a) => (
                  <div key={a.name} className="bg-background p-5">
                    <p className="text-sm text-foreground/70">{a.name}</p>
                    <p className="font-display text-2xl mt-1 text-navy">${a.price}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </section>
        ))}
      </div>
    </>
  );
}
