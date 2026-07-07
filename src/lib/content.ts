export type Tier = {
  name: string;
  price: number;
  features: string[];
  highlight?: boolean;
};

export type AddOn = { name: string; price: number };

export type PackageGroup = {
  id: string;
  level: string;
  blurb: string;
  tiers: Tier[];
  addOns: AddOn[];
};

export const PACKAGES: PackageGroup[] = [
  {
    id: "early",
    level: "Early Career",
    blurb: "Graduates and professionals with 0–3 years of experience preparing for the job market.",
    tiers: [
      {
        name: "Basic",
        price: 120,
        features: ["Executive **Resume**", "Executive **Cover Letter**", "2 **Revisions**"],
      },
      {
        name: "Advanced",
        price: 180,
        features: [
          "Executive **Resume**",
          "Executive **Cover Letter**",
          "**LinkedIn** Optimization",
          "2 **Revisions**",
        ],
      },
      {
        name: "Professional",
        price: 230,
        highlight: true,
        features: [
          "Executive **Resume**",
          "Executive **Cover Letter**",
          "**LinkedIn** Optimization",
          "**Career Profile** Enhancement",
          "**Indeed** Optimization",
          "30-Day Email Support",
          "2 **Revisions**",
        ],
      },
      {
        name: "Career Strategy + Resume",
        price: 250,
        features: [
          "90-Minute One-on-One **Career Strategy** Session",
          "Executive **Resume** Writing",
          "**Indeed** Optimization",
          "Networking Templates",
          "Personalized Career Roadmap",
          "Job Search & Positioning Strategy",
          "30-Day Email Support",
          "2 **Revisions**",
        ],
      },
    ],
    addOns: [
      { name: "Resume Only", price: 90 },
      { name: "Cover Letter Only", price: 60 },
      { name: "LinkedIn Optimization", price: 100 },
      { name: "Resume Review & Audit", price: 40 },
    ],
  },
  {
    id: "mid",
    level: "Mid Career",
    blurb:
      "Specialists and managers (4–10 years) ready to move up, switch lanes, or sharpen positioning.",
    tiers: [
      {
        name: "Basic",
        price: 160,
        features: ["Executive **Resume**", "Executive **Cover Letter**", "2 **Revisions**"],
      },
      {
        name: "Advanced",
        price: 220,
        features: [
          "Executive **Resume**",
          "Executive **Cover Letter**",
          "**LinkedIn** Optimization",
          "2 **Revisions**",
        ],
      },
      {
        name: "Professional",
        price: 280,
        highlight: true,
        features: [
          "Executive **Resume**",
          "Executive **Cover Letter**",
          "**LinkedIn** Optimization",
          "**Career Profile** Enhancement",
          "**Indeed** Optimization",
          "30-Day Email Support",
          "2 **Revisions**",
        ],
      },
      {
        name: "Career Strategy + Resume",
        price: 300,
        features: [
          "90-Minute One-on-One **Career Strategy** Session",
          "Executive **Resume** Writing",
          "**Indeed** Optimization",
          "Networking Templates",
          "Personalized Career Roadmap",
          "Job Search & Positioning Strategy",
          "30-Day Email Support",
          "2 **Revisions**",
        ],
      },
    ],
    addOns: [
      { name: "Resume Only", price: 120 },
      { name: "Cover Letter Only", price: 70 },
      { name: "LinkedIn Optimization", price: 130 },
      { name: "Resume Review & Audit", price: 50 },
    ],
  },
  {
    id: "senior",
    level: "Senior Management",
    blurb: "Senior leaders preparing for director, VP and head-of roles in competitive markets.",
    tiers: [
      {
        name: "Basic",
        price: 180,
        features: ["Executive **Resume**", "Executive **Cover Letter**", "2 **Revisions**"],
      },
      {
        name: "Advanced",
        price: 250,
        features: [
          "Executive **Resume**",
          "Executive **Cover Letter**",
          "**LinkedIn** Optimization",
          "2 **Revisions**",
        ],
      },
      {
        name: "Professional",
        price: 300,
        highlight: true,
        features: [
          "Executive **Resume**",
          "Executive **Cover Letter**",
          "**LinkedIn** Optimization",
          "**Career Profile** Enhancement",
          "**Indeed** Optimization",
          "30-Day Email Support",
          "2 **Revisions**",
        ],
      },
      {
        name: "Career Strategy + Resume",
        price: 350,
        features: [
          "90-Minute One-on-One **Career Strategy** Session",
          "Executive **Resume** Writing",
          "**Indeed** Optimization",
          "Networking Templates",
          "Personalized Career Roadmap",
          "Job Search & Positioning Strategy",
          "30-Day Email Support",
          "2 **Revisions**",
        ],
      },
    ],
    addOns: [
      { name: "Resume Only", price: 150 },
      { name: "Cover Letter Only", price: 90 },
      { name: "LinkedIn Optimization", price: 150 },
      { name: "Resume Review & Audit", price: 70 },
    ],
  },
  {
    id: "exec",
    level: "Executive (VP / C-Level)",
    blurb:
      "Confidential search support, board bios and executive narratives for VPs, C-suites and founders.",
    tiers: [
      {
        name: "Basic",
        price: 250,
        features: ["Executive **Resume**", "Executive **Cover Letter**", "2 **Revisions**"],
      },
      {
        name: "Advanced",
        price: 300,
        features: [
          "Executive **Resume**",
          "Executive **Cover Letter**",
          "**LinkedIn** Optimization",
          "2 **Revisions**",
        ],
      },
      {
        name: "Professional",
        price: 350,
        highlight: true,
        features: [
          "Executive **Resume**",
          "Executive **Cover Letter**",
          "**LinkedIn** Optimization",
          "**Career Profile** Enhancement",
          "Networking Templates",
          "30-Minute **Career Strategy** Consultation",
          "30-Day Email Support",
          "2 **Revisions**",
        ],
      },
      {
        name: "Resume + Career Strategy",
        price: 450,
        features: [
          "90-Minute One-on-One **Career Strategy** Session",
          "Executive **Resume** Writing",
          "Networking Templates",
          "**Indeed** Optimization",
          "Personalized Career Roadmap",
          "30-Day Email Support",
          "2 **Revisions**",
        ],
      },
    ],
    addOns: [
      { name: "Resume Only", price: 200 },
      { name: "Cover Letter Only", price: 100 },
      { name: "LinkedIn Optimization", price: 170 },
      { name: "Resume Review & Audit", price: 100 },
    ],
  },
];

