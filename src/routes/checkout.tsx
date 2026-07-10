import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
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
import {
  ArrowLeft,
  ShieldCheck,
  Check,
  Clock,
  PhoneCall,
  Mail,
  Lock,
  AlertCircle,
  Search,
  ChevronDown,
} from "lucide-react";
import { toast } from "sonner";
import {
  completeOrderAndSendEmail,
  createPaymentIntent,
  getPricingSummary,
  type CartItem,
  type IntakePayload,
} from "@/lib/actions";

const renderBoldText = (text: string) => {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} className="font-extrabold text-navy-deep">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
};

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

const COUNTRIES = [
  { code: "AF", name: "Afghanistan" },
  { code: "AL", name: "Albania" },
  { code: "DZ", name: "Algeria" },
  { code: "AD", name: "Andorra" },
  { code: "AO", name: "Angola" },
  { code: "AG", name: "Antigua and Barbuda" },
  { code: "AR", name: "Argentina" },
  { code: "AM", name: "Armenia" },
  { code: "AU", name: "Australia" },
  { code: "AT", name: "Austria" },
  { code: "AZ", name: "Azerbaijan" },
  { code: "BS", name: "Bahamas" },
  { code: "BH", name: "Bahrain" },
  { code: "BD", name: "Bangladesh" },
  { code: "BB", name: "Barbados" },
  { code: "BY", name: "Belarus" },
  { code: "BE", name: "Belgium" },
  { code: "BZ", name: "Belize" },
  { code: "BJ", name: "Benin" },
  { code: "BT", name: "Bhutan" },
  { code: "BO", name: "Bolivia" },
  { code: "BA", name: "Bosnia and Herzegovina" },
  { code: "BW", name: "Botswana" },
  { code: "BR", name: "Brazil" },
  { code: "BN", name: "Brunei" },
  { code: "BG", name: "Bulgaria" },
  { code: "BF", name: "Burkina Faso" },
  { code: "BI", name: "Burundi" },
  { code: "KH", name: "Cambodia" },
  { code: "CM", name: "Cameroon" },
  { code: "CA", name: "Canada" },
  { code: "CV", name: "Cape Verde" },
  { code: "CF", name: "Central African Republic" },
  { code: "TD", name: "Chad" },
  { code: "CL", name: "Chile" },
  { code: "CN", name: "China" },
  { code: "CO", name: "Colombia" },
  { code: "KM", name: "Comoros" },
  { code: "CG", name: "Congo" },
  { code: "CR", name: "Costa Rica" },
  { code: "HR", name: "Croatia" },
  { code: "CU", name: "Cuba" },
  { code: "CY", name: "Cyprus" },
  { code: "CZ", name: "Czech Republic" },
  { code: "DK", name: "Denmark" },
  { code: "DJ", name: "Djibouti" },
  { code: "DM", name: "Dominica" },
  { code: "DO", name: "Dominican Republic" },
  { code: "EC", name: "Ecuador" },
  { code: "EG", name: "Egypt" },
  { code: "SV", name: "El Salvador" },
  { code: "GQ", name: "Equatorial Guinea" },
  { code: "ER", name: "Eritrea" },
  { code: "EE", name: "Estonia" },
  { code: "ET", name: "Ethiopia" },
  { code: "FJ", name: "Fiji" },
  { code: "FI", name: "Finland" },
  { code: "FR", name: "France" },
  { code: "GA", name: "Gabon" },
  { code: "GM", name: "Gambia" },
  { code: "GE", name: "Georgia" },
  { code: "DE", name: "Germany" },
  { code: "GH", name: "Ghana" },
  { code: "GR", name: "Greece" },
  { code: "GD", name: "Grenada" },
  { code: "GT", name: "Guatemala" },
  { code: "GN", name: "Guinea" },
  { code: "GW", name: "Guinea-Bissau" },
  { code: "GY", name: "Guyana" },
  { code: "HT", name: "Haiti" },
  { code: "HN", name: "Honduras" },
  { code: "HU", name: "Hungary" },
  { code: "IS", name: "Iceland" },
  { code: "IN", name: "India" },
  { code: "ID", name: "Indonesia" },
  { code: "IR", name: "Iran" },
  { code: "IQ", name: "Iraq" },
  { code: "IE", name: "Ireland" },
  { code: "IL", name: "Israel" },
  { code: "IT", name: "Italy" },
  { code: "JM", name: "Jamaica" },
  { code: "JP", name: "Japan" },
  { code: "JO", name: "Jordan" },
  { code: "KZ", name: "Kazakhstan" },
  { code: "KE", name: "Kenya" },
  { code: "KI", name: "Kiribati" },
  { code: "KP", name: "North Korea" },
  { code: "KR", name: "South Korea" },
  { code: "KW", name: "Kuwait" },
  { code: "KG", name: "Kyrgyzstan" },
  { code: "LA", name: "Laos" },
  { code: "LV", name: "Latvia" },
  { code: "LB", name: "Lebanon" },
  { code: "LS", name: "Lesotho" },
  { code: "LR", name: "Liberia" },
  { code: "LY", name: "Libya" },
  { code: "LI", name: "Liechtenstein" },
  { code: "LT", name: "Lithuania" },
  { code: "LU", name: "Luxembourg" },
  { code: "MK", name: "North Macedonia" },
  { code: "MG", name: "Madagascar" },
  { code: "MW", name: "Malawi" },
  { code: "MY", name: "Malaysia" },
  { code: "MV", name: "Maldives" },
  { code: "ML", name: "Mali" },
  { code: "MT", name: "Malta" },
  { code: "MH", name: "Marshall Islands" },
  { code: "MR", name: "Mauritania" },
  { code: "MU", name: "Mauritius" },
  { code: "MX", name: "Mexico" },
  { code: "FM", name: "Micronesia" },
  { code: "MD", name: "Moldova" },
  { code: "MC", name: "Monaco" },
  { code: "MN", name: "Mongolia" },
  { code: "ME", name: "Montenegro" },
  { code: "MA", name: "Morocco" },
  { code: "MZ", name: "Mozambique" },
  { code: "MM", name: "Myanmar" },
  { code: "NA", name: "Namibia" },
  { code: "NR", name: "Nauru" },
  { code: "NP", name: "Nepal" },
  { code: "NL", name: "Netherlands" },
  { code: "NZ", name: "New Zealand" },
  { code: "NI", name: "Nicaragua" },
  { code: "NE", name: "Niger" },
  { code: "NG", name: "Nigeria" },
  { code: "NO", name: "Norway" },
  { code: "OM", name: "Oman" },
  { code: "PK", name: "Pakistan" },
  { code: "PW", name: "Palau" },
  { code: "PA", name: "Panama" },
  { code: "PG", name: "Papua New Guinea" },
  { code: "PY", name: "Paraguay" },
  { code: "PE", name: "Peru" },
  { code: "PH", name: "Philippines" },
  { code: "PL", name: "Poland" },
  { code: "PT", name: "Portugal" },
  { code: "QA", name: "Qatar" },
  { code: "RO", name: "Romania" },
  { code: "RU", name: "Russia" },
  { code: "RW", name: "Rwanda" },
  { code: "KN", name: "Saint Kitts and Nevis" },
  { code: "LC", name: "Saint Lucia" },
  { code: "VC", name: "Saint Vincent and the Grenadines" },
  { code: "WS", name: "Samoa" },
  { code: "SM", name: "San Marino" },
  { code: "ST", name: "Sao Tome and Principe" },
  { code: "SA", name: "Saudi Arabia" },
  { code: "SN", name: "Senegal" },
  { code: "RS", name: "Serbia" },
  { code: "SC", name: "Seychelles" },
  { code: "SL", name: "Sierra Leone" },
  { code: "SG", name: "Singapore" },
  { code: "SK", name: "Slovakia" },
  { code: "SI", name: "Slovenia" },
  { code: "SB", name: "Solomon Islands" },
  { code: "SO", name: "Somalia" },
  { code: "ZA", name: "South Africa" },
  { code: "ES", name: "Spain" },
  { code: "LK", name: "Sri Lanka" },
  { code: "SD", name: "Sudan" },
  { code: "SR", name: "Suriname" },
  { code: "SZ", name: "Swaziland" },
  { code: "SE", name: "Sweden" },
  { code: "CH", name: "Switzerland" },
  { code: "SY", name: "Syria" },
  { code: "TW", name: "Taiwan" },
  { code: "TJ", name: "Tajikistan" },
  { code: "TZ", name: "Tanzania" },
  { code: "TH", name: "Thailand" },
  { code: "TL", name: "Timor-Leste" },
  { code: "TG", name: "Togo" },
  { code: "TO", name: "Tonga" },
  { code: "TT", name: "Trinidad and Tobago" },
  { code: "TN", name: "Tunisia" },
  { code: "TR", name: "Turkey" },
  { code: "TM", name: "Turkmenistan" },
  { code: "TV", name: "Tuvalu" },
  { code: "UG", name: "Uganda" },
  { code: "UA", name: "Ukraine" },
  { code: "AE", name: "United Arab Emirates" },
  { code: "GB", name: "United Kingdom" },
  { code: "US", name: "United States" },
  { code: "UY", name: "Uruguay" },
  { code: "UZ", name: "Uzbekistan" },
  { code: "VU", name: "Vanuatu" },
  { code: "VE", name: "Venezuela" },
  { code: "VN", name: "Vietnam" },
  { code: "YE", name: "Yemen" },
  { code: "ZM", name: "Zambia" },
  { code: "ZW", name: "Zimbabwe" },
];

