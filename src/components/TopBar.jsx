import React from "react";
import Icon from "./Icon.jsx";
import Button from "./Button.jsx";

export default function TopBar({
  title,
  words,
  chars,
  onOpenPalette,
  onToggleLog,
  logOpen,
  lineNumbers,
  onToggleLineNumbers,
  onToggleRevisions,
  revOpen,
  onSave,
  saving,
  sidePinned,
  onToggleSide,
}) {
  return (
    <header className={`ws-top${sidePinned ? " side-pinned" : ""}`}>
      <div className="ws-top__crumb">
        <Icon name="folder" size={14} />
        <span>Workspace</span>
        <Icon name="chevron-right" size={13} />
      </div>
      <div className="ws-top__title">{title}</div>

      <div className="ws-top__spacer" />

      <div className="ws-top__count">
        <span>{words} WORDS</span>
        <span>{chars} CHARS</span>
      </div>

      <div className="ws-top__btns">
        <Button variant="ghost" icon="panel-left" onClick={onToggleSide} className="ws-top__side" />
        <Button variant="ghost" icon="terminal-square" onClick={onOpenPalette}>
          <span className="btn-lbl">Constraints</span>
          <span className="btn-kbd"><kbd style={{ font: "var(--t-mono-sm)", color: "var(--fg-4)", marginLeft: 4 }}>⌘K</kbd></span>
        </Button>
        <Button
          variant={lineNumbers ? "ink" : "ghost"}
          icon="list-ordered"
          onClick={onToggleLineNumbers}
        >
          <span className="btn-lbl">Lines</span>
        </Button>
        <Button
          variant={logOpen ? "ink" : "ghost"}
          icon="dices"
          onClick={onToggleLog}
        >
          <span className="btn-lbl">Changes</span>
        </Button>
        <Button
          variant={revOpen ? "ink" : "ghost"}
          icon="rotate-3d"
          onClick={onToggleRevisions}
        >
          <span className="btn-lbl">Revisions</span>
        </Button>
        <Button variant="primary" icon="save" onClick={onSave}>
          <span className="btn-lbl">{saving ? "Saving…" : "Save"}</span>
        </Button>
      </div>
    </header>
  );
}
