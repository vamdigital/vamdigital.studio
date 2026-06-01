# Project Agent Instructions

## Tech Stack

- React (latest)
- React Router v7
- TypeScript (strict mode)
- React Aria Components

## Instructions

- Follow Web Standards, React, Astrojs, and TypeScript best practices per their official docs
- Always follow GitHub PR review guidelines — all code suggestions must be
  Copilot-review compatible

## Design Files

All design specs live in `./designs/`. Reference them for any UI work or when i ask you to check or give you a reference of a design file before implementing components

## General

- Ask for confirmation before adding any new production dependency
- Do not modify files outside the package relevant to the current task

## TypeScript

- Prefer non-exported (`const`/`function`) symbols by default.
- Only export values/types that are used outside the current module.
- If a symbol is used only to build another local constant (for example defaults/lookup helpers), keep it private or inline it.
- Keep module public API minimal: avoid adding exports unless there is a clear cross-module consumer.
- Before opening a PR, quickly remove dead or internal-only exports to prevent API surface creep.

## Code Review Standards

When reviewing or making changes, always:

1. Validate against the **official React documentation** (https://react.dev)
2. Validate against the **official Astrojs documentation** (https://docs.astro.build/en/getting-started/)
3. Validate against **TypeScript best practices** — prefer explicit types but in some places we still use 'any' so its ok to have that for now
4. Validate against **Web standards best practices documentation** (https://developer.mozilla.org/en-US/)
5. Validate against **React Aria Components best practices documentation** (https://react-aria.adobe.com/getting-started)
6. Flag any code that violates the Patterns or Engineering Principles - explain which principle and why
7. Suggest the simpler alternative, don't just point out the problem

## Performance Requirements

- Prefer `useMemo` / `useCallback` only where there is a measurable benefit — do not over-optimize
- Avoid unnecessary re-renders; check component boundaries and prop drilling
- Keep bundle size in mind — flag any large dependency additions

## Patterns

- Use functional components only — no class components
- Co-locate types with the files that use them
- Prefer named exports over default exports

## Engineering Principles

Apply these principles to every change:

- **KISS** - Keep it simple. Prefer the straightforward solution over a clever one. If a junior dev would struggle to follow it, simplify it.
- **YAGNI** - Don't build what isn't asked for. No speculative abstractions, extra config options, or "we might need this later" code.
- **SOLID** - Specifically:
  - Single Responsibility: one reason to change per component/function
  - Open/Closed: extend behaviour without modifying existing code
  - Liskov: don't break expected behaviour in derived components
  - Interface Segregation: small focused props/interfaces over large generic ones
  - Dependency Inversion: depend on abstractions (interfaces/types) not concretions

## Testing

- The UI currently does not have unit test coverage.
- Do not block reviews or implementation on missing UI unit tests unless the task explicitly adds or changes a test setup.

## PR Review Alignment

Before finalising UI changes intended for PR review:

- If the work is Jira-backed, confirm the implementation maps to the Jira acceptance criteria.
- Call out any behavior intentionally left out because it was not in scope.
- Check the repository Copilot review instructions:
  - `.github/instructions/pr-review.instructions.md`
  - `.github/instructions/typescript-review.instructions.md`
- Use them as a pre-review checklist, especially for:
  - edge cases and boundary conditions
  - loading and disabled states
  - empty or partially empty API responses
  - browser storage failures
  - stale/restored state after navigation
  - URL vs local state behavior
  - misleading UI copy
  - TypeScript correctness

## Pre-PR Self-Review Checklist

Before opening or updating a PR, quickly verify:

1. Can repeated parsing/normalization logic be centralized in shared utilities?
2. Are any helpers nested without closure benefit and better moved to module scope?
3. Is the same rule implemented consistently (avoid mixed patterns for identical checks)?
4. Are trust boundaries clear (normalize/validate at input boundaries, treat downstream values as trusted)?
5. Would this change trigger a consistency/readability comment if you reviewed it as a teammate?

## Before Finalising Any Change

- Confirm the change follows the patterns in the official docs, not outdated patterns.
- If adding a new dependency, ask for confirmation first.
- Flag large dependency additions before proceeding.
