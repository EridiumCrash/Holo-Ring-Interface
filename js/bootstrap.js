(async function () {
  async function includeTemplates(root = document) {
    const templates = Array.from(root.querySelectorAll('template[data-include]'));
    for (const template of templates) {
      const url = template.dataset.include;
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Unable to load ${url}: ${response.status}`);
      const html = await response.text();
      const fragment = document.createRange().createContextualFragment(html);
      template.replaceWith(fragment);
    }
  }

  try {
    await includeTemplates();
    await includeTemplates();
    const app = document.createElement('script');
    app.src = 'js/app.js';
    app.defer = false;
    document.body.appendChild(app);
  } catch (error) {
    console.error(error);
    document.body.innerHTML = `<main style="padding:2rem;color:white;background:#020711;min-height:100vh;font-family:Arial,sans-serif"><h1>Holo Ring failed to load</h1><p>${error.message}</p><p>Run this project through GitHub Pages or another local web server. Browser security blocks page includes when index.html is opened directly as a file.</p></main>`;
  }
})();
