import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { PACKAGES, type Tier } from "@/lib/content";
import { ArrowLeft, CheckCircle2, XCircle } from "lucide-react";

const REVISION_RE = /revisions?/i;

export const Route = createFileRoute("/pricing/$id")({
  loader: ({ params }) => {
    const group = PACKAGES.find((p) => p.id === params.id);
    if (!group) throw notFound();
    return { group };
  },
  head: ({ params }) => {
    const group = PACKAGES.find((p) => p.id === params.id);
    const title = group ? `${group.level} Packages — Hire Career Coach` : "Pricing — Hire Career Coach";
    return {
      meta: [
        { title },
        { name: "description", content: group?.blurb ?? "Career document packages by stage." },
        { property: "og:title", content: title },
      ],
    };
  },
  component: PackagePage,
});

function PackagePage() {
  const { group } = Route.useLoaderData();

  // Shared comparison rows = the richest tier's features (minus revisions, which
  // every tier has but with a different count and are shown on their own row).
  const richest = group.tiers.find((t) => t.highlight) ?? group.tiers[group.tiers.length - 1];
  const masterFeatures = richest.features.filter((f) => !REVISION_RE.test(f));

  return (
    <section className="relative overflow-hidden">
      {/* Angled background bands (decorative, theme-driven) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-[15%] -top-[20%] h-[140%] w-[42%] -rotate-[18deg] bg-gradient-to-br from-gold/15 via-gold/5 to-transparent" />
        <div className="absolute -left-[6%] top-[10%] h-[120%] w-[26%] -rotate-[18deg] bg-gradient-to-br from-gold/10 to-transparent" />
        <div className="absolute -right-[12%] bottom-[-25%] h-[120%] w-[34%] -rotate-[18deg] bg-gradient-to-tl from-gold/12 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 py-16 sm:py-24">
        {/* Back link */}
        <Link to="/pricing" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-navy">
          <ArrowLeft className="h-4 w-4" />
          All packages
        </Link>

        {/* Centered header (matches the reference layout) */}
        <Reveal className="mt-8 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-gold">{group.level}</p>
          <h1 className="mt-4 font-display text-4xl font-semibold sm:text-5xl lg:text-6xl text-navy-deep">
            Pricing &amp; Plans
          </h1>
          <span className="mx-auto mt-4 block h-[3px] w-28 rounded-full bg-gold" />
          <p className="mx-auto mt-6 max-w-2xl text-foreground/70 leading-relaxed">{group.blurb}</p>
        </Reveal>

        {/* Comparison cards */}
        <div className="mt-14 grid items-start gap-6 lg:grid-cols-3 lg:gap-8">
          {group.tiers.map((tier, i) => (
            <PlanCard key={tier.name} tier={tier} masterFeatures={masterFeatures} delay={i * 100} />
          ))}
        </div>

        {/* Add-ons */}
        <Reveal delay={200} className="mt-16 rounded-3xl border border-border bg-card p-8 sm:p-10">
          <p className="text-xs uppercase tracking-[0.22em] text-gold">À la carte — Individual services</p>
          <div className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-5">
            {group.addOns.map((a) => (
              <div key={a.name} className="bg-background p-5">
                <p className="text-sm text-foreground/70">{a.name}</p>
                <p className="mt-1 font-display text-2xl text-navy">${a.price}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function PlanCard({ tier, masterFeatures, delay }: { tier: Tier; masterFeatures: string[]; delay: number }) {
  const revision = tier.features.find((f) => REVISION_RE.test(f));
  const rows = [
    ...masterFeatures.map((f) => ({ label: f, included: tier.features.includes(f) })),
    ...(revision ? [{ label: revision, included: true }] : []),
  ];

  return (
    <Reveal
      delay={delay}
      className={[
        "relative flex flex-col rounded-3xl bg-card p-8 shadow-soft transition-transform",
        tier.highlight
          ? "border-2 border-gold lg:-translate-y-3"
          : "border border-border",
      ].join(" ")}
    >
      {tier.highlight && (
        <span className="absolute -top-5 left-1/2 z-10 flex h-16 w-16 -translate-x-1/2 flex-col items-center justify-center rounded-full bg-navy text-center text-[9px] font-semibold uppercase leading-tight tracking-wider text-ivory shadow-soft">
          Top
          <br />
          Seller
        </span>
      )}

      <div className={tier.highlight ? "mt-6" : ""}>
        <h3 className="text-center font-display text-2xl font-semibold text-navy-deep sm:text-3xl">{tier.name}</h3>
        <div className="mt-4 flex items-baseline justify-center gap-1.5">
          <span className="font-display text-5xl text-navy">${tier.price}</span>
          <span className="text-sm text-muted-foreground">one-time</span>
        </div>
      </div>

      <ul className="mt-8 flex-1 space-y-4 text-sm">
        {rows.map((r, i) => (
          <li key={i} className="flex items-start gap-3">
            {r.included ? (
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
            ) : (
              <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground/50" />
            )}
            <span className={r.included ? "text-foreground/85" : "text-muted-foreground/60 line-through"}>{r.label}</span>
          </li>
        ))}
      </ul>

      <Link
        to="/contact"
        className={[
          "mt-10 inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition-colors",
          tier.highlight
            ? "bg-gold text-navy-deep hover:bg-gold-soft"
            : "bg-navy text-ivory hover:bg-navy-deep",
        ].join(" ")}
      >
        Choose {tier.name}
      </Link>
    </Reveal>
  );
}
