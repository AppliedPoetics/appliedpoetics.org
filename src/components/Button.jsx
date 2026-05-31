import React from "react";
import Icon from "./Icon.jsx";

export default function Button({ variant = "ghost", icon, children, onClick, style }) {
  return (
    <button
      className={`ws-btn ws-btn--${variant}${!children ? " ws-btn--icon" : ""}`}
      onClick={onClick}
      style={style}
    >
      {icon && <Icon name={icon} size={15} />}
      {children}
    </button>
  );
}
