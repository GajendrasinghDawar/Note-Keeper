# APP INTRO

This is a Progressive Web App (PWA) built with React. It provides offline capabilities and can be installed locally on your device. I am learning PWA patterns to make web apps feel more like native apps using only web tools. So, this app is a kind of playground for me to apply learned PWA concepts.

## Commands

- Dev server: `npm run dev`
- Build: `npm run build`
- Lint: `npm run lint`
- Typecheck: `npm run typecheck`
- No test framework configured.

## Architecture

React 18 SPA with PWA support (vite-plugin-pwa). Client-only, no backend.

- `src/Pages/` — Route pages (app.tsx entry, notes/ subdirectory). Router: react-router-dom v6.
- `src/components/` — Reusable UI components (.tsx). Rich text via TipTap editor.
- `src/utils/db.ts` — IndexedDB persistence layer using `idb`. Store: `note-store`, object store: `notes`.
- `src/types.ts` — Shared TypeScript interfaces (Note, NoteFormData).
- Styling: Tailwind CSS + Radix UI primitives. Animations via motion(formerly framer-motion).
- Path aliases: `@` → `src/`, `@components` → `src/components/`.

## File & Folder Naming

- **snake_case** for all file names: `scroll_to_bottom.tsx`, `date_utils.ts`, `dropdown_menu.tsx`
- **lowercase** folder names: `components/`, `elements/`, `chat-notes/`

## Code Style

- **No semicolons**
- **Single quotes** (including JSX)
- **No parens** around single arrow function params: `x => x`
- **Trailing commas** (ES5 style)
- Imports auto-sorted by Prettier plugin in this order: `server-only` → `react` → `next` → third-party → `@/` aliases → relative

## Naming Conventions

- **PascalCase** for React components and types: `Button`, `ButtonProps`
- **camelCase** for functions, variables: `useProgress`, `variantClasses`
- **snake_case** for file names (even components): `back_button.tsx`, `scroll_area.tsx`
- **UPPER_SNAKE_CASE** for environment variables and constants

## Color of My app

- **Primary:** yellow
- **Secondary:** Jade
- **Tertiary:**
- **Gray scale:** Slate
- **Body background:**

## References

- Color scale usage guide (which step for which UI element): `docs/color_scale.md`
- Theme variables (color tokens, shadows): `pages/theme.css`
