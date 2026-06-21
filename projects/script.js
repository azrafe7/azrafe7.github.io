(function () {

  const SHUFFLE_PROJECTS = true;

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
      const images = project.images;

      const card = document.createElement('article');
      card.className = 'card';

      const dots = images.length > 1
        ? `<div class="card__dots">${images.map((_, idx) =>
            `<button class="card__dot${idx === 0 ? ' is-active' : ''}" data-index="${idx}" aria-label="Show screenshot ${idx + 1}"></button>`
          ).join('')}</div>`
        : '';

      const arrows = images.length > 1
        ? `<button class="card__arrow card__arrow--prev" data-dir="-1" aria-label="Previous screenshot">‹</button>
           <button class="card__arrow card__arrow--next" data-dir="1" aria-label="Next screenshot">›</button>`
        : '';

      const repoLink = project.repo
        ? `<a class="card__repo" href="${project.repo}" target="_blank" rel="noopener" aria-label="View source" title="View source">${REPO_ICON}</a>`
        : '';

      card.innerHTML = `
        <span class="card__index">${num} / ${total}</span>
        <a class="card__frame" href="${project.url}" target="_blank" rel="noopener" tabindex="0" draggable="false">
          <img class="card__image" src="${images[0]}" alt="${project.name}" loading="lazy" draggable="false">
          ${arrows}
        </a>
        ${dots}
        <div class="card__head">
          <a class="card__name" href="${project.url}" target="_blank" rel="noopener">${project.name}</a>
          ${repoLink}
        </div>
        <p class="card__desc">${project.description}</p>
      `;

      // Wire up dot navigation, arrows, swipe, and keyboard to switch
      // screenshots without leaving the page.
      if (images.length > 0) {
        const frame = card.querySelector('.card__frame');
        const img = card.querySelector('.card__image');
        const dotEls = card.querySelectorAll('.card__dot');
        const arrowEls = card.querySelectorAll('.card__arrow');
        let current = 0;

        function goTo(idx) {
          current = ((idx % images.length) + images.length) % images.length;
          img.src = images[current];
          if (dotEls.length > 0) {
            dotEls.forEach((d) => d.classList.remove('is-active'));
            dotEls[current].classList.add('is-active');
          }
        }

        dotEls.forEach((dot) => {
          dot.addEventListener('click', (e) => {
            e.preventDefault();
            goTo(Number(dot.dataset.index));
          });
        });

        arrowEls.forEach((arrow) => {
          arrow.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            goTo(current + Number(arrow.dataset.dir));
          });
        });

        // Swipe handling. Tracks horizontal drag distance and only treats it
        // as a swipe past a small threshold, so taps still work as clicks.
        const SWIPE_THRESHOLD = 40;
        let startX = 0;
        let startY = 0;
        let deltaX = 0;
        let isSwipe = false;
        let dragging = false;

        function onPointerDown(e) {
          dragging = true;
          isSwipe = false;
          startX = e.clientX;
          startY = e.clientY;
          deltaX = 0;
        }

        function onPointerMove(e) {
          if (!dragging) return;
          deltaX = e.clientX - startX;
          const deltaY = e.clientY - startY;
          if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 10) {
            isSwipe = true;
          }
        }

        function onPointerUp() {
          if (!dragging) return;
          dragging = false;
          if (Math.abs(deltaX) > SWIPE_THRESHOLD) {
            if (deltaX < 0) {
              goTo(current + 1); // swiped left -> next image
            } else {
              goTo(current - 1); // swiped right -> previous image
            }
          }
        }

        frame.addEventListener('pointerdown', onPointerDown);
        frame.addEventListener('pointermove', onPointerMove);
        frame.addEventListener('pointerup', onPointerUp);
        frame.addEventListener('pointercancel', () => { dragging = false; });

        // Suppress the navigation click that follows a swipe drag.
        frame.addEventListener('click', (e) => {
          if (isSwipe) {
            e.preventDefault();
            isSwipe = false;
          }
        });

        // Keyboard support when the frame is focused.
        frame.addEventListener('keydown', (e) => {
          if (e.key === 'ArrowLeft') {
            e.preventDefault();
            goTo(current - 1);
          } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            goTo(current + 1);
          }
        });
      }

      grid.appendChild(card);
    });
  }
  
  console.log(`Shuffle projects: ${SHUFFLE_PROJECTS}`);
  render(SHUFFLE_PROJECTS ? shuffle(PROJECTS) : PROJECTS);
})();
