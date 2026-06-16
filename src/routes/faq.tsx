import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { PageHero } from "./services";
import { useState } from "react";
import { Plus } from "lucide-react";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Hire Career Coach" },
      { name: "description", content: "Answers about timelines, revisions, ATS, confidentiality, refunds and how to start." },
      { property: "og:title", content: "FAQ — Hire Career Coach" },
      { property: "og:description", content: "Everything you wanted to ask before booking — in one quiet page." },
    ],
  }),
  component: FAQPage,
});

const FAQS = [
  {
    q: "How long does a project take?",
    a: "Single services typically finish within 5–7 business days. Full packages take 2–3 weeks across discovery, drafting and revisions. Executive engagements are scoped individually.",
  },
  {
    q: "Will my résumé pass ATS screening?",
    a: "Yes. Every document is built on a clean, parser-friendly structure and tested against multiple ATS engines. We never use tables, columns or hidden text that break parsing.",
  },
  {
    q: "Who actually writes my résumé?",
    a: "A senior writer with hiring experience in your industry. The person on your discovery call is the same person drafting and revising your documents — no offshoring, no juniors.",
  },
  {
    q: "How do revisions work?",
    a: "Each package includes a set number of full-pass revisions (2–4 depending on tier). We collect your feedback in writing or on a 30-minute review call and turn the next draft within 48 hours.",
  },
  {
    q: "Is everything confidential?",
    a: "Always. We sign an NDA on request and never display client work in our portfolio without explicit written consent — especially important for executive searches.",
  },
  {
    q: "Do you offer refunds?",
    a: "If the first draft of your résumé doesn't meet the brief we agreed on in discovery, we'll either rework it at no cost or refund the project in full. We've issued exactly four refunds in six years.",
  },
  {
    q: "Can you guarantee interviews or offers?",
    a: "No serious career coach can — and anyone who does is selling you something. What we can guarantee is documents that move you further in the funnel and a strategy you can execute.",
  },
  {
    q: "Do you work with clients outside the United States?",
    a: "Yes. Roughly a third of our clients are international. We localize tone, format and length to your target market — UK, EU, Middle East, APAC.",
  },
];

function FAQPage() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title={[{ t: "Quiet" }, { t: "answers", gold: true, italic: true }, { t: "to the" }, { t: "loud questions." }]}
        sub="Everything we get asked before clients book — timelines, ATS, revisions, confidentiality and the few things we won't promise."
      />

      <section className="mx-auto max-w-3xl px-5 sm:px-8 py-16 sm:py-20">
        <ul className="divide-y divide-border border-y border-border">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal as="li" key={f.q} delay={i * 50} className="group">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full text-left py-6 flex items-start gap-5"
                >
                  <span className="font-display text-sm text-gold mt-2 shrink-0">0{i + 1}</span>
                  <span className="flex-1 font-display text-2xl sm:text-3xl leading-tight">{f.q}</span>
                  <Plus
                    className={[
                      "h-5 w-5 shrink-0 mt-3 text-foreground/50 transition-transform duration-500",
                      isOpen ? "rotate-45 text-gold" : "",
                    ].join(" ")}
                  />
                </button>
                <div
                  className="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(.22,1,.36,1)]"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p className="pb-7 pl-12 pr-6 text-foreground/70 text-lg leading-relaxed">{f.a}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </ul>

        <Reveal className="mt-16 rounded-3xl bg-navy text-ivory p-10 text-center">
          <p className="text-xs uppercase tracking-[0.22em] text-gold">— Still on the fence?</p>
          <h3 className="font-display text-3xl sm:text-4xl mt-3">Ask us anything in a 15-minute call.</h3>
          <Link to="/contact" className="mt-8 inline-flex rounded-full bg-gold text-navy-deep px-7 py-3.5 text-sm font-semibold hover:bg-gold-soft transition-colors">
            Book a call
          </Link>
        </Reveal>
      </section>
    </>
  );
}
