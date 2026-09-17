const DEFAULT_WORDS_PER_MINUTE = 200;
const CODE_WORDS_PER_MINUTE = 100;

function countWords(content: string): number {
  return content.match(/[\p{L}\p{N}][\p{L}\p{N}'’–_-]*/gu)?.length ?? 0;
}

/**
 * Calculate a rounded reading time from Markdown content.
 * Prose uses a 200 WPM baseline; code uses a slower 100 WPM baseline.
 */
export function calculateReadingTime(
  markdown: string,
  wordsPerMinute = DEFAULT_WORDS_PER_MINUTE
): string {
  const withoutFrontmatter = markdown.replace(/^---[\s\S]*?---/, ' ');
  const codeBlocks = [...withoutFrontmatter.matchAll(/```[^\n]*\n([\s\S]*?)```/g)]
    .map(match => match[1])
    .join(' ');
  const readableText = withoutFrontmatter
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]*`/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/[#>*_~|-]/g, ' ');

  const proseMinutes = countWords(readableText) / wordsPerMinute;
  const codeMinutes = countWords(codeBlocks) / CODE_WORDS_PER_MINUTE;
  const minutes = Math.max(1, Math.ceil(proseMinutes + codeMinutes));

  return `${minutes} min read`;
}
