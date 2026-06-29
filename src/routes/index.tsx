import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Hero } from "@/components/home/Hero";
import { Reveal } from "@/components/Reveal";
import { SERVICES, PACKAGES } from "@/lib/content";
import workspace from "@/assets/workspace.jpg";
import interview from "@/assets/interview.jpg";
import deskSetupServices from "@/assets/desk_setup_services.png";
import aboutLaptopMockup from "@/assets/about_laptop_mockup.png";
import whoWeHelpHeader from "@/assets/who_we_help_header.png";
import helpHealthcare from "@/assets/help_healthcare.png";
import helpManagement from "@/assets/help_management.png";
import helpEngineering from "@/assets/help_engineering.png";
import helpTechnology from "@/assets/help_technology.png";
import helpStudents from "@/assets/help_students.png";
import helpChangers from "@/assets/help_changers.png";
import helpAdvancement from "@/assets/help_advancement.png";
import helpEntrepreneurs from "@/assets/help_entrepreneurs.png";
import {
  ArrowUpRight,
  Check,
  Quote,
  Star,
  Package,
  UserCheck,
  CalendarClock,
  PenTool,
  FileCheck2,
  Layers,
  ShieldCheck,
  Globe,
  Gem,
  ClipboardList,
  FileText,
  FileSearch,
  PenLine,
  Linkedin,
  Camera,
  Zap,
  Target,
  MessagesSquare,
  Laptop,
  MailCheck,
  ChevronDown,
  CalendarCheck,
  Users,
  Calendar,
  Briefcase,
  TrendingUp,
  Heart,
  Settings,
  Code2,
  GraduationCap,
  RefreshCw,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Hire Career Coach — Resumes, LinkedIn & Career Coaching" },
      { name: "description", content: "Premium resume writing, LinkedIn optimization, interview prep and career coaching for early-career to executive professionals." },
      { property: "og:title", content: "Hire Career Coach — Guide. Grow. Succeed." },
      { property: "og:description", content: "Resumes, LinkedIn and coaching for every stage — graduate to C-suite." },
      { property: "og:image", content: workspace },
    ],
  }),
  component: Home,
});

const STATS = [
  { v: "2,000+", l: "Professionals Served" },
  { v: "20+", l: "Years in business" },
  { v: "50 States & 30+ Countries", l: "with clients" },
  { v: "Senior Writer Every Time", l: "No Outsourcing. No Templates. No Shortcuts." },
];

const TESTIMONIALS = [
  {
    quote: "I had three interviews lined up within ten days of my new resume going live. Two became offers — both above my target band.",
    name: "Priya R.",
    role: "Senior Product Manager",
    industry: "Product · FinTech",
  },
  {
    quote: "They didn't just rewrite my resume. They re-articulated my career. The LinkedIn rework alone brought four recruiter intros that week.",
    name: "Marcus D.",
    role: "VP, Engineering",
    industry: "Engineering Leadership",
  },
  {
    quote: "Interview prep was the unlock. I walked into the boardroom with answers I actually believed in.",
    name: "Helena S.",
    role: "Director of Operations",
    industry: "Operations",
  },
  {
    quote: "I was switching industries and felt invisible. They reframed my story so the pivot looked like the obvious next step. Offer in five weeks.",
    name: "Daniel O.",
    role: "Marketing Lead → Product Manager",
    industry: "Career Change",
  },
  {
    quote: "My executive bio finally reads like a leader, not a job description. Two board conversations opened up within a month.",
    name: "Aisha N.",
    role: "Chief Financial Officer",
    industry: "Finance",
  },
  {
    quote: "My applications used to vanish into the void. After their ATS-optimized rewrite, I went from zero callbacks to six in three weeks.",
    name: "Rohan M.",
    role: "Data Engineer",
    industry: "Data Engineering",
  },
  {
    quote: "They made my clinical experience read with real authority. I landed an associate role at the practice I was targeting.",
    name: "Dr. Nadia F.",
    role: "Dentist",
    industry: "Dental",
  },
  {
    quote: "The salary-negotiation coaching paid for the whole package ten times over. I asked for more and got it without flinching.",
    name: "James K.",
    role: "Regional Sales Director",
    industry: "Sales",
  },
  {
    quote: "Switching from retail pharmacy to clinical, my resume finally spoke the right language. Interviews started within the first week.",
    name: "Omar S.",
    role: "Pharmacist",
    industry: "Pharmacy",
  },
  {
    quote: "The recruiter-outreach scripts and the refreshed LinkedIn did the heavy lifting. Inbound messages I never used to get are now routine.",
    name: "Dr. Elaine W.",
    role: "Physician",
    industry: "Healthcare",
  },
];

