import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import RevisionLog from "../RevisionLog.jsx";

describe("RevisionLog", () => {
  it("shows empty state when no revisions", () => {
    render(
      <RevisionLog
        revisions={[]}
        onClose={vi.fn()}
        onSelect={vi.fn()}
        onCreate={vi.fn()}
        activeDocTitle="Draft"
      />
    );
    expect(screen.getByText(/no revisions yet/i)).toBeInTheDocument();
  });

  it("renders revision list with formatted timestamps", () => {
    const revisions = [
      { id: "r1", title: "", timestamp: Date.now(), words: 10, chars: 50, content: "hello world" },
    ];
    render(
      <RevisionLog
        revisions={revisions}
        onClose={vi.fn()}
        onSelect={vi.fn()}
        onCreate={vi.fn()}
        activeDocTitle="Draft"
      />
    );
    expect(screen.getByText("Draft")).toBeInTheDocument();
    expect(screen.getByText(/10 words/i)).toBeInTheDocument();
    expect(screen.getByText(/50 chars/i)).toBeInTheDocument();
  });

  it("calls onSelect when a revision is clicked", () => {
    const onSelect = vi.fn();
    const revisions = [
      { id: "r1", title: "", timestamp: Date.now(), words: 5, chars: 25, content: "abc" },
    ];
    render(
      <RevisionLog
        revisions={revisions}
        onClose={vi.fn()}
        onSelect={onSelect}
        onCreate={vi.fn()}
        activeDocTitle="Draft"
      />
    );
    fireEvent.click(screen.getByText("Draft"));
    expect(onSelect).toHaveBeenCalledWith(revisions[0]);
  });

  it("calls onCreate when plus button clicked", () => {
    const onCreate = vi.fn();
    render(
      <RevisionLog
        revisions={[]}
        onClose={vi.fn()}
        onSelect={vi.fn()}
        onCreate={onCreate}
        activeDocTitle="Draft"
      />
    );
    const buttons = screen.getAllByRole("button");
    // first button is plus (save revision), second is close
    fireEvent.click(buttons[0]);
    expect(onCreate).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when x button clicked", () => {
    const onClose = vi.fn();
    render(
      <RevisionLog
        revisions={[]}
        onClose={onClose}
        onSelect={vi.fn()}
        onCreate={vi.fn()}
        activeDocTitle="Draft"
      />
    );
    const buttons = screen.getAllByRole("button");
    fireEvent.click(buttons[1]);
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
