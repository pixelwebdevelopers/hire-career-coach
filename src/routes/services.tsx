import { createFileRoute, Link, useRouterState } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { SERVICES } from "@/lib/content";
import workspace from "@/assets/workspace.jpg";
import { ArrowUpRight, Check } from "lucide-react";
import { useEffect } from "react";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Hire Career Coach" },
      { name: "description", content: "Resume writing, ATS audits, LinkedIn optimization, interview prep, personal branding, ghostwriting and career coaching for every stage." },
      { property: "og:title", content: "Professional Career Services — Hire Career Coach" },
      { property: "og:description", content: "Ten ways we move your career forward — from first résumé to executive narrative." },
      { property: "og:image", content: workspace },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  // Scroll to the targeted service section when arriving with a hash
  // (e.g. from the homepage cards) or on direct load/reload. TanStack's
  // scroll handling resets to top, so we scroll explicitly here.
  const hash = useRouterState({ select: (s) => s.location.hash });
  useEffect(() => {
    const target = (hash || "").replace(/^#/, "");
    if (!target) return;
    let raf = 0;
    let tries = 0;
    const go = () => {
      const el = document.getElementById(target);
      if (el) {
        // Manual offset for the sticky header. We avoid scrollIntoView/smooth
        // here so it works regardless of the global `scroll-behavior: smooth`.
        const y = window.scrollY + el.getBoundingClientRect().top - 96;
        window.scrollTo({ top: y, behavior: "instant" as ScrollBehavior });
      } else if (tries++ < 12) {
        raf = requestAnimationFrame(go);
      }
    };
    const id = window.setTimeout(go, 80);
    return () => {
      window.clearTimeout(id);
      cancelAnimationFrame(raf);
    };
  }, [hash]);

  return (
    <>
      <PageHero
        eyebrow="Professional Career Services"
        title={[{ t: "Every chapter of your", italic: true }, { t: "career,", gold: true }, { t: "written by experts who understand your industry."}]}
        sub="From ATS-optimized resumes to LinkedIn profiles and career coaching, every service is delivered with a personalized approach by experienced career specialists—not junior writers using generic templates. Because your career deserves strategy, expertise, and results"
      />

      {/* Quick-nav across all services */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 pt-12 sm:pt-16 pb-4">
        <Reveal>
          <div className="flex flex-wrap gap-2.5">
            {SERVICES.map((s) => (
              <a
                key={s.slug}
                href={`#${s.slug}`}
                className="group inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm text-foreground/80 transition-colors hover:border-gold hover:text-foreground"
              >
                <s.icon className="h-4 w-4 text-gold" />
                {s.title}
              </a>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Detailed service sections */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-12 sm:py-16">
        <div className="space-y-6">
          {SERVICES.map((s) => (
            <ServiceDetail key={s.slug} s={s} />
          ))}
        </div>

        {/* Closing CTA */}
        <Reveal className="mt-16 rounded-3xl bg-navy text-ivory p-10 sm:p-14 flex flex-col lg:flex-row gap-6 lg:items-center lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-gold">— Ready to accelerate your career?</p>
            <h3 className="font-display text-3xl sm:text-4xl mt-3 leading-tight max-w-2xl">
              Tell us where you want to be. We'll show you the paper trail that gets you there.
            </h3>
          </div>
          <Link to="/pricing" className="inline-flex items-center justify-center gap-2 rounded-full bg-gold text-navy-deep px-7 py-3.5 font-semibold whitespace-nowrap hover:bg-gold-soft transition-colors">
            Explore Packages <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </section>
    </>
  );
}

function ServiceDetail({ s }: { s: (typeof SERVICES)[number] }) {
  return (
    <Reveal
      as="article"
      id={s.slug}
      className="scroll-mt-28 rounded-3xl border border-border bg-card p-8 sm:p-10 lg:p-12"
    >
      <div className="grid gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-14">
        {/* Left: narrative */}
        <div>
          <div className="flex items-center gap-4">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gold/10 text-gold">
              <s.icon className="h-6 w-6" />
            </span>
            <p className="text-xs uppercase tracking-[0.28em] text-gold">{s.title}</p>
          </div>

          <h2 className="mt-6 font-display text-3xl sm:text-4xl leading-[1.1] text-balance">{s.headline}</h2>

          <div className="mt-5 space-y-4 text-foreground/70 leading-relaxed">
            {s.intro.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <div className="mt-7 rounded-2xl bg-cream p-6">
            <h3 className="font-display text-lg text-navy-deep">{s.why.title}</h3>
            <p className="mt-2 text-foreground/70 leading-relaxed">{s.why.body}</p>
          </div>

          <Link
            to="/pricing"
            className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-navy"
          >
            <span className="gold-underline">Start with {s.title}</span>
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Right: what you'll get */}
        <div className="lg:border-l lg:border-border lg:pl-14">
          <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">What you'll get</p>
          <ul className="mt-6 space-y-4">
            {s.features.map((f) => (
              <li key={f} className="flex items-start gap-3">
                {/* Charcoal checkmarks per brand guidance — turquoise reserved for accents */}
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-navy-deep text-ivory">
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
                <span className="text-foreground/85">{f}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Reveal>
  );
}

export function PageHero({ eyebrow, title, sub }: { eyebrow: string; title: { t: string; gold?: boolean; italic?: boolean }[]; sub: string }) {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute -top-40 -right-40 h-[36rem] w-[36rem] rounded-full bg-gold/10 blur-3xl" />
      <div className="mx-auto max-w-7xl px-5 sm:px-8 pt-16 sm:pt-24 pb-16">
        <p className="reveal-mask text-xs uppercase tracking-[0.3em] text-gold">
          <span style={{ ['--rd' as any]: '0ms' }}>— {eyebrow}</span>
        </p>
        <h1 className="font-display mt-6 text-5xl sm:text-6xl lg:text-7xl leading-[1.05] text-balance max-w-5xl">
          {title.map((w, i) => (
            <span key={i} className="reveal-mask mr-3">
              <span
                style={{ ['--rd' as any]: `${100 + i * 120}ms` }}
                className={[w.italic ? "italic font-normal" : "font-medium", w.gold ? "text-transparent bg-clip-text bg-gradient-gold" : ""].join(" ")}
              >
                {w.t}
              </span>
            </span>
          ))}
        </h1>
        <p className="reveal-mask block mt-8 max-w-2xl text-lg text-foreground/70 leading-relaxed">
          <span style={{ ['--rd' as any]: '600ms' }}>{sub}</span>
        </p>
      </div>
      <div className="hairline" />
    </section>
  );
}
