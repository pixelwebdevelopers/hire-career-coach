import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { Reveal } from "@/components/Reveal";
import { submitIntakeForm, getPricingSummary, type CartItem } from "@/lib/actions";
import {
  ArrowLeft,
  ArrowRight,
  User,
  Mail,
  Phone,
  Briefcase,
  Linkedin,
  UploadCloud,
  Check,
  LockKeyhole,
  Award,
  ShieldCheck,
  Clock,
  Headset,
  PhoneCall,
  Trash2,
  FileCheck2,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/intake")({
  component: IntakePage,
});

function IntakePage() {
  const navigate = useNavigate();
  const [cart, setCart] = useState<CartItem | null>(null);

  // Form Fields State
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [currentTitle, setCurrentTitle] = useState("");
  const [targetTitles, setTargetTitles] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [notes, setNotes] = useState("");

  // Resume attachment state
  const [file, setFile] = useState<File | null>(null);
  const [fileBase64, setFileBase64] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("hcc_cart");
    if (stored) {
      setCart(JSON.parse(stored));
    }
  }, []);

  const pricing = getPricingSummary(cart);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (selectedFile: File) => {
    // 10MB limit for SMTP email transmission
    const maxSizeBytes = 10 * 1024 * 1024;
    const allowedExtensions = ["pdf", "doc", "docx"];
    const fileExt = selectedFile.name.split(".").pop()?.toLowerCase() || "";

    if (!allowedExtensions.includes(fileExt)) {
      toast.error("Invalid file type. Only PDF, DOC, and DOCX are allowed.");
      return;
    }

    if (selectedFile.size > maxSizeBytes) {
      toast.error("File is too large. Max file size is 10MB to ensure reliable email delivery.");
      return;
    }

    setFile(selectedFile);

    // Convert file to Base64 for Server function transmission
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onload = () => {
      setFileBase64(reader.result as string);
    };
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const triggerBrowse = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFile(null);
    setFileBase64("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!cart) {
      toast.error("Please select a career level and package first.");
      return;
    }

    if (!fullName || !email || !phone || !currentTitle || !targetTitles) {
      toast.error("Please fill in all required fields marked with *");
      return;
    }

    if (!file) {
      toast.error("Please upload your current resume to proceed.");
      return;
    }

    setIsSubmitting(true);
    const loadingToast = toast.loading("Submitting your intake form details...");

    try {
      const payload = {
        personalInfo: { fullName, email, phone },
        professionalInfo: { currentTitle, targetTitles, linkedin },
        cart,
        notes,
        fileName: file.name,
        fileBase64,
      };

      // Save locally to persist selection state
      localStorage.setItem("hcc_intake", JSON.stringify(payload));

      const res = await submitIntakeForm({ data: payload });

      toast.dismiss(loadingToast);

      if (res.success) {
        toast.success("Intake details recorded! Proceeding to Checkout.");
        navigate({ to: "/checkout" });
      } else {
        toast.error("Failed to transmit intake details. Please try again.");
      }
    } catch (err) {
      toast.dismiss(loadingToast);
      console.error(err);
      toast.error("An error occurred during submission. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#f8f9fa] min-h-screen pb-20">
      {/* Stepper progress */}
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
          <div className="flex items-center gap-1.5 text-navy-deep font-bold">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#0a7a9b] text-white text-[10px]">
              3
            </span>
            <span className="hidden sm:inline">3. Intake Form</span>
            <span className="sm:hidden">3. Intake</span>
          </div>
          <span className="text-muted-foreground/50">/</span>
          <div className="flex items-center gap-1.5 text-muted-foreground/50">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-border text-muted-foreground/60 text-[10px]">
              4
            </span>
            <span>4. Checkout</span>
          </div>
        </div>
      </nav>

      {/* Main Grid Content */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-12">
        <Reveal className="text-center mb-10">
          <h1 className="font-display text-4xl font-extrabold text-navy-deep">Intake Form</h1>
          <p className="mt-3 text-base text-foreground/65 max-w-2xl mx-auto leading-relaxed">
            Please provide the information below so we can tailor your documents and support to your
            goals.
          </p>
        </Reveal>

        <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr] max-w-6xl mx-auto items-start">
          {/* Left Form */}
          <form onSubmit={handleFormSubmit} className="space-y-6">
            {/* Personal Information card */}
            <div className="bg-white rounded-3xl border border-border/80 p-6 sm:p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0a7a9b]/10 text-[#0a7a9b]">
                  <User className="h-5 w-5" />
                </div>
                <h3 className="font-display text-lg font-bold text-navy-deep">
                  Personal Information
                </h3>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold text-navy-deep mb-2 uppercase tracking-wide">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full rounded-xl border border-border/80 px-4 py-3 text-sm text-foreground focus:ring-[#0a7a9b] focus:border-[#0a7a9b] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-navy-deep mb-2 uppercase tracking-wide">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full rounded-xl border border-border/80 px-4 py-3 text-sm text-foreground focus:ring-[#0a7a9b] focus:border-[#0a7a9b] outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-navy-deep mb-2 uppercase tracking-wide">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(123) 456-7890"
                    className="w-full rounded-xl border border-border/80 px-4 py-3 text-sm text-foreground focus:ring-[#0a7a9b] focus:border-[#0a7a9b] outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Professional Information card */}
            <div className="bg-white rounded-3xl border border-border/80 p-6 sm:p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0a7a9b]/10 text-[#0a7a9b]">
                  <Briefcase className="h-5 w-5" />
                </div>
                <h3 className="font-display text-lg font-bold text-navy-deep">
                  Professional Information
                </h3>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold text-navy-deep mb-2 uppercase tracking-wide">
                    Current Job Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={currentTitle}
                    onChange={(e) => setCurrentTitle(e.target.value)}
                    placeholder="e.g., Marketing Coordinator"
                    className="w-full rounded-xl border border-border/80 px-4 py-3 text-sm text-foreground focus:ring-[#0a7a9b] focus:border-[#0a7a9b] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-navy-deep mb-2 uppercase tracking-wide">
                    Target Job Title(s) *
                  </label>
                  <input
                    type="text"
                    required
                    value={targetTitles}
                    onChange={(e) => setTargetTitles(e.target.value)}
                    placeholder="e.g., Marketing Manager, Brand Manager"
                    className="w-full rounded-xl border border-border/80 px-4 py-3 text-sm text-foreground focus:ring-[#0a7a9b] focus:border-[#0a7a9b] outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-navy-deep mb-2 uppercase tracking-wide">
                    LinkedIn Profile URL
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-foreground/40 border-r border-border/60 pr-3 bg-[#f8f9fa] rounded-l-xl">
                      <Linkedin className="h-4 w-4" />
                    </div>
                    <input
                      type="url"
                      value={linkedin}
                      onChange={(e) => setLinkedin(e.target.value)}
                      placeholder="e.g., https://www.linkedin.com/in/yourprofile"
                      className="w-full rounded-xl border border-border/80 pl-16 pr-4 py-3 text-sm text-foreground focus:ring-[#0a7a9b] focus:border-[#0a7a9b] outline-none"
                    />
                  </div>
                  <p className="mt-2 text-xs text-foreground/50">
                    This helps us understand your professional background better.
                  </p>
                </div>
              </div>
            </div>

            {/* Resume Upload card */}
            <div className="bg-white rounded-3xl border border-border/80 p-6 sm:p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0a7a9b]/10 text-[#0a7a9b]">
                  <UploadCloud className="h-5 w-5" />
                </div>
                <h3 className="font-display text-lg font-bold text-navy-deep">Resume Upload</h3>
              </div>

              <p className="text-xs text-foreground/60 mb-4">
                Please upload your current resume (PDF, DOCX, or DOC)
              </p>

              {/* Drag drop area */}
              <div
                onClick={triggerBrowse}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={[
                  "border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all duration-300",
                  isDragging
                    ? "border-[#0a7a9b] bg-[#0a7a9b]/5"
                    : "border-border/80 hover:border-[#0a7a9b]/60",
                ].join(" ")}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                />

                {file ? (
                  <div className="text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0a7a9b]/10 text-[#0a7a9b] mx-auto mb-3">
                      <FileCheck2 className="h-6 w-6" />
                    </div>
                    <p className="text-sm font-bold text-navy-deep truncate max-w-xs">
                      {file.name}
                    </p>
                    <p className="text-xs text-foreground/50 mt-1">
                      {(file.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                    <button
                      type="button"
                      onClick={handleRemoveFile}
                      className="mt-4 flex items-center gap-1.5 mx-auto text-xs font-bold text-red-600 hover:text-red-800 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span>Remove File</span>
                    </button>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cream text-foreground/60 mx-auto mb-3">
                      <UploadCloud className="h-6 w-6" />
                    </div>
                    <p className="text-sm font-bold text-navy-deep">Drag and drop your file here</p>
                    <p className="text-xs text-foreground/40 mt-1">or</p>
                    <button
                      type="button"
                      className="mt-3 rounded-lg border border-border/80 bg-white px-4 py-2 text-xs font-bold text-navy-deep hover:bg-cream/40 transition-colors"
                    >
                      Choose File
                    </button>
                  </div>
                )}
              </div>
              <p className="mt-3 text-[10px] text-foreground/40 text-center">
                Accepted formats: PDF, DOCX, DOC (Max file size: 10MB)
              </p>
            </div>

            {/* Additional Notes card */}
            <div className="bg-white rounded-3xl border border-border/80 p-6 sm:p-8 shadow-sm">
              <div className="flex items-center justify-between gap-4 mb-4">
                <h3 className="font-display text-sm font-bold text-navy-deep uppercase tracking-wider">
                  Additional Notes (Optional)
                </h3>
                <span className="text-[10px] text-foreground/40 font-semibold">
                  {notes.length}/1000 characters
                </span>
              </div>
              <p className="text-xs text-foreground/60 mb-4">
                Share any additional information, goals, or specific areas you'd like us to focus
                on.
              </p>
              <textarea
                maxLength={1000}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Tell us more about your career goals, challenges, or anything else we should know..."
                className="w-full rounded-xl border border-border/80 px-4 py-3 text-sm text-foreground focus:ring-[#0a7a9b] focus:border-[#0a7a9b] outline-none min-h-[6.5rem] resize-none"
              />
            </div>

            {/* Form actions */}
            <div className="flex items-center justify-between gap-4 pt-2">
              <Link
                to="/pricing/$id"
                params={{ id: cart?.levelId || "mid" }}
                className="flex items-center gap-1.5 rounded-xl border border-border bg-white text-navy-deep hover:bg-cream/40 px-5 py-3 font-bold text-xs sm:text-sm transition-colors duration-200 shadow-sm cursor-pointer"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Cart</span>
              </Link>

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center justify-center gap-2 rounded-xl bg-[#0a7a9b] hover:bg-[#08627c] text-white px-6 py-3 font-bold text-xs sm:text-sm transition-colors duration-200 shadow-sm disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed min-w-[170px]"
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin h-4 w-4 text-white"
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
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <span>Continue to Payment</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Right Sidebar - Summary */}
          <aside className="space-y-6">
            {/* Your Order Summary card */}
            <div className="bg-white rounded-3xl border border-border/80 p-6 sm:p-8 shadow-sm">
              <h3 className="font-display text-lg font-bold text-navy-deep mb-4">Your Order</h3>

              {cart ? (
                <div className="space-y-6">
                  <div className="rounded-2xl bg-[#f8f9fa] p-5 border border-border/40">
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0a7a9b]/10 text-[#0a7a9b]">
                        <Briefcase className="h-5 w-5" />
                      </div>
                      <div>
                        {cart.selectedType === "package" ? (
                          <>
                            <h4 className="text-sm font-bold text-navy-deep">
                              {cart.selectedPackage?.name} Package
                            </h4>
                            {cart.selectedPackage?.popular && (
                              <span className="inline-block rounded-full bg-[#0a7a9b]/10 border border-[#0a7a9b]/20 text-[#0a7a9b] text-[9px] font-bold px-2 py-0.5 mt-1 uppercase">
                                Most Popular
                              </span>
                            )}
                          </>
                        ) : (
                          <h4 className="text-sm font-bold text-navy-deep">Custom Package</h4>
                        )}
                        <p className="text-[10px] text-foreground/50 mt-1 uppercase font-bold tracking-wider">
                          {cart.levelId} Level
                        </p>

                        {/* Bullet checklist */}
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
                      <span className="text-foreground/60 font-semibold">
                        {cart.selectedType === "package" ? "Package Price" : "Base Services"}
                      </span>
                      <span className="text-navy-deep font-extrabold">${pricing.subtotal}</span>
                    </div>

                    {pricing.rushTotal > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-foreground/60 font-semibold">
                          Rush Service (2 Days)
                        </span>
                        <span className="text-[#0a7a9b] font-extrabold">+${pricing.rushTotal}</span>
                      </div>
                    )}

                    <div className="flex justify-between items-baseline border-t border-border/60 pt-4">
                      <span className="text-navy-deep font-bold text-base">Total</span>
                      <span className="font-display text-2xl font-extrabold text-[#0a7a9b]">
                        ${pricing.total}
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
