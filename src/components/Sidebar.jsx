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
  sidePinned,
  onTogglePin,
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
        <Icon name="plus" size={15} />
        <span className="btn-lbl">New text</span>
      </button>

      <button
        className="ws-side__pin"
        onClick={onTogglePin}
        title={sidePinned ? "Unpin menu" : "Pin menu"}
      >
        <Icon name={sidePinned ? "pin-off" : "pin"} size={14} />
        <span className="btn-lbl">{sidePinned ? "Unpin menu" : "Pin menu"}</span>
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
            <span className="ws-doc__ic"><Icon name="file-text" size={16} /></span>
            <div className="ws-doc__t" onDoubleClick={(e) => {
              e.stopPropagation();
              const next = window.prompt("Rename document", d.title);
              if (next) onRename(d.id, next);
            }}>
              <span className="ws-doc__ttl">{d.title}</span>
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
              className="ws-btn ws-btn--ghost ws-side__act"
              style={{ padding: "4px 8px" }}
              onClick={onLogout}
              title="Log out"
            >
              <Icon name="log-out" size={14} />
              <span className="btn-lbl">Log out</span>
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
              className="ws-btn ws-btn--primary ws-side__act"
              style={{ padding: "6px 12px", fontSize: 12 }}
              onClick={onLogin}
            >
              <Icon name="log-in" size={13} />
              <span className="btn-lbl">Log in</span>
            </button>
          </>
        )}
      </div>
    </aside>
  );
}
