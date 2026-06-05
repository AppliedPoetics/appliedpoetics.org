import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AuthModal from "../AuthModal.jsx";

vi.mock("../../lib/docsApi.js", () => ({
  login: vi.fn(() => Promise.resolve()),
  signup: vi.fn(() => Promise.resolve()),
}));

import { login, signup } from "../../lib/docsApi.js";

describe("AuthModal", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders login form by default", () => {
    render(<AuthModal onClose={vi.fn()} onLogin={vi.fn()} />);
    expect(screen.getByRole("button", { name: /log in/i })).toBeInTheDocument();
    expect(screen.queryByText(/email/i)).not.toBeInTheDocument();
  });

  it("switches to signup mode and shows email field", () => {
    render(<AuthModal onClose={vi.fn()} onLogin={vi.fn()} />);
    fireEvent.click(screen.getByRole("button", { name: /sign up/i }));
    expect(screen.getByText(/email/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /sign up/i })).toBeInTheDocument();
  });

  it("calls onClose when clicking scrim", () => {
    const onClose = vi.fn();
    const { container } = render(<AuthModal onClose={onClose} onLogin={vi.fn()} />);
    const scrim = container.querySelector(".ws-scrim");
    fireEvent.click(scrim);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("calls login and onLogin on submit in login mode", async () => {
    const onLogin = vi.fn();
    login.mockResolvedValueOnce({});
    render(<AuthModal onClose={vi.fn()} onLogin={onLogin} />);

    const inputs = screen.getAllByRole("textbox");
    // Order: username, (email in signup mode), password is not textbox
    const usernameInput = inputs[0];
    fireEvent.change(usernameInput, { target: { value: "alice" } });

    const passwordInput = document.querySelector('input[type="password"]');
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    fireEvent.click(screen.getByRole("button", { name: /log in/i }));

    await waitFor(() => {
      expect(login).toHaveBeenCalledWith("alice", "password123");
      expect(onLogin).toHaveBeenCalledTimes(1);
    });
  });

  it("displays error message on failed login", async () => {
    login.mockRejectedValueOnce(new Error("Bad credentials"));
    render(<AuthModal onClose={vi.fn()} onLogin={vi.fn()} />);

    const inputs = screen.getAllByRole("textbox");
    fireEvent.change(inputs[0], { target: { value: "alice" } });
    const passwordInput = document.querySelector('input[type="password"]');
    fireEvent.change(passwordInput, { target: { value: "wrong" } });

    fireEvent.click(screen.getByRole("button", { name: /log in/i }));

    await waitFor(() => {
      expect(screen.getByText(/bad credentials/i)).toBeInTheDocument();
    });
  });

  it("disables submit button while loading", async () => {
    login.mockImplementation(() => new Promise((resolve) => setTimeout(resolve, 500)));
    render(<AuthModal onClose={vi.fn()} onLogin={vi.fn()} />);

    const inputs = screen.getAllByRole("textbox");
    fireEvent.change(inputs[0], { target: { value: "alice" } });
    const passwordInput = document.querySelector('input[type="password"]');
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    const btn = screen.getByRole("button", { name: /log in/i });
    fireEvent.click(btn);

    await waitFor(() => {
      expect(btn).toBeDisabled();
    });
  });
});
