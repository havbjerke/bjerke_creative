// Hjelpefunksjoner for Vipps ePayment API.
// Alle hemmeligheter leses fra miljøvariabler (env) – aldri fra nettleseren.
//
// Påkrevde env-variabler:
//   VIPPS_CLIENT_ID
//   VIPPS_CLIENT_SECRET
//   VIPPS_SUBSCRIPTION_KEY   (Ocp-Apim-Subscription-Key)
//   VIPPS_MSN                (Merchant Serial Number)
//   VIPPS_BASE_URL           (valgfri – default = testmiljø)
//
// Test:  https://apitest.vipps.no
// Prod:  https://api.vipps.no

const VIPPS_BASE = process.env.VIPPS_BASE_URL || "https://apitest.vipps.no";

function requireEnv(name) {
  const v = process.env[name];
  if (!v) throw new Error(`Mangler miljøvariabel: ${name}`);
  return v;
}

// Henter et OAuth-token fra Vipps som brukes til API-kallene.
async function getAccessToken() {
  const res = await fetch(`${VIPPS_BASE}/accesstoken/get`, {
    method: "POST",
    headers: {
      client_id: requireEnv("VIPPS_CLIENT_ID"),
      client_secret: requireEnv("VIPPS_CLIENT_SECRET"),
      "Ocp-Apim-Subscription-Key": requireEnv("VIPPS_SUBSCRIPTION_KEY"),
      "Merchant-Serial-Number": requireEnv("VIPPS_MSN"),
    },
  });
  if (!res.ok) {
    throw new Error(`Vipps token-feil (${res.status}): ${await res.text()}`);
  }
  const data = await res.json();
  return data.access_token;
}

// Standard-headere for ePayment-kall.
function vippsHeaders(token, idempotencyKey) {
  const headers = {
    Authorization: `Bearer ${token}`,
    "Ocp-Apim-Subscription-Key": requireEnv("VIPPS_SUBSCRIPTION_KEY"),
    "Merchant-Serial-Number": requireEnv("VIPPS_MSN"),
    "Content-Type": "application/json",
    // Identifiserer integrasjonen overfor Vipps (anbefalt).
    "Vipps-System-Name": "agrolife-mysen",
    "Vipps-System-Version": "1.0.0",
    "Vipps-System-Plugin-Name": "agrolife-booking",
    "Vipps-System-Plugin-Version": "1.0.0",
  };
  if (idempotencyKey) headers["Idempotency-Key"] = idempotencyKey;
  return headers;
}

module.exports = { VIPPS_BASE, getAccessToken, vippsHeaders };
