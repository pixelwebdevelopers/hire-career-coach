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
  User,
  ShoppingBag,
} from "lucide-react";

import bgCard from "@/assets/success-stories/Background sample .webp";
import logo from "@/assets/hcc-logo.png";

// Import custom success stories images
import imgArianaCole from "@/assets/success-stories/Ariana Cole .webp";
import imgMasonReid from "@/assets/success-stories/Mason Reid.webp";
import imgLenaWhitmore from "@/assets/success-stories/Lena Whitmore.webp";
import imgNoahEllery from "@/assets/success-stories/Noah Ellery.webp";
import imgSiennaBrooks from "@/assets/success-stories/Sienna Brooks.webp";
import imgEthanMercer from "@/assets/success-stories/Ethan Mercer.webp";

import imgNatalieHayes from "@/assets/success-stories/Natalie Hayes.webp";
import imgBrandonEllis from "@/assets/success-stories/Brandon Ellis.webp";
import imgPriyaMorgan from "@/assets/success-stories/Priya Morgan.webp";
import imgLucasBennett from "@/assets/success-stories/Lucas BennettMale.webp";
import imgRachelKim from "@/assets/success-stories/Rachel Kim.webp";
import imgOwenCarter from "@/assets/success-stories/Owen Carter.webp";
import imgMelissaGrant from "@/assets/success-stories/Melissa Grant.webp";
import imgDerekLawson from "@/assets/success-stories/Derek LawsonMale.webp";

import imgVictoriaReynolds from "@/assets/success-stories/Victoria Reynolds.webp";
import imgAdrianFoster from "@/assets/success-stories/Adrian Foster.webp";
import imgMonicaAlvarez from "@/assets/success-stories/Monica Alvarez.webp";
import imgEthanCaldwell from "@/assets/success-stories/Ethan CaldwellMale.webp";
import imgJenniferBrooks from "@/assets/success-stories/Jennifer Brooks.webp";
import imgMarcusWhitfield from "@/assets/success-stories/Marcus Whitfield.webp";

