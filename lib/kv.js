// Enkel wrapper mot Vercel KV / Upstash Redis via REST.
// Env settes automatisk når du legger til Vercel KV (KV_REST_API_URL/TOKEN),
// eller bruk UPSTASH_REDIS_REST_URL/TOKEN.

const URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

function kvConfigured() {
  return !!(URL && TOKEN);
}

async function cmd(args) {
  if (!kvConfigured()) throw new Error("KV (database) er ikke konfigurert");
  const r = await fetch(URL, {
    method: "POST",
    headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify(args),
  });
  if (!r.ok) throw new Error(`KV (${r.status}): ${await r.text()}`);
  const data = await r.json();
  return data.result;
}

module.exports = {
  kvConfigured,
  cmd,
  get: (k) => cmd(["GET", k]),
  set: (k, v) => cmd(["SET", k, v]),
  incr: (k) => cmd(["INCR", k]),
  lpush: (k, v) => cmd(["LPUSH", k, v]),
  lrange: (k, a, b) => cmd(["LRANGE", k, a, b]),
  mget: (keys) => (keys.length ? cmd(["MGET", ...keys]) : Promise.resolve([])),
};
