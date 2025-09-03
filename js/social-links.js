// assets/social-links.js
async function loadSocialLinks(containerId = 'social-links') {
  const res = await fetch('data/socials.json');
  const socialsArr = await res.json();
  const socials = socialsArr[0];
  const icons = {
    soundcloud: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="12" fill="#FF5500"/><rect x="7" y="10" width="2" height="4" fill="#fff"/><rect x="10" y="9" width="2" height="5" fill="#fff"/><rect x="13" y="8" width="2" height="6" fill="#fff"/><rect x="16" y="11" width="2" height="3" fill="#fff"/></svg>`,
    youtube: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="12" fill="#FF0000"/><polygon points="10,8 16,12 10,16" fill="#fff"/></svg>`,
    instagram: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="6" fill="#222"/><circle cx="12" cy="12" r="5" stroke="#fff" stroke-width="2"/><circle cx="17" cy="7" r="1" fill="#fff"/></svg>`,
    residentadvisor: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="6" fill="#222"/><path d="M7 15l5-6 5 6" stroke="#fff" stroke-width="2" fill="none"/></svg>`
  };
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = Object.entries(socials).map(([key, url]) =>
    `<a href="${url}" target="_blank" aria-label="${key.charAt(0).toUpperCase() + key.slice(1)}">${icons[key] || key}</a>`
  ).join('');
}
window.addEventListener('DOMContentLoaded', () => loadSocialLinks());