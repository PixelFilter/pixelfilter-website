// js/footer.js
document.addEventListener('DOMContentLoaded', async () => {
  const footer = document.getElementById('site-footer');
  if (!footer) return;

  // Social icon SVGs
  const icons = {
    soundcloud: `<svg width="24" height="24" viewBox="0 0 24 24"><path d="M6 18h2v-6H6v6zm3 0h2v-8H9v8zm3 0h2v-10h-2v10zm3 0h2v-12h-2v12zm3 0h2v-14h-2v14z" fill="#aaa"/></svg>`,
    youtube: `<svg width="24" height="24" viewBox="0 0 24 24"><path d="M21.8 8.001a2.753 2.753 0 0 0-1.938-1.938C18.07 5.5 12 5.5 12 5.5s-6.07 0-7.862.563A2.753 2.753 0 0 0 2.2 8.001C1.637 9.793 1.637 12 1.637 12s0 2.207.563 3.999a2.753 2.753 0 0 0 1.938 1.938C5.93 18.5 12 18.5 12 18.5s6.07 0 7.862-.563a2.753 2.753 0 0 0 1.938-1.938c.563-1.792.563-3.999.563-3.999s0-2.207-.563-3.999zM10 15.5v-7l6 3.5-6 3.5z" fill="#aaa"/></svg>`,
    instagram: `<svg width="24" height="24" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.975.974 1.246 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.975-2.242 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.975-.974-1.246-2.242-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.974-.975 2.242-1.246 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.775.131 4.602.396 3.635 1.363 2.668 2.33 2.403 3.503 2.344 4.78.013 8.332 0 8.741 0 12c0 3.259.013 3.668.072 4.948.059 1.277.324 2.45 1.291 3.417.967.967 2.14 1.232 3.417 1.291C8.332 23.987 8.741 24 12 24c3.259 0 3.668-.013 4.948-.072 1.277-.059 2.45-.324 3.417-1.291.967-.967 1.232-2.14 1.291-3.417.059-1.28.072-1.689.072-4.948 0-3.259-.013-3.668-.072-4.948-.059-1.277-.324-2.45-1.291-3.417-.967-.967-2.14-1.232-3.417-1.291C15.668.013 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z" fill="#aaa"/></svg>`,
    residentadvisor: `<svg width="24" height="24" viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#aaa"/><path d="M7 9v6h2v-4h2v4h2v-6H7zm8 0v6h2v-6h-2z" fill="#aaa"/></svg>`
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