/* Pauses hero illustrations when offscreen or when the tab is hidden. */
(function () {
  if (window.__swutHeroMotion) return;
  window.__swutHeroMotion = true;

  var io = null, queued = false;

  function sync(el) {
    var run = el.__swutVisible !== false && !document.hidden;
    el.setAttribute('data-hero-anim', run ? 'running' : 'paused');
  }

  function attach() {
    queued = false;
    var nodes = document.querySelectorAll('[data-hero-anim]');
    if (!nodes.length) return;
    if (!io && 'IntersectionObserver' in window) {
      io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { e.target.__swutVisible = e.isIntersecting; sync(e.target); });
      }, { threshold: 0.02 });
    }
    for (var i = 0; i < nodes.length; i++) {
      var n = nodes[i];
      if (n.__swutObserved) continue;
      n.__swutObserved = true;
      if (io) io.observe(n); else sync(n);
    }
  }

  document.addEventListener('visibilitychange', function () {
    var nodes = document.querySelectorAll('[data-hero-anim]');
    for (var i = 0; i < nodes.length; i++) sync(nodes[i]);
  });

  attach();
  new MutationObserver(function () {
    if (queued) return;
    queued = true;
    requestAnimationFrame(attach);
  }).observe(document.documentElement, { childList: true, subtree: true });
})();