import {
  FileText,
  FileSearch,
  PenLine,
  Linkedin,
  MessagesSquare,
  Target,
  Compass,
  TrendingUp,
  Feather,
  Award,
  Camera,
  Laptop,
  Zap,
  type LucideIcon,
} from "lucide-react";

export type Service = {
  slug: string;
  title: string;
  /** Short one-liner used on the home + services card grid. */
  desc: string;
  icon: LucideIcon;
  /** Long-form detail used on the Services page sections. */
  headline: string;
  intro: string[];
  /** "What you will get" list. */
  features: string[];
  /** Closing rationale paragraph. */
  why: { title: string; body: string };
};

export const SERVICES: Service[] = [
  {
    slug: "resume-writing",
    title: "Resume Writing",
    desc: "Professional resume writing services with ATS optimization, industry-specific keywords, and recruiter-focused formatting to increase interview opportunities.",
    icon: FileText,
    headline: "ATS-optimized resume writing that helps you get more interviews",
    intro: [
      "Your resume is often the first impression you make on recruiters and hiring managers. In today's competitive job market, a professionally written resume is more than a document — it is a strategic marketing tool designed to showcase your expertise, accomplishments and career value.",
      "As experienced resume writers, we create customized resumes tailored to your target industry, career level and professional goals. Every resume is strategically written using industry-specific keywords, achievement-focused content and recruiter-approved formatting to maximize visibility and results.",
    ],
    features: [
      "ATS-optimized resume writing",
      "Industry-specific keywords",
      "Executive and professional formatting",
      "Achievement-based content writing",
      "Keyword optimization for recruiter searches",
      "Customized to your career goals",
    ],
    why: {
      title: "Why choose our resume writing",
      body: "Whether you're entry-level, mid-career, a manager, executive, healthcare professional, engineer or business leader, we position you as a top candidate and help you stand out from the competition.",
    },
  },
  {
    slug: "resume-review",
    title: "Resume Review & ATS Audit",
    desc: "Expert resume review and ATS audit to identify weaknesses, improve keyword relevance, and strengthen your job search results.",
    icon: FileSearch,
    headline: "A professional resume audit designed to improve your results",
    intro: [
      "Many qualified professionals struggle to get interviews because their resumes fail ATS screening or lack the keywords recruiters are searching for. Our resume review and ATS audit identifies the weaknesses that may be holding your resume back.",
      "We conduct a comprehensive analysis focused on ATS compatibility, keyword relevance, formatting, content effectiveness, personal branding and recruiter appeal — then hand you actionable recommendations and a clear roadmap for improvement.",
    ],
    features: [
      "ATS compatibility check",
      "Resume structure and formatting review",
      "Keyword optimization",
      "Achievement positioning",
      "Professional branding review",
      "Recruiter visibility analysis",
    ],
    why: {
      title: "Benefits of a resume audit",
      body: "A professional audit helps you understand exactly why your resume may not be generating results — and gives you a prioritized plan to start increasing interview opportunities.",
    },
  },
  {
    slug: "cover-letter",
    title: "Cover Letter Writing",
    desc: "Custom cover letter writing that aligns with your resume, showcases achievements, and supports successful job applications.",
    icon: PenLine,
    headline: "Professional cover letters that complement your resume",
    intro: [
      "A strong cover letter helps employers understand your story, qualifications and interest in a role beyond what's listed on your resume. We craft compelling, customized letters that support your application and strengthen your candidacy.",
      "Every letter highlights your achievements, aligns with employer expectations and demonstrates why you are the ideal candidate for the role.",
    ],
    features: [
      "Tailored to specific roles",
      "Professionally written and customized",
      "Achievement-focused messaging",
      "Strong employer engagement",
      "ATS-friendly content",
    ],
    why: {
      title: "Why cover letters matter",
      body: "Employers often use cover letters to evaluate communication skills, motivation and cultural fit. A professionally written letter can significantly improve your application success rate.",
    },
  },
  {
    slug: "linkedin-optimization",
    title: "LinkedIn Optimization",
    desc: "LinkedIn profile optimization designed to improve recruiter visibility, keyword rankings, personal branding, and networking opportunities.",
    icon: Linkedin,
    headline: "LinkedIn optimization for recruiter visibility and personal branding",
    intro: [
      "LinkedIn has become one of the most powerful platforms for career growth, networking and job opportunities. We help professionals improve visibility, attract recruiters and strengthen their personal brand.",
      "We optimize every section of your profile — headline, About, work experience, skills, keywords and overall branding strategy.",
    ],
    features: [
      "Keyword-rich LinkedIn headline",
      "Professional About section",
      "Experience optimization",
      "LinkedIn SEO enhancement",
      "Personal branding strategy",
      "Recruiter search optimization",
    ],
    why: {
      title: "Why optimize your LinkedIn",
      body: "An optimized profile can significantly increase profile views, recruiter outreach, networking opportunities and job offers.",
    },
  },
  {
    slug: "personal-branding",
    title: "Career Profile Enhancement",
    desc: "Enhance your professional image with high-quality headshots and custom LinkedIn banners that create a polished, credible presence and help you stand out to recruiters and employers.",
    icon: Camera,
    headline: "Career profile enhancement that positions you as an industry leader",
    intro: [
      "Your professional image and branding influence how recruiters, employers, and clients perceive you. We help you establish credibility, communicate value, and differentiate yourself in competitive markets.",
      "We build a consistent visual and written brand, including custom banner designs and professional asset alignment to ensure a cohesive presence.",
    ],
    features: [
      "Increased professional visibility",
      "Enhanced credibility",
      "Stronger networking opportunities",
      "Better career opportunities",
      "Clear professional identity",
      "Custom banner design",
    ],
    why: {
      title: "Build a powerful brand",
      body: "A clear, consistent personal brand and enhanced career profile open doors to new opportunities and make the right people remember you.",
    },
  },
  {
    slug: "interview-prep",
    title: "Interview Preparation",
    desc: "Interview coaching with mock interviews, STAR method training, and personalized feedback to improve confidence and performance.",
    icon: MessagesSquare,
    headline: "Interview coaching that builds confidence and improves performance",
    intro: [
      "Landing an interview is only the beginning — success depends on your ability to communicate your value effectively. We help you prepare with personalized coaching, mock interviews and proven strategies.",
      "The best candidates are not always the most qualified; they're often the ones who communicate their value most clearly.",
    ],
    features: [
      "STAR interview method",
      "Behavioral interview techniques",
      "Executive interview preparation",
      "Salary negotiation strategies",
      "Confidence-building techniques",
      "Industry-specific interview coaching",
    ],
    why: {
      title: "Why interview coaching matters",
      body: "Prepare smarter and increase your chances of receiving job offers with coaching tailored to the company you're chasing.",
    },
  },
  {
    slug: "job-hunt-strategy",
    title: "Career Strategy Session",
    desc: "Job search strategy and career planning support to help you target the right roles, connect with recruiters, and secure interviews.",
    icon: Target,
    headline: "Strategic career coaching for faster success",
    intro: [
      "Applying to hundreds of jobs without a strategy wastes time and leads to frustration. Our job hunt strategy provides a structured approach to help you target the right opportunities and improve your results.",
      "We help you develop a personalized search plan, networking strategy, recruiter engagement approach and application tracking system.",
    ],
    features: [
      "Targeted job search planning",
      "Networking guidance",
      "Recruiter outreach strategies",
      "LinkedIn job search optimization",
      "Career positioning techniques",
      "Application management support",
    ],
    why: {
      title: "Take control of your search",
      body: "Stop spraying applications into the void. A proven strategy helps you target the right roles and secure more interviews.",
    },
  },
  {
    slug: "portfolio-website",
    title: "Professional Portfolio Website",
    desc: "Custom portfolio websites that showcase your skills, experience, and achievements to help you stand out in a competitive job market.",
    icon: Laptop,
    headline: "Custom portfolio websites that showcase your professional brand",
    intro: [
      "In today's digital-first job market, a resume is only one piece of the puzzle. A professional portfolio website serves as your 24/7 digital lobby, allowing recruiters, hiring managers, and clients to explore your work, leadership, and accomplishments.",
      "We build sleek, modern, mobile-friendly portfolio websites tailored to your unique career brand and story.",
    ],
    features: [
      "Custom portfolio website design",
      "Mobile-friendly responsive layout",
      "Sleek personal bio & storytelling",
      "Work highlights & case studies",
      "Contact form & social integrations",
    ],
    why: {
      title: "Why a portfolio website matters",
      body: "A dedicated website establishes immediate credibility, sets you apart from candidates sending simple PDF resumes, and gives you total control over your digital footprint.",
    },
  },
  {
    slug: "rush-service",
    title: "Priority Rush Service",
    desc: "Expedited turnaround for urgent career needs without compromising on quality. Ideal for tight deadlines and time-sensitive opportunities.",
    icon: Zap,
    headline: "Expedited turnaround for urgent, time-sensitive career needs",
    intro: [
      "When a dream opportunity arises or a tight deadline is looming, you don't have weeks to wait. Our Priority Rush Service puts your project at the top of our queue to deliver executive-caliber documents in record time.",
      "We guarantee the same rigorous quality, professional optimization, and strategic alignment under tight timelines.",
    ],
    features: [
      "Expedited queue priority",
      "Delivery in 2 Business Days",
      "Same high quality and ATS optimization",
      "Fast feedback loops and revisions",
    ],
    why: {
      title: "Fast turnaround, zero compromises",
      body: "Never miss a deadline. Get your polished, recruiter-ready documents when opportunities arise unexpectedly.",
    },
  },
];
