import { Link } from "@tanstack/react-router";
import logo from "@/assets/hcc-logo.png";
import { PACKAGES } from "@/lib/content";
import { Mail, MapPin, Phone, Linkedin, Instagram, Clock, CalendarCheck } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="relative mt-24 bg-gradient-navy text-ivory overflow-hidden">
      <div className="absolute inset-0 grain pointer-events-none" />
      <div className="absolute -top-px left-0 right-0 hairline" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 pt-20 pb-10">
        <div className="grid gap-14 lg:grid-cols-[1.2fr_1fr_1fr_1fr]">
          <div>
            <img
              src={logo}
              alt="Hire Career Coach"
              className="h-14 w-auto bg-ivory/95 rounded-md p-2"
            />
            <p className="mt-6 max-w-sm text-ivory/70 leading-relaxed">
              A boutique career studio crafting resumes, LinkedIn profiles and interview strategy
              for ambitious professionals — from first job to C-suite.
            </p>
            <div className="mt-6 flex gap-3">
              <a
                aria-label="LinkedIn"
                className="grid h-10 w-10 place-items-center rounded-full border border-ivory/20 hover:border-gold hover:text-gold transition-colors"
                href="#"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                aria-label="Instagram"
                className="grid h-10 w-10 place-items-center rounded-full border border-ivory/20 hover:border-gold hover:text-gold transition-colors"
                href="#"
              >
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-gold/90">Explore</h4>
            <ul className="mt-5 space-y-3 text-ivory/80">
              <li>
                <Link to="/services" className="hover:text-gold transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="hover:text-gold transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-gold transition-colors">
                  Success Stories
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-gold transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-gold transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-gold/90">Packages</h4>
            <ul className="mt-5 space-y-3 text-ivory/80">
              {PACKAGES.map((p) => (
                <li key={p.id}>
                  <Link
                    to="/pricing/$id"
                    params={{ id: p.id }}
                    className="hover:text-gold transition-colors"
                  >
                    {p.level}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-gold/90">Reach Us</h4>
            <ul className="mt-5 space-y-4 text-ivory/80">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-1 text-gold shrink-0" />
                <span>
                  1944 Midland Road
                  <br />
                  Dundalk, MD 21222
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-gold shrink-0" />
                <a href="tel:+16678561221" className="hover:text-gold">
                  +1 (667) 856-1221
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-gold shrink-0" />
                <a href="mailto:contact@hirecareercoach.com" className="hover:text-gold">
                  contact@hirecareercoach.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="h-4 w-4 mt-1 text-gold shrink-0" />
                <span>Mon — Fri · 9am to 6pm ET</span>
              </li>
              <li className="flex items-center gap-3">
                <CalendarCheck className="h-4 w-4 text-gold shrink-0" />
                <a
                  href="https://calendly.com/hirecareercoach/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold"
                >
                  Book a call on Calendly
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="hairline mt-16" />
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ivory/60">
          <p>© {new Date().getFullYear()} Hire Career Coach. Crafted with care.</p>

          <span className="text-ivory/60 font-medium">Developed by Hire Career Coach</span>

          <p className="font-display italic text-gold/80 text-sm">Guide · Grow · Succeed</p>
        </div>
      </div>
    </footer>
  );
}
