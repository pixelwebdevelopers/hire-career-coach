import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { PageHero } from "./services";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { useEffect, useRef } from "react";

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: { url: string; parentElement: HTMLElement | null }) => void;
    };
  }
}

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Hire Career Coach" },
      {
        name: "description",
        content: "Book a free 15-minute discovery call about your career goals.",
      },
      { property: "og:title", content: "Contact — Hire Career Coach" },
      {
        property: "og:description",
        content: "Pick a time that works for you and let's talk about your next move.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={[
          { t: "Let's" },
          { t: "talk about", italic: true },
          { t: "the next move.", gold: true },
        ]}
        sub="Book a free 15-minute discovery call at a time that suits you — no pitch, just a candid read on where your career goes next. Prefer email? Our details are on the right."
      />

      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-16 grid gap-12 lg:grid-cols-[1.4fr_1fr]">
        <Reveal className="min-w-0">
          <div className="rounded-3xl bg-card border border-border p-4 sm:p-8">
            <div className="px-2 pt-2 sm:px-0 sm:pt-0">
              <p className="text-xs uppercase tracking-[0.22em] text-gold">— Book a meeting</p>
              <h2 className="font-display text-3xl sm:text-4xl mt-3 leading-tight">
                Pick a time that works for you.
              </h2>
              <p className="mt-3 text-foreground/65">
                Choose a slot below and we'll meet you there. It's a real conversation about your
                goals — never a sales call.
              </p>
            </div>
            <div className="mt-6">
              <CalendlyInline />
            </div>
          </div>
        </Reveal>

        <Reveal delay={150} className="min-w-0 space-y-8">
          <div className="rounded-3xl bg-navy text-ivory p-8 sm:p-10">
            <p className="text-xs uppercase tracking-[0.22em] text-gold">— Studio</p>
            <h3 className="font-display text-3xl mt-3">
              By appointment.
              <br />
              Remote everywhere else.
            </h3>
            <ul className="mt-8 space-y-5">
              <Info
                icon={<MapPin className="h-4 w-4" />}
                label="1944 Midland Road, Dundalk, MD 21222"
              />
              <Info
                icon={<Phone className="h-4 w-4" />}
                label="(443) 323-0211"
                href="tel:+14433230211"
              />
              <Info
                icon={<Mail className="h-4 w-4" />}
                label="contact@hirecareercoach.com"
                href="mailto:contact@hirecareercoach.com"
              />
              <Info icon={<Clock className="h-4 w-4" />} label="Mon — Sun · 7am to 11pm EST" />
            </ul>
          </div>

          <div className="rounded-3xl bg-card border border-border p-8">
            <p className="text-xs uppercase tracking-[0.22em] text-gold">— Prefer email?</p>
            <p className="mt-3 font-display text-2xl leading-snug">
              Send a note any time — we reply to every message within <em>one business day</em>.
              Most under four hours.
            </p>
          </div>
        </Reveal>
      </section>
    </>
  );
}

function CalendlyInline() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const id = "calendly-widget-script";
    const scriptExists = document.getElementById(id);

    const initWidget = () => {
      if (window.Calendly && containerRef.current) {
        containerRef.current.innerHTML = "";
        window.Calendly.initInlineWidget({
          url: "https://calendly.com/hirecareercoach/15min",
          parentElement: containerRef.current,
        });
      }
    };

    if (!scriptExists) {
      const s = document.createElement("script");
      s.id = id;
      s.src = "https://assets.calendly.com/assets/external/widget.js";
      s.async = true;
      s.onload = initWidget;
      document.body.appendChild(s);
    } else {
      if (window.Calendly) {
        initWidget();
      } else {
        const scriptElement = document.getElementById(id);
        if (scriptElement) {
          scriptElement.addEventListener("load", initWidget);
        }
      }
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full rounded-2xl overflow-hidden"
      style={{ minWidth: 0, height: 700 }}
    />
  );
}

function Info({ icon, label, href }: { icon: React.ReactNode; label: string; href?: string }) {
  return (
    <li className="flex items-start gap-3 text-ivory/85">
      <span className="grid h-8 w-8 place-items-center rounded-full border border-ivory/20 text-gold shrink-0">
        {icon}
      </span>
      {href ? (
        <a href={href} className="pt-1.5 transition-colors hover:text-gold">
          {label}
        </a>
      ) : (
        <span className="pt-1.5">{label}</span>
      )}
    </li>
  );
}
