import "@testing-library/jest-dom/vitest";

// Polyfill innerText for jsdom
if (!Object.getOwnPropertyDescriptor(HTMLElement.prototype, "innerText")) {
  Object.defineProperty(HTMLElement.prototype, "innerText", {
    get() { return this.textContent || ""; },
    set(v) { this.textContent = v; },
  });
}

// Polyfill for Range / Selection APIs not fully supported in jsdom
if (!window.getSelection) {
  window.getSelection = () => ({
    removeAllRanges: () => {},
    addRange: () => {},
    getRangeAt: () => null,
    rangeCount: 0,
    isCollapsed: true,
    toString: () => "",
    anchorNode: null,
  });
}

// Mock matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock scrollIntoView
Element.prototype.scrollIntoView = vi.fn();
