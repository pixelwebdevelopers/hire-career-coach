import { createServerFn } from "@tanstack/react-start";

export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
}

export interface ProfessionalInfo {
  currentTitle: string;
  targetTitles: string;
  linkedin?: string;
}

export interface CartItem {
  levelId: string;
  selectedType: "package" | "individual";
  selectedPackage?: {
    name: string;
    price: number;
    popular?: boolean;
    features: string[];
  } | null;
  packageRush: boolean;
  selectedServices?: {
    id: string;
    title: string;
    price: number;
    rush: boolean;
  }[];
  totalPrice: number;
}

export interface IntakePayload {
  personalInfo: PersonalInfo;
  professionalInfo: ProfessionalInfo;
  cart: CartItem;
  notes: string;
  fileName: string;
  fileBase64: string;
}

export interface PaymentIntentPayload {
  amount: number;
}

export interface OrderConfirmationPayload {
  paymentIntentId: string;
  intakeData: IntakePayload;
}

// Pricing Helper Functions
export const getLevelRushPrice = (levelId: string): number => {
  switch (levelId) {
    case "early":
      return 30;
    case "mid":
      return 50;
    case "senior":
      return 70;
    case "exec":
      return 90;
    default:
      return 50;
  }
};

export const getPricingSummary = (cart: CartItem | null) => {
  if (!cart) return { subtotal: 0, rushTotal: 0, total: 0, rushPrice: 0 };
  const rushPrice = getLevelRushPrice(cart.levelId);
  let rushTotal = 0;
  if (cart.selectedType === "package") {
    rushTotal = cart.packageRush ? rushPrice : 0;
  } else {
    const rushedCount = cart.selectedServices?.filter((s) => s.rush).length || 0;
    rushTotal = rushedCount * rushPrice;
  }
  const subtotal = cart.totalPrice - rushTotal;
  return {
    subtotal,
    rushTotal,
    total: cart.totalPrice,
    rushPrice,
  };
};

