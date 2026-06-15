/* Admin-dashbord for Agrolife Mysen */
const $ = (s, r = document) => r.querySelector(s);
const fmtPrice = (n) => (typeof n === "number" ? n.toLocaleString("no-NO") + " kr" : "—");

let ALL = [];
let filter = "alle";
let query = "";

/* ---------- Login ---------- */
$("#login-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const err = $("#login-error");
  err.textContent = "";
  try {
    const r = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: $("#pwd").value }),
    });
    if (!r.ok) {
      const d = await r.json().catch(() => ({}));
      throw new Error(d.error || "Innlogging feilet");
    }
    showDash();
  } catch (e2) {
    err.textContent = e2.message;
  }
});

$("#logout").addEventListener("click", async () => {
  await fetch("/api/admin/logout", { method: "POST" }).catch(() => {});
  location.reload();
});
$("#refresh").addEventListener("click", loadAll);

$("#search").addEventListener("input", (e) => { query = e.target.value.toLowerCase().trim(); renderBookings(); });
$("#filters").addEventListener("click", (e) => {
  const b = e.target.closest("[data-filter]");
  if (!b) return;
  filter = b.dataset.filter;
  $$(".filter").forEach((f) => f.classList.toggle("is-active", f === b));
  renderBookings();
});
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

/* ---------- Init: er vi allerede innlogget? ---------- */
(async function init() {
  const r = await fetch("/api/admin/stats").catch(() => null);
  if (r && r.ok) showDash();
})();

function showDash() {
  $("#login").hidden = true;
  $("#dash").hidden = false;
  loadAll();
}

async function loadAll() {
  await Promise.all([loadStats(), loadBookings()]);
}

/* ---------- Statistikk ---------- */
async function loadStats() {
  const r = await fetch("/api/admin/stats");
  if (r.status === 401) return location.reload();
  const d = await r.json();
  $("#kv-warning").hidden = d.kv !== false;
  if (d.kv === false) { $("#stat-grid").innerHTML = ""; $("#chart").innerHTML = ""; return; }

  const cards = [
    { label: "Bestillinger totalt", value: d.total, sub: d.monthCount + " denne måneden" },
    { label: "Nye / venter", value: d.pending, sub: "krever svar" },
    { label: "Aksepterte", value: d.accepted, sub: d.cancelled + " kansellert" },
    { label: "Omsetning", value: fmtPrice(d.revenue), sub: "ekskl. kansellerte" },
    { label: "Besøk i dag", value: d.visitsToday, sub: d.visitsTotal + " totalt" },
  ];
  $("#stat-grid").innerHTML = cards.map((c) => `
    <div class="stat">
      <div class="stat-label">${c.label}</div>
      <div class="stat-value">${c.value}</div>
      <div class="stat-sub">${c.sub}</div>
    </div>`).join("");

  renderChart(d.visitsByDay || []);
}

function renderChart(days) {
  const max = Math.max(1, ...days.map((d) => d.count));
  $("#chart").classList.add("chart-wrap");
  $("#chart").innerHTML = days.map((d) => {
    const h = Math.round((d.count / max) * 100);
    const label = d.day.slice(8) + "." + d.day.slice(5, 7);
    return `<div class="bar" style="height:${Math.max(3, h)}%" title="${d.day}: ${d.count} besøk">
      ${d.count ? `<b>${d.count}</b>` : ""}<span>${label}</span></div>`;
  }).join("");
}

/* ---------- Bestillinger ---------- */
async function loadBookings() {
  const r = await fetch("/api/admin/bookings");
  if (r.status === 401) return location.reload();
  const d = await r.json();
  ALL = (d.bookings || []).sort((a, b) => b.createdAt - a.createdAt);
  renderBookings();
}

function renderBookings() {
  const list = ALL.filter((b) => {
    if (filter !== "alle" && (b.status || "ny") !== filter) return false;
    if (!query) return true;
    const hay = `${b.customer?.name} ${b.customer?.dog} ${b.customer?.phone} ${b.customer?.email} ${b.service} ${b.reference}`.toLowerCase();
    return hay.includes(query);
  });

  if (!list.length) {
    $("#bookings").innerHTML = `<p class="empty">Ingen bestillinger her ennå.</p>`;
    return;
  }

  $("#bookings").innerHTML = list.map((b) => {
    const c = b.customer || {};
    const status = b.status || "ny";
    const created = new Date(b.createdAt).toLocaleString("no-NO", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" });
    const meta = [
      c.phone ? `📞 <a href="tel:${c.phone}">${c.phone}</a>` : "",
      c.email ? `✉️ <a href="mailto:${c.email}">${c.email}</a>` : "",
      c.dog ? `🐶 ${esc(c.dog)}` : "",
      b.paymentMethod ? `💳 ${esc(b.paymentMethod)}` : "",
    ].filter(Boolean).join("");
    const actions = status === "ny"
      ? `<div class="bk-buttons">
           <button class="btn btn-sm btn-accept" data-act="accept" data-id="${b.id}">✓ Aksepter</button>
           <button class="btn btn-sm btn-cancel" data-act="cancel" data-id="${b.id}">✕ Avlys</button>
         </div>`
      : status === "akseptert"
        ? `<div class="bk-buttons"><button class="btn btn-sm btn-cancel" data-act="cancel" data-id="${b.id}">✕ Avlys</button></div>`
        : `<div class="bk-buttons"><button class="btn btn-sm btn-accept" data-act="accept" data-id="${b.id}">✓ Gjenåpne</button></div>`;

    return `
      <div class="bk-row s-${status}">
        <div class="bk-main">
          <h3>${esc(b.service)}</h3>
          <div class="bk-when">${esc(b.when || "Tid ikke valgt")} · ${esc(c.name || "Ukjent")}</div>
          <div class="bk-meta">${meta}</div>
          ${c.note ? `<div class="bk-note">📝 ${esc(c.note)}</div>` : ""}
          <div class="ref">${b.reference} · mottatt ${created}</div>
        </div>
        <div class="bk-side">
          <span class="badge ${status}">${status}</span>
          <span class="bk-price">${fmtPrice(b.price)}</span>
          ${actions}
        </div>
      </div>`;
  }).join("");
}

$("#bookings").addEventListener("click", async (e) => {
  const btn = e.target.closest("[data-act]");
  if (!btn) return;
  const { act, id } = btn.dataset;
  if (act === "cancel" && !confirm("Avlyse denne timen? Kunden får e-postvarsel.")) return;
  btn.disabled = true;
  btn.textContent = "…";
  try {
    const r = await fetch("/api/admin/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, action: act }),
    });
    if (!r.ok) throw new Error();
    await loadAll();
  } catch (e2) {
    alert("Noe gikk galt. Prøv igjen.");
    btn.disabled = false;
  }
});

function esc(s) {
  return String(s == null ? "" : s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
}
