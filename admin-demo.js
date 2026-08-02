/* DEMO-versjon av adminpanelet – kjører helt i nettleseren med eksempeldata.
   Ingen backend/database. Kun for å vise/teste hvordan panelet fungerer. */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const fmtPrice = (n) => (typeof n === "number" ? n.toLocaleString("no-NO") + " kr" : "—");
const H = 3600e3, D = 24 * H;

let filter = "alle";
let query = "";

// Eksempeldata
let ALL = [
  { id: "1", reference: "AGM-7F3A2", service: "Klipp Liten hund (maks 9 kg)", price: 850, when: "man 15.jun kl. 14:00", status: "ny", createdAt: Date.now() - 2 * H, paymentMethod: "Visa •••• 4242 ✓", customer: { name: "Kari Nordmann", email: "kari@epost.no", phone: "90000000", dog: "Nanna, bichon havanais", note: "Litt floker bak ørene" } },
  { id: "2", reference: "AGM-3B8C1", service: "Napping liten hund", price: 1300, when: "ti 16.jun kl. 09:00", status: "ny", createdAt: Date.now() - 6 * H, paymentMethod: "Mastercard •••• 5555 ✓", customer: { name: "Unni Rud", email: "unni@epost.no", phone: "91234567", dog: "Alf", note: "" } },
  { id: "3", reference: "AGM-2B11C", service: "Bad/Føn Medium hund (10–20 kg)", price: 400, when: "on 17.jun kl. 11:00", status: "akseptert", createdAt: Date.now() - 1 * D, paymentMethod: "Apple Pay ✓", customer: { name: "Ola Hansen", email: "ola@epost.no", phone: "92222222", dog: "Bjarne", note: "" } },
  { id: "4", reference: "AGM-5D4E9", service: "Klipp Medium hund (10–20 kg)", price: 950, when: "to 18.jun kl. 13:30", status: "akseptert", createdAt: Date.now() - 2 * D, paymentMethod: "Visa •••• 1881 ✓", customer: { name: "Åse Fjeld", email: "ase@epost.no", phone: "93333333", dog: "Luna, cockapoo", note: "Kommer 10 min før" } },
  { id: "5", reference: "AGM-9C0DD", service: "Kloklipp", price: 100, when: "fr 19.jun kl. 10:00", status: "kansellert", createdAt: Date.now() - 3 * D, paymentMethod: "Google Pay ✓", customer: { name: "Mette Lie", email: "mette@epost.no", phone: "94444444", dog: "Rex", note: "" } },
  { id: "6", reference: "AGM-1A2B3", service: "Klipp Stor hund (20+ kg)", price: 1050, when: "lø 20.jun kl. 12:00", status: "akseptert", createdAt: Date.now() - 4 * D, paymentMethod: "Mastercard •••• 0004 ✓", customer: { name: "Britt Olsen", email: "britt@epost.no", phone: "95555555", dog: "Trulte", note: "Redd for føn – ta det rolig" } },
];

/* ---------- Login ---------- */
$("#login-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const err = $("#login-error");
  if ($("#pwd").value.trim().toLowerCase() === "demo") {
    err.textContent = "";
    $("#login").hidden = true;
    $("#dash").hidden = false;
    render();
  } else {
    err.textContent = 'Feil passord. Prøv «demo».';
  }
});
$("#logout").addEventListener("click", () => location.reload());
$("#refresh").addEventListener("click", render);
$("#search").addEventListener("input", (e) => { query = e.target.value.toLowerCase().trim(); renderBookings(); });
$("#filters").addEventListener("click", (e) => {
  const b = e.target.closest("[data-filter]");
  if (!b) return;
  filter = b.dataset.filter;
  $$(".filter").forEach((f) => f.classList.toggle("is-active", f === b));
  renderBookings();
});

/* ---------- Render ---------- */
function render() { renderStats(); renderChart(); renderBookings(); }

