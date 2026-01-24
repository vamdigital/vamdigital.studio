function setActiveLink() {
  const links = document.querySelectorAll('.nav-list a');
  const currentPath = window.location.pathname;
  links.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === currentPath) {
      link.classList.add('active');
    }
  });
}

function initActiveLink() {
  document.addEventListener('astro:page-load', setActiveLink);
  setActiveLink(); // Run immediately in case the event has already fired
}

initActiveLink();