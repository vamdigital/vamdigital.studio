---
applyTo: "**"
---

# PR Review — General Guidelines

Review all changed code in the **vamdigital.studio** repository (React/TS/AstroJS frontend).
Language-specific rules are in separate instruction files.

## Correctness & Bug Detection

- **Logic errors**: trace each changed code path; verify branching, loops, early returns, and edge cases.
- **Off-by-one / boundary conditions**: check index math, pagination, range slicing, and limit/offset handling.
- **Null / None safety**: look for unguarded attribute access on values that may be `None`, empty collections, or missing dict keys.
- **Concurrency & race conditions**: verify shared state, async ops, and DB transactions are safe (`session.commit()` / rollback).
- **Error propagation**: exceptions caught at the right level; no swallowed errors without logging; no broad `except Exception`.
- **Type correctness**: confirm type annotations match actual runtime values; watch for `Any` creep.
- **Security**: flag SQL injection, path traversal, unvalidated user input, missing auth checks, and secrets in code.

## SOLID Principles

- **Single Responsibility**: each class/module/function should have one reason to change. Flag functions doing both I/O and business logic.
- **Open/Closed**: prefer extending behavior via composition or dependency injection over modifying existing classes.
- **Liskov Substitution**: subclasses must be substitutable for their base; overridden methods must preserve the contract.
- **Interface Segregation**: clients should not depend on methods they don't use. Watch for "god" classes.
- **Dependency Inversion**: high-level modules depend on abstractions. Use FastAPI `Depends()` for DI.

## KISS — Keep It Simple

- Reject unnecessary abstractions, premature generalizations, and over-engineered patterns.
- Prefer flat code over deep nesting (early returns, guard clauses).
- If a change can be expressed more simply without losing clarity, request simplification.

## DRY — Don't Repeat Yourself

- Flag copy-pasted blocks that should be extracted into a shared function, fixture, or utility.
- Check for duplicated constants, magic strings, and repeated query patterns.

## YAGNI — You Aren't Gonna Need It

- Flag code that adds functionality not required by the current task.
- Reject speculative abstractions, unused parameters, and premature extension points.
- Verify every new class, method, parameter, or endpoint is exercised by current code or tests.
- Dead code, commented-out blocks, and TODO placeholders for unplanned features should be removed.

## Clean Code — Naming, Structure & Readability

- Variables, functions, and classes must have clear, intention-revealing names.
- Booleans should read as predicates (`is_active`, `has_access`).
- Files: ~300–400 lines max; functions should do one thing (< 30 lines).
- Imports: stdlib → third-party → local (Ruff/isort). Max line length: 88.
- Complex conditionals should be extracted into named booleans or helper functions.
- Use `logging` (module-level `log = logging.getLogger(...)`) — never `print()`.

## Performance & Scalability

- Watch for N+1 query patterns in ORM code.
- Verify pagination is used for list endpoints — no unbounded result sets.
- Large file operations should stream, not load entirely into memory.
- Avoid blocking the event loop with synchronous I/O in async endpoints.

## Documentation

- Non-obvious business logic should have inline comments explaining _why_, not _what_.
- Public functions/methods should have docstrings with parameter descriptions.
- README or architecture docs should be updated if the change alters project structure.
