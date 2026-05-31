import React, { useRef, useEffect } from "react";
import Icon from "./Icon.jsx";
import { CONSTRAINTS, QUICK_OPS } from "../lib/constraints.js";

export default function ContextMenu({ pos, onRun, onMore, onClose }) {
  const quick = QUICK_OPS.map((id) => CONSTRAINTS.find((c) => c.id === id)).filter(Boolean);
  const ref = useRef(null);

  useEffect(() => {
    function away(e) {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    }
    document.addEventListener("mousedown", away);
    return () => document.removeEventListener("mousedown", away);
  }, [onClose]);

  return (
    <div
      className="ws-cmenu"
      ref={ref}
      style={{ left: pos.x, top: pos.y }}
      onMouseDown={(e) => e.preventDefault() /* keep selection */}
    >
      <div className="ws-cmenu__head">
        <span className="lab">Operations</span>
        <span className="ct">{pos.wordCount} words selected</span>
      </div>
      <div className="ws-cmenu__list">
        {quick.map((c) => (
          <div className="ws-cop" key={c.id} onClick={() => onRun(c)}>
            <div className="ws-cop__ic"><Icon name={c.icon} size={15} /></div>
            <div className="ws-cop__tx">
              <div className="ws-cop__nm">{c.name}</div>
              <div className="ws-cop__ds">{c.desc}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="ws-cmenu__foot" onClick={onMore}>
        <span className="t">All constraints</span>
        <Icon name="arrow-right" size={15} style={{ color: "var(--ap-teal-deep)" }} />
      </div>
    </div>
  );
}
