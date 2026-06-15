/* =========================================================
   Agrolife Mysen – Dyrebutikk & Hundefrisør
   Static site + integrated booking system (Timma-style)
   ========================================================= */

/* ---------- Data: services ---------- */
const SERVICE_GROUPS = [
  {
    name: "Klipp & Underull",
    services: [
      { id: "klipp-liten", name: "Klipp Liten hund (maks 9 kg)", price: 850, desc: "Inkluderer bad/føn, maskinklipp eller frisering med saks, poteklipp, kloklipp, ørenapping/rens.", duration: 150 },
      { id: "klipp-medium", name: "Klipp Medium hund (10–20 kg)", price: 950, desc: "Inkluderer bad/føn, maskinklipp eller frisering med saks, poteklipp, kloklipp, ørenapping/rens.", duration: 180 },
      { id: "klipp-stor", name: "Klipp Stor hund (20+ kg)", price: 1050, desc: "Inkluderer bad/føn, maskinklipp eller frisering med saks, poteklipp, kloklipp, ørenapping/rens.", duration: 210 },
      { id: "underull-liten", name: "Underull Liten hund", price: 850, desc: "Inkluderer bad/føn og utbørsting av underull. Ørerens og kloklipp/poteklipp.", duration: 120 },
      { id: "underull-medium", name: "Underull Middels hund", price: 950, desc: "Inkluderer bad/føn og utbørsting av underull. Ørerens og kloklipp/poteklipp.", duration: 150 },
      { id: "underull-stor", name: "Underull Stor hund", price: 1050, desc: "Inkluderer bad/føn og utbørsting av underull. Ørerens og kloklipp/poteklipp.", duration: 180 },
    ],
  },
  {
    name: "Bad & Føn",
    services: [
      { id: "bad-liten", name: "Bad/Føn Liten hund (maks 9 kg)", price: 300, desc: "Inkluderer bad, føn, kloklipp og ørerens.", duration: 60 },
      { id: "bad-medium", name: "Bad/Føn Medium hund (10–20 kg)", price: 400, desc: "Inkluderer bad, føn, kloklipp og ørerens.", duration: 75 },
      { id: "bad-stor", name: "Bad/Føn Stor hund (20+ kg)", price: 500, desc: "Inkluderer bad, føn, kloklipp og ørerens.", duration: 90 },
    ],
  },
  {
    name: "Kloklipp",
    services: [{ id: "kloklipp", name: "Kloklipp", price: 100, desc: "Klipp av kloer på hund.", duration: 20 }],
  },
  {
    name: "Poteklipp",
    services: [{ id: "poteklipp", name: "Poteklipp", price: 200, desc: "Kloklipp og klipp med maskin under poter.", duration: 30 }],
  },
  {
    name: "Ansiktstuss",
    services: [{ id: "ansiktstuss", name: "Ansiktstuss", price: 200, desc: "Tuss og forming av ansiktspels.", duration: 30 }],
  },
  {
    name: "Napping liten hund",
    services: [{ id: "napping", name: "Napping liten hund", price: 1300, desc: "Inkluderer napping av små hunder og kloklipp.", duration: 180 }],
  },
  {
    name: "Klipp Katt",
    services: [{ id: "klipp-katt", name: "Klipp Katt", price: 500, desc: "Klipp av floker på katt.", duration: 60 }],
  },
];

const ALL_SERVICES = SERVICE_GROUPS.flatMap((g) => g.services);
const SERVICE_BY_ID = Object.fromEntries(ALL_SERVICES.map((s) => [s.id, s]));

