interface NoteFrontMatter {
  title: string;
  pubDate: string | Date;
  draft?: boolean;
}

interface NoteModule {
  frontmatter: NoteFrontMatter;
  url: string;
}

export interface NavigationNote {
  title: string;
  url: string;
  published: Date;
}

/**
 * Return notes in reverse chronological order.
 *
 * Drafts are included during development but excluded from production.
 */
export function getNoteNavigation(): NavigationNote[] {
  const modules = import.meta.glob<NoteModule>('/src/pages/notes/*.mdx', {
    eager: true,
  });

  return Object.values(modules)
    .filter(module => {
      return import.meta.env.DEV || module.frontmatter.draft !== true;
    })
    .map(module => ({
      title: module.frontmatter.title,
      url: module.url,
      published: new Date(module.frontmatter.pubDate),
    }))
    .sort((a, b) => b.published.getTime() - a.published.getTime());
}
