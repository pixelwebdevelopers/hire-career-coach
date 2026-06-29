import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Reveal } from "@/components/Reveal";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  FileText,
  Mail,
  Linkedin,
  Users,
  Target,
  Crown,
  Briefcase,
  GraduationCap,
  Calendar,
  LockKeyhole,
  Award,
  ShieldCheck,
  Clock,
  Headset,
  Sparkles,
  Zap,
  HelpCircle,
  FileCheck2,
  PhoneCall,
} from "lucide-react";

export const Route = createFileRoute("/pricing/$id")({
  loader: ({ params }) => {
    const validIds = ["early", "mid", "senior", "exec"];
    if (!validIds.includes(params.id)) {
      throw notFound();
    }
    return { id: params.id };
  },
  head: ({ params }) => {
    const titles: Record<string, string> = {
      early: "Early Career Packages — Hire Career Coach",
      mid: "Mid-Career Packages — Hire Career Coach",
      senior: "Senior-Level Packages — Hire Career Coach",
      exec: "Executive Packages — Hire Career Coach",
    };
    return {
      meta: [
        { title: titles[params.id] || "Packages — Hire Career Coach" },
        {
          name: "description",
          content: "Select your professional resume package or individual services.",
        },
      ],
    };
  },
  component: PackageSelectionPage,
});

// Full data matching screenshots 100% same
const LEVEL_DATA: Record<
  string,
  {
    levelName: string;
    stage: string;
    desc: string;
    rushPrice: number;
    badgeText: string;
    packages: {
      name: string;
      category: string;
      icon: React.ComponentType<{ className?: string }>;
      price: number;
      popular?: boolean;
      features: string[];
    }[];
    individualServices: {
      id: string;
      title: string;
      desc: string;
      price: number;
      icon: React.ComponentType<{ className?: string }>;
    }[];
  }
