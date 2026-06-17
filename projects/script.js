(function () {
  const grid = document.getElementById('grid');

  function render(projects) {
    const index = String(projects.length).padStart(2, '0');

    projects.forEach((project, i) => {
      const num = String(i + 1).padStart(2, '0');

      const card = document.createElement('a');
      card.className = 'card';
      card.href = project.url;
      card.target = '_blank';
      card.rel = 'noopener';

      card.innerHTML = `
        <span class="card__index">${num} / ${index}</span>
        <div class="card__frame">
          <img class="card__image" src="${project.image}" alt="${project.name}" loading="lazy">
        </div>
        <h2 class="card__name">${project.name}</h2>
        <p class="card__desc">${project.description}</p>
      `;

      grid.appendChild(card);
    });
  }

  render(PROJECTS);
})();