/* ---------- Data: reviews ---------- */
const REVIEWS = [
  { service: "Klipp Liten hund max 9Kg", time: "5 dager siden", text: "I dag leverte jeg en bichon havanais som ikke har vært klippet på tre mnd. Etter 2,5 timer får jeg flotte nyklippet herlige Nanna tilbake. Poter, ører, kloer, ansikt og alt er perfekt. Merker hun er tilfreds. Lukter godt også. 😊", author: "Arild K" },
  { service: "Klipp Medium hund 10-20Kg", time: "7 dager siden", text: "Super proff.", author: "Geir L" },
  { service: "Klipp Liten hund max 9Kg", time: "18 dager siden", text: "Jeg er veldig fornøyd, har vært her flere ganger.", author: "Grethe M" },
  { service: "Klipp Liten hund max 9Kg", time: "en måned siden", text: "Rex er alltid fornøyd, fin frisør 😊❤️🐕👍", author: "Kurt R" },
  { service: "Klipp Medium hund 10-20Kg", time: "en måned siden", text: "Så fornøyd. Torild gjør en kjempejobb med ei sær gammel dame.", author: "Tove S" },
  { service: "Napping liten hund", time: "en måned siden", text: "Han ble så fint nappet.", author: "Unni R" },
  { service: "Klipp Stor hund 20+ Kg", time: "2 måneder siden", text: "Trulte og jeg er veldig fornøyde med godt stell, vi setter stor pris på god og vennlig mottagelse også.", author: "Britt O" },
  { service: "Klipp Liten hund max 9Kg", time: "2 måneder siden", text: "Super service og veldig hyggelig! Anbefales 😄", author: "Kjell S" },
  { service: "Klipp Liten hund max 9Kg", time: "3 måneder siden", text: "Kjempefornøyd med alt sammen. Fine poter, ører, hale og alt sammen. Flott i pelsen etter vask og klipp.", author: "Arild K" },
  { service: "Klipp Liten hund max 9Kg", time: "3 måneder siden", text: "Som alltid, topp behandling.", author: "Ole J" },
  { service: "Klipp Liten hund max 9Kg", time: "4 måneder siden", text: "Fantastisk service, meget godt utført arbeid. Ansatt er alltid like blid.", author: "Rune Å" },
  { service: "Klipp Liten hund max 9Kg", time: "4 måneder siden", text: "Flink, er veldig fornøyd hver gang 🐶", author: "Kurt R" },
  { service: "Klipp Liten hund max 9Kg", time: "4 måneder siden", text: "Veldig fornøyd. En frisør som tar seg god tid. God opplevelse både for matmor og lille Sara. Anbefales.", author: "Bente B" },
  { service: "Napping liten hund", time: "4 måneder siden", text: "Alf koste seg hos Torild og han ble så fin ❤️ Hun anbefales 😀 vi sees i mai igjen.", author: "Laila" },
  { service: "Klipp Liten hund max 9Kg", time: "4 måneder siden", text: "Meget bra opplevelse. Utrolig pent klipt. Både hund og eier er veldig fornøyd. Enkelt å bestille time og generelt god kundeopplevelse.", author: "Niels L" },
  { service: "Bad/Føn Liten hund max 9Kg", time: "4 måneder siden", text: "Veldig hyggelig opplevelse. Super fornøyd og kommer tilbake 😀", author: "Amanda L" },
  { service: "Klipp Stor hund 20+ Kg", time: "5 måneder siden", text: "Hyggelig mottagelse, flott behandling, og en superfornøyd Trulte etterpå!", author: "Britt O" },
  { service: "Klipp Stor hund 20+ Kg", time: "5 måneder siden", text: "Ella blir alltid så fin og du er så flink og god mot henne!!!!", author: "Pia B" },
  { service: "Napping liten hund", time: "5 måneder siden", text: "Hunden vår ble så fin etter napping. Vi kommer tilbake om 4 måneder 🙂", author: "Unni R" },
  { service: "Klipp Liten hund max 9Kg", time: "6 måneder siden", text: "☺️ Det er en sann fryd å være her med Tina, trivelig og er på hundens nivå. Anbefales! Selvfølgelig.", author: "Ole J" },
  { service: "Klipp Liten hund max 9Kg", time: "7 måneder siden", text: "Hunden min ble veldig fin. Full service. Badet og klippet. Også klørne.", author: "Grethe I" },
  { service: "Klipp Liten hund max 9Kg", time: "7 måneder siden", text: "Bestandig en fin opplevelse å ha vår Tibbe hos Torild. Hun er profesjonell og dyktig. Hyggelig og tar seg godt av hunden. Vi kommer ikke til å bruke noen andre.", author: "Tommy F" },
  { service: "Klipp Liten hund max 9Kg", time: "7 måneder siden", text: "Som alltid bra resultat og hyggelig service.", author: "Rune Å" },
  { service: "Klipp Liten hund max 9Kg", time: "7 måneder siden", text: "Kjempe fornøyd 😊", author: "Kurt R" },
  { service: "Klipp Medium hund 10-20Kg", time: "8 måneder siden", text: "Med hjertet på rett sted, og fokus på hunden. Anbefales. ✨🐶✨", author: "May E" },
  { service: "Klipp Medium hund 10-20Kg", time: "8 måneder siden", text: "Så fornøyd med klipp og den supre servicen! Bjarne lukter så godt etter et besøk hos Torild!", author: "Cathe S" },
  { service: "Klipp Liten hund max 9Kg", time: "9 måneder siden", text: "Topp som alltid.", author: "Rune Å" },
  { service: "Klipp Liten hund max 9Kg", time: "9 måneder siden", text: "Like fornøyd denne gangen. Har bestilt time for en annen bichon havanais nå. Balder.", author: "Arild K" },
  { service: "Klipp Liten hund max 9Kg", time: "10 måneder siden", text: "Da har hunden min vært hos Agrolife og blitt klippet og stelt. Ble veldig bra.", author: "Grethe I" },
  { service: "Klipp Liten hund max 9Kg", time: "ett år siden", text: "Alltid koselig å komme ned hit, vi begge (to- og firbente) synes det er trivelig og koselig. 👍", author: "Ole J" },
  { service: "Klipp Liten hund max 9Kg", time: "ett år siden", text: "Jeg har ikke ord for hvor fornøyd jeg er. Nanna ble så fin som hun aldri har vært før. Flotte poter, snute og ja, alt kjempebra. Service og mottagelse var betryggende og koselig. Også bra pris. Veldig veldig fornøyd. Vi kommer tilbake hver gang.", author: "Arild K" },
  { service: "Klipp Medium hund 10-20Kg", time: "ett år siden", text: "Alltid like fornøyd når Torild klipper cobberdogen min!", author: "Iselin G" },
  { service: "Klipp Medium hund 10-20Kg", time: "ett år siden", text: "Topp service og klipp av ei \"sær\" gammel dame.", author: "Tove S" },
  { service: "Kloklipp", time: "ett år siden", text: "Kjapt og godt utført. Anbefales til både kloklipp og frisering/klipping.", author: "Linda K" },
  { service: "Klipp Stor hund 20+ Kg", time: "ett år siden", text: "Fantastisk hyggelig dame som Lexi elsket med en gang.", author: "Mona I" },
  { service: "Klipp Liten hund max 9Kg", time: "ett år siden", text: "Flott service og nydelig resultat utført av veldig hyggelig personell.", author: "Rune Å" },
  { service: "Kloklipp", time: "ett år siden", text: "Trivelig og flink hundefrisør.", author: "Belinda S" },
  { service: "Klipp Liten hund max 9Kg", time: "ett år siden", text: "Vi er så fornøyd 🐶❤️", author: "Kurt R" },
  { service: "Ansiktstuss", time: "ett år siden", text: "Bra pris og utrolig god og flink med hunden.", author: "Maud I" },
  { service: "Poteklipp", time: "ett år siden", text: "Bra pris og utrolig god og flink med hunden.", author: "Maud I" },
  { service: "Klipp Liten hund max 9Kg", time: "ett år siden", text: "Helt topp 👍 Er veldig fornøyd 👍🤗", author: "Irene S" },
  { service: "Klipp Liten hund max 9Kg", time: "ett år siden", text: "Flott arbeid og herlig service.", author: "Rune Å" },
  { service: "Klipp Liten hund max 9Kg", time: "ett år siden", text: "Vakker og fint klippet. Koser seg og fornøyd med godt stell. 🤗", author: "Kjerstin K" },
  { service: "Klipp Liten hund max 9Kg", time: "ett år siden", text: "Veldig flink frisør, vi er så fornøyd.", author: "Kurt R" },
  { service: "Klipp Liten hund max 9Kg", time: "ett år siden", text: "Veldig hyggelig ansatte. Veldig god service. Meget godt lag med hunder.", author: "Rune Å" },
  { service: "Klipp Medium hund 10-20Kg", time: "ett år siden", text: "Fantastisk Service 🤩🐶🐶", author: "May E" },
  { service: "Bad/Føn Liten hund max 9Kg", time: "ett år siden", text: "Veldig bra, Rex er kjempe fornøyd 🐶", author: "Kurt R" },
  { service: "Klipp Liten hund max 9Kg", time: "ett år siden", text: "Flink frisør. Hyggelig og god service.", author: "Runa M" },
  { service: "Kloklipp", time: "2 år siden", text: "Meget god med min aktive lille hund ❣️", author: "Catarina M" },
  { service: "Klipp Liten hund max 9Kg", time: "2 år siden", text: "Alltid fornøyd med Agrolife! Koselig og forståelsesfull selv om vi kom med litt mye floker. Vi blir alltid møtt med kjærlighet og lille Indie elsker Torild!", author: "Serian J" },
  { service: "Klipp Medium hund 10-20Kg", time: "2 år siden", text: "Som alltid, veldig fornøyd med Lunas klipp. Anbefaler alle å reise til Agrolife Mysen og Torild :)", author: "Åse F" },
  { service: "Klipp Liten hund max 9Kg", time: "2 år siden", text: "Veldig fornøyd. Profesjonell klipp og hyggelig service. Kommer tilbake 😀👍", author: "Grethe I" },
  { service: "Klipp Stor hund 20+ Kg", time: "2 år siden", text: "Veldig fornøyde, både hund og eier. 👍", author: "Tore M" },
  { service: "Klipp Medium hund 10-20Kg", time: "2 år siden", text: "Bjarne blir alltid så fin, vi er kjempe fornøyd 🤩", author: "Cathe S" },
  { service: "Klipp Medium hund 10-20Kg", time: "2 år siden", text: "Er så fornøyd med klippen til Luna. Kan virkelig anbefale denne hundefrisøren. Vi vil helt klart være en fast kunde.", author: "Åse F" },
  { service: "Klipp Medium hund 10-20Kg", time: "2 år siden", text: "Veldig fornøyd. Hunden ble kjempefin. Hyggelig service. Er å anbefale 😀", author: "Grethe I" },
  { service: "Klipp Liten hund max 9Kg", time: "2 år siden", text: "Kjempe hyggelig, flink med Klara, nydelig klipt og ganske rimelige priser. Anbefales på det varmeste!!", author: "Erik S" },
  { service: "Klipp Liten hund max 9Kg", time: "2 år siden", text: "Veldig bra jobba. Hunden min ble super fin.", author: "Grethe I" },
  { service: "Klipp Medium hund 10-20Kg", time: "2 år siden", text: "Innehaver strekker seg langt for å gi god service 😃😃😃", author: "Kari U" },
  { service: "Klipp Medium hund 10-20Kg", time: "2 år siden", text: "Fantastisk sted. Hyggelig betjening og Luna ble kjempe fin. Så fornøyd at jeg bestilte ny time til henne om 3 mnd. Kan anbefales på det sterkeste 😊🐕", author: "Åse F" },
  { service: "Napping liten hund", time: "2 år siden", text: "Napping av min petit basset. Kjempefornøyd med jobben.", author: "Geir A" },
  { service: "Klipp Stor hund 20+ Kg", time: "2 år siden", text: "Både Theo og vi er strålende fornøyd med klipp, stell og bad. Kan virkelig anbefales :-) Du er flink Torild.", author: "Linda K" },
  { service: "Kloklipp", time: "2 år siden", text: "Superfornøyd.", author: "Marie G" },
  { service: "Klipp Stor hund 20+ Kg", time: "2 år siden", text: "Like fornøyd hver gang!", author: "Guro T" },
  { service: "Kloklipp", time: "2 år siden", text: "Kjempeflink, hyggelig, god og bestemt med to «gale» småhunder, som ikke vil klippe klør 🫣🤗", author: "Synnøve W" },
  { service: "Klipp Stor hund 20+ Kg", time: "2 år siden", text: "Anbefales!", author: "Christin B" },
  { service: "Klipp Liten hund max 9Kg", time: "3 år siden", text: "Fantastisk ❤️🐶❤️", author: "Eva M" },
  { service: "Kloklipp", time: "3 år siden", text: "Rask, flink og hun gjør opplevelsen på beste måte. Hunden Jacob er helt trygg der.", author: "Gunnar A" },
  { service: "Kloklipp", time: "3 år siden", text: "Både Theo og jeg er veldig fornøyd :-)", author: "Linda K" },
  { service: "Ansiktstuss", time: "3 år siden", text: "Kjempe koselig å komme dit. Bare blide og hyggelig betjening. Helt flott arbeid og behandling av min hund. Takk.", author: "Irene S" },
  { service: "Klipp Liten hund max 9Kg", time: "3 år siden", text: "Veldig fornøyd med resultatet. Bra pris og hyggelig service.", author: "Grethe I" },
  { service: "Klipp Liten hund max 9Kg", time: "3 år siden", text: "Hyggelig, blid og dyktig frisør som egentlig er for rimelig!! 😃😃👍", author: "Erik S" },
  { service: "Klipp Liten hund max 9Kg", time: "3 år siden", text: "Superfornøyd som alltid! Anbefales på det varmeste.", author: "Mari K" },
  { service: "Bad/Føn Stor hund 20+ Kg", time: "3 år siden", text: "Bella ble kjempefin!", author: "Guro T" },
  { service: "Kloklipp", time: "3 år siden", text: "Torild er superflink med hunder, Xeno er veldig fornøyd når han kommer til behandling i butikken til Torild.", author: "Marie G" },
  { service: "Napping liten hund", time: "3 år siden", text: "Alltid fornøyd og Alf er kjempe trygg sammen med Torild 🥰", author: "Laila" },
  { service: "Bad/Føn Stor hund 20+ Kg", time: "3 år siden", text: "Veldig bra! Hyggelige begge som jobber der! Og Stella kom ut som en ny hund, glad og fornøyd ❤️", author: "Stine S" },
  { service: "Klipp Liten hund max 9Kg", time: "3 år siden", text: "Kjempefornøyd med Agrolife! Valpen koser seg og Torild er bare så behagelig. Gleder oss til neste besøk! Supre priser også.", author: "Serian J" },
  { service: "Napping liten hund", time: "3 år siden", text: "Super fornøyd hver gang og koselige jenter som jobber der. Anbefales.", author: "Laila" },
  { service: "Kloklipp", time: "3 år siden", text: "Torild er dyktig, serviceinnstilt, alltid blid og hyggelig.", author: "Gunnar A" },
  { service: "Klipp Stor hund 20+ Kg", time: "3 år siden", text: "Veldig fornøyd med klipp og stell 🥰", author: "Linda K" },
  { service: "Klipp Liten hund max 9Kg", time: "3 år siden", text: "Alltid fantastisk opplevelse her! Valpen vår elsker Torild og hun ser jo ut som en superstar når hun er ferdig. Torild er så kunnskapsrik og betryggende, vi anbefaler henne på det sterkeste.", author: "Serian J" },
  { service: "Kloklipp", time: "3 år siden", text: "Hunden Jacob trives hos Torild.", author: "Gunnar A" },
  { service: "Klipp Medium hund 10-20Kg", time: "3 år siden", text: "Helt fantastisk flott opplevelse 🥳💐🐶❤️", author: "May E" },
  { service: "Klipp Liten hund max 9Kg", time: "3 år siden", text: "Fornøyd – som alltid.", author: "Eva M" },
  { service: "Kloklipp", time: "3 år siden", text: "Det er alltid hyggelig å komme dit. Super service.", author: "Gunnar A" },
  { service: "Klipp Liten hund max 9Kg", time: "3 år siden", text: "Blir kjempegodt ivaretatt ☺️ alltid glad hund som hentes.", author: "Kjerstin K" },
  { service: "Klipp Medium hund 10-20Kg", time: "3 år siden", text: "Superfornøyd Pepper og eier. Deilig å få av vinterpelsen.", author: "Ann M" },
  { service: "Klipp Medium hund 10-20Kg", time: "3 år siden", text: "Superfornøyd Chili og eier. Deilig å få av vinterpelsen.", author: "Ann M" },
  { service: "Klipp Liten hund max 9Kg", time: "3 år siden", text: "Kjempekoselig opplevelse med Agrolife. Valpen hadde det kjempefint, og fikk en helt strålende klipp. Frisøren tok seg god tid og ble godt kjent med valpen, noe som betrygget oss. Vi kommer tilbake for en ny stuss om ikke så lenge. Anbefaler på det høyeste.", author: "Serian J" },
  { service: "Kloklipp", time: "3 år siden", text: "Dyktig. Gir gode råd. Topp sted for hund og eier.", author: "Gunnar A" },
  { service: "Kloklipp", time: "3 år siden", text: "Strålende! Peppers kloklipp gikk som en drøm!", author: "Ann M" },
  { service: "Kloklipp", time: "3 år siden", text: "Strålende! Chilis kloklipp gikk som en drøm!", author: "Ann M" },
  { service: "Kloklipp", time: "3 år siden", text: "Alltid fornøyd!!", author: "Stine M" },
  { service: "Poteklipp", time: "3 år siden", text: "Alltid hyggelig å få ordnet dyra her! Anbefales på det sterkeste.", author: "Siv K" },
  { service: "Kloklipp", time: "3 år siden", text: "Kjempefornøyd som alltid ❤️", author: "Eva M" },
  { service: "Kloklipp", time: "3 år siden", text: "Går lekende lett. Hunden føler seg trygg.", author: "Brian J" },
  { service: "Ansiktstuss", time: "4 år siden", text: "God 👍", author: "Runar S" },
  { service: "Poteklipp", time: "4 år siden", text: "Alltid like fornøyd! 🥰", author: "Stine M" },
  { service: "Kloklipp", time: "4 år siden", text: "Finnes ikke noen bedre 😀", author: "Gunnar A" },
];

