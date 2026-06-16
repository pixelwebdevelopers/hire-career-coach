import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import h1 from "@/assets/hero-1.png";
import h2 from "@/assets/hero-2.png";
import h3 from "@/assets/hero-3.png";
import h4 from "@/assets/hero-4.png";
import { ArrowUpRight } from "lucide-react";

type Word = { t: string; gold?: boolean; italic?: boolean; br?: boolean };

type Slide = {
  img: string;
  eyebrow: string;
  title: Word[];
  caption: string;
};

const SLIDES: Slide[] = [
  {
    img: h4,
    eyebrow: "Resumes · LinkedIn · Coaching",
    title: [
      { t: "Elevate" },
      { t: "your", gold: true, italic: true, br: true },
      { t: "Resume" },
      { t: "and", gold: true, italic: true },
      { t: "Career", br: true },
      { t: "with us", gold: true, italic: true },
    ],
    caption: "Personal branding that gets you noticed, shortlisted and hired.",
  },
  {
    img: h2,
    eyebrow: "Interview Coaching",
    title: [
      { t: "Land" },
      { t: "interviews", gold: true, italic: true, br: true },
      { t: "that turn", br: true },
      { t: "into", italic: true },
      { t: "offers", gold: true },
    ],
    caption: "Coaching and prep that build the confidence to win the room.",
  },
  {
    img: h3,
    eyebrow: "Executive Branding",
    title: [
      { t: "Lead" },
      { t: "with a", italic: true, br: true },
      { t: "presence", gold: true, italic: true, br: true },
      { t: "people remember" },
    ],
    caption: "Executive narratives and board-ready bios that command attention.",
  },
  {
    img: h1,
    eyebrow: "Career Transitions",
    title: [
      { t: "Reinvent", gold: true, italic: true, br: true },
      { t: "your career" },
      { t: "with", italic: true, br: true },
      { t: "confidence", gold: true },
    ],
    caption: "Pivot industries and step up — without losing momentum.",
  },
];

const DURATION = 7000;

