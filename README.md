# BS Trafikkskole – Mysen

En profesjonell, flersides nettside med innebygd bookingsystem for **BS Trafikkskole**
(Folkenborgveien 2, 1850 Mysen). Nettsiden setter eleven i fokus og gjør det enkelt å
booke kjøretimer og melde seg på kurs på vei mot førerkortet.

🌐 **Hosting:** Vercel (statisk side + serverless `api/`-funksjoner). Se
«Deploy til Vercel» nederst. Etter første deploy får du en URL som
`https://bs-trafikkskole.vercel.app`.

## Sider
- `index.html` – **Hjem**: hero, derfor-oss, klasseoversikt, prosess, omtaler og CTA
- `klasser.html` – **Klasser & priser**: full oversikt over kurs og kjøretimer, alle bookbare
- `om-oss.html` – **Om oss**: filosofi («eleven i fokus»), team og verdier
- `info.html` – **Info & kontakt**: åpningstider, kontaktinfo, FAQ og kart
- `styles.css` – felles design (profesjonell blå palett)
- `app.js` – nettsidelogikk + det innebygde bookingsystemet
- `admin.html` / `admin.css` / `admin.js` – adminpanelet (`/admin`)
- `api/` – serverless-funksjoner (booking, besøkstelling, admin, innlogging)
- `lib/` – delt kode (e-post, database, autentisering)
- `assets/` – egendefinerte SVG-illustrasjoner (`car.svg`, `wheel.svg`)

## Bookingsystem
Bookingen ligger direkte i nettsiden og er tilgjengelig fra alle sider via «Book time».
Den kjører som en 5-stegs flyt:
1. **Velg kurs/kjøretime** – alle tjenester gruppert etter klasse med pris og varighet
2. **Velg tid** – kommende dager (søndager stengt) med ledige klokkeslett
3. **Dine opplysninger** – navn, telefon, e-post, fødselsår og melding (med validering)
4. **Betaling** – kort (Visa/Mastercard/Amex), Apple Pay eller Google Pay (frontend-UI)
5. **Bekreftelse** – kvittering med referansenummer + bekreftelsesmail

> **Merk:** Kursene, prisene og «teamet» i utkastet er representative eksempler.
> Bytt dem ut med skolens faktiske tilbud i `app.js` (`SERVICE_GROUPS`) og `om-oss.html`.

## Bekreftelsesmail
Når en booking fullføres sendes det e-post via **[Resend](https://resend.com)**:
en **kvittering til eleven** og et **varsel til trafikkskolen**.

**Filer:**
- `lib/email.js` – sending + HTML-maler
- `api/bookings.js` – `POST /api/bookings` (lagrer bookingen + sender e-post)
- Frontend: `app.js` kaller endepunktet i `renderConfirmStep` / `sendConfirmation`

### Sett opp
1. Lag konto på https://resend.com og hent en **API-nøkkel** (gratis nivå finnes).
2. Deploy repoet til en host som kjører serverless-funksjoner – **anbefalt: [Vercel](https://vercel.com)**.
3. Legg inn miljøvariablene fra `.env.example`:
   `RESEND_API_KEY`, `MAIL_FROM`, `SCHOOL_EMAIL`.
   - Til testing kan `MAIL_FROM` være `BS Trafikkskole <onboarding@resend.dev>`.
   - For produksjon: verifiser eget domene i Resend og bruk f.eks. `booking@bstrafikkskole.no`.

> **Merk:** E-post krever serverkode og fungerer derfor **ikke** på en ren statisk
> forhåndsvisning. Selve bookingflyten fungerer som normalt – kvitteringen viser da
> en vennlig melding i stedet.

## Adminpanel (`/admin`)
Et enkelt dashbord for eier/operatør – åpne `https://din-side.vercel.app/admin`
og logg inn med admin-passordet.

Funksjoner:
- **Statistikk:** antall bestillinger, nye/venter, aksepterte, omsetning, besøk.
- **Besøksgraf:** sidebesøk siste 14 dager.
- **Bestillinger:** se elev, telefon, e-post, fødselsår, melding og betalingsmåte.
  Søk og filtrer på status.
- **Aksepter / Avlys:** ett klikk – eleven får automatisk e-postvarsel.

**Filer:** `admin.html`, `admin.css`, `admin.js`, `api/admin/*`,
`api/track.js` (besøk), `lib/auth.js` (innlogging), `lib/kv.js` (database).

Lagring skjer i **Vercel KV** (Redis). Uten KV fungerer nettsiden og e-post
fortsatt, men adminpanelet viser ingen data før KV er koblet til.

## Bilder / grafikk
Nettsiden er helt selvstendig og bruker ingen eksterne bilder. Grafikken er
egendefinerte SVG-illustrasjoner som ligger lokalt i `assets/`:
- `car.svg` – vennlig bilillustrasjon med L-skilt (hero og «om oss»)
- `wheel.svg` – rattmønster brukt som dekor i hero, «om oss» og CTA-banner

Vil du heller bruke ekte foto senere, kan `assets/car.svg`-referansene i
HTML-filene byttes ut med dine egne bildefiler i `assets/`.

## Kjøre lokalt
Åpne `index.html` i en nettleser, eller kjør en enkel server:

```bash
python3 -m http.server 8000
# åpne http://localhost:8000
```

(Betaling-UI fungerer lokalt; bekreftelsesmail krever Vercel + env-variabler.)

## Deploy til Vercel
Vercel kjører både den statiske siden og `api/`-funksjonene.

1. Lag konto på https://vercel.com og logg inn med GitHub.
2. **Add New… → Project** → importer repoet `havbjerke/bjerke_creative`.
3. Framework Preset: **Other** (ingen build trengs). La «Root Directory» være `./`.
4. **Legg til database:** prosjektets **Storage → Create Database → KV** (Upstash
   Redis). Velg gratisplanen og koble den til prosjektet – `KV_REST_API_URL` og
   `KV_REST_API_TOKEN` settes da automatisk. (Kan også gjøres etter første deploy.)
5. Åpne **Settings → Environment Variables** og legg inn (fra `.env.example`):
   - `RESEND_API_KEY` – fra Resend
   - `MAIL_FROM` – f.eks. `BS Trafikkskole <onboarding@resend.dev>` til test
   - `SCHOOL_EMAIL` – trafikkskolens e-post for varsler
   - `ADMIN_PASSWORD` – passordet for `/admin`
   - `ADMIN_SECRET` – en lang tilfeldig streng (signerer innlogging)
6. Klikk **Deploy** (eller **Redeploy** hvis du la til KV/variabler etterpå).
   Du får en URL som `https://bs-trafikkskole.vercel.app`.
7. Hver nye push til GitHub deployer automatisk på nytt.

Adminpanelet ligger på `…/admin`. Eget domene: Settings → Domains.