const INDUSTRIES = ["Technology", "Healthcare", "Finance", "Engineering", "Education", "Legal", "Marketing", "Sales", "Human Resources", "Operations", "Construction", "Manufacturing", "Retail", "Hospitality", "Energy", "Transportation", "Government", "Nonprofit", "Agriculture", "Pharmaceuticals"];

const PROCESS_STEPS = [
  {
    title: "Choose Your Service",
    description: "Explore our services and select the one that best fits your goals.",
    icon: ClipboardList,
  },
  {
    title: "Complete Your Intake",
    description: "Share your experience, target roles, and career objectives through our simple intake.",
    icon: FileText,
  },
  {
    title: "Connect with Your Coach",
    description: "For coaching and premium packages, we'll schedule a call to discuss your goals and strategy.",
    icon: MessagesSquare,
  },
  {
    title: "We Get to Work",
    description: "Our experts craft and optimize your documents with industry best practices and ATS strategies.",
    icon: Laptop,
  },
  {
    title: "Receive Your Deliverables",
    description: "Get your completed documents on time with guidance and support to help you take the next step with confidence.",
    icon: MailCheck,
  },
];

const HOME_SERVICES = [
  {
    num: "1",
    title: "Resume Writing",
    desc: "Professionally written, ATS-optimized resumes tailored to your experience, industry, and career goals to help you stand out and get interviews.",
    icon: FileText,
    btnText: "Explore Resume Writing",
    to: "/services",
    hash: "resume-writing",
    isPrimary: true,
  },
  {
    num: "2",
    title: "Resume Review & ATS Audit",
    desc: "Expert review and ATS audit of your resume to identify gaps, improve keyword relevance, and strengthen your overall job search results.",
    icon: FileSearch,
    btnText: "Explore Resume Review",
    to: "/services",
    hash: "resume-review",
    isPrimary: false,
  },
  {
    num: "3",
    title: "Cover Letter Writing",
    desc: "Custom cover letters that align with your resume, highlight achievements, and make a strong case for why you're the right candidate.",
    icon: PenLine,
    btnText: "Explore Cover Letter Writing",
    to: "/services",
    hash: "cover-letter",
    isPrimary: false,
  },
  {
    num: "4",
    title: "LinkedIn Optimization",
    desc: "LinkedIn profile optimization designed to improve recruiter visibility, keyword rankings, and networking opportunities. We enhance your headline, About section, experience, and skills to help you get noticed.",
    icon: Linkedin,
    btnText: "Optimize My LinkedIn",
    to: "/services",
    hash: "linkedin-optimization",
    isPrimary: true,
  },
  {
    num: "5",
    title: "Career Profile Enhancement",
    desc: "Enhance your professional image with high-quality headshots and custom LinkedIn banners that create a polished, credible presence and help you stand out to recruiters and employers.",
    icon: Camera,
    btnText: "Enhance My Profile",
    to: "/services",
    hash: "personal-branding",
    isPrimary: false,
    bullets: [
      "Professional headshots",
      "Custom LinkedIn banner design",
    ],
  },
  {
    num: "6",
    title: "Interview Preparation",
    desc: "Mock interviews, STAR method training, and personalized coaching to build confidence, communicate your value, and help you perform at your best.",
    icon: MessagesSquare,
    btnText: "Explore Interview Coaching",
    to: "/services",
    hash: "interview-prep",
    isPrimary: false,
  },
  {
    num: "7",
    title: "Career Strategy Session",
    desc: "One-on-one strategy sessions to define your career goals, job search strategy, networking approach, and next steps for long-term success.",
    icon: Target,
    btnText: "Book a Strategy Session",
    to: "/services",
    hash: "job-hunt-strategy",
    isPrimary: false,
  },
  {
    num: "8",
    title: "Professional Portfolio Website",
    desc: "Custom portfolio websites that showcase your skills, experience, and achievements to help you stand out in a competitive job market.",
    icon: Laptop,
    btnText: "Explore Portfolio Websites",
    to: "/contact",
    isPrimary: false,
  },
  {
    num: "9",
    title: "Priority Concierge Service (Rush Service)",
    desc: "Expedited turnaround for urgent career needs without compromising on quality. Ideal for tight deadlines and time-sensitive opportunities.",
    icon: Zap,
    btnText: "Explore Rush Service",
    to: "/contact",
    isPrimary: false,
  },
];

