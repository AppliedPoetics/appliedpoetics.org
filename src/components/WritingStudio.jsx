import React, { useState, useRef, useCallback, useEffect } from "react";
import Sidebar from "./Sidebar.jsx";
import TopBar from "./TopBar.jsx";
import ContextMenu from "./ContextMenu.jsx";
import CommandPalette from "./CommandPalette.jsx";
import ParamDialog from "./ParamDialog.jsx";
import ConstraintLog from "./ConstraintLog.jsx";
import RevisionLog from "./RevisionLog.jsx";
import RevisionViewer from "./RevisionViewer.jsx";
import AuthModal from "./AuthModal.jsx";
import Icon from "./Icon.jsx";
import { SEED_PROSE } from "../lib/constraints.js";
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
  createRevisionDoc,
  deleteRevisions,
  parseRevTitle,
  parseRevisionDoc,
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
    dirty: false,
  };
}

function splitDocuments(all) {
  const real = [];
  const revMap = {};
  for (const d of all) {
    const parsed = parseRevTitle(d.title);
    if (parsed) {
      const rev = parseRevisionDoc(d);
      if (!revMap[parsed.parentId]) revMap[parsed.parentId] = [];
      revMap[parsed.parentId].push(rev);
    } else {
      real.push(d);
    }
  }
  for (const pid in revMap) {
    revMap[pid].sort((a, b) => b.timestamp - a.timestamp);
    revMap[pid] = revMap[pid].slice(0, 50);
  }
  return { real, revMap };
}

