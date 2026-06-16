import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import h1 from "@/assets/hero-1.png.asset.json";
import h2 from "@/assets/hero-2.png.asset.json";
import h3 from "@/assets/hero-3.png.asset.json";
import h4 from "@/assets/hero-4.png.asset.json";
import { ArrowUpRight } from "lucide-react";

type Slide = {
  img: string;
  eyebrow: string;
  title: Array<{ t: string; gold?: boolean; italic?: boolean }>;
  caption: string;
};

const SLIDES: Slide[] = [
  {
    img: h4.url,
    eyebrow: "Early Career · Graduates",
    title: [
      { t: "Begin", italic: true },
      { t: "your story" },
      { t: "with" },
      { t: "clarity.", gold: true, italic: true },
    ],
    caption:
      "ATS-ready resumes and LinkedIn profiles that open doors at top employers — from internship to your first promotion.",
  },
  {
    img: h2.url,
    eyebrow: "Mid-Career · Specialists",
    title: [
      { t: "Reposition", italic: true },
      { t: "the work" },
      { t: "you've" },
      { t: "earned.", gold: true, italic: true },
    ],
    caption:
      "Strategic resumes that frame your impact, paired with interview coaching that lands the next title — and the salary to match.",
  },
  {
    img: h3.url,
    eyebrow: "Senior · Director · Executive",
    title: [
      { t: "Lead", italic: true },
      { t: "with a" },
      { t: "presence", gold: true },
      { t: "people remember." },
    ],
    caption:
      "Executive narratives, board-ready bios and confidential search support for VPs, C-suites and founders.",
  },
  {
    img: h1.url,
    eyebrow: "Career Transitions",
    title: [
      { t: "Change", italic: true },
      { t: "lanes," },
      { t: "without", },
      { t: "losing momentum.", gold: true, italic: true },
    ],
    caption:
      "Pivot industries, return to work, or step into leadership with a coach who has done it — and the documents to back it up.",
  },
];

export function Hero() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % SLIDES.length), 6500);
    return () => clearInterval(t);
  }, []);

  const slide = SLIDES[idx];

  return (
    <section className="relative overflow-hidden">
      {/* soft background wash */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-40 h-[40rem] w-[40rem] rounded-full bg-gold/10 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-[36rem] w-[36rem] rounded-full bg-navy/10 blur-3xl" />
      </div>

      {/* subtle horizontal lines */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.05]" aria-hidden>
        <defs>
          <pattern id="lines" width="6" height="6" patternUnits="userSpaceOnUse">
            <path d="M0 6L6 0" stroke="currentColor" strokeWidth="0.4" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#lines)" className="text-navy" />
      </svg>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 pt-10 pb-24 lg:pt-16 lg:pb-32 grid items-center gap-12 lg:gap-6 lg:grid-cols-[1.05fr_1fr]">
        {/* Text column */}
        <div className="relative">
          <SlideText slide={slide} keyId={idx} />

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              to="/contact"
              className="group relative inline-flex items-center gap-3 rounded-full bg-navy text-ivory px-7 py-4 text-sm font-medium tracking-wide overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-gold opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="relative">Start your transformation</span>
              <ArrowUpRight className="relative h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-sm font-medium text-foreground/80 hover:text-navy"
            >
              <span className="gold-underline">Explore our craft</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Slide indicators */}
          <div className="mt-12 flex items-center gap-3">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                aria-label={`Slide ${i + 1}`}
                onClick={() => setIdx(i)}
                className="group relative h-[2px] w-12 overflow-hidden bg-foreground/15"
              >
                <span
                  className={[
                    "absolute inset-y-0 left-0 bg-navy origin-left",
                    i === idx ? "w-full transition-[width] duration-[6500ms] ease-linear" : "w-0",
                  ].join(" ")}
                  key={`${i}-${idx}`}
                />
              </button>
            ))}
            <span className="ml-3 font-display italic text-sm text-muted-foreground">
              0{idx + 1} <span className="text-foreground/30">/ 0{SLIDES.length}</span>
            </span>
          </div>
        </div>

        {/* Portrait column */}
        <div className="relative">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md lg:max-w-none">
            {/* Frame */}
            <div className="absolute -inset-4 lg:-inset-6 rounded-[2rem] border border-gold/40" />
            <div className="absolute -inset-2 lg:-inset-3 rounded-[1.75rem] border border-navy/15" />
            <div className="absolute -top-6 -left-6 h-16 w-16 rounded-full bg-gradient-gold opacity-30 blur-2xl" />

            {/* Slide stack */}
            <div className="relative h-full w-full overflow-hidden rounded-[1.5rem] bg-cream shadow-soft">
              {SLIDES.map((s, i) => (
                <div
                  key={s.img}
                  className="absolute inset-0 transition-all duration-[1400ms] ease-[cubic-bezier(.22,1,.36,1)]"
                  style={{
                    opacity: i === idx ? 1 : 0,
                    filter: i === idx ? "blur(0)" : "blur(10px)",
                    transform: i === idx ? "scale(1)" : "scale(1.04)",
                  }}
                >
                  <img
                    src={s.img}
                    alt={s.eyebrow}
                    className={i === idx ? "h-full w-full object-cover object-top animate-ken" : "h-full w-full object-cover object-top"}
                    loading={i === 0 ? "eager" : "lazy"}
                    width={1024}
                    height={1280}
                  />
                </div>
              ))}
              {/* gradient overlay */}
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-navy-deep/40 via-navy-deep/0 to-transparent" />

              {/* eyebrow plate */}
              <div className="absolute left-5 right-5 bottom-5 flex items-center justify-between text-xs uppercase tracking-[0.2em] text-ivory">
                <span key={slide.eyebrow} className="reveal-mask"><span style={{ ['--rd' as any]: '0ms' }}>{slide.eyebrow}</span></span>
                <span className="font-display italic text-gold normal-case tracking-normal text-sm">— Hire Career Coach</span>
              </div>
            </div>

            {/* floating badge */}
            <div className="absolute -bottom-6 -left-6 hidden md:block rounded-2xl bg-card/95 backdrop-blur border border-border shadow-soft px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full pulse-ring" />
                  <div className="h-2.5 w-2.5 rounded-full bg-gold" />
                </div>
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Now accepting June clients</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SlideText({ slide, keyId }: { slide: Slide; keyId: number }) {
  const id = useMemo(() => keyId, [keyId]);
  return (
    <div key={id}>
      <div className="reveal-mask text-xs uppercase tracking-[0.28em] text-muted-foreground mb-6">
        <span style={{ ['--rd' as any]: '0ms' }}>{slide.eyebrow}</span>
      </div>

      <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-[5.25rem] leading-[1.02] text-balance text-navy-deep">
        {slide.title.map((w, i) => (
          <span key={i} className="reveal-mask mr-3 sm:mr-4">
            <span
              style={{ ['--rd' as any]: `${120 + i * 110}ms` }}
              className={[
                w.italic ? "italic font-normal" : "font-medium",
                w.gold ? "text-transparent bg-clip-text bg-gradient-gold" : "",
              ].join(" ")}
            >
              {w.t}
            </span>
          </span>
        ))}
      </h1>

      <p className="reveal-mask block mt-8 max-w-xl text-base sm:text-lg text-foreground/70 leading-relaxed">
        <span style={{ ['--rd' as any]: '650ms' }}>{slide.caption}</span>
      </p>
    </div>
  );
}
