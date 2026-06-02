import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "../Button.jsx";

describe("Button", () => {
  it("renders with default ghost variant", () => {
    render(<Button>Click me</Button>);
    const btn = screen.getByRole("button", { name: /click me/i });
    expect(btn).toHaveClass("ws-btn--ghost");
  });

  it("applies primary variant class", () => {
    render(<Button variant="primary">Save</Button>);
    const btn = screen.getByRole("button", { name: /save/i });
    expect(btn).toHaveClass("ws-btn--primary");
  });

  it("calls onClick when clicked", () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Press</Button>);
    fireEvent.click(screen.getByRole("button", { name: /press/i }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("renders an icon when provided", () => {
    render(<Button icon="save">Download</Button>);
    const ico = document.querySelector(".ws-ico");
    expect(ico).toBeInTheDocument();
  });

  it("adds icon-only class when no children", () => {
    render(<Button icon="x" />);
    const btn = screen.getByRole("button");
    expect(btn).toHaveClass("ws-btn--icon");
  });

  it("passes custom className", () => {
    render(<Button className="my-btn">Go</Button>);
    const btn = screen.getByRole("button", { name: /go/i });
    expect(btn).toHaveClass("my-btn");
  });
});
