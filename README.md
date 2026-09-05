# VAM Digital Studio

An Astro portfolio for Vaibhav Shringarpure, combining a restrained editorial design with grid-based project, experience, notes, and contact pages.

## Stack

- Astro 5
- MDX for Markdown-first notes
- Astro ClientRouter and View Transitions
- Token-based CSS with light, dark, and system themes
- Cloudflare adapter and Wrangler staging configuration

## Commands

| Command | Action |
| --- | --- |
| `npm install` | Install dependencies |
| `npm run dev` | Start the local server at `localhost:4321` |
| `npm run build` | Build to `./dist/` |
| `npm run preview` | Preview the production build |

## Writing a note post

Add writing as an `.mdx` file beneath `src/pages/notes/` and use `noteLayout.astro` in its frontmatter. The Notes grid and reading time are generated automatically from the file.

Use a fenced code block with a language name to enable syntax highlighting:

````md
```tsx
export function Greeting({ name }: { name: string }) {
  return <p>Hello {name}</p>;
}
```
````

Astro uses Shiki with `github-light` and `github-dark`. Change the `codeThemes` values near the top of `astro.config.mjs` to select different bundled Shiki themes.
