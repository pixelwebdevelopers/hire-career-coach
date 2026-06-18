import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { PageHero } from "./services";
import workspace from "@/assets/workspace.jpg";
import interview from "@/assets/interview.jpg";
import aboutUs from "@/assets/about-us.webp";
import { Check, Target, UserCheck, Layers, TrendingUp, Search, PenTool, SlidersHorizontal, Award } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Hire Career Coach" },
      { name: "description", content: "A boutique career consultancy helping professionals — from early career to executive leadership — present their stories with clarity, confidence and strategy." },
      { property: "og:title", content: "About — Hire Career Coach" },
      { property: "og:description", content: "A career studio, not a résumé mill. Quiet wins. Loud careers." },
      { property: "og:image", content: interview },
    ],
  }),
  component: AboutPage,
});

const VALUES = [
  { t: "Craft over volume", d: "We take on a handful of clients each month. Your draft is never assembly-lined." },
  { t: "Strategy first", d: "Before we write a line, we map the role you want and the room you're walking into." },
  { t: "Quiet confidence", d: "No buzzwords, no humblebrags. Just sentences that pass the executive-team read-through." },
  { t: "Long-game thinking", d: "We're not chasing a sale. We're building a relationship for your next three career moves." },
];

const DIFFERENTIATORS = [
  { icon: Target, t: "ATS-focused strategy", d: "Every resume and LinkedIn profile is optimized to perform in Applicant Tracking Systems while remaining compelling for recruiters and decision-makers." },
  { icon: UserCheck, t: "Personalized career support", d: "No generic templates. Every document and coaching engagement is tailored to your background, achievements and aspirations." },
  { icon: Layers, t: "Industry-specific expertise", d: "Every profession has different expectations. Our approach adapts to your target industry, career level and leadership goals." },
  { icon: TrendingUp, t: "Results-driven approach", d: "Everything we do is designed to improve visibility, increase interviews, strengthen your brand and accelerate growth." },
];

const AUDIENCE = [
  "Recent graduates & entry-level professionals",
  "Mid-career professionals",
  "Career changers",
  "Managers & team leaders",
  "Directors & senior leaders",
  "C-suite & executive professionals",
  "Entrepreneurs & consultants",
  "Remote job seekers",
  "International professionals",
  "Healthcare, IT, engineering, finance & business professionals",
];

const APPROACH = [
  { icon: Search, t: "Discover", d: "We learn about your background, achievements, goals and target opportunities." },
  { icon: PenTool, t: "Develop", d: "We create compelling career documents and personal branding assets tailored to your objectives." },
  { icon: SlidersHorizontal, t: "Optimize", d: "We incorporate ATS keywords, recruiter-focused messaging and industry best practices." },
  { icon: Award, t: "Position", d: "We help you present yourself confidently to recruiters, hiring managers, executives and networks." },
];

