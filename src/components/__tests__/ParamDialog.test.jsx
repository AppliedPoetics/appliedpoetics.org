import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ParamDialog from "../ParamDialog.jsx";

describe("ParamDialog", () => {
  const constraint = {
    name: "Lipogram",
    desc: "Remove a letter.",
    params: [
      { key: "letters", label: "Letter", placeholder: "e", default: "e", type: "text" },
      { key: "count", label: "Count", placeholder: "1", default: "1", type: "number" },
    ],
  };

  it("renders constraint name and description", () => {
    render(<ParamDialog constraint={constraint} onConfirm={vi.fn()} onClose={vi.fn()} />);
    expect(screen.getByText("Lipogram")).toBeInTheDocument();
    expect(screen.getByText("Remove a letter.")).toBeInTheDocument();
  });

  it("initializes inputs with default values", () => {
    render(<ParamDialog constraint={constraint} onConfirm={vi.fn()} onClose={vi.fn()} />);
    expect(screen.getByDisplayValue("e")).toBeInTheDocument();
    expect(screen.getByDisplayValue("1")).toBeInTheDocument();
  });

  it("updates values on input change", () => {
    render(<ParamDialog constraint={constraint} onConfirm={vi.fn()} onClose={vi.fn()} />);
    const letterInput = screen.getByDisplayValue("e");
    fireEvent.change(letterInput, { target: { value: "a" } });
    expect(screen.getByDisplayValue("a")).toBeInTheDocument();
  });

  it("calls onConfirm with typed values on submit", () => {
    const onConfirm = vi.fn();
    render(<ParamDialog constraint={constraint} onConfirm={onConfirm} onClose={vi.fn()} />);
    fireEvent.click(screen.getByRole("button", { name: /run constraint/i }));
    expect(onConfirm).toHaveBeenCalledWith({ letters: "e", count: 1 });
  });

  it("calls onClose when cancel is clicked", () => {
    const onClose = vi.fn();
    render(<ParamDialog constraint={constraint} onConfirm={vi.fn()} onClose={onClose} />);
    fireEvent.click(screen.getByRole("button", { name: /cancel/i }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("submits on Enter key in input", () => {
    const onConfirm = vi.fn();
    render(<ParamDialog constraint={constraint} onConfirm={onConfirm} onClose={vi.fn()} />);
    const input = screen.getByDisplayValue("e");
    fireEvent.keyDown(input, { key: "Enter" });
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it("focuses the first input on mount", async () => {
    render(<ParamDialog constraint={constraint} onConfirm={vi.fn()} onClose={vi.fn()} />);
    await waitFor(() => {
      const input = screen.getByDisplayValue("e");
      expect(document.activeElement).toBe(input);
    });
  });
});
