import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { useState } from "react";
import { 
  Search, 
  HelpCircle, 
  FileText, 
  FileSearch, 
  Linkedin, 
  Users, 
  Target, 
  Settings, 
  Lock, 
  ChevronDown, 
  CalendarCheck 
} from "lucide-react";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Hire Career Coach" },
      { name: "description", content: "Answers about timelines, revisions, ATS, confidentiality, refunds and how to start." },
      { property: "og:title", content: "Frequently Asked Questions — Hire Career Coach" },
      { property: "og:description", content: "Everything you wanted to ask before booking — in one convenient page." },
    ],
  }),
  component: FAQPage,
});

type FaqItem = {
  q: string;
  a: string;
};

type FaqCategory = {
  title: string;
  icon: any;
  items: FaqItem[];
};

const FAQ_CATEGORIES: FaqCategory[] = [
  {
    title: "General Questions",
    icon: HelpCircle,
    items: [
      {
        q: "What services does Hire Career Coach offer?",
        a: "We offer professional resume writing, resume reviews & ATS audits, cover letter writing, LinkedIn profile optimization, professional headshots and LinkedIn banners, interview preparation coaching, and career strategy sessions."
      },
      {
        q: "Who do you work with?",
        a: "We work with professionals at all career levels — from recent graduates and entry-level employees launching their careers, to mid-career managers, career changers, and C-suite executives."
      },
      {
        q: "Do you work with clients outside the United States?",
        a: "Yes. We work with clients globally, including professionals in the United States, Canada, the United Kingdom, Australia, Europe, the Middle East, and Asia."
      }
    ]
  },
  {
    title: "Resume Writing",
    icon: FileText,
    items: [
      {
        q: "Are your resumes ATS-friendly?",
        a: "Yes. Every resume we write is built from scratch using ATS-optimized formatting, structures, and keyword strategy to ensure it successfully parses through applicant tracking systems."
      },
      {
        q: "Can you update my existing resume?",
        a: "Yes. We can rebuild, rewrite, and modernize your existing resume, aligning it with your current goals and optimized keywords."
      },
      {
        q: "What if I don't have a resume?",
        a: "If you don't have a resume, we will guide you through a comprehensive intake process to gather details about your experience, achievements, and career goals to build one from scratch."
      },
      {
        q: "What industries do you specialize in?",
        a: "We specialize in a wide range of industries including Tech (Software, Cybersecurity, IT), Healthcare, Finance, Engineering, Sales, Marketing, Human Resources, Education, Operations, Legal, and executive-level roles."
      }
    ]
  },
  {
    title: "Resume Review & ATS Audit",
    icon: FileSearch,
    items: [
      {
        q: "What is a Resume Review & ATS Audit?",
        a: "It is an expert review of your current resume to evaluate its visual layout, keyword optimization, alignment with target roles, and how it parses through ATS systems, highlighting areas for improvement."
      },
      {
        q: "Will my audit fee be credited toward a resume package?",
        a: "Yes. If you decide to upgrade to any of our professional resume writing packages within 14 days, the fee paid for your audit will be fully credited."
      }
    ]
  },
  {
    title: "LinkedIn Optimization",
    icon: Linkedin,
    items: [
      {
        q: "What does LinkedIn Optimization include?",
        a: "We optimize your headline, About summary, experience entries, skills keywords, and profile configuration to maximize your search visibility to recruiters."
      },
      {
        q: "What is the difference between LinkedIn Optimization and Career Profile Enhancement?",
        a: "LinkedIn Optimization focuses on text positioning, profile content, SEO, and recruiter settings. Career Profile Enhancement includes visual assets like custom LinkedIn banner designs and professional headshots."
      }
    ]
  },
  {
    title: "Interview Preparation",
    icon: Users,
    items: [
      {
        q: "What does Interview Preparation include?",
        a: "It includes personalized coaching, mock interviews, STAR method guidance for behavioral questions, salary negotiation strategies, and building overall performance confidence."
      },
      {
        q: "Can you help me prepare for a specific interview?",
        a: "Yes. We can research the specific company and role you are interviewing for and tailor our mock interview prep to that exact target."
      }
    ]
  },
  {
    title: "Career Strategy Sessions",
    icon: Target,
    items: [
      {
        q: "What happens during a Career Strategy Session?",
        a: "We discuss your short-term and long-term career goals, refine your target roles, review job search strategies, and create an actionable roadmap to hit your milestones."
      },
      {
        q: "Who should book a Career Strategy Session?",
        a: "It is ideal for career changers, professionals feeling stuck in their current role, or leaders targeting executive advancements who need high-level strategic direction."
      }
    ]
  },
  {
    title: "Process & Delivery",
    icon: Settings,
    items: [
      {
        q: "How does the process work?",
        a: "Choose your service, fill out our simple intake form, collaborate with your writer/coach during the development phase, review drafts, and receive your finalized deliverables."
      },
      {
        q: "How long does the process take?",
        a: "Standard delivery is between 3 to 5 business days from the time your intake and materials are completed."
      },
      {
        q: "Do you offer rush services?",
        a: "Yes, concierge priority rush services are available for urgent timelines. Please contact us or select the rush option to coordinate."
      },
      {
        q: "How many revisions are included?",
        a: "Revision rounds are included with every resume package (typically 2 to 4 rounds depending on the tier) to ensure complete satisfaction."
      },
      {
        q: "What file formats will I receive?",
        a: "You will receive editable Microsoft Word (.docx) formats as well as finalized PDF versions."
      }
    ]
  },
  {
    title: "Payments & Policies",
    icon: Lock,
    items: [
      {
        q: "What payment methods do you accept?",
        a: "We accept all major credit cards, debit cards, and Stripe for secure online payment processing."
      },
      {
        q: "Do you offer refunds?",
        a: "Due to the custom, highly personalized nature of our career consulting and writing services, refunds are generally not available once work begins."
      },
      {
        q: "Do you guarantee interviews or job offers?",
        a: "We guarantee high-quality, ATS-optimized deliverables that significantly improve your search success, but we cannot guarantee third-party hiring decisions."
      },
      {
        q: "Is my information kept confidential?",
        a: "Yes. All your information, resume drafts, career history, and communications are held in strict privacy and are never shared."
      }
    ]
  }
];

