const MOBILE_BREAKPOINT = 768;

function getNavigationElements() {
  const header = document.querySelector<HTMLElement>('.header');
  const toggle = document.querySelector<HTMLButtonElement>('.nav-toggle');

  return { header, toggle };
}

function setNavigationOpen(open: boolean): void {
  const { header, toggle } = getNavigationElements();
  if (!header || !toggle) return;

  header.toggleAttribute('data-menu-open', open);
  toggle.setAttribute('aria-expanded', String(open));
  const accessibleLabel = toggle.querySelector<HTMLElement>('.sr-only');
  if (accessibleLabel) accessibleLabel.textContent = open ? 'Close navigation' : 'Open navigation';
}

function closeNavigation(): void {
  setNavigationOpen(false);
}

document.addEventListener('click', event => {
  const target = event.target;
  if (!(target instanceof Element)) return;

  if (target.closest('.nav-toggle')) {
    const { header } = getNavigationElements();
    setNavigationOpen(!header?.hasAttribute('data-menu-open'));
    return;
  }

  if (target.closest('#primary-navigation a')) closeNavigation();
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeNavigation();
});

document.addEventListener('astro:before-preparation', closeNavigation);
document.addEventListener('astro:page-load', closeNavigation);

window.addEventListener('resize', () => {
  if (window.innerWidth >= MOBILE_BREAKPOINT) closeNavigation();
});
