import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Reveal } from "@/components/Reveal";
import {
  Check,
  Briefcase,
  PhoneCall,
  Mail,
  Calendar,
  ArrowRight,
  ShieldCheck,
  Lock,
} from "lucide-react";
import { getPricingSummary, type CartItem, type IntakePayload } from "@/lib/actions";

interface StoredOrder {
  orderNumber: string;
  date: string;
  cart: CartItem;
  intakeData: IntakePayload;
}

export const Route = createFileRoute("/thankyou")({
  component: ThankYouPage,
});

function ThankYouPage() {
  const [order, setOrder] = useState<StoredOrder | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("hcc_last_order");
    if (stored) {
      setOrder(JSON.parse(stored));
    } else {
      // Fallback mockup data if viewed directly
      setOrder({
        orderNumber: "HCC-10284",
        date: new Date().toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }),
        cart: {
          levelId: "mid",
          selectedType: "package",
          selectedPackage: {
            name: "Career Growth",
            price: 270,
            features: [
              "Resume Writing",
              "Cover Letter Writing",
              "LinkedIn Optimization",
              "Career Strategy Session (60 Min)",
              "2 Rounds of Revisions",
              "5 Business Day Turnaround",
            ],
          },
          packageRush: true,
          totalPrice: 320,
        },
        intakeData: {
          personalInfo: {
            fullName: "John Doe",
            email: "john.doe@example.com",
            phone: "(123) 456-7890",
          },
        },
      });
    }

    // Load Calendly Script
    const id = "calendly-widget-script";
    if (!document.getElementById(id)) {
      const s = document.createElement("script");
      s.id = id;
      s.src = "https://assets.calendly.com/assets/external/widget.js";
      s.async = true;
      document.body.appendChild(s);
    }
  }, []);

  if (!order) return null;

  const { orderNumber, date, cart } = order;
  const isRush = cart.packageRush || !!cart.selectedServices?.some((s) => s.rush);
  const pricing = getPricingSummary(cart);

  return (
    <div className="bg-[#f8f9fa] min-h-screen pb-20">
      {/* 4-Step Stepper */}
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
          <div className="flex items-center gap-1.5 text-[#0a7a9b]">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#0a7a9b] text-white text-[10px]">
              ✓
            </span>
            <span className="hidden sm:inline">2. Package</span>
            <span className="sm:hidden">2. Pkg</span>
          </div>
          <span className="text-muted-foreground/50">/</span>
          <div className="flex items-center gap-1.5 text-[#0a7a9b]">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#0a7a9b] text-white text-[10px]">
              ✓
            </span>
            <span className="hidden sm:inline">3. Intake Form</span>
            <span className="sm:hidden">3. Intake</span>
          </div>
          <span className="text-muted-foreground/50">/</span>
          <div className="flex items-center gap-1.5 text-navy-deep font-bold">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#0a7a9b] text-white text-[10px]">
              ✓
            </span>
            <span>4. Confirmation</span>
          </div>
        </div>
      </nav>

      {/* Main Success Section */}
      <section className="mx-auto max-w-6xl px-5 sm:px-8 py-12">
        <div className="text-center mb-10">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500 text-white mx-auto mb-5 shadow-lg shadow-green-500/10">
            <Check className="h-8 w-8 stroke-[3]" />
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-navy-deep leading-tight">
            Thank You, Your Order is Confirmed!
          </h1>
          <p className="mt-3 text-sm sm:text-base text-foreground/65 max-w-2xl mx-auto leading-relaxed">
            We've received your information and payment. You're one step closer to achieving your
            career goals!
          </p>
        </div>

        {/* 4 badges row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white rounded-3xl border border-border/80 p-6 shadow-sm mb-8 text-center">
          <div className="border-r border-border/40 last:border-0 pr-2">
            <p className="text-[10px] uppercase tracking-wider text-foreground/40 font-bold">
              Order Number
            </p>
            <p className="mt-1.5 font-display text-sm font-extrabold text-[#0a7a9b]">
              {orderNumber}
            </p>
          </div>
          <div className="border-r border-border/40 last:border-0 md:pr-2">
            <p className="text-[10px] uppercase tracking-wider text-foreground/40 font-bold">
              Order Date
            </p>
            <p className="mt-1.5 font-display text-sm font-extrabold text-navy-deep">{date}</p>
          </div>
          <div className="border-r border-border/40 last:border-0 pr-2">
            <p className="text-[10px] uppercase tracking-wider text-foreground/40 font-bold">
              Expected Delivery
            </p>
            <p className="mt-1.5 font-display text-sm font-extrabold text-navy-deep">
              {isRush ? "2 Business Days" : "5 Business Days"}
            </p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-foreground/40 font-bold">
              Need Help?
            </p>
            <a
              href="mailto:support@hirecareercoach.com"
              className="mt-1.5 block font-display text-sm font-bold text-[#0a7a9b] hover:underline"
            >
              support@hirecareercoach.com
            </a>
          </div>
        </div>

        {/* Main Grid Content */}
        <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr] items-start">
          {/* Left Column: Order Summary & What Happens Next */}
          <div className="space-y-6">
            {/* Order Summary receipt card */}
            <div className="bg-white rounded-3xl border border-border/80 p-6 sm:p-8 shadow-sm">
              <h3 className="font-display text-lg font-bold text-navy-deep mb-5">Order Summary</h3>

              <div className="rounded-2xl bg-[#f8f9fa] p-5 border border-border/40 mb-6">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0a7a9b]/10 text-[#0a7a9b]">
                    <Briefcase className="h-5 w-5" />
                  </div>
                  <div>
                    {cart.selectedType === "package" ? (
                      <>
                        <h4 className="text-sm font-bold text-navy-deep leading-tight">
                          {cart.selectedPackage?.name} Package
                        </h4>
                      </>
                    ) : (
                      <h4 className="text-sm font-bold text-navy-deep leading-tight">
                        Custom Package
                      </h4>
                    )}
                    <p className="text-[10px] text-foreground/50 mt-1 uppercase font-bold tracking-wider">
                      {cart.levelId} Level
                    </p>

                    {cart.selectedType === "package" && cart.selectedPackage?.features && (
                      <ul className="mt-4 space-y-2 border-t border-border/30 pt-3">
                        {cart.selectedPackage.features.map((f: string, fidx: number) => (
                          <li
                            key={fidx}
                            className="text-xs text-foreground/75 flex items-center gap-1.5"
                          >
                            <Check className="h-3 w-3 shrink-0 text-[#0a7a9b]" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-3.5 border-t border-border/60 pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-foreground/60 font-semibold">Subtotal</span>
                  <span className="text-navy-deep font-extrabold">
                    ${pricing.subtotal.toFixed(2)}
                  </span>
                </div>

                {pricing.rushTotal > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-foreground/60 font-semibold">Rush Service (2 Days)</span>
                    <span className="text-[#0a7a9b] font-extrabold">
                      +${pricing.rushTotal.toFixed(2)}
                    </span>
                  </div>
                )}

                <div className="flex justify-between items-baseline border-t border-border/60 pt-4">
                  <span className="text-navy-deep font-bold text-base">Total Paid</span>
                  <span className="font-display text-2xl font-extrabold text-[#0a7a9b]">
                    ${pricing.total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* What Happens Next Card */}
            <div className="bg-white rounded-3xl border border-border/80 p-6 sm:p-8 shadow-sm">
              <h3 className="font-display text-lg font-bold text-navy-deep mb-5">
                What Happens Next?
              </h3>

              <ul className="space-y-5">
                <li className="flex items-start gap-4">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#0a7a9b]/10 text-[#0a7a9b] text-xs font-bold font-display mt-0.5">
                    1
                  </span>
                  <div>
                    <h4 className="text-sm font-bold text-navy-deep">
                      We'll review your information
                    </h4>
                    <p className="mt-1 text-xs text-foreground/60 leading-relaxed">
                      Our team will review your intake form and uploaded resume.
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#0a7a9b]/10 text-[#0a7a9b] text-xs font-bold font-display mt-0.5">
                    2
                  </span>
                  <div>
                    <h4 className="text-sm font-bold text-navy-deep">
                      Your coach will be assigned
                    </h4>
                    <p className="mt-1 text-xs text-foreground/60 leading-relaxed">
                      You'll be matched with the best coach for your specific industry goals.
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#0a7a9b]/10 text-[#0a7a9b] text-xs font-bold font-display mt-0.5">
                    3
                  </span>
                  <div>
                    <h4 className="text-sm font-bold text-navy-deep">Consultation call</h4>
                    <p className="mt-1 text-xs text-foreground/60 leading-relaxed">
                      Schedule your call using the booking widget to discuss your career strategy.
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#0a7a9b]/10 text-[#0a7a9b] text-xs font-bold font-display mt-0.5">
                    4
                  </span>
                  <div>
                    <h4 className="text-sm font-bold text-navy-deep">We get to work!</h4>
                    <p className="mt-1 text-xs text-foreground/60 leading-relaxed">
                      Your documents will be crafted, optimized, and delivered on time.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Schedule Consultation */}
          <div className="bg-white rounded-3xl border border-border/80 p-6 sm:p-8 shadow-sm space-y-6">
            <div>
              <h3 className="font-display text-lg font-bold text-navy-deep mb-2 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-[#0a7a9b]" />
                <span>Schedule Your Consultation</span>
              </h3>
              <p className="text-xs text-foreground/60 leading-relaxed">
                Please book your 1-on-1 consultation call with your career coach. This call helps us
                align on your goals and career strategy.
              </p>
            </div>

            {/* Meet Your Coach card */}
            <div className="flex items-center gap-4 rounded-2xl bg-[#f8f9fa] border border-border/40 p-4">
              <img
                src="/coach_jessica.png"
                alt="Jessica Morgan"
                className="h-14 w-14 rounded-full object-cover shadow-sm bg-border border-2 border-white shrink-0"
              />
              <div>
                <h4 className="text-sm font-bold text-navy-deep">Rida Shakeel</h4>
                <p className="text-[10px] text-[#0a7a9b] uppercase font-bold tracking-wide">
                  Senior Career Coach
                </p>
                <p className="text-[10px] text-foreground/50 mt-1 leading-snug">
                  10+ years helping professionals land their dream roles.
                </p>
              </div>
            </div>

            {/* Calendly booking widget */}
            <div>
              <div
                className="calendly-inline-widget w-full rounded-2xl border border-border/60 overflow-hidden"
                data-url="https://calendly.com/ridashakeel98"
                style={{ minWidth: 0, height: 500 }}
              />
            </div>
          </div>
        </div>

        {/* Bottom banner & Return Home */}
        <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-6 rounded-3xl border border-border/80 bg-white p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#0a7a9b]/10 text-[#0a7a9b]">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-display text-base font-extrabold text-navy-deep">
                Thank you for choosing Hire Career Coach!
              </h4>
              <p className="mt-1 text-xs text-foreground/65">
                We're excited to partner with you on your career journey.
              </p>
            </div>
          </div>

          <Link
            to="/"
            className="flex items-center gap-2 rounded-xl bg-navy hover:bg-navy-deep text-white py-3 px-6 font-bold text-xs sm:text-sm transition-colors duration-200 shrink-0"
          >
            <span>Return to Home</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Bottom guarantee footer list */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 pt-12 border-t border-border/60 mt-12 text-xs text-foreground/60 leading-relaxed font-semibold">
          <div className="flex gap-2.5">
            <ShieldCheck className="h-5 w-5 text-[#0a7a9b] shrink-0" />
            <div>
              <h5 className="text-navy-deep font-bold uppercase tracking-wider text-[10px]">
                100% Satisfaction Guarantee
              </h5>
              <p className="mt-1 text-[10px] text-foreground/50 leading-snug">
                We're not happy unless you are.
              </p>
            </div>
          </div>

          <div className="flex gap-2.5">
            <Lock className="h-5 w-5 text-[#0a7a9b] shrink-0" />
            <div>
              <h5 className="text-navy-deep font-bold uppercase tracking-wider text-[10px]">
                Secure & Confidential
              </h5>
              <p className="mt-1 text-[10px] text-foreground/50 leading-snug">
                Your information is safe and never shared.
              </p>
            </div>
          </div>

          <div className="flex gap-2.5">
            <PhoneCall className="h-5 w-5 text-[#0a7a9b] shrink-0" />
            <div>
              <h5 className="text-navy-deep font-bold uppercase tracking-wider text-[10px]">
                Need Help?
              </h5>
              <p className="mt-1 text-[10px] text-foreground/50 leading-snug">
                We're here for you every step of the way.
              </p>
            </div>
          </div>

          <div className="flex gap-2.5">
            <Mail className="h-5 w-5 text-[#0a7a9b] shrink-0" />
            <div>
              <h5 className="text-navy-deep font-bold uppercase tracking-wider text-[10px]">
                support@hirecareercoach.com
              </h5>
              <p className="mt-1 text-[10px] text-foreground/50 leading-snug">
                Mon - Fri, 9AM - 6PM EST
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
