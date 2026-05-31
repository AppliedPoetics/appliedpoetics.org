/* ============================================================================
   Applied Poetics · Docs API client
   https://docs.appliedpoetics.org (OpenAPI spec)
   ========================================================================== */

const DOCS_API_BASE = "https://docs.appliedpoetics.org";

const TOKEN_NAME = "ap_token";
const TOKEN_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

function getCookie(name) {
  const match = document.cookie.match(new RegExp("(^|;)\\s*" + name + "=([^;]*)"));
  return match ? decodeURIComponent(match[2]) : null;
}

function setCookie(name, value, maxAge) {
  let cookie = `${name}=${encodeURIComponent(value)}; path=/; SameSite=Lax`;
  if (maxAge !== undefined) cookie += `; Max-Age=${maxAge}`;
  if (location.protocol === "https:") cookie += "; Secure";
  document.cookie = cookie;
}

function clearCookie(name) {
  document.cookie = `${name}=; path=/; Max-Age=0`;
}

export function getToken() {
  return getCookie(TOKEN_NAME);
}

export function setToken(token) {
  setCookie(TOKEN_NAME, token, TOKEN_MAX_AGE);
}

export function clearToken() {
  clearCookie(TOKEN_NAME);
}

async function request(path, options = {}) {
  const url = `${DOCS_API_BASE}${path}`;
  const headers = {
    ...(options.body && typeof options.body === "string"
      ? { "Content-Type": "application/json" }
      : {}),
    ...(getToken() ? { Authorization: `Bearer ${getToken()}` } : {}),
    ...options.headers,
  };

  const res = await fetch(url, { ...options, headers });

  if (!res.ok) {
    let msg = `API error ${res.status}`;
    try {
      const err = await res.json();
      msg = err.detail?.[0]?.msg || err.detail || msg;
    } catch {
      // ignore parse failure
    }
    throw new Error(msg);
  }

  if (res.status === 204) return null;
  return res.json();
}

/* ── Users ──────────────────────────────────────────────────────────────── */

export async function signup(username, email, password) {
  return request("/users/signup", {
    method: "POST",
    body: JSON.stringify({ username, email, password }),
  });
}

export async function login(username, password) {
  const body = new URLSearchParams();
  body.append("username", username);
  body.append("password", password);

  const res = await fetch(`${DOCS_API_BASE}/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });

  if (!res.ok) {
    let msg = `Login error ${res.status}`;
    try {
      const err = await res.json();
      msg = err.detail?.[0]?.msg || err.detail || msg;
    } catch {
      // ignore
    }
    throw new Error(msg);
  }

  const data = await res.json();
  setToken(data.access_token);
  return data;
}

export async function getMe() {
  return request("/users/me");
}

export function logout() {
  clearToken();
}

/* ── Documents ──────────────────────────────────────────────────────────── */

export async function listDocuments() {
  return request("/documents");
}

export async function createDocument(title, content) {
  return request("/documents", {
    method: "POST",
    body: JSON.stringify({ title, content }),
  });
}

export async function updateDocument(id, title, content) {
  return request(`/documents/${id}`, {
    method: "PUT",
    body: JSON.stringify({ title, content }),
  });
}

export async function deleteDocument(id) {
  return request(`/documents/${id}`, { method: "DELETE" });
}

export async function getDocument(id) {
  return request(`/documents/${id}`);
}

/* ── Revisions (shadow-doc workaround; no API changes) ─────────────────── */

const REV_PREFIX = "__rev__";

export function makeRevTitle(parentId, ts = Date.now(), title = "") {
  const encoded = title ? `__${encodeURIComponent(title)}` : "";
  return `${REV_PREFIX}${parentId}__${ts}${encoded}`;
}

export function parseRevTitle(title) {
  if (!title || !title.startsWith(REV_PREFIX)) return null;
  const rest = title.slice(REV_PREFIX.length);
  const idx = rest.indexOf("__");
  if (idx === -1) return null;
  const parentId = rest.slice(0, idx);
  const afterParent = rest.slice(idx + 2);
  const ts = parseInt(afterParent, 10);
  if (isNaN(ts)) return null;
  const afterTs = afterParent.slice(String(ts).length);
  let revTitle = "";
  if (afterTs.startsWith("__")) {
    try {
      revTitle = decodeURIComponent(afterTs.slice(2));
    } catch {
      revTitle = "";
    }
  }
  return {
    parentId,
    timestamp: ts,
    title: revTitle,
  };
}

export async function createRevisionDoc(parentId, content, title) {
  return createDocument(makeRevTitle(parentId, Date.now(), title), content);
}

export function parseRevisionDoc(doc) {
  const parsed = parseRevTitle(doc.title);
  const content = doc.content || "";
  return {
    id: doc.id,
    timestamp: parsed ? parsed.timestamp : Date.now(),
    title: parsed ? parsed.title : doc.title || "",
    content,
    words: content ? content.trim().split(/\s+/).length : 0,
    chars: content ? content.length : 0,
  };
}

export async function deleteRevisions(parentId) {
  const all = await listDocuments();
  const toDelete = all.filter((d) => {
    const p = parseRevTitle(d.title);
    return p && p.parentId === parentId;
  });
  await Promise.all(toDelete.map((d) => deleteDocument(d.id)));
}
