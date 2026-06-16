/* =========================================================
   BS Trafikkskole – Mysen
   Statisk flersides nettside + innebygd bookingsystem
   ========================================================= */

/* ---------- Data: kurs & kjøretimer ---------- */
const SERVICE_GROUPS = [
  {
    id: "grunnkurs",
    name: "Trafikalt grunnkurs",
    services: [
      { id: "trafikalt-grunnkurs", name: "Trafikalt grunnkurs", price: 2990, desc: "Obligatorisk førstekurs for alle som skal ta førerkort for første gang. Inkluderer teori, førstehjelp og trafikant i mørket.", length: "Flere kvelder" },
      { id: "morkekjoring", name: "Kurs i mørkekjøring", price: 1690, desc: "Trafikant i mørket – obligatorisk del av trafikalt grunnkurs. Arrangeres i vinterhalvåret.", length: "ca. 4 timer" },
    ],
  },
  {
    id: "klasse-b",
    name: "Klasse B – Personbil",
    services: [
      { id: "vurderingstime-b", name: "Vurderingstime klasse B", price: 790, desc: "Vi kartlegger nivået ditt og legger en plan mot førerkortet.", length: "45 min" },
      { id: "kjoretime-b", name: "Kjøretime klasse B", price: 790, desc: "Personlig kjøretime med din faste trafikklærer. Manuelt eller automatgir.", length: "45 min" },
      { id: "dobbelttime-b", name: "Dobbelttime klasse B", price: 1560, desc: "To kjøretimer i sammenheng for effektiv progresjon.", length: "90 min" },
      { id: "sikkerhetskurs-bane", name: "Sikkerhetskurs på bane (glattkjøring)", price: 3490, desc: "Obligatorisk banekurs med fokus på sikkerhet og kontroll i krevende forhold.", length: "ca. 4 timer" },
      { id: "sikkerhetskurs-vei", name: "Sikkerhetskurs på vei", price: 5900, desc: "Obligatorisk landeveiskjøring og oppsummering før førerprøven.", length: "Over 2 dager" },
    ],
  },
  {
    id: "tilhenger",
    name: "Tilhenger – Klasse B96 & BE",
    services: [
      { id: "klasse-b96", name: "Klasse B96 – bil med tilhenger", price: 4900, desc: "Utvidet kjøretøykombinasjon med tyngre tilhenger. Kurspakke med kjøring.", length: "Avtales" },
      { id: "klasse-be", name: "Klasse BE – bil med tilhenger", price: 6900, desc: "Førerkort for bil med tilhenger. Obligatorisk kurs og kjøretimer.", length: "Avtales" },
    ],
  },
  {
    id: "mc",
    name: "Motorsykkel – A1 / A2 / A",
    services: [
      { id: "vurderingstime-mc", name: "Vurderingstime motorsykkel", price: 950, desc: "Kartlegging og plan for MC-førerkortet (A1, A2 eller A).", length: "45 min" },
      { id: "kjoretime-mc", name: "Kjøretime motorsykkel", price: 950, desc: "Personlig kjøretime på MC med erfaren MC-lærer.", length: "45 min" },
      { id: "grunnkurs-mc", name: "Grunnkurs motorsykkel", price: 2900, desc: "Obligatorisk grunnkurs for motorsykkel før øvelseskjøring på vei.", length: "Flere økter" },
      { id: "sikkerhetskurs-mc", name: "Sikkerhetskurs i presis kjøreteknikk", price: 3990, desc: "Obligatorisk baneøvelse med fokus på teknikk og sikkerhet.", length: "ca. 4 timer" },
    ],
  },
  {
    id: "moped",
    name: "Moped – Klasse AM146",
    services: [
      { id: "klasse-am", name: "Klasse AM146 – moped", price: 6900, desc: "Komplett mopedopplæring – teori, sikkerhetskurs og praktisk kjøring.", length: "Kurspakke" },
    ],
  },
];

const ALL_SERVICES = SERVICE_GROUPS.flatMap((g) => g.services);
const SERVICE_BY_ID = Object.fromEntries(ALL_SERVICES.map((s) => [s.id, s]));

