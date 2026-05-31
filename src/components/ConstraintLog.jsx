import React from "react";
import Button from "./Button.jsx";

export default function ConstraintLog({ items, onClose }) {
  return (
    <aside className="ws-log">
      <div className="ws-log__head">
        <span className="t">Changes</span>
        <Button variant="ghost" icon="x" onClick={onClose} />
      </div>

      {items.length === 0 ? (
        <div className="ws-log__empty">
          <img src="/assets/logo.png" alt="" />
          <div className="t">The lines are still</div>
          <div className="d">
            Select a passage and cast a constraint on it. Every change you make
            lands here — the text keeps a memory of each turn of chance.
          </div>
        </div>
      ) : (
        <div className="ws-log__scroll">
          {items.map((it, i) => (
            <div className="ws-logitem" key={i}>
              <div className="ws-logitem__h">
                <span className="ws-logitem__nm">{it.name}</span>
                <span className="ws-logitem__tag">{it.tag}</span>
              </div>
              <div className="ws-logitem__prev">{it.preview}</div>
            </div>
          ))}
        </div>
      )}
    </aside>
  );
}
