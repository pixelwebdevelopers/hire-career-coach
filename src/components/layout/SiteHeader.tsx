import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import logo from "@/assets/hcc-logo.png";
import { PACKAGES, SERVICES } from "@/lib/content";
import {
  ArrowUpRight,
  ChevronDown,
  Menu,
  X,
  Home,
  Briefcase,
  Tag,
  Info,
  HelpCircle,
  Mail,
} from "lucide-react";

const NAV = [
  { to: "/", label: "Home", icon: Home },
  { to: "/services", label: "Services", icon: Briefcase },
  { to: "/pricing", label: "Pricing", icon: Tag },
  { to: "/success-stories", label: "Success Stories", icon: Info },
  { to: "/faq", label: "FAQ", icon: HelpCircle },
  { to: "/contact", label: "Contact", icon: Mail },
] as const;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 12);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  // Lock scroll + close on Escape while the mobile menu is open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      className={[
        "sticky top-0 z-50 transition-all duration-500",
        scrolled ? "bg-white border-b border-border/60 shadow-soft py-2" : "bg-transparent py-4",
      ].join(" ")}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
        <Link to="/" className="flex min-w-0 items-center gap-3 group">
          <img
            src={logo}
            alt="Hire Career Coach"
            className="h-14 sm:h-16 w-auto shrink-0 transition-transform duration-700 group-hover:scale-[1.03]"
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {NAV.map((n) =>
            n.to === "/services" ? (
              <div key={n.to} className="group/dd relative">
                <Link
                  to={n.to}
                  className="group relative inline-flex items-center gap-1 px-4 py-2 text-sm font-medium tracking-wide text-foreground/90 hover:text-foreground transition-colors"
                  activeProps={{ className: "text-foreground [&_.nav-bar]:scale-x-100" }}
                >
                  <span>{n.label}</span>
                  <ChevronDown className="h-3.5 w-3.5 transition-transform duration-300 group-hover/dd:rotate-180" />
                  <span className="nav-bar absolute left-4 right-7 -bottom-0.5 h-px origin-left scale-x-0 bg-gold transition-transform duration-500 group-hover:scale-x-100" />
                </Link>
                {/* Services dropdown */}
                <div className="invisible absolute left-0 top-full z-50 pt-3 opacity-0 transition-all duration-200 group-hover/dd:visible group-hover/dd:opacity-100">
                  <div className="w-[34rem] rounded-2xl border border-border bg-card p-3 shadow-soft">
                    <div className="grid grid-cols-2 gap-x-2 gap-y-1">
                      {SERVICES.map((s) => (
                        <Link
                          key={s.slug}
                          to="/services"
                          hash={s.slug}
                          className="flex items-center gap-2.5 rounded-xl px-4 py-2.5 text-xs font-semibold text-foreground/80 hover:bg-cream hover:text-foreground transition-colors"
                          activeProps={{ className: "bg-cream text-foreground" }}
                        >
                          <s.icon className="h-4 w-4 text-[#0a7a9b] shrink-0" />
                          <span>{s.title}</span>
                        </Link>
                      ))}
                    </div>
                    <div className="my-2 h-px bg-border" />
                    <Link
                      to="/services"
                      className="flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold text-gold hover:bg-cream transition-colors"
                    >
                      All services <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={n.to}
                to={n.to}
                className="group relative px-4 py-2 text-sm font-medium tracking-wide text-foreground/90 hover:text-foreground transition-colors"
                activeProps={{ className: "text-foreground [&_.nav-bar]:scale-x-100" }}
                activeOptions={{ exact: n.to === "/" }}
              >
                <span>{n.label}</span>
                <span className="nav-bar absolute left-4 right-4 -bottom-0.5 h-px origin-left scale-x-0 bg-gold transition-transform duration-500 group-hover:scale-x-100" />
              </Link>
            ),
          )}
          <Link
            to="/contact"
            className="ml-4 inline-flex items-center gap-2 rounded-full bg-navy text-ivory px-5 py-2.5 text-sm font-medium tracking-wide hover:bg-navy-deep transition-colors"
          >
            Book Consultation
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
          </Link>
        </nav>

        <button
          aria-label="Menu"
          onClick={() => setOpen((o) => !o)}
          className="lg:hidden inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card/60 backdrop-blur"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* ===== Premium mobile menu ===== */}
      {open && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          {/* backdrop */}
          <button
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-navy-deep/40 backdrop-blur-sm animate-in fade-in duration-300"
          />

          {/* panel */}
          <div className="absolute inset-y-0 left-0 w-full sm:max-w-md flex flex-col bg-gradient-to-b from-white via-[#dceef3] to-[#bde0ea] shadow-2xl animate-in slide-in-from-left duration-400">
            {/* Top Bar */}
            <div className="flex items-center justify-between px-6 py-4 bg-transparent border-b border-border/40">
              <img src={logo} alt="Hire Career Coach" className="h-12 w-auto" />
              <button
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/80 bg-white text-navy-deep hover:bg-cream transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* List Content */}
            <div className="flex-1 overflow-y-auto bg-transparent">
              <div className="divide-y divide-border/60">
                {NAV.map((n) => {
                  if (n.to === "/services") {
                    return (
                      <div key={n.to} className="flex flex-col">
                        <button
                          onClick={() => setServicesOpen(!servicesOpen)}
                          className="flex items-center justify-between w-full px-6 py-4 text-sm font-semibold text-foreground/90 hover:bg-cream/40 transition-colors border-b border-border/40"
                        >
                          <div className="flex items-center gap-4">
                            <n.icon className="h-5 w-5 text-foreground/60 shrink-0" />
                            <span>{n.label}</span>
                          </div>
                          <ChevronDown
                            className={[
                              "h-4 w-4 text-foreground/60 transition-transform duration-300",
                              servicesOpen ? "rotate-180" : "",
                            ].join(" ")}
                          />
                        </button>

                        {/* Collapsible services list */}
                        <div
                          className={[
                            "transition-all duration-300 overflow-hidden",
                            servicesOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0",
                          ].join(" ")}
                        >
                          <div className="bg-slate-50/50 py-1 pl-4 divide-y divide-border/40">
                            {SERVICES.map((s) => (
                              <Link
                                key={s.slug}
                                to="/services"
                                hash={s.slug}
                                onClick={() => setOpen(false)}
                                className="flex items-center gap-3 px-6 py-3.5 text-xs font-bold text-foreground/80 hover:text-[#0a7a9b] transition-colors"
                              >
                                <s.icon className="h-4 w-4 text-[#0a7a9b] shrink-0" />
                                <span>{s.title}</span>
                              </Link>
                            ))}
                            <Link
                              to="/services"
                              onClick={() => setOpen(false)}
                              className="flex items-center gap-2 px-6 py-3 text-xs font-extrabold text-gold hover:text-gold/80 transition-colors"
                            >
                              <span>All Services</span>
                              <ArrowUpRight className="h-3.5 w-3.5" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={n.to}
                      to={n.to}
                      onClick={() => setOpen(false)}
                      activeOptions={{ exact: n.to === "/" }}
                      activeProps={{ className: "bg-cream/50 !text-[#0a7a9b]" }}
                      className="flex items-center gap-4 px-6 py-4 text-sm font-semibold text-foreground/90 transition-colors hover:bg-cream/40"
                    >
                      <n.icon className="h-5 w-5 text-foreground/60 shrink-0" />
                      <span>{n.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Bottom CTA Block */}
            <div className="px-6 py-5 bg-transparent border-t border-border/80">
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="group relative flex items-center justify-center gap-3 overflow-hidden rounded-full bg-navy px-6 py-3.5 text-sm font-semibold tracking-wide text-ivory shadow-md transition-transform duration-300 hover:scale-[1.01]"
              >
                <span className="absolute inset-0 bg-gradient-gold opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <span className="relative">Book a Consultation</span>
                <ArrowUpRight className="relative h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
