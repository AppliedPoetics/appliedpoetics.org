import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import TopBar from "../TopBar.jsx";

describe("TopBar", () => {
  it("displays title and counts", () => {
    render(
      <TopBar
        title="My Poem"
        words={42}
        chars={256}
        onOpenPalette={vi.fn()}
        onToggleLog={vi.fn()}
        logOpen={false}
        lineNumbers={false}
        onToggleLineNumbers={vi.fn()}
        onToggleRevisions={vi.fn()}
        revOpen={false}
        onSave={vi.fn()}
        saving={false}
        sidePinned={false}
        onToggleSide={vi.fn()}
      />
    );
    expect(screen.getByText("My Poem")).toBeInTheDocument();
    expect(screen.getByText(/42 words/i)).toBeInTheDocument();
    expect(screen.getByText(/256 chars/i)).toBeInTheDocument();
  });

  it("calls onOpenPalette when constraints button clicked", () => {
    const onOpenPalette = vi.fn();
    render(
      <TopBar
        title="T"
        words={0}
        chars={0}
        onOpenPalette={onOpenPalette}
        onToggleLog={vi.fn()}
        logOpen={false}
        lineNumbers={false}
        onToggleLineNumbers={vi.fn()}
        onToggleRevisions={vi.fn()}
        revOpen={false}
        onSave={vi.fn()}
        saving={false}
        sidePinned={false}
        onToggleSide={vi.fn()}
      />
    );
    fireEvent.click(screen.getByRole("button", { name: /constraints/i }));
    expect(onOpenPalette).toHaveBeenCalledTimes(1);
  });

  it("calls onSave when save button clicked", () => {
    const onSave = vi.fn();
    render(
      <TopBar
        title="T"
        words={0}
        chars={0}
        onOpenPalette={vi.fn()}
        onToggleLog={vi.fn()}
        logOpen={false}
        lineNumbers={false}
        onToggleLineNumbers={vi.fn()}
        onToggleRevisions={vi.fn()}
        revOpen={false}
        onSave={onSave}
        saving={false}
        sidePinned={false}
        onToggleSide={vi.fn()}
      />
    );
    fireEvent.click(screen.getByRole("button", { name: /save/i }));
    expect(onSave).toHaveBeenCalledTimes(1);
  });

  it("shows saving indicator", () => {
    render(
      <TopBar
        title="T"
        words={0}
        chars={0}
        onOpenPalette={vi.fn()}
        onToggleLog={vi.fn()}
        logOpen={false}
        lineNumbers={false}
        onToggleLineNumbers={vi.fn()}
        onToggleRevisions={vi.fn()}
        revOpen={false}
        onSave={vi.fn()}
        saving={true}
        sidePinned={false}
        onToggleSide={vi.fn()}
      />
    );
    expect(screen.getByRole("button", { name: /saving/i })).toBeInTheDocument();
  });
});
