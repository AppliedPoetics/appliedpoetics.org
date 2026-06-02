import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import ConstraintLog from "../ConstraintLog.jsx";

describe("ConstraintLog", () => {
  it("shows empty state when no items", () => {
    render(<ConstraintLog items={[]} onClose={vi.fn()} onUndo={vi.fn()} onRedo={vi.fn()} onRemove={vi.fn()} />);
    expect(screen.getByText(/the lines are still/i)).toBeInTheDocument();
  });

  it("renders a list of constraint entries", () => {
    const items = [
      { id: "original", name: "Original", tag: "", preview: "hello world" },
      { id: 1, name: "Lipogram", tag: "Oulipean", preview: "hll wrld" },
    ];
    render(<ConstraintLog items={items} onClose={vi.fn()} onUndo={vi.fn()} onRedo={vi.fn()} onRemove={vi.fn()} />);
    expect(screen.getByText("Lipogram")).toBeInTheDocument();
    expect(screen.getByText("hll wrld")).toBeInTheDocument();
  });

  it("does not show action buttons for original entry", () => {
    const items = [{ id: "original", name: "Original", tag: "", preview: "abc" }];
    render(<ConstraintLog items={items} onClose={vi.fn()} onUndo={vi.fn()} onRedo={vi.fn()} onRemove={vi.fn()} />);
    expect(screen.queryAllByTitle(/undo to this state/i)).toHaveLength(0);
    expect(screen.queryAllByTitle(/redo this state/i)).toHaveLength(0);
    expect(screen.queryAllByTitle(/remove from history/i)).toHaveLength(0);
  });

  it("calls onUndo with entry id when undo button clicked", () => {
    const onUndo = vi.fn();
    const items = [
      { id: "original", name: "Original", tag: "", preview: "abc" },
      { id: 42, name: "Anagram", tag: "Syntax", preview: "cba" },
    ];
    render(<ConstraintLog items={items} onClose={vi.fn()} onUndo={onUndo} onRedo={vi.fn()} onRemove={vi.fn()} />);
    fireEvent.click(screen.getByTitle(/undo to this state/i));
    expect(onUndo).toHaveBeenCalledWith(42);
  });

  it("calls onRedo with entry id when redo button clicked", () => {
    const onRedo = vi.fn();
    const items = [
      { id: "original", name: "Original", tag: "", preview: "abc" },
      { id: 42, name: "Anagram", tag: "Syntax", preview: "cba" },
    ];
    render(<ConstraintLog items={items} onClose={vi.fn()} onUndo={vi.fn()} onRedo={onRedo} onRemove={vi.fn()} />);
    fireEvent.click(screen.getByTitle(/redo this state/i));
    expect(onRedo).toHaveBeenCalledWith(42);
  });

  it("calls onRemove with entry id when remove button clicked", () => {
    const onRemove = vi.fn();
    const items = [
      { id: "original", name: "Original", tag: "", preview: "abc" },
      { id: 42, name: "Anagram", tag: "Syntax", preview: "cba" },
    ];
    render(<ConstraintLog items={items} onClose={vi.fn()} onUndo={vi.fn()} onRedo={vi.fn()} onRemove={onRemove} />);
    fireEvent.click(screen.getByTitle(/remove from history/i));
    expect(onRemove).toHaveBeenCalledWith(42);
  });

  it("calls onClose when close button clicked", () => {
    const onClose = vi.fn();
    render(<ConstraintLog items={[]} onClose={onClose} onUndo={vi.fn()} onRedo={vi.fn()} onRemove={vi.fn()} />);
    fireEvent.click(screen.getByRole("button"));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
