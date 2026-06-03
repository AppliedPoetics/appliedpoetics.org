# Applied Poetics

> A studio for constrained writing — where chance and rule make strange, beautiful text.

[![Astro](https://img.shields.io/badge/built%20with-Astro-BC52EE?logo=astro)](https://astro.build)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev)
[![License](https://img.shields.io/badge/license-ISC-blue.svg)](LICENSE)

[appliedpoetics.org](https://appliedpoetics.org)

---

## About

Applied Poetics is a writing space built on the Oulipo tradition and a century of computational text. Bring a poem; remove a letter, sort the words by length, let the digits of π decide what survives. Where the aleatory meets the constrained, meaning keeps turning.

The project began in 2014 as the *Found Poetry Review*'s "Oulipost" and has grown into a platform with 40+ constraints spanning Oulipean, grammatical, algorithmic, formic, numerological, and pop-culture categories.

## Features

- **40+ Constraints** — Lipogram, Snowball, Markov, Anagram, Sestina, Nth Word, Univocalism, Travesty, Concordance, Pi-thon, The LOST Numbers, and more
- **Interactive Writing Studio** — Rich text editor with contextual constraint menus, command palette (⌘K), and a persistent changes log
- **Constraint Catalog** — Browse constraints by lineage with descriptions and live parameter dialogs
- **Real-time API Integration** — Constraints powered by the [Applied Poetics API](https://api.appliedpoetics.org)
- **Responsive Design** — Built with a custom design system, works on desktop and mobile
- **Dark Mode Favicon** — SVG favicon adapts to `prefers-color-scheme`

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | [Astro](https://astro.build) 5.x (static site generation) |
| UI | [React](https://react.dev) 19.x (islands architecture via `@astrojs/react`) |
| Icons | [Lucide React](https://lucide.dev) |
| Styling | Custom CSS design system (`design-system.css`, `studio.css`) |
| Testing | [Vitest](https://vitest.dev) 4.x + [Testing Library](https://testing-library.com) + jsdom |
| API | `fetch` client → `https://api.appliedpoetics.org/v1/{category}/{method}` |

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) 18+ (20+ recommended)
- npm (comes with Node.js)

### Installation

```bash
# Clone the repository
git clone https://github.com/AppliedPoetics/appliedpoetics.org.git
cd appliedpoetics.org

# Install dependencies
npm install
```

### Development

```bash
# Start the Astro dev server at localhost:4321
npm run dev
```

Open [http://localhost:4321](http://localhost:4321) to view the landing page, and [http://localhost:4321/studio](http://localhost:4321/studio) for the writing studio.

### Build

```bash
# Generate the static site to ./dist/
npm run build

# Preview the production build locally
npm run preview
```

The build produces a static site in `./dist/` that can be deployed to any static host (Netlify, Vercel, GitHub Pages, Cloudflare Pages, S3, etc.). There is no server-side runtime required.

### Testing

The project uses [Vitest](https://vitest.dev) with jsdom and Testing Library for component tests.

```bash
# Run all tests once (CI mode)
npx vitest run

# Run tests in watch mode (development)
npx vitest

# Run with UI (if vitest-ui is installed)
npx vitest --ui
```

Test files live alongside components in `src/components/__tests__/` and are picked up by the glob `src/**/*.test.{js,jsx}`. The test setup file is at `src/test/setup.js` and configures jsdom polyfills for DOM APIs like `innerText` and `getSelection`.

Current test coverage includes:
- `WritingStudio` — mount, word counting, document CRUD, constraints, auth modal, line numbers
- `ConstraintLog` — empty state, rendering, undo/redo/remove actions
- `CommandPalette` — search, category filtering, keyboard navigation
- `Sidebar` — document list, active state, delete button visibility
- `TopBar` — button rendering, count display
- `ContextMenu` — mount, selection display
- `Button` — variants, icons, labels
- `Icon` — name mapping, size, style props

## Project Structure

```text
appliedpoetics.org/
├── public/
│   ├── assets/
│   │   └── logo.png                  # AP logo (flask mark)
│   ├── style/
│   │   ├── design-system.css         # CSS variables, tokens, utilities
│   │   └── studio.css                # Writing Studio component styles
│   ├── favicon.svg                   # SVG favicon (dark-mode aware)
│   ├── favicon.ico                   # Legacy .ico fallback
│   ├── favicon-96x96.png             # PNG favicon
│   ├── apple-touch-icon.png          # iOS home-screen icon
│   └── site.webmanifest              # PWA manifest
├── src/
│   ├── layouts/
│   │   └── BaseLayout.astro          # Shared HTML shell (<head>, favicons, CSS)
│   ├── pages/
│   │   ├── index.astro               # Landing page (marketing site)
│   │   └── studio.astro              # Writing Studio (React island)
│   ├── components/
│   │   ├── WritingStudio.jsx         # Main studio orchestrator
│   │   ├── Sidebar.jsx               # Document sidebar
│   │   ├── TopBar.jsx                # Studio toolbar
│   │   ├── ContextMenu.jsx           # Text-selection constraint menu
│   │   ├── CommandPalette.jsx        # ⌘K constraint search
│   │   ├── ParamDialog.jsx           # Parameter input dialogs
│   │   ├── ConstraintLog.jsx         # Changes / history panel
│   │   ├── Icon.jsx                  # Lucide icon wrapper
│   │   └── Button.jsx                # Reusable button component
│   └── lib/
│       ├── constraints.js              # Constraint catalog + API mapping
│       └── api.js                    # Fetch client for AP API
├── astro.config.mjs                  # Astro config (React integration)
├── vitest.config.js                  # Vitest + jsdom test config
├── package.json
├── tsconfig.json
└── README.md
```

## Deployment

This is a **static site** — `npm run build` outputs HTML, CSS, and JS to `./dist/`. No Node.js server or database is required at runtime.

### Recommended hosts

- **Netlify** — Drag `./dist/` into the deploy UI, or connect the Git repo for continuous deployment.
- **Vercel** — Import the project; Vercel auto-detects Astro and runs `npm run build`.
- **GitHub Pages** — Use the `deploy.yml` GitHub Action (or `astro build` + ` peaceiris/actions-gh-pages`).
- **Cloudflare Pages** — Connect the repo and set the build command to `npm run build` with output directory `dist`.
- **Any static host** — Upload the contents of `./dist/` after running `npm run build`.

### Environment considerations

- The site makes `fetch` calls to `https://api.appliedpoetics.org` and `https://docs.appliedpoetics.org`. No API keys or environment variables are required for the public constraint endpoints.
- Authentication tokens for document persistence are stored in cookies with a 30-day `Max-Age` (`ap_token`).
- There are no `.env` files committed to the repo. If you fork the project and need to point to a different API, modify `src/lib/api.js` and `src/lib/docsApi.js` directly.

## API

The writing studio calls constraints via the Applied Poetics API:

```
POST https://api.appliedpoetics.org/v1/{category}/{method}
Content-Type: application/json

{ "text": "your source text", ...params }
```

**Example:**
```bash
curl -X POST https://api.appliedpoetics.org/v1/oulipean/lipogram \
  -H "Content-Type: application/json" \
  -d '{"text": "Hello world", "letters": "e"}'
```

Constraint definitions (categories, parameters, descriptions) live in [`src/lib/constraints.js`](src/lib/constraints.js). The API client is in [`src/lib/api.js`](src/lib/api.js).

## Scripts

| Command | Action |
| :------ | :----- |
| `npm install` | Install dependencies |
| `npm run dev` | Start Astro dev server at `localhost:4321` |
| `npm run build` | Build production site to `./dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run astro` | Run Astro CLI commands |
| `npx vitest run` | Run all tests once (CI mode) |
| `npx vitest` | Run tests in watch mode |
| `npx vite --host` | Start Vite dev server directly (useful for isolated component testing)

## Favicon Structure

Favicons follow Astro best practices: SVG is served first for modern browsers (with `prefers-color-scheme` support), PNG for browsers that need it, and `.ico` as a legacy fallback.

```html
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
<link rel="icon" type="image/x-icon" href="/favicon.ico" />
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
<link rel="manifest" href="/site.webmanifest" />
```

## Contributing

Contributions are welcome! Please open an issue or pull request on GitHub.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-thing`)
3. Commit your changes (`git commit -m 'Add amazing thing'`)
4. Push to the branch (`git push origin feature/amazing-thing`)
5. Open a Pull Request

## Related Projects

- [ouliprogram](https://github.com/AppliedPoetics/ouliprogram) — Core constraint engine (Python / Perl backend)

## Author

**Doug Luman** — poet, book designer, coder.

- Website: [douglasjluman.com](https://www.douglasjluman.com)
- GitHub: [@AppliedPoetics](https://github.com/AppliedPoetics)

## Acknowledgments

Special thanks to Misky Braendeholm, E. Kristen Anderson, James Moore, Margo Roby, Roxanna Bennett, Josh Medsker, Nancy Chen Long, Matt Trease, Ed Bremson, Beth Ayer, and everyone who participated in the [Oulipost](http://www.foundpoetryreview.com/oulipost/) project and various [Found Poetry Review](http://foundpoetryreview.com) events.

## License

This project is open source. See [LICENSE](LICENSE) for details.

---

*© 2014–2026 Applied Poetics · a journal of learning*

*Put a text to chance, and read what changes.*
