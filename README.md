# Holo Ring Multi-File Project

Open `index.html` first. It contains the original login and authenticated startup sequence, then opens `home.html`.

## Applications
- `home.html` — dedicated launcher
- `contacts.html` — Contacts
- `map.html` — Realm Map
- `bio-database.html` — Biological Database
- `scan.html` — Scanner

## Shared assets
- `assets/css/holo-ring.css` — all original CSS blocks, kept in source order
- `assets/js/holo-ring.js` — all original JavaScript blocks, kept in source order
- `assets/css/multifile.css` — page routing/layout additions
- `assets/js/multifile-router.js` — cross-page navigation and startup routing

The app launcher appears only on Home. Individual applications contain one Return Home control instead of duplicating every app button. For best results, run through a local web server or GitHub Pages rather than opening with restrictive `file://` browser security.
