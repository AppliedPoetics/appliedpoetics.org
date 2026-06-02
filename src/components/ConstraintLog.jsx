import React from "react";
import Button from "./Button.jsx";
import Icon from "./Icon.jsx";

export default function ConstraintLog({ items, onClose, onUndo }) {
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
            <div className={`ws-logitem${it.id === "original" ? " ws-logitem--original" : ""}`} key={it.id}>
              <div className="ws-logitem__h">
                <span className="ws-logitem__nm">{it.name}</span>
                {it.tag && <span className="ws-logitem__tag">{it.tag}</span>}
                {it.id !== "original" && (
                  <button
                    className="ws-logitem__undo"
                    onClick={() => onUndo(it.id)}
                    title="Undo to this state"
                  >
                    <Icon name="undo" size={14} />
                  </button>
                )}
              </div>
              <div className="ws-logitem__prev">{it.preview}</div>
            </div>
          ))}
        </div>
      )}
    </aside>
  );
}
