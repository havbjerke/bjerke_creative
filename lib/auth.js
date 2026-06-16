// Enkel admin-autentisering med signert sesjons-cookie (HMAC).
const crypto = require("crypto");

const SECRET = process.env.ADMIN_SECRET || process.env.ADMIN_PASSWORD || "bstrafikkskole-dev-secret";

function safeEqual(a, b) {
  const ab = Buffer.from(String(a));
  const bb = Buffer.from(String(b));
  if (ab.length !== bb.length) return false;
  return crypto.timingSafeEqual(ab, bb);
}

function sign(payload) {
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const sig = crypto.createHmac("sha256", SECRET).update(body).digest("base64url");
  return `${body}.${sig}`;
}

function verify(token) {
  if (!token || token.indexOf(".") < 0) return null;
  const [body, sig] = token.split(".");
  const expected = crypto.createHmac("sha256", SECRET).update(body).digest("base64url");
  if (!safeEqual(sig, expected)) return null;
  try {
    const p = JSON.parse(Buffer.from(body, "base64url").toString());
    if (p.exp && Date.now() > p.exp) return null;
    return p;
  } catch (e) {
    return null;
  }
}

function parseCookies(req) {
  const h = req.headers.cookie || "";
  return Object.fromEntries(
    h.split(";")
      .map((c) => c.trim())
      .filter(Boolean)
      .map((c) => {
        const i = c.indexOf("=");
        return [c.slice(0, i), decodeURIComponent(c.slice(i + 1))];
      })
  );
}

function requireAdmin(req) {
  return verify(parseCookies(req).admin_session);
}

module.exports = { sign, verify, parseCookies, requireAdmin, safeEqual };
