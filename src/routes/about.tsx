import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { PageHero } from "./services";
import workspace from "@/assets/workspace.jpg";
import interview from "@/assets/interview.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Hire Career Coach" },
      { name: "description", content: "A boutique career studio writing resumes and shaping careers for ambitious professionals worldwide." },
      { property: "og:title", content: "About — Hire Career Coach" },
      { property: "og:description", content: "Quiet studio. Loud results. Meet the team behind the work." },
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

function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title={[{ t: "A career studio,", italic: true }, { t: "not a", }, { t: "résumé mill.", gold: true, italic: true }]}
        sub="Hire Career Coach is a small, deliberately senior team of writers, coaches and former hiring managers — based in New York, working with clients across forty-seven states and twelve time zones."
      />

      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-20 grid gap-12 lg:grid-cols-2 items-center">
        <Reveal>
          <div className="relative aspect-[5/6] rounded-3xl overflow-hidden">
            <img src={interview} alt="A coaching session" className="h-full w-full object-cover" loading="lazy" width={1600} height={1100} />
          </div>
        </Reveal>
        <Reveal delay={120}>
          <p className="text-xs uppercase tracking-[0.28em] text-gold">— The story</p>
          <h2 className="font-display text-4xl sm:text-5xl mt-4 leading-[1.05] text-balance">Built in the rooms where careers are actually decided.</h2>
          <div className="mt-6 space-y-5 text-foreground/75 text-lg leading-relaxed">
            <p>
              Hire Career Coach started in 2018 with a simple frustration: too many talented
              professionals were being filtered out by lazy résumé screening — not because they
              weren't qualified, but because no one had taught them how to be read.
            </p>
            <p>
              Six years and 2,400+ clients later, we're still a boutique. Every project still moves
              through a senior writer who has actually hired into your industry. The cadence is
              slower. The result is sharper.
            </p>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-20">
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

      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-20">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.28em] text-gold">— The studio</p>
            <h2 className="font-display text-4xl sm:text-5xl mt-4 leading-[1.05]">A team you'll actually meet.</h2>
            <p className="mt-6 text-foreground/75 text-lg leading-relaxed">
              Senior writers with backgrounds at Fortune 500s, top-tier consulting and tech.
              When you book with us, the person on your discovery call is the person writing
              your résumé — start to finish.
            </p>
            <Link to="/contact" className="mt-8 inline-flex rounded-full bg-navy text-ivory px-6 py-3 text-sm font-medium">
              Schedule a discovery call
            </Link>
          </Reveal>
          <Reveal delay={150}>
            <div className="relative aspect-[5/4] rounded-3xl overflow-hidden">
              <img src={workspace} alt="The studio" className="h-full w-full object-cover" loading="lazy" width={1600} height={1100} />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