function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({});

  const toggleAccordion = (categoryIndex: number, itemIndex: number) => {
    const key = `${categoryIndex}-${itemIndex}`;
    setOpenAccordions((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Filter categories and items based on search query
  const filteredCategories = FAQ_CATEGORIES.map((category, catIdx) => {
    const filteredItems = category.items.filter((item) => {
      const matchQuery = searchQuery.toLowerCase();
      return (
        item.q.toLowerCase().includes(matchQuery) ||
        item.a.toLowerCase().includes(matchQuery)
      );
    });

    return {
      ...category,
      items: filteredItems,
      originalIndex: catIdx
    };
  }).filter((category) => category.items.length > 0);

  return (
    <div className="bg-[#f8fafc] min-h-screen">
      
      {/* Hero Header */}
      <section className="bg-white border-b border-[#e2edf0] py-20 text-center relative overflow-hidden">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <Reveal>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#e6f2f5] text-[#006072] text-xs font-semibold uppercase tracking-wider mb-4 border border-[#d6e7eb]">
              <HelpCircle className="w-3.5 h-3.5" />
              Frequently Asked Questions
            </div>
            
            <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 leading-tight mb-4">
              How Can We Help You?
            </h1>
            
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl mx-auto mb-8">
              Find answers to common questions about our services, process, and how we can help you achieve your career goals.
            </p>

            {/* Search Input */}
            <div className="relative max-w-xl mx-auto">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                placeholder="Search for a question..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 bg-white border border-[#e2edf0] rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#006072]/20 focus:border-[#006072] text-slate-700 placeholder-slate-400 text-sm sm:text-base transition-all"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Accordions Category Grid */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-20">
        {filteredCategories.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {filteredCategories.map((category) => {
              const CatIcon = category.icon;
              return (
                <div key={category.title} className="w-full">
                  <Reveal className="flex items-center gap-3.5 border-b border-slate-200/60 pb-4">
                    <div className="w-10 h-10 rounded-full bg-[#e6f2f5] flex items-center justify-center shrink-0 border border-[#d6e7eb]">
                      <CatIcon className="text-[#006072] w-5 h-5" />
                    </div>
                    <h2 className="font-display font-bold text-slate-900 text-lg sm:text-xl">
                      {category.title}
                    </h2>
                  </Reveal>

                  <div className="space-y-4 mt-6">
                    {category.items.map((item, itemIdx) => {
                      const isOpen = !!openAccordions[`${category.originalIndex}-${itemIdx}`];
                      return (
                        <Reveal 
                          key={item.q} 
                          delay={itemIdx * 50}
                          className="bg-white border border-[#e2edf0] rounded-2xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.005)] transition-all hover:border-[#b2d5de]"
                        >
                          <button
                            onClick={() => toggleAccordion(category.originalIndex, itemIdx)}
                            className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-semibold text-slate-800 text-sm sm:text-base group"
                          >
                            <span className="group-hover:text-[#006072] transition-colors">{item.q}</span>
                            <ChevronDown 
                              className={`text-[#006072] w-5 h-5 shrink-0 transition-transform duration-300 ${
                                isOpen ? "rotate-180" : ""
                              }`} 
                            />
                          </button>

                          <div
                            className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                              isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                            }`}
                          >
                            <div className="overflow-hidden">
                              <div className="px-4 sm:px-5 pb-5 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-50/50 pt-3">
                                {item.a}
                              </div>
                            </div>
                          </div>
                        </Reveal>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <Reveal className="text-center py-12">
            <p className="text-slate-500 text-lg">No questions match "{searchQuery}"</p>
            <button 
              onClick={() => setSearchQuery("")} 
              className="mt-4 text-[#006072] font-semibold text-sm hover:underline"
            >
              Clear search filter
            </button>
          </Reveal>
        )}

        {/* Still Have Questions bottom CTA */}
        <Reveal delay={150} className="mt-16 sm:mt-24">
          <div className="relative overflow-hidden rounded-3xl bg-[#eef6f8] border border-[#d6e7eb] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
            <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
              <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shrink-0 border border-[#d6e7eb] shadow-sm">
                <CalendarCheck className="text-[#006072] w-6 h-6" />
              </div>
              <div>
                <h3 className="text-slate-900 font-bold text-lg sm:text-xl">Still Have Questions?</h3>
                <p className="text-slate-600 text-sm mt-1">We're here to help! Book a 1-on-1 consultation with our career expert and get personalized answers.</p>
              </div>
            </div>
            
            <Link 
              to="/contact" 
              className="w-full md:w-auto bg-[#006072] hover:bg-[#004e5d] text-white font-semibold px-6 py-3.5 rounded-xl flex items-center justify-center gap-2.5 transition-all shadow-[0_4px_12px_rgba(0,96,114,0.15)] shrink-0 text-sm group"
            >
              Book a Consultation
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