import imgJonathanMercer from "@/assets/success-stories/Jonathan Mercer.webp";
import imgIsabellaGrant from "@/assets/success-stories/Isabella Grant.webp";
import imgDanielWhitmore from "@/assets/success-stories/Daniel Whitmore.webp";
import imgSophiaBennett from "@/assets/success-stories/Sophia Bennett.webp";
import imgMichaelAshford from "@/assets/success-stories/Michael Ashford.webp";

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
  {
    name: "Jonathan Mercer",
    role: "Chief Executive Officer (CEO)",
    stage: "Executive",
    pkg: "Career Strategy",
    avatar: imgJonathanMercer,
    quote:
      "At this stage of my career, I wasn’t looking for someone to improve my resume. I needed clarity on how to position myself for future board and advisory opportunities. The Career Strategy session gave me a practical roadmap, refined my executive positioning, and helped me focus on the opportunities that best matched my long-term goals. A few months later, I was having conversations about board-level roles that I hadn’t previously considered pursuing.",
  },
  {
    name: "Ariana Cole",
    role: "Graduate Software Developer",
    stage: "Early Career",
    pkg: "Career Pro",
    avatar: imgArianaCole,
    quote:
      "Graduating was exciting, but standing out in a competitive market was a lot harder than I expected. My applications weren’t getting much attention, so I decided to invest in Career Pro. My resume, cover letter, LinkedIn profile, Indeed profile, and personal branding finally worked together instead of feeling disconnected. Within a few weeks, recruiters started reaching out through LinkedIn, and I secured interviews with two graduate software companies. It gave me confidence that I was finally presenting myself the right way.",
  },
  {
    name: "Natalie Hayes",
    role: "Project Manager",
    stage: "Mid-Career",
    pkg: "Career Pro",
    avatar: imgNatalieHayes,
    quote:
      "I wasn’t looking for a simple resume update. I wanted my professional profile to reflect where my career was heading. Career Pro helped bring everything together. My resume, cover letter, LinkedIn profile, Indeed profile, and personal branding all told the same story. Within a few weeks, I started getting approached by recruiters for senior project management roles that were much closer to the level I was aiming for.",
  },
  {
    name: "Victoria Reynolds",
    role: "Senior Project Manager",
    stage: "Senior Management",
    pkg: "Career Strategy",
    avatar: imgVictoriaReynolds,
    quote:
      "After more than ten years in project management, I wasn’t looking for a resume rewrite. I wanted clarity on what my next move should be. The Career Strategy session helped me identify leadership opportunities that genuinely matched my experience and gave me a practical roadmap to follow. Instead of applying for roles that weren’t the right fit, I focused my search and was soon interviewing for senior leadership positions that aligned with my long-term goals.",
  },
  {
    name: "Isabella Grant",
    role: "Chief Operating Officer (COO)",
    stage: "Executive",
    pkg: "Career Plus",
    avatar: imgIsabellaGrant,
    quote:
      "Executive opportunities require more than an impressive work history. I wanted my career documents to reflect the scale of the organizations I’d led. Career Plus helped present my leadership experience with much greater clarity. My resume, cover letter, and LinkedIn profile all told the same story, and shortly afterward I began receiving interest from executive search firms for COO positions that closely matched my background.",
  },
  {
    name: "Brandon Ellis",
    role: "Software Engineer",
    stage: "Mid-Career",
    pkg: "Career Plus",
    avatar: imgBrandonEllis,
    quote:
      "After several years in software engineering, I realized my resume still looked like it belonged to someone much earlier in their career. Career Plus helped showcase the projects I’d led and the impact I’d made. My LinkedIn profile also became much stronger, and before long I started receiving messages from recruiters about senior engineering opportunities that I hadn’t been considered for before.",
  },
  {
    name: "Mason Reid",
    role: "Junior Data Analyst",
    stage: "Early Career",
    pkg: "Resume Writing",
    avatar: imgMasonReid,
    quote:
      "I always felt my resume undersold my skills. My projects and technical experience were there, but employers didn’t seem to notice them. After the rewrite, everything was much clearer and easier to follow. Not long after updating my applications, I started getting interview invitations for data analyst roles instead of wondering why I wasn’t hearing back.",
  },
  {
    name: "Adrian Foster",
    role: "IT Manager",
    stage: "Senior Management",
    pkg: "Career Plus",
    avatar: imgAdrianFoster,
    quote:
      "Technology had changed over the years, but my career documents hadn’t. Career Plus helped me present my leadership experience and technical achievements in a much stronger way. My resume, cover letter, and LinkedIn profile finally reflected the scope of the teams and projects I’d led. Not long after updating everything, I started hearing from recruiters about IT leadership roles that were a better match for my experience.",
  },
  {
    name: "Priya Morgan",
    role: "Human Resources Manager",
    stage: "Mid-Career",
    pkg: "Resume Writing",
    avatar: imgPriyaMorgan,
    quote:
      "I thought I only needed a stronger resume, but I didn’t realize how much difference the right wording could make. My leadership experience was presented much more effectively while still sounding like me. Not long after updating my applications, I was shortlisted for interviews that better matched my HR management experience.",
  },
  {
    name: "Daniel Whitmore",
    role: "Chief Financial Officer (CFO)",
    stage: "Executive",
    pkg: "Resume Writing",
    avatar: imgDanielWhitmore,
    quote:
      "I’ve worked with executive recruiters throughout my career, so I understand how much a resume matters at this level. Mine needed to communicate strategic financial leadership rather than simply list responsibilities. The final version captured that perfectly. Within weeks, I was shortlisted for executive interviews where my experience aligned much more closely with what employers were looking for.",
  },
  {
    name: "Lena Whitmore",
    role: "Marketing Coordinator",
    stage: "Early Career",
    pkg: "Career Strategy",
    avatar: imgLenaWhitmore,
    quote:
      "I spent months applying for jobs without any real direction, which was frustrating. The Career Strategy session helped me narrow my focus, build a realistic job search plan, and approach networking with much more confidence. A few weeks later, I was interviewing for marketing roles that actually matched my long-term goals instead of applying for anything I could find.",
  },
  {
    name: "Monica Alvarez",
    role: "Senior Human Resources Manager",
    stage: "Senior Management",
    pkg: "Resume Writing",
    avatar: imgMonicaAlvarez,
    quote:
      "Working in HR means I’ve reviewed more resumes than I can count, so I had high expectations. My new resume struck the right balance between professionalism and authenticity. It highlighted my leadership achievements without sounding exaggerated. Within a few weeks, I was shortlisted for HR leadership positions that had previously passed me by.",
  },
  {
    name: "Lucas Bennett",
    role: "Financial Analyst",
    stage: "Mid-Career",
    pkg: "Career Strategy",
    avatar: imgLucasBennett,
    quote:
      "I wasn’t struggling because of a lack of experience. I simply wasn’t sure what my next career move should be. The Career Strategy session gave me a clear direction, a practical roadmap, and a better networking approach. Instead of applying for every opportunity, I focused on roles that aligned with my long-term goals, and the quality of my interviews improved significantly.",
  },
  {
    name: "Sophia Bennett",
    role: "Chief Information Officer (CIO)",
    stage: "Executive",
    pkg: "Career Pro",
    avatar: imgSophiaBennett,
    quote:
      "Technology leadership is always evolving, and I wanted my professional profile to reflect where my career is today rather than where it started. Career Pro helped align everything, from my resume and LinkedIn profile to my Indeed profile and personal branding. The updated profile gave me a much stronger executive presence, and I noticed a clear increase in conversations with executive recruiters about technology leadership opportunities.",
  },
  {
    name: "Noah Ellery",
    role: "Junior Accountant",
    stage: "Early Career",
    pkg: "Career Plus",
    avatar: imgNoahEllery,
    quote:
      "My internship gave me valuable experience, but my applications weren’t reflecting what I’d learned. Career Plus changed that. My resume, cover letter, and LinkedIn profile finally told a consistent story about my skills and potential. I noticed more recruiter activity on LinkedIn and was invited to interview with firms that had previously overlooked my applications.",
  },
  {
    name: "Ethan Caldwell",
    role: "Supply Chain Manager",
    stage: "Senior Management",
    pkg: "Career Pro",
    avatar: imgEthanCaldwell,
    quote:
      "I wanted my professional profile to reflect the level I’d reached in my career, not where I’d been years ago. Career Pro helped align everything, from my resume and cover letter to my LinkedIn and Indeed profiles, while the profile enhancement gave my online presence a polished finish. The biggest difference was the quality of conversations I started having with recruiters, who were now approaching me for senior supply chain leadership opportunities.",
  },
  {
    name: "Rachel Kim",
    role: "Registered Nurse",
    stage: "Mid-Career",
    pkg: "Career Plus",
    avatar: imgRachelKim,
    quote:
      "Working in healthcare doesn’t leave much time to think about your career documents, so I’d been putting them off for years. Career Plus made the process straightforward. My resume reflected the depth of my clinical experience, my cover letter was tailored to the roles I wanted, and my LinkedIn profile finally matched my experience. Soon after updating everything, I began receiving interview invitations from hospitals I’d wanted to work with.",
  },
  {
    name: "Michael Ashford",
    role: "Vice President of Sales",
    stage: "Executive",
    pkg: "Career Pro",
    avatar: imgMichaelAshford,
    quote:
      "Over the years I’d built successful sales teams and delivered consistent results, but my personal brand didn’t reflect that success. Career Pro helped bring everything together. My resume, LinkedIn profile, Indeed profile, and profile branding all communicated the same leadership message. Soon after updating everything, I was approached about senior commercial leadership opportunities that were a much better fit for my experience and long-term career goals.",
  },
  {
    name: "Sienna Brooks",
    role: "Dental Assistant",
    stage: "Early Career",
    pkg: "Career Core",
    avatar: imgSiennaBrooks,
    quote:
      "I wanted employers to see more than a list of responsibilities. Career Core helped present my chairside assistance, patient care, and administrative experience in a much stronger way. The updated resume and cover letter gave me the confidence to apply to larger practices, and I was invited to interview for a role that offered far better career growth than I expected.",
  },
  {
    name: "Jennifer Brooks",
    role: "Director of Marketing",
    stage: "Senior Management",
    pkg: "Career Plus",
    avatar: imgJenniferBrooks,
    quote:
      "I’d spent years leading successful marketing teams, but my applications weren’t communicating the strategic impact of my work. Career Plus helped tell that story much more effectively. My resume, cover letter, and LinkedIn profile all reflected the results I’d delivered, and before long I was interviewing for director-level positions that offered the kind of growth I was looking for.",
  },
  {
    name: "Owen Carter",
    role: "Business Analyst",
    stage: "Mid-Career",
    pkg: "Career Core",
    avatar: imgOwenCarter,
    quote:
      "I knew I had solid experience, but my applications weren’t getting the attention I expected. Career Core helped present my achievements much more clearly, and the cover letter strengthened every application I submitted. The difference became obvious when I started getting positive responses from employers and more invitations to interview.",
  },
  {
    name: "Ethan Mercer",
    role: "Customer Support Specialist",
    stage: "Early Career",
    pkg: "Career Pro",
    avatar: imgEthanMercer,
    quote:
      "Changing careers meant I needed to present my previous experience differently. Career Pro helped me build a complete professional profile that reflected my transferable skills. After updating everything, including my LinkedIn and Indeed profiles, I started receiving messages from recruiters looking for customer support professionals. A few interviews later, I successfully made the career transition I’d been working toward.",
  },
  {
    name: "Marcus Whitfield",
    role: "Senior Operations Manager",
    stage: "Senior Management",
    pkg: "Career Pro",
    avatar: imgMarcusWhitfield,
    quote:
      "At this stage of my career, I wanted a professional profile that reflected my leadership experience and the results I’d delivered over the years. Career Pro brought everything together. My resume, LinkedIn profile, Indeed profile, and personal branding all presented a consistent message. A few weeks after updating everything, I was contacted by executive recruiters for operations leadership opportunities that I probably wouldn’t have been considered for before.",
  },
  {
    name: "Melissa Grant",
    role: "Marketing Manager",
    stage: "Mid-Career",
    pkg: "Career Pro",
    avatar: imgMelissaGrant,
    quote:
      "I wanted more than updated documents. I wanted a professional image that reflected the level I’d reached in my career. Career Pro helped me achieve exactly that. My resume, LinkedIn profile, Indeed profile, and personal branding all worked together, and I noticed a steady increase in recruiter messages for leadership marketing positions over the following weeks.",
  },
  {
    name: "Derek Lawson",
    role: "Operations Manager",
    stage: "Mid-Career",
    pkg: "Career Pro",
    avatar: imgDerekLawson,
    quote:
      "I knew my experience wasn’t the problem. The way I was presenting it was. Career Pro helped position my leadership achievements much more effectively across my resume, LinkedIn, and Indeed profiles. A few weeks after updating everything, I was contacted by two recruiters about operations leadership roles that matched the direction I wanted to take my career.",
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
                  src={imgJonathanMercer}
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
                className="relative flex flex-col w-[21rem] sm:w-[28rem] md:w-[32rem] shrink-0 snap-center rounded-[2rem] border border-slate-800/80 p-5 sm:p-6 md:p-8 shadow-2xl transition-all duration-300 overflow-hidden text-white group"
                style={{
                  backgroundImage: `linear-gradient(to bottom, rgba(15, 23, 42, 0.65), rgba(2, 6, 23, 0.92)), url(${bgCard})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {/* 1. Header: Avatar, Name/Role and Stage Badge */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    {/* Avatar */}
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-[3px] border-white shadow-lg overflow-hidden shrink-0">
                      <img
                        src={story.avatar}
                        alt={story.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    {/* Name & Role */}
                    <div>
                      <h4 className="font-display text-base sm:text-lg font-extrabold tracking-tight text-white leading-tight">
                        {story.name}
                      </h4>
                      <p className="text-[11px] sm:text-xs text-slate-300 font-semibold mt-0.5">
                        {story.role}
                      </p>
                    </div>
                  </div>

                  {/* Stage Badge */}
                  <div className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-[#00c2ff] text-black font-extrabold text-[9px] sm:text-[10px] tracking-wider self-start sm:self-center shrink-0 shadow-sm">
                    <User className="w-3.5 h-3.5" />
                    <span>{story.stage}</span>
                  </div>
                </div>

                {/* 2. Package Details Section */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl border border-white/20 bg-white/5 text-white shrink-0">
                    <ShoppingBag className="w-4.5 h-4.5 stroke-[1.5]" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[#00c2ff] text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider leading-none">
                      Package Purchased:
                    </span>
                    <span className="inline-block bg-[#00c2ff] text-black font-black px-2.5 py-0.5 rounded-md text-[10px] sm:text-xs uppercase tracking-wide self-start shadow-sm mt-1 leading-normal">
                      {story.pkg}
                    </span>
                  </div>
                </div>

                {/* 3. Quote Block */}
                <div className="flex gap-2.5 items-start flex-1 mb-4">
                  <span className="text-[#00c2ff] font-display text-4xl sm:text-5xl font-bold leading-none select-none -mt-2">
                    “
                  </span>
                  <p className="text-xs sm:text-sm text-slate-100 font-medium leading-relaxed italic flex-1">
                    {story.quote}
                    <span className="text-[#00c2ff] font-display text-lg font-extrabold ml-1 inline-block align-baseline">
                      ”
                    </span>
                  </p>
                </div>

                {/* 4. Footer: Divider line with Rating Stars */}
                <div className="flex items-center gap-3.5 w-full mb-2">
                  <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-[#00c2ff]/30"></div>
                  <div className="flex gap-0.5 text-[#00c2ff] shrink-0">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-[#00c2ff] stroke-none" />
                    ))}
                  </div>
                  <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-[#00c2ff]/30"></div>
                </div>

                {/* 5. Footer Logo */}
                <div className="flex justify-end w-full">
                  <img
                    src={logo}
                    alt="Hire Career Coach Logo"
                    className="h-7 sm:h-8 w-auto object-contain brightness-0 invert opacity-90"
                  />
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
