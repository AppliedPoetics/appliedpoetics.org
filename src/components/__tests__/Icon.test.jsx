import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Icon from "../Icon.jsx";

describe("Icon", () => {
  it("renders a known icon by name", () => {
    render(<Icon name="plus" />);
    const wrapper = document.querySelector(".ws-ico");
    expect(wrapper).toBeInTheDocument();
  });

  it("returns null for an unknown icon name", () => {
    const { container } = render(<Icon name="nonexistent-icon" />);
    expect(container.firstChild).toBeNull();
  });

  it("applies custom size", () => {
    render(<Icon name="search" size={24} />);
    const wrapper = document.querySelector(".ws-ico");
    expect(wrapper).toHaveStyle({ fontSize: "24px" });
  });

  it("merges custom inline styles", () => {
    render(<Icon name="x" size={18} style={{ color: "red" }} />);
    const wrapper = document.querySelector(".ws-ico");
    expect(wrapper).toHaveStyle({ color: "rgb(255, 0, 0)" });
  });
});