/* ---------- Data: omtaler (eksempler – byttes ut med ekte) ---------- */
const REVIEWS = [
  { service: "Klasse B", time: "4 dager siden", text: "Bestod førerprøven på første forsøk! Rolig og dyktig lærer som virkelig tar seg tid og forklarer godt.", author: "Mathea S" },
  { service: "Klasse B", time: "1 uke siden", text: "Veldig fornøyd. Følte meg trygg fra første kjøretime, og fikk god oppfølging hele veien.", author: "Jonas H" },
  { service: "Trafikalt grunnkurs", time: "2 uker siden", text: "Engasjerende kurs som gjorde teorien lett å forstå. Anbefales!", author: "Emilie R" },
  { service: "Klasse B", time: "3 uker siden", text: "Tålmodig og flink trafikklærer. Forklarte ting på en måte som var lett å skjønne.", author: "Sander L" },
  { service: "Motorsykkel A2", time: "en måned siden", text: "Solid MC-opplæring med fokus på sikkerhet. Lærte utrolig mye på kort tid.", author: "Henrik B" },
  { service: "Klasse B", time: "en måned siden", text: "Topp service og god stemning i bilen. Ble en mye tryggere sjåfør av å kjøre her.", author: "Nora K" },
  { service: "Klasse B (automat)", time: "2 måneder siden", text: "Eleven i fokus stemmer virkelig. De tilpasset tempoet helt etter meg.", author: "Tobias A" },
  { service: "Sikkerhetskurs på bane", time: "2 måneder siden", text: "Lærerikt og litt skummelt på en god måte – nå vet jeg hvordan bilen oppfører seg på glatt føre.", author: "Amalie F" },
  { service: "Klasse B", time: "3 måneder siden", text: "Anbefaler BS Trafikkskole på det varmeste. Profesjonelle og hyggelige hele veien.", author: "Marcus D" },
  { service: "Klasse BE (tilhenger)", time: "4 måneder siden", text: "Effektivt opplegg og god planlegging. Fikk førerkortet uten unødvendige ekstratimer.", author: "Ingrid V" },
  { service: "Moped AM146", time: "5 måneder siden", text: "Kjekt og trygt kurs. Sønnen min koste seg og lærte masse.", author: "Camilla T" },
  { service: "Klasse B", time: "6 måneder siden", text: "Beste avgjørelsen å velge en lokal skole. God lokalkunnskap før oppkjøringen.", author: "Oliver N" },
];

/* ---------- Helpers ---------- */
const $ = (sel, root = document) => root.querySelector(sel);
const fmtPrice = (n) => n.toLocaleString("no-NO") + " kr";
const DOW = ["søn", "man", "tir", "ons", "tor", "fre", "lør"];
const MON = ["jan", "feb", "mar", "apr", "mai", "jun", "jul", "aug", "sep", "okt", "nov", "des"];

/* Pseudo-tilfeldig, men stabil "neste ledige"-tekst per tjeneste */
function nextTimeLabel(idx) {
  const opts = ["I morgen 14:00", "ons 09:00", "tir 16:30", "I dag 15:30", "tor 11:00", "man 17:00"];
  return opts[idx % opts.length];
}

/* Liste over kommende åpne dager (hopper over søndager) */
function upcomingDays(count = 10) {
  const days = [];
  const d = new Date();
  while (days.length < count) {
    if (d.getDay() !== 0) days.push(new Date(d));
    d.setDate(d.getDate() + 1);
  }
  return days;
}

/* Deterministiske ledige klokkeslett for en gitt dag + tjeneste */
function slotsFor(date, service) {
  const base = ["08:00", "09:00", "10:00", "11:30", "13:00", "14:30", "16:00", "17:30"];
  const seed = date.getDate() + date.getMonth() * 31 + service.id.length * 7;
  return base.filter((_, i) => (seed + i * 3) % 4 !== 0);
}

/* ---------- Render: tjenester/priser (kun på klasser.html) ---------- */
function renderServices() {
  const root = $("#services-list");
  if (!root) return;
  let idx = 0;
  root.innerHTML = SERVICE_GROUPS.map((group) => {
    const cards = group.services
      .map((s) => {
        const next = nextTimeLabel(idx++);
        return `
        <article class="service-card">
          <div class="service-card-head">
            <h4>${s.name}</h4>
            <span class="service-price">${fmtPrice(s.price)}</span>
          </div>
          <p class="service-desc">${s.desc}</p>
          <div class="service-foot">
            <span class="service-next">Neste ledige<strong>${next}</strong></span>
            <button class="btn btn-primary" data-book-open data-service="${s.id}">Book</button>
          </div>
        </article>`;
      })
      .join("");
    return `<div class="service-group" id="${group.id}"><h3>${group.name}</h3><div class="service-cards">${cards}</div></div>`;
  }).join("");
}