const CAREER_STAGES = [
  {
    title: "Healthcare Professionals",
    desc: "Dentists, Nurses, Physicians, Pharmacists, Therapists, and Healthcare Administrators.",
    image: helpHealthcare,
    icon: Heart,
    services: ["Resume Writing", "LinkedIn Optimization", "Interview Preparation"],
    hash: "resume-writing"
  },
  {
    title: "Managers & Executives",
    desc: "Directors, Operations Managers, Senior Leaders and Executives seeking advancement.",
    image: helpManagement,
    icon: Briefcase,
    services: ["Executive Resume Writing", "Career Strategy Session", "LinkedIn Optimization"],
    hash: "resume-writing"
  },
  {
    title: "Engineering & Technical Professionals",
    desc: "Engineers, Manufacturing Professionals, Project Managers, and Supply Chain Leaders.",
    image: helpEngineering,
    icon: Settings,
    services: ["Resume Writing", "ATS Audit", "Portfolio Website"],
    hash: "resume-writing"
  },
  {
    title: "Technology Professionals",
    desc: "IT, Cybersecurity, Software Developers, Data Analysts and Tech Specialists.",
    image: helpTechnology,
    icon: Code2,
    services: ["Resume Writing", "LinkedIn Optimization", "Portfolio Website"],
    hash: "resume-writing"
  },
  {
    title: "Students & Recent Graduates",
    desc: "Interns, New Graduates and Entry-level professionals launching their careers.",
    image: helpStudents,
    icon: GraduationCap,
    services: ["Resume Writing", "ATS Audit", "Career Strategy Session"],
    hash: "resume-review"
  },
  {
    title: "Career Changers",
    desc: "Professionals transitioning to a new industry or role and seeking direction.",
    image: helpChangers,
    icon: RefreshCw,
    services: ["Career Strategy Session", "Resume Writing", "Interview Preparation"],
    hash: "job-hunt-strategy"
  },
  {
    title: "Professionals Seeking Advancement",
    desc: "Professionals aiming for promotions, leadership roles and higher earning potential.",
    image: helpAdvancement,
    icon: TrendingUp,
    services: ["Resume Writing", "LinkedIn Optimization", "Interview Preparation"],
    hash: "career-development"
  },
  {
    title: "Entrepreneurs & Business Owners",
    desc: "Business Owners, Consultants and Freelancers building their brand and credibility.",
    image: helpEntrepreneurs,
    icon: Users,
    services: ["LinkedIn Optimization", "Portfolio Website", "Career Strategy Session"],
    hash: "personal-branding"
  }
];

