import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Sidebar from "../Sidebar.jsx";

describe("Sidebar", () => {
  const docs = [
    { id: "d1", title: "Alpha", words: 10, edited: "2m", dirty: false },
    { id: "d2", title: "Beta", words: 20, edited: "1h", dirty: true },
  ];

  it("renders document list", () => {
    render(
      <Sidebar
        docs={docs}
        activeId="d1"
        onSelect={vi.fn()}
        onNew={vi.fn()}
        onDelete={vi.fn()}
        onRequestDelete={vi.fn()}
        onRename={vi.fn()}
        user={null}
        onLogin={vi.fn()}
        onLogout={vi.fn()}
        sidePinned={false}
        onTogglePin={vi.fn()}
      />
    );
    expect(screen.getByText("Alpha")).toBeInTheDocument();
    expect(screen.getByText("Beta")).toBeInTheDocument();
  });

  it("highlights active document", () => {
    render(
      <Sidebar
        docs={docs}
        activeId="d2"
        onSelect={vi.fn()}
        onNew={vi.fn()}
        onDelete={vi.fn()}
        onRequestDelete={vi.fn()}
        onRename={vi.fn()}
        user={null}
        onLogin={vi.fn()}
        onLogout={vi.fn()}
        sidePinned={false}
        onTogglePin={vi.fn()}
      />
    );
    const activeDoc = screen.getByText("Beta").closest(".ws-doc");
    expect(activeDoc).toHaveClass("active");
  });

  it("shows dirty indicator", () => {
    render(
      <Sidebar
        docs={docs}
        activeId="d1"
        onSelect={vi.fn()}
        onNew={vi.fn()}
        onDelete={vi.fn()}
        onRequestDelete={vi.fn()}
        onRename={vi.fn()}
        user={null}
        onLogin={vi.fn()}
        onLogout={vi.fn()}
        sidePinned={false}
        onTogglePin={vi.fn()}
      />
    );
    const beta = screen.getByText("Beta").closest(".ws-doc");
    expect(beta.querySelector(".ws-doc__dot")).toBeInTheDocument();
  });

  it("calls onNew when new text button clicked", () => {
    const onNew = vi.fn();
    render(
      <Sidebar
        docs={docs}
        activeId="d1"
        onSelect={vi.fn()}
        onNew={onNew}
        onDelete={vi.fn()}
        onRequestDelete={vi.fn()}
        onRename={vi.fn()}
        user={null}
        onLogin={vi.fn()}
        onLogout={vi.fn()}
        sidePinned={false}
        onTogglePin={vi.fn()}
      />
    );
    fireEvent.click(screen.getByText(/new text/i));
    expect(onNew).toHaveBeenCalledTimes(1);
  });

  it("calls onSelect when a doc is clicked", () => {
    const onSelect = vi.fn();
    render(
      <Sidebar
        docs={docs}
        activeId="d1"
        onSelect={onSelect}
        onNew={vi.fn()}
        onDelete={vi.fn()}
        onRequestDelete={vi.fn()}
        onRename={vi.fn()}
        user={null}
        onLogin={vi.fn()}
        onLogout={vi.fn()}
        sidePinned={false}
        onTogglePin={vi.fn()}
      />
    );
    fireEvent.click(screen.getByText("Beta"));
    expect(onSelect).toHaveBeenCalledWith("d2");
  });

  it("shows guest state when no user", () => {
    render(
      <Sidebar
        docs={docs}
        activeId="d1"
        onSelect={vi.fn()}
        onNew={vi.fn()}
        onDelete={vi.fn()}
        onRequestDelete={vi.fn()}
        onRename={vi.fn()}
        user={null}
        onLogin={vi.fn()}
        onLogout={vi.fn()}
        sidePinned={false}
        onTogglePin={vi.fn()}
      />
    );
    expect(screen.getByText("Guest")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /log in/i })).toBeInTheDocument();
  });

  it("shows user state when authenticated", () => {
    render(
      <Sidebar
        docs={docs}
        activeId="d1"
        onSelect={vi.fn()}
        onNew={vi.fn()}
        onDelete={vi.fn()}
        onRequestDelete={vi.fn()}
        onRename={vi.fn()}
        user={{ username: "alice" }}
        onLogin={vi.fn()}
        onLogout={vi.fn()}
        sidePinned={false}
        onTogglePin={vi.fn()}
      />
    );
    expect(screen.getByText("alice")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /log out/i })).toBeInTheDocument();
  });
});
