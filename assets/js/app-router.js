(() => {
  'use strict';

  const entry = document.body.dataset.entry || 'login';
  const routes = {
    HOME: 'home.html',
    CONTACTS: 'contacts.html',
    MAP: 'map.html',
    BIOLOGY: 'bio-database.html',
    SCAN: 'scan.html'
  };

  const shortcutRoutes = {
    homePageButton: routes.HOME,
    contactsPageButton: routes.CONTACTS,
    homeOpenContacts: routes.CONTACTS,
    homeContactsShortcut: routes.CONTACTS,
    homeOpenMap: routes.MAP,
    homeOpenBio: routes.BIOLOGY,
    homeOpenScan: routes.SCAN,
    bioDatabaseButton: routes.BIOLOGY
  };

  function currentFile() {
    return location.pathname.split('/').pop() || 'index.html';
  }

  function navigate(route) {
    if (!route || currentFile() === route) return false;
    location.assign(route);
    return true;
  }

  function removeStartupScreens() {
    ['holoLogin', 'welcomeOverlay', 'statusOverlay', 'holoLoader'].forEach(id => {
      document.getElementById(id)?.remove();
    });
    document.documentElement.classList.add('app-direct-entry');
  }

  function addHomeReturnControl() {
    if (entry === 'login' || entry === 'home' || document.getElementById('appHomeReturn')) return;
    const button = document.createElement('button');
    button.id = 'appHomeReturn';
    button.className = 'app-home-return';
    button.type = 'button';
    button.setAttribute('aria-label', 'Return to Holo Ring Home');
    button.innerHTML = '<span class="app-home-return-icon">⌂</span><span>HOME</span>';
    document.body.appendChild(button);
  }

  function activateEntry() {
    if (entry === 'login') return;
    removeStartupScreens();
    addHomeReturnControl();

    requestAnimationFrame(() => requestAnimationFrame(() => {
      if (entry === 'home' && typeof window.openHoloHome === 'function') window.openHoloHome();
      if (entry === 'contacts' && typeof window.openHoloContacts === 'function') window.openHoloContacts();
      if (entry === 'map') document.querySelector('.tool[data-action="MAP"]')?.click();
      if (entry === 'bio') document.getElementById('bioDatabaseButton')?.click();
      if (entry === 'scan') document.querySelector('.tool[data-action="SCAN"]')?.click();
    }));
  }

  // Capture navigation before the original single-page handlers open an overlay.
  document.addEventListener('click', event => {
    const control = event.target.closest('button, a');
    if (!control) return;

    let route = shortcutRoutes[control.id];
    if (control.id === 'appHomeReturn') route = routes.HOME;
    if (!route && entry !== 'home' && control.matches('#mapClose, #bioClose, .scan-close, #scanClose')) route = routes.HOME;

    if (!route && control.matches('.toolbar .tool[data-action]')) {
      route = routes[control.dataset.action];
    }

    if (!route || currentFile() === route) return;

    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    navigate(route);
  }, true);

  window.addEventListener('DOMContentLoaded', activateEntry, { once: true });
})();
