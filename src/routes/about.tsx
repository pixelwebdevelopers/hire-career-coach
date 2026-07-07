import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { Reveal } from "@/components/Reveal";
import interviewImage from "@/assets/interview.jpg";
import {
  ChevronLeft,
  ChevronRight,
  Quote,
  Star,
  ArrowRight,
  Briefcase,
  Users,
  Compass,
  ArrowLeft,
  CalendarCheck,
  Folder,
} from "lucide-react";

// Import newly generated real photographic avatars
import avaF1 from "@/assets/headshot_f1.png";
import avaM1 from "@/assets/headshot_m1.png";
import avaF2 from "@/assets/headshot_f2.png";
import avaM2 from "@/assets/headshot_m2.png";
import avaF3 from "@/assets/headshot_f3.png";
import avaM3 from "@/assets/headshot_m3.png";
import avaF4 from "@/assets/headshot_f4.png";
import avaF5 from "@/assets/headshot_f5.png";
import avaF6 from "@/assets/headshot_f6.png";
import avaF7 from "@/assets/headshot_f7.png";
import avaF8 from "@/assets/headshot_f8.png";
import avaF9 from "@/assets/headshot_f9.png";
import avaM4 from "@/assets/headshot_m4.png";
import avaM5 from "@/assets/headshot_m5.png";
import avaM6 from "@/assets/headshot_m6.png";
import avaM7 from "@/assets/headshot_m7.png";

// Import existing high-quality avatars for remaining slots to ensure all 19 are unique
import avaM8 from "@/assets/portfolio-avatar-icons/imageye___-_imgi_162_color-executive-1024x1024.jpg";
import avaM9 from "@/assets/portfolio-avatar-icons/imageye___-_imgi_219_seniorsales-head-1024x1024.jpg";
import avaM10 from "@/assets/portfolio-avatar-icons/imageye___-_imgi_84_architect2-head-1024x1024.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Success Stories — Hire Career Coach" },
      {
        name: "description",
        content:
          "Read the success stories of professionals we've helped elevate their branding, strategies, and documents to land interviews and job offers.",
      },
      { property: "og:title", content: "Success Stories — Hire Career Coach" },
      {
        property: "og:description",
        content: "Quiet wins. Loud careers. Real stories of career transitions.",
      },
      { property: "og:image", content: interviewImage },
    ],
  }),
  component: SuccessStoriesPage,
});

