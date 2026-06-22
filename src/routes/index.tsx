import { createFileRoute, Link } from "@tanstack/react-router";
import { Hero } from "@/components/home/Hero";
import { Reveal } from "@/components/Reveal";
import { SERVICES, PACKAGES } from "@/lib/content";
import workspace from "@/assets/workspace.jpg";
import interview from "@/assets/interview.jpg";
import process from "@/assets/process.jpg";
import {
  ArrowUpRight,
  Check,
  Quote,
  Star,
  Package,
  UserCheck,
  CalendarClock,
  PenTool,
  FileCheck2,
  Layers,
  ShieldCheck,
  Globe,
  Gem,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Hire Career Coach — Resumes, LinkedIn & Career Coaching" },
      { name: "description", content: "Premium resume writing, LinkedIn optimization, interview prep and career coaching for early-career to executive professionals." },
      { property: "og:title", content: "Hire Career Coach — Guide. Grow. Succeed." },
      { property: "og:description", content: "Resumes, LinkedIn and coaching for every stage — graduate to C-suite." },
      { property: "og:image", content: workspace },
    ],
  }),
  component: Home,
});

const STATS = [
  { v: "2,000+", l: "Professionals Served" },
  { v: "20+", l: "Years in business" },
  { v: "50 States & 30+ Countries", l: "with clients" },
  { v: "Senior Writer Every Time", l: "No Outsourcing. No Templates. No Shortcuts." },
];

const TESTIMONIALS = [
  {
    quote: "I had three interviews lined up within ten days of my new resume going live. Two became offers — both above my target band.",
    name: "Priya R.",
    role: "Senior Product Manager",
    industry: "Product · FinTech",
  },
  {
    quote: "They didn't just rewrite my resume. They re-articulated my career. The LinkedIn rework alone brought four recruiter intros that week.",
    name: "Marcus D.",
    role: "VP, Engineering",
    industry: "Engineering Leadership",
  },
  {
    quote: "Interview prep was the unlock. I walked into the boardroom with answers I actually believed in.",
    name: "Helena S.",
    role: "Director of Operations",
    industry: "Operations",
  },
  {
    quote: "I was switching industries and felt invisible. They reframed my story so the pivot looked like the obvious next step. Offer in five weeks.",
    name: "Daniel O.",
    role: "Marketing Lead → Product Manager",
    industry: "Career Change",
  },
  {
    quote: "My executive bio finally reads like a leader, not a job description. Two board conversations opened up within a month.",
    name: "Aisha N.",
    role: "Chief Financial Officer",
    industry: "Finance",
  },
  {
    quote: "My applications used to vanish into the void. After their ATS-optimized rewrite, I went from zero callbacks to six in three weeks.",
    name: "Rohan M.",
    role: "Data Engineer",
    industry: "Data Engineering",
  },
  {
    quote: "They made my clinical experience read with real authority. I landed an associate role at the practice I was targeting.",
    name: "Dr. Nadia F.",
    role: "Dentist",
    industry: "Dental",
  },
  {
    quote: "The salary-negotiation coaching paid for the whole package ten times over. I asked for more and got it without flinching.",
    name: "James K.",
    role: "Regional Sales Director",
    industry: "Sales",
  },
  {
    quote: "Switching from retail pharmacy to clinical, my resume finally spoke the right language. Interviews started within the first week.",
    name: "Omar S.",
    role: "Pharmacist",
    industry: "Pharmacy",
  },
  {
    quote: "The recruiter-outreach scripts and the refreshed LinkedIn did the heavy lifting. Inbound messages I never used to get are now routine.",
    name: "Dr. Elaine W.",
    role: "Physician",
    industry: "Healthcare",
  },
];

const INDUSTRIES = ["Technology", "Healthcare", "Finance", "Engineering", "Education", "Legal", "Marketing", "Sales", "Human Resources", "Operations", "Construction", "Manufacturing", "Retail", "Hospitality", "Energy", "Transportation", "Government", "Nonprofit", "Agriculture", "Pharmaceuticals"];

