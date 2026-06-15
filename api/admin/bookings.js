// GET  /api/admin/bookings            -> liste over bookinger
// POST /api/admin/bookings { id, action: 'accept'|'cancel' } -> oppdater status
const { requireAdmin } = require("../../lib/auth");
const kv = require("../../lib/kv");
const { sendEmail, statusHtml } = require("../../lib/email");

module.exports = async (req, res) => {
  if (!requireAdmin(req)) return res.status(401).json({ error: "Ikke autorisert" });
  if (!kv.kvConfigured()) return res.status(200).json({ bookings: [], kv: false });

  try {
    if (req.method === "GET") {
      const ids = (await kv.lrange("bookings:index", 0, -1)) || [];
      const vals = await kv.mget(ids.map((id) => `booking:${id}`));
      const bookings = (vals || []).filter(Boolean).map((v) => JSON.parse(v));
      return res.status(200).json({ bookings, kv: true });
    }

    if (req.method === "POST") {
      const b = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
      const { id, action } = b;
      if (!id || !["accept", "cancel"].includes(action)) {
        return res.status(400).json({ error: "Ugyldig forespørsel" });
      }
      const raw = await kv.get(`booking:${id}`);
      if (!raw) return res.status(404).json({ error: "Finner ikke bookingen" });

      const booking = JSON.parse(raw);
      booking.status = action === "accept" ? "akseptert" : "kansellert";
      booking.updatedAt = Date.now();
      await kv.set(`booking:${id}`, JSON.stringify(booking));

      // Varsle kunden (best effort)
      if (booking.customer && booking.customer.email) {
        try {
          await sendEmail({
            from: process.env.MAIL_FROM || "Agrolife Mysen <onboarding@resend.dev>",
            to: booking.customer.email,
            subject: action === "accept" ? "Timen din er bekreftet – Agrolife Mysen" : "Timen din er avlyst – Agrolife Mysen",
            html: statusHtml(booking, action),
          });
        } catch (e) { /* ignorer */ }
      }

      return res.status(200).json({ ok: true, booking });
    }

    res.setHeader("Allow", "GET, POST");
    return res.status(405).json({ error: "Method not allowed" });
  } catch (e) {
    return res.status(500).json({ error: String(e.message || e) });
  }
};