/* ---------- Helpers ---------- */
const $ = (sel, root = document) => root.querySelector(sel);
const fmtPrice = (n) => n.toLocaleString("no-NO") + " kr";
const DOW = ["søn", "man", "tir", "ons", "tor", "fre", "lør"];
const MON = ["jan", "feb", "mar", "apr", "mai", "jun", "jul", "aug", "sep", "okt", "nov", "des"];

/* Pseudo-random but stable "next available" label per service */
function nextTimeLabel(idx) {
  const opts = ["I morgen 14:00", "ons 02.09. 09:00", "tir 08.09. 09:00", "I dag 15:30", "tor 04.09. 11:00"];
  return opts[idx % opts.length];
}

/* Generate a list of upcoming open days (skip Sundays) */
function upcomingDays(count = 10) {
  const days = [];
  const d = new Date();
  while (days.length < count) {
    if (d.getDay() !== 0) days.push(new Date(d));
    d.setDate(d.getDate() + 1);
  }
  return days;
}

/* Deterministic available time slots for a given day + service */
function slotsFor(date, service) {
  const base = ["09:00", "10:00", "11:00", "12:30", "13:30", "14:30", "15:30"];
  // Use date + service to deterministically drop some slots (simulate bookings)
  const seed = date.getDate() + date.getMonth() * 31 + service.id.length * 7;
  return base.filter((_, i) => (seed + i * 3) % 4 !== 0);
}

