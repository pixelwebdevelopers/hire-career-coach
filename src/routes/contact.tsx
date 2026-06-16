import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { PageHero } from "./services";
import { Mail, MapPin, Phone, Clock, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Hire Career Coach" },
      { name: "description", content: "Book a free 15-minute discovery call, or send us a note about your career goals." },
      { property: "og:title", content: "Contact — Hire Career Coach" },
      { property: "og:description", content: "Tell us about the role you want. We'll show you the paper trail to get there." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={[{ t: "Let's" }, { t: "talk about", italic: true }, { t: "the next move.", gold: true }]}
        sub="Tell us where you are, where you want to be, and what's getting in the way. We'll reply within one business day with a candid recommendation."
      />

      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-16 grid gap-12 lg:grid-cols-[1.2fr_1fr]">
        <Reveal>
          <form
            onSubmit={(e) => { e.preventDefault(); setSent(true); }}
            className="rounded-3xl bg-card border border-border p-8 sm:p-10"
          >
            {sent ? (
              <div className="py-16 text-center">
                <CheckCircle2 className="h-12 w-12 text-gold mx-auto" />
                <h3 className="mt-6 font-display text-3xl">Note received.</h3>
                <p className="mt-3 text-foreground/70">We'll be in touch within one business day. Often sooner.</p>
              </div>
            ) : (
              <>
                <h2 className="font-display text-3xl sm:text-4xl">Send a note</h2>
                <p className="mt-2 text-foreground/65">No obligation. Real human reply.</p>

                <div className="mt-8 grid sm:grid-cols-2 gap-5">
                  <Field label="First name" name="firstName" />
                  <Field label="Last name" name="lastName" />
                  <Field label="Email" type="email" name="email" />
                  <Field label="Phone (optional)" name="phone" />
                </div>
                <div className="mt-5">
                  <Field label="Current role & target role" name="role" />
                </div>
                <div className="mt-5">
                  <label className="block text-xs uppercase tracking-[0.18em] text-muted-foreground mb-2">Career stage</label>
                  <select className="w-full rounded-xl border border-border bg-background px-4 py-3 focus:outline-none focus:border-gold transition-colors">
                    <option>Early career (0–3 yrs)</option>
                    <option>Mid-career (4–10 yrs)</option>
                    <option>Senior / Director</option>
                    <option>Executive / C-Suite</option>
                  </select>
                </div>
                <div className="mt-5">
                  <label className="block text-xs uppercase tracking-[0.18em] text-muted-foreground mb-2">Tell us about your goals</label>
                  <textarea rows={5} className="w-full rounded-xl border border-border bg-background px-4 py-3 focus:outline-none focus:border-gold transition-colors resize-none" />
                </div>

                <button type="submit" className="mt-8 w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-navy text-ivory px-8 py-4 text-sm font-semibold hover:bg-navy-deep transition-colors">
                  Send my note
                </button>
              </>
            )}
          </form>
        </Reveal>

        <Reveal delay={150} className="space-y-8">
          <div className="rounded-3xl bg-navy text-ivory p-8 sm:p-10">
            <p className="text-xs uppercase tracking-[0.22em] text-gold">— Studio</p>
            <h3 className="font-display text-3xl mt-3">By appointment in New York.<br />Remote everywhere else.</h3>
            <ul className="mt-8 space-y-5">
              <Info icon={<MapPin className="h-4 w-4" />} label="1209 Madison Avenue, Suite 410, New York, NY 10028" />
              <Info icon={<Phone className="h-4 w-4" />} label="+1 (929) 555-0199" />
              <Info icon={<Mail className="h-4 w-4" />} label="hello@hirecareercoach.com" />
              <Info icon={<Clock className="h-4 w-4" />} label="Mon — Fri · 9am to 6pm ET" />
            </ul>
          </div>

          <div className="rounded-3xl bg-card border border-border p-8">
            <p className="text-xs uppercase tracking-[0.22em] text-gold">— Response time</p>
            <p className="mt-3 font-display text-2xl leading-snug">We reply to every inquiry within <em>one business day</em>. Most under four hours.</p>
          </div>
        </Reveal>
      </section>
    </>
  );
}

function Field({ label, name, type = "text" }: { label: string; name: string; type?: string }) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-[0.18em] text-muted-foreground mb-2">{label}</label>
      <input
        type={type}
        name={name}
        className="w-full rounded-xl border border-border bg-background px-4 py-3 focus:outline-none focus:border-gold transition-colors"
      />
    </div>
  );
}

function Info({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <li className="flex items-start gap-3 text-ivory/85">
      <span className="grid h-8 w-8 place-items-center rounded-full border border-ivory/20 text-gold shrink-0">{icon}</span>
      <span className="pt-1.5">{label}</span>
    </li>
  );
}
