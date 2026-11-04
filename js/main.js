// Kasa & Kin — site JS
document.addEventListener('DOMContentLoaded', function () {
  var t = document.querySelector('.nav-toggle');
  var n = document.querySelector('.nav');
  var label = t ? t.querySelector('.nav-toggle-label') : null;
  function setOpen(open) {
    n.classList.toggle('open', open);
    t.setAttribute('aria-expanded', open ? 'true' : 'false');
    t.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    if (label) label.textContent = open ? 'Close' : 'Menu';
  }
  if (t && n) {
    t.addEventListener('click', function () { setOpen(!n.classList.contains('open')); });
    n.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { setOpen(false); }); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && n.classList.contains('open')) { setOpen(false); t.focus(); } });
    document.addEventListener('click', function (e) { if (n.classList.contains('open') && !n.contains(e.target) && !t.contains(e.target)) setOpen(false); });
  }
  // videos: autoplay muted inline; pause when off screen to save battery
  var vids = Array.prototype.slice.call(document.querySelectorAll('video'));
  function tryPlay(v) {
    v.muted = true; v.defaultMuted = true; v.playsInline = true;
    v.setAttribute('muted', ''); v.setAttribute('playsinline', ''); v.setAttribute('webkit-playsinline', '');
    var p = v.play(); if (p && p.catch) p.catch(function () {});
  }
  function visible(v) { return v.offsetParent !== null || getComputedStyle(v).position === 'fixed'; }
  vids.forEach(function (v) { if (visible(v)) tryPlay(v); });
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) tryPlay(e.target); else e.target.pause(); });
    }, { threshold: 0.1 });
    vids.forEach(function (v) { io.observe(v); });
  }
  // some phones only allow playback after the first interaction
  function kick() {
    vids.forEach(function (v) { if (v.paused && visible(v)) tryPlay(v); });
    ['touchstart', 'scroll', 'click'].forEach(function (ev) { window.removeEventListener(ev, kick); });
  }
  ['touchstart', 'scroll', 'click'].forEach(function (ev) { window.addEventListener(ev, kick, { passive: true }); });
  // smart sticky header
  var shell = document.querySelector('.topbar-shell');
  if (shell) {
    var root = document.documentElement, lastY = window.scrollY, ticking = false;
    function measure() { root.style.setProperty('--tb-h', shell.offsetHeight + 'px'); }
    measure(); window.addEventListener('resize', measure);
    function update() {
      var y = window.scrollY, menuOpen = n && n.classList.contains('open');
      shell.classList.toggle('scrolled', y > 10);
      var mobile = window.matchMedia('(max-width:1040px)').matches;
      if (mobile || menuOpen || y < shell.offsetHeight + 40) shell.classList.remove('tb-hide');
      else if (y > lastY + 4) shell.classList.add('tb-hide');
      else if (y < lastY - 4) shell.classList.remove('tb-hide');
      lastY = y; ticking = false;
    }
    window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    update();
  }
  // Kasa Klub slide-in: after 12s or 40% scroll, once per visit; 'later' hides it for 7 days
  var pop = document.getElementById('kk-pop');
  if (pop) {
    var KEY = 'kk-pop-snooze', shown = false, store = null;
    try { store = window.localStorage; } catch (e) {}
    var snoozed = false;
    try { snoozed = store && Number(store.getItem(KEY) || 0) > Date.now(); } catch (e) {}
    try { if (sessionStorage.getItem('kk-pop-seen')) snoozed = true; } catch (e) {}
    function openPop() {
      if (shown || snoozed || (n && n.classList.contains('open'))) return;
      shown = true; pop.hidden = false;
      requestAnimationFrame(function () { pop.classList.add('show'); });
      try { sessionStorage.setItem('kk-pop-seen', '1'); } catch (e) {}
    }
    function closePop(days) {
      pop.classList.remove('show');
      setTimeout(function () { pop.hidden = true; }, 600);
      try { if (store) store.setItem(KEY, String(Date.now() + days * 864e5)); } catch (e) {}
    }
    if (!snoozed) {
      setTimeout(openPop, 12000);
      window.addEventListener('scroll', function onS() {
        var h = document.documentElement.scrollHeight - innerHeight;
        if (h > 0 && scrollY / h > 0.4) { openPop(); window.removeEventListener('scroll', onS); }
      }, { passive: true });
    }
    pop.querySelector('.kk-pop-x').addEventListener('click', function () { closePop(7); });
    pop.querySelector('.kk-pop-later').addEventListener('click', function () { closePop(7); });
    pop.querySelector('.kk-pop-cta').addEventListener('click', function () { closePop(60); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && pop.classList.contains('show')) closePop(7); });
  }
  var here = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav a').forEach(function (a) {
    if (a.getAttribute('href') === here) a.classList.add('on');
  });
});
