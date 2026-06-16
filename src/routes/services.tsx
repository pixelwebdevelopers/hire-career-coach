import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { SERVICES } from "@/lib/content";
import workspace from "@/assets/workspace.jpg";
import { ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Hire Career Coach" },
      { name: "description", content: "Resume writing, LinkedIn optimization, interview prep, ghostwriting and career coaching for every stage." },
      { property: "og:title", content: "Services — Hire Career Coach" },
      { property: "og:description", content: "Nine ways we move your career forward — from first résumé to executive narrative." },
      { property: "og:image", content: workspace },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title={[{ t: "Every chapter of your", italic: true }, { t: "career,", gold: true }, { t: "written by hand." }]}
        sub="Single services or full packages. Each one delivered by a senior coach who has hired into your industry — not a junior writer with a template."
      />

      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-20">
        <div className="grid gap-px bg-border border border-border rounded-3xl overflow-hidden md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={i * 60} className="group relative bg-background p-8 sm:p-10 hover:bg-cream transition-colors">
              <p className="font-display text-sm text-gold">0{i + 1}</p>
              <h3 className="mt-3 font-display text-2xl sm:text-3xl">{s.title}</h3>
              <p className="mt-3 text-foreground/70 leading-relaxed">{s.desc}</p>
              <ArrowUpRight className="absolute top-8 right-8 h-5 w-5 text-foreground/30 transition-all group-hover:text-gold group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-20 rounded-3xl bg-navy text-ivory p-10 sm:p-14 flex flex-col lg:flex-row gap-6 lg:items-center lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-gold">— Not sure where to start?</p>
            <h3 className="font-display text-3xl sm:text-4xl mt-3 leading-tight">A 15-minute call is the fastest way to find out.</h3>
          </div>
          <Link to="/contact" className="inline-flex items-center justify-center rounded-full bg-gold text-navy-deep px-7 py-3.5 font-semibold whitespace-nowrap hover:bg-gold-soft transition-colors">
            Book a call
          </Link>
        </Reveal>
      </section>
    </>
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
