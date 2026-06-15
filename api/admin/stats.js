// GET /api/admin/stats – nøkkeltall + besøk siste 14 dager
const { requireAdmin } = require("../../lib/auth");
const kv = require("../../lib/kv");

module.exports = async (req, res) => {
  if (!requireAdmin(req)) return res.status(401).json({ error: "Ikke autorisert" });
  if (!kv.kvConfigured()) return res.status(200).json({ kv: false });

  try {
    const ids = (await kv.lrange("bookings:index", 0, -1)) || [];
    const vals = await kv.mget(ids.map((id) => `booking:${id}`));
    const bookings = (vals || []).filter(Boolean).map((v) => JSON.parse(v));

    const now = new Date();
    const monthKey = `${now.getFullYear()}-${now.getMonth()}`;
    let accepted = 0, cancelled = 0, pending = 0, revenue = 0, monthCount = 0;
    bookings.forEach((b) => {
      if (b.status === "akseptert") accepted++;
      else if (b.status === "kansellert") cancelled++;
      else pending++;
      if (b.status !== "kansellert" && typeof b.price === "number") revenue += b.price;
      const d = new Date(b.createdAt);
      if (`${d.getFullYear()}-${d.getMonth()}` === monthKey) monthCount++;
    });

    const visitsTotal = Number((await kv.get("stats:visits")) || 0);
    const days = [];
    const dayKeys = [];
    for (let i = 13; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const key = d.toISOString().slice(0, 10);
      days.push(key);
      dayKeys.push(`stats:visits:${key}`);
    }
    const dayVals = (await kv.mget(dayKeys)) || [];
    const visitsByDay = days.map((day, i) => ({ day, count: Number(dayVals[i] || 0) }));
    const visitsToday = visitsByDay[visitsByDay.length - 1].count;

    return res.status(200).json({
      kv: true,
      total: bookings.length,
      accepted, cancelled, pending,
      revenue, monthCount,
      visitsTotal, visitsToday, visitsByDay,
    });
  } catch (e) {
    return res.status(500).json({ error: String(e.message || e) });
  }
};
