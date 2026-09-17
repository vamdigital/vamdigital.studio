function setActiveLink() {
  const links = document.querySelectorAll(".nav-list a");
  const currentPath = window.location.pathname;

  links.forEach((link) => {
    link.classList.remove("active");
    const href = link.getAttribute("href");
    if (!href) return;

    // Exact match for home, startsWith for everything else
    const isActive =
      href === "/" ? currentPath === "/" : currentPath.startsWith(href);

    if (isActive) link.classList.add("active");
  });
}

document.addEventListener("astro:page-load", setActiveLink);
setActiveLink();