/* ---------- Render: omtaler (kun der #reviews-list finnes) ---------- */
const REVIEWS_INITIAL = 6;
function renderReviews() {
  const root = $("#reviews-list");
  if (!root) return;
  root.innerHTML = REVIEWS.map((r, i) => `
    <div class="review ${i >= REVIEWS_INITIAL ? "is-hidden" : ""}">
      <span class="review-service">${r.service}</span>
      <div class="review-top">
        <span class="stars" aria-label="5 av 5 stjerner">★★★★★</span>
        <span class="review-time">${r.time}</span>
      </div>
      <p class="review-text">${r.text}</p>
      <div class="review-meta"><span class="review-author">${r.author}</span> · Elev hos BS Trafikkskole</div>
    </div>`).join("");

  const toggle = $("#reviews-toggle");
  if (!toggle) return;
  let expanded = false;
  toggle.addEventListener("click", () => {
    expanded = !expanded;
    root.querySelectorAll(".review").forEach((el, i) => {
      if (i >= REVIEWS_INITIAL) el.classList.toggle("is-hidden", !expanded);
    });
    toggle.textContent = expanded ? "Vis færre omtaler" : "Vis flere omtaler";
    if (!expanded) document.getElementById("omtaler").scrollIntoView({ behavior: "smooth" });
  });
}

/* =========================================================
   Bookingsystem
   ========================================================= */
const booking = { step: 1, service: null, date: null, time: null, customer: {}, payMethod: "card", paymentInfo: null };

const modal = $("#booking-modal");
const body = $("#booking-body");

function openBooking(serviceId) {
  booking.step = 1;
  booking.service = serviceId ? SERVICE_BY_ID[serviceId] : null;
  booking.date = null;
  booking.time = null;
  booking.customer = {};
  booking.payMethod = "card";
  booking.paymentInfo = null;
  if (booking.service) booking.step = 2; // hopp rett til tidsvalg om kurs er forhåndsvalgt
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  renderStep();
}

