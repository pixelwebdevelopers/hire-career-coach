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

type Faq = {
  q: string;
  a: string;
  bullets?: string[];
  note?: string;
};

const FAQS: Faq[] = [
  {
    q: "Why should I hire a professional résumé writer?",
    a: "A professionally written résumé helps showcase your skills, experience, and achievements in a way that attracts recruiters, aligns with ATS requirements, and increases interview opportunities.",
  },
  {
    q: "How is your service different from AI-generated résumés?",
    a: "AI can generate content, but it cannot fully understand your career story or goals. Every résumé is professionally written, reviewed, and tailored to your unique background.",
  },
  {
    q: "Will my résumé pass ATS screening?",
    a: "Yes. Every résumé is optimized using ATS best practices, relevant keywords, and professional formatting to improve compatibility with applicant tracking systems.",
  },
  {
    q: "Why am I not getting interviews despite applying to jobs?",
    a: "Common reasons include ATS issues, missing keywords, weak positioning, or a résumé that doesn't clearly communicate your value. We help identify and fix these issues.",
  },
  {
    q: "Who actually writes my résumé?",
    a: "Your résumé is written by an experienced professional résumé writer with expertise in ATS optimization, personal branding, and modern hiring practices.",
  },
  {
    q: "Do you write résumés manually or use AI?",
    a: "Every résumé is professionally written and reviewed by a real writer. We focus on creating customized documents that accurately reflect your experience and goals.",
  },
  {
    q: "Can you tailor my résumé to a specific job posting?",
    a: "Absolutely. We can align your résumé with a specific job description by highlighting the qualifications, experience, and keywords most relevant to the role.",
  },
  {
    q: "What industries do you specialize in?",
    a: "We work with professionals across a wide range of industries, including:",
    bullets: [
      "Information Technology (IT), Software & Cybersecurity",
      "Healthcare & Medical",
      "Engineering",
      "Finance, Banking & Accounting",
      "Sales & Business Development",
      "Marketing & Communications",
      "Human Resources",
      "Education & Training",
      "Legal & Compliance",
      "Operations, Logistics & Supply Chain",
      "Construction & Real Estate",
      "Manufacturing",
      "Energy & Utilities",
      "Government & Public Sector",
      "Nonprofit Organizations",
      "Customer Service & Administration",
      "Hospitality & Tourism",
      "Retail & E-Commerce",
      "Telecommunications",
      "Media & Entertainment",
      "Aviation & Aerospace",
      "Executive & Leadership Roles",
      "And many more",
    ],
    note: "Whether you're launching your career, pursuing a promotion, making a career transition, or targeting a leadership position, we can help position you competitively for your next opportunity.",
  },
  {
    q: "Do you offer LinkedIn profile optimization?",
    a: "Yes. We optimize LinkedIn profiles to strengthen your professional brand, improve recruiter visibility, and support your job search goals.",
  },
  {
    q: "What does LinkedIn profile optimization include?",
    a: "Services may include headline optimization, About section enhancement, experience updates, skills optimization, keyword strategy, recruiter search optimization, and personal branding improvements.",
  },
  {
    q: "What does career coaching include?",
    a: "Career coaching provides personalized guidance on career planning, job search strategy, networking, professional branding, and career advancement.",
  },
  {
    q: "Can you help with interview preparation?",
    a: "Yes. We provide interview coaching, mock interview practice, and strategies to help you communicate your value with confidence.",
  },
  {
    q: "Can you help with career changes?",
    a: "Absolutely. We help professionals identify transferable skills, reposition their experience, and successfully transition into new roles or industries.",
  },
  {
    q: "Do you provide job search strategy guidance?",
    a: "Yes. We provide guidance on networking, recruiter outreach, job search planning, and effective application strategies to help improve your results.",
  },
  {
    q: "What information do you need to get started?",
    a: "We typically need your current résumé (if available), target role, career goals, and any additional information you'd like highlighted.",
  },
  {
    q: "What file formats will I receive?",
    a: "You will receive your finalized documents in both Microsoft Word (.docx) and PDF formats for easy editing, sharing, and job applications.",
  },
  {
    q: "How long does a project take?",
    a: "Most projects are completed within 3–5 business days, depending on the service selected and project requirements.",
  },
  {
    q: "How do revisions work?",
    a: "Revision rounds are included to ensure your documents accurately reflect your experience, achievements, and career goals before final delivery.",
  },
  {
    q: "Is everything confidential?",
    a: "Yes. All client information, documents, and communications are handled with strict confidentiality and are never shared with third parties.",
  },
  {
    q: "Do you work with clients outside the United States?",
    a: "Yes. We work with professionals worldwide, including clients across the United States, Canada, the United Kingdom, Australia, Europe, and the Middle East.",
  },
  {
    q: "Do you offer refunds?",
    a: "Due to the personalized nature of our services, refunds are generally not available once work has begun. However, we are committed to addressing concerns and ensuring client satisfaction.",
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
                  <span className="font-display text-sm text-gold mt-2 shrink-0">{String(i + 1).padStart(2, "0")}</span>
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
                    <div className="pb-7 pl-12 pr-6 text-foreground/70 text-lg leading-relaxed">
                      <p>{f.a}</p>
                      {f.bullets && (
                        <ul className="mt-4 grid gap-x-8 gap-y-2 sm:grid-cols-2">
                          {f.bullets.map((b) => (
                            <li key={b} className="flex gap-2.5">
                              <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                      {f.note && <p className="mt-4">{f.note}</p>}
                    </div>
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
