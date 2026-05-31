import React from "react";
import Button from "./Button.jsx";
import Icon from "./Icon.jsx";

function fmt(ts) {
  const d = new Date(ts);
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

export default function RevisionLog({ revisions, onClose, onSelect, onCreate, activeDocTitle }) {
  return (
    <aside className="ws-log">
      <div className="ws-log__head">
        <span className="t">Revisions</span>
        <div style={{ display: "flex", gap: 8 }}>
          <Button variant="ghost" icon="plus" onClick={onCreate} title="Save revision" />
          <Button variant="ghost" icon="x" onClick={onClose} />
        </div>
      </div>

      {revisions.length === 0 ? (
        <div className="ws-log__empty">
          <img src="/assets/logo.png" alt="" />
          <div className="t">No revisions yet</div>
          <div className="d">
            Revisions are saved automatically every 60 seconds while you type,
            or you can save one manually with the + button above.
          </div>
        </div>
      ) : (
        <div className="ws-log__scroll">
          {revisions.map((rev, i) => (
            <div
              className="ws-logitem ws-rev"
              key={rev.id}
              onClick={() => onSelect(rev)}
            >
              <div className="ws-logitem__h">
                <span className="ws-logitem__nm">{rev.title || activeDocTitle}</span>
                <span className="ws-logitem__tag">{fmt(rev.timestamp)}</span>
              </div>
              <div className="ws-logitem__prev">
                {rev.content.length > 120 ? rev.content.slice(0, 120) + "…" : rev.content}
              </div>
              <div className="ws-rev__meta">
                <span>{rev.words} words</span>
                <span>·</span>
                <span>{rev.chars} chars</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </aside>
  );
}