function closeBooking() {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function updateProgress() {
  modal.querySelectorAll("[data-step-dot]").forEach((el) => {
    const n = Number(el.dataset.stepDot);
    el.classList.toggle("is-active", n === booking.step);
    el.classList.toggle("is-done", n < booking.step);
  });
}

function summaryBanner() {
  const s = booking.service;
  if (!s) return "";
  const when = booking.date && booking.time
    ? `${DOW[booking.date.getDay()]} ${String(booking.date.getDate()).padStart(2, "0")}.${MON[booking.date.getMonth()]} kl. ${booking.time}`
    : `${fmtPrice(s.price)} · ${s.length}`;
  return `
    <div class="bk-summary">
      <div>
        <div class="bk-summary-name">${s.name}</div>
        <div class="bk-summary-meta">${when}</div>
      </div>
      <button class="change" data-goto="1">Endre</button>
    </div>`;
}

function renderStep() {
  updateProgress();
  if (booking.step === 1) renderServiceStep();
  else if (booking.step === 2) renderTimeStep();
  else if (booking.step === 3) renderDetailsStep();
  else if (booking.step === 4) renderPaymentStep();
  else if (booking.step === 5) renderConfirmStep();
  body.parentElement.scrollTop = 0;
}

/* Steg 1 – velg kurs/kjøretime */
function renderServiceStep() {
  const groups = SERVICE_GROUPS.map((g) => {
    const items = g.services.map((s) => `
      <button class="bk-service ${booking.service && booking.service.id === s.id ? "is-selected" : ""}" data-pick-service="${s.id}">
        <span>
          <span class="bk-service-name">${s.name}</span><br>
          <span class="bk-service-meta">${s.length}</span>
        </span>
        <span class="bk-service-price">${fmtPrice(s.price)}</span>
      </button>`).join("");
    return `<div class="bk-group-label">${g.name}</div>${items}`;
  }).join("");

  body.innerHTML = `
    <h3 class="step-title">Velg kurs eller kjøretime</h3>
    <p class="step-sub">Hva ønsker du å booke i dag?</p>
    ${groups}`;
}

/* Steg 2 – velg dato + tid */
function renderTimeStep() {
  const days = upcomingDays(10);
  if (!booking.date) booking.date = days[0];

  const dateBtns = days.map((d) => {
    const sel = booking.date && d.toDateString() === booking.date.toDateString();
    return `
      <button class="bk-date ${sel ? "is-selected" : ""}" data-pick-date="${d.toISOString()}">
        <div class="dow">${DOW[d.getDay()]}</div>
        <div class="dnum">${d.getDate()}</div>
        <div class="mon">${MON[d.getMonth()]}</div>
      </button>`;
  }).join("");

  const slots = slotsFor(booking.date, booking.service);
  const timesHtml = slots.length
    ? slots.map((t) => `<button class="bk-time ${booking.time === t ? "is-selected" : ""}" data-pick-time="${t}">${t}</button>`).join("")
    : `<p class="bk-no-times">Ingen ledige tider denne dagen – prøv en annen dato.</p>`;

  body.innerHTML = `
    <h3 class="step-title">Velg tidspunkt</h3>
    <p class="step-sub">Ledige tider hos BS Trafikkskole.</p>
    ${summaryBanner()}
    <div class="bk-dates">${dateBtns}</div>
    <div class="bk-times">${timesHtml}</div>
    <div class="bk-nav">
      <button class="btn btn-ghost" data-goto="1">Tilbake</button>
      <button class="btn btn-primary" data-next="3" ${booking.time ? "" : "disabled"}>Fortsett</button>
    </div>`;
}

/* Steg 3 – elevopplysninger */
function renderDetailsStep() {
  const c = booking.customer;
  body.innerHTML = `
    <h3 class="step-title">Dine opplysninger</h3>
    <p class="step-sub">Så vi kan bekrefte timen din.</p>
    ${summaryBanner()}
    <div class="bk-field" data-field="name">
      <label for="f-name">Ditt navn *</label>
      <input id="f-name" type="text" value="${c.name || ""}" placeholder="For- og etternavn" />
      <span class="bk-error">Vennligst fyll inn navn.</span>
    </div>
    <div class="bk-field" data-field="phone">
      <label for="f-phone">Telefon *</label>
      <input id="f-phone" type="tel" value="${c.phone || ""}" placeholder="f.eks. 900 00 000" />
      <span class="bk-error">Vennligst fyll inn et gyldig telefonnummer.</span>
    </div>
    <div class="bk-field" data-field="email">
      <label for="f-email">E-post</label>
      <input id="f-email" type="email" value="${c.email || ""}" placeholder="din@epost.no" />
      <span class="bk-error">Ugyldig e-postadresse.</span>
    </div>
    <div class="bk-field">
      <label for="f-birthyear">Fødselsår (valgfritt)</label>
      <input id="f-birthyear" type="text" inputmode="numeric" value="${c.birthYear || ""}" placeholder="f.eks. 2008" maxlength="4" />
    </div>
    <div class="bk-field">
      <label for="f-note">Melding til trafikklæreren (valgfritt)</label>
      <textarea id="f-note" placeholder="F.eks. ønsker automatgir, har kjørt litt fra før, spesielle hensyn ...">${c.note || ""}</textarea>
    </div>
    <div class="bk-nav">
      <button class="btn btn-ghost" data-goto="2">Tilbake</button>
      <button class="btn btn-primary" data-submit-details>Til betaling</button>
    </div>`;
}

function validateDetails() {
  const name = $("#f-name").value.trim();
  const phone = $("#f-phone").value.trim();
  const email = $("#f-email").value.trim();
  let ok = true;

  const setErr = (field, bad) => {
    $(`[data-field="${field}"]`).classList.toggle("has-error", bad);
    if (bad) ok = false;
  };
  setErr("name", name.length < 2);
  setErr("phone", phone.replace(/\s/g, "").length < 6);
  setErr("email", email !== "" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));

  booking.customer = {
    name, phone, email,
    birthYear: $("#f-birthyear").value.trim(),
    note: $("#f-note").value.trim(),
  };
  return ok;
}

