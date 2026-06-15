// POST /api/send-confirmation
// Sender bekreftelsesmail til kunden og varsel til salongen (Torild).
//
// Env-variabler:
//   RESEND_API_KEY   – API-nøkkel fra https://resend.com
//   MAIL_FROM        – avsender, f.eks. "Agrolife Mysen <booking@dittdomene.no>"
//   SALON_EMAIL      – e-post som skal motta varsel om nye bookinger

const { sendEmail, customerHtml, salonHtml } = require("../lib/email");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const from = process.env.MAIL_FROM || "Agrolife Mysen <onboarding@resend.dev>";
    const salonEmail = process.env.SALON_EMAIL;

    const d = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
    if (!d.reference || !d.service) {
      return res.status(400).json({ error: "Mangler bookingdata" });
    }
    const customer = d.customer || {};
    const sent = [];

    // 1) Bekreftelse til kunden
    if (customer.email) {
      await sendEmail({
        from,
        to: customer.email,
        reply_to: salonEmail || undefined,
        subject: `Bekreftelse: ${d.service} hos Agrolife Mysen`,
        html: customerHtml(d),
      });
      sent.push(customer.email);
    }

    // 2) Varsel til salongen
    if (salonEmail) {
      await sendEmail({
        from,
        to: salonEmail,
        reply_to: customer.email || undefined,
        subject: `Ny booking: ${d.service}${customer.name ? " – " + customer.name : ""}`,
        html: salonHtml(d),
      });
    }

    return res.status(200).json({ ok: true, sent });
  } catch (e) {
    return res.status(500).json({ error: String(e.message || e) });
  }
};
