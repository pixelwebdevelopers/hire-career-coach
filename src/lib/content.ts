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
      { name: "Basic", price: 120, features: ["ATS-Optimized Resume", "Tailored Cover Letter", "2 Revisions"] },
      { name: "Advanced", price: 180, features: ["ATS-Optimized Resume", "Tailored Cover Letter", "LinkedIn Profile Optimization", "3 Revisions"] },
      {
        name: "Professional",
        price: 230,
        highlight: true,
        features: [
          "ATS-Optimized Resume",
          "Tailored Cover Letter",
          "LinkedIn Profile Optimization",
          "Professional LinkedIn Banner Design",
          "Interview Thank You Letter",
          "LinkedIn Networking Templates",
          "Strategic Job Search & Networking Guidance",
          "4 Revisions",
          "30 Days Email Support",
        ],
      },
    ],
    addOns: [
      { name: "Resume Only", price: 90 },
      { name: "Cover Letter Only", price: 50 },
      { name: "LinkedIn Optimization", price: 100 },
      { name: "Technical Portfolio Optimization", price: 200 },
      { name: "Professional Portfolio Website", price: 350 },
    ],
  },
  {
    id: "mid",
    level: "Mid-Career",
    blurb: "Specialists and managers (4–10 years) ready to move up, switch lanes, or sharpen positioning.",
    tiers: [
      { name: "Basic", price: 160, features: ["ATS-Optimized Resume", "Tailored Cover Letter", "2 Revisions"] },
      { name: "Advanced", price: 220, features: ["ATS-Optimized Resume", "Tailored Cover Letter", "LinkedIn Profile Optimization", "3 Revisions"] },
      {
        name: "Professional",
        price: 280,
        highlight: true,
        features: [
          "ATS-Optimized Resume",
          "Tailored Cover Letter",
          "LinkedIn Profile Optimization",
          "Professional LinkedIn Banner Design",
          "Interview Thank You Letter",
          "LinkedIn Networking Templates",
          "Strategic Job Search & Networking Guidance",
          "4 Revisions",
          "30 Days Email Support",
        ],
      },
    ],
    addOns: [
      { name: "Resume Only", price: 120 },
      { name: "Cover Letter Only", price: 70 },
      { name: "LinkedIn Optimization", price: 110 },
      { name: "Technical Portfolio Optimization", price: 250 },
      { name: "Professional Portfolio Website", price: 400 },
    ],
  },
  {
    id: "senior",
    level: "Senior Management / Director",
    blurb: "Senior leaders preparing for director, VP and head-of roles in competitive markets.",
    tiers: [
      { name: "Basic", price: 180, features: ["ATS-Optimized Resume", "Tailored Cover Letter", "2 Revisions"] },
      { name: "Advanced", price: 250, features: ["ATS-Optimized Resume", "Tailored Cover Letter", "LinkedIn Profile Optimization", "3 Revisions"] },
      {
        name: "Professional",
        price: 300,
        highlight: true,
        features: [
          "ATS-Optimized Resume",
          "Tailored Cover Letter",
          "LinkedIn Profile Optimization",
          "Professional LinkedIn Banner Design",
          "Interview Thank You Letter",
          "LinkedIn Networking Templates",
          "Strategic Job Search & Networking Guidance",
          "4 Revisions",
          "30 Days Email Support",
        ],
      },
    ],
    addOns: [
      { name: "Resume Only", price: 150 },
      { name: "Cover Letter Only", price: 80 },
      { name: "LinkedIn Optimization", price: 150 },
      { name: "Technical Portfolio Optimization", price: 250 },
      { name: "Professional Portfolio Website", price: 500 },
    ],
  },
  {
    id: "exec",
    level: "Executive (VP / C-Level)",
    blurb: "Confidential search support, board bios and executive narratives for VPs, C-suites and founders.",
    tiers: [
      { name: "Basic", price: 250, features: ["ATS-Optimized Executive Resume", "Executive Cover Letter", "2 Revisions"] },
      { name: "Advanced", price: 325, features: ["ATS-Optimized Executive Resume", "Executive Cover Letter", "LinkedIn Profile Optimization", "3 Revisions"] },
      {
        name: "Professional",
        price: 495,
        highlight: true,
        features: [
          "ATS-Optimized Executive Resume",
          "Executive Cover Letter",
          "LinkedIn Profile Optimization",
          "Professional LinkedIn Banner Design",
          "Executive Thank You Letter",
          "LinkedIn Networking Templates",
          "Strategic Job Search & Networking Guidance",
          "4 Revisions",
          "30 Days Email Support",
        ],
      },
    ],
    addOns: [
      { name: "Resume Only", price: 200 },
      { name: "Cover Letter Only", price: 100 },
      { name: "LinkedIn Optimization", price: 170 },
      { name: "Technical Portfolio Optimization", price: 350 },
      { name: "Professional Portfolio Website", price: 600 },
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
    title: "Cover Letter Crafting",
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
    title: "Job Hunt Strategy",
    desc: "Job search strategy and career planning support to help you target the right roles, connect with recruiters, and secure interviews.",
    icon: Target,
    headline: "Strategic job search coaching for faster career success",
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
    slug: "career-guidance",
    title: "Career Guidance",
    desc: "Career guidance for professionals seeking career growth, industry transitions, leadership opportunities, or a clear career direction.",
    icon: Compass,
    headline: "Professional career guidance for growth and direction",
    intro: [
      "Whether you're starting your career, changing industries, pursuing leadership or seeking advancement, our career guidance provides clarity and actionable direction.",
      "We help you identify strengths, evaluate opportunities, set goals and make informed decisions aligned with your long-term aspirations.",
    ],
    features: [
      "Explore new career opportunities",
      "Transition into new industries",
      "Define career goals",
      "Improve professional confidence",
      "Build long-term career plans",
    ],
    why: {
      title: "Clarity, confidence, direction",
      body: "Gain a clear view of your next move and the confidence to make it — guided by someone who has hired in your field.",
    },
  },
  {
    slug: "career-development",
    title: "Career Development Coaching",
    desc: "Career coaching programs focused on professional development, leadership skills, personal branding, and long-term career success.",
    icon: TrendingUp,
    headline: "Career coaching designed for long-term professional success",
    intro: [
      "Professional success requires continuous development, strategic planning and effective leadership. Our coaching programs help you improve performance, strengthen leadership and accelerate growth.",
      "Each program is built around the role you want next — not just the one you have today.",
    ],
    features: [
      "Leadership development",
      "Career advancement strategies",
      "Workplace performance improvement",
      "Professional growth planning",
      "Executive coaching support",
    ],
    why: {
      title: "Invest in your future",
      body: "Coaching designed for lasting success — so your next move compounds into the one after it.",
    },
  },
  {
    slug: "personal-branding",
    title: "Personal Branding",
    desc: "Personal branding services that position you as a top candidate through strategic messaging, LinkedIn optimization, and career storytelling.",
    icon: Award,
    headline: "Personal branding that positions you as an industry leader",
    intro: [
      "Your personal brand influences how recruiters, employers, clients and professional networks perceive you. We help you establish credibility, communicate value and differentiate yourself in competitive markets.",
      "We create consistent messaging across resumes, LinkedIn profiles, professional bios and personal branding materials.",
    ],
    features: [
      "Increased professional visibility",
      "Enhanced credibility",
      "Stronger networking opportunities",
      "Better career opportunities",
      "Clear professional identity",
    ],
    why: {
      title: "Build a powerful brand",
      body: "A clear, consistent personal brand opens doors to new opportunities and makes the right people remember you.",
    },
  },
  {
    slug: "linkedin-ghostwriting",
    title: "LinkedIn Ghostwriting & Thought Leadership",
    desc: "Professional ghostwriting services for LinkedIn content, thought leadership articles, personal branding, executive communication, and content marketing that enhances professional visibility and authority.",
    icon: Feather,
    headline: "LinkedIn ghostwriting for personal branding and authority building",
    intro: [
      "Consistent content creation is one of the most effective ways to grow your reputation and establish industry authority. We help executives, entrepreneurs, consultants and professionals build visibility through high-quality thought leadership content.",
      "We create engaging posts, articles, professional insights and authority-building content that enhances your personal brand and attracts opportunities.",
    ],
    features: [
      "LinkedIn content strategy",
      "Thought leadership articles",
      "Personal branding content",
      "Executive communication writing",
      "Professional storytelling",
      "Audience engagement content",
    ],
    why: {
      title: "Why thought leadership matters",
      body: "Professionals who consistently share valuable insights attract recruiters, clients, partnerships, speaking opportunities and career growth.",
    },
  },
];