export default function WritingStudio() {
  /* ── documents & auth ──────────────────────────────────────────────── */
  const [docs, setDocs] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [user, setUser] = useState(null);
  const [authOpen, setAuthOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  /* ── revisions ─────────────────────────────────────────────────────── */
  const [revisions, setRevisions] = useState({}); // { [docId]: [...] }
  const [revOpen, setRevOpen] = useState(false);
  const [viewingRev, setViewingRev] = useState(null);
  const autoSaveRef = useRef(null);

  /* ── studio chrome ─────────────────────────────────────────────────── */
  const [logOpen, setLogOpen] = useState(true);
  const [log, setLog] = useState([]);
  const [menu, setMenu] = useState(null);
  const [palette, setPalette] = useState(false);
  const [paramFor, setParamFor] = useState(null);
  const [toast, setToast] = useState(null);
  const [lineNumbers, setLineNumbers] = useState(true);
  const proseRef = useRef(null);

  const activeDoc = docs.find((d) => d.id === activeId) || docs[0];

  function getProseText() {
    return proseRef.current ? proseRef.current.innerText.trim() : "";
  }

  /* Read count straight from the DOM on every render so the UI
     is never stale regardless of state batching. */
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
          const allDocs = await listDocuments();
          const { real, revMap } = splitDocuments(allDocs);
          setDocs(real.map(mapServerDoc));
          setRevisions(revMap);
          setActiveId(real[0]?.id || null);
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
        } catch {}
      }

      const revRaw = localStorage.getItem("ap_revisions");
      if (revRaw) {
        try {
          setRevisions(JSON.parse(revRaw));
        } catch {}
      }

      if (!raw) {
        const empty = {
          id: `local_${Date.now()}`,
          title: "Untitled",
          content: "",
          words: 0,
          chars: 0,
          edited: "just now",
          dirty: false,
        };
        setDocs([empty]);
        setActiveId(empty.id);
      }
    }
    init();
  }, []);

  /* ── persist docs & revisions to localStorage (guest fallback) ─────── */
  useEffect(() => {
    if (docs.length > 0) {
      localStorage.setItem("ap_docs", JSON.stringify(docs));
    }
  }, [docs]);

  useEffect(() => {
    if (!user) {
      localStorage.setItem("ap_revisions", JSON.stringify(revisions));
    }
  }, [revisions, user]);

  /* ── keep prose content in sync with active doc ────────────────────── */
  useEffect(() => {
    if (!activeId) return;
    const doc = docs.find((d) => d.id === activeId);
    if (proseRef.current && doc) {
      proseRef.current.innerHTML = doc.content
        ? doc.content.split("\n\n").map((p) => `<p>${p}</p>`).join("")
        : "";
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeId]);

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

  /* ── native input listener on the contentEditable field (more reliable
     than React's synthetic onInput for contentEditable in React 19) ───── */
  useEffect(() => {
    const el = proseRef.current;
    if (!el) return;

    function onNativeInput() {
      const t = getProseText();
      const w = t ? t.split(/\s+/).length : 0;
      const c = t.length;
      setDocs((prev) =>
        prev.map((d) =>
          d.id === activeId
            ? { ...d, words: w, chars: c, edited: "just now", content: t, dirty: true }
            : d
        )
      );
    }

    el.addEventListener("input", onNativeInput);
    return () => el.removeEventListener("input", onNativeInput);
  }, [activeId]);

  /* ── auto-save revision every 60 seconds while typing ───────────────── */
  useEffect(() => {
    if (autoSaveRef.current) {
      clearInterval(autoSaveRef.current);
    }
    if (!activeDoc?.dirty) return;

    autoSaveRef.current = setInterval(() => {
      createRevision();
    }, 60000);

    return () => {
      if (autoSaveRef.current) clearInterval(autoSaveRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeDoc?.dirty, activeId]);

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
      dirty: false,
    };
    setDocs((prev) => [newDoc, ...prev]);
    setActiveId(id);
    setPalette(false);
  }

  async function handleDeleteDoc(id) {
    if (user && !String(id).startsWith("local_")) {
      try {
        await deleteRevisions(id);
        await deleteDocument(id);
      } catch (err) {
        setToast(`Delete failed: ${err.message}`);
        setTimeout(() => setToast(null), 3000);
      }
    }
    setDocs((prev) => {
      const next = prev.filter((d) => d.id !== id);
      if (activeId === id) {
        if (next.length > 0) {
          setActiveId(next[0].id);
        } else {
          // Workspace is empty — create a blank default document
          const empty = {
            id: `local_${Date.now()}`,
            title: "Untitled",
            content: "",
            words: 0,
            chars: 0,
            edited: "just now",
            dirty: false,
          };
          setActiveId(empty.id);
          return [empty];
        }
      }
      return next;
    });
    setRevisions((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  }

  function handleRenameDoc(id, title) {
    setDocs((prev) =>
      prev.map((d) => (d.id === id ? { ...d, title, dirty: true } : d))
    );
  }

  /* ── revision actions ─────────────────────────────────────────────── */
  async function createRevision() {
    const doc = docs.find((d) => d.id === activeId);
    if (!doc) return;

    const rev = {
      id: `rev_${Date.now()}`,
      timestamp: Date.now(),
      title: doc.title,
      content: doc.content,
      words: doc.words,
      chars: doc.chars,
    };

    if (user && !String(activeId).startsWith("local_")) {
      try {
        const created = await createRevisionDoc(activeId, doc.content, doc.title);
        const serverRev = parseRevisionDoc(created);
        setRevisions((prev) => {
          const list = prev[activeId] || [];
          return { ...prev, [activeId]: [serverRev, ...list].slice(0, 50) };
        });
        setToast("Revision saved");
      } catch (err) {
        setToast(`Revision failed: ${err.message}`);
      }
    } else {
      setRevisions((prev) => {
        const list = prev[activeId] || [];
        return { ...prev, [activeId]: [rev, ...list].slice(0, 50) };
      });
      setToast("Revision saved");
    }
    setTimeout(() => setToast(null), 1500);
  }

  function handleRestoreRevision(rev) {
    setDocs((prev) =>
      prev.map((d) =>
        d.id === activeId
          ? {
              ...d,
              title: rev.title || d.title,
              content: rev.content,
              words: rev.words,
              chars: rev.chars,
              dirty: true,
            }
          : d
      )
    );
    setToast("Version restored");
    setTimeout(() => setToast(null), 2000);
  }

  /* ── auth actions ──────────────────────────────────────────────────── */
  async function handleLogin() {
    setAuthOpen(false);
    try {
      const me = await getMe();
      setUser(me);
      const allDocs = await listDocuments();
      const { real, revMap } = splitDocuments(allDocs);
      setDocs((prev) => {
        const existing = new Set(prev.map((d) => d.id));
        const novel = real.filter((d) => !existing.has(d.id)).map(mapServerDoc);
        return [...prev, ...novel];
      });
      setRevisions(revMap);
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
      const empty = {
        id: `local_${Date.now()}`,
        title: "Untitled",
        content: "",
        words: 0,
        chars: 0,
        edited: "just now",
        dirty: false,
      };
      setDocs([empty]);
      setActiveId(empty.id);
    }
    setRevisions({});
    const revRaw = localStorage.getItem("ap_revisions");
    if (revRaw) {
      try {
        setRevisions(JSON.parse(revRaw));
      } catch {}
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

        // Create an initial server revision for the newly-saved document
        try {
          const revCreated = await createRevisionDoc(mapped.id, t, mapped.title);
          const serverRev = parseRevisionDoc(revCreated);
          setRevisions((prev) => {
            const localRevs = prev[doc.id] || [];
            const next = { ...prev };
            delete next[doc.id];
            next[mapped.id] = [serverRev, ...localRevs.map((r) => ({ ...r, id: `rev_${Date.now()}_${Math.random()}` }))].slice(0, 50);
            return next;
          });
        } catch {
          // If initial revision creation fails, still migrate local revisions
          setRevisions((prev) => {
            const localRevs = prev[doc.id] || [];
            const next = { ...prev };
            delete next[doc.id];
            if (localRevs.length > 0) {
              next[mapped.id] = localRevs.map((r) => ({ ...r, id: `rev_${Date.now()}_${Math.random()}` }));
            }
            return next;
          });
        }

        setDocs((prev) => prev.map((d) => (d.id === doc.id ? mapped : d)));
        setActiveId(mapped.id);
        setToast("Saved to your account");
      } else {
        // Snapshot current state as a revision before overwriting
        try {
          const revCreated = await createRevisionDoc(doc.id, doc.content, doc.title);
          const serverRev = parseRevisionDoc(revCreated);
          setRevisions((prev) => {
            const list = prev[doc.id] || [];
            return { ...prev, [doc.id]: [serverRev, ...list].slice(0, 50) };
          });
        } catch {
          // If revision creation fails, still proceed with the save
        }

        await updateDocument(doc.id, doc.title, t);
        setDocs((prev) =>
          prev.map((d) =>
            d.id === doc.id
              ? { ...d, content: t, words: t.trim().split(/\s+/).length, edited: "just now", dirty: false }
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
    <div className={`ws-app${logOpen || revOpen ? " rail-open" : ""}`}>
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
          onToggleLog={() => { setLogOpen((o) => !o); setRevOpen(false); }}
          onToggleLineNumbers={() => setLineNumbers((n) => !n)}
          onToggleRevisions={() => { setRevOpen((o) => !o); setLogOpen(false); }}
          revOpen={revOpen}
          onSave={handleSave}
          saving={saving}
        />

        <div
          className="ws-canvas"
          onMouseUp={onMouseUp}
          style={{ position: "relative" }}
        >
          <div className="ws-page">
            <div className="ws-page__h-wrap">
              <h1
                className="ws-page__h"
                contentEditable
                suppressContentEditableWarning
                spellCheck={false}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    e.currentTarget.blur();
                  }
                }}
                onBlur={(e) => {
                  const next = e.currentTarget.innerText.trim() || "Untitled";
                  if (activeDoc && next !== activeDoc.title) {
                    handleRenameDoc(activeDoc.id, next);
                  }
                  e.currentTarget.innerText = next;
                }}
              >
                {activeDoc?.title || "Untitled"}
              </h1>
              <Icon name="pencil" size={16} />
            </div>
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

      {revOpen && (
        <RevisionLog
          revisions={revisions[activeId] || []}
          activeDocTitle={activeDoc?.title || "Untitled"}
          onClose={() => setRevOpen(false)}
          onSelect={(rev) => setViewingRev(rev)}
          onCreate={createRevision}
        />
      )}

      {viewingRev && (
        <RevisionViewer
          revision={viewingRev}
          currentTitle={activeDoc?.title || "Untitled"}
          currentContent={activeDoc?.content || ""}
          onRestore={handleRestoreRevision}
          onClose={() => setViewingRev(null)}
        />
      )}

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
