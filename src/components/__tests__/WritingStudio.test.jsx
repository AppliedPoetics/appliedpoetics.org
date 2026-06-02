import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import WritingStudio from "../WritingStudio.jsx";

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

describe("WritingStudio", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    getToken.mockReturnValue(null);
  });

  it("renders a guest document on mount", async () => {
    render(<WritingStudio />);
    await waitFor(() => {
      expect(screen.getByText(/untitled/i)).toBeInTheDocument();
    });
    expect(screen.getByText(/0 words/i)).toBeInTheDocument();
  });

  it("updates word count when typing in prose area", async () => {
    render(<WritingStudio />);
    await waitFor(() => screen.getByText(/untitled/i));

    const prose = document.querySelector(".ws-prose");
    prose.focus();
    fireEvent.input(prose, { target: { innerText: "hello world test" } });

    await waitFor(() => {
      expect(screen.getByText(/3 words/i)).toBeInTheDocument();
    });
  });

  it("creates a new document when new text is clicked", async () => {
    render(<WritingStudio />);
    await waitFor(() => screen.getByText(/untitled/i));

    fireEvent.click(screen.getByText(/new text/i));
    await waitFor(() => {
      const docs = document.querySelectorAll(".ws-doc");
      expect(docs.length).toBe(2);
    });
  });

  it("opens auth modal on save for guest users", async () => {
    render(<WritingStudio />);
    await waitFor(() => screen.getByText(/untitled/i));

    const saveBtn = screen.getByRole("button", { name: /save/i });
    fireEvent.click(saveBtn);

    await waitFor(() => {
      expect(screen.getByText(/log in/i)).toBeInTheDocument();
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

    render(<WritingStudio />);
    await waitFor(() => {
      expect(screen.getByText("Server Doc")).toBeInTheDocument();
    });
    expect(screen.getByText("alice")).toBeInTheDocument();
  });

  it("toggles line numbers on and off", async () => {
    render(<WritingStudio />);
    await waitFor(() => screen.getByText(/untitled/i));

    const linesBtn = screen.getByRole("button", { name: /lines/i });
    fireEvent.click(linesBtn);

    const prose = document.querySelector(".ws-prose");
    expect(prose).toHaveClass("line-numbers");

    fireEvent.click(linesBtn);
    expect(prose).not.toHaveClass("line-numbers");
  });

  it("toggles changes log open and closed", async () => {
    render(<WritingStudio />);
    await waitFor(() => screen.getByText(/untitled/i));

    const changesBtn = screen.getByRole("button", { name: /changes/i });
    fireEvent.click(changesBtn);
    expect(screen.getByText(/changes this session/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /close/i }));
    expect(screen.queryByText(/changes this session/i)).not.toBeInTheDocument();
  });

  it("calls applyConstraint via command palette selection", async () => {
    applyConstraint.mockResolvedValue({ result: "transformed" });
    render(<WritingStudio />);
    await waitFor(() => screen.getByText(/untitled/i));

    fireEvent.click(screen.getByRole("button", { name: /constraints/i }));
    const input = screen.getByPlaceholderText(/search constraints/i);
    fireEvent.change(input, { target: { value: "lipogram" } });

    const row = screen.getByText("Lipogram");
    fireEvent.click(row);

    await waitFor(() => {
      expect(applyConstraint).toHaveBeenCalled();
    });
  });

  it("handles document deletion via sidebar", async () => {
    render(<WritingStudio />);
    await waitFor(() => screen.getByText(/untitled/i));

    const trashBtn = document.querySelector(".ws-doc__del");
    fireEvent.click(trashBtn);

    await waitFor(() => {
      expect(screen.getByText(/delete document/i)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole("button", { name: /delete/i }));
    // After deleting the last doc a new empty one should be created
    await waitFor(() => {
      expect(screen.getByText(/untitled/i)).toBeInTheDocument();
    });
  });
});
