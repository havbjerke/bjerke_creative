// POST /api/bookings
// Oppretter en booking: lagrer i database (best effort) og sender bekreftelsesmail.

const { randomUUID } = require("crypto");
const kv = require("../lib/kv");
const { sendEmail, customerHtml, schoolHtml } = require("../lib/email");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }
  try {
    const b = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
    const { service, price, when, customer = {}, paymentMethod } = b;
    if (!service) return res.status(400).json({ error: "Mangler tjeneste" });

    const id = randomUUID();
    const reference = "BST-" + id.slice(0, 5).toUpperCase();
    const booking = {
      id, reference, service,
      price: typeof price === "number" ? price : null,
      when: when || null,
      customer: {
        name: customer.name || "",
        email: customer.email || "",
        phone: customer.phone || "",
        birthYear: customer.birthYear || "",
        note: customer.note || "",
      },
      paymentMethod: paymentMethod || null,
      status: "ny",
      createdAt: Date.now(),
    };

    // Lagre i database (best effort – booking skal ikke feile om KV mangler)
    if (kv.kvConfigured()) {
      try {
        await kv.set(`booking:${id}`, JSON.stringify(booking));
        await kv.lpush("bookings:index", id);
      } catch (e) { /* ignorer lagringsfeil */ }
    }

    // Send e-post (best effort)
    const from = process.env.MAIL_FROM || "BS Trafikkskole <onboarding@resend.dev>";
    const schoolEmail = process.env.SCHOOL_EMAIL || process.env.SALON_EMAIL;
    let emailed = false;
    try {
      if (booking.customer.email) {
        await sendEmail({ from, to: booking.customer.email, subject: `Bekreftelse: ${service} hos BS Trafikkskole`, html: customerHtml(booking) });
        emailed = true;
      }
      if (schoolEmail) {
        await sendEmail({ from, to: schoolEmail, subject: `Ny booking: ${service} – ${booking.customer.name}`, html: schoolHtml(booking) });
      }
    } catch (e) { /* e-postfeil skal ikke blokkere bookingen */ }

    return res.status(200).json({ ok: true, reference, emailed });
  } catch (e) {
    return res.status(500).json({ error: String(e.message || e) });
  }
};
