// POST /api/admin/login  { password } -> setter sesjons-cookie
const { sign, safeEqual } = require("../../lib/auth");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return res.status(500).json({ error: "ADMIN_PASSWORD er ikke satt i miljøvariablene" });

  const b = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
  if (!b.password || !safeEqual(b.password, expected)) {
    return res.status(401).json({ error: "Feil passord" });
  }

  const token = sign({ role: "admin", exp: Date.now() + 1000 * 60 * 60 * 12 }); // 12 timer
  res.setHeader("Set-Cookie", `admin_session=${token}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=${60 * 60 * 12}`);
  return res.status(200).json({ ok: true });
};
