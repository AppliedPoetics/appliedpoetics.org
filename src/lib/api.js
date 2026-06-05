/* ============================================================================
   Applied Poetics · API client
   POSTs to https://api.appliedpoetics.org/v1/{category}/{method}
   ========================================================================== */

const API_BASE = "https://api.appliedpoetics.org";

export async function applyConstraint(category, method, text, params = {}) {
  const url = `${API_BASE}/v1/${encodeURIComponent(category)}/${encodeURIComponent(method)}`;
  const body = { text, ...params };

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    let msg = `API error ${res.status}`;
    try {
      const err = await res.json();
      msg = err.error || msg;
    } catch {
      // ignore parse failure
    }
    throw new Error(msg);
  }

  const data = await res.json();
  return data.result ?? "";
}