/* ---------- Betaling (kort / lommebok) ---------- */
const PAY_METHODS = [
  { id: "card", label: "Kort", icon: "💳" },
  { id: "applepay", label: "Apple Pay", icon: "" },
  { id: "googlepay", label: "Google Pay", icon: "" },
];

function cardBrand(num) {
  if (/^4/.test(num)) return "Visa";
  if (/^(5[1-5]|2[2-7])/.test(num)) return "Mastercard";
  if (/^3[47]/.test(num)) return "Amex";
  return "";
}

function luhnOk(num) {
  if (num.length < 12) return false;
  let sum = 0, alt = false;
  for (let i = num.length - 1; i >= 0; i--) {
    let n = +num[i];
    if (alt) { n *= 2; if (n > 9) n -= 9; }
    sum += n; alt = !alt;
  }
  return sum % 10 === 0;
}

/* Steg 4 – betaling */
function renderPaymentStep() {
  const s = booking.service;
  const tabs = PAY_METHODS.map((m) => `
    <button class="bk-method ${booking.payMethod === m.id ? "is-active" : ""}" data-pay-method="${m.id}">
      ${m.icon ? `<span class="bk-method-ico">${m.icon}</span>` : ""}${m.label}
    </button>`).join("");

  let content;
  if (booking.payMethod === "card") {
    content = `
      <div class="bk-cards-accepted" aria-hidden="true">
        <span class="cardbrand visa">VISA</span>
        <span class="cardbrand mc">Mastercard</span>
        <span class="cardbrand amex">AMEX</span>
      </div>
      <div class="bk-field" data-field="cardnumber">
        <label for="f-cardnumber">Kortnummer</label>
        <div class="bk-card-input">
          <input id="f-cardnumber" inputmode="numeric" autocomplete="cc-number" placeholder="1234 5678 9012 3456" maxlength="23" />
          <span class="bk-card-brand" id="card-brand"></span>
        </div>
        <span class="bk-error">Ugyldig kortnummer.</span>
      </div>
      <div class="bk-field-row">
        <div class="bk-field" data-field="exp">
          <label for="f-exp">Utløp (MM/ÅÅ)</label>
          <input id="f-exp" inputmode="numeric" autocomplete="cc-exp" placeholder="MM/ÅÅ" maxlength="5" />
          <span class="bk-error">Sjekk dato.</span>
        </div>
        <div class="bk-field" data-field="cvc">
          <label for="f-cvc">CVC</label>
          <input id="f-cvc" inputmode="numeric" autocomplete="cc-csc" placeholder="123" maxlength="4" />
          <span class="bk-error">Sjekk CVC.</span>
        </div>
      </div>
      <div class="bk-field" data-field="cardname">
        <label for="f-cardname">Navn på kortet</label>
        <input id="f-cardname" autocomplete="cc-name" placeholder="Som det står på kortet" value="${booking.customer.name || ""}" />
        <span class="bk-error">Fyll inn navn.</span>
      </div>
      <button class="btn btn-primary btn-block bk-pay-btn" data-pay-card>Betal ${fmtPrice(s.price)}</button>`;
  } else {
    const label = booking.payMethod === "applepay" ? "Apple Pay" : "Google Pay";
    content = `
      <p class="bk-wallet-note">Du bekrefter betalingen på ${fmtPrice(s.price)} med ${label}.</p>
      <button class="btn btn-block bk-wallet-btn" data-pay-wallet="${label}">Betal med ${label}</button>`;
  }

  body.innerHTML = `
    <h3 class="step-title">Betaling</h3>
    <p class="step-sub">Velg betalingsmåte og fullfør bookingen.</p>
    ${summaryBanner()}
    <div class="bk-pay-total">
      <span>Å betale</span><strong>${fmtPrice(s.price)}</strong>
    </div>
    <div class="bk-methods">${tabs}</div>
    <div class="bk-pay-content">${content}</div>
    <p class="bk-pay-note">🔒 Betalingen er kryptert. Kortinformasjon lagres ikke.</p>
    <div class="bk-nav">
      <button class="btn btn-ghost" data-goto="3">Tilbake</button>
    </div>`;

  if (booking.payMethod === "card") attachCardFormatting();
}