const STORIES = [
  // Early Career
  {
    name: "Ariana Cole",
    role: "Graduate Software Developer",
    stage: "Early Career",
    pkg: "Career Pro",
    avatar: avaF1,
    quote:
      "Graduating was exciting, but standing out in a competitive market was a lot harder than I expected. My applications weren’t getting much attention, so I decided to invest in Career Pro. My resume, cover letter, LinkedIn profile, Indeed profile, and personal branding finally worked together instead of feeling disconnected. Within a few weeks, recruiters started reaching out through LinkedIn, and I secured interviews with two graduate software companies. It gave me confidence that I was finally presenting myself the right way.",
  },
  {
    name: "Mason Reid",
    role: "Junior Data Analyst",
    stage: "Early Career",
    pkg: "Resume Writing",
    avatar: avaM1,
    quote:
      "I always felt my resume undersold my skills. My projects and technical experience were there, but employers didn’t seem to notice them. After the rewrite, everything was much clearer and easier to follow. Not long after updating my applications, I started getting interview invitations for data analyst roles instead of wondering why I wasn’t hearing back.",
  },
  {
    name: "Lena Whitmore",
    role: "Marketing Coordinator",
    stage: "Early Career",
    pkg: "Career Strategy",
    avatar: avaF2,
    quote:
      "I spent months applying for jobs without any real direction, which was frustrating. The Career Strategy session helped me narrow my focus, build a realistic job search plan, and approach networking with much more confidence. A few weeks later, I was interviewing for marketing roles that actually matched my long-term goals instead of applying for anything I could find.",
  },
  {
    name: "Noah Ellery",
    role: "Junior Accountant",
    stage: "Early Career",
    pkg: "Career Plus",
    avatar: avaM2,
    quote:
      "My internship gave me valuable experience, but my applications weren’t reflecting what I’d learned. Career Plus changed that. My resume, cover letter, and LinkedIn profile finally told a consistent story about my skills and potential. I noticed more recruiter activity on LinkedIn and was invited to interview with firms that had previously overlooked my applications.",
  },
  {
    name: "Sienna Brooks",
    role: "Dental Assistant",
    stage: "Early Career",
    pkg: "Career Core",
    avatar: avaF3,
    quote:
      "I wanted employers to see more than a list of responsibilities. Career Core helped present my chairside assistance, patient care, and administrative experience in a much stronger way. The updated resume and cover letter gave me the confidence to apply to larger practices, and I was invited to interview for a role that offered far better career growth than I expected.",
  },
  {
    name: "Ethan Mercer",
    role: "Customer Support Specialist",
    stage: "Early Career",
    pkg: "Career Pro",
    avatar: avaM3,
    quote:
      "Changing careers meant I needed to present my previous experience differently. Career Pro helped me build a complete professional profile that reflected my transferable skills. After updating everything, including my LinkedIn and Indeed profiles, I started receiving messages from recruiters looking for customer support professionals. A few interviews later, I successfully made the career transition I’d been working toward.",
  },
  // Mid-Career
  {
    name: "Natalie Hayes",
    role: "Project Manager",
    stage: "Mid-Career",
    pkg: "Career Pro",
    avatar: avaF4,
    quote:
      "I wasn’t looking for a simple resume update. I wanted my professional profile to reflect where my career was heading. Career Pro helped bring everything together. My resume, cover letter, LinkedIn profile, Indeed profile, and personal branding all told the same story. Within a few weeks, I started getting approached by recruiters for senior project management roles that were much closer to the level I was aiming for.",
  },
  {
    name: "Brandon Ellis",
    role: "Software Engineer",
    stage: "Mid-Career",
    pkg: "Career Plus",
    avatar: avaM4,
    quote:
      "After several years in software engineering, I realized my resume still looked like it belonged to someone much earlier in their career. Career Plus helped showcase the projects I’d led and the impact I’d made. My LinkedIn profile also became much stronger, and before long I started receiving messages from recruiters about senior engineering opportunities that I hadn’t been considered for before.",
  },
  {
    name: "Priya Morgan",
    role: "Human Resources Manager",
    stage: "Mid-Career",
    pkg: "Resume Writing",
    avatar: avaF5,
    quote:
      "I thought I only needed a stronger resume, but I didn’t realize how much difference the right wording could make. My leadership experience was presented much more effectively while still sounding like me. Not long after updating my applications, I was shortlisted for interviews that better matched my HR management experience.",
  },
  {
    name: "Lucas Bennett",
    role: "Financial Analyst",
    stage: "Mid-Career",
    pkg: "Career Strategy",
    avatar: avaM5,
    quote:
      "I wasn’t struggling because of a lack of experience. I simply wasn’t sure what my next career move should be. The Career Strategy session gave me a clear direction, a practical roadmap, and a better networking approach. Instead of applying for every opportunity, I focused on roles that aligned with my long-term goals, and the quality of my interviews improved significantly.",
  },
  {
    name: "Rachel Kim",
    role: "Registered Nurse",
    stage: "Mid-Career",
    pkg: "Career Plus",
    avatar: avaF6,
    quote:
      "Working in healthcare doesn’t leave much time to think about your career documents, so I’d been putting them off for years. Career Plus made the process straightforward. My resume reflected the depth of my clinical experience, my cover letter was tailored to the roles I wanted, and my LinkedIn profile finally matched my experience. Soon after updating everything, I began receiving interview invitations from hospitals I’d wanted to work with.",
  },
  {
    name: "Owen Carter",
    role: "Business Analyst",
    stage: "Mid-Career",
    pkg: "Career Core",
    avatar: avaM6,
    quote:
      "I knew I had solid experience, but my applications weren’t getting the attention I expected. Career Core helped present my achievements much more clearly, and the cover letter strengthened every application I submitted. The difference became obvious when I started getting positive responses from responses from employers and more invitations to interview.",
  },
  {
    name: "Melissa Grant",
    role: "Marketing Manager",
    stage: "Mid-Career",
    pkg: "Career Pro",
    avatar: avaF7,
    quote:
      "I wanted more than updated documents. I wanted a professional image that reflected the level I’d reached in my career. Career Pro helped me achieve exactly that. My resume, LinkedIn profile, Indeed profile, and personal branding all worked together, and I noticed a steady increase in recruiter messages for leadership marketing positions over the following weeks.",
  },
  {
    name: "Derek Lawson",
    role: "Operations Manager",
    stage: "Mid-Career",
    pkg: "Career Pro",
    avatar: avaM7,
    quote:
      "I knew my experience wasn’t the problem. The way I was presenting it was. Career Pro helped position my leadership achievements much more effectively across my resume, LinkedIn, and Indeed profiles. A few weeks after updating everything, I was contacted by two recruiters about operations leadership roles that matched the direction I wanted to take my career.",
  },
  // Executive
  {
    name: "Jonathan Mercer",
    role: "Chief Executive Officer (CEO)",
    stage: "Executive",
    pkg: "Career Strategy",
    avatar: avaM8,
    quote:
      "At this stage of my career, I wasn’t looking for someone to improve my resume. I needed clarity on how to position myself for future board and advisory opportunities. The Career Strategy session gave me a practical roadmap, refined my executive positioning, and helped me focus on the opportunities that best matched my long-term goals. A few months later, I was having conversations about board-level roles that I hadn’t previously considered pursuing.",
  },
  {
    name: "Isabella Grant",
    role: "Chief Operating Officer (COO)",
    stage: "Executive",
    pkg: "Career Plus",
    avatar: avaF8,
    quote:
      "Executive opportunities require more than an impressive work history. I wanted my career documents to reflect the scale of the organizations I’d led. Career Plus helped present my leadership experience with much greater clarity. My resume, cover letter, and LinkedIn profile all told the same story, and shortly afterward I began receiving interest from executive search firms for COO positions that closely matched my background.",
  },
  {
    name: "Daniel Whitmore",
    role: "Chief Financial Officer (CFO)",
    stage: "Executive",
    pkg: "Resume Writing",
    avatar: avaM10,
    quote:
      "I’ve worked with executive recruiters throughout my career, so I understand how much a resume matters at this level. Mine needed to communicate strategic financial leadership rather than simply list responsibilities. The final version captured that perfectly. Within weeks, I was shortlisted for executive interviews where my experience aligned much more closely with what employers were looking for.",
  },
  {
    name: "Sophia Bennett",
    role: "Chief Information Officer (CIO)",
    stage: "Executive",
    pkg: "Career Pro",
    avatar: avaF9,
    quote:
      "Technology leadership is always evolving, and I wanted my professional profile to reflect where my career is today rather than where it started. Career Pro helped align everything, from my resume and LinkedIn profile to my Indeed profile and personal branding. The updated profile gave me a much stronger executive presence, and I noticed a clear increase in conversations with executive recruiters about technology leadership opportunities.",
  },
  {
    name: "Michael Ashford",
    role: "Vice President of Sales",
    stage: "Executive",
    pkg: "Career Pro",
    avatar: avaM9,
    quote:
      "Over the years I’d built successful sales teams and delivered consistent results, but my personal brand didn’t reflect that success. Career Pro helped bring everything together. My resume, LinkedIn profile, Indeed profile, and profile branding all communicated the same leadership message. Soon after updating everything, I was approached about senior commercial leadership opportunities that were a much better fit for my experience and long-term career goals.",
  },
];