> = {
  early: {
    levelName: "Early Career",
    stage: "0 - 3 Years of Experience",
    desc: "Choose the package that best fits your needs and kickstart your career with professionally crafted documents and expert guidance.",
    rushPrice: 30,
    badgeText: "All packages include ATS optimization and professional formatting.",
    packages: [
      {
        name: "Resume Writing",
        category: "ESSENTIAL PACKAGE",
        icon: FileText,
        price: 120,
        features: [
          "ATS-Optimized Resume",
          "Keyword Optimization",
          "Achievement-Focused Content",
          "Professional Formatting",
          "2 Rounds of Revisions",
          "5 Business Day Turnaround",
        ],
      },
      {
        name: "Resume + Cover Letter",
        category: "PROFESSIONAL PACKAGE",
        icon: Mail,
        price: 170,
        features: [
          "ATS-Optimized Resume",
          "Custom Cover Letter",
          "Keyword & Skills Optimization",
          "Professional Formatting",
          "2 Rounds of Revisions",
          "5 Business Day Turnaround",
        ],
      },
      {
        name: "Resume + Cover Letter + LinkedIn Optimization",
        category: "CAREER LAUNCH PACKAGE",
        icon: Linkedin,
        price: 250,
        popular: true,
        features: [
          "ATS-Optimized Resume",
          "Custom Cover Letter",
          "LinkedIn Profile Optimization",
          "Keyword & Skills Optimization",
          "Professional Formatting",
          "2 Rounds of Revisions",
          "5 Business Day Turnaround",
        ],
      },
      {
        name: "Resume + Cover Letter + Career Profile Enhancement",
        category: "CAREER BOOST PACKAGE",
        icon: Users,
        price: 230,
        features: [
          "ATS-Optimized Resume",
          "Custom Cover Letter",
          "Career Profile Enhancement (Headshot + Banner)",
          "Professional Formatting",
          "2 Rounds of Revisions",
          "5 Business Day Turnaround",
        ],
      },
      {
        name: "Resume + Career Strategy Session",
        category: "CAREER CLARITY PACKAGE",
        icon: Target,
        price: 270,
        features: [
          "ATS-Optimized Resume",
          "1-on-1 Career Strategy Session (60 Minutes)",
          "Personalized Career Roadmap",
          "Action Plan & Next Steps",
          "2 Rounds of Revisions",
          "5 Business Day Turnaround",
        ],
      },
    ],
    individualServices: [
      {
        id: "resume",
        title: "Resume Writing",
        desc: "Professionally written, ATS-optimized resume.",
        price: 120,
        icon: FileText,
      },
      {
        id: "audit",
        title: "Resume Review & ATS Audit",
        desc: "Detailed review with actionable recommendations.",
        price: 40,
        icon: FileCheck2,
      },
      {
        id: "cover_letter",
        title: "Cover Letter Writing",
        desc: "Personalized cover letter tailored to your goals.",
        price: 70,
        icon: Mail,
      },
      {
        id: "linkedin",
        title: "LinkedIn Optimization",
        desc: "Optimize your profile to attract recruiters.",
        price: 110,
        icon: Linkedin,
      },
      {
        id: "enhancement",
        title: "Career Profile Enhancement",
        desc: "Professional headshot + banner design.",
        price: 60,
        icon: Users,
      },
      {
        id: "interview",
        title: "Interview Preparation",
        desc: "Mock interview + feedback + strategies.",
        price: 95,
        icon: Headset,
      },
      {
        id: "strategy",
        title: "Career Strategy Session",
        desc: "1-on-1 session to plan your next career move.",
        price: 150,
        icon: Target,
      },
      {
        id: "website",
        title: "Professional Portfolio Website",
        desc: "Custom portfolio to showcase your work.",
        price: 400,
        icon: Briefcase,
      },
    ],
  },
  mid: {
    levelName: "Mid-Career",
    stage: "4 - 9 Years of Experience",
    desc: "Take the next step in your career with strategic documents and expert support designed for experienced professionals.",
    rushPrice: 50,
    badgeText: "All packages include ATS optimization and professional formatting.",
    packages: [
      {
        name: "Resume Writing",
        category: "PROFESSIONAL PACKAGE",
        icon: FileText,
        price: 150,
        features: [
          "ATS-Optimized Resume",
          "Keyword Optimization",
          "Achievement-Focused Content",
          "Professional Formatting",
          "2 Rounds of Revisions",
          "5 Business Day Turnaround",
        ],
      },
      {
        name: "Resume + Cover Letter",
        category: "CAREER ADVANCEMENT PACKAGE",
        icon: Mail,
        price: 200,
        features: [
          "ATS-Optimized Resume",
          "Custom Cover Letter",
          "Keyword & Skills Optimization",
          "Professional Formatting",
          "2 Rounds of Revisions",
          "5 Business Day Turnaround",
        ],
      },
      {
        name: "Resume + Cover Letter + LinkedIn Optimization",
        category: "CAREER GROWTH PACKAGE",
        icon: Linkedin,
        price: 270,
        popular: true,
        features: [
          "ATS-Optimized Resume",
          "Custom Cover Letter",
          "LinkedIn Profile Optimization",
          "Keyword & Skills Optimization",
          "Professional Formatting",
          "2 Rounds of Revisions",
          "5 Business Day Turnaround",
        ],
      },
      {
        name: "Resume + Cover Letter + Career Profile Enhancement",
        category: "LEADERSHIP PACKAGE",
        icon: Users,
        price: 290,
        features: [
          "ATS-Optimized Resume",
          "Custom Cover Letter",
          "Career Profile Enhancement (Headshot + Banner)",
          "Professional Formatting",
          "2 Rounds of Revisions",
          "5 Business Day Turnaround",
        ],
      },
      {
        name: "Resume + Career Strategy Session",
        category: "CAREER STRATEGY PACKAGE",
        icon: Target,
        price: 300,
        features: [
          "ATS-Optimized Resume",
          "1-on-1 Career Strategy Session (60 Minutes)",
          "Personalized Career Roadmap",
          "Action Plan & Next Steps",
          "2 Rounds of Revisions",
          "5 Business Day Turnaround",
        ],
      },
    ],
    individualServices: [
      {
        id: "resume",
        title: "Resume Writing",
        desc: "Professionally written, ATS-optimized resume.",
        price: 150,
        icon: FileText,
      },
      {
        id: "audit",
        title: "Resume Review & ATS Audit",
        desc: "Detailed review with actionable recommendations.",
        price: 60,
        icon: FileCheck2,
      },
      {
        id: "cover_letter",
        title: "Cover Letter Writing",
        desc: "Personalized cover letter tailored to your goals.",
        price: 80,
        icon: Mail,
      },
      {
        id: "linkedin",
        title: "LinkedIn Optimization",
        desc: "Optimize your profile to attract recruiters.",
        price: 130,
        icon: Linkedin,
      },
      {
        id: "enhancement",
        title: "Career Profile Enhancement",
        desc: "Professional headshot + banner design.",
        price: 60,
        icon: Users,
      },
      {
        id: "interview",
        title: "Interview Preparation",
        desc: "Mock interview + feedback + strategies.",
        price: 95,
        icon: Headset,
      },
      {
        id: "strategy",
        title: "Career Strategy Session",
        desc: "1-on-1 session to plan your next career move.",
        price: 150,
        icon: Target,
      },
      {
        id: "website",
        title: "Professional Portfolio Website",
        desc: "Custom portfolio to showcase your work.",
        price: 400,
        icon: Briefcase,
      },
    ],
  },
  senior: {
    levelName: "Senior-Level",
    stage: "10+ Years of Experience",
    desc: "Advance your career to the next level with executive-caliber documents and strategic guidance that position you as a leader.",
    rushPrice: 70,
    badgeText: "All packages include ATS optimization and professional formatting.",
    packages: [
      {
        name: "Resume Writing",
        category: "LEADERSHIP ESSENTIALS",
        icon: FileText,
        price: 170,
        features: [
          "ATS-Optimized Resume",
          "Achievement-Focused Content",
          "Leadership & Impact Highlights",
          "Professional Formatting",
          "2 Rounds of Revisions",
          "5 Business Day Turnaround",
        ],
      },
      {
        name: "Resume + Cover Letter",
        category: "DIRECTOR PACKAGE",
        icon: Mail,
        price: 220,
        features: [
          "ATS-Optimized Resume",
          "Custom Cover Letter",
          "Achievement-Focused Content",
          "Professional Formatting",
          "2 Rounds of Revisions",
          "5 Business Day Turnaround",
        ],
      },
      {
        name: "Resume + Cover Letter + LinkedIn Optimization",
        category: "EXECUTIVE ADVANCEMENT PACKAGE",
        icon: Linkedin,
        price: 300,
        popular: true,
        features: [
          "ATS-Optimized Resume",
          "Custom Cover Letter",
          "LinkedIn Profile Optimization",
          "Keyword & Skills Optimization",
          "Professional Formatting",
          "2 Rounds of Revisions",
          "5 Business Day Turnaround",
        ],
      },
      {
        name: "Resume + Cover Letter + Career Profile Enhancement",
        category: "LEADERSHIP IMPACT PACKAGE",
        icon: Users,
        price: 330,
        features: [
          "ATS-Optimized Resume",
          "Custom Cover Letter",
          "Career Profile Enhancement (Headshot + Banner)",
          "Professional Formatting",
          "2 Rounds of Revisions",
          "5 Business Day Turnaround",
        ],
      },
      {
        name: "Resume + Career Strategy Session",
        category: "EXECUTIVE STRATEGY PACKAGE",
        icon: Target,
        price: 375,
        features: [
          "ATS-Optimized Resume",
          "1-on-1 Career Strategy Session (60 Minutes)",
          "Personalized Career Roadmap",
          "Action Plan & Next Steps",
          "2 Rounds of Revisions",
          "5 Business Day Turnaround",
        ],
      },
    ],
    individualServices: [
      {
        id: "resume",
        title: "Resume Writing",
        desc: "Professionally written, ATS-optimized resume.",
        price: 170,
        icon: FileText,
      },
      {
        id: "audit",
        title: "Resume Review & ATS Audit",
        desc: "Detailed review with actionable recommendations.",
        price: 80,
        icon: FileCheck2,
      },
      {
        id: "cover_letter",
        title: "Cover Letter Writing",
        desc: "Personalized cover letter tailored to your goals.",
        price: 90,
        icon: Mail,
      },
      {
        id: "linkedin",
        title: "LinkedIn Optimization",
        desc: "Optimize your profile to attract opportunities.",
        price: 150,
        icon: Linkedin,
      },
      {
        id: "enhancement",
        title: "Career Profile Enhancement",
        desc: "Professional headshot + banner revamp.",
        price: 80,
        icon: Users,
      },
      {
        id: "interview",
        title: "Interview Preparation",
        desc: "Mock interview + feedback + strategies.",
        price: 150,
        icon: Headset,
      },
      {
        id: "strategy",
        title: "Career Strategy Session",
        desc: "1-on-1 session to plan your next career move.",
        price: 225,
        icon: Target,
      },
      {
        id: "website",
        title: "Professional Portfolio Website",
        desc: "Custom portfolio to showcase your work.",
        price: 400,
        icon: Briefcase,
      },
    ],
  },
  exec: {
    levelName: "Executive",
    stage: "VPs, Directors, C-Suite & Founders",
    desc: "Premium, executive-level documents and strategy designed to position you as a leader and open doors to high-impact opportunities.",
    rushPrice: 90,
    badgeText: "All packages include ATS optimization and executive-level formatting.",
    packages: [
      {
        name: "Executive Resume Writing",
        category: "EXECUTIVE ESSENTIALS",
        icon: FileText,
        price: 350,
        features: [
          "Executive Resume Writing",
          "Leadership & Impact Highlights",
          "ATS & Recruiter Optimized",
          "2 Rounds of Revisions",
          "5 Business Day Turnaround",
        ],
      },
      {
        name: "Resume + Cover Letter",
        category: "EXECUTIVE PROFESSIONAL",
        icon: Mail,
        price: 450,
        features: [
          "Executive Resume Writing",
          "Custom Executive Cover Letter",
          "Leadership Branding",
          "2 Rounds of Revisions",
          "5 Business Day Turnaround",
        ],
      },
      {
        name: "Resume + Cover Letter + LinkedIn Profile",
        category: "EXECUTIVE LEADERSHIP PACKAGE",
        icon: Linkedin,
        price: 600,
        popular: true,
        features: [
          "Executive Resume Writing",
          "Custom Executive Cover Letter",
          "LinkedIn Profile Optimization",
          "Leadership Branding",
          "2 Rounds of Revisions",
          "5 Business Day Turnaround",
        ],
      },
      {
        name: "Resume + Cover Letter + Career Profile Enhancement",
        category: "EXECUTIVE CAREER TRANSFORMATION",
        icon: Users,
        price: 750,
        features: [
          "Executive Resume Writing",
          "Custom Executive Cover Letter",
          "LinkedIn Profile Optimization",
          "Career Strategy Session (60 Min)",
          "Personalized Career Roadmap",
          "2 Rounds of Revisions",
          "5 Business Day Turnaround",
        ],
      },
      {
        name: "Resume + Career Strategy Session",
        category: "EXECUTIVE VIP PACKAGE",
        icon: Crown,
        price: 950,
        features: [
          "Executive Resume Writing",
          "Custom Executive Cover Letter",
          "LinkedIn Profile Optimization",
          "Career Strategy Session (90 Min)",
          "Personal Brand Strategy",
          "Personalized Career Roadmap",
          "Priority Concierge Support",
          "2 Rounds of Revisions",
          "3 Business Day Turnaround",
        ],
      },
    ],
    individualServices: [
      {
        id: "resume",
        title: "Executive Resume Writing",
        desc: "Strategically written to showcase leadership and impact.",
        price: 350,
        icon: FileText,
      },
      {
        id: "audit",
        title: "Resume Review & ATS Audit",
        desc: "In-depth review with actionable recommendations.",
        price: 100,
        icon: FileCheck2,
      },
      {
        id: "cover_letter",
        title: "Executive Cover Letter Writing",
        desc: "Custom letter that strengthens your executive brand.",
        price: 150,
        icon: Mail,
      },
      {
        id: "linkedin",
        title: "LinkedIn Profile Optimization",
        desc: "Elevate your LinkedIn profile to attract opportunities.",
        price: 200,
        icon: Linkedin,
      },
      {
        id: "enhancement",
        title: "Career Profile Enhancement",
        desc: "Executive bio, value proposition, and branding.",
        price: 120,
        icon: Users,
      },
      {
        id: "strategy_60",
        title: "Career Strategy Session (60 Min)",
        desc: "1-on-1 session to clarify goals and create strategy.",
        price: 225,
        icon: Target,
      },
      {
        id: "strategy_90",
        title: "Career Strategy Session (90 Min)",
        desc: "Deep-dive session with action plan and next steps.",
        price: 325,
        icon: Crown,
      },
      {
        id: "branding",
        title: "Personal Brand Strategy",
        desc: "Position yourself as a thought leader in your industry.",
        price: 350,
        icon: Award,
      },
      {
        id: "website",
        title: "Professional Portfolio Website",
        desc: "Custom portfolio to showcase your leadership.",
        price: 600,
        icon: Briefcase,
      },
    ],
  },
};