export function Hero() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % SLIDES.length), DURATION);
    return () => clearInterval(t);
  }, []);

  const slide = SLIDES[idx];

  return (
    <section className="relative overflow-hidden bg-cream">
      {/* Aurora / wash background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_85%_15%,_color-mix(in_oklab,var(--gold)_16%,transparent),_transparent_60%)]" />
        <div className="animate-aurora absolute -top-32 right-0 h-[42rem] w-[42rem] rounded-full bg-gold/15 blur-3xl" />
        <div className="animate-aurora absolute -bottom-40 -left-32 h-[38rem] w-[38rem] rounded-full bg-navy/10 blur-3xl [animation-delay:-6s]" />
      </div>

      {/* Dot grid, top-left — desktop only (keeps mobile clean) */}
      <svg className="pointer-events-none absolute left-6 top-8 hidden h-28 w-44 text-navy/30 lg:block" aria-hidden>
        <defs>
          <pattern id="dots" width="14" height="14" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.6" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)" />
      </svg>

      {/* Flowing lines, bottom-left — desktop only */}
      <svg className="pointer-events-none absolute bottom-0 left-0 hidden h-64 w-[36rem] text-gold/25 lg:block" viewBox="0 0 600 260" fill="none" aria-hidden>
        {[0, 1, 2, 3, 4].map((i) => (
          <path
            key={i}
            d={`M-20 ${120 + i * 26} C 160 ${60 + i * 26}, 360 ${200 + i * 18}, 640 ${90 + i * 22}`}
            stroke="currentColor"
            strokeWidth="1"
          />
        ))}
      </svg>

      {/* ===== Mobile layout: text left, figure on the right (right-cropped) ===== */}
      <div className="relative min-h-[78svh] overflow-hidden lg:hidden">
        {/* Portrait — anchored to keep the LEFT side, the right bleeds off-screen */}
        <div className="pointer-events-none absolute inset-y-0 right-0 z-0 w-[54%]">
          {SLIDES.map((s, i) => (
            <img
              key={s.img}
              src={s.img}
              alt={s.eyebrow}
              loading={i === 0 ? "eager" : "lazy"}
              className={[
                "absolute inset-0 h-full w-full object-cover object-[32%_center] transition-all duration-[1400ms] ease-[cubic-bezier(.22,1,.36,1)]",
                i === idx ? "opacity-100 blur-0 scale-100" : "opacity-0 blur-md scale-[1.03]",
              ].join(" ")}
            />
          ))}
          {/* melt the white photo backdrop into the cream canvas */}
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-cream to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-cream to-transparent" />
        </div>

        {/* Cream fade so the copy stays fully legible */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-[76%] bg-gradient-to-r from-cream from-32% via-cream/85 to-transparent" />

        {/* Copy */}
        <div className="relative z-10 flex min-h-[78svh] max-w-[68%] flex-col justify-center px-5 pb-20 pt-24">
          <HeroCopy slide={slide} idx={idx} />
        </div>
      </div>

      {/* ===== Desktop layout ===== */}
      <div className="relative mx-auto hidden max-w-7xl items-center px-8 lg:grid lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:px-12 lg:min-h-[36rem] [@media(min-height:901px)]:lg:min-h-[88vh]">
        <div className="relative z-10 lg:py-16 [@media(min-height:901px)]:lg:py-0">
          <HeroCopy slide={slide} idx={idx} />
        </div>

        {/* Portrait column — all slides fill the same frame (uniform size) */}
        <div className="relative self-end h-full">
          {/* warm halo behind the figure */}
          <div className="absolute inset-x-6 bottom-4 top-12 rounded-[3rem] bg-[radial-gradient(60%_60%_at_50%_60%,_color-mix(in_oklab,var(--gold)_16%,transparent),_transparent_72%)] blur-2xl" />
          <div className="animate-float relative mx-auto h-full w-full max-w-xl">
            {SLIDES.map((s, i) => (
              <img
                key={s.img}
                src={s.img}
                alt={s.eyebrow}
                width={1024}
                height={1280}
                loading={i === 0 ? "eager" : "lazy"}
                className={[
                  "absolute inset-0 h-full w-full object-cover object-top transition-all duration-[1400ms] ease-[cubic-bezier(.22,1,.36,1)]",
                  i === idx ? "opacity-100 blur-0 scale-100 animate-ken" : "opacity-0 blur-md scale-[1.04]",
                ].join(" ")}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Slide indicators — centered at the bottom of the hero (both views) */}
      <SlideDots idx={idx} setIdx={setIdx} />
    </section>
  );
}

function HeroCopy({ slide, idx }: { slide: Slide; idx: number }) {
  return (
    <div>
      <div key={`eb-${idx}`} className="mb-5 flex items-center gap-3 text-[0.62rem] uppercase tracking-[0.22em] text-muted-foreground sm:text-xs sm:tracking-[0.3em] lg:mb-6">
        <span className="rule-draw hidden h-px w-8 bg-gold lg:inline-block" style={{ ["--rd" as any]: "0ms" }} />
        <span className="letter-rise" aria-label={slide.eyebrow}>
          {[...slide.eyebrow].map((ch, i) => (
            <span key={i} aria-hidden style={{ ["--ld" as any]: `${i * 22}ms` }}>
              {ch === " " ? " " : ch}
            </span>
          ))}
        </span>
      </div>

      <h1
        key={`h-${idx}`}
        className="font-display leading-[1.02] text-balance text-navy-deep text-[2.5rem] sm:text-5xl lg:text-[3.85rem] [@media(min-height:901px)]:lg:text-[5.75rem]"
      >
        {slide.title.map((w, i) => (
          <span key={i}>
            <span
              className={[
                "word-wipe mr-3 sm:mr-4",
                w.italic ? "italic font-normal" : "font-medium",
                w.gold ? "text-gold-shimmer" : "",
              ].join(" ")}
              style={{ ["--rd" as any]: `${140 + i * 110}ms` }}
            >
              {w.t}
            </span>
            {w.br && <br />}
          </span>
        ))}
      </h1>

      <div
        key={`rule-${idx}`}
        className="rule-draw mt-6 h-[2px] w-32 bg-gradient-gold lg:mt-8 lg:w-40"
        style={{ ["--rd" as any]: "650ms" }}
      />

      <p
        key={`cap-${idx}`}
        className="word-fade mt-5 block max-w-md text-[0.95rem] leading-relaxed text-foreground/70 sm:text-base lg:mt-7 lg:text-lg"
        aria-label={slide.caption}
      >
        {slide.caption.split(" ").map((word, i) => (
          <span key={i} aria-hidden style={{ ["--wd" as any]: `${820 + i * 55}ms` }} className="mr-[0.28em]">
            {word}
          </span>
        ))}
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-5 lg:mt-10">
        <Link
          to="/contact"
          className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-navy px-7 py-3.5 text-sm font-medium tracking-wide text-ivory lg:px-8 lg:py-4"
        >
          <span className="absolute inset-0 bg-gradient-gold opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <span className="relative">Start your transformation</span>
          <ArrowUpRight className="relative h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
        <Link
          to="/services"
          className="hidden items-center gap-2 text-sm font-medium text-foreground/80 hover:text-navy sm:inline-flex"
        >
          <span className="gold-underline">Explore our craft</span>
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>

    </div>
  );
}

function SlideDots({ idx, setIdx }: { idx: number; setIdx: (i: number) => void }) {
  return (
    <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3 lg:bottom-8">
      {SLIDES.map((_, i) => (
        <button
          key={i}
          aria-label={`Slide ${i + 1}`}
          onClick={() => setIdx(i)}
          className="group relative h-[2px] w-10 overflow-hidden bg-foreground/20 lg:w-14"
        >
          <span
            key={`${i}-${idx}`}
            className={[
              "absolute inset-y-0 left-0 origin-left bg-navy",
              i === idx ? "w-full transition-[width] ease-linear" : "w-0",
            ].join(" ")}
            style={i === idx ? { transitionDuration: `${DURATION}ms` } : undefined}
          />
        </button>
      ))}
    </div>
  );
}
