import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import CommandPalette from "../CommandPalette.jsx";

describe("CommandPalette", () => {
  it("renders with search input focused", () => {
    render(<CommandPalette onRun={vi.fn()} onClose={vi.fn()} />);
    expect(screen.getByPlaceholderText(/search constraints/i)).toBeInTheDocument();
  });

  it("filters results by query text", () => {
    render(<CommandPalette onRun={vi.fn()} onClose={vi.fn()} />);
    const input = screen.getByPlaceholderText(/search constraints/i);
    fireEvent.change(input, { target: { value: "lipogram" } });
    expect(screen.getByText("Lipogram")).toBeInTheDocument();
    expect(screen.queryByText("Sestina")).not.toBeInTheDocument();
  });

  it("shows empty message when no matches", () => {
    render(<CommandPalette onRun={vi.fn()} onClose={vi.fn()} />);
    const input = screen.getByPlaceholderText(/search constraints/i);
    fireEvent.change(input, { target: { value: "xyznonexistent" } });
    expect(screen.getByText(/no constraint by that name/i)).toBeInTheDocument();
  });

  it("calls onRun when a result row is clicked", () => {
    const onRun = vi.fn();
    render(<CommandPalette onRun={onRun} onClose={vi.fn()} />);
    fireEvent.click(screen.getByText("Lipogram"));
    expect(onRun).toHaveBeenCalledTimes(1);
    expect(onRun.mock.calls[0][0].id).toBe("lipogram");
  });

  it("calls onClose on Escape key", () => {
    const onClose = vi.fn();
    render(<CommandPalette onRun={vi.fn()} onClose={onClose} />);
    const input = screen.getByPlaceholderText(/search constraints/i);
    fireEvent.keyDown(input, { key: "Escape" });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when clicking scrim", () => {
    const onClose = vi.fn();
    const { container } = render(<CommandPalette onRun={vi.fn()} onClose={onClose} />);
    const scrim = container.querySelector(".ws-scrim");
    fireEvent.mouseDown(scrim);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("filters by category tab", () => {
    render(<CommandPalette onRun={vi.fn()} onClose={vi.fn()} />);
    fireEvent.click(screen.getByRole("button", { name: /syntax/i }));
    // Syntax constraints should be visible; Oulipean ones hidden
    expect(screen.getByText("Anagram")).toBeInTheDocument();
    expect(screen.queryByText("Lipogram")).not.toBeInTheDocument();
  });
});
