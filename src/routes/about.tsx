import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import whoWeHelpHeader from "@/assets/who_we_help_header.png";
import { 
  Check, 
  Users, 
  Calendar, 
  Globe, 
  ShieldCheck, 
  FileCheck2, 
  UserCheck, 
  TrendingUp, 
  Briefcase, 
  CalendarCheck,
  Folder,
  Quote
} from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Hire Career Coach" },
      { name: "description", content: "More than documents. We build careers. A boutique career consultancy helping professionals stand out with strategic guidance and proven results." },
      { property: "og:title", content: "About — Hire Career Coach" },
      { property: "og:description", content: "A career studio, not a résumé mill. Quiet wins. Loud careers." },
      { property: "og:image", content: whoWeHelpHeader },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Top About Section */}
      <section className="relative pt-16 sm:pt-20 pb-12 overflow-hidden">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-16 items-center">
            <Reveal>
              <p className="text-xs uppercase tracking-[0.28em] text-[#006072] font-semibold">
                ABOUT HIRE CAREER COACH
              </p>
              
              <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 leading-[1.15] mt-4 mb-5 text-balance">
                More Than Documents. <br className="hidden sm:inline" />
                <span className="text-[#006072]">We Build Careers.</span>
              </h1>
              
              <div className="w-12 h-[2.5px] bg-[#006072] mb-8" />
              
              {/* Blockquote Quote block */}
              <div className="flex gap-4 border-l-[3.5px] border-[#006072]/50 pl-5 mb-8">
                <Quote className="text-[#006072] w-9 h-9 shrink-0 opacity-70 rotate-180" />
                <div className="space-y-2">
                  <p className="font-display text-slate-900 font-extrabold text-xl sm:text-2xl italic leading-snug">
                    You’ve Worked Too Hard to Be Invisible.
                  </p>
                  <p className="text-slate-500 text-sm italic leading-relaxed">
                    Sometimes the difference between being overlooked and being hired is how your story is told.
                  </p>
                </div>
              </div>

              {/* Description copy */}
              <div className="space-y-5 text-slate-600 text-base sm:text-[1.05rem] leading-relaxed max-w-2xl">
                <p>
                  Hire Career Coach was built on a simple belief: talented professionals should never be overlooked because of an outdated résumé, weak professional visibility, or an unclear career strategy.
                </p>
                <p>
                  What began as freelance career consulting and résumé writing evolved into a trusted career services practice helping professionals across industries position themselves for new opportunities, promotions, career transitions, and leadership roles.
                </p>
                <p>
                  Through personalized guidance, ATS-optimized documents, LinkedIn optimization, interview preparation, and career strategy, we help professionals stand out in today’s competitive job market.
                </p>
              </div>
            </Reveal>

            <Reveal delay={120} className="w-full max-w-md lg:max-w-none mx-auto lg:ml-auto">
              <div className="relative aspect-[4/3] overflow-hidden image-blend-left">
                <img 
                  src={whoWeHelpHeader} 
                  alt="Laptop with Hire Career Coach logo, notebook, mug and plant" 
                  className="w-full h-full object-cover"
                />
              </div>
            </Reveal>
          </div>

          {/* Stats horizontal panel */}
          <Reveal delay={200} className="mt-16 sm:mt-20">
            <div className="bg-white border border-[#e2edf0] rounded-3xl p-8 sm:p-10 shadow-[0_8px_30px_rgba(0,0,0,0.015)]">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x lg:divide-[#e2edf0]">
                {[
                  {
                    value: "1,500+",
                    label: "Professionals Helped",
                    desc: "We've supported professionals at all career levels to stand out and achieve their goals.",
                    icon: Users,
                  },
                  {
                    value: "20+",
                    label: "Industries Supported",
                    desc: "Expertise across healthcare, technology, finance, engineering, education, operations, and more.",
                    icon: Calendar,
                  },
                  {
                    value: "40+",
                    label: "Countries Served",
                    desc: "Clients from around the world trust us to advance their careers with confidence.",
                    icon: Globe,
                  },
                  {
                    value: "100%",
                    label: "Personalized Service",
                    desc: "Every project is custom-crafted by senior writers. No templates. No outsourcing.",
                    icon: ShieldCheck,
                  },
                ].map((stat, idx) => {
                  const Icon = stat.icon;
                  return (
                    <div key={idx} className="lg:px-8 first:pl-0 last:pr-0">
                      <div className="flex items-center gap-3.5 mb-3.5">
                        <div className="w-11 h-11 rounded-full bg-[#e6f2f5] flex items-center justify-center shrink-0">
                          <Icon className="text-[#006072] w-5 h-5" />
                        </div>
                        <div>
                          <div className="font-display font-extrabold text-slate-900 text-2xl tracking-tight leading-none">
                            {stat.value}
                          </div>
                          <div className="text-[10px] font-bold text-[#006072] uppercase tracking-wider mt-1.5 leading-none">
                            {stat.label}
                          </div>
                        </div>
                      </div>
                      <p className="text-slate-500 text-sm leading-relaxed">
                        {stat.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="bg-[#f8fafc] border-t border-[#e2edf0] py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal className="text-center max-w-3xl mx-auto mb-16">
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="w-8 h-[1px] bg-[#006072]/60" />
              <span className="text-xs uppercase tracking-[0.25em] text-[#006072] font-semibold">
                WHY CHOOSE HIRE CAREER COACH
              </span>
              <span className="w-8 h-[1px] bg-[#006072]/60" />
            </div>
            <h2 className="font-display text-3xl sm:text-4.5xl md:text-5xl font-bold tracking-tight text-slate-900 leading-tight mt-3">
              Strategic Guidance.<br />
              <span className="text-[#006072]">Proven Results.</span>
            </h2>
          </Reveal>

          <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16">
            {[
              {
                title: "ATS-Optimized Documents",
                desc: "Resumes and cover letters designed to pass ATS screens and impress recruiters.",
                icon: FileCheck2,
              },
              {
                title: "Personalized One-on-One Support",
                desc: "You work directly with experienced professionals who understand your goals.",
                icon: UserCheck,
              },
              {
                title: "Career-Level Expertise",
                desc: "Solutions tailored for Early Career, Mid-Career, Senior Management, and Executives.",
                icon: TrendingUp,
              },
              {
                title: "Comprehensive Services",
                desc: "From resumes to LinkedIn, interviews, and strategy, we cover every step of your career journey.",
                icon: Briefcase,
              },
              {
                title: "Modern & Recruiter-Focused Approach",
                desc: "We use current hiring trends and recruiter insights to position you for success.",
                icon: Users,
              },
              {
                title: "Confidential & Professional",
                desc: "Your information is always handled with the highest level of privacy and professionalism.",
                icon: ShieldCheck,
              },
            ].map((card, idx) => {
              const Icon = card.icon;
              return (
                <Reveal
                  key={idx}
                  delay={idx * 60}
                  className="flex flex-col items-center text-center bg-white border border-[#e2edf0]/80 p-7 sm:p-8 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.015)] transition-all duration-300 hover:shadow-[0_12px_40px_rgba(0,96,114,0.05)] hover:border-[#b2d5de]"
                >
                  <div className="w-14 h-14 rounded-full bg-[#e6f2f5] flex items-center justify-center mb-5 shrink-0">
                    <Icon className="text-[#006072] w-6 h-6" />
                  </div>
                  <h3 className="font-display font-bold text-slate-900 text-lg leading-tight mb-3">
                    {card.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {card.desc}
                  </p>
                </Reveal>
              );
            })}
          </div>

          {/* Action buttons at the bottom of the page */}
          <Reveal delay={200} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              to="/contact" 
              className="w-full sm:w-auto bg-[#006072] hover:bg-[#004e5d] text-white font-semibold px-8 py-4 rounded-xl flex items-center justify-center gap-2.5 transition-all shadow-[0_4px_12px_rgba(0,96,114,0.15)] text-sm group"
            >
              <CalendarCheck className="w-4 h-4 transition-transform group-hover:scale-110" />
              Book a Consultation
            </Link>
            <Link 
              to="/services" 
              className="w-full sm:w-auto border border-[#006072] hover:bg-[#006072] hover:text-white text-[#006072] font-semibold px-8 py-4 rounded-xl flex items-center justify-center gap-2.5 transition-all text-sm group"
            >
              <Folder className="w-4 h-4 transition-transform group-hover:scale-110" />
              Explore Services
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