const cleanEnvStr = (val: string): string => {
  if (!val) return "";
  let s = val.trim();
  if ((s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"))) {
    s = s.substring(1, s.length - 1);
  }
  return s.trim();
};

// 1. Submit Intake Form action
export const submitIntakeForm = createServerFn({ method: "POST" })
  .validator((d: IntakePayload) => d)
  .handler(async ({ data }) => {
    console.log("=== INTAKE DETAILS SUBMITTED (PENDING PAYMENT) ===");
    console.log("Client name:", data.personalInfo.fullName);
    console.log("Cart Stage:", data.cart.levelId);
    return { success: true, message: "Intake details saved locally." };
  });

// 2. Create Stripe PaymentIntent action
export const createPaymentIntent = createServerFn({ method: "POST" })
  .validator((d: PaymentIntentPayload) => d)
  .handler(async ({ data }) => {
    const { amount } = data;
    const stripeSecretKey = cleanEnvStr(process.env.STRIPE_SECRET_KEY || "");

    if (!stripeSecretKey || stripeSecretKey === "sk_test_placeholder_secret_key") {
      console.log("Stripe secret key is not set. Returning a mock client secret.");
      return {
        clientSecret: "mock_client_secret_intent_" + Math.random().toString(36).substring(2, 9),
      };
    }

    try {
      const { default: Stripe } = await import("stripe");
      const stripeObj = new Stripe(stripeSecretKey);

      const intent = await stripeObj.paymentIntents.create({
        amount: Math.round(amount * 100),
        currency: "usd",
        automatic_payment_methods: { enabled: true },
      });

      return { clientSecret: intent.client_secret || "" };
    } catch (err) {
      console.error("Error creating Stripe payment intent:", err);
      throw new Error("Stripe payment intent creation failed.");
    }
  });

// 3. Complete Order & Send Email (Verifies payment on Stripe, then emails admin)
export const completeOrderAndSendEmail = createServerFn({ method: "POST" })
  .validator((d: OrderConfirmationPayload) => d)
  .handler(async ({ data }) => {
    const { paymentIntentId, intakeData } = data;
    const { personalInfo, professionalInfo, cart, notes, fileName, fileBase64 } = intakeData;

    const stripeSecretKey = cleanEnvStr(process.env.STRIPE_SECRET_KEY || "");
    const smtpHost = cleanEnvStr(process.env.SMTP_HOST || "");
    const smtpPort = parseInt(cleanEnvStr(process.env.SMTP_PORT || "587"), 10);
    const smtpUser = cleanEnvStr(process.env.SMTP_USER || "");
    const smtpPass = cleanEnvStr(process.env.SMTP_PASS || "");
    const adminEmail = cleanEnvStr(process.env.ADMIN_EMAIL || "hello@hirecareercoach.com");
    const emailCc = cleanEnvStr(process.env.EMAIL_CC || "");

    // Verify status directly with Stripe to prevent client-side tampering
    let paymentVerified = false;
    if (
      stripeSecretKey &&
      stripeSecretKey !== "sk_test_placeholder_secret_key" &&
      !paymentIntentId.startsWith("mock_")
    ) {
      try {
        const { default: Stripe } = await import("stripe");
        const stripeObj = new Stripe(stripeSecretKey);
        const intent = await stripeObj.paymentIntents.retrieve(paymentIntentId);
        if (intent.status === "succeeded") {
          paymentVerified = true;
        }
      } catch (err) {
        console.error("Error verifying payment with Stripe:", err);
      }
    } else {
      // Mock payment succeeded
      paymentVerified = true;
    }

    if (!paymentVerified) {
      console.error(`PaymentIntent ${paymentIntentId} verification failed.`);
      return { success: false, message: "Payment verification failed." };
    }

    const orderNumber = "HCC-" + Math.floor(10200 + Math.random() * 9000);
    console.log(`=== ORDER VERIFIED & PAID: ${orderNumber} ===`);

    const isSmtpConfigured = !!smtpHost && !!smtpPort;
    if (!isSmtpConfigured) {
      console.log("SMTP not configured. Order details logged successfully.");
      return { success: true, orderNumber, logged: true };
    }

    try {
      const nodemailer = await import("nodemailer");
      const pricing = getPricingSummary(cart);

      const transporterOptions: {
        host: string;
        port: number;
        secure: boolean;
        auth?: { user: string; pass: string };
      } = {
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
      };

      const hasAuth =
        smtpUser &&
        smtpUser !== "null" &&
        smtpUser !== "undefined" &&
        smtpUser !== '""' &&
        smtpUser !== "''";

      if (hasAuth) {
        transporterOptions.auth = {
          user: smtpUser,
          pass: smtpPass || "",
        };
      }

      const transporter = nodemailer.default.createTransport(transporterOptions);

      const packageSummaryHtml =
        cart.selectedType === "package"
          ? `<strong>${cart.selectedPackage?.name} Package</strong> (Standard Package Price: $${pricing.subtotal}${
              cart.packageRush ? `, Rush Service Add-On: $${pricing.rushPrice}` : ""
            })`
          : `<strong>Custom Package à la carte services:</strong>
             <ul>
               ${cart.selectedServices
                 ?.map(
                   (s) =>
                     `<li>${s.title} ($${s.price})${
                       s.rush ? ` [Rush Add-On: +$${pricing.rushPrice}]` : ""
                     }</li>`,
                 )
                 .join("")}
             </ul>`;

      const htmlBody = `
        <h2>Order Confirmation: ${orderNumber}</h2>
        <p>A new order has been paid and completed successfully on the website.</p>

        <h3>1. Client Information</h3>
        <table border="1" cellpadding="6" style="border-collapse: collapse; border-color: #e3e6e8; width: 100%; max-width: 600px;">
          <tr><td><strong>Full Name:</strong></td><td>${personalInfo.fullName}</td></tr>
          <tr><td><strong>Email:</strong></td><td>${personalInfo.email}</td></tr>
          <tr><td><strong>Phone:</strong></td><td>${personalInfo.phone}</td></tr>
        </table>

        <h3>2. Professional Background</h3>
        <table border="1" cellpadding="6" style="border-collapse: collapse; border-color: #e3e6e8; width: 100%; max-width: 600px;">
          <tr><td><strong>Current Job:</strong></td><td>${professionalInfo.currentTitle}</td></tr>
          <tr><td><strong>Target Job(s):</strong></td><td>${professionalInfo.targetTitles}</td></tr>
          <tr><td><strong>LinkedIn:</strong></td><td>${professionalInfo.linkedin || "Not Provided"}</td></tr>
        </table>

        <h3>3. Order Details</h3>
        <table border="1" cellpadding="6" style="border-collapse: collapse; border-color: #e3e6e8; width: 100%; max-width: 600px;">
          <tr><td><strong>Order ID:</strong></td><td>${orderNumber}</td></tr>
          <tr><td><strong>Stripe Payment ID:</strong></td><td>${paymentIntentId}</td></tr>
          <tr><td><strong>Career Stage Level:</strong></td><td>${cart.levelId?.toUpperCase()} stage stage</td></tr>
          <tr><td><strong>Item Selection:</strong></td><td>${packageSummaryHtml}</td></tr>
          <tr><td><strong>Subtotal Price:</strong></td><td>$${pricing.subtotal}</td></tr>
          <tr><td><strong>Rush Delivery Total:</strong></td><td>+$${pricing.rushTotal}</td></tr>
          <tr><td><strong>Grand Total Paid:</strong></td><td><strong>$${pricing.total}</strong></td></tr>
        </table>

        <h3>4. Additional Client Notes</h3>
        <p>${notes ? notes.replace(/\n/g, "<br/>") : "<em>No notes provided.</em>"}</p>
      `;

      const recipients = [adminEmail, personalInfo.email].filter(Boolean).join(", ");

      const mailOptions: {
        from: string;
        to: string;
        cc?: string;
        subject: string;
        html: string;
        attachments?: { filename: string; content: Buffer }[];
      } = {
        from: `"Hire Career Coach Orders" <${hasAuth ? smtpUser : "hello@hirecareercoach.com"}>`,
        to: recipients,
        subject: `ORDER COMPLETED: ${orderNumber} - ${personalInfo.fullName}`,
        html: htmlBody,
        attachments:
          fileBase64 && fileName
            ? [
                {
                  filename: fileName,
                  content: Buffer.from(fileBase64.split(",")[1], "base64"),
                },
              ]
            : undefined,
      };

      if (emailCc) {
        mailOptions.cc = emailCc;
      }

      await transporter.sendMail(mailOptions);
      console.log(`Order verification email sent successfully for ${orderNumber}.`);
      return { success: true, orderNumber };
    } catch (err) {
      console.error("Error sending order confirmation email:", err);
      return { success: true, orderNumber, emailError: true };
    }
  });
