import React from "react";
import Icon from "./Icon.jsx";

export default function Sidebar({ docs, activeId, onSelect, onNew }) {
  return (
    <aside className="ws-side">
      <div className="ws-side__brand">
        <img src="/assets/logo.png" alt="" />
        <div className="wm">Applied<br />Poetics</div>
      </div>
      <button className="ws-side__new" onClick={onNew}>
        <Icon name="plus" size={15} /> New text
      </button>

      <div className="ws-side__sec">Workspace</div>
      <div className="ws-side__scroll">
        {docs.map((d) => (
          <div
            key={d.id}
            className={`ws-doc${d.id === activeId ? " active" : ""}`}
            onClick={() => onSelect(d.id)}
          >
            <div className="ws-doc__t">{d.title}</div>
            <div className="ws-doc__m">
              <span>{d.words} words</span>
              <span>·</span>
              <span>{d.edited}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="ws-side__foot">
        <div className="av">DL</div>
        <div className="nm">Doug Luman</div>
      </div>
    </aside>
  );
}
