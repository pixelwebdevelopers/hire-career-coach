import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import h1 from "@/assets/hero-1.png";
import h2 from "@/assets/hero-2.png";
import h3 from "@/assets/hero-3.png";
import h4 from "@/assets/hero-4.png";
import h5 from "@/assets/hero-5.png";
import {
  ArrowUpRight,
  Check,
  FileText,
  FileSearch,
  Linkedin,
  MessagesSquare,
  Target,
  type LucideIcon,
} from "lucide-react";

type Word = { t: string; gold?: boolean; italic?: boolean; br?: boolean };

type Slide = {
  num: number;
  icon: LucideIcon;
  img: string;
  eyebrow: string;
  title: Word[];
  caption: string;
  bullets: string[];
  buttonText: string;
  buttonLink: string;
  buttonHash?: string;
};

const SLIDES: Slide[] = [
  {
    num: 1,
    icon: FileText,
    img: h4,
    eyebrow: "Resume Writing",
    title: [
      { t: "Elevate your", br: true },
      { t: "career with a", br: true },
      { t: "resume that", br: true },
      { t: "gets noticed", gold: true, italic: true },
    ],
    caption:
      "ATS-optimized resumes tailored to your experience, industry, and career goals. Designed to help you stand out and secure interviews.",
    bullets: ["ATS Optimized", "Recruiter Focused", "Results Driven"],
    buttonText: "Explore Resume Services",
    buttonLink: "/services",
    buttonHash: "resume-writing",
  },
  {
    num: 2,
    icon: FileSearch,
    img: h2,
    eyebrow: "Resume Review & Audit",
    title: [
      { t: "Discover", br: true },
      { t: "what's" },
      { t: "holding", gold: true, italic: true, br: true },
      { t: "your" },
      { t: "resume", gold: true, italic: true, br: true },
      { t: "back" },
    ],
    caption:
      "Receive expert feedback on your resume's content, structure, ATS compatibility, and overall effectiveness with actionable recommendations.",
    bullets: ["Detailed Feedback", "ATS Check", "Actionable Improvements"],
    buttonText: "Get a Resume Audit",
    buttonLink: "/services",
    buttonHash: "resume-review",
  },
  {
    num: 3,
    icon: Linkedin,
    img: h3,
    eyebrow: "LinkedIn Optimization",
    title: [
      { t: "Turn your", br: true },
      { t: "LinkedIn profile", br: true },
      { t: "into a" },
      { t: "recruiter", gold: true, italic: true, br: true },
      { t: "magnet", gold: true },
    ],
    caption:
      "Optimize your headline, experience, keywords, and professional presence to increase visibility and attract more opportunities.",
    bullets: ["Profile Optimization", "Keyword Strategy", "Increased Visibility"],
    buttonText: "Optimize My LinkedIn",
    buttonLink: "/services",
    buttonHash: "linkedin-optimization",
  },
  {
    num: 4,
    icon: MessagesSquare,
    img: h1,
    eyebrow: "Interview Preparation",
    title: [
      { t: "Land", br: true },
      { t: "interviews", br: true },
      { t: "that turn into", br: true },
      { t: "offers", gold: true, italic: true },
    ],
    caption:
      "Build confidence, refine your communication, and learn proven interview strategies through personalized coaching and mock sessions.",
    bullets: ["Mock Interviews", "Proven Strategies", "Confidence Building"],
    buttonText: "Explore Interview Coaching",
    buttonLink: "/services",
    buttonHash: "interview-prep",
  },
  {
    num: 5,
    icon: Target,
    img: h5,
    eyebrow: "Career Strategy Session",
    title: [
      { t: "Build a", br: true },
      { t: "smarter path", gold: true, italic: true, br: true },
      { t: "toward your", br: true },
      { t: "next opportunity" },
    ],
    caption:
      "Personalized guidance for career growth, job search strategy, networking, salary negotiation, and long-term career planning.",
    bullets: ["Career Guidance", "Job Search Strategy", "Growth & Advancement"],
    buttonText: "Book a Strategy Session",
    buttonLink: "/contact",
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

      {/* Flowing lines, bottom-left — desktop only */}
      <svg
        className="pointer-events-none absolute bottom-0 left-0 hidden h-64 w-[36rem] text-gold/25 lg:block"
        viewBox="0 0 600 260"
        fill="none"
        aria-hidden
      >
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
                "absolute inset-0 h-full w-full object-cover transition-all duration-[1400ms] ease-[cubic-bezier(.22,1,.36,1)]",
                s.num <= 2 ? "object-[48%_center]" : "object-[32%_center]",
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
                  i === idx
                    ? "opacity-100 blur-0 scale-100 animate-ken"
                    : "opacity-0 blur-md scale-[1.04]",
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
      {/* Slide Icon & Eyebrow */}
      <div className="mb-6 flex flex-col items-start gap-4">
        {/* Circle Icon */}
        <div
          key={`icon-${idx}`}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-[#0a7a9b]/25 bg-white/70 text-[#0a7a9b] shadow-sm"
          style={{
            opacity: 0,
            transform: "translateY(10px)",
            animation: "word-fade 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards",
            animationDelay: "150ms",
          }}
        >
          <slide.icon className="h-5.5 w-5.5 stroke-[1.8]" />
        </div>

        {/* Eyebrow */}
        <div
          key={`eb-${idx}`}
          className="text-[0.75rem] font-bold uppercase tracking-[0.2em] text-[#0a7a9b] lg:text-xs"
          style={{
            opacity: 0,
            transform: "translateY(10px)",
            animation: "word-fade 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards",
            animationDelay: "250ms",
          }}
        >
          {slide.eyebrow}
        </div>
      </div>

      <h1
        key={`h-${idx}`}
        className="font-display leading-[1.08] text-balance text-navy-deep text-[2.25rem] sm:text-[2.75rem] lg:text-[3.25rem] [@media(min-height:901px)]:lg:text-[4.25rem]"
      >
        {slide.title.map((w, i) => (
          <span key={i}>
            <span
              className={[
                "word-wipe mr-2 sm:mr-3",
                w.italic ? "italic font-normal" : "font-extrabold",
                w.gold || w.italic ? "text-[#0a7a9b]" : "text-navy-deep",
              ].join(" ")}
              style={{ "--rd": `${140 + i * 110}ms` } as React.CSSProperties}
            >
              {w.t}
            </span>
            {w.br && <br />}
          </span>
        ))}
      </h1>

      <p
        key={`cap-${idx}`}
        className="word-fade mt-5 block max-w-md text-[0.95rem] leading-relaxed text-foreground/75 sm:text-base lg:mt-7 lg:text-lg"
        aria-label={slide.caption}
      >
        {slide.caption.split(" ").map((word, i) => (
          <span
            key={i}
            aria-hidden
            style={{ "--wd": `${820 + i * 55}ms` } as React.CSSProperties}
            className="mr-[0.28em]"
          >
            {word}
          </span>
        ))}
      </p>

      {/* Bullet Checklist */}
      <ul key={`bullets-${idx}`} className="mt-6 space-y-3 lg:mt-8">
        {slide.bullets.map((bullet, bIdx) => (
          <li
            key={bIdx}
            className="flex items-center gap-3 text-sm text-foreground/80 font-medium lg:text-base"
            style={{
              opacity: 0,
              transform: "translateY(10px)",
              animation: "word-fade 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards",
              animationDelay: `${1100 + bIdx * 150}ms`,
            }}
          >
            <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#0a7a9b] text-white">
              <Check className="h-3 w-3 stroke-[3]" />
            </div>
            <span>{bullet}</span>
          </li>
        ))}
      </ul>

      {/* Primary Black CTA Button */}
      <div
        key={`btn-${idx}`}
        className="mt-8 lg:mt-10"
        style={{
          opacity: 0,
          transform: "translateY(10px)",
          animation: "word-fade 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards",
          animationDelay: "1550ms",
        }}
      >
        <Link
          to={slide.buttonLink as "/services" | "/contact"}
          hash={slide.buttonHash}
          className="group inline-flex items-center gap-3 rounded-full bg-[#1f2329] px-7 py-3.5 text-sm font-semibold tracking-wide text-white transition-all duration-300 hover:bg-[#0b0d0f] hover:scale-[1.02] shadow-md"
        >
          <span>{slide.buttonText}</span>
          <ArrowUpRight className="h-4.5 w-4.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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