/* Live-formatering av kortfelt */
function attachCardFormatting() {
  const num = document.getElementById("f-cardnumber");
  const exp = document.getElementById("f-exp");
  const cvc = document.getElementById("f-cvc");
  const brandEl = document.getElementById("card-brand");

  num.addEventListener("input", () => {
    const digits = num.value.replace(/\D/g, "").slice(0, 19);
    num.value = digits.replace(/(.{4})/g, "$1 ").trim();
    const brand = cardBrand(digits);
    brandEl.textContent = brand;
  });
  exp.addEventListener("input", () => {
    let d = exp.value.replace(/\D/g, "").slice(0, 4);
    if (d.length >= 3) d = d.slice(0, 2) + "/" + d.slice(2);
    exp.value = d;
  });
  cvc.addEventListener("input", () => {
    cvc.value = cvc.value.replace(/\D/g, "").slice(0, 4);
  });
}

function validateCard() {
  const numEl = document.getElementById("f-cardnumber");
  const expEl = document.getElementById("f-exp");
  const cvcEl = document.getElementById("f-cvc");
  const nameEl = document.getElementById("f-cardname");
  const digits = numEl.value.replace(/\D/g, "");
  let ok = true;
  const setErr = (field, bad) => {
    document.querySelector(`[data-field="${field}"]`).classList.toggle("has-error", bad);
    if (bad) ok = false;
  };

  setErr("cardnumber", !luhnOk(digits));

  const m = expEl.value.match(/^(\d{2})\/(\d{2})$/);
  let expBad = !m;
  if (m) {
    const mm = +m[1], yy = 2000 + +m[2];
    const now = new Date();
    expBad = mm < 1 || mm > 12 || yy < now.getFullYear() || (yy === now.getFullYear() && mm < now.getMonth() + 1);
  }
  setErr("exp", expBad);

  const isAmex = cardBrand(digits) === "Amex";
  setErr("cvc", !new RegExp(`^\\d{${isAmex ? 4 : 3}}$`).test(cvcEl.value));
  setErr("cardname", nameEl.value.trim().length < 2);

  return { ok, brand: cardBrand(digits) || "Kort", last4: digits.slice(-4) };
}

function payWithCard() {
  const res = validateCard();
  if (!res.ok) return;
  booking.paymentInfo = { method: res.brand, last4: res.last4 };
  processPayment();
}

function payWithWallet(label) {
  booking.paymentInfo = { method: label, last4: null };
  processPayment();
}

/* Simulert behandling -> bekreftelse. Kobles til ekte leverandør (Stripe) senere. */
function processPayment() {
  booking.step = 5;
  updateProgress();
  body.innerHTML = `
    <div class="bk-confirm">
      <div class="bk-spinner" aria-hidden="true"></div>
      <h3 class="step-title">Behandler betaling …</h3>
      <p class="step-sub">Et øyeblikk.</p>
    </div>`;
  setTimeout(renderConfirmStep, 1100);
}

/* Steg 5 – bekreftelse */
function renderConfirmStep() {
  const s = booking.service;
  const c = booking.customer;
  const pi = booking.paymentInfo;
  const when = `${DOW[booking.date.getDay()]} ${String(booking.date.getDate()).padStart(2, "0")}.${MON[booking.date.getMonth()]}.${booking.date.getFullYear()} kl. ${booking.time}`;
  const ref = "BST-" + Math.random().toString(36).slice(2, 7).toUpperCase();
  const paidWith = pi
    ? `${pi.method}${pi.last4 ? " •••• " + pi.last4 : ""} ✓`
    : "Betalt ✓";

  const noteText = c.email
    ? `Sender bekreftelse til ${c.email} …`
    : "Vi tar kontakt for å bekrefte timen.";

  body.innerHTML = `
    <div class="bk-confirm">
      <div class="bk-check">✓</div>
      <h3 class="step-title">Timen er booket!</h3>
      <p class="step-sub">Takk, ${c.name.split(" ")[0]}! Vi gleder oss til å se deg.</p>
      <div class="bk-receipt">
        <div class="bk-receipt-row"><span class="lbl">Kurs / time</span><span class="val">${s.name}</span></div>
        <div class="bk-receipt-row"><span class="lbl">Tid</span><span class="val">${when}</span></div>
        <div class="bk-receipt-row"><span class="lbl">Sted</span><span class="val">Folkenborgveien 2, Mysen</span></div>
        <div class="bk-receipt-row"><span class="lbl">Betalt med</span><span class="val">${paidWith}</span></div>
        <div class="bk-receipt-row"><span class="lbl">Referanse</span><span class="val" id="confirm-ref">${ref}</span></div>
        <div class="bk-receipt-row"><span class="lbl">Beløp</span><span class="val bk-receipt-total">${fmtPrice(s.price)}</span></div>
      </div>
      <p class="bk-note" id="confirm-note">${noteText}</p>
      <div class="bk-nav">
        <button class="btn btn-primary btn-block" data-book-close>Ferdig</button>
      </div>
    </div>`;

  sendConfirmation({
    service: s.name,
    price: s.price,
    when,
    reference: ref,
    paymentMethod: paidWith,
    customer: { name: c.name, email: c.email, phone: c.phone, birthYear: c.birthYear, note: c.note },
  });
}

