#!/usr/bin/env bash
#
# Laster ned de AI-genererte hundebildene (Higgsfield) til assets/img/.
# Kjør én gang lokalt etter kloning:  bash scripts/fetch-images.sh
#
set -euo pipefail

BASE="https://d8j0ntlcm91z4.cloudfront.net/user_3F59SLn04mkgVELtj2tPAMabNri"
DEST="$(cd "$(dirname "$0")/.." && pwd)/assets/img"
mkdir -p "$DEST"

# filnavn -> CDN-fil
declare -A IMAGES=(
  ["hero-bichon.png"]="hf_20260614_223959_4b1017dd-be4a-42e2-bafd-48a9f8ce7f49.png"
  ["towel-cockapoo.png"]="hf_20260614_224000_46cfe48b-ba2c-4bbe-a0a7-1b055344da65.png"
  ["brushing.png"]="hf_20260614_224002_c9d3d774-e621-434d-876e-d510bc3e0a50.png"
  ["golden-happy.png"]="hf_20260614_224003_79baa8fd-6983-46e2-b2f1-ee1845ba37fc.png"
)

for name in "${!IMAGES[@]}"; do
  url="$BASE/${IMAGES[$name]}"
  echo "→ $name"
  curl -fSL --retry 3 -o "$DEST/$name" "$url"
done

echo "Ferdig. Bildene ligger i $DEST"
echo "Husk: git add assets/img && git commit -m 'Legg til lokale hundebilder' && git push"