function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Hire Career Coach"
        title={[{ t: "A career studio,", italic: true }, { t: "not a", }, { t: "résumé mill.", gold: true, italic: true }]}
        sub="Hire Career Coach is a boutique career consultancy helping professionals — from early career to executive leadership — present their stories with clarity, confidence and strategy."
      />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <Link to="/contact" className="inline-flex rounded-full bg-navy text-ivory px-6 py-3 text-sm font-medium hover:bg-navy-deep transition-colors">
            Get a free resume review
          </Link>
        </Reveal>
      </div>

      {/* Our Story */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-20 grid gap-12 lg:grid-cols-2 items-center">
        <Reveal>
          <div className="relative aspect-[5/6] rounded-3xl overflow-hidden">
            <img src={aboutUs} alt="The Hire Career Coach studio" className="h-full w-full object-cover" loading="lazy" width={1600} height={1100} />
          </div>
        </Reveal>
        <Reveal delay={120}>
          <p className="text-xs uppercase tracking-[0.28em] text-gold">— Our story</p>
          <h2 className="font-display text-4xl sm:text-5xl mt-4 leading-[1.05] text-balance">Your career deserves more than a generic template.</h2>
          <div className="mt-6 space-y-5 text-foreground/75 text-lg leading-relaxed">
            <p>
              Most talented professionals don't struggle because they lack skills. They struggle
              because their experience isn't presented in a way that captures attention.
            </p>
            <p>
              We believe every professional has a unique story worth telling. Our mission is to help
              you communicate your value clearly, confidently and strategically — through resume
              writing, LinkedIn optimization, coaching, interview preparation and personal branding.
            </p>
            <p>
              From entry-level professionals to senior leaders and C-suite executives, we help clients
              showcase their achievements and position themselves for meaningful opportunities. Every
              project is customized — never a one-size-fits-all solution.
            </p>
          </div>
        </Reveal>
      </section>

      {/* Mission */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 pb-4">
        <Reveal className="rounded-3xl bg-navy text-ivory p-10 sm:p-14 text-center">
          <p className="text-xs uppercase tracking-[0.28em] text-gold">— Our mission</p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl mt-4 leading-[1.1] text-balance max-w-4xl mx-auto">
            To help professionals gain clarity, build confidence, attract recruiters, secure interviews and achieve meaningful career growth.
          </h2>
          <p className="mt-6 text-ivory/75 leading-relaxed max-w-2xl mx-auto">
            Whether you're starting out, changing industries, pursuing leadership or advancing into
            executive roles, we provide personalized guidance designed to move your career forward.
          </p>
        </Reveal>
      </section>

      {/* What makes us different */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-20">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.28em] text-gold">— Why professionals choose us</p>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl mt-4 leading-[1.05]">What makes us different.</h2>
        </Reveal>
        <div className="mt-14 grid gap-px bg-border border border-border rounded-3xl overflow-hidden md:grid-cols-2">
          {DIFFERENTIATORS.map((v, i) => (
            <Reveal key={v.t} delay={i * 90} className="bg-background p-10">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gold/10 text-gold">
                <v.icon className="h-6 w-6" />
              </span>
              <h3 className="font-display text-2xl sm:text-3xl mt-5">{v.t}</h3>
              <p className="mt-3 text-foreground/70 leading-relaxed">{v.d}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Principles */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 pb-20">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.28em] text-gold">— Principles</p>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl mt-4 leading-[1.05]">What we believe.</h2>
        </Reveal>
        <div className="mt-14 grid gap-px bg-border border border-border rounded-3xl overflow-hidden md:grid-cols-2">
          {VALUES.map((v, i) => (
            <Reveal key={v.t} delay={i * 90} className="bg-background p-10">
              <p className="font-display text-sm text-gold">0{i + 1}</p>
              <h3 className="font-display text-3xl mt-3">{v.t}</h3>
              <p className="mt-3 text-foreground/70 leading-relaxed">{v.d}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Who we help */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 pb-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] items-start">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.28em] text-gold">— Who we help</p>
            <h2 className="font-display text-4xl sm:text-5xl mt-4 leading-[1.05] text-balance">Support across every career stage.</h2>
            <p className="mt-6 text-foreground/70 text-lg leading-relaxed">
              From first professional role to executive leadership, we help professionals stand out
              and achieve their goals — in any industry, anywhere in the world.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
              {AUDIENCE.map((a) => (
                <li key={a} className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-navy-deep text-ivory">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  <span className="text-foreground/85">{a}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Our approach */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 pb-20">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.28em] text-gold">— Our approach</p>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl mt-4 leading-[1.05]">A process designed for results.</h2>
        </Reveal>
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {APPROACH.map((a, i) => (
            <Reveal key={a.t} delay={i * 90} className="rounded-3xl border border-border bg-card p-8">
              <div className="flex items-center justify-between">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gold/10 text-gold">
                  <a.icon className="h-5 w-5" />
                </span>
                <span className="font-display text-3xl text-foreground/15">0{i + 1}</span>
              </div>
              <h3 className="font-display text-2xl mt-5">{a.t}</h3>
              <p className="mt-3 text-foreground/70 leading-relaxed text-sm">{a.d}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Commitment */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 pb-20">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.28em] text-gold">— Our commitment</p>
            <h2 className="font-display text-4xl sm:text-5xl mt-4 leading-[1.05]">More than career documents.</h2>
            <div className="mt-6 space-y-5 text-foreground/75 text-lg leading-relaxed">
              <p>
                A resume alone doesn't get results. Success comes from combining strong career
                documents, strategic positioning, personal branding and effective job search strategies.
              </p>
              <p>
                That's why our focus extends beyond writing resumes. We help you build confidence,
                communicate your value and create opportunities for long-term career success —
                whether you're pursuing your first role or competing for executive leadership.
              </p>
            </div>
            <Link to="/contact" className="mt-8 inline-flex rounded-full bg-navy text-ivory px-6 py-3 text-sm font-medium hover:bg-navy-deep transition-colors">
              Schedule a discovery call
            </Link>
          </Reveal>
          <Reveal delay={150}>
            <div className="relative aspect-[5/4] rounded-3xl overflow-hidden">
              <img src={workspace} alt="The studio at work" className="h-full w-full object-cover" loading="lazy" width={1600} height={1100} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 pb-24">
        <Reveal className="rounded-3xl bg-gradient-navy text-ivory p-10 sm:p-14 flex flex-col lg:flex-row gap-6 lg:items-center lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-gold">— Ready to move your career forward?</p>
            <h3 className="font-display text-3xl sm:text-4xl mt-3 leading-tight max-w-2xl">
              Let's help you stand out and achieve your goals.
            </h3>
          </div>
          <Link to="/contact" className="inline-flex items-center justify-center rounded-full bg-gold text-navy-deep px-7 py-3.5 font-semibold whitespace-nowrap hover:bg-gold-soft transition-colors">
            Book a call
          </Link>
        </Reveal>
      </section>
    </>
  );
}
