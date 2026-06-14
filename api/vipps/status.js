// GET /api/vipps/status?reference=...
// Sjekker status på en Vipps-betaling. Når den er AUTHORIZED trekkes
// (captures) beløpet automatisk, og state rapporteres som CAPTURED.

const { randomUUID } = require("crypto");
const { VIPPS_BASE, getAccessToken, vippsHeaders } = require("../../lib/vipps");

module.exports = async (req, res) => {
  const reference = req.query && req.query.reference;
  if (!reference) {
    return res.status(400).json({ error: "Mangler reference" });
  }

  try {
    const token = await getAccessToken();
    const ref = encodeURIComponent(reference);

    const r = await fetch(`${VIPPS_BASE}/epayment/v1/payments/${ref}`, {
      headers: vippsHeaders(token),
    });
    const data = await r.json().catch(() => ({}));
    if (!r.ok) {
      return res.status(r.status).json({ error: "Kunne ikke hente status", details: data });
    }

    let state = data.state; // CREATED | AUTHORIZED | TERMINATED | ABORTED | EXPIRED

    // Trekk beløpet når kunden har godkjent i Vipps.
    if (state === "AUTHORIZED") {
      const cap = await fetch(`${VIPPS_BASE}/epayment/v1/payments/${ref}/capture`, {
        method: "POST",
        headers: vippsHeaders(token, randomUUID()),
        body: JSON.stringify({ modificationAmount: data.amount }),
      });
      if (cap.ok) state = "CAPTURED";
    }

    return res.status(200).json({ reference, state, amount: data.amount || null });
  } catch (e) {
    return res.status(500).json({ error: String(e.message || e) });
  }
};
