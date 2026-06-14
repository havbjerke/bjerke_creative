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

## Bookingsystem
Bookingen ligger direkte i nettsiden (Timma-stil) og kjører som en 4-stegs flyt:
1. **Velg tjeneste** – alle tjenester gruppert etter kategori med pris og varighet
2. **Velg tid** – kommende dager (søndager stengt) med ledige klokkeslett
3. **Dine opplysninger** – navn, telefon, e-post, hund og melding (med validering)
4. **Bekreftelse** – kvittering med referansenummer

Flyten er fullstendig på klientsiden. For ekte bookinger kan steg 3–4 kobles til
et backend-/kalender-API (f.eks. Timma) i `app.js` (`renderConfirmStep`).

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
