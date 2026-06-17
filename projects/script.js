(function () {

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
  //render(shuffle(PROJECTS));

})();
