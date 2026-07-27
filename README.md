# Holo Ring Multi-File Project

This project was split from the original single HTML document without changing the IDs used by its JavaScript.

## Files
- `index.html` — entry point and template loader
- `pages/login-startup.html` — login, welcome, status, and boot overlays
- `pages/home.html` — home dashboard
- `pages/contacts-sidebar.html` — contact roster
- `pages/contacts-profile.html` — selected contact profile
- `pages/biological-database.html` — biological database
- `pages/realm-navigator.html` — realm map, dossier, and realm subpages
- `pages/messages.html` — messaging center
- `pages/shell.html` — shared top bar, viewport, toolbar, and page insertion points
- `css/styles.css` — all shared CSS, retained in original order
- `js/app.js` — all original application JavaScript, retained in original order
- `js/bootstrap.js` — loads page fragments before starting the application

## Important
Because the pages are loaded with `fetch()`, open this through GitHub Pages, Netlify, Cloudflare Pages, or a local server. Do not double-click `index.html` and run it with a `file:///` URL.

A simple local test command is:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.