function Home() {
  return (
    <>
      <Hero />

      {/* Trust marquee */}
      <section className="relative border-y border-border/60 bg-cream/60 overflow-hidden">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 py-6 flex items-center gap-8">
          <span className="hidden sm:block text-xs uppercase tracking-[0.28em] text-muted-foreground shrink-0">Industries we serve</span>
          <div className="relative flex-1 overflow-hidden">
            <div className="flex w-max animate-marquee gap-14 font-display text-2xl text-foreground/55">
              {[...INDUSTRIES, ...INDUSTRIES].map((p, i) => (
                <span key={i} className="italic">{p}</span>
              ))}
            </div>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-cream to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-cream to-transparent" />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-20 sm:py-28">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr] items-end">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.28em] text-gold">— The studio</p>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl mt-4 leading-[1.05] text-balance">
              Where Careers Are Built. <em className="text-foreground/70">Not Just Written.</em>
            </h2>
            <p className="mt-5 font-display text-xl sm:text-2xl text-navy leading-snug">
              Executive Resume Writing, <span className="text-foreground/60">LinkedIn Optimization</span> &amp; Career Coaching
            </p>
          </Reveal>
          <Reveal delay={120}>
            <p className="text-foreground/70 leading-relaxed text-lg max-w-xl lg:ml-auto">
              From entry-level professionals to C-suite executives, we help clients stand
              out, secure interviews, and advance their careers. Every resume is personally
              written by senior writers — no templates, no shortcuts, no copied content.
              Over 20 years of experience. Real results.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-px bg-border rounded-2xl overflow-hidden border border-border">
          {STATS.map((s, i) => (
            <Reveal key={s.l} delay={i * 90} className="bg-background p-8 sm:p-10">
              <p className="font-display text-2xl sm:text-[1.7rem] leading-tight text-navy text-balance">{s.v}</p>
              <p className="mt-3 text-sm text-muted-foreground">{s.l}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Process banner */}
      <section className="relative overflow-hidden bg-navy-deep text-ivory">
        <div className="absolute inset-0 opacity-30">
          <img src={process} alt="" className="h-full w-full object-cover" loading="lazy" width={1600} height={900} />
        </div>
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 py-24 sm:py-32 grid gap-10 lg:grid-cols-[1.4fr_1fr] items-center">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.28em] text-gold">— Process</p>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl mt-4 leading-[1.05] text-balance">
              How it <em>works</em>.
            </h2>
            <div className="mt-12 grid sm:grid-cols-2 gap-x-10 gap-y-8">
              {[
                { icon: Package, t: "Choose Your Package", d: "Select the service that best fits your career goals and complete your purchase. Not sure which option is right for you? Reach out before buying and we'll help you pick the package that matches your industry, experience level, and the outcome you're aiming for." },
                { icon: UserCheck, t: "Connect with Your Career Coach", d: "After your purchase is confirmed, a dedicated Career Coach from your industry will contact you to discuss your goals and collect the information needed for your project, including your resume, target roles, and career objectives." },
                { icon: CalendarClock, t: "Consultation (Where Included)", d: "For coaching and premium packages, we'll schedule a consultation to gain a deeper understanding of your experience, challenges, and career goals." },
                { icon: PenTool, t: "We Get to Work", d: "Based on the information provided, your Career Coach will develop the services included in your package and create a personalized strategy tailored to your goals." },
                { icon: FileCheck2, t: "Receive Your Deliverables", d: "Your completed documents and deliverables are typically delivered within 5 working days, along with any guidance and support included in your selected package." },
              ].map(({ icon: Icon, t, d }, i) => (
                <div key={t}>
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gold/15 text-gold shrink-0">
                      <Icon className="h-[18px] w-[18px]" />
                    </span>
                    <p className="font-display text-gold text-sm">Step {i + 1}</p>
                  </div>
                  <h3 className="mt-3 font-display text-2xl">{t}</h3>
                  <p className="mt-2 text-ivory/70 text-sm leading-relaxed">{d}</p>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={150} className="lg:justify-self-end">
            <div className="rounded-3xl border border-ivory/15 bg-ivory/5 backdrop-blur p-8 max-w-sm">
              <p className="text-xs uppercase tracking-[0.22em] text-gold">Start with a free 15-min call</p>
              <h3 className="font-display italic text-3xl mt-4 leading-tight">No pitch. Just a real read on what your career needs next.</h3>
              <Link to="/contact" className="mt-8 inline-flex items-center justify-center w-full rounded-full bg-gold text-navy-deep px-6 py-3 text-sm font-semibold hover:bg-gold-soft transition-colors">
                Book your call
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Services grid */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-24 sm:py-32 mt-16">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.28em] text-gold">— What we do</p>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl mt-4 leading-[1.05] text-balance">
How we move<br /><em>your career forward.</em>
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <Link to="/services" className="inline-flex items-center gap-2 text-sm font-medium">
              <span className="gold-underline">All services</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>

        <div className="grid gap-px bg-border border border-border rounded-3xl overflow-hidden md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.slice(0, 9).map((s, i) => (
            <Reveal
              key={s.slug}
              delay={i * 60}
              as={Link}
              to="/services"
              hash={s.slug}
              className="group relative block bg-background p-8 sm:p-10 transition-colors hover:bg-cream"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gold/10 text-gold transition-colors group-hover:bg-gold group-hover:text-ivory">
                <s.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-5 font-display text-2xl sm:text-3xl">{s.title}</h3>
              <p className="mt-3 text-foreground/70 leading-relaxed">{s.desc}</p>
              <ArrowUpRight className="absolute bottom-8 right-8 h-5 w-5 text-foreground/30 transition-all duration-500 group-hover:text-gold group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Editorial split */}
      <section className="relative">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 grid gap-12 lg:grid-cols-2 items-center">
          <Reveal className="relative order-2 lg:order-1">
            <div className="relative aspect-[5/6] overflow-hidden rounded-3xl">
              <img src={workspace} alt="Career documents in progress" className="h-full w-full object-cover" loading="lazy" width={1600} height={1100} />
            </div>
            <div className="absolute -bottom-8 -right-4 sm:-right-8 max-w-xs rounded-2xl bg-navy text-ivory p-6 shadow-soft">
              <Quote className="h-5 w-5 text-gold" />
              <p className="mt-3 font-display italic text-lg leading-snug">"A document that finally sounded like me — only sharper."</p>
              <p className="mt-3 text-xs uppercase tracking-[0.22em] text-ivory/60">— Anya K., Director</p>
            </div>
          </Reveal>

          <Reveal delay={120} className="order-1 lg:order-2">
            <p className="text-xs uppercase tracking-[0.28em] text-gold">— Our approach</p>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-[3.5rem] mt-4 leading-[1.05] text-balance">
              A professionally written résumé is still one of the <em>most powerful tools</em> in your career.
            </h2>
            <p className="mt-6 text-foreground/70 text-lg leading-relaxed">
              We work directly with you — not through questionnaires. Through a personalized
              consultation, career assessment, and strategic resume development process, you
              receive an ATS-optimized résumé designed to attract recruiters, hiring managers,
              and executive decision-makers.
            </p>
            <ul className="mt-8 space-y-4">
              {[
                "Senior Resume Writers with industry-specific expertise",
                "ATS-optimized resumes that remain professional and modern",
                "Executive Resume Writing focused on positioning, impact, and results",
                "Confidential career support for professionals, leaders, and executives",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-navy-deep shrink-0" />
                  <span className="text-foreground/85">{t}</span>
                </li>
              ))}
            </ul>
            <Link to="/about" className="mt-10 inline-flex items-center gap-2 text-sm font-medium">
              <span className="gold-underline">Meet the studio</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Why choose us */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-24 sm:py-32">
        <Reveal className="text-center max-w-3xl mx-auto">
          <p className="text-xs uppercase tracking-[0.28em] text-gold">— Why us</p>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl mt-4 leading-[1.05] text-balance">
            Why clients <em>choose us</em>.
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-px bg-border border border-border rounded-3xl overflow-hidden sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Layers, t: "Every Career Stage", d: "Entry-level to executive clients." },
            { icon: ShieldCheck, t: "ATS-Optimized", d: "Built to pass screening and win interviews." },
            { icon: Globe, t: "Global Trust", d: "Serving clients across the globe." },
            { icon: Gem, t: "Boutique by Design", d: "Personal, 1:1 service on every project." },
          ].map(({ icon: Icon, t, d }, i) => (
            <Reveal key={t} delay={i * 90} className="bg-background p-8 sm:p-10">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gold/10 text-gold">
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="mt-5 font-display text-xl sm:text-2xl">{t}</h3>
              <p className="mt-2 text-foreground/70 leading-relaxed">{d}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120} className="mt-16 rounded-3xl bg-navy text-ivory p-10 sm:p-14 text-center">
          <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl leading-[1.1] text-balance">
            Your next opportunity starts with the <em>right story</em>.
          </h3>
          <Link to="/contact" className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold text-navy-deep px-7 py-3.5 text-sm font-semibold hover:bg-gold-soft transition-colors">
            Start your transformation
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </section>

      {/* Pricing preview */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-24 sm:py-32">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.28em] text-gold">— Investment</p>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl mt-4 leading-[1.05]">Packages by career stage</h2>
            <p className="mt-5 max-w-xl text-foreground/70 text-lg leading-relaxed">From your first interview to your first board seat — pricing is transparent and the same writer stays with you the whole way.</p>
          </Reveal>
          <Reveal delay={150}>
            <Link to="/pricing" className="inline-flex items-center gap-2 text-sm font-medium">
              <span className="gold-underline">See all packages</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {PACKAGES.map((p, i) => {
            const pro = p.tiers.find((t) => t.highlight)!;
            return (
              <Reveal key={p.id} delay={i * 90} className="group relative rounded-3xl bg-card border border-border p-7 hover:border-gold transition-colors">
                <p className="text-xs uppercase tracking-[0.22em] text-gold">{p.level}</p>
                <div className="mt-6 flex items-baseline gap-2">
                  <span className="font-display text-5xl text-navy">${pro.price}</span>
                  <span className="text-sm text-muted-foreground">/ Professional</span>
                </div>
                <p className="mt-3 text-sm text-foreground/65 leading-relaxed">{p.blurb}</p>
                <div className="hairline my-6" />
                <ul className="space-y-2.5 text-sm text-foreground/80">
                  {pro.features.slice(0, 5).map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-navy-deep shrink-0 mt-0.5" strokeWidth={2.5} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/pricing/$id" params={{ id: p.id }} className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-navy">
                  <span className="gold-underline">View all tiers</span>
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative overflow-hidden border-t border-border py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.28em] text-gold">— Letters from clients</p>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl mt-4 leading-[1.05] text-balance max-w-3xl">
              Quiet wins. Loud careers.
            </h2>
          </Reveal>
        </div>

        {/* Marquee row */}
        <div className="relative mt-16 flex">
          <div className="flex w-max items-stretch gap-6 animate-marquee [animation-duration:64s]">
            {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
              <ReviewCard key={i} t={t} />
            ))}
          </div>

          {/* edge fades */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-background to-transparent" />
        </div>
      </section>

      {/* CTA banner */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 pb-24">
        <div className="relative overflow-hidden rounded-[2rem] bg-navy-deep text-ivory p-10 sm:p-16 grid gap-10 lg:grid-cols-[1.4fr_1fr] items-center">
          <div className="absolute inset-0 opacity-40">
            <img src={interview} alt="" className="h-full w-full object-cover object-right" loading="lazy" width={1600} height={900} />
            <div className="absolute inset-0 bg-gradient-to-r from-navy-deep via-navy-deep/85 to-navy-deep/10" />
          </div>
          <div className="relative">
            <p className="text-xs uppercase tracking-[0.28em] text-gold">— Ready when you are</p>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl mt-4 leading-[1.05] text-balance">
              The next move begins with a <em className="text-gold">conversation.</em>
            </h2>
            <p className="mt-5 max-w-lg text-ivory/75 text-lg">Tell us where you want to be in eighteen months. We'll show you the paper trail that gets you there.</p>
          </div>
          <div className="relative flex flex-col gap-3 lg:items-end">
            <Link to="/contact" className="inline-flex items-center justify-center rounded-full bg-gold text-navy-deep px-8 py-4 text-sm font-semibold hover:bg-gold-soft transition-colors">
              Book a free consultation
            </Link>
            <Link to="/services" className="text-sm text-ivory/80 hover:text-gold transition-colors">
              Or browse our services →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function ReviewCard({ t }: { t: (typeof TESTIMONIALS)[number] }) {
  return (
    <figure className="flex w-[300px] shrink-0 flex-col rounded-3xl border border-border bg-card p-8 sm:w-[380px]">
      <div className="flex items-center justify-between">
        <div className="flex gap-1 text-gold">
          {Array.from({ length: 5 }).map((_, k) => (
            <Star key={k} className="h-4 w-4 fill-current" />
          ))}
        </div>
        <span className="rounded-full bg-cream px-3 py-1 text-[0.7rem] font-medium uppercase tracking-[0.12em] text-foreground/70">
          {t.industry}
        </span>
      </div>
      <blockquote className="mt-6 flex-1 font-display italic text-xl leading-snug">"{t.quote}"</blockquote>
      <figcaption className="mt-8 flex items-center gap-3 border-t border-border pt-6">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-navy text-ivory font-display text-sm">
          {t.name.replace(/^Dr\.\s*/, "").split(" ").map((p) => p[0]).join("")}
        </span>
        <div>
          <p className="font-medium leading-tight">{t.name}</p>
          <p className="text-sm text-muted-foreground">{t.role}</p>
        </div>
      </figcaption>
    </figure>
  );
}
