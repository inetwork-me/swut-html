(function () {
  if (window.__pageTransitionInit) return;
  window.__pageTransitionInit = true;

  var KEY = '__pt_reveal';
  var DUR_OUT = 420, DUR_IN = 520;
  var CURTAIN_BG = '#0a0a0a';

  function reducedMotion() {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function makeCurtain() {
    var el = document.createElement('div');
    el.id = '__page-curtain';
    el.style.cssText = 'position:fixed;inset:0;z-index:2147483647;background:' + CURTAIN_BG + ';pointer-events:none;will-change:transform;';
    // appended to <html>, outside any framework-managed root, so it survives
    // untouched by React mount/unmount on both the outgoing and incoming page
    document.documentElement.appendChild(el);
    return el;
  }

  // ---- INCOMING: this load follows an internal nav — curtain must already
  // be covering at first paint (no gap, no flash), then slides away.
  if (sessionStorage.getItem(KEY)) {
    sessionStorage.removeItem(KEY);
    if (!reducedMotion()) {
      var incoming = makeCurtain();
      incoming.style.transform = 'translateY(0)';
      requestAnimationFrame(function () {
        incoming.style.transition = 'transform ' + DUR_IN + 'ms cubic-bezier(0.65,0,0.35,1)';
        requestAnimationFrame(function () { incoming.style.transform = 'translateY(-100%)'; });
      });
      setTimeout(function () { incoming.remove(); }, DUR_IN + 60);
    }
  }

  // ---- OUTGOING: intercept qualifying same-origin link clicks site-wide.
  document.addEventListener('click', function (e) {
    if (e.defaultPrevented || e.button !== 0) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    var a = e.target.closest ? e.target.closest('a[href]') : null;
    if (!a) return;
    var href = a.getAttribute('href');
    if (!href || href.charAt(0) === '#') return;
    if (a.target && a.target !== '' && a.target !== '_self') return;
    if (a.hasAttribute('download') || a.getAttribute('rel') === 'external') return;
    var url;
    try { url = new URL(href, window.location.href); } catch (err) { return; }
    if (url.origin !== window.location.origin) return;
    if (url.href.split('#')[0] === window.location.href.split('#')[0]) return;

    e.preventDefault();
    if (reducedMotion()) { window.location.href = url.href; return; }

    sessionStorage.setItem(KEY, '1');
    var outgoing = makeCurtain();
    outgoing.style.transform = 'translateY(100%)';
    requestAnimationFrame(function () {
      outgoing.style.transition = 'transform ' + DUR_OUT + 'ms cubic-bezier(0.65,0,0.35,1)';
      requestAnimationFrame(function () { outgoing.style.transform = 'translateY(0)'; });
    });
    // navigate once the cover finishes rising — this is the transition
    // itself completing, not a stall; the destination then reveals under
    // its own curtain instance above.
    setTimeout(function () { window.location.href = url.href; }, DUR_OUT);
  }, true);
})();
