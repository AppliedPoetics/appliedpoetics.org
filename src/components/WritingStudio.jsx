import React, { useState, useRef, useCallback, useEffect } from "react";
import Sidebar from "./Sidebar.jsx";
import TopBar from "./TopBar.jsx";
import ContextMenu from "./ContextMenu.jsx";
import CommandPalette from "./CommandPalette.jsx";
import ParamDialog from "./ParamDialog.jsx";
import ConstraintLog from "./ConstraintLog.jsx";
import AuthModal from "./AuthModal.jsx";
import Icon from "./Icon.jsx";
import { SEED_DOCS, SEED_PROSE } from "../lib/constraints.js";
import { applyConstraint as callApiConstraint } from "../lib/api.js";
import {
  getToken,
  clearToken,
  getMe,
  logout as doLogout,
  listDocuments,
  createDocument,
  updateDocument,
  deleteDocument,
} from "../lib/docsApi.js";

function mapServerDoc(doc) {
  const words = doc.content ? doc.content.trim().split(/\s+/).length : 0;
  return {
    id: doc.id,
    title: doc.title,
    content: doc.content,
    words,
    chars: doc.content ? doc.content.length : 0,
    edited: new Date(doc.updated_at).toLocaleDateString(),
    owner_id: doc.owner_id,
    created_at: doc.created_at,
    updated_at: doc.updated_at,
  };
}

