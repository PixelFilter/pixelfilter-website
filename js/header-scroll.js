// js/header-scroll.js
document.addEventListener('DOMContentLoaded', function () {
  const header = document.querySelector('.pf-header');
  if (!header) return;

  function onScroll() {
    if (window.scrollY > 0) {
      header.classList.add('pf-header--scrolled');
    } else {
      header.classList.remove('pf-header--scrolled');
    }
  }

  window.addEventListener('scroll', onScroll);
  onScroll(); // Initialize on load
});