import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Reveal } from "@/components/Reveal";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import { ArrowLeft, ShieldCheck, Check, Clock, PhoneCall, Mail, Lock } from "lucide-react";
import { toast } from "sonner";
import {
  completeOrderAndSendEmail,
  createPaymentIntent,
  getPricingSummary,
  type CartItem,
  type IntakePayload,
} from "@/lib/actions";

// Initialize Stripe Promise
const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || "";
const hasStripeKeys =
  stripePublishableKey && stripePublishableKey !== "pk_test_placeholder_publishable_key";

const stripePromise = hasStripeKeys ? loadStripe(stripePublishableKey) : null;

// Stripe elements custom styling
const elementOptions = {
  style: {
    base: {
      fontSize: "14px",
      color: "#0b1528",
      fontFamily: "Inter, system-ui, sans-serif",
      fontSmoothing: "antialiased",
      "::placeholder": {
        color: "#94a3b8",
      },
    },
    invalid: {
      color: "#dc2626",
    },
  },
};

export const Route = createFileRoute("/checkout")({
  component: CheckoutWrapper,
});

function CheckoutWrapper() {
  const isMock = !hasStripeKeys;
  return (
    <Elements stripe={stripePromise}>
      <CheckoutPage isMock={isMock} />
    </Elements>
  );
}

interface CheckoutPageProps {
  isMock: boolean;
}