interface SearchableCountrySelectProps {
  value: string;
  onChange: (val: string) => void;
}

function SearchableCountrySelect({ value, onChange }: SearchableCountrySelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const selectedCountry =
    COUNTRIES.find((c) => c.code === value) || COUNTRIES.find((c) => c.code === "US");

  const filteredCountries = COUNTRIES.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between rounded-xl border border-border/80 px-4 py-3 text-sm text-foreground bg-white hover:border-[#0a7a9b] transition-all outline-none text-left cursor-pointer"
      >
        <span className="truncate">{selectedCountry?.name}</span>
        <ChevronDown
          className="h-4 w-4 text-foreground/50 shrink-0 transition-transform duration-300"
          style={{ transform: isOpen ? "rotate(180deg)" : "none" }}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute left-0 right-0 z-50 mt-1.5 max-h-60 rounded-xl border border-border/80 bg-white shadow-lg flex flex-col overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          {/* Search Box */}
          <div className="flex items-center gap-2 border-b border-border/60 px-3 py-2 bg-slate-50">
            <Search className="h-4 w-4 text-foreground/45 shrink-0" />
            <input
              type="text"
              placeholder="Search country..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent text-sm border-none outline-none p-0 text-foreground placeholder-foreground/40 focus:ring-0 focus:border-none"
              autoFocus
            />
          </div>

          {/* List items */}
          <div className="overflow-y-auto flex-1 divide-y divide-border/20 max-h-48">
            {filteredCountries.length > 0 ? (
              filteredCountries.map((c) => (
                <button
                  key={c.code}
                  type="button"
                  onClick={() => {
                    onChange(c.code);
                    setIsOpen(false);
                    setSearch("");
                  }}
                  className={`w-full text-left px-4 py-2.5 text-sm transition-colors duration-150 flex items-center justify-between hover:bg-cream cursor-pointer ${
                    value === c.code ? "bg-cream text-navy-deep font-bold" : "text-foreground/85"
                  }`}
                >
                  <span className="truncate">{c.name}</span>
                  {value === c.code && <Check className="h-3.5 w-3.5 text-[#0a7a9b] shrink-0" />}
                </button>
              ))
            ) : (
              <div className="px-4 py-3 text-xs text-foreground/50 text-center">
                No countries found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

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
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [isApple, setIsApple] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsApple(/Mac|iPad|iPhone|iPod/.test(navigator.userAgent));
    }
  }, []);

  useEffect(() => {
    if (paymentError) {
      setShowErrorModal(true);
    }
  }, [paymentError]);

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

  const handleExpressCheckout = async () => {
    if (!cart || !intakeData) {
      toast.error("Order details are missing. Please complete the intake form first.");
      return;
    }

    setIsProcessing(true);
    setPaymentError(null);
    const loadingToast = toast.loading("Processing Express Payment...");

    try {
      const sanitizedIntake = intakeData ? { ...intakeData, fileBase64: undefined } : null;

      if (isMock) {
        // Mock payment simulation for express checkout
        await new Promise((resolve) => setTimeout(resolve, 1500));

        const mockIntentId = `express_intent_${Math.random().toString(36).substring(2, 11)}`;

        // Auto-fill mock billing if empty
        if (!nameOnCard)
          setNameOnCard(intakeData.personalInfo?.fullName || "Express Checkout User");
        if (!addressLine1) setAddressLine1("123 Express Way");
        if (!city) setCity("San Francisco");
        if (!stateCode) setStateCode("CA");
        if (!zipCode) setZipCode("94103");

        const res = await completeOrderAndSendEmail({
          data: {
            paymentIntentId: mockIntentId,
            intakeData,
          },
        });

        toast.dismiss(loadingToast);

        if (res.success) {
          toast.success("Payment authorized via Express Pay! Order confirmed.");
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
          setPaymentError(res.message || "Failed to finalize Express Pay order.");
          toast.error(res.message || "Failed to finalize Express Pay order.");
        }
      } else {
        // Real Stripe Express Payment
        toast.dismiss(loadingToast);
        const errorMsg =
          "Stripe Express checkout (Apple Pay / Google Pay) requires domain association. Please use the card details form below.";
        setPaymentError(errorMsg);
        toast.error(errorMsg);
      }
    } catch (err) {
      toast.dismiss(loadingToast);
      console.error(err);
      const errMsg =
        err instanceof Error ? err.message : "Express Pay transaction encountered an error.";
      toast.error(errMsg);
      setPaymentError(errMsg);
    } finally {
      setIsProcessing(false);
    }
  };

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
    setPaymentError(null);
    const loadingToast = toast.loading("Processing secure card payment...");

    try {
      const sanitizedIntake = intakeData ? { ...intakeData, fileBase64: undefined } : null;

      if (isMock) {
        // Mock payment simulation
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // If card number is 4000... or CVC is 000 or name is "fail", simulate payment error
        const cleanCard = mockCardNumber.replace(/\s/g, "");
        if (
          cleanCard === "4000000000000000" ||
          mockCvc === "000" ||
          nameOnCard.toLowerCase() === "fail"
        ) {
          toast.dismiss(loadingToast);
          const errorMsg =
            "Card declined: Your card has insufficient funds or invalid credentials.";
          setPaymentError(errorMsg);
          toast.error(errorMsg);
          setIsProcessing(false);
          return;
        }

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
          setPaymentError(res.message || "Failed to finalize order.");
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
          const errorMsg = confirmResult.error.message || "Card payment authorization failed.";
          toast.error(errorMsg);
          setPaymentError(errorMsg);
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
            setPaymentError(res.message || "Failed to log completed order.");
          }
        } else {
          toast.dismiss(loadingToast);
          const errorMsg = "Stripe payment status unconfirmed.";
          toast.error(errorMsg);
          setPaymentError(errorMsg);
        }
      }
    } catch (err) {
      toast.dismiss(loadingToast);
      console.error(err);
      const errMsg =
        err instanceof Error ? err.message : "Checkout transaction encountered an error.";
      toast.error(errMsg);
      setPaymentError(errMsg);
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

              {/* Express Checkout Button */}
              <div className="mb-6">
                <button
                  type="button"
                  disabled={isProcessing}
                  onClick={handleExpressCheckout}
                  className="w-full bg-black hover:bg-zinc-900 text-white rounded-xl py-3.5 flex items-center justify-center gap-2 font-semibold text-sm transition-colors duration-200 shadow-sm cursor-pointer disabled:opacity-55 disabled:cursor-not-allowed"
                >
                  {isApple ? (
                    <>
                      <svg
                        className="h-4.5 w-auto fill-current"
                        viewBox="0 0 170 170"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.37.13-9.13-1.9-14.27-6.08-3.48-2.8-7.37-7.55-11.7-14.27-7.86-12.21-13.68-25.75-17.47-40.65-3.79-14.9-3.32-28.02 1.4-39.34 4.02-9.62 10.06-15.62 18.11-17.98 6.15-1.8 13.25-.8 21.3 3.01 5.7 2.7 9.38 4.02 11.06 4.02 1.34 0 4.64-1.12 9.94-3.35 6.71-2.81 12.87-3.9 18.46-3.3 14.87 1.46 25.83 7.38 32.88 17.75-13.87 8.44-20.57 19.98-20.12 34.61.34 11.19 4.48 20.35 12.41 27.46 7.94 7.12 17.34 10.97 28.2 11.53-2.12 6.43-5.25 12.43-9.4 18.01zm-21.93-108.6c-.11 8.28-3.24 15.44-9.39 21.48-6.15 6.04-13.31 9.34-21.48 9.9-1.23-10.29 2.24-19.29 10.4-26.99 8.16-7.7 17.22-10.87 27.21-10.87.11.89.11 1.79.11 2.68z" />
                      </svg>
                      <span>Pay</span>
                    </>
                  ) : (
                    <>
                      <svg
                        className="h-4.5 w-auto"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          fill="#4285F4"
                        />
                        <path
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          fill="#34A853"
                        />
                        <path
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22c-.87-2.6-3-4.53-5.84-4.53z"
                          fill="#FBBC05"
                        />
                        <path
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                          fill="#EA4335"
                        />
                      </svg>
                      <span className="font-bold text-sm tracking-wide">Pay</span>
                    </>
                  )}
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
                      <SearchableCountrySelect value={country} onChange={setCountry} />
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
                                  <span>{renderBoldText(f)}</span>
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
                  <Mail className="h-4 w-4 text-[#0a7a9b] shrink-0" />
                  <a
                    href="mailto:contact@hirecareercoach.com"
                    className="hover:text-[#0a7a9b] transition-colors"
                  >
                    contact@hirecareercoach.com
                  </a>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </section>

      {/* Payment Error Popup Modal */}
      {showErrorModal && paymentError && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-navy-deep/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="w-full max-w-sm rounded-2xl border border-red-100 bg-white p-6 shadow-xl animate-in zoom-in-95 duration-200">
            <div className="flex flex-col items-center text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-500">
                <AlertCircle className="h-6 w-6 stroke-[2.5]" />
              </div>
              <h3 className="mt-4 font-display text-lg font-bold text-navy-deep">Payment Failed</h3>
              <p className="mt-2 text-sm text-foreground/75 leading-relaxed">{paymentError}</p>
              <button
                type="button"
                onClick={() => setShowErrorModal(false)}
                className="mt-6 w-full rounded-xl bg-[#0a7a9b] hover:bg-[#08627c] py-3 text-sm font-bold text-white shadow transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
