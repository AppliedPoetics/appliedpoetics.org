import React, { useState, useRef, useEffect } from "react";
import Icon from "./Icon.jsx";
import { CONSTRAINTS, CATEGORIES } from "../lib/constraints.js";

export default function CommandPalette({ onRun, onClose }) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const [hl, setHl] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  const results = CONSTRAINTS.filter((c) => {
    const okCat = cat === "All" || c.cat === cat;
    const okQ =
      !q ||
      c.name.toLowerCase().includes(q.toLowerCase()) ||
      c.desc.toLowerCase().includes(q.toLowerCase());
    return okCat && okQ;
  });

  useEffect(() => {
    setHl(0);
  }, [q, cat]);

  function onKey(e) {
    if (e.key === "Escape") return onClose();
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHl((h) => Math.min(h + 1, results.length - 1));
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setHl((h) => Math.max(h - 1, 0));
    }
    if (e.key === "Enter" && results[hl]) onRun(results[hl]);
  }

  return (
    <div className="ws-scrim" onMouseDown={onClose}>
      <div className="ws-pal" onMouseDown={(e) => e.stopPropagation()} onKeyDown={onKey}>
        <div className="ws-pal__in">
          <Icon name="search" size={19} style={{ color: "var(--fg-4)" }} />
          <input
            ref={inputRef}
            value={q}
            placeholder="Search constraints — lipogram, markov, sestina…"
            onChange={(e) => setQ(e.target.value)}
          />
          <kbd style={{ font: "var(--t-mono-sm)", color: "var(--fg-4)" }}>ESC</kbd>
        </div>

        <div className="ws-pal__cats">
          {["All", ...CATEGORIES].map((c) => (
            <button
              key={c}
              className={`ws-pal__cat${cat === c ? " on" : ""}`}
              onClick={() => setCat(c)}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="ws-pal__list">
          {results.length === 0 && (
            <div style={{ padding: "28px 16px", textAlign: "center", color: "var(--fg-3)", font: "var(--t-body-sm)" }}>
              No constraint by that name — yet.
            </div>
          )}
          {results.map((c, i) => (
            <div
              key={c.id}
              className={`ws-pal__row${i === hl ? " hl" : ""}`}
              onMouseEnter={() => setHl(i)}
              onClick={() => onRun(c)}
            >
              <div className="ic"><Icon name={c.icon} size={16} /></div>
              <div>
                <div className="nm">{c.name}</div>
                <div className="ds">{c.desc}</div>
              </div>
              <div className="cat">{c.cat}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
