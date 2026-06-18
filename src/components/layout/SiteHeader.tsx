import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import logo from "@/assets/hcc-logo.png";
import { PACKAGES } from "@/lib/content";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/pricing", label: "Pricing" },
  { to: "/about", label: "About" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

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
        scrolled
          ? "bg-white border-b border-border/60 shadow-soft py-2"
          : "bg-transparent py-4",
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
            n.to === "/pricing" ? (
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
                {/* Packages dropdown */}
                <div className="invisible absolute left-0 top-full z-50 pt-3 opacity-0 transition-all duration-200 group-hover/dd:visible group-hover/dd:opacity-100">
                  <div className="w-72 rounded-2xl border border-border bg-card p-2 shadow-soft">
                    {PACKAGES.map((p) => (
                      <Link
                        key={p.id}
                        to="/pricing/$id"
                        params={{ id: p.id }}
                        className="block rounded-xl px-4 py-2.5 text-sm font-medium text-foreground/90 hover:bg-cream hover:text-foreground transition-colors"
                        activeProps={{ className: "bg-cream text-foreground" }}
                      >
                        {p.level}
                      </Link>
                    ))}
                    <div className="my-1 h-px bg-border" />
                    <Link
                      to="/pricing"
                      className="flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-medium text-gold hover:bg-cream transition-colors"
                    >
                      All packages <ArrowUpRight className="h-3.5 w-3.5" />
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
          <div className="absolute inset-0 flex flex-col overflow-hidden bg-cream animate-in fade-in slide-in-from-top-2 duration-500 ease-out">
            {/* soft brand wash */}
            <div className="pointer-events-none absolute -top-24 right-0 h-[28rem] w-[28rem] rounded-full bg-gold/15 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-32 -left-24 h-[26rem] w-[26rem] rounded-full bg-navy/10 blur-3xl" />

            {/* top bar */}
            <div className="relative flex items-center justify-between px-5 sm:px-8 py-4">
              <img src={logo} alt="Hire Career Coach" className="h-14 w-auto" />
              <button
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card/70 text-navy-deep backdrop-blur transition-transform duration-300 hover:rotate-90"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* links */}
            <nav className="relative flex-1 overflow-y-auto px-7 py-4 sm:px-10">
              <ul className="flex flex-col">
                {NAV.map((n, i) => (
                  <li
                    key={n.to}
                    className="animate-in fade-in slide-in-from-bottom-2 fill-mode-both"
                    style={{ animationDelay: `${80 + i * 50}ms`, animationDuration: "450ms" }}
                  >
                    <Link
                      to={n.to}
                      onClick={() => setOpen(false)}
                      activeOptions={{ exact: n.to === "/" }}
                      activeProps={{ className: "[&_.mi-label]:text-gold" }}
                      className="group flex items-center justify-between border-b border-border/60 py-3.5"
                    >
                      <span className="mi-label font-display text-2xl leading-none text-navy-deep transition-colors group-hover:text-gold">
                        {n.label}
                      </span>
                      <ArrowUpRight className="h-4 w-4 text-foreground/25 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-gold" />
                    </Link>

                    {n.to === "/pricing" && (
                      <ul className="ml-1 flex flex-col border-l border-border pl-5">
                        {PACKAGES.map((p) => (
                          <li key={p.id} className="border-b border-border/70 last:border-b-0">
                            <Link
                              to="/pricing/$id"
                              params={{ id: p.id }}
                              onClick={() => setOpen(false)}
                              activeProps={{ className: "!text-gold" }}
                              className="block py-3 text-base font-medium text-navy-deep/85 transition-colors hover:text-gold"
                            >
                              {p.level}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            {/* footer CTA */}
            <div className="relative px-7 sm:px-10 pb-10 pt-4 animate-in fade-in fill-mode-both" style={{ animationDelay: "560ms", animationDuration: "600ms" }}>
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="group relative flex items-center justify-center gap-3 overflow-hidden rounded-full bg-navy px-7 py-4 text-sm font-medium tracking-wide text-ivory"
              >
                <span className="absolute inset-0 bg-gradient-gold opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <span className="relative">Book a Consultation</span>
                <ArrowUpRight className="relative h-4 w-4" />
              </Link>
              <p className="mt-6 text-center text-[0.7rem] uppercase tracking-[0.32em] text-muted-foreground">
                Guide · Grow · Succeed
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
