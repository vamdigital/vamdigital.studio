function getLanguage(pre: HTMLElement): string {
  const dataLanguage = pre.dataset.language;
  if (dataLanguage) return dataLanguage;

  const code = pre.querySelector('code');
  const languageClass = [...(code?.classList ?? [])].find(name => name.startsWith('language-'));
  return languageClass?.replace('language-', '') ?? 'code';
}

function enhanceCodeBlocks(): void {
  document.querySelectorAll<HTMLElement>('.article-content pre').forEach(pre => {
    if (pre.dataset.enhanced === 'true') return;
    pre.dataset.enhanced = 'true';

    const wrapper = document.createElement('div');
    wrapper.className = 'code-block';
    pre.parentNode?.insertBefore(wrapper, pre);
    wrapper.appendChild(pre);

    const toolbar = document.createElement('div');
    toolbar.className = 'code-block__toolbar';

    const language = document.createElement('span');
    language.textContent = getLanguage(pre).toUpperCase();

    const copyButton = document.createElement('button');
    copyButton.type = 'button';
    copyButton.className = 'code-block__copy';
    copyButton.textContent = 'Copy';
    copyButton.setAttribute('aria-label', 'Copy code to clipboard');

    copyButton.addEventListener('click', async () => {
      const code = pre.querySelector('code')?.textContent ?? pre.textContent ?? '';
      try {
        await navigator.clipboard.writeText(code);
        copyButton.textContent = 'Copied';
        window.setTimeout(() => { copyButton.textContent = 'Copy'; }, 1600);
      } catch {
        copyButton.textContent = 'Copy failed';
        window.setTimeout(() => { copyButton.textContent = 'Copy'; }, 1600);
      }
    });

    toolbar.append(language, copyButton);
    wrapper.prepend(toolbar);
  });
}

document.addEventListener('astro:page-load', enhanceCodeBlocks);
enhanceCodeBlocks();