function renderStats() {
  let accepted = 0, cancelled = 0, pending = 0, revenue = 0;
  ALL.forEach((b) => {
    if (b.status === "akseptert") accepted++;
    else if (b.status === "kansellert") cancelled++;
    else pending++;
    if (b.status !== "kansellert") revenue += b.price;
  });
  const cards = [
    { label: "Bestillinger totalt", value: ALL.length, sub: ALL.length + " denne måneden" },
    { label: "Nye / venter", value: pending, sub: "krever svar" },
    { label: "Aksepterte", value: accepted, sub: cancelled + " kansellert" },
    { label: "Omsetning", value: fmtPrice(revenue), sub: "ekskl. kansellerte" },
    { label: "Besøk i dag", value: 18, sub: "342 totalt" },
  ];
  $("#stat-grid").innerHTML = cards.map((c) => `
    <div class="stat">
      <div class="stat-label">${c.label}</div>
      <div class="stat-value">${c.value}</div>
      <div class="stat-sub">${c.sub}</div>
    </div>`).join("");
}

function renderChart() {
  const sample = [12, 6, 9, 21, 7, 15, 11, 19, 8, 22, 14, 6, 17, 18];
  const now = new Date();
  const days = sample.map((count, i) => {
    const d = new Date(now); d.setDate(d.getDate() - (13 - i));
    return { day: d.toISOString().slice(0, 10), count };
  });
  const max = Math.max(...sample);
  $("#chart").classList.add("chart-wrap");
  $("#chart").innerHTML = days.map((d) => {
    const h = Math.round((d.count / max) * 100);
    const label = d.day.slice(8) + "." + d.day.slice(5, 7);
    return `<div class="bar" style="height:${Math.max(3, h)}%" title="${d.day}: ${d.count} besøk"><b>${d.count}</b><span>${label}</span></div>`;
  }).join("");
}

function renderBookings() {
  const list = ALL.slice().sort((a, b) => b.createdAt - a.createdAt).filter((b) => {
    if (filter !== "alle" && b.status !== filter) return false;
    if (!query) return true;
    return `${b.customer.name} ${b.customer.dog} ${b.customer.phone} ${b.customer.email} ${b.service} ${b.reference}`.toLowerCase().includes(query);
  });
  if (!list.length) { $("#bookings").innerHTML = `<p class="empty">Ingen bestillinger her.</p>`; return; }

  $("#bookings").innerHTML = list.map((b) => {
    const c = b.customer;
    const created = new Date(b.createdAt).toLocaleString("no-NO", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" });
    const meta = [
      c.phone ? `📞 <a href="tel:${c.phone}">${c.phone}</a>` : "",
      c.email ? `✉️ <a href="mailto:${c.email}">${c.email}</a>` : "",
      c.dog ? `🐶 ${esc(c.dog)}` : "",
      b.paymentMethod ? `💳 ${esc(b.paymentMethod)}` : "",
    ].filter(Boolean).join("");
    const actions = b.status === "ny"
      ? `<div class="bk-buttons"><button class="btn btn-sm btn-accept" data-act="accept" data-id="${b.id}">✓ Aksepter</button><button class="btn btn-sm btn-cancel" data-act="cancel" data-id="${b.id}">✕ Avlys</button></div>`
      : b.status === "akseptert"
        ? `<div class="bk-buttons"><button class="btn btn-sm btn-cancel" data-act="cancel" data-id="${b.id}">✕ Avlys</button></div>`
        : `<div class="bk-buttons"><button class="btn btn-sm btn-accept" data-act="accept" data-id="${b.id}">✓ Gjenåpne</button></div>`;
    return `
      <div class="bk-row s-${b.status}">
        <div class="bk-main">
          <h3>${esc(b.service)}</h3>
          <div class="bk-when">${esc(b.when)} · ${esc(c.name)}</div>
          <div class="bk-meta">${meta}</div>
          ${c.note ? `<div class="bk-note">📝 ${esc(c.note)}</div>` : ""}
          <div class="ref">${b.reference} · mottatt ${created}</div>
        </div>
        <div class="bk-side">
          <span class="badge ${b.status}">${b.status}</span>
          <span class="bk-price">${fmtPrice(b.price)}</span>
          ${actions}
        </div>
      </div>`;
  }).join("");
}

$("#bookings").addEventListener("click", (e) => {
  const btn = e.target.closest("[data-act]");
  if (!btn) return;
  const { act, id } = btn.dataset;
  if (act === "cancel" && !confirm("Avlyse denne timen? (I ekte versjon får kunden e-postvarsel.)")) return;
  const bk = ALL.find((b) => b.id === id);
  if (bk) bk.status = act === "accept" ? "akseptert" : "kansellert";
  render();
});

function esc(s) {
  return String(s == null ? "" : s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
}