function Home() {
  const [openSteps, setOpenSteps] = useState<Record<number, boolean>>({
    0: true,
    1: true,
    2: true,
    3: true,
    4: true,
  });

  const toggleStep = (index: number) => {
    setOpenSteps((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <>
      <Hero />

      {/* About Section */}
      <section className="relative bg-white pt-20 sm:pt-24 pb-12 overflow-hidden">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-16 items-center">
            <Reveal>
              <p className="text-xs uppercase tracking-[0.28em] text-[#006072] font-semibold">ABOUT HIRE CAREER COACH</p>
              <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 leading-[1.15] mt-4 mb-5 text-balance">
                More Than Documents. <br className="hidden sm:inline" />
                <span className="text-[#006072]">We Build Careers.</span>
              </h2>
              <div className="w-12 h-[2.5px] bg-[#006072] mb-6" />
              <div className="space-y-5 text-slate-600 text-base sm:text-[1.05rem] leading-relaxed max-w-2xl">
                <p className="font-medium text-slate-900 text-lg">
                  Hire Career Coach was built on a simple belief: every professional deserves a career that reflects their potential.
                </p>
                <p>
                  What began as freelance career consulting and resume writing has grown into a trusted career services practice helping professionals across the globe achieve real results.
                </p>
                <p>
                  We combine 20+ years of hands-on experience with modern hiring insights to deliver personalized, strategic, and results-driven solutions.
                </p>
              </div>
            </Reveal>
            <Reveal delay={120} className="w-full max-w-md lg:max-w-none mx-auto">
              <div className="relative aspect-[4/3] overflow-hidden image-blend-left">
                <img 
                  src={aboutLaptopMockup} 
                  alt="Laptop with Hire Career Coach logo" 
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
                    value: "15+",
                    label: "Years of Experience",
                    desc: "Combined experience in resume writing, recruiting, and career coaching.",
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
      <section className="bg-[#f8fafc] border-y border-[#e2edf0] py-24 sm:py-32">
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

          <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
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
                desc: "From resumes to LinkedIn, interviews, and strategy—we cover every step of your career journey.",
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
        </div>
      </section>

      {/* Who We Help Section */}
      <section className="bg-white py-24 sm:py-32 border-b border-[#e2edf0]">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          
          {/* Header Split */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.25fr_0.75fr] gap-12 lg:gap-16 items-center mb-16">
            <Reveal>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs uppercase tracking-[0.25em] text-[#006072] font-semibold">
                  WHO WE HELP
                </span>
                <span className="w-8 h-[1px] bg-[#006072]/60" />
              </div>
              
              <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 leading-[1.15] mt-3">
                We Help Professionals<br />
                At <span className="text-[#006072]">Every Career Stage</span>
              </h2>
              
              <p className="mt-5 text-slate-600 text-base sm:text-lg leading-relaxed max-w-xl">
                No matter where you are in your career journey, we have the expertise to help you stand out, get noticed, and achieve your goals.
              </p>
              
              {/* Highlight points */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#e6f2f5] flex items-center justify-center shrink-0 shadow-sm border border-[#d6e7eb]">
                    <Target className="text-[#006072] w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 text-sm sm:text-base">Personalized Solutions</h4>
                    <p className="text-slate-500 text-xs sm:text-sm mt-1 leading-relaxed">
                      Tailored to your unique goals and industry.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#e6f2f5] flex items-center justify-center shrink-0 shadow-sm border border-[#d6e7eb]">
                    <Users className="text-[#006072] w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 text-sm sm:text-base">Proven Expertise</h4>
                    <p className="text-slate-500 text-xs sm:text-sm mt-1 leading-relaxed">
                      Helping professionals across diverse industries succeed.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={120} className="w-full max-w-sm lg:max-w-none mx-auto lg:ml-auto">
              <div className="relative aspect-[4/3] overflow-hidden image-blend-left">
                <img 
                  src={whoWeHelpHeader} 
                  alt="Desk setup with logo coffee cup, books and plant" 
                  className="w-full h-full object-cover"
                />
              </div>
            </Reveal>
          </div>

          {/* Cards Grid */}
          <div className="grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {CAREER_STAGES.map((stage, idx) => {
              const Icon = stage.icon;
              return (
                <Reveal
                  key={idx}
                  delay={idx * 60}
                  className="flex flex-col bg-white border border-[#e2edf0] rounded-2xl overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.01)] hover:shadow-[0_12px_30px_rgba(0,96,114,0.06)] hover:border-[#b2d5de] transition-all duration-300 relative group"
                >
                  {/* Floating Icon */}
                  <div className="absolute top-4 left-4 z-10 w-10 h-10 rounded-full bg-white shadow-[0_4px_12px_rgba(0,0,0,0.08)] flex items-center justify-center border border-slate-100/50">
                    <Icon className="text-[#006072] w-5 h-5" />
                  </div>

                  {/* Card Image */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <img 
                      src={stage.image} 
                      alt={stage.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Card Content */}
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-display font-bold text-slate-900 text-lg leading-tight mb-2.5">
                      {stage.title}
                    </h3>
                    <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-5 min-h-[40px]">
                      {stage.desc}
                    </p>
                    
                    <div className="mt-auto">
                      <div className="text-[10px] font-bold text-[#006072] uppercase tracking-wider mb-3">
                        Popular Services
                      </div>
                      <ul className="space-y-2">
                        {stage.services.map((service, sIdx) => (
                          <li key={sIdx} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-600">
                            <span className="flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-[#e6f2f5] text-[#006072]">
                              <Check className="h-3 w-3 stroke-[3]" />
                            </span>
                            <span>{service}</span>
                          </li>
                        ))}
                      </ul>

                      {/* View Services Button */}
                      <Link 
                        to="/services" 
                        hash={stage.hash}
                        className="mt-6 w-full border border-[#006072]/20 hover:border-[#006072] hover:bg-[#006072] hover:text-white text-[#006072] font-semibold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all text-xs sm:text-sm group"
                      >
                        <span>View Services</span>
                        <span className="transition-transform group-hover:translate-x-1">→</span>
                      </Link>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works section */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-24 sm:py-32 bg-white">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Reveal>
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="w-8 h-[1px] bg-[#006072]/60" />
              <span className="text-xs uppercase tracking-[0.25em] text-[#006072] font-semibold">How It Works</span>
              <span className="w-8 h-[1px] bg-[#006072]/60" />
            </div>
            <h2 className="font-display text-3xl sm:text-4.5xl md:text-5xl font-bold tracking-tight text-slate-900 leading-tight mt-3">
              A Simple Process.<br />
              <span className="text-[#006072]">Meaningful Results.</span>
            </h2>
            <p className="mt-5 text-slate-600 text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
              We make career growth simple and stress-free. Our proven 5-step process is designed to deliver clarity, confidence, and career advancement.
            </p>
          </Reveal>
        </div>

        <div className="relative max-w-3xl mx-auto">
          {/* Dashed vertical timeline line */}
          <div className="absolute left-6 md:left-8 top-12 bottom-12 w-[2px] border-l-2 border-dashed border-[#a3ccd4] z-0 hidden sm:block" />

          <div className="space-y-6 relative z-10">
            {PROCESS_STEPS.map((step, idx) => {
              const StepIcon = step.icon;
              const isOpen = !!openSteps[idx];
              return (
                <Reveal key={idx} delay={idx * 80}>
                  <div className="grid grid-cols-1 sm:grid-cols-[48px_1fr] md:grid-cols-[64px_1fr] gap-6 items-center">
                    {/* Left Step Circle */}
                    <div className="hidden sm:flex justify-center">
                      <div className="w-12 h-12 rounded-full bg-[#006072] text-white flex items-center justify-center font-bold text-lg border-[3px] border-white shadow-[0_2px_8px_rgba(0,96,114,0.15)] shrink-0 z-10">
                        {idx + 1}
                      </div>
                    </div>

                    {/* Card container */}
                    <div 
                      onClick={() => toggleStep(idx)}
                      className="bg-white border border-[#e2edf0] rounded-2xl p-5 sm:p-6 flex items-start gap-4 sm:gap-5 shadow-[0_4px_12px_rgba(0,0,0,0.015)] transition-all duration-300 hover:shadow-[0_8px_24px_rgba(0,96,114,0.05)] hover:border-[#b2d5de] cursor-pointer group"
                    >
                      {/* Step Icon Container */}
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#e6f2f5] flex items-center justify-center shrink-0">
                        <StepIcon className="text-[#006072] w-5 h-5 sm:w-6 sm:h-6" />
                      </div>

                      {/* Content block */}
                      <div className="flex-1 min-w-0">
                        <div className="sm:hidden flex items-center gap-1.5 mb-1">
                          <span className="text-[11px] font-bold bg-[#006072] text-white px-2 py-0.5 rounded-full">
                            Step {idx + 1}
                          </span>
                        </div>
                        <h3 className="font-display font-semibold text-slate-900 text-lg sm:text-xl transition-colors group-hover:text-[#006072]">
                          {step.title}
                        </h3>
                        <div 
                          className={`mt-1.5 text-slate-600 text-sm leading-relaxed overflow-hidden transition-all duration-300 ${
                            isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                          }`}
                        >
                          {step.description}
                        </div>
                      </div>

                      {/* Chevron Down indicator */}
                      <ChevronDown 
                        className={`text-[#006072] w-5 h-5 shrink-0 self-center ml-auto transition-transform duration-300 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>

        {/* Ready to Get Started banner */}
        <Reveal delay={400} className="mt-16 max-w-3xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl bg-[#eef6f8] border border-[#d6e7eb] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
              <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shrink-0 border border-[#d6e7eb] shadow-sm">
                <CalendarCheck className="text-[#006072] w-6 h-6" />
              </div>
              <div>
                <h3 className="text-slate-900 font-bold text-lg sm:text-xl">Ready to Get Started?</h3>
                <p className="text-slate-600 text-sm mt-1">Book a consultation and let's create a plan tailored to your career goals.</p>
              </div>
            </div>
            <Link 
              to="/contact" 
              className="w-full md:w-auto bg-[#006072] hover:bg-[#004e5d] text-white font-semibold px-6 py-3.5 rounded-xl flex items-center justify-center gap-2.5 transition-all shadow-[0_4px_12px_rgba(0,96,114,0.15)] shrink-0 text-sm group"
            >
              <CalendarCheck className="w-4 h-4 transition-transform group-hover:scale-110" />
              Book a Consultation
            </Link>
          </div>
        </Reveal>
      </section>

      {/* Services grid */}
      <section className="bg-[#f8fafc] border-y border-[#e2edf0] py-24 sm:py-32 mt-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_0.7fr] gap-12 items-center mb-16">
            <Reveal>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-[0.28em] text-[#006072] font-semibold">OUR SERVICES</span>
                <span className="w-8 h-[1px] bg-[#006072]" />
              </div>
              <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 leading-[1.15] text-balance mt-3">
                Comprehensive Career Services <br className="hidden sm:inline" />
                <span className="text-[#006072]">Designed Around You.</span>
              </h2>
              <p className="mt-5 text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl">
                From career documents to strategy and professional visibility, our services are tailored to help you stand out, get noticed, and achieve your career goals.
              </p>
            </Reveal>
            <Reveal delay={120} className="w-full max-w-sm lg:max-w-none mx-auto">
              <div className="relative aspect-[4/3] overflow-hidden image-blend-left">
                <img 
                  src={deskSetupServices} 
                  alt="Professional Desk Setup" 
                  className="w-full h-full object-cover"
                />
              </div>
            </Reveal>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {HOME_SERVICES.map((s, i) => {
              const IconComponent = s.icon;
              return (
                <Reveal
                  key={s.num}
                  delay={i * 50}
                  className="flex flex-col rounded-2xl bg-white border border-[#e2edf0]/80 p-7 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.02)] transition-all duration-300 hover:shadow-[0_12px_40px_rgba(0,96,114,0.06)] hover:border-[#b2d5de] relative group"
                >
                  {/* Icon Container */}
                  <div className="w-12 h-12 rounded-full bg-[#e6f2f5] flex items-center justify-center mb-6">
                    <IconComponent className="text-[#006072] w-6 h-6" />
                  </div>

                  {/* Title */}
                  <h3 className="font-display font-bold text-slate-900 text-xl leading-tight mb-3">
                    {s.num}. {s.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-1">
                    {s.desc}
                  </p>

                  {/* Bullet points for Card 5 */}
                  {s.bullets && (
                    <ul className="mb-6 space-y-2 text-sm text-slate-700">
                      {s.bullets.map((bullet, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <span className="flex h-5 w-5 shrink-0 place-items-center justify-center rounded-full bg-[#e6f2f5] text-[#006072]">
                            <Check className="h-3.5 w-3.5 stroke-[3]" />
                          </span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Button */}
                  {s.isPrimary ? (
                    <Link
                      to={s.to as any}
                      hash={s.hash}
                      className="w-full bg-[#006072] hover:bg-[#004e5d] text-white font-semibold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_4px_12px_rgba(0,96,114,0.12)] text-sm group mt-auto"
                    >
                      <span>{s.btnText}</span>
                      <span className="transition-transform group-hover:translate-x-1">→</span>
                    </Link>
                  ) : (
                    <Link
                      to={s.to as any}
                      hash={s.hash}
                      className="w-full border border-[#006072]/30 text-[#006072] hover:bg-[#006072] hover:text-white font-semibold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 transition-all text-sm group mt-auto"
                    >
                      <span>{s.btnText}</span>
                      <span className="transition-transform group-hover:translate-x-1">→</span>
                    </Link>
                  )}
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Editorial split */}
      <section className="relative py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 grid gap-12 lg:grid-cols-2 items-center">
          <Reveal className="relative order-2 lg:order-1">
            <div className="relative aspect-[5/6] overflow-hidden rounded-3xl">
              <img src={workspace} alt="Career documents in progress" className="h-full w-full object-cover" loading="lazy" width={1600} height={1100} />
            </div>
            <div className="absolute -bottom-8 -right-4 sm:-right-8 max-w-xs rounded-2xl bg-navy text-ivory p-6 shadow-soft">
              <Quote className="h-5 w-5 text-gold" />
              <p className="mt-3 font-display italic text-lg leading-snug">"A document that finally sounded like me — only sharper."</p>
              <p className="mt-3 text-xs uppercase tracking-[0.22em] text-ivory/60">— Anya K., Director</p>
            </div>
          </Reveal>

          <Reveal delay={120} className="order-1 lg:order-2">
            <p className="text-xs uppercase tracking-[0.28em] text-gold">— Our approach</p>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-[3.5rem] mt-4 leading-[1.05] text-balance">
              A professionally written résumé is still one of the <em>most powerful tools</em> in your career.
            </h2>
            <p className="mt-6 text-foreground/70 text-lg leading-relaxed">
              We work directly with you — not through questionnaires. Through a personalized
              consultation, career assessment, and strategic resume development process, you
              receive an ATS-optimized résumé designed to attract recruiters, hiring managers,
              and executive decision-makers.
            </p>
            <ul className="mt-8 space-y-4">
              {[
                "Senior Resume Writers with industry-specific expertise",
                "ATS-optimized resumes that remain professional and modern",
                "Executive Resume Writing focused on positioning, impact, and results",
                "Confidential career support for professionals, leaders, and executives",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-navy-deep shrink-0" />
                  <span className="text-foreground/85">{t}</span>
                </li>
              ))}
            </ul>
            <Link to="/about" className="mt-10 inline-flex items-center gap-2 text-sm font-medium">
              <span className="gold-underline">Meet the studio</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative overflow-hidden border-t border-border py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.28em] text-gold">— Letters from clients</p>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl mt-4 leading-[1.05] text-balance max-w-3xl">
              Quiet wins. Loud careers.
            </h2>
          </Reveal>
        </div>

        {/* Marquee row */}
        <div className="relative mt-16 flex">
          <div className="flex w-max items-stretch gap-6 animate-marquee [animation-duration:64s]">
            {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
              <ReviewCard key={i} t={t} />
            ))}
          </div>

          {/* edge fades */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-background to-transparent" />
        </div>
      </section>

      {/* CTA banner */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 pb-24">
        <div className="relative overflow-hidden rounded-[2rem] bg-navy-deep text-ivory p-10 sm:p-16 grid gap-10 lg:grid-cols-[1.4fr_1fr] items-center">
          <div className="absolute inset-0 opacity-40">
            <img src={interview} alt="" className="h-full w-full object-cover object-right" loading="lazy" width={1600} height={900} />
            <div className="absolute inset-0 bg-gradient-to-r from-navy-deep via-navy-deep/85 to-navy-deep/10" />
          </div>
          <div className="relative">
            <p className="text-xs uppercase tracking-[0.28em] text-gold">— Ready when you are</p>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl mt-4 leading-[1.05] text-balance">
              The next move begins with a <em className="text-gold">conversation.</em>
            </h2>
            <p className="mt-5 max-w-lg text-ivory/75 text-lg">Tell us where you want to be in eighteen months. We'll show you the paper trail that gets you there.</p>
          </div>
          <div className="relative flex flex-col gap-3 lg:items-end">
            <Link to="/contact" className="inline-flex items-center justify-center rounded-full bg-gold text-navy-deep px-8 py-4 text-sm font-semibold hover:bg-gold-soft transition-colors">
              Book a free consultation
            </Link>
            <Link to="/services" className="text-sm text-ivory/80 hover:text-gold transition-colors">
              Or browse our services →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function ReviewCard({ t }: { t: (typeof TESTIMONIALS)[number] }) {
  return (
    <figure className="flex w-[300px] shrink-0 flex-col rounded-3xl border border-border bg-card p-8 sm:w-[380px]">
      <div className="flex items-center justify-between">
        <div className="flex gap-1 text-gold">
          {Array.from({ length: 5 }).map((_, k) => (
            <Star key={k} className="h-4 w-4 fill-current" />
          ))}
        </div>
        <span className="rounded-full bg-cream px-3 py-1 text-[0.7rem] font-medium uppercase tracking-[0.12em] text-foreground/70">
          {t.industry}
        </span>
      </div>
      <blockquote className="mt-6 flex-1 font-display italic text-xl leading-snug">"{t.quote}"</blockquote>
      <figcaption className="mt-8 flex items-center gap-3 border-t border-border pt-6">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-navy text-ivory font-display text-sm">
          {t.name.replace(/^Dr\.\s*/, "").split(" ").map((p) => p[0]).join("")}
        </span>
        <div>
          <p className="font-medium leading-tight">{t.name}</p>
          <p className="text-sm text-muted-foreground">{t.role}</p>
        </div>
      </figcaption>
    </figure>
  );
}