/* Registrerer bookingen i backend (lagring + bekreftelsesmail).
   Feiler stille i forhåndsvisning uten backend. */
function sendConfirmation(data) {
  fetch("/api/bookings", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((r) => (r.ok ? r.json() : Promise.reject(r)))
    .then((res) => {
      if (res && res.reference) {
        const rf = document.getElementById("confirm-ref");
        if (rf) rf.textContent = res.reference;
      }
      const el = document.getElementById("confirm-note");
      if (el) {
        el.textContent = res && res.emailed
          ? `Bekreftelse sendt til ${data.customer.email}.`
          : "Bookingen er registrert. Vi tar kontakt for å bekrefte.";
      }
    })
    .catch(() => {
      const el = document.getElementById("confirm-note");
      if (el && data.customer.email) el.textContent = "Bekreftelse sendes så snart som mulig.";
    });
}

/* ---------- Mobilmeny ---------- */
function setupNavToggle() {
  const toggle = document.querySelector("[data-nav-toggle]");
  if (!toggle) return;
  toggle.addEventListener("click", () => {
    const open = document.body.classList.toggle("nav-open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
  // Lukk menyen når en lenke klikkes
  document.querySelectorAll(".main-nav a").forEach((a) =>
    a.addEventListener("click", () => {
      document.body.classList.remove("nav-open");
      toggle.setAttribute("aria-expanded", "false");
    })
  );
}

/* ---------- Hendelsesdelegering ---------- */
document.addEventListener("click", (e) => {
  const t = e.target.closest("[data-book-open], [data-book-close], [data-pick-service], [data-pick-date], [data-pick-time], [data-goto], [data-next], [data-submit-details], [data-pay-method], [data-pay-card], [data-pay-wallet]");
  if (!t) return;

  if (t.hasAttribute("data-book-open")) { document.body.classList.remove("nav-open"); openBooking(t.dataset.service); return; }
  if (t.hasAttribute("data-book-close")) { closeBooking(); return; }

  if (t.hasAttribute("data-pick-service")) {
    booking.service = SERVICE_BY_ID[t.dataset.pickService];
    booking.date = null; booking.time = null;
    booking.step = 2; renderStep(); return;
  }
  if (t.hasAttribute("data-pick-date")) {
    booking.date = new Date(t.dataset.pickDate);
    booking.time = null; renderStep(); return;
  }
  if (t.hasAttribute("data-pick-time")) {
    booking.time = t.dataset.pickTime; renderStep(); return;
  }
  if (t.hasAttribute("data-goto")) {
    booking.step = Number(t.dataset.goto); renderStep(); return;
  }
  if (t.hasAttribute("data-next")) {
    booking.step = Number(t.dataset.next); renderStep(); return;
  }
  if (t.hasAttribute("data-submit-details")) {
    if (validateDetails()) { booking.step = 4; renderStep(); }
    return;
  }
  if (t.hasAttribute("data-pay-method")) {
    booking.payMethod = t.dataset.payMethod; renderStep(); return;
  }
  if (t.hasAttribute("data-pay-card")) { payWithCard(); return; }
  if (t.hasAttribute("data-pay-wallet")) { payWithWallet(t.dataset.payWallet); return; }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("is-open")) closeBooking();
});

/* ---------- Init ---------- */
renderServices();
renderReviews();
setupNavToggle();
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();
// Tell sidebesøk (feiler stille uten backend)
fetch("/api/track", { method: "POST" }).catch(() => {});
