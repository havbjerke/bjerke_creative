# Agrolife Mysen – Dyrebutikk & Hundefrisør

En profesjonell, ren nettside med innebygd bookingsystem for Agrolife Mysen
Dyrebutikk & Hundefrisør (Meieriveien 2, Mysen).

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

## Bilder
Hundebildene er generert med Higgsfield og ligger lokalt i `assets/img/`.
Selve bildefilene er ikke sjekket inn (de hentes fra Higgsfields CDN). Last dem
ned én gang med skriptet under, så vises de lokalt:

```bash
bash scripts/fetch-images.sh
git add assets/img && git commit -m "Legg til lokale hundebilder" && git push
```

Inntil bildene er lastet ned, faller `<img>`-taggene automatisk tilbake til
CDN-URL (via `onerror`), slik at siden aldri vises med ødelagte bilder.

Bildefiler:
- `hero-bichon.png` – hero (nyklippet liten hund)
- `brushing.png` – om oss (børsting)
- `towel-cockapoo.png` – om oss (hund i håndkle)
- `golden-happy.png` – CTA-banner (glad hund)

## Kjøre lokalt
Åpne `index.html` i en nettleser, eller kjør en enkel server:

```bash
python3 -m http.server 8000
# åpne http://localhost:8000
```
