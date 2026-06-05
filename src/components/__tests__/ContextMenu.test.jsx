import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import ContextMenu from "../ContextMenu.jsx";

describe("ContextMenu", () => {
  const pos = { x: 10, y: 20, wordCount: 3, text: "hello world" };

  it("renders quick operations", () => {
    render(<ContextMenu pos={pos} onRun={vi.fn()} onMore={vi.fn()} onClose={vi.fn()} />);
    expect(screen.getByText(/operations/i)).toBeInTheDocument();
    expect(screen.getByText(/3 words selected/i)).toBeInTheDocument();
  });

  it("calls onRun with the chosen constraint", () => {
    const onRun = vi.fn();
    render(<ContextMenu pos={pos} onRun={onRun} onMore={vi.fn()} onClose={vi.fn()} />);
    // QUICK_OPS: lipogram, anagram, nth-word, powerball
    fireEvent.click(screen.getByText("Lipogram"));
    expect(onRun).toHaveBeenCalledTimes(1);
    expect(onRun.mock.calls[0][0].id).toBe("lipogram");
  });

  it("calls onMore when 'All constraints' is clicked", () => {
    const onMore = vi.fn();
    render(<ContextMenu pos={pos} onRun={vi.fn()} onMore={onMore} onClose={vi.fn()} />);
    fireEvent.click(screen.getByText(/all constraints/i));
    expect(onMore).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when clicking outside", () => {
    const onClose = vi.fn();
    render(<ContextMenu pos={pos} onRun={vi.fn()} onMore={vi.fn()} onClose={onClose} />);
    fireEvent.mouseDown(document.body);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("positions absolutely with given coords", () => {
    const { container } = render(
      <ContextMenu pos={pos} onRun={vi.fn()} onMore={vi.fn()} onClose={vi.fn()} />
    );
    const menu = container.firstChild;
    expect(menu).toHaveStyle({ left: "10px", top: "20px" });
  });
});