/* ---------- Render: services section ---------- */
function renderServices() {
  const root = $("#services-list");
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
    return `<div class="service-group"><h3>${group.name}</h3><div class="service-cards">${cards}</div></div>`;
  }).join("");
}

/* ---------- Render: reviews ---------- */
const REVIEWS_INITIAL = 12;
function renderReviews() {
  const root = $("#reviews-list");
  root.innerHTML = REVIEWS.map((r, i) => `
    <div class="review ${i >= REVIEWS_INITIAL ? "is-hidden" : ""}">
      <span class="review-service">${r.service}</span>
      <div class="review-top">
        <span class="stars" aria-label="5 av 5 stjerner">★★★★★</span>
        <span class="review-time">${r.time}</span>
      </div>
      <p class="review-text">${r.text}</p>
      <div class="review-meta"><span class="review-author">${r.author}</span> · Utøver Torild</div>
    </div>`).join("");

  const toggle = $("#reviews-toggle");
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
   Booking system
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
  if (booking.service) booking.step = 2; // jump straight to time pick if service preselected
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
    : `${fmtPrice(s.price)} · ca. ${s.duration} min`;
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

/* Step 1 – choose service */
function renderServiceStep() {
  const groups = SERVICE_GROUPS.map((g) => {
    const items = g.services.map((s) => `
      <button class="bk-service ${booking.service && booking.service.id === s.id ? "is-selected" : ""}" data-pick-service="${s.id}">
        <span>
          <span class="bk-service-name">${s.name}</span><br>
          <span class="bk-service-meta">ca. ${s.duration} min</span>
        </span>
        <span class="bk-service-price">${fmtPrice(s.price)}</span>
      </button>`).join("");
    return `<div class="bk-group-label">${g.name}</div>${items}`;
  }).join("");

  body.innerHTML = `
    <h3 class="step-title">Velg tjeneste</h3>
    <p class="step-sub">Hva trenger din firbente venn i dag?</p>
    ${groups}`;
}

/* Step 2 – choose date + time */
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
    <h3 class="step-title">Velg tid</h3>
    <p class="step-sub">Ledige tider hos Torild.</p>
    ${summaryBanner()}
    <div class="bk-dates">${dateBtns}</div>
    <div class="bk-times">${timesHtml}</div>
    <div class="bk-nav">
      <button class="btn btn-ghost" data-goto="1">Tilbake</button>
      <button class="btn btn-primary" data-next="3" ${booking.time ? "" : "disabled"}>Fortsett</button>
    </div>`;
}

/* Step 3 – customer details */
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
      <label for="f-dog">Hundens navn &amp; rase</label>
      <input id="f-dog" type="text" value="${c.dog || ""}" placeholder="f.eks. Nanna, bichon havanais" />
    </div>
    <div class="bk-field">
      <label for="f-note">Melding til frisøren (valgfritt)</label>
      <textarea id="f-note" placeholder="Floker, spesielle hensyn, ønsker ...">${c.note || ""}</textarea>
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
    dog: $("#f-dog").value.trim(),
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

/* Step 4 – payment */
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

/* Step 5 – confirmation */
function renderConfirmStep() {
  const s = booking.service;
  const c = booking.customer;
  const pi = booking.paymentInfo;
  const when = `${DOW[booking.date.getDay()]} ${String(booking.date.getDate()).padStart(2, "0")}.${MON[booking.date.getMonth()]}.${booking.date.getFullYear()} kl. ${booking.time}`;
  const ref = "AGM-" + Math.random().toString(36).slice(2, 7).toUpperCase();
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
      <p class="step-sub">Takk, ${c.name.split(" ")[0]}! Vi gleder oss til å ta imot ${c.dog ? c.dog : "dere"}.</p>
      <div class="bk-receipt">
        <div class="bk-receipt-row"><span class="lbl">Tjeneste</span><span class="val">${s.name}</span></div>
        <div class="bk-receipt-row"><span class="lbl">Tid</span><span class="val">${when}</span></div>
        <div class="bk-receipt-row"><span class="lbl">Utøver</span><span class="val">Torild</span></div>
        <div class="bk-receipt-row"><span class="lbl">Sted</span><span class="val">Meieriveien 2, Mysen</span></div>
        ${c.dog ? `<div class="bk-receipt-row"><span class="lbl">Hund</span><span class="val">${c.dog}</span></div>` : ""}
        <div class="bk-receipt-row"><span class="lbl">Betalt med</span><span class="val">${paidWith}</span></div>
        <div class="bk-receipt-row"><span class="lbl">Referanse</span><span class="val">${ref}</span></div>
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
    customer: { name: c.name, email: c.email, phone: c.phone, dog: c.dog, note: c.note },
  });
}

/* Sender bookingdata til backend som trigger bekreftelsesmail.
   Feiler stille i forhåndsvisning uten backend. */
function sendConfirmation(data) {
  fetch("/api/send-confirmation", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((r) => (r.ok ? r.json() : Promise.reject(r)))
    .then(() => {
      const el = document.getElementById("confirm-note");
      if (el && data.customer.email) el.textContent = `Bekreftelse sendt til ${data.customer.email}.`;
    })
    .catch(() => {
      const el = document.getElementById("confirm-note");
      if (el && data.customer.email) el.textContent = "Bekreftelse sendes så snart som mulig.";
    });
}

/* ---------- Event delegation ---------- */
document.addEventListener("click", (e) => {
  const t = e.target.closest("[data-book-open], [data-book-close], [data-pick-service], [data-pick-date], [data-pick-time], [data-goto], [data-next], [data-submit-details], [data-pay-method], [data-pay-card], [data-pay-wallet]");
  if (!t) return;

  if (t.hasAttribute("data-book-open")) { openBooking(t.dataset.service); return; }
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
$("#year").textContent = new Date().getFullYear();
