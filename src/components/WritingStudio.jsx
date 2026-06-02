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
  const [logOpen, setLogOpen] = useState(false);
  const [log, setLog] = useState([]);
  const [menu, setMenu] = useState(null);
  const [palette, setPalette] = useState(false);
  const [paramFor, setParamFor] = useState(null);
  const [restorePrompt, setRestorePrompt] = useState(null);
  const [deletePrompt, setDeletePrompt] = useState(null);
  const [toast, setToast] = useState(null);
  const [lineNumbers, setLineNumbers] = useState(true);
  const [kofiOpen, setKofiOpen] = useState(false);
  const [sideOpen, setSideOpen] = useState(false);
  const [sidePinned, setSidePinned] = useState(() => {
    try { return localStorage.getItem("ap-side-pinned") === "true"; } catch { return false; }
  });
  const proseRef = useRef(null);
  const lineNumRef = useRef(null);
  const lineMirrorRef = useRef(null);
  const [lineHeights, setLineHeights] = useState([]);

  const activeDoc = docs.find((d) => d.id === activeId) || docs[0];

  function getProseText() {
    return activeDoc?.content || "";
  }

  function getSelectionOffsets() {
    const el = proseRef.current;
    if (!el) return null;
    const start = el.selectionStart;
    const end = el.selectionEnd;
    if (start === end) return null;
    return { start, end };
  }

  function setProseHtml(content) {
    setDocs((prev) =>
      prev.map((d) =>
        d.id === activeId ? { ...d, content: content || "" } : d
      )
    );
  }

  /* counts are kept in document state and updated on input */
  const text = activeDoc?.content || "";

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

      // Guest: one transient in-memory document, nothing persisted
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
    init();
  }, []);

  /* ── persist sidebar pin preference ───────────────────────────────────── */
  useEffect(() => {
    try { localStorage.setItem("ap-side-pinned", String(sidePinned)); } catch {}
  }, [sidePinned]);

  /* ── no localStorage fallback: guests work in memory only ───────────── */

  /* active doc content is bound directly to the textarea value */

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

  /* ── textarea change handler (keeps state & counts in sync) ────────── */
  function handleProseChange(e) {
    const t = e.target.value;
    const w = t.trim() === "" ? 0 : t.trim().split(/\s+/).length;
    const c = t.length;
    setDocs((prev) =>
      prev.map((d) =>
        d.id === activeId
          ? { ...d, content: t, words: w, chars: c, edited: "just now", dirty: true }
          : d
      )
    );
  }

  function handleProseScroll(e) {
    if (lineNumRef.current) {
      lineNumRef.current.scrollTop = e.target.scrollTop;
    }
  }

  /* ── line-number height measurement (mirror div) ───────────────────── */
  const measureLineHeights = useCallback(() => {
    if (!lineMirrorRef.current || !proseRef.current) return;
    const ta = proseRef.current;
    const mirror = lineMirrorRef.current;
    const text = activeDoc?.content || "";
    const lines = text.split("\n");

    /* copy the textarea’s box-model / font so wrapping is identical */
    const cs = window.getComputedStyle(ta);
    const padL = parseFloat(cs.paddingLeft);
    const padR = parseFloat(cs.paddingRight);
    mirror.style.width = (ta.clientWidth - padL - padR) + "px";
    mirror.style.font = cs.font;
    mirror.style.lineHeight = cs.lineHeight;
    mirror.style.letterSpacing = cs.letterSpacing;
    mirror.style.wordSpacing = cs.wordSpacing;
    mirror.style.textIndent = cs.textIndent;
    mirror.style.boxSizing = "border-box";
    mirror.style.padding = "0";
    mirror.style.border = "none";
    mirror.style.whiteSpace = "pre-wrap";
    mirror.style.wordWrap = "break-word";
    mirror.style.overflowWrap = "break-word";

    /* rebuild mirror content */
    mirror.innerHTML = "";
    for (const line of lines) {
      const div = document.createElement("div");
      /* zero-width space keeps empty lines from collapsing to 0 height */
      div.textContent = line || "\u200B";
      mirror.appendChild(div);
    }

    /* read rendered heights */
    const heights = Array.from(mirror.children).map((c) => c.offsetHeight);
    setLineHeights(heights);
  }, [activeDoc?.content]);

  /* debounced re-measure on text change / resize */
  useEffect(() => {
    if (!lineNumbers) return;
    const timer = setTimeout(measureLineHeights, 120);
    return () => clearTimeout(timer);
  }, [measureLineHeights, lineNumbers]);

  useEffect(() => {
    if (!lineNumbers) return;
    const onResize = () => measureLineHeights();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [measureLineHeights, lineNumbers]);

  /* ── auto-save revision every 60 seconds while typing ───────────────── */
  useEffect(() => {
    if (autoSaveRef.current) {
      clearInterval(autoSaveRef.current);
    }
    if (!user) return; // no auto-save for guests
    if (!activeDoc?.dirty) return;

    autoSaveRef.current = setInterval(() => {
      createRevision();
    }, 60000);

    return () => {
      if (autoSaveRef.current) clearInterval(autoSaveRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeDoc?.dirty, activeId, user]);

  /* ── selection → contextual menu ─────────────────────────────────────── */
  const onMouseUp = useCallback(() => {
    setTimeout(() => {
      const el = proseRef.current;
      if (!el || document.activeElement !== el) {
        setMenu(null);
        return;
      }
      const start = el.selectionStart;
      const end = el.selectionEnd;
      if (start === end) {
        setMenu(null);
        return;
      }
      const selText = el.value.slice(start, end).trim();
      if (!selText) {
        setMenu(null);
        return;
      }
      const rect = el.getBoundingClientRect();
      const host = el.closest(".ws-canvas").getBoundingClientRect();
      const scroll = el.closest(".ws-canvas").scrollTop;
      setMenu({
        x: Math.min(rect.left - host.left + rect.width / 2, host.width - 290),
        y: rect.bottom - host.top + scroll - 40,
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

  function handleRequestDelete(id, title) {
    setDeletePrompt({ id, title });
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
    if (!user) return; // guests do not get revisions
    if (String(activeId).startsWith("local_")) return; // unsaved local docs don't get revisions

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
    setTimeout(() => setToast(null), 1500);
  }

  function doRestore(rev, changeTitle) {
    setDocs((prev) =>
      prev.map((d) =>
        d.id === activeId
          ? {
              ...d,
              title: changeTitle ? rev.title : d.title,
              content: rev.content,
              words: rev.words,
              chars: rev.chars,
              dirty: true,
            }
          : d
      )
    );
    setProseHtml(rev.content);
    setToast("Version restored");
    setTimeout(() => setToast(null), 2000);
  }

  function handleRestoreRevision(rev) {
    const currentTitle = activeDoc?.title || "Untitled";
    if (rev.title && rev.title !== currentTitle) {
      setRestorePrompt(rev);
      return;
    }
    doRestore(rev, false);
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
    setRevisions({});
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
      (menu && menu.text) || text || SEED_PROSE.slice(0, 120);
    const beforeText = getProseText();
    try {
      const out = await callApiConstraint(
        c.api.category,
        c.api.method,
        source,
        paramValues
      );

      let newContent = out;
      let cursorPos = 0;
      if (menu) {
        const offsets = getSelectionOffsets();
        if (offsets) {
          newContent = beforeText.slice(0, offsets.start) + out + beforeText.slice(offsets.end);
          cursorPos = offsets.start + out.length;
        }
      }
      const w = newContent ? newContent.split(/\s+/).length : 0;
      const cCount = newContent.length;
      setDocs((prev) =>
        prev.map((d) =>
          d.id === activeId
            ? { ...d, content: newContent, words: w, chars: cCount, edited: "just now", dirty: true }
            : d
        )
      );
      if (proseRef.current) {
        requestAnimationFrame(() => {
          proseRef.current.setSelectionRange(cursorPos, cursorPos);
        });
      }

      setLog((l) => {
        const entry = {
          id: Date.now(),
          name: c.name,
          tag: c.cat,
          preview: out.length > 160 ? out.slice(0, 160) + "…" : out,
          beforeText,
          afterText: newContent,
        };
        if (l.length === 0) {
          const originalEntry = {
            id: "original",
            name: "Original",
            tag: "",
            preview: beforeText.length > 160 ? beforeText.slice(0, 160) + "…" : beforeText,
            beforeText,
            afterText: beforeText,
          };
          return [originalEntry, entry];
        }
        return [l[0], entry, ...l.slice(1)];
      });
      setLogOpen(true);
      setMenu(null);
      setPalette(false);
      setParamFor(null);
      setToast(`${c.name} applied`);
      setTimeout(() => setToast(null), 1800);
    } catch (err) {
      setToast(`Error: ${err.message}`);
      setTimeout(() => setToast(null), 3000);
    }
  }

  function handleUndo(entryId) {
    const entry = log.find((l) => l.id === entryId);
    if (!entry) return;
    setProseHtml(entry.beforeText);
    const w = entry.beforeText ? entry.beforeText.split(/\s+/).length : 0;
    const cCount = entry.beforeText.length;
    setDocs((prev) =>
      prev.map((d) =>
        d.id === activeId
          ? { ...d, content: entry.beforeText, words: w, chars: cCount, edited: "just now", dirty: true }
          : d
      )
    );
  }

  function handleRedo(entryId) {
    const entry = log.find((l) => l.id === entryId);
    if (!entry) return;
    setProseHtml(entry.afterText);
    const w = entry.afterText ? entry.afterText.split(/\s+/).length : 0;
    const cCount = entry.afterText.length;
    setDocs((prev) =>
      prev.map((d) =>
        d.id === activeId
          ? { ...d, content: entry.afterText, words: w, chars: cCount, edited: "just now", dirty: true }
          : d
      )
    );
  }

  function handleRemoveLogEntry(entryId) {
    setLog((prev) => prev.filter((l) => l.id !== entryId));
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
    <div className={`ws-app${logOpen || revOpen ? " rail-open" : ""}${sideOpen ? " side-open" : ""}${sidePinned ? " side-pinned" : ""}`}>
      <Sidebar
        docs={docs}
        activeId={activeId}
        onSelect={(id) => { setActiveId(id); setSideOpen(false); }}
        onNew={handleNewDoc}
        onDelete={handleDeleteDoc}
        onRequestDelete={handleRequestDelete}
        onRename={handleRenameDoc}
        user={user}
        onLogin={() => setAuthOpen(true)}
        onLogout={handleLogout}
        sidePinned={sidePinned}
        onTogglePin={() => setSidePinned((p) => !p)}
      />

      <div className="ws-scrim--side" onClick={() => setSideOpen(false)} />

      <div className="ws-main">
        <TopBar
          title={activeDoc?.title || "Untitled"}
          words={activeDoc?.words ?? 0}
          chars={activeDoc?.chars ?? 0}
          logOpen={logOpen}
          lineNumbers={lineNumbers}
          onOpenPalette={() => setPalette(true)}
          onToggleLog={() => { setLogOpen((o) => !o); setRevOpen(false); setSideOpen(false); }}
          onToggleLineNumbers={() => setLineNumbers((n) => !n)}
          onToggleRevisions={() => { setRevOpen((o) => !o); setLogOpen(false); setSideOpen(false); }}
          revOpen={revOpen}
          onSave={handleSave}
          saving={saving}
          sidePinned={sidePinned}
          onToggleSide={() => { setSideOpen((o) => !o); setLogOpen(false); setRevOpen(false); }}
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
            <div className="ws-prose-wrap">
              {lineNumbers && (
                <div className="ws-line-numbers" ref={lineNumRef}>
                  {(activeDoc?.content || "").split('\n').map((_, i) => (
                    <div
                      key={i}
                      className="ws-line-num"
                      style={{ height: lineHeights[i] || undefined }}
                    >
                      {i + 1}
                    </div>
                  ))}
                </div>
              )}
              {/* hidden mirror for measuring wrapped line heights */}
              <div ref={lineMirrorRef} className="ws-line-mirror" aria-hidden="true" />
              <textarea
                className="ws-prose"
                ref={proseRef}
                value={activeDoc?.content || ""}
                onChange={handleProseChange}
                onMouseUp={onMouseUp}
                onScroll={handleProseScroll}
                spellCheck={false}
                placeholder="Start writing..."
              />
            </div>
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

      {logOpen && <ConstraintLog items={log} onClose={() => setLogOpen(false)} onUndo={handleUndo} onRedo={handleRedo} onRemove={handleRemoveLogEntry} />}

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

      {restorePrompt && (
        <div
          className="ws-scrim"
          onClick={(e) => {
            if (e.target === e.currentTarget) setRestorePrompt(null);
          }}
        >
          <div className="ws-dialog" style={{ width: 420, maxWidth: "92vw" }}>
            <div className="ws-dialog__h">
              <div className="t">Keep or change title?</div>
              <div className="d">The revision has a different title from the current document.</div>
            </div>
            <div className="ws-dialog__b">
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 4 }}>
                <div>
                  <span style={{ font: "var(--t-label)", color: "var(--fg-3)", textTransform: "uppercase", letterSpacing: "0.12em" }}>Current title</span>
                  <div style={{ font: "500 14px var(--font-sans)", color: "var(--fg-1)", marginTop: 4 }}>{activeDoc?.title || "Untitled"}</div>
                </div>
                <div>
                  <span style={{ font: "var(--t-label)", color: "var(--fg-3)", textTransform: "uppercase", letterSpacing: "0.12em" }}>Revision title</span>
                  <div style={{ font: "500 14px var(--font-sans)", color: "var(--fg-1)", marginTop: 4 }}>{restorePrompt.title}</div>
                </div>
              </div>
            </div>
            <div className="ws-dialog__f">
              <button
                className="ws-btn ws-btn--ghost"
                onClick={() => {
                  doRestore(restorePrompt, false);
                  setRestorePrompt(null);
                }}
              >
                Keep current title
              </button>
              <button
                className="ws-btn ws-btn--primary"
                onClick={() => {
                  doRestore(restorePrompt, true);
                  setRestorePrompt(null);
                }}
              >
                Change to revision title
              </button>
            </div>
          </div>
        </div>
      )}

      {deletePrompt && (
        <div
          className="ws-scrim"
          onClick={(e) => {
            if (e.target === e.currentTarget) setDeletePrompt(null);
          }}
        >
          <div className="ws-dialog" style={{ width: 380, maxWidth: "92vw" }}>
            <div className="ws-dialog__h">
              <div className="t">Delete document?</div>
              <div className="d">
                "{deletePrompt.title}" will be permanently removed. This cannot be undone.
              </div>
            </div>
            <div className="ws-dialog__f">
              <button
                className="ws-btn ws-btn--ghost"
                onClick={() => setDeletePrompt(null)}
              >
                Cancel
              </button>
              <button
                className="ws-btn ws-btn--primary"
                onClick={() => {
                  handleDeleteDoc(deletePrompt.id);
                  setDeletePrompt(null);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

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

      <button
        className="ws-kofi-btn"
        onClick={() => setKofiOpen(true)}
        title="Support us on Ko-fi"
      >
        <Icon name="coffee" size={14} />
        <span className="btn-lbl">Support us!</span>
      </button>

      {kofiOpen && (
        <div
          className="ws-scrim"
          onClick={(e) => {
            if (e.target === e.currentTarget) setKofiOpen(false);
          }}
        >
          <div className="ws-dialog ws-kofi-modal">
            <div className="ws-dialog__h" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div className="t">Support Applied Poetics</div>
              <button
                className="ws-btn ws-btn--icon"
                onClick={() => setKofiOpen(false)}
                title="Close"
                style={{ marginLeft: "auto" }}
              >
                <Icon name="x" size={16} />
              </button>
            </div>
            <div className="ws-dialog__b" style={{ padding: 0 }}>
              <iframe
                id="kofiframe"
                src="https://ko-fi.com/appliedpoetics/?hidefeed=true&widget=true&embed=true&preview=true"
                style={{ border: "none", width: "100%", height: "75vh", background: "#f9f9f9", display: "block" }}
                title="appliedpoetics"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
