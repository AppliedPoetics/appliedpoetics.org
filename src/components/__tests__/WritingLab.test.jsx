import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import WritingLab from "../WritingLab.jsx";

vi.mock("../../lib/api.js", () => ({
  applyConstraint: vi.fn(),
}));

vi.mock("../../lib/docsApi.js", () => ({
  getToken: vi.fn(),
  clearToken: vi.fn(),
  getMe: vi.fn(),
  logout: vi.fn(),
  listDocuments: vi.fn(),
  createDocument: vi.fn(),
  updateDocument: vi.fn(),
  deleteDocument: vi.fn(),
  createRevisionDoc: vi.fn(),
  deleteRevisions: vi.fn(),
  parseRevTitle: vi.fn((title) => {
    if (!title || !title.startsWith("__rev__")) return null;
    const rest = title.slice("__rev__".length);
    const idx = rest.indexOf("__");
    if (idx === -1) return null;
    return { parentId: rest.slice(0, idx) };
  }),
  parseRevisionDoc: vi.fn((doc) => ({
    id: doc.id,
    timestamp: Date.now(),
    title: "",
    content: doc.content || "",
    words: doc.content ? doc.content.trim().split(/\s+/).length : 0,
    chars: doc.content ? doc.content.length : 0,
  })),
}));

import { applyConstraint } from "../../lib/api.js";
import { getToken, getMe, listDocuments } from "../../lib/docsApi.js";

describe("WritingLab", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    getToken.mockReturnValue(null);
  });

  it("renders a guest document on mount", async () => {
    render(<WritingLab />);
    await waitFor(() => {
      expect(document.querySelector(".ws-prose")).toBeInTheDocument();
    });
    // Word count shown in the top bar (uppercase WORDS)
    expect(screen.getByText("0 WORDS")).toBeInTheDocument();
  });

  it("updates word count when typing in prose area", async () => {
    render(<WritingLab />);
    await waitFor(() => document.querySelector(".ws-prose"));

    const prose = document.querySelector(".ws-prose");
    fireEvent.change(prose, { target: { value: "hello world test" } });

    await waitFor(() => {
      expect(screen.getByText("3 WORDS")).toBeInTheDocument();
    });
  });

  it("creates a new document when new text is clicked", async () => {
    render(<WritingLab />);
    await waitFor(() => document.querySelector(".ws-prose"));

    fireEvent.click(screen.getByText(/new text/i));
    await waitFor(() => {
      const docs = document.querySelectorAll(".ws-doc");
      expect(docs.length).toBe(2);
    });
  });

  it("opens auth modal on save for guest users", async () => {
    render(<WritingLab />);
    await waitFor(() => document.querySelector(".ws-prose"));

    const saveBtn = screen.getByRole("button", { name: /save/i });
    fireEvent.click(saveBtn);

    await waitFor(() => {
      // AuthModal has "Log in" text in a div with class "t"
      expect(screen.getByText(/log in to save documents/i)).toBeInTheDocument();
    });
  });

  it("loads server docs when user is logged in", async () => {
    getToken.mockReturnValue("valid-token");
    getMe.mockResolvedValue({ username: "alice" });
    listDocuments.mockResolvedValue([
      {
        id: "s1",
        title: "Server Doc",
        content: "server content",
        updated_at: new Date().toISOString(),
        owner_id: "u1",
        created_at: new Date().toISOString(),
      },
    ]);

    render(<WritingLab />);
    await waitFor(() => {
      expect(screen.getByText("alice")).toBeInTheDocument();
    });
    // Server Doc title should appear in the sidebar
    expect(document.querySelector(".ws-doc__ttl")?.textContent).toBe("Server Doc");
  });

  it("toggles line numbers on and off", async () => {
    render(<WritingLab />);
    await waitFor(() => document.querySelector(".ws-prose"));

    const linesBtn = screen.getByRole("button", { name: /lines/i });
    // lineNumbers defaults to true, so first click turns it OFF
    fireEvent.click(linesBtn);
    expect(document.querySelector(".ws-line-numbers")).not.toBeInTheDocument();

    // second click turns it back ON
    fireEvent.click(linesBtn);
    expect(document.querySelector(".ws-line-numbers")).toBeInTheDocument();
  });

  it("toggles changes log open and closed", async () => {
    render(<WritingLab />);
    await waitFor(() => document.querySelector(".ws-prose"));

    const changesBtn = screen.getByRole("button", { name: /changes/i });
    fireEvent.click(changesBtn);
    expect(screen.getByText(/changes this session/i)).toBeInTheDocument();

    // close via the x icon button in the constraint log panel
    const closeBtn = document.querySelector(".ws-log__head button");
    fireEvent.click(closeBtn);
    expect(screen.queryByText(/changes this session/i)).not.toBeInTheDocument();
  });

  it("calls applyConstraint via command palette selection", async () => {
    applyConstraint.mockResolvedValue({ result: "transformed" });
    render(<WritingLab />);
    await waitFor(() => document.querySelector(".ws-prose"));

    // Type some text so the constraint has something to work with
    const prose = document.querySelector(".ws-prose");
    fireEvent.change(prose, { target: { value: "hello world" } });

    fireEvent.click(screen.getByRole("button", { name: /constraints/i }));
    const input = screen.getByPlaceholderText(/search constraints/i);
    fireEvent.change(input, { target: { value: "powerball" } });

    const row = screen.getByText("Powerball");
    fireEvent.click(row);

    await waitFor(() => {
      expect(applyConstraint).toHaveBeenCalled();
    });
  });

  it("handles document deletion via sidebar", async () => {
    render(<WritingLab />);
    await waitFor(() => document.querySelector(".ws-prose"));

    const trashBtn = document.querySelector(".ws-doc__del");
    fireEvent.click(trashBtn);

    await waitFor(() => {
      expect(screen.getByText(/delete document/i)).toBeInTheDocument();
    });

    // Click the primary "Delete" button in the confirmation dialog
    // Use querySelector to avoid matching the sidebar trash button
    const dialogDeleteBtn = document.querySelector(".ws-dialog .ws-btn--primary");
    fireEvent.click(dialogDeleteBtn);
    // After deleting the last doc a new empty one should be created
    await waitFor(() => {
      expect(document.querySelector(".ws-prose")).toBeInTheDocument();
    });
  });
});
