import { useState, useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { Phone, MessageSquare, CalendarRange, MessageCircle, X } from "lucide-react";

export function FloatingContactButton() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-3.5 print:hidden"
    >
      {/* Expanded Buttons */}
      <div
        className={`flex flex-col items-end gap-3.5 transition-all duration-300 origin-bottom ${
          isOpen
            ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
            : "opacity-0 translate-y-4 scale-75 pointer-events-none"
        }`}
      >
        {/* Book Consultation */}
        <div className="flex items-center gap-3 group">
          <span className="bg-navy text-ivory text-[11px] font-bold tracking-wide uppercase px-2.5 py-1.5 rounded-lg shadow-soft border border-border/10 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
            Book Call
          </span>
          <Link
            to="/contact"
            onClick={() => setIsOpen(false)}
            aria-label="Book a Consultation"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-navy text-gold shadow-soft hover:scale-110 active:scale-95 transition-all duration-300 border border-gold/20 hover:border-gold hover:text-gold hover:shadow-glow"
          >
            <CalendarRange className="h-5 w-5" />
          </Link>
        </div>

        {/* Text / SMS */}
        <div className="flex items-center gap-3 group">
          <span className="bg-navy text-ivory text-[11px] font-bold tracking-wide uppercase px-2.5 py-1.5 rounded-lg shadow-soft border border-border/10 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
            Text Us
          </span>
          <a
            href="sms:+14433230211"
            onClick={() => setIsOpen(false)}
            aria-label="Text us"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-navy text-gold shadow-soft hover:scale-110 active:scale-95 transition-all duration-300 border border-gold/20 hover:border-gold hover:text-gold hover:shadow-glow"
          >
            <MessageSquare className="h-5 w-5" />
          </a>
        </div>

        {/* Phone Call */}
        <div className="flex items-center gap-3 group">
          <span className="bg-navy text-ivory text-[11px] font-bold tracking-wide uppercase px-2.5 py-1.5 rounded-lg shadow-soft border border-border/10 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
            Call Us
          </span>
          <a
            href="tel:+14433230211"
            onClick={() => setIsOpen(false)}
            aria-label="Call us"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-navy text-gold shadow-soft hover:scale-110 active:scale-95 transition-all duration-300 border border-gold/20 hover:border-gold hover:text-gold hover:shadow-glow"
          >
            <Phone className="h-5 w-5" />
          </a>
        </div>
      </div>

      {/* Primary Trigger Button */}
      <div className="relative">
        {/* Pulsing glow ring when closed */}
        {!isOpen && (
          <div className="absolute inset-0 rounded-full bg-gold/30 animate-ping pointer-events-none" />
        )}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Contact options"
          className={`relative flex h-14 w-14 items-center justify-center rounded-full text-white shadow-soft transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] hover:shadow-glow cursor-pointer ${
            isOpen
              ? "bg-navy-deep border border-border/40 rotate-90"
              : "bg-gradient-gold border border-gold/20"
          }`}
        >
          {isOpen ? (
            <X className="h-6 w-6 text-ivory" />
          ) : (
            <MessageCircle className="h-6 w-6 text-navy-deep" />
          )}
        </button>
      </div>
    </div>
  );
}
