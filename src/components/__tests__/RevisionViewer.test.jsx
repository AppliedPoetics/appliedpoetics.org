import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import RevisionViewer from "../RevisionViewer.jsx";

describe("RevisionViewer", () => {
  const revision = {
    timestamp: 1700000000000,
    words: 3,
    chars: 15,
    content: "the quick brown",
    title: "Old Title",
  };

  it("renders revision metadata", () => {
    render(
      <RevisionViewer
        revision={revision}
        currentTitle="Current"
        currentContent="the quick brown fox"
        onRestore={vi.fn()}
        onClose={vi.fn()}
      />
    );
    expect(screen.getByText(/revision/i)).toBeInTheDocument();
    expect(screen.getByText(/3 words/i)).toBeInTheDocument();
  });

  it("shows diff mode by default highlighting changes", () => {
    render(
      <RevisionViewer
        revision={revision}
        currentTitle="Current"
        currentContent="the quick brown fox"
        onRestore={vi.fn()}
        onClose={vi.fn()}
      />
    );
    // In diff mode the added word "fox" should appear
    expect(screen.getByText(/fox/i)).toBeInTheDocument();
  });

  it("toggles to preview mode showing raw content", () => {
    render(
      <RevisionViewer
        revision={revision}
        currentTitle="Current"
        currentContent="the quick brown fox"
        onRestore={vi.fn()}
        onClose={vi.fn()}
      />
    );
    fireEvent.click(screen.getByRole("button", { name: /preview/i }));
    expect(screen.getByText("the quick brown")).toBeInTheDocument();
  });

  it("calls onRestore and onClose when restore clicked", () => {
    const onRestore = vi.fn();
    const onClose = vi.fn();
    render(
      <RevisionViewer
        revision={revision}
        currentTitle="Current"
        currentContent="the quick brown fox"
        onRestore={onRestore}
        onClose={onClose}
      />
    );
    fireEvent.click(screen.getByRole("button", { name: /restore this version/i }));
    expect(onRestore).toHaveBeenCalledWith(revision);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when cancel clicked", () => {
    const onClose = vi.fn();
    render(
      <RevisionViewer
        revision={revision}
        currentTitle="Current"
        currentContent=""
        onRestore={vi.fn()}
        onClose={onClose}
      />
    );
    fireEvent.click(screen.getByRole("button", { name: /cancel/i }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when clicking scrim", () => {
    const onClose = vi.fn();
    const { container } = render(
      <RevisionViewer
        revision={revision}
        currentTitle="Current"
        currentContent=""
        onRestore={vi.fn()}
        onClose={onClose}
      />
    );
    const scrim = container.querySelector(".ws-scrim");
    fireEvent.click(scrim);
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
