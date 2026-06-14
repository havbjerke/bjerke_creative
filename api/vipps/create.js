// POST /api/vipps/create
// Oppretter en Vipps-betaling og returnerer { reference, redirectUrl }.
// Frontend sender brukeren videre til redirectUrl (Vipps).

const { randomUUID } = require("crypto");
const { VIPPS_BASE, getAccessToken, vippsHeaders } = require("../../lib/vipps");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
    const { amount, serviceName, phone, returnUrl } = body;

    if (!amount || !returnUrl) {
      return res.status(400).json({ error: "Mangler amount eller returnUrl" });
    }

    const reference = "agm-" + randomUUID();
    const token = await getAccessToken();

    // Bygg retur-URL tilbake til nettsiden med referanse.
    const sep = returnUrl.includes("?") ? "&" : "?";
    const fullReturnUrl = `${returnUrl}${sep}vipps=return&reference=${encodeURIComponent(reference)}`;

    const payload = {
      amount: {
        currency: "NOK",
        value: Math.round(Number(amount) * 100), // beløp i øre
      },
      paymentMethod: { type: "WALLET" },
      reference,
      userFlow: "WEB_REDIRECT",
      returnUrl: fullReturnUrl,
      paymentDescription: serviceName
        ? `Agrolife Mysen – ${serviceName}`
        : "Agrolife Mysen booking",
    };

    // Forhåndsutfyll telefonnummer i Vipps hvis vi har det (norsk MSISDN: 47xxxxxxxx).
    if (phone) {
      const digits = String(phone).replace(/\D/g, "");
      const msisdn = digits.length === 8 ? "47" + digits : digits;
      if (msisdn.length >= 10) payload.customer = { phoneNumber: msisdn };
    }

    const r = await fetch(`${VIPPS_BASE}/epayment/v1/payments`, {
      method: "POST",
      headers: vippsHeaders(token, randomUUID()),
      body: JSON.stringify(payload),
    });

    const data = await r.json().catch(() => ({}));
    if (!r.ok || !data.redirectUrl) {
      return res.status(r.status || 502).json({ error: "Vipps avviste betalingen", details: data });
    }

    return res.status(200).json({ reference, redirectUrl: data.redirectUrl });
  } catch (e) {
    return res.status(500).json({ error: String(e.message || e) });
  }
};
