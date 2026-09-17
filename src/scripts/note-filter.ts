function normaliseTag(tag: string): string {
  return tag.trim().toLowerCase();
}

function applyNoteFilter(): void {
  const filter = document.querySelector<HTMLElement>('[data-note-filter]');
  const message = document.querySelector<HTMLElement>('[data-note-filter-message]');
  const results = document.querySelector<HTMLElement>('[data-note-results]');
  const cards = document.querySelectorAll<HTMLElement>('[data-note-tags]');
  const tagLinks = document.querySelectorAll<HTMLAnchorElement>('[data-note-tag]');
  const selectedTag = new URLSearchParams(window.location.search).get('tag')?.trim();

  if (!filter || !message || !selectedTag) {
    cards.forEach(card => {
      card.removeAttribute('hidden');
      const number = card.querySelector<HTMLElement>('[data-note-number]');
      if (number) number.textContent = number.dataset.noteNumberOriginal ?? '';
    });
    tagLinks.forEach(link => link.removeAttribute('aria-current'));
    results?.removeAttribute('data-result-count');
    if (filter) filter.hidden = true;
    return;
  }

  const selectedTagKey = normaliseTag(selectedTag);
  let visibleCount = 0;

  cards.forEach(card => {
    const tags = JSON.parse(card.dataset.noteTags ?? '[]') as string[];
    const matches = tags.includes(selectedTagKey);
    card.hidden = !matches;

    if (matches) {
      visibleCount += 1;
      const number = card.querySelector<HTMLElement>('[data-note-number]');
      if (number) number.textContent = String(visibleCount).padStart(2, '0');
    }
  });

  tagLinks.forEach(link => {
    const isSelected = normaliseTag(link.dataset.noteTag ?? '') === selectedTagKey;
    if (isSelected) {
      link.setAttribute('aria-current', 'true');
    } else {
      link.removeAttribute('aria-current');
    }
  });

  results?.setAttribute('data-result-count', String(visibleCount));

  const noteLabel = visibleCount === 1 ? 'note' : 'notes';
  message.textContent = visibleCount > 0
    ? `${visibleCount} ${noteLabel} · ${selectedTag}`
    : `No notes · ${selectedTag}`;
  filter.hidden = false;
}

document.addEventListener('astro:page-load', applyNoteFilter);
applyNoteFilter();
