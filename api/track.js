// POST /api/track – teller et sidebesøk (totalt + per dag).
const kv = require("../lib/kv");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }
  try {
    if (kv.kvConfigured()) {
      const day = new Date().toISOString().slice(0, 10);
      try {
        await kv.incr("stats:visits");
        await kv.incr(`stats:visits:${day}`);
      } catch (e) { /* ignorer */ }
    }
    return res.status(200).json({ ok: true });
  } catch (e) {
    return res.status(200).json({ ok: false });
  }
};
