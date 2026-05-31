import React, { useState, useRef, useCallback, useEffect } from "react";
import Sidebar from "./Sidebar.jsx";
import TopBar from "./TopBar.jsx";
import ContextMenu from "./ContextMenu.jsx";
import CommandPalette from "./CommandPalette.jsx";
import ParamDialog from "./ParamDialog.jsx";
import ConstraintLog from "./ConstraintLog.jsx";
import Icon from "./Icon.jsx";
import { SEED_DOCS, SEED_PROSE } from "../lib/constraints.js";
import { applyConstraint as callApiConstraint } from "../lib/api.js";

export default function WritingStudio() {
  const [docs] = useState(SEED_DOCS);
  const [activeId, setActiveId] = useState("d1");
  const [logOpen, setLogOpen] = useState(true);
  const [log, setLog] = useState([]);
  const [menu, setMenu] = useState(null); // {x,y,wordCount,text}
  const [palette, setPalette] = useState(false);
  const [paramFor, setParamFor] = useState(null);
  const [toast, setToast] = useState(null);
  const [lineNumbers, setLineNumbers] = useState(true);
  const [tick, setTick] = useState(0);
  const proseRef = useRef(null);

  const activeDoc = docs.find((d) => d.id === activeId) || docs[0];

  function getProseText() {
    return proseRef.current ? proseRef.current.innerText.replace(/\s+/g, " ").trim() : "";
  }

  const text = getProseText();
  const words = text ? text.split(/\s+/).length : 0;
  const chars = text.length;

  /* initialise prose once */
  useEffect(() => {
    if (proseRef.current) {
      proseRef.current.innerHTML = SEED_PROSE.split("\n\n")
        .map((p) => `<p>${p}</p>`)
        .join("");
    }
  }, []);

  /* ⌘K opens the palette */
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

  /* selection in the prose → anchor the contextual menu */
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

  async function runConstraint(c, paramValues = {}) {
    setToast(null);
    const source = (menu && menu.text) || text.slice(0, 120) || SEED_PROSE.slice(0, 120);
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

  return (
    <div className={`ws-app${logOpen ? " rail-open" : ""}`}>
      <Sidebar
        docs={docs}
        activeId={activeId}
        onSelect={setActiveId}
        onNew={() => setPalette(false)}
      />

      <div className="ws-main">
        <TopBar
          title={activeDoc.title}
          words={words}
          chars={chars}
          logOpen={logOpen}
          lineNumbers={lineNumbers}
          onOpenPalette={() => setPalette(true)}
          onToggleLog={() => setLogOpen((o) => !o)}
          onToggleLineNumbers={() => setLineNumbers((n) => !n)}
        />

        <div className="ws-canvas" onMouseUp={onMouseUp} style={{ position: "relative" }}>
          <div className="ws-page">
            <h1 className="ws-page__h">{activeDoc.title}</h1>
            <div className="ws-page__byline">
              <span>DRAFT</span>
              <span>·</span>
              <span>{activeDoc.words} words</span>
              <span>·</span>
              <span>edited {activeDoc.edited}</span>
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
