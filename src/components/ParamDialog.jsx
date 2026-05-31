import React, { useState, useRef, useEffect } from "react";
import Button from "./Button.jsx";

export default function ParamDialog({ constraint, onConfirm, onClose }) {
  const [values, setValues] = useState(() => {
    const init = {};
    for (const p of constraint.params) {
      init[p.key] = p.default ?? "";
    }
    return init;
  });

  const firstRef = useRef(null);
  useEffect(() => {
    if (firstRef.current) {
      firstRef.current.focus();
      firstRef.current.select();
    }
  }, []);

  function update(key, val) {
    setValues((v) => ({ ...v, [key]: val }));
  }

  function submit() {
    const payload = {};
    for (const p of constraint.params) {
      const raw = values[p.key] ?? "";
      payload[p.key] = p.type === "number" ? Number(raw) || 0 : raw;
    }
    onConfirm(payload);
  }

  return (
    <div className="ws-scrim" onMouseDown={onClose}>
      <div className="ws-dialog" onMouseDown={(e) => e.stopPropagation()}>
        <div className="ws-dialog__h">
          <div className="t">{constraint.name}</div>
          <div className="d">{constraint.desc}</div>
        </div>
        <div className="ws-dialog__b">
          {constraint.params.map((p, i) => (
            <div key={p.key} style={{ marginBottom: 12 }}>
              <label>{p.label}</label>
              <input
                ref={i === 0 ? firstRef : undefined}
                className="ws-field"
                value={values[p.key] ?? ""}
                placeholder={p.placeholder}
                type={p.type === "number" ? "number" : "text"}
                onChange={(e) => update(p.key, e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && submit()}
              />
            </div>
          ))}
        </div>
        <div className="ws-dialog__f">
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button variant="primary" icon="dices" onClick={submit}>Run constraint</Button>
        </div>
      </div>
    </div>
  );
}
