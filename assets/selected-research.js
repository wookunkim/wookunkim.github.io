(() => {
  const target = document.getElementById('selected-research-list');
  if (!target) return;

  const text = el => el ? el.textContent.trim() : '';

  function makeCard(article, kind) {
    const id = article.id;
    const title = text(article.querySelector('h3'));
    const coauthors = article.querySelector('.paper-coauthors');
    const description = article.querySelector('.paper-description');
    const meta = article.querySelector('.paper-meta');
    const venue = meta ? meta.querySelector('.venue') : null;
    const date = meta ? meta.querySelector('.date') : null;
    const status = meta ? (meta.querySelector('.status') || meta.querySelector('.rr')) : null;
    const firstResource = article.querySelector('.paper-links a');

    const card = document.createElement('article');
    card.className = 'featured-paper';
    card.id = 'featured-' + id;

    const stamp = document.createElement('div');
    stamp.className = 'paper-stamp';

    const type = document.createElement('span');
    type.className = 'stamp-type';
    if (kind === 'publication') type.textContent = 'Publication';
    else type.textContent = 'Working paper';

    stamp.appendChild(type);
    const detail = kind === 'publication' ? (text(status) || text(date)) : text(date);
    stamp.appendChild(document.createTextNode(detail));

    const body = document.createElement('div');
    const h3 = document.createElement('h3');
    const titleLink = document.createElement('a');
    titleLink.href = 'research/index.html#' + id;
    titleLink.textContent = title;
    h3.appendChild(titleLink);
    body.appendChild(h3);

    if (coauthors) body.appendChild(coauthors.cloneNode(true));
    if (venue) {
      const v = document.createElement('p');
      v.className = 'venue';
      v.textContent = text(venue);
      body.appendChild(v);
    }
    if (description) body.appendChild(description.cloneNode(true));

    const links = document.createElement('div');
    links.className = 'paper-links';
    links.setAttribute('aria-label','Paper resources');

    if (firstResource) {
      const resource = firstResource.cloneNode(true);
      if (/^https?:/.test(resource.href)) {
        resource.target = '_blank';
        resource.rel = 'noopener noreferrer';
      }
      links.appendChild(resource);
    }

    const details = document.createElement('a');
    details.href = 'research/index.html#' + id;
    details.innerHTML = 'Details <span aria-hidden="true">→</span>';
    links.appendChild(details);

    body.appendChild(links);
    card.appendChild(stamp);
    card.appendChild(body);
    return card;
  }

  fetch('research/index.html', {cache: 'no-store'})
    .then(response => {
      if (!response.ok) throw new Error('Could not load research page');
      return response.text();
    })
    .then(html => {
      const doc = new DOMParser().parseFromString(html, 'text/html');
      const working = [...doc.querySelectorAll('#working-papers > article.paper')].slice(0, 2);
      const publications = [...doc.querySelectorAll('#publications > article.paper')].slice(0, 3);
      const selected = [
        ...working.map(p => makeCard(p, 'working')),
        ...publications.map(p => makeCard(p, 'publication'))
      ];
      if (selected.length === 5) target.replaceChildren(...selected);
    })
    .catch(() => {
      // Keep the static fallback already present in index.html.
    });
})();