export default function WritingStudio() {
  /* ── documents & auth ──────────────────────────────────────────────── */
  const [docs, setDocs] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [user, setUser] = useState(null);
  const [authOpen, setAuthOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  /* ── studio chrome ─────────────────────────────────────────────────── */
  const [logOpen, setLogOpen] = useState(true);
  const [log, setLog] = useState([]);
  const [menu, setMenu] = useState(null);
  const [palette, setPalette] = useState(false);
  const [paramFor, setParamFor] = useState(null);
  const [toast, setToast] = useState(null);
  const [lineNumbers, setLineNumbers] = useState(true);
  const [tick, setTick] = useState(0);
  const proseRef = useRef(null);

  const activeDoc = docs.find((d) => d.id === activeId) || docs[0];

  function getProseText() {
    return proseRef.current
      ? proseRef.current.innerText.replace(/\s+/g, " ").trim()
      : "";
  }

  const text = getProseText();
  const words = text ? text.split(/\s+/).length : 0;
  const chars = text.length;

  /* ── init: load server docs if logged in, otherwise local / seed ────── */
  useEffect(() => {
    async function init() {
      const token = getToken();
      if (token) {
        try {
          const me = await getMe();
          setUser(me);
          const serverDocs = await listDocuments();
          const mapped = serverDocs.map(mapServerDoc);
          setDocs(mapped);
          setActiveId(mapped[0]?.id || null);
          return;
        } catch {
          clearToken();
        }
      }

      const raw = localStorage.getItem("ap_docs");
      if (raw) {
        try {
          const local = JSON.parse(raw);
          setDocs(local);
          setActiveId(local[0]?.id || null);
          return;
        } catch {}
      }

      const seed = SEED_DOCS.map((d, i) => ({
        ...d,
        content: i === 0 ? SEED_PROSE : "",
      }));
      setDocs(seed);
      setActiveId(seed[0]?.id || null);
    }
    init();
  }, []);

  /* ── persist docs to localStorage ────────────────────────────────────── */
  useEffect(() => {
    if (docs.length > 0) {
      localStorage.setItem("ap_docs", JSON.stringify(docs));
    }
  }, [docs]);

  /* ── keep prose content in sync with active doc ────────────────────── */
  useEffect(() => {
    if (!activeId) return;
    const doc = docs.find((d) => d.id === activeId);
    if (proseRef.current && doc) {
      proseRef.current.innerHTML = doc.content
        ? doc.content.split("\n\n").map((p) => `<p>${p}</p>`).join("")
        : "";
    }
    setTick((t) => t + 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeId]);

  /* ── update metadata (words, edited, content) on every input ───────── */
  useEffect(() => {
    const t = getProseText();
    const w = t ? t.split(/\s+/).length : 0;
    const c = t.length;
    setDocs((prev) =>
      prev.map((d) =>
        d.id === activeId
          ? { ...d, words: w, chars: c, edited: "just now", content: t }
          : d
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tick, activeId]);

  /* ── keyboard shortcuts ──────────────────────────────────────────────── */
  useEffect(() => {
    function key(e) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPalette(true);
        setMenu(null);
      }
    }
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, []);

  /* ── selection → contextual menu ─────────────────────────────────────── */
  const onMouseUp = useCallback(() => {
    setTimeout(() => {
      const sel = window.getSelection();
      if (!sel || sel.isCollapsed || !sel.toString().trim()) {
        setMenu(null);
        return;
      }
      const node = sel.anchorNode;
      if (!proseRef.current || !proseRef.current.contains(node)) return;
      const rect = sel.getRangeAt(0).getBoundingClientRect();
      const host = proseRef.current.closest(".ws-canvas").getBoundingClientRect();
      const scroll = proseRef.current.closest(".ws-canvas").scrollTop;
      const selText = sel.toString().trim();
      setMenu({
        x: Math.min(rect.left - host.left + 8, host.width - 290),
        y: rect.bottom - host.top + scroll + 8,
        wordCount: selText.split(/\s+/).length,
        text: selText,
      });
    }, 0);
  }, []);

  /* ── document actions ──────────────────────────────────────────────── */
  function handleNewDoc() {
    const id = `local_${Date.now()}`;
    const newDoc = {
      id,
      title: "Untitled",
      content: "",
      words: 0,
      chars: 0,
      edited: "just now",
    };
    setDocs((prev) => [newDoc, ...prev]);
    setActiveId(id);
    setPalette(false);
  }

  function handleDeleteDoc(id) {
    if (user && !String(id).startsWith("local_")) {
      deleteDocument(id).catch((err) => {
        setToast(`Delete failed: ${err.message}`);
        setTimeout(() => setToast(null), 3000);
      });
    }
    setDocs((prev) => {
      const next = prev.filter((d) => d.id !== id);
      if (activeId === id) {
        setActiveId(next[0]?.id || null);
      }
      return next;
    });
  }

  function handleRenameDoc(id, title) {
    setDocs((prev) =>
      prev.map((d) => (d.id === id ? { ...d, title } : d))
    );
  }

  /* ── auth actions ──────────────────────────────────────────────────── */
  async function handleLogin() {
    setAuthOpen(false);
    try {
      const me = await getMe();
      setUser(me);
      const serverDocs = await listDocuments();
      const mapped = serverDocs.map(mapServerDoc);
      setDocs((prev) => {
        const existing = new Set(prev.map((d) => d.id));
        const novel = mapped.filter((d) => !existing.has(d.id));
        return [...prev, ...novel];
      });
      setToast(`Welcome, ${me.username}`);
      setTimeout(() => setToast(null), 2000);
    } catch (err) {
      setToast(`Login failed: ${err.message}`);
      setTimeout(() => setToast(null), 3000);
    }
  }

  function handleLogout() {
    doLogout();
    setUser(null);
    const raw = localStorage.getItem("ap_docs");
    if (raw) {
      try {
        const local = JSON.parse(raw);
        setDocs(local);
        setActiveId(local[0]?.id || null);
      } catch {
        setDocs([]);
        setActiveId(null);
      }
    } else {
      const seed = SEED_DOCS.map((d, i) => ({
        ...d,
        content: i === 0 ? SEED_PROSE : "",
      }));
      setDocs(seed);
      setActiveId(seed[0]?.id || null);
    }
  }

  /* ── save ──────────────────────────────────────────────────────────── */
  async function handleSave() {
    if (saving) return;
    const doc = docs.find((d) => d.id === activeId);
    if (!doc) return;

    if (!user) {
      setAuthOpen(true);
      return;
    }

    setSaving(true);
    try {
      const t = getProseText();
      if (String(doc.id).startsWith("local_")) {
        const created = await createDocument(doc.title, t);
        const mapped = mapServerDoc(created);
        setDocs((prev) => prev.map((d) => (d.id === doc.id ? mapped : d)));
        setActiveId(mapped.id);
        setToast("Saved to your account");
      } else {
        await updateDocument(doc.id, doc.title, t);
        setDocs((prev) =>
          prev.map((d) =>
            d.id === doc.id
              ? { ...d, content: t, words: t.trim().split(/\s+/).length, edited: "just now" }
              : d
          )
        );
        setToast("Saved");
      }
    } catch (err) {
      setToast(`Save failed: ${err.message}`);
    } finally {
      setSaving(false);
      setTimeout(() => setToast(null), 3000);
    }
  }

  /* ── constraints ───────────────────────────────────────────────────── */
  async function runConstraint(c, paramValues = {}) {
    setToast(null);
    const source =
      (menu && menu.text) || text.slice(0, 120) || SEED_PROSE.slice(0, 120);
    try {
      const out = await callApiConstraint(
        c.api.category,
        c.api.method,
        source,
        paramValues
      );
      setLog((l) => [
        {
          name: c.name,
          tag: c.cat,
          preview: out.length > 160 ? out.slice(0, 160) + "…" : out,
        },
        ...l,
      ]);
      setLogOpen(true);
      setMenu(null);
      setPalette(false);
      setParamFor(null);
      setToast(`${c.name} applied`);
      setTimeout(() => setToast(null), 1800);
      window.getSelection().removeAllRanges();
    } catch (err) {
      setToast(`Error: ${err.message}`);
      setTimeout(() => setToast(null), 3000);
    }
  }

  function chooseConstraint(c) {
    if (c.params && c.params.length > 0) {
      setParamFor(c);
      setPalette(false);
      setMenu(null);
    } else {
      runConstraint(c);
    }
  }

  /* ── render ────────────────────────────────────────────────────────── */
  return (
    <div className={`ws-app${logOpen ? " rail-open" : ""}`}>
      <Sidebar
        docs={docs}
        activeId={activeId}
        onSelect={setActiveId}
        onNew={handleNewDoc}
        onDelete={handleDeleteDoc}
        onRename={handleRenameDoc}
        user={user}
        onLogin={() => setAuthOpen(true)}
        onLogout={handleLogout}
      />

      <div className="ws-main">
        <TopBar
          title={activeDoc?.title || "Untitled"}
          words={words}
          chars={chars}
          logOpen={logOpen}
          lineNumbers={lineNumbers}
          onOpenPalette={() => setPalette(true)}
          onToggleLog={() => setLogOpen((o) => !o)}
          onToggleLineNumbers={() => setLineNumbers((n) => !n)}
          onSave={handleSave}
          saving={saving}
        />

        <div
          className="ws-canvas"
          onMouseUp={onMouseUp}
          style={{ position: "relative" }}
        >
          <div className="ws-page">
            <h1 className="ws-page__h">{activeDoc?.title || "Untitled"}</h1>
            <div className="ws-page__byline">
              <span>DRAFT</span>
              <span>·</span>
              <span>{activeDoc?.words ?? 0} words</span>
              <span>·</span>
              <span>edited {activeDoc?.edited || "just now"}</span>
            </div>
            <div
              className={`ws-prose${lineNumbers ? " line-numbers" : ""}`}
              ref={proseRef}
              contentEditable
              suppressContentEditableWarning
              spellCheck={false}
              onInput={() => setTick((t) => t + 1)}
            />
          </div>

          {menu && (
            <ContextMenu
              pos={menu}
              onRun={chooseConstraint}
              onMore={() => {
                setPalette(true);
                setMenu(null);
              }}
              onClose={() => setMenu(null)}
            />
          )}
        </div>
      </div>

      {logOpen && <ConstraintLog items={log} onClose={() => setLogOpen(false)} />}

      {palette && (
        <CommandPalette onRun={chooseConstraint} onClose={() => setPalette(false)} />
      )}
      {paramFor && (
        <ParamDialog
          constraint={paramFor}
          onConfirm={(v) => runConstraint(paramFor, v)}
          onClose={() => setParamFor(null)}
        />
      )}

      {authOpen && <AuthModal onClose={() => setAuthOpen(false)} onLogin={handleLogin} />}

      {toast && (
        <div
          style={{
            position: "fixed",
            bottom: 24,
            left: "50%",
            transform: "translateX(-50%)",
            background: "var(--ap-ink)",
            color: "var(--ap-yellow)",
            padding: "11px 18px",
            borderRadius: "var(--r-md)",
            boxShadow: "var(--shadow-lg)",
            zIndex: 200,
            font: "600 13px var(--font-sans)",
            display: "flex",
            alignItems: "center",
            gap: 9,
          }}
        >
          <Icon name="dices" size={15} /> {toast}
        </div>
      )}
    </div>
  );
}
