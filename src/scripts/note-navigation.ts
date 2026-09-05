const SCROLL_KEY = 'vam:notes-scroll';
const RESTORE_KEY = 'vam:restore-notes-scroll';
const RESTORING_CLASS = 'is-restoring-notes-scroll';

interface NoteScrollState {
  postPath: string;
  scrollY: number;
}

function normalisePath(pathname: string): string {
  return pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
}

function isNotesIndex(pathname: string): boolean {
  return normalisePath(pathname) === '/notes';
}

function isNotePost(pathname: string): boolean {
  return /^\/notes\/[^/]+$/.test(normalisePath(pathname));
}

function getSavedState(): NoteScrollState | null {
  try {
    const value = sessionStorage.getItem(SCROLL_KEY);
    return value ? JSON.parse(value) as NoteScrollState : null;
  } catch {
    return null;
  }
}

function prepareInstantRestore(): void {
  sessionStorage.setItem(RESTORE_KEY, 'true');
  document.documentElement.classList.add(RESTORING_CLASS);
}

document.addEventListener('click', event => {
  const target = event.target;
  if (!(target instanceof Element)) return;

  const link = target.closest<HTMLAnchorElement>('a');
  if (!link) return;

  const destination = new URL(link.href, window.location.href);

  if (isNotesIndex(window.location.pathname) && isNotePost(destination.pathname)) {
    const state: NoteScrollState = {
      postPath: normalisePath(destination.pathname),
      scrollY: window.scrollY
    };
    sessionStorage.setItem(SCROLL_KEY, JSON.stringify(state));
  }

  if (link.hasAttribute('data-note-back')) {
    const state = getSavedState();
    if (state?.postPath === normalisePath(window.location.pathname) && window.history.length > 1) {
      event.preventDefault();
      prepareInstantRestore();
      window.history.back();
    }
  }
});

document.addEventListener('astro:before-preparation', event => {
  const navigation = event as Event & { direction?: string; to?: URL };
  const state = getSavedState();

  if (
    navigation.direction === 'back' &&
    navigation.to &&
    isNotesIndex(navigation.to.pathname) &&
    state?.postPath === normalisePath(window.location.pathname)
  ) {
    prepareInstantRestore();
  }
});

document.addEventListener('astro:before-swap', event => {
  if (sessionStorage.getItem(RESTORE_KEY) !== 'true') return;

  const navigation = event as Event & { newDocument?: Document; to?: URL };
  if (navigation.to && isNotesIndex(navigation.to.pathname)) {
    navigation.newDocument?.documentElement.classList.add(RESTORING_CLASS);
  }
});

document.addEventListener('astro:after-swap', () => {
  if (!isNotesIndex(window.location.pathname)) return;
  if (sessionStorage.getItem(RESTORE_KEY) !== 'true') return;

  const state = getSavedState();
  if (state) window.scrollTo(0, state.scrollY);

  sessionStorage.removeItem(RESTORE_KEY);
  sessionStorage.removeItem(SCROLL_KEY);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      document.documentElement.classList.remove(RESTORING_CLASS);
    });
  });
});
