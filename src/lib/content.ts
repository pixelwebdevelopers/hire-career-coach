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
      { name: "GitHub Profile Optimization", price: 200 },
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
      { name: "GitHub Profile Optimization", price: 250 },
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
      { name: "GitHub Profile Optimization", price: 250 },
      { name: "Professional Portfolio Website", price: 500 },
    ],
  },
  {
    id: "exec",
    level: "Executive (VP / C-Level)",
    blurb: "Confidential search support, board bios and executive narratives for VPs, C-suites and founders.",
    tiers: [
      { name: "Basic", price: 200, features: ["ATS-Optimized Executive Resume", "Executive Cover Letter", "2 Revisions"] },
      { name: "Advanced", price: 280, features: ["ATS-Optimized Executive Resume", "Executive Cover Letter", "LinkedIn Profile Optimization", "3 Revisions"] },
      {
        name: "Professional",
        price: 350,
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
      { name: "Resume Only", price: 170 },
      { name: "Cover Letter Only", price: 90 },
      { name: "LinkedIn Optimization", price: 170 },
      { name: "GitHub Profile Optimization", price: 300 },
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
  type LucideIcon,
} from "lucide-react";

export type Service = { title: string; desc: string; icon: LucideIcon };

export const SERVICES: Service[] = [
  { title: "Resume Writing", desc: "ATS-optimized resumes engineered around your goals, voice and target role.", icon: FileText },
  { title: "Resume Review & Audit", desc: "An honest, line-by-line critique with a prioritized action plan.", icon: FileSearch },
  { title: "Cover Letter Crafting", desc: "Tailored letters that lead with story, end with intent and never feel templated.", icon: PenLine },
  { title: "LinkedIn Optimization", desc: "Headline, About, experience and visuals tuned for recruiter search and warm intros.", icon: Linkedin },
  { title: "Interview Preparation", desc: "Mock interviews, STAR coaching and tailored Q&A for the company you're chasing.", icon: MessagesSquare },
  { title: "Job Hunt Strategy", desc: "A weekly cadence, target list and outreach scripts so the search compounds.", icon: Target },
  { title: "Career Guidance", desc: "Direction when the next move isn't obvious — pivots, returns, leadership leaps.", icon: Compass },
  { title: "Career Development Coaching", desc: "Six- to twelve-week programs designed around the role you want in 18 months.", icon: TrendingUp },
  { title: "Executive Ghostwriting", desc: "Thought leadership, newsletters and bios written in your voice, ready to publish.", icon: Feather },
];
