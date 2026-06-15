# Agrolife Mysen – Dyrebutikk & Hundefrisør

En profesjonell, ren nettside med innebygd bookingsystem for Agrolife Mysen
Dyrebutikk & Hundefrisør (Meieriveien 2, Mysen).

🌐 **Hosting:** Vercel (statisk side + serverless `api/`-funksjoner). Se
«Deploy til Vercel» nederst. Etter første deploy får du en URL som
`https://bjerke-creative.vercel.app`.

## Innhold
- `index.html` – sidens struktur (hero, om oss, tjenester, omtaler, kontakt, CTA, footer)
- `styles.css` – design og responsivt oppsett (varm grønn/krem-palett)
- `app.js` – tjeneste- og omtaledata + det innebygde bookingsystemet

## Bookingsystem
Bookingen ligger direkte i nettsiden (Timma-stil) og kjører som en 5-stegs flyt:
1. **Velg tjeneste** – alle tjenester gruppert etter kategori med pris og varighet
2. **Velg tid** – kommende dager (søndager stengt) med ledige klokkeslett
3. **Dine opplysninger** – navn, telefon, e-post, hund og melding (med validering)
4. **Betaling** – kort (Visa/Mastercard/Amex), Apple Pay eller Google Pay (frontend-UI)
5. **Bekreftelse** – kvittering med referansenummer + bekreftelsesmail

## Bekreftelsesmail
Når en booking fullføres sendes det e-post via **[Resend](https://resend.com)**:
en **kvittering til kunden** og et **varsel til salongen** (Torild).

**Filer:**
- `lib/email.js` – sending + HTML-maler
- `api/send-confirmation.js` – `POST /api/send-confirmation` (serverless-funksjon)
- Frontend: `app.js` kaller endepunktet i `renderConfirmStep` / `sendConfirmation`

### Sett opp
1. Lag konto på https://resend.com og hent en **API-nøkkel** (gratis nivå finnes).
2. Deploy repoet til en host som kjører serverless-funksjoner – **anbefalt: [Vercel](https://vercel.com)** (oppdager `api/`-mappen automatisk).
3. Legg inn miljøvariablene fra `.env.example`:
   `RESEND_API_KEY`, `MAIL_FROM`, `SALON_EMAIL`.
   - Til testing kan `MAIL_FROM` være `Agrolife Mysen <onboarding@resend.dev>`.
   - For produksjon: verifiser eget domene i Resend og bruk f.eks. `booking@dittdomene.no`.

> **Merk:** E-post krever serverkode og fungerer derfor **ikke** på GitHub Pages
> eller githack-forhåndsvisningen. På de statiske visningene viser kvitteringen
> en vennlig melding i stedet, men selve bookingflyten fungerer som normalt.

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

(Betaling-UI fungerer lokalt; bekreftelsesmail krever Vercel + env-variabler.)

## Deploy til Vercel
Vercel kjører både den statiske siden og `api/`-funksjonene (bekreftelsesmail).

1. Lag konto på https://vercel.com og logg inn med GitHub.
2. **Add New… → Project** → importer repoet `havbjerke/bjerke_creative`.
3. Framework Preset: **Other** (ingen build trengs). La «Root Directory» være `./`.
4. Åpne **Environment Variables** og legg inn (fra `.env.example`):
   - `RESEND_API_KEY`
   - `MAIL_FROM` – f.eks. `Agrolife Mysen <onboarding@resend.dev>` til test
   - `SALON_EMAIL` – Torilds e-post for varsler
5. Klikk **Deploy**. Du får en URL som `https://bjerke-creative.vercel.app`.
6. Hver nye push til GitHub deployer automatisk på nytt.

Bytt `vercel.json`/preset om du vil ha et eget domene (Settings → Domains).
`vercel.json` er allerede satt opp med rene URL-er.
