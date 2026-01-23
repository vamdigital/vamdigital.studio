// src/scripts/nav-active.ts
export function initNavActive() {
  const links = document.querySelectorAll<HTMLAnchorElement>(".nav-list a[data-path]");

  function setActive(path: string) {
    links.forEach(link => {
      link.classList.toggle("active", link.dataset.path === path);
    });
  }

  // Set active on initial load
  setActive(window.location.pathname);

  // Update on ClientRouter navigation
  document.addEventListener("astro:navigation-start", () => {
    // Remove active class during transition to prevent flicker
    links.forEach(link => link.classList.remove("active"));
  });

  document.addEventListener("astro:navigation-end", (e: any) => {
    setActive(e.detail.to.pathname);
  });
}
