// assets/social-links.js
async function loadSocialLinks(containerId = 'social-links') {
  const res = await fetch('data/socials.json');
  const socialsArr = await res.json();
  const socials = socialsArr[0];
  const icons = {
    soundcloud: `<i class="fab fa-soundcloud"></i>`,
    youtube: `<i class="fab fa-youtube"></i>`,
    instagram: `<i class="fab fa-instagram"></i>`,
    residentadvisor: `<i class="fa-solid fa-globe"></i>`
  };
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = Object.entries(socials).map(([key, url]) =>
    `<a href="${url}" target="_blank" aria-label="${key.charAt(0).toUpperCase() + key.slice(1)}">${icons[key] || key}</a>`
  ).join('');
}
window.addEventListener('DOMContentLoaded', () => loadSocialLinks());