function SuccessStoriesPage() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Manual scroll controls
  const handleScrollLeft = () => {
    if (scrollContainerRef.current) {
      const card = scrollContainerRef.current.firstElementChild as HTMLElement;
      const cardWidth = card ? card.getBoundingClientRect().width : 340;
      scrollContainerRef.current.scrollBy({ left: -(cardWidth + 24), behavior: "smooth" });
    }
  };

  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      const card = scrollContainerRef.current.firstElementChild as HTMLElement;
      const cardWidth = card ? card.getBoundingClientRect().width : 340;
      scrollContainerRef.current.scrollBy({ left: cardWidth + 24, behavior: "smooth" });
    }
  };

  // Auto-scrolling carousel effect
  useEffect(() => {
    const timer = setInterval(() => {
      if (scrollContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
        const card = scrollContainerRef.current.firstElementChild as HTMLElement;
        const cardWidth = card ? card.getBoundingClientRect().width : 340;

        // Reset to beginning if at the end
        if (scrollLeft + clientWidth >= scrollWidth - 15) {
          scrollContainerRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          scrollContainerRef.current.scrollBy({ left: cardWidth + 24, behavior: "smooth" });
        }
      }
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-white min-h-screen">
      {/* 1. Hero / Top Section */}
      <section className="relative pt-16 sm:pt-20 pb-12 overflow-hidden">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-16 items-center">
            <Reveal>
              <p className="text-xs uppercase tracking-[0.28em] text-[#0a7a9b] font-bold">
                HIRE CAREER COACH STORIES
              </p>

              <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 leading-[1.15] mt-4 mb-5 text-balance">
                Proven Results. <br className="hidden sm:inline" />
                <span className="text-[#0a7a9b]">Real Career Transitions.</span>
              </h1>

              <div className="w-12 h-[2.5px] bg-[#0a7a9b] mb-8" />

              {/* Blockquote block */}
              <div className="flex gap-4 border-l-[3.5px] border-[#0a7a9b]/50 pl-5 mb-8">
                <Quote className="text-[#0a7a9b] w-9 h-9 shrink-0 opacity-70 rotate-180" />
                <div className="space-y-2">
                  <p className="font-display text-slate-900 font-extrabold text-xl sm:text-2xl italic leading-snug">
                    Being qualified is important. Being noticed is essential.
                  </p>
                  <p className="text-slate-500 text-sm italic leading-relaxed">
                    Read how our clients successfully positioned their stories, stood out in
                    competitive job markets, and secured their target roles.
                  </p>
                </div>
              </div>

              {/* Description copy */}
              <div className="space-y-5 text-slate-600 text-base sm:text-[1.05rem] leading-relaxed max-w-2xl">
                <p>
                  At Hire Career Coach, we measure our success strictly by the achievements of our
                  clients. Whether you're a recent graduate entering a competitive industry, a
                  mid-career professional targeting advancement, or an executive positioning
                  yourself for C-suite roles, we tailor every strategy to highlight your unique
                  value.
                </p>
                <p>
                  Explore the stories below to see how our custom resumes, cover letters, optimized
                  LinkedIn profiles, and career strategy consultations have translated into real,
                  tangible career growth.
                </p>
              </div>
            </Reveal>

            <Reveal delay={120} className="w-full max-w-md lg:max-w-none mx-auto lg:ml-auto">
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-border/80 shadow-md">
                <img
                  src={interviewImage}
                  alt="Professional job interview session"
                  className="w-full h-full object-cover"
                  style={{ objectPosition: "right center" }}
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 2. Success Stories Testimonials Carousel Section */}
      <section className="bg-[#fcfdfd] border-t border-b border-[#e2edf0] py-20 overflow-hidden">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          {/* Header Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_auto_1.6fr] gap-8 items-start mb-12">
            {/* Title & Review Count Column */}
            <div>
              <span className="inline-block rounded-full bg-[#0a7a9b]/10 text-[#0a7a9b] text-[10px] font-extrabold uppercase tracking-wider px-3.5 py-1 mb-4">
                Testimonials
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-navy-deep leading-tight">
                What Our Clients Say
              </h2>

              {/* Happy Clients Count card */}
              <div className="flex items-center gap-3.5 bg-white border border-[#e2edf0] rounded-2xl p-4 shadow-sm max-w-xs mt-6">
                <img
                  src={avaM3}
                  alt="CEO Jonathan Mercer"
                  className="h-10 w-10 rounded-full object-cover border-2 border-[#0a7a9b]/25 shadow-sm"
                />
                <div>
                  <div className="flex text-[#b89460]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-[#b89460] stroke-[1.5]" />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-navy-deep mt-1 block">
                    2,000+ Happy Clients
                  </span>
                </div>
              </div>

              {/* Slider Manual Controls */}
              <div className="flex items-center gap-3 mt-8">
                <button
                  onClick={handleScrollLeft}
                  aria-label="Previous story"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-border/80 bg-white text-navy-deep hover:bg-cream/40 transition-colors shadow-sm"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={handleScrollRight}
                  aria-label="Next story"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0a7a9b] hover:bg-[#08627c] text-white transition-colors shadow-sm"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Vertical Separator */}
            <div className="hidden lg:block w-px h-32 bg-[#e2edf0] self-center" />

            {/* Description Text Column */}
            <div className="lg:pt-6">
              <p className="text-sm sm:text-base text-foreground/70 italic leading-relaxed">
                "Real career growth starts with a clear, strategic narrative. Hear from
                professionals who transformed their job searches, unlocked higher response rates,
                and secured competitive offers using our customized documents and career
                strategies."
              </p>
            </div>
          </div>

          {/* Carousel Viewport Container */}
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-6 pb-6 pt-2 snap-x snap-mandatory scroll-smooth no-scrollbar"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {STORIES.map((story, idx) => (
              <div
                key={idx}
                className="relative flex flex-col w-[21rem] sm:w-[26rem] shrink-0 snap-center rounded-3xl border border-[#0a7a9b]/15 bg-gradient-to-br from-white to-[#e6f2f5]/60 p-6 sm:p-8 pl-14 sm:pl-16 shadow-sm hover:shadow-md transition-all duration-300 group"
              >
                {/* Overlapping Avatar on the left edge */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-white shadow-md overflow-hidden bg-white z-10">
                  <img
                    src={story.avatar}
                    alt={story.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Subtle Quote Icon Background */}
                <div className="absolute top-4 right-6 text-[#0a7a9b]/10 group-hover:text-[#0a7a9b]/15 transition-colors">
                  <Quote className="h-10 sm:h-12 w-10 sm:w-12 rotate-180" />
                </div>

                {/* Stars */}
                <div className="flex text-[#b89460] mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-[#b89460] stroke-[1.5]" />
                  ))}
                </div>

                {/* Quote Content */}
                <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed font-semibold italic flex-1 mb-5">
                  “{story.quote}”
                </p>

                <div className="h-px bg-border/60 my-3 w-full" />

                {/* Client Profile details */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <h4 className="font-display text-sm font-extrabold text-navy-deep leading-snug">
                      {story.name}
                    </h4>
                    <span className="text-[10px] text-foreground/50 font-bold block mt-0.5 leading-none">
                      {story.role}
                    </span>
                  </div>

                  {/* Package Pill */}
                  <span className="inline-block rounded-lg bg-[#0a7a9b]/10 text-[#0a7a9b] text-[9px] font-extrabold uppercase tracking-wider px-2.5 py-1 self-start sm:self-center">
                    {story.pkg}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Bottom Action CTAs */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-20">
        <Reveal className="text-center max-w-3xl mx-auto mb-12">
          <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-navy-deep">
            Ready to Create Your Own Success Story?
          </h3>
          <p className="mt-3 text-sm sm:text-base text-foreground/70">
            Let's build strategic career documents and outline a job search strategy tailored to
            your exact professional goals.
          </p>
        </Reveal>

        <Reveal
          delay={120}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-lg mx-auto"
        >
          <Link
            to="/contact"
            className="w-full sm:w-auto bg-[#0a7a9b] hover:bg-[#08627c] text-white font-bold px-8 py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_4px_12px_rgba(10,122,155,0.15)] text-sm group"
          >
            <CalendarCheck className="w-4 h-4 transition-transform group-hover:scale-110" />
            Book a Consultation
          </Link>
          <Link
            to="/services"
            className="w-full sm:w-auto border border-[#0a7a9b] hover:bg-[#0a7a9b] hover:text-white text-[#0a7a9b] font-bold px-8 py-4 rounded-xl flex items-center justify-center gap-2 transition-all text-sm group"
          >
            <Folder className="w-4 h-4 transition-transform group-hover:scale-110" />
            Explore Services
          </Link>
        </Reveal>
      </section>
    </div>
  );
}
