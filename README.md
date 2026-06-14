# Agrolife Mysen – Dyrebutikk & Hundefrisør

En profesjonell, ren nettside med innebygd bookingsystem for Agrolife Mysen
Dyrebutikk & Hundefrisør (Meieriveien 2, Mysen).

🌐 **Live nettside:** https://havbjerke.github.io/bjerke_creative/

Siden publiseres automatisk til GitHub Pages ved hver push (se
`.github/workflows/deploy-pages.yml`).

## Innhold
- `index.html` – sidens struktur (hero, om oss, tjenester, omtaler, kontakt, CTA, footer)
- `styles.css` – design og responsivt oppsett (varm grønn/krem-palett)
- `app.js` – tjeneste- og omtaledata + det innebygde bookingsystemet

## Betaling med Vipps

Bookingen har et ekte betalingssteg mot **Vipps ePayment API**. Hemmelige
nøkler ligger kun på serveren (serverless-funksjoner), aldri i nettleseren.

**Filer:**
- `lib/vipps.js` – token + headere mot Vipps
- `api/vipps/create.js` – `POST /api/vipps/create` oppretter betaling, returnerer `redirectUrl`
- `api/vipps/status.js` – `GET /api/vipps/status?reference=…` sjekker status og trekker (capture) beløpet ved godkjenning
- Frontend (`app.js`): steg «Betaling» → sender til Vipps → retur håndteres og kvittering vises

### Sett opp (testmiljø)
1. Opprett konto i Vipps' utviklerportal: https://portal.vippsmobilepay.com og hent **test**-nøkler.
2. Deploy hele repoet til en host som kjører serverless-funksjoner – **anbefalt: [Vercel](https://vercel.com)** (gratis, kobles til GitHub, oppdager `api/`-mappen automatisk).
3. Legg inn miljøvariablene fra `.env.example` i hostingen:
   `VIPPS_CLIENT_ID`, `VIPPS_CLIENT_SECRET`, `VIPPS_SUBSCRIPTION_KEY`, `VIPPS_MSN`,
   `VIPPS_BASE_URL=https://apitest.vipps.no`.
4. Test betalingen med Vipps-testappen. Når alt virker, bytt `VIPPS_BASE_URL`
   til `https://api.vipps.no` og bruk produksjonsnøkler.

> **Merk:** Betaling krever serverkode og fungerer derfor **ikke** på GitHub Pages
> eller githack-forhåndsvisningen (kun statiske filer). Bruk Vercel/Netlify
> Functions e.l. for full funksjonalitet. Vil du teste siden uten betaling, sett
> `PAYMENT.enabled = false` øverst i `app.js`.

## Bookingsystem
Bookingen ligger direkte i nettsiden (Timma-stil) og kjører som en 5-stegs flyt:
1. **Velg tjeneste** – alle tjenester gruppert etter kategori med pris og varighet
2. **Velg tid** – kommende dager (søndager stengt) med ledige klokkeslett
3. **Dine opplysninger** – navn, telefon, e-post, hund og melding (med validering)
4. **Betaling** – «Betal med Vipps» (se avsnittet over)
5. **Bekreftelse** – kvittering med referansenummer og betalingsstatus

Selve booking-/tidsdataene er foreløpig på klientsiden og kan kobles til et
kalender-API (f.eks. Timma) senere. Betalingen er ekte (Vipps).

## Bilder / grafikk
Nettsiden er helt selvstendig og bruker ingen eksterne bilder. Grafikken er
egendefinerte SVG-illustrasjoner som ligger lokalt i `assets/`:
- `dog.svg` – vennlig hundeillustrasjon (hero og «om oss»)
- `paws.svg` – potemønster brukt som dekor i hero, «om oss» og CTA-banner

Vil du heller bruke ekte foto senere, kan `assets/dog.svg`-referansene i
`index.html` byttes ut med dine egne bildefiler i `assets/`.

## Kjøre lokalt
Åpne `index.html` i en nettleser, eller kjør en enkel server:

```bash
python3 -m http.server 8000
# åpne http://localhost:8000
```
