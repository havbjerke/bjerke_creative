// POST /api/bookings
// Oppretter en booking: lagrer i database (best effort) og sender bekreftelsesmail.

const { randomUUID } = require("crypto");
const kv = require("../lib/kv");
const { sendEmail, customerHtml, salonHtml } = require("../lib/email");

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
    const reference = "AGM-" + id.slice(0, 5).toUpperCase();
    const booking = {
      id, reference, service,
      price: typeof price === "number" ? price : null,
      when: when || null,
      customer: {
        name: customer.name || "",
        email: customer.email || "",
        phone: customer.phone || "",
        dog: customer.dog || "",
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
    const from = process.env.MAIL_FROM || "Agrolife Mysen <onboarding@resend.dev>";
    let emailed = false;
    try {
      if (booking.customer.email) {
        await sendEmail({ from, to: booking.customer.email, subject: `Bekreftelse: ${service} hos Agrolife Mysen`, html: customerHtml(booking) });
        emailed = true;
      }
      if (process.env.SALON_EMAIL) {
        await sendEmail({ from, to: process.env.SALON_EMAIL, subject: `Ny booking: ${service} – ${booking.customer.name}`, html: salonHtml(booking) });
      }
    } catch (e) { /* e-postfeil skal ikke blokkere bookingen */ }

    return res.status(200).json({ ok: true, reference, emailed });
  } catch (e) {
    return res.status(500).json({ error: String(e.message || e) });
  }
};
