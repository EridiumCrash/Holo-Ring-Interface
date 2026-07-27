
(() => {
  'use strict';
  const app = document.body.dataset.app || 'login';
  const go = name => { location.href = name === 'login' ? 'index.html' : `${name}.html`; };
  const bind = (selector, target) => document.querySelectorAll(selector).forEach(el => {
    el.addEventListener('click', ev => { ev.preventDefault(); ev.stopImmediatePropagation(); go(target); }, true);
  });

  // Existing controls from this exact source file.
  bind('#homeOpenContacts,#homeContactsShortcut,#contactsPageButton', 'contacts');
  bind('#homeOpenMap,[data-open-map],#mapPageButton', 'map');
  bind('#homeOpenBio,#bioDatabaseButton', 'bio-database');
  bind('#scanPageButton,[data-open-scan],#homeOpenScan', 'scan');
  bind('#homePageButton', 'home');

  if (app !== 'login') {
    document.body.classList.add('holo-ready');
    document.body.classList.remove('loading');
    const login = document.getElementById('holoLogin'); if (login) login.remove();
    const loader = document.getElementById('holoLoader'); if (loader) loader.remove();
    if (app === 'home') {
      document.body.classList.add('page-home'); document.body.classList.remove('page-contacts');
    } else if (app === 'contacts') {
      document.body.classList.add('page-contacts'); document.body.classList.remove('page-home');
    }
    const b=document.createElement('button'); b.className='multifile-home-button'; b.textContent='⌂ RETURN HOME';
    b.addEventListener('click',()=>go('home')); document.body.appendChild(b);

    // Activate only the app that belongs to this page using current-source elements.
    setTimeout(() => {
      if (app === 'map') document.getElementById('realmMap')?.classList.add('open');
      if (app === 'bio-database') {
        const bio=document.getElementById('biologicalDatabase');
        if (bio) { bio.classList.add('open'); bio.style.display='block'; }
      }
      if (app === 'scan') {
        const candidates=['scanOverlay','scanner','scanApp','scanPanel'].map(id=>document.getElementById(id)).filter(Boolean);
        candidates.forEach(el=>{el.classList.add('open');el.style.display='block';});
      }
    }, 50);
  } else {
    // Redirect only after the original login has completed and the interface becomes ready.
    const observer = new MutationObserver(() => {
      if (document.body.classList.contains('holo-ready') || document.getElementById('holoLogin')?.classList.contains('unlocked')) {
        setTimeout(() => go('home'), 250);
      }
    });
    observer.observe(document.body,{attributes:true,subtree:true,attributeFilter:['class']});
  }
})();
