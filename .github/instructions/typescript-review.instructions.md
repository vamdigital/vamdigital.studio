---
applyTo: "**/*.ts,**/*.tsx"
---

# TypeScript / Frontend Review Guidelines

- **Strict TypeScript** — avoid the `any` type unless explicitly justified; prefer `unknown` or specific types.
- **React patterns**: functional components with hooks; avoid class components.
- Use proper event types (e.g., `React.ChangeEvent<HTMLInputElement>`).
- Type all props and state explicitly with interfaces.