function CheckoutPage({ isMock }: CheckoutPageProps) {
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  const [cart, setCart] = useState<CartItem | null>(null);
  const [intakeData, setIntakeData] = useState<IntakePayload | null>(null);

  // Billing Details State
  const [nameOnCard, setNameOnCard] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [stateCode, setStateCode] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [country, setCountry] = useState("US");
  const [saveCard, setSaveCard] = useState(false);

  // Payment UI State
  const [isProcessing, setIsProcessing] = useState(false);

  // Mock Payment Card Formatting States
  const [mockCardNumber, setMockCardNumber] = useState("");
  const [mockExpiry, setMockExpiry] = useState("");
  const [mockCvc, setMockCvc] = useState("");

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ""); // Remove non-digits
    const formatted = value.match(/.{1,4}/g)?.join(" ") || "";
    setMockCardNumber(formatted.substring(0, 19)); // Max 16 digits + 3 spaces = 19
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ""); // Remove non-digits
    let formatted = value;
    if (value.length > 2) {
      formatted = value.substring(0, 2) + "/" + value.substring(2, 4);
    }
    setMockExpiry(formatted.substring(0, 5)); // Max 4 digits + 1 slash = 5
  };

  const handleCvcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ""); // Remove non-digits
    setMockCvc(value.substring(0, 4)); // Max 4 digits
  };

  const pricing = getPricingSummary(cart);

  useEffect(() => {
    const storedCart = localStorage.getItem("hcc_cart");
    const storedIntake = localStorage.getItem("hcc_intake");

    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
    if (storedIntake) {
      const parsed = JSON.parse(storedIntake);
      setIntakeData(parsed);
      // Pre-fill card name from intake full name
      if (parsed.personalInfo?.fullName) {
        setNameOnCard(parsed.personalInfo.fullName);
      }
    }
  }, []);

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!cart || !intakeData) {
      toast.error("Order details are missing. Please complete the intake form first.");
      return;
    }

    if (!nameOnCard || !addressLine1 || !city || !stateCode || !zipCode) {
      toast.error("Please fill in all billing information fields.");
      return;
    }

    setIsProcessing(true);
    const loadingToast = toast.loading("Processing secure card payment...");

    try {
      const sanitizedIntake = intakeData ? { ...intakeData, fileBase64: undefined } : null;

      if (isMock) {
        // Mock payment simulation
        await new Promise((resolve) => setTimeout(resolve, 1500));

        const mockIntentId = `mock_intent_${Math.random().toString(36).substring(2, 11)}`;

        // Verify order and send SMTP email from server
        const res = await completeOrderAndSendEmail({
          data: {
            paymentIntentId: mockIntentId,
            intakeData,
          },
        });

        toast.dismiss(loadingToast);

        if (res.success) {
          toast.success("Payment authorized! Order confirmed.");
          localStorage.setItem(
            "hcc_last_order",
            JSON.stringify({
              orderNumber: res.orderNumber,
              cart,
              intakeData: sanitizedIntake,
              date: new Date().toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              }),
            }),
          );
          // Clean cart states
          localStorage.removeItem("hcc_cart");
          localStorage.removeItem("hcc_intake");
          navigate({ to: "/thankyou" });
        } else {
          toast.error(res.message || "Failed to finalize order.");
        }
      } else {
        // Real Stripe flow
        if (!stripe || !elements) {
          toast.error("Stripe is not fully initialized. Please try again.");
          setIsProcessing(false);
          toast.dismiss(loadingToast);
          return;
        }

        const cardElement = elements.getElement(CardNumberElement);
        if (!cardElement) {
          toast.error("Payment fields are missing. Please reload the page.");
          setIsProcessing(false);
          toast.dismiss(loadingToast);
          return;
        }

        // Create PaymentIntent in Backend
        const intentRes = await createPaymentIntent({
          data: { amount: cart.totalPrice },
        });

        if (!intentRes.clientSecret) {
          throw new Error("Unable to initialize transaction with Stripe.");
        }

        // Confirm Card Payment directly on site without redirecting
        const confirmResult = await stripe.confirmCardPayment(intentRes.clientSecret, {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: nameOnCard,
              address: {
                line1: addressLine1,
                line2: addressLine2 || undefined,
                city: city,
                state: stateCode,
                postal_code: zipCode,
                country: country,
              },
            },
          },
        });

        if (confirmResult.error) {
          toast.dismiss(loadingToast);
          toast.error(confirmResult.error.message || "Card payment authorization failed.");
          setIsProcessing(false);
          return;
        }

        if (confirmResult.paymentIntent?.status === "succeeded") {
          // Finalize order status and send notification email to coach admin
          const res = await completeOrderAndSendEmail({
            data: {
              paymentIntentId: confirmResult.paymentIntent.id,
              intakeData,
            },
          });

          toast.dismiss(loadingToast);

          if (res.success) {
            toast.success("Order confirmed! Payment processed.");
            localStorage.setItem(
              "hcc_last_order",
              JSON.stringify({
                orderNumber: res.orderNumber,
                cart,
                intakeData: sanitizedIntake,
                date: new Date().toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                }),
              }),
            );
            // Clean cart states
            localStorage.removeItem("hcc_cart");
            localStorage.removeItem("hcc_intake");
            navigate({ to: "/thankyou" });
          } else {
            toast.error(res.message || "Failed to log completed order.");
          }
        } else {
          toast.dismiss(loadingToast);
          toast.error("Stripe payment status unconfirmed.");
        }
      }
    } catch (err) {
      toast.dismiss(loadingToast);
      console.error(err);
      toast.error(
        err instanceof Error ? err.message : "Checkout transaction encountered an error.",
      );
    } finally {
      setIsProcessing(false);
    }
  };

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
              4
            </span>
            <span>4. Checkout</span>
          </div>
        </div>
      </nav>

      {/* Main Grid Content */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-12">
        <Reveal className="text-center mb-10">
          <h1 className="font-display text-4xl font-extrabold text-navy-deep">Secure Checkout</h1>
          <p className="mt-3 text-base text-foreground/65 max-w-2xl mx-auto leading-relaxed">
            Complete your payment to begin your order.
          </p>
        </Reveal>

        <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr] max-w-6xl mx-auto items-start">
          {/* Left Form: Stripe Payment fields */}
          <form onSubmit={handleCheckoutSubmit} className="space-y-6">
            <div className="bg-white rounded-3xl border border-border/80 p-6 sm:p-8 shadow-sm">
              <h3 className="font-display text-lg font-bold text-navy-deep mb-6 border-b border-border/40 pb-4">
                Payment Information
              </h3>

              {/* Apple Pay Button Mockup */}
              <div className="mb-6">
                <button
                  type="button"
                  onClick={() =>
                    toast.info("Apple Pay integration requires Safari and domain validation.")
                  }
                  className="w-full bg-black hover:bg-zinc-900 text-white rounded-xl py-3.5 flex items-center justify-center gap-2 font-semibold text-sm transition-colors duration-200"
                >
                  <span className="text-base"></span>
                  <span>Pay</span>
                </button>

                <div className="relative flex py-5 items-center">
                  <div className="flex-grow border-t border-border/60"></div>
                  <span className="flex-shrink mx-4 text-xs font-bold text-foreground/30 uppercase tracking-wider">
                    Or pay with card
                  </span>
                  <div className="flex-grow border-t border-border/60"></div>
                </div>
              </div>

              {/* Credit Card Inputs */}
              <div className="space-y-5">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-xs font-bold text-navy-deep uppercase tracking-wide">
                      Card Number
                    </label>
                    <div className="flex gap-1">
                      <span className="text-[10px] border border-border/60 px-1.5 py-0.5 rounded text-foreground/50 font-bold">
                        VISA
                      </span>
                      <span className="text-[10px] border border-border/60 px-1.5 py-0.5 rounded text-foreground/50 font-bold">
                        MC
                      </span>
                      <span className="text-[10px] border border-border/60 px-1.5 py-0.5 rounded text-foreground/50 font-bold">
                        AMEX
                      </span>
                    </div>
                  </div>

                  <div className="w-full rounded-xl border border-border/80 bg-white px-4 py-3.5 focus-within:ring-1 focus-within:ring-[#0a7a9b] focus-within:border-[#0a7a9b] outline-none">
                    {isMock ? (
                      <input
                        type="text"
                        placeholder="4242 4242 4242 4242"
                        className="w-full text-sm outline-none border-none p-0 text-navy-deep placeholder-foreground/30 font-medium bg-transparent cursor-pointer"
                        value={mockCardNumber}
                        onChange={handleCardNumberChange}
                        maxLength={19}
                        required
                      />
                    ) : (
                      <CardNumberElement options={elementOptions} />
                    )}
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold text-navy-deep mb-2 uppercase tracking-wide">
                      Expiration Date
                    </label>
                    <div className="w-full rounded-xl border border-border/80 bg-white px-4 py-3.5 focus-within:ring-1 focus-within:ring-[#0a7a9b] focus-within:border-[#0a7a9b] outline-none">
                      {isMock ? (
                        <input
                          type="text"
                          placeholder="MM / YY"
                          className="w-full text-sm outline-none border-none p-0 text-navy-deep placeholder-foreground/30 font-medium bg-transparent cursor-pointer"
                          value={mockExpiry}
                          onChange={handleExpiryChange}
                          maxLength={5}
                          required
                        />
                      ) : (
                        <CardExpiryElement options={elementOptions} />
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-navy-deep mb-2 uppercase tracking-wide">
                      CVC
                    </label>
                    <div className="w-full rounded-xl border border-border/80 bg-white px-4 py-3.5 focus-within:ring-1 focus-within:ring-[#0a7a9b] focus-within:border-[#0a7a9b] outline-none">
                      {isMock ? (
                        <input
                          type="text"
                          placeholder="123"
                          className="w-full text-sm outline-none border-none p-0 text-navy-deep placeholder-foreground/30 font-medium bg-transparent cursor-pointer"
                          value={mockCvc}
                          onChange={handleCvcChange}
                          maxLength={4}
                          required
                        />
                      ) : (
                        <CardCvcElement options={elementOptions} />
                      )}
                    </div>
                  </div>
                </div>

                <div className="border-t border-border/40 pt-5 mt-5">
                  <h4 className="font-display text-sm font-bold text-navy-deep mb-4">
                    Billing Details
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold text-navy-deep mb-1 uppercase tracking-wide">
                        Name on Card
                      </label>
                      <input
                        type="text"
                        required
                        value={nameOnCard}
                        onChange={(e) => setNameOnCard(e.target.value)}
                        placeholder="John Doe"
                        className="w-full rounded-xl border border-border/80 px-4 py-3 text-sm text-foreground focus:ring-[#0a7a9b] focus:border-[#0a7a9b] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-navy-deep mb-1 uppercase tracking-wide">
                        Street Address
                      </label>
                      <input
                        type="text"
                        required
                        value={addressLine1}
                        onChange={(e) => setAddressLine1(e.target.value)}
                        placeholder="123 Main Street"
                        className="w-full rounded-xl border border-border/80 px-4 py-3 text-sm text-foreground focus:ring-[#0a7a9b] focus:border-[#0a7a9b] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-navy-deep mb-1 uppercase tracking-wide">
                        Suite / Apartment (Optional)
                      </label>
                      <input
                        type="text"
                        value={addressLine2}
                        onChange={(e) => setAddressLine2(e.target.value)}
                        placeholder="Apt, suite, etc."
                        className="w-full rounded-xl border border-border/80 px-4 py-3 text-sm text-foreground focus:ring-[#0a7a9b] focus:border-[#0a7a9b] outline-none"
                      />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-3">
                      <div>
                        <label className="block text-[10px] font-bold text-navy-deep mb-1 uppercase tracking-wide">
                          City
                        </label>
                        <input
                          type="text"
                          required
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          placeholder="New York"
                          className="w-full rounded-xl border border-border/80 px-4 py-3 text-sm text-foreground focus:ring-[#0a7a9b] focus:border-[#0a7a9b] outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-navy-deep mb-1 uppercase tracking-wide">
                          State
                        </label>
                        <input
                          type="text"
                          required
                          value={stateCode}
                          onChange={(e) => setStateCode(e.target.value)}
                          placeholder="NY"
                          className="w-full rounded-xl border border-border/80 px-4 py-3 text-sm text-foreground focus:ring-[#0a7a9b] focus:border-[#0a7a9b] outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-navy-deep mb-1 uppercase tracking-wide">
                          ZIP Code
                        </label>
                        <input
                          type="text"
                          required
                          value={zipCode}
                          onChange={(e) => setZipCode(e.target.value)}
                          placeholder="10001"
                          className="w-full rounded-xl border border-border/80 px-4 py-3 text-sm text-foreground focus:ring-[#0a7a9b] focus:border-[#0a7a9b] outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-navy-deep mb-1 uppercase tracking-wide">
                        Country
                      </label>
                      <select
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="w-full rounded-xl border border-border/80 px-4 py-3 text-sm text-foreground focus:ring-[#0a7a9b] focus:border-[#0a7a9b] outline-none bg-white"
                      >
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                        <option value="GB">United Kingdom</option>
                        <option value="AU">Australia</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="save_card"
                    checked={saveCard}
                    onChange={(e) => setSaveCard(e.target.checked)}
                    className="rounded border-border/80 text-[#0a7a9b] focus:ring-[#0a7a9b] h-3.5 w-3.5"
                  />
                  <label
                    htmlFor="save_card"
                    className="text-xs text-foreground/75 cursor-pointer font-semibold select-none"
                  >
                    Save card for future purchases
                  </label>
                </div>
              </div>
            </div>

            {/* Pay Button & Security disclaimer */}
            <div className="space-y-4">
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-[#0a7a9b] hover:bg-[#08627c] text-white rounded-xl py-4 flex items-center justify-center gap-2 font-bold text-sm sm:text-base transition-colors duration-200 shadow-md disabled:opacity-55 cursor-pointer disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <span className="flex items-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <span>Processing Secure Payment...</span>
                  </span>
                ) : (
                  <>
                    <Lock className="h-4.5 w-4.5" />
                    <span>{cart ? `Pay $${cart.totalPrice.toFixed(2)}` : "Confirm Payment"}</span>
                  </>
                )}
              </button>

              <div className="flex items-center gap-1.5 justify-center text-xs text-foreground/50">
                <ShieldCheck className="h-4 w-4 text-[#0a7a9b]" />
                <span>Secure card payment powered by Stripe</span>
              </div>
            </div>
          </form>

          {/* Right Sidebar: Summary */}
          <aside className="space-y-6">
            <div className="bg-white rounded-3xl border border-border/80 p-6 sm:p-8 shadow-sm">
              <h3 className="font-display text-lg font-bold text-navy-deep mb-4 border-b border-border/40 pb-3">
                Order Summary
              </h3>

              {cart ? (
                <div className="space-y-6">
                  <div>
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0a7a9b]/10 text-[#0a7a9b]">
                        <ShieldCheck className="h-5 w-5" />
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

                        {/* Feature checklist */}
                        {cart.selectedType === "package" && cart.selectedPackage?.features && (
                          <ul className="mt-4 space-y-2 border-t border-border/30 pt-3">
                            {cart.selectedPackage.features
                              .slice(0, 4)
                              .map((f: string, fidx: number) => (
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
                        <span className="text-foreground/60 font-semibold">Rush Delivery</span>
                        <span className="text-[#0a7a9b] font-extrabold">
                          +${pricing.rushTotal.toFixed(2)}
                        </span>
                      </div>
                    )}

                    <div className="flex justify-between items-baseline border-t border-border/60 pt-4">
                      <span className="text-navy-deep font-bold text-base">Total</span>
                      <span className="font-display text-2xl font-extrabold text-[#0a7a9b]">
                        ${pricing.total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-foreground/50 text-center py-6">
                  No items selected in your cart. Please go back to the pricing page to make a
                  selection.
                </p>
              )}
            </div>

            {/* Satisfaction Guarantee card */}
            <div className="flex items-start gap-4 rounded-3xl border border-border/80 bg-white p-6 shadow-sm">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#0a7a9b]/10 text-[#0a7a9b]">
                <ShieldCheck className="h-6 w-6" />
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

            {/* Need Help? Card */}
            <div className="bg-white rounded-3xl border border-border/80 p-6 sm:p-8 shadow-sm">
              <h4 className="font-display text-sm font-bold text-navy-deep mb-4">Need Help?</h4>
              <p className="text-xs text-foreground/60 leading-relaxed mb-4">
                Our support team is here to help you every step of the way.
              </p>
              <ul className="space-y-3.5 text-xs text-foreground/85 font-semibold">
                <li className="flex items-center gap-2.5">
                  <PhoneCall className="h-4 w-4 text-[#0a7a9b] shrink-0" />
                  <a href="tel:+18881234567" className="hover:text-[#0a7a9b] transition-colors">
                    (888) 123-4567
                  </a>
                </li>
                <li className="flex items-center gap-2.5">
                  <Mail className="h-4 w-4 text-[#0a7a9b] shrink-0" />
                  <a
                    href="mailto:support@hirecareercoach.com"
                    className="hover:text-[#0a7a9b] transition-colors"
                  >
                    support@hirecareercoach.com
                  </a>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
