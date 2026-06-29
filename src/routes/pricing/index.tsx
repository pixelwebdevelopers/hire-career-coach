import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import {
  GraduationCap,
  Briefcase,
  Users,
  Crown,
  Calendar,
  Award,
  ShieldCheck,
  Clock,
  Headset,
  LockKeyhole,
  ArrowRight,
  Check,
} from "lucide-react";

export const Route = createFileRoute("/pricing/")({
  head: () => ({
    meta: [
      { title: "Pricing — Hire Career Coach" },
      {
        name: "description",
        content:
          "Transparent career document packages for early, mid, senior and executive professionals.",
      },
      { property: "og:title", content: "Pricing — Hire Career Coach" },
      {
        property: "og:description",
        content: "Career packages tailored to your stage, with single-service add-ons.",
      },
    ],
  }),
  component: PricingOverview,
});

const LEVELS = [
  {
    id: "early",
    num: "01",
    title: "Early Career",
    desc: "0 - 3 Years of Experience",
    icon: GraduationCap,
    fits: ["Students", "Recent Graduates", "Entry-Level Professionals"],
  },
  {
    id: "mid",
    num: "02",
    title: "Mid-Level",
    desc: "4 - 9 Years of Experience",
    icon: Briefcase,
    fits: ["Individual Contributors", "Specialists", "Supervisors", "Experienced Professionals"],
  },
  {
    id: "senior",
    num: "03",
    title: "Senior-Level",
    desc: "10+ Years of Experience",
    icon: Users,
    fits: ["Managers", "Senior Managers", "Directors", "Department Leaders"],
  },
  {
    id: "exec",
    num: "04",
    title: "Executive",
    desc: "Executives & C-Suite",
    icon: Crown,
    fits: [
      "Vice Presidents",
      "Executive Directors",
      "C-Suite Leaders",
      "Business Owners",
      "Founders",
    ],
  },
];

const FEATURES = [
  {
    title: "Expert Support",
    desc: "Industry experts focused on your success.",
    icon: Award,
  },
  {
    title: "Personalized Solutions",
    desc: "Tailored packages for your unique goals.",
    icon: ShieldCheck,
  },
  {
    title: "Fast Turnaround",
    desc: "Timely delivery without compromising quality.",
    icon: Clock,
  },
  {
    title: "Results Focused",
    desc: "Everything we do is designed to help you win.",
    icon: Headset,
  },
];

function PricingOverview() {
  return (
    <div className="bg-[#f8f9fa] min-h-screen">
      {/* Hero section */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 pt-16 pb-12 text-center">
        <Reveal>
          <div className="flex items-center justify-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-[#0a7a9b]">
            <span className="h-px w-6 bg-[#0a7a9b]/40" />
            Packages & Pricing
            <span className="h-px w-6 bg-[#0a7a9b]/40" />
          </div>
          <h1 className="mt-5 font-display text-4xl font-extrabold tracking-tight text-navy-deep sm:text-5xl lg:text-6xl max-w-3xl mx-auto leading-[1.1]">
            Let's find the right package for your{" "}
            <span className="text-[#0a7a9b]">career journey.</span>
          </h1>
          <p className="mt-6 text-base sm:text-lg text-foreground/70 max-w-2xl mx-auto leading-relaxed">
            Packages and pricing are customized based on your experience level so you get the right
            support at the right value.
          </p>
        </Reveal>
      </section>

      {/* Step Indicator */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-4">
        <Reveal>
          <div className="flex items-center justify-center gap-4 max-w-md mx-auto">
            <div className="h-px flex-1 bg-border/80" />
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#0a7a9b]">
              Step 1 of 3
            </span>
            <div className="h-px flex-1 bg-border/80" />
          </div>
          <h2 className="mt-4 font-display text-2xl font-extrabold text-navy-deep text-center sm:text-3xl">
            Select Your Career Level
          </h2>
          <p className="mt-2 text-sm text-foreground/60 text-center">
            Your experience helps us provide the most relevant solutions for you.
          </p>
        </Reveal>
      </section>

      {/* Career cards */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-10">
        <div className="grid gap-6 lg:gap-8 md:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto">
          {LEVELS.map((lvl, index) => (
            <Reveal key={lvl.id} delay={index * 80}>
              <div
                className={[
                  "group relative flex flex-col items-center text-center rounded-3xl border bg-white p-6 sm:p-8 lg:p-6 xl:p-8 shadow-sm transition-all duration-300 h-full",
                  lvl.id === "early"
                    ? "border-[#0a7a9b] ring-1 ring-[#0a7a9b]/35 shadow-md shadow-[#0a7a9b]/5"
                    : "border-border/80 hover:border-[#0a7a9b] hover:shadow-md hover:shadow-[#0a7a9b]/5",
                ].join(" ")}
              >
                {/* Large circular icon */}
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#0a7a9b]/10 text-[#0a7a9b] group-hover:scale-105 transition-transform duration-300">
                  <lvl.icon className="h-7 w-7" />
                </div>

                <h3 className="mt-5 font-display text-base xl:text-lg font-bold uppercase tracking-wider text-[#0a7a9b]">
                  {lvl.title}
                </h3>
                <p className="mt-1 text-xs xl:text-sm font-semibold text-foreground/60">{lvl.desc}</p>

                <div className="my-5 h-px w-full bg-border/60" />

                {/* Fits list */}
                <ul className="flex-1 space-y-3.5 text-xs xl:text-sm text-foreground/80 font-medium pb-6 lg:pb-4 xl:pb-6">
                  {lvl.fits.map((fit, fitIdx) => (
                    <li key={fitIdx} className="flex items-center gap-2.5">
                      <Check className="h-4 w-4 text-[#0a7a9b] stroke-[3] shrink-0" />
                      <span className="text-left">{fit}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Link
                  to="/pricing/$id"
                  params={{ id: lvl.id }}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#0a7a9b] hover:bg-[#08627c] text-white py-3 px-4 xl:py-3.5 xl:px-6 font-bold text-sm transition-colors duration-200 shadow-sm"
                >
                  <span>View Packages</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Help / Consultation Banner */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-6">
        <Reveal>
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 rounded-3xl border border-border/80 bg-white p-6 sm:p-8 max-w-5xl mx-auto shadow-sm">
            <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#0a7a9b]/10 text-[#0a7a9b]">
                <LockKeyhole className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-display text-lg font-extrabold text-navy-deep">
                  Not sure which level fits you best?
                </h4>
                <p className="mt-1 text-sm text-foreground/75 leading-relaxed">
                  Book a free consultation and we'll help you choose the right path.
                </p>
              </div>
            </div>

            <Link
              to="/contact"
              className="flex items-center gap-2 rounded-xl border border-[#0a7a9b] text-[#0a7a9b] hover:bg-[#0a7a9b]/5 py-3 px-6 font-bold text-sm transition-colors duration-200 shrink-0"
            >
              <Calendar className="h-4 w-4" />
              <span>Book a Free Consultation</span>
            </Link>
          </div>
        </Reveal>
      </section>

      {/* Features row */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 pt-12 pb-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto border-t border-border/80 pt-10">
          {FEATURES.map((feat, index) => (
            <Reveal
              key={index}
              delay={index * 60}
              className="flex flex-col items-center text-center"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0a7a9b]/10 text-[#0a7a9b]">
                <feat.icon className="h-5.5 w-5.5" />
              </div>
              <h5 className="mt-4 font-display text-sm font-extrabold text-navy-deep">
                {feat.title}
              </h5>
              <p className="mt-1.5 text-xs text-foreground/60 leading-relaxed max-w-[200px]">
                {feat.desc}
              </p>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
