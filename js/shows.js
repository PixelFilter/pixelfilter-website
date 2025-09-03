document.addEventListener('DOMContentLoaded', async () => {
  const main = document.querySelector('main');
  const response = await fetch('data/shows.json');
  const shows = await response.json();

  function formatDate(dateStr) {
    const date = new Date(dateStr);
    const month = date.toLocaleString('en-US', { month: 'short' }).toUpperCase();
    const day = date.getDate();
    return `
      <div class="show-date-month">${month}</div>
      <div class="show-date-day">${day}</div>
    `;
  }

  main.innerHTML = `
    <div class="shows-list">
      ${shows.map(show => {
        const showDate = new Date(show.Date);
        const now = new Date();
        showDate.setHours(0,0,0,0);
        now.setHours(0,0,0,0);
        const isPast = showDate < now;
        const isFuture = showDate >= now;
        return `
          <div class="show-item">
            <div class="show-poster-wrap">
              <img class="show-poster" src="${show.PosterURL}" alt="${show.Title}">
              <div class="show-date-overlay${isPast ? ' past-show' : ''}${isFuture ? ' future-show' : ''}">${formatDate(show.Date)}</div>
            </div>
            <div class="show-content">
              <h2 class="show-title">${show.Title}</h2>
              <div class="show-location"><em>${show.Location}</em></div>
              <div class="show-desc">${show.Description}</div>
              ${Array.isArray(show["Stage Name"]) ? show["Stage Name"].map(stage =>
                `<div class="show-stage">
                  ${stage.name ? `<div class="show-stage-name">${stage.name}</div>` : ''}
                  <ul class="show-lineup">
                    ${stage.Lineup.map(item => `<li>${item.replace(/  /g, '&nbsp;&nbsp;')}</li>`).join('')}
                  </ul>
                </div>`
              ).join('') : ''}
              ${show.ButtonLabel && show.ButtonLabel.toLowerCase().includes('video') && show.ButtonURL
                ? `<button class="show-btn show-video-btn" data-video-url="${show.ButtonURL}">${show.ButtonLabel}</button>`
                : `<a class="show-btn" href="${show.ButtonURL}" target="_blank">${show.ButtonLabel}</a>`
              }
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
  // Fullscreen video logic for "View Videos" buttons
  main.addEventListener('click', function(e) {
    const btn = e.target.closest('.show-video-btn');
    if (!btn) return;
    e.preventDefault();
    const videoURL = btn.getAttribute('data-video-url');
    const match = videoURL.match(/v=([a-zA-Z0-9_-]+)/);
    const videoId = match ? match[1] : '';
    if (!videoId) return;

    // Create overlay
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100vw';
    overlay.style.height = '100vh';
    overlay.style.background = 'rgba(0,0,0,0.95)';
    overlay.style.zIndex = '9999';
    overlay.style.display = 'flex';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';

    // Close button
    const closeBtn = document.createElement('button');
    closeBtn.textContent = '×';
    closeBtn.style.position = 'absolute';
    closeBtn.style.top = '32px';
    closeBtn.style.right = '48px';
    closeBtn.style.fontSize = '3rem';
    closeBtn.style.color = '#fff';
    closeBtn.style.background = 'transparent';
    closeBtn.style.border = 'none';
    closeBtn.style.cursor = 'pointer';
    closeBtn.style.zIndex = '10001';

    // YouTube embed iframe
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&showinfo=0&modestbranding=1`;
    iframe.width = '90%';
    iframe.height = '90%';
    iframe.allow = 'autoplay; encrypted-media';
    iframe.allowFullscreen = true;
    iframe.frameBorder = '0';
    iframe.style.borderRadius = '12px';
    iframe.style.boxShadow = '0 0 32px #000';

    overlay.appendChild(iframe);
    overlay.appendChild(closeBtn);
    document.body.appendChild(overlay);

    // Request fullscreen
    if (overlay.requestFullscreen) {
      overlay.requestFullscreen();
    } else if (overlay.webkitRequestFullscreen) {
      overlay.webkitRequestFullscreen();
    } else if (overlay.msRequestFullscreen) {
      overlay.msRequestFullscreen();
    }

    // Remove overlay on close
    closeBtn.onclick = () => {
      document.body.removeChild(overlay);
      if (document.fullscreenElement) {
        document.exitFullscreen();
      }
    };

    // Remove overlay if user exits fullscreen
    document.addEventListener('fullscreenchange', function handler() {
      if (!document.fullscreenElement && document.body.contains(overlay)) {
        document.body.removeChild(overlay);
        document.removeEventListener('fullscreenchange', handler);
      }
    });
  });
});