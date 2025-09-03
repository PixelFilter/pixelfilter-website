// js/footer.js
document.addEventListener('DOMContentLoaded', async () => {
  const footer = document.getElementById('site-footer');
  if (!footer) return;

  // Social icon SVGs
  const icons = {
    soundcloud: `<i class="fab fa-soundcloud"></i>`,
    youtube: `<i class="fab fa-youtube"></i>`,
    instagram: `<i class="fab fa-instagram"></i>`,
    residentadvisor: `<i class="fa-solid fa-globe"></i>`
  };

  try {
    const res = await fetch('data/socials.json');
    const socialsArr = await res.json();
    const socials = socialsArr[0];

    let html = `<div class="footer-socials">`;
    Object.entries(socials).forEach(([platform, url]) => {
      html += `<a href="${url}" target="_blank" rel="noopener" aria-label="${platform}" class="footer-icon">${icons[platform] || platform}</a>`;
    });
    html += `</div>`;
    footer.innerHTML = html;
  } catch (e) {
    footer.innerHTML = '<div class="footer-error">Social links unavailable.</div>';
  }
});