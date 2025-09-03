document.addEventListener('DOMContentLoaded', async () => {
  const main = document.querySelector('main');
  const response = await fetch('data/shows.json');
  const shows = await response.json();

  function formatDate(dateStr) {
    const date = new Date(dateStr);
    const month = date.toLocaleString('en-US', { month: 'short' }).toUpperCase();
    const day = date.getDate();
    return `${month} ${day}`;
  }

  main.innerHTML = `
    <div class="shows-list">
      ${shows.map(show => `
        <div class="show-item">
          <div class="show-poster-wrap">
            <img class="show-poster" src="${show.PosterURL}" alt="${show.Title}">
            <div class="show-date-overlay">${formatDate(show.Date)}</div>
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
            <a class="show-btn" href="${show.ButtonURL}" target="_blank">${show.ButtonLabel}</a>
          </div>
        </div>
      `).join('')}
    </div>
  `;
});