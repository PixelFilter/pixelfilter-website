// js/header-scroll.js
document.addEventListener('DOMContentLoaded', function () {
  const header = document.querySelector('.pf-header');
  const footer = document.querySelector('#site-footer');
  if (!header && !footer) return;
  
  function onScroll() {
    if (header) {
      if (window.scrollY > 0) {
        header.classList.add('pf-header--scrolled');
      } else {
        header.classList.remove('pf-header--scrolled');
      }
    }
    if (footer) {
      if (window.scrollY > 0) {
        footer.classList.add('site-footer--scrolled');
      } else {
        footer.classList.remove('site-footer--scrolled');
      }
    }
  }
  
  window.addEventListener('scroll', onScroll);
  onScroll(); // Initialize on load
});