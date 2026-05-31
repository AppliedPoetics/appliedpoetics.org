/* ============================================================================
   Applied Poetics · Docs API client
   https://docs.appliedpoetics.org (OpenAPI spec)
   ========================================================================== */

const DOCS_API_BASE = "https://docs.appliedpoetics.org";

export function getToken() {
  return localStorage.getItem("ap_token");
}

export function setToken(token) {
  localStorage.setItem("ap_token", token);
}

export function clearToken() {
  localStorage.removeItem("ap_token");
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
