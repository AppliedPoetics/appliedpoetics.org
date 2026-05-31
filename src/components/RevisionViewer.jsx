import React, { useState } from "react";
import Button from "./Button.jsx";

function computeDiff(oldText, newText) {
  /* Very simple word-level diff for display purposes */
  const oldWords = oldText.split(/\s+/).filter(Boolean);
  const newWords = newText.split(/\s+/).filter(Boolean);
  const maxLen = Math.max(oldWords.length, newWords.length);
  const result = [];

  for (let i = 0; i < maxLen; i++) {
    const o = oldWords[i];
    const n = newWords[i];
    if (o === n) {
      result.push({ type: "same", text: n || o });
    } else if (o && !n) {
      result.push({ type: "removed", text: o });
    } else if (!o && n) {
      result.push({ type: "added", text: n });
    } else {
      result.push({ type: "removed", text: o });
      result.push({ type: "added", text: n });
    }
  }
  return result;
}

export default function RevisionViewer({ revision, currentTitle, currentContent, onRestore, onClose }) {
  const [mode, setMode] = useState("diff"); // "diff" | "preview"

  const diff = computeDiff(revision.content || "", currentContent || "");

  return (
    <div
      className="ws-scrim"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="ws-dialog" style={{ width: 640, maxWidth: "92vw" }}>
        <div className="ws-dialog__h">
          <div className="t">Revision</div>
          <div className="d">
            {new Date(revision.timestamp).toLocaleString()} · {revision.words} words
          </div>
        </div>

        <div className="ws-dialog__b" style={{ maxHeight: "50vh", overflowY: "auto" }}>
          <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
            <button
              className={`ws-btn ${mode === "diff" ? "ws-btn--ink" : "ws-btn--ghost"}`}
              onClick={() => setMode("diff")}
            >
              Changes
            </button>
            <button
              className={`ws-btn ${mode === "preview" ? "ws-btn--ink" : "ws-btn--ghost"}`}
              onClick={() => setMode("preview")}
            >
              Preview
            </button>
          </div>

          {mode === "diff" ? (
            <div
              className="ws-rev-diff"
              style={{
                font: "400 15px/1.5 var(--font-serif)",
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
              }}
            >
              {diff.map((part, i) => (
                <span
                  key={i}
                  style={{
                    background:
                      part.type === "added"
                        ? "#d4edda"
                        : part.type === "removed"
                        ? "#f8d7da"
                        : "transparent",
                    color:
                      part.type === "added"
                        ? "#155724"
                        : part.type === "removed"
                        ? "#721c24"
                        : "inherit",
                    textDecoration: part.type === "removed" ? "line-through" : "none",
                    padding: "0 2px",
                    borderRadius: 2,
                  }}
                >
                  {part.text}{" "}
                </span>
              ))}
            </div>
          ) : (
            <div
              style={{
                font: "400 15px/1.5 var(--font-serif)",
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
                color: "var(--fg-1)",
              }}
            >
              {revision.content || "(empty)"}
            </div>
          )}
        </div>

        <div className="ws-dialog__f">
          <button className="ws-btn ws-btn--ghost" onClick={onClose}>
            Cancel
          </button>
          <button
            className="ws-btn ws-btn--primary"
            onClick={() => {
              onRestore(revision);
              onClose();
            }}
          >
            Restore this version
          </button>
        </div>
      </div>
    </div>
  );
}
