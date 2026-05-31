import React from "react";
import Icon from "./Icon.jsx";
import Button from "./Button.jsx";

export default function TopBar({ title, words, chars, onOpenPalette, onToggleLog, logOpen, lineNumbers, onToggleLineNumbers }) {
  return (
    <header className="ws-top">
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
        <Button variant="ghost" icon="terminal-square" onClick={onOpenPalette}>
          Constraints
          <kbd style={{ font: "var(--t-mono-sm)", color: "var(--fg-4)", marginLeft: 4 }}>⌘K</kbd>
        </Button>
        <Button
          variant={lineNumbers ? "ink" : "ghost"}
          icon="list-ordered"
          onClick={onToggleLineNumbers}
        >
          Lines
        </Button>
        <Button
          variant={logOpen ? "ink" : "ghost"}
          icon="dices"
          onClick={onToggleLog}
        >
          Changes
        </Button>
        <Button variant="primary" icon="share-2">Share</Button>
      </div>
    </header>
  );
}
