import React, { useEffect, useRef } from "react";
import Icon from "./Icon.jsx";

export default function Sidebar({
  docs,
  activeId,
  onSelect,
  onNew,
  onDelete,
  onRename,
  user,
  onLogin,
  onLogout,
}) {
  const activeRef = useRef(null);

  useEffect(() => {
    if (activeRef.current) {
      activeRef.current.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  }, [activeId]);

  return (
    <aside className="ws-side">
      <div className="ws-side__brand">
        <img src="/assets/logo.png" alt="" />
        <div className="wm">
          Applied
          <br />
          Poetics
        </div>
      </div>
      <button className="ws-side__new" onClick={onNew}>
        <Icon name="plus" size={15} /> New text
      </button>

      <div className="ws-side__sec">Workspace</div>
      <div className="ws-side__scroll">
        {docs.map((d) => (
          <div
            key={d.id}
            ref={d.id === activeId ? activeRef : null}
            className={`ws-doc${d.id === activeId ? " active" : ""}`}
            onClick={() => onSelect(d.id)}
          >
            <div className="ws-doc__t" onDoubleClick={(e) => {
              e.stopPropagation();
              const next = window.prompt("Rename document", d.title);
              if (next) onRename(d.id, next);
            }}>
              {d.title}
              {d.dirty && <span className="ws-doc__dot" title="Unsaved changes" />}
            </div>
            <div className="ws-doc__m">
              <span>{d.words} words</span>
              <span>·</span>
              <span>{d.edited}</span>
              {onDelete && (
                <button
                  className="ws-btn ws-btn--icon ws-doc__del"
                  title="Delete"
                  style={{ marginLeft: "auto" }}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (window.confirm(`Delete "${d.title}"?`)) onDelete(d.id);
                  }}
                >
                  <Icon name="trash" size={12} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="ws-side__foot">
        {user ? (
          <>
            <div className="av">
              {user.username.slice(0, 2).toUpperCase()}
            </div>
            <div className="nm">{user.username}</div>
            <button
              className="ws-btn ws-btn--ghost"
              style={{ marginLeft: "auto", padding: "4px 8px" }}
              onClick={onLogout}
              title="Log out"
            >
              <Icon name="log-out" size={14} />
            </button>
          </>
        ) : (
          <>
            <div className="av" style={{ background: "var(--fg-3)" }}>
              <Icon name="user" size={14} />
            </div>
            <div className="nm" style={{ color: "var(--fg-3)" }}>
              Guest
            </div>
            <button
              className="ws-btn ws-btn--primary"
              style={{ marginLeft: "auto", padding: "6px 12px", fontSize: 12 }}
              onClick={onLogin}
            >
              <Icon name="log-in" size={13} /> Log in
            </button>
          </>
        )}
      </div>
    </aside>
  );
}
