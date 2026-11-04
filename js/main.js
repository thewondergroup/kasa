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
  // play videos only while on screen
  var vids = document.querySelectorAll('.ph-media video');
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduce && vids.length) {
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          var v = e.target;
          if (e.isIntersecting) { v.preload = 'auto'; var p = v.play(); if (p && p.catch) p.catch(function(){}); }
          else { v.pause(); }
        });
      }, { threshold: 0.25 });
      vids.forEach(function (v) { io.observe(v); });
    } else {
      vids.forEach(function (v) { v.preload = 'auto'; v.play(); });
    }
  }
  var here = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav a').forEach(function (a) {
    if (a.getAttribute('href') === here) a.classList.add('on');
  });
});
