
(()=>{
  const app=(document.body.dataset.app||'login').toLowerCase();
  const go=name=>{ location.href=name==='home'?'home.html':name==='contacts'?'contacts.html':name==='map'?'map.html':name==='bio'?'bio-database.html':name==='scan'?'scan.html':'index.html'; };
  const addHomeButton=()=>{if(app==='home'||app==='login')return;const b=document.createElement('button');b.className='app-home-return';b.type='button';b.textContent='⌂ RETURN HOME';b.onclick=()=>go('home');document.body.appendChild(b)};
  const readyApp=()=>{
    document.body.classList.add('holo-ready','app-page');
    document.body.classList.remove('loading','page-home','page-contacts');
    document.querySelectorAll('#holoLogin,#holoLoader,.startup-overlay').forEach(el=>el.remove());
    if(app==='home') document.body.classList.add('page-home');
    else if(app==='contacts') document.body.classList.add('page-contacts');
    else document.body.classList.add('page-home');
    addHomeButton();
    setTimeout(()=>{
      if(app==='map') window.openRealmMap?.();
      if(app==='bio') window.openBiologicalDatabase?.();
      if(app==='scan') initScan();
    },120);
  };
  const initScan=()=>{
    const start=document.getElementById('dedicatedScanStart'),fill=document.getElementById('dedicatedScanFill'),text=document.getElementById('dedicatedScanText');
    if(!start)return;
    start.onclick=()=>{start.disabled=true;start.textContent='SCANNING...';fill.style.width='0%';requestAnimationFrame(()=>fill.style.width='100%');document.body.classList.add('scan-active');window.holoRingAudio?.refreshAmbience?.();setTimeout(()=>{text.textContent='SCAN COMPLETE // ENERGY SIGNATURE STABLE // ARCHIVE MATCH CONFIRMED';start.textContent='SCAN AGAIN';start.disabled=false;document.body.classList.remove('scan-active');window.holoRingAudio?.refreshAmbience?.();},1800)};
  };
  document.addEventListener('DOMContentLoaded',()=>{
    document.getElementById('homeOpenContacts')?.addEventListener('click',e=>{e.stopImmediatePropagation();go('contacts')},true);
    document.getElementById('homeContactsShortcut')?.addEventListener('click',e=>{e.stopImmediatePropagation();go('contacts')},true);
    document.getElementById('homeOpenMap')?.addEventListener('click',e=>{e.stopImmediatePropagation();go('map')},true);
    document.getElementById('homeOpenBio')?.addEventListener('click',e=>{e.stopImmediatePropagation();go('bio')},true);
    document.getElementById('homeOpenScan')?.addEventListener('click',e=>{e.stopImmediatePropagation();go('scan')},true);
    document.querySelectorAll('[data-home-realm]').forEach(b=>b.addEventListener('click',e=>{e.stopImmediatePropagation();sessionStorage.setItem('holoRealm',b.dataset.homeRealm||'');go('map')},true));
    if(app!=='login') readyApp();
    else {
      const obs=new MutationObserver(()=>{if(document.body.classList.contains('holo-ready')){sessionStorage.setItem('holoAuthenticated','1');setTimeout(()=>go('home'),250)}});
      obs.observe(document.body,{attributes:true,attributeFilter:['class']});
    }
  });
})();
