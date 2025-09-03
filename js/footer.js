// js/footer.js
document.addEventListener('DOMContentLoaded', async () => {
  const footer = document.getElementById('site-footer');
  if (!footer) return;

  // Social icon SVGs
  const icons = {
    soundcloud: `<i class="fab fa-soundcloud"></i>`,
    youtube: `<i class="fab fa-youtube"></i>`,
    instagram: `<i class="fab fa-instagram"></i>`,
    residentadvisor: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 1000 1000" style="vertical-align:middle;"><g><path fill="currentColor" d="M708.967,539.159c3.131-2.982,5.109-7.161,5.109-11.825c0-4.489-2.136-8.524-5.062-11.478L577.22,384.062l-39.779,39.779l103.763,103.763H494.193c-7.186-0.215-12.882-2.626-17.7-7.296l-65.965-65.965c-6.84-6.468-16.211-10.561-26.37-10.561c-0.036,0-0.069,0.005-0.1,0.005v-0.005h-80.506v-27.526h83.378v0.005c16.52,0.008,31.259,6.769,42.063,17.62l49.203,49.203l39.779-39.779l-50.16-50.16C446.851,372.499,418.536,360,386.788,360c-0.034,0-0.069,0.002-0.103,0.002V360H247.294v140.039h117.977v0.009c7.673,0.055,14.601,3.21,19.603,8.279l64.604,64.606c6.571,6.454,15.45,10.522,25.295,10.888h178.464c7.513-0.098,14.298-3.175,19.25-8.112l36.508-36.504L708.967,539.159z"/></g></svg>`
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