const TRUST_FACTORS = [
  { title: "ATS Optimized", desc: "Pass Applicant Tracking Systems.", icon: FileCheck2 },
  { title: "Expert Writers", desc: "Professionals specialized in your field.", icon: Award },
  { title: "Personalized Service", desc: "Tailored strategies for your goals.", icon: ShieldCheck },
  { title: "Timely Delivery", desc: "On-time delivery you can count on.", icon: Clock },
  { title: "Unlimited Revisions", desc: "We work until you're satisfied.", icon: HelpCircle },
];

function PackageSelectionPage() {
  const { id } = Route.useLoaderData();
  const data = LEVEL_DATA[id];

  if (!data) {
    throw notFound();
  }

  // Cart Selection states
  const [selectedType, setSelectedType] = useState<"package" | "individual" | null>(null);
  const [selectedPackageIdx, setSelectedPackageIdx] = useState<number | null>(null);
  const [packageRush, setPackageRush] = useState(false);
  const [selectedServices, setSelectedServices] = useState<Record<string, boolean>>({});
  const [servicesRush, setServicesRush] = useState<Record<string, boolean>>({});

  // Reset helper when changing types
  const handleSelectPackage = (idx: number) => {
    setSelectedType("package");
    setSelectedPackageIdx(idx);
    setSelectedServices({});
    setServicesRush({});
  };

  const handleToggleService = (srvId: string) => {
    setSelectedType("individual");
    setSelectedPackageIdx(null);
    setPackageRush(false);
    setSelectedServices((prev) => ({
      ...prev,
      [srvId]: !prev[srvId],
    }));
  };

  const handleToggleServiceRush = (srvId: string) => {
    setServicesRush((prev) => ({
      ...prev,
      [srvId]: !prev[srvId],
    }));
  };

  // Price calculations
  let basePrice = 0;
  let rushTotal = 0;

  if (selectedType === "package" && selectedPackageIdx !== null) {
    basePrice = data.packages[selectedPackageIdx].price;
    rushTotal = packageRush ? data.rushPrice : 0;
  } else if (selectedType === "individual") {
    Object.keys(selectedServices).forEach((key) => {
      if (selectedServices[key]) {
        const srv = data.individualServices.find((s) => s.id === key);
        if (srv) {
          basePrice += srv.price;
          if (servicesRush[key]) {
            rushTotal += data.rushPrice;
          }
        }
      }
    });
  }

  const totalPrice = basePrice + rushTotal;

  // Sync to localStorage for upcoming checkout steps
  useEffect(() => {
    if (!selectedType) return;
    const cart = {
      levelId: id,
      selectedType,
      selectedPackage: selectedPackageIdx !== null ? data.packages[selectedPackageIdx] : null,
      packageRush,
      selectedServices: Object.keys(selectedServices)
        .filter((k) => selectedServices[k])
        .map((k) => {
          const srv = data.individualServices.find((s) => s.id === k);
          return {
            ...srv,
            rush: !!servicesRush[k],
          };
        }),
      totalPrice,
    };
    localStorage.setItem("hcc_cart", JSON.stringify(cart));
  }, [
    id,
    selectedType,
    selectedPackageIdx,
    packageRush,
    selectedServices,
    servicesRush,
    totalPrice,
    data,
  ]);

  return (
    <div className="bg-[#f8f9fa] min-h-screen pb-32">
      {/* 1. Breadcrumb Stepper */}
      <nav className="border-b border-border/60 bg-white py-4 shadow-sm">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 flex items-center justify-center gap-2 sm:gap-6 text-xs sm:text-sm font-semibold text-foreground/80">
          <div className="flex items-center gap-1.5 text-[#0a7a9b]">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#0a7a9b] text-white text-[10px]">
              ✓
            </span>
            <span className="hidden sm:inline">1. Career Level</span>
            <span className="sm:hidden">1. Level</span>
          </div>
          <span className="text-muted-foreground/50">/</span>
          <div className="flex items-center gap-1.5 text-navy-deep font-bold">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#0a7a9b] text-white text-[10px]">
              2
            </span>
            <span className="hidden sm:inline">2. Package</span>
            <span className="sm:hidden">2. Pkg</span>
          </div>
          <span className="text-muted-foreground/50">/</span>
          <div className="flex items-center gap-1.5 text-muted-foreground/50">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-border text-muted-foreground/60 text-[10px]">
              3
            </span>
            <span className="hidden sm:inline">3. Intake Form</span>
            <span className="sm:hidden">3. Intake</span>
          </div>
          <span className="text-muted-foreground/50">/</span>
          <div className="flex items-center gap-1.5 text-muted-foreground/50">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-border text-muted-foreground/60 text-[10px]">
              4
            </span>
            <span>4. Checkout</span>
          </div>
        </div>
      </nav>

      {/* 2. Top Header & Guarantee Card */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 pt-10 pb-6">
        <div className="flex items-start gap-4 mb-4">
          <Link
            to="/pricing"
            className="inline-flex items-center gap-2 text-xs font-semibold text-foreground/60 hover:text-[#0a7a9b] transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Career Levels
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-8">
          {/* Main Title text */}
          <div className="text-center lg:text-left max-w-2xl">
            <h1 className="font-display text-4xl font-extrabold text-navy-deep leading-tight">
              {data.levelName} Packages
            </h1>
            <p className="mt-2 text-sm font-bold text-[#0a7a9b] tracking-wider uppercase">
              {data.stage}
            </p>
            <p className="mt-4 text-base text-foreground/75 leading-relaxed">{data.desc}</p>
            <div className="mt-6 flex items-center justify-center lg:justify-start gap-2 text-xs font-bold text-[#0a7a9b]">
              <ShieldCheck className="h-4.5 w-4.5" />
              <span>{data.badgeText}</span>
            </div>
          </div>

          {/* Guarantee Badge Card */}
          <div className="flex items-start gap-4 rounded-2xl border border-border/80 bg-white p-5 shadow-sm max-w-sm shrink-0">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#0a7a9b]/10 text-[#0a7a9b]">
              <Award className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-display text-sm font-bold text-navy-deep">
                100% Satisfaction Guarantee
              </h4>
              <p className="mt-1 text-xs text-foreground/60 leading-relaxed">
                We're not happy unless you are. We work with you until you are fully satisfied.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. 5-Package Tiers Horizontal Slider/Scroll */}
      <section className="mx-auto max-w-[85rem] xl:max-w-[92rem] px-5 sm:px-8 py-8">
        <div className="flex lg:grid lg:grid-cols-5 overflow-x-auto lg:overflow-x-visible gap-6 lg:gap-3 xl:gap-5 pb-6 lg:pb-0 pt-2 snap-x max-w-full">
          {data.packages.map((pkg, idx) => {
            const isSelected = selectedType === "package" && selectedPackageIdx === idx;
            return (
              <div
                key={idx}
                className={[
                  "relative flex flex-col w-[17.5rem] lg:w-auto shrink-0 lg:shrink snap-center rounded-3xl border bg-white p-6 lg:p-4 xl:p-6 shadow-sm transition-all duration-300",
                  isSelected
                    ? "border-[#0a7a9b] ring-1 ring-[#0a7a9b]/35 shadow-md shadow-[#0a7a9b]/5"
                    : "border-border/80 hover:border-[#0a7a9b]/60",
                ].join(" ")}
              >
                {/* Popular Badge */}
                {pkg.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#0a7a9b] text-white text-[9px] font-bold uppercase tracking-wider px-3.5 py-1 z-10 shadow-sm">
                    Most Popular
                  </span>
                )}

                {/* Header categories */}
                <span className="text-[10px] font-bold uppercase tracking-wider text-foreground/40 text-center block mt-2">
                  {pkg.category}
                </span>

                {/* Circular Outline Icon */}
                <div className="mx-auto mt-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#0a7a9b]/10 text-[#0a7a9b]">
                  <pkg.icon className="h-6 w-6" />
                </div>

                {/* Name & price */}
                <h3 className="mt-4 text-center font-display text-base font-bold text-navy-deep min-h-[2.5rem] flex items-center justify-center">
                  {pkg.name}
                </h3>
                <div className="mt-3 text-center">
                  <span className="font-display text-3xl font-extrabold text-navy-deep">
                    ${pkg.price}
                  </span>
                </div>

                <div className="my-4 h-px w-full bg-border/60" />

                {/* Feature checklist */}
                <ul className="flex-1 space-y-3 text-xs text-foreground/75 font-semibold mb-6">
                  {pkg.features.map((f, fidx) => (
                    <li key={fidx} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#0a7a9b] stroke-[2.5]" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                {/* Add Rush Service checkbox */}
                <div className="rounded-2xl bg-cream/50 border border-border/40 p-3 mb-4 text-center">
                  <label className="flex items-center justify-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={isSelected && packageRush}
                      disabled={!isSelected}
                      onChange={(e) => setPackageRush(e.target.checked)}
                      className="rounded border-border/80 text-[#0a7a9b] focus:ring-[#0a7a9b] h-3.5 w-3.5"
                    />
                    <span className="text-xs font-bold text-navy-deep">Add Rush Service</span>
                    <span className="text-xs font-bold text-[#0a7a9b]">+${data.rushPrice}</span>
                  </label>
                  <p className="mt-1 text-[10px] text-foreground/50">Delivery in 2 Business Days</p>
                </div>

                {/* Action button */}
                <button
                  onClick={() => handleSelectPackage(idx)}
                  className={[
                    "w-full py-3 rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-center gap-1.5 shadow-sm",
                    isSelected
                      ? "bg-[#0a7a9b] hover:bg-[#08627c] text-white"
                      : "bg-navy hover:bg-navy-deep text-white",
                  ].join(" ")}
                >
                  {isSelected ? (
                    <>
                      <span>Selected</span>
                      <Check className="h-3.5 w-3.5 stroke-[3]" />
                    </>
                  ) : (
                    <>
                      <span>Select Package</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Credit Info Banner & Service Rush Box */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-4">
        <div className="grid gap-6 md:grid-cols-2 max-w-5xl mx-auto">
          {/* Audit Credit banner */}
          <div className="flex items-start gap-4 rounded-2xl border border-border/80 bg-white p-5 shadow-sm">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#0a7a9b]/10 text-[#0a7a9b]">
              <Sparkles className="h-5.5 w-5.5" />
            </div>
            <div>
              <h4 className="font-display text-sm font-bold text-navy-deep">
                Resume Review & ATS Audit Credit
              </h4>
              <p className="mt-1.5 text-xs text-foreground/75 leading-relaxed">
                If you purchase a Resume Writing package within 30 days of your audit, 100% of your
                audit fee will be credited toward your Resume Writing service.
              </p>
            </div>
          </div>

          {/* Rush Banner */}
          <div className="flex items-start gap-4 rounded-2xl border border-border/80 bg-white p-5 shadow-sm">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#0a7a9b]/10 text-[#0a7a9b]">
              <Clock className="h-5.5 w-5.5" />
            </div>
            <div>
              <h4 className="font-display text-sm font-bold text-navy-deep">
                {data.levelName} Rush Add-On
              </h4>
              <p className="mt-1.5 text-xs text-foreground/75 leading-relaxed">
                +${data.rushPrice} per package or service for expedited delivery. Get your completed
                documents back in 2 Business Days.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Individual Services à la carte grid */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-10">
        <div className="max-w-5xl mx-auto border-t border-border/80 pt-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h2 className="font-display text-xl sm:text-2xl font-extrabold text-navy-deep">
                Or Choose Individual Services
              </h2>
              <p className="text-xs text-foreground/60">Pick and choose the services you need.</p>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-[#0a7a9b]/10 px-4 py-2 text-[#0a7a9b] text-xs font-bold border border-[#0a7a9b]/25">
              <Zap className="h-4 w-4 shrink-0" />
              <span>Add Rush Service to any service for just +${data.rushPrice}</span>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {data.individualServices.map((srv) => {
              const isChecked = !!selectedServices[srv.id];
              const isRush = !!servicesRush[srv.id];
              const srvIcon = srv.icon;
              return (
                <div
                  key={srv.id}
                  onClick={() => handleToggleService(srv.id)}
                  className={[
                    "flex items-start gap-4 rounded-2xl border p-4 transition-all duration-300 cursor-pointer select-none bg-white",
                    isChecked
                      ? "border-[#0a7a9b] bg-[#0a7a9b]/5 shadow-sm shadow-[#0a7a9b]/5"
                      : "border-border/80 hover:border-[#0a7a9b]/40",
                  ].join(" ")}
                >
                  {/* Select Checkbox */}
                  <div className="mt-1 flex items-center justify-center shrink-0">
                    <div
                      className={[
                        "h-5 w-5 rounded border flex items-center justify-center transition-colors",
                        isChecked
                          ? "bg-[#0a7a9b] border-[#0a7a9b] text-white"
                          : "border-border/80 text-transparent bg-white",
                      ].join(" ")}
                    >
                      <Check className="h-3.5 w-3.5 stroke-[3]" />
                    </div>
                  </div>

                  {/* Icon */}
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cream/80 text-foreground/80">
                    <srv.icon className="h-5 w-5" />
                  </div>

                  {/* Body & rush logic */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-sm font-bold text-navy-deep leading-snug">{srv.title}</h4>
                      <span className="text-sm font-extrabold text-navy-deep whitespace-nowrap">
                        ${srv.price}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-foreground/60 leading-relaxed">{srv.desc}</p>

                    {/* Rush Toggle Box */}
                    {isChecked && (
                      <div
                        onClick={(e) => {
                          e.stopPropagation(); // prevent row click triggers
                          handleToggleServiceRush(srv.id);
                        }}
                        className="mt-3 inline-flex items-center gap-2 rounded-full border border-border bg-white px-3 py-1 text-[10px] font-bold text-navy-deep hover:bg-cream/40 transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={isRush}
                          readOnly
                          className="rounded border-border/80 text-[#0a7a9b] focus:ring-[#0a7a9b] h-3 w-3"
                        />
                        <span>Add Rush Delivery (+${data.rushPrice})</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. Consultation banner at the bottom */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-6">
        <Reveal>
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 rounded-3xl border border-border/80 bg-white p-6 sm:p-8 max-w-5xl mx-auto shadow-sm">
            <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#0a7a9b]/10 text-[#0a7a9b]">
                <HelpCircle className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-display text-lg font-extrabold text-navy-deep">
                  Not sure which package is right for you?
                </h4>
                <p className="mt-1 text-sm text-foreground/75 leading-relaxed">
                  Book a free consultation and we'll guide you to the best solution.
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

      {/* 7. Footer features row */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 pt-10 pb-6">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5 max-w-5xl mx-auto border-t border-border/80 pt-10">
          {TRUST_FACTORS.map((feat, index) => (
            <Reveal
              key={index}
              delay={index * 50}
              className="flex flex-col items-center text-center"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0a7a9b]/10 text-[#0a7a9b]">
                <feat.icon className="h-5 w-5" />
              </div>
              <h5 className="mt-3.5 font-display text-xs font-bold text-navy-deep uppercase tracking-wider">
                {feat.title}
              </h5>
              <p className="mt-1 text-[11px] text-foreground/60 leading-relaxed max-w-[160px]">
                {feat.desc}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Sticky Bottom Cart Summary Bar */}
      {selectedType && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-border/80 shadow-2xl py-4 animate-in slide-in-from-bottom duration-300">
          <div className="mx-auto max-w-5xl px-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-[#0a7a9b] uppercase tracking-wider">
                Your Selection
              </span>
              <span className="text-sm font-bold text-navy-deep leading-tight truncate max-w-md">
                {selectedType === "package" && selectedPackageIdx !== null ? (
                  <>
                    {data.packages[selectedPackageIdx].name}{" "}
                    {packageRush && " (With Rush Delivery)"}
                  </>
                ) : (
                  <>
                    Custom Package (
                    {Object.keys(selectedServices).filter((k) => selectedServices[k]).length}{" "}
                    Services)
                  </>
                )}
              </span>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-6">
              <div className="flex flex-col text-right">
                <span className="text-[10px] font-bold text-foreground/40 uppercase tracking-wider">
                  Total Price
                </span>
                <span className="text-xl font-extrabold text-navy-deep">${totalPrice}</span>
              </div>

              <Link
                to="/intake"
                className="inline-flex items-center gap-2 rounded-full bg-[#0a7a9b] hover:bg-[#08627c] text-white py-3.5 px-7 font-bold text-sm shadow-md transition-all duration-200"
              >
                <span>Proceed to Step 3</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
