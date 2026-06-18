(function () {

  const SHUFFLE_PROJECTS = false;

  // Small inline icon for the "view source" repo link.
  const REPO_ICON = `
    <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor" aria-hidden="true">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38
        0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13
        -.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66
        .07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15
        -.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09
        2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15
        0 3.07-1.87 3.75-3.65 3.95.29.25.54.74.54 1.5 0 1.09-.01 1.96-.01 2.23
        0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
    </svg>`;

  // https://bost.ocks.org/mike/shuffle/
  // https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
  function shuffle(array) {
    var m = array.length, t, i;

    // While there remain elements to shuffle…
    while (m) {

      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);

      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }

    return array;
  }
  
  const grid = document.getElementById('grid');

  function render(projects) {
    const total = String(projects.length).padStart(2, '0');

    projects.forEach((project, i) => {
      const num = String(i + 1).padStart(2, '0');
      const images = project.images && project.images.length ? project.images : [project.image];

      const card = document.createElement('article');
      card.className = 'card';

      const dots = images.length > 1
        ? `<div class="card__dots">${images.map((_, idx) =>
            `<button class="card__dot${idx === 0 ? ' is-active' : ''}" data-index="${idx}" aria-label="Show screenshot ${idx + 1}"></button>`
          ).join('')}</div>`
        : '';

      const repoLink = project.repo
        ? `<a class="card__repo" href="${project.repo}" target="_blank" rel="noopener" aria-label="View source" title="View source">${REPO_ICON}</a>`
        : '';

      card.innerHTML = `
        <span class="card__index">${num} / ${total}</span>
        <a class="card__frame" href="${project.url}" target="_blank" rel="noopener">
          <img class="card__image" src="${images[0]}" alt="${project.name}" loading="lazy">
        </a>
        ${dots}
        <div class="card__head">
          <a class="card__name" href="${project.url}" target="_blank" rel="noopener">${project.name}</a>
          ${repoLink}
        </div>
        <p class="card__desc">${project.description}</p>
      `;

      // Wire up dot navigation to swap the screenshot without leaving the page.
      if (images.length > 1) {
        const img = card.querySelector('.card__image');
        const dotEls = card.querySelectorAll('.card__dot');

        dotEls.forEach((dot) => {
          dot.addEventListener('click', (e) => {
            e.preventDefault();
            const idx = Number(dot.dataset.index);
            img.src = images[idx];
            dotEls.forEach((d) => d.classList.remove('is-active'));
            dot.classList.add('is-active');
          });
        });
      }

      grid.appendChild(card);
    });
  }
  
  console.log(`Shuffle projects: ${SHUFFLE_PROJECTS}`);
  render(SHUFFLE_PROJECTS ? shuffle(PROJECTS) : PROJECTS);
})();
