// E-postsending via Resend (https://resend.com) + HTML-maler.
// Hemmelig API-nøkkel leses fra env (RESEND_API_KEY), aldri fra nettleseren.

async function sendEmail(payload) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("Mangler miljøvariabel: RESEND_API_KEY");
  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!r.ok) throw new Error(`Resend (${r.status}): ${await r.text()}`);
  return r.json();
}

const esc = (s) =>
  String(s == null ? "" : s).replace(/[&<>"]/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

function row(label, value) {
  if (!value) return "";
  return `<tr>
    <td style="padding:8px 0;color:#6a7268;font-size:14px;">${esc(label)}</td>
    <td style="padding:8px 0;color:#21281f;font-size:14px;font-weight:600;text-align:right;">${esc(value)}</td>
  </tr>`;
}

function shell(title, intro, b) {
  return `<!doctype html><html><body style="margin:0;background:#f7f3ec;font-family:Arial,Helvetica,sans-serif;">
  <div style="max-width:520px;margin:0 auto;padding:24px;">
    <div style="background:#0e2440;border-radius:16px 16px 0 0;padding:22px 24px;color:#fff;">
      <div style="font-size:18px;font-weight:700;">🚗 BS Trafikkskole</div>
      <div style="font-size:12px;opacity:.8;">Kjøreskole · Folkenborgveien 2, 1850 Mysen</div>
    </div>
    <div style="background:#fff;border:1px solid #dde5ef;border-top:none;border-radius:0 0 16px 16px;padding:24px;">
      <h1 style="margin:0 0 8px;font-size:20px;color:#0e2440;">${esc(title)}</h1>
      <p style="margin:0 0 18px;color:#5d6b80;font-size:14px;line-height:1.5;">${intro}</p>
      <table style="width:100%;border-collapse:collapse;border-top:1px solid #eee;">${b}</table>
      <p style="margin:20px 0 0;color:#9aa093;font-size:12px;">Trenger du å endre eller avbestille timen, svar på denne e-posten eller ta kontakt med oss.</p>
    </div>
  </div></body></html>`;
}

function customerHtml(d) {
  const c = d.customer || {};
  const body =
    row("Kurs / time", d.service) +
    row("Tid", d.when) +
    row("Sted", "Folkenborgveien 2, 1850 Mysen") +
    row("Fødselsår", c.birthYear) +
    row("Betalt med", d.paymentMethod) +
    row("Referanse", d.reference) +
    row("Beløp", d.price != null ? `${d.price} kr` : "");
  const navn = c.name ? c.name.split(" ")[0] : "";
  return shell(
    "Timen din er booket!",
    `Hei${navn ? " " + esc(navn) : ""}! Tusen takk for bestillingen. Her er bekreftelsen din – vi gleder oss til å se deg.`,
    body
  );
}

function schoolHtml(d) {
  const c = d.customer || {};
  const body =
    row("Kurs / time", d.service) +
    row("Tid", d.when) +
    row("Elev", c.name) +
    row("Telefon", c.phone) +
    row("E-post", c.email) +
    row("Fødselsår", c.birthYear) +
    row("Melding", c.note) +
    row("Betalt med", d.paymentMethod) +
    row("Referanse", d.reference) +
    row("Beløp", d.price != null ? `${d.price} kr` : "");
  return shell("Ny booking", "Det har kommet inn en ny timebestilling:", body);
}

function statusHtml(d, action) {
  const c = d.customer || {};
  const accepted = action === "accept";
  const body =
    row("Kurs / time", d.service) +
    row("Tid", d.when) +
    row("Sted", "Folkenborgveien 2, 1850 Mysen") +
    row("Referanse", d.reference);
  const navn = c.name ? c.name.split(" ")[0] : "";
  return shell(
    accepted ? "Timen din er bekreftet ✓" : "Timen din er dessverre avlyst",
    accepted
      ? `Hei${navn ? " " + esc(navn) : ""}! Vi bekrefter timen din. Velkommen til BS Trafikkskole.`
      : `Hei${navn ? " " + esc(navn) : ""}. Timen din er dessverre avlyst. Ta gjerne kontakt for å finne et nytt tidspunkt.`,
    body
  );
}

module.exports = { sendEmail, customerHtml, schoolHtml, statusHtml };

