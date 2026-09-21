(function () {
  if (window.__pageTransitionInit) return;
  window.__pageTransitionInit = true;

  var KEY = '__pt_reveal';
  var CURTAIN_ID = '__page-curtain';
  var DUR_OUT = 420, DUR_IN = 520;
  var CURTAIN_BG = '#0a0a0a';

  var navTimer = null;     // queued navigation of the outgoing transition
  var revealTimer = null;  // queued removal of the incoming curtain
  var leaving = false;     // an outgoing transition already owns this page

  // sessionStorage throws in some privacy modes — the transition is decoration,
  // so every access degrades to "no flag" rather than breaking navigation.
  function flagGet() { try { return sessionStorage.getItem(KEY); } catch (e) { return null; } }
  function flagSet() { try { sessionStorage.setItem(KEY, '1'); } catch (e) {} }
  function flagClear() { try { sessionStorage.removeItem(KEY); } catch (e) {} }

  function reducedMotion() {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function makeCurtain() {
    var el = document.createElement('div');
    el.id = CURTAIN_ID;
    el.style.cssText = 'position:fixed;inset:0;z-index:2147483647;background:' + CURTAIN_BG + ';pointer-events:none;will-change:transform;';
    // appended to <html>, outside any framework-managed root, so it survives
    // untouched by React mount/unmount on both the outgoing and incoming page
    document.documentElement.appendChild(el);
    return el;
  }

  // Removes every curtain, not just the one this script is animating: a page
  // restored from the back/forward cache carries the cover it was frozen with,
  // and that instance belongs to no live timer here.
  function removeCurtains() {
    var nodes = document.querySelectorAll('#' + CURTAIN_ID);
    for (var i = 0; i < nodes.length; i++) {
      if (nodes[i].parentNode) nodes[i].parentNode.removeChild(nodes[i]);
    }
  }

  function clearTimers() {
    if (navTimer) { clearTimeout(navTimer); navTimer = null; }
    if (revealTimer) { clearTimeout(revealTimer); revealTimer = null; }
  }

  // Drop an interrupted transition: the user took over with Back/Forward, so the
  // queued navigation must not run and no cover may outlive it.
  function abandonTransition() {
    clearTimers();
    leaving = false;
    flagClear();
    removeCurtains();
  }

  // ---- INCOMING: this load follows an internal nav — curtain must already
  // be covering at first paint (no gap, no flash), then slides away.
  if (flagGet()) {
    flagClear();
    if (!reducedMotion()) {
      var incoming = makeCurtain();
      incoming.style.transform = 'translateY(0)';
      requestAnimationFrame(function () {
        incoming.style.transition = 'transform ' + DUR_IN + 'ms cubic-bezier(0.65,0,0.35,1)';
        requestAnimationFrame(function () { incoming.style.transform = 'translateY(-100%)'; });
      });
      // rAF is throttled in a hidden tab, so this timer — not the animation —
      // is what guarantees the cover always leaves.
      revealTimer = setTimeout(function () { revealTimer = null; removeCurtains(); }, DUR_IN + 60);
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
    // A transition is already running: a second one would stack another cover
    // and another queued navigation racing the first.
    if (leaving) return;
    if (reducedMotion()) { window.location.href = url.href; return; }

    leaving = true;
    flagSet();
    var outgoing = makeCurtain();
    outgoing.style.transform = 'translateY(100%)';
    requestAnimationFrame(function () {
      outgoing.style.transition = 'transform ' + DUR_OUT + 'ms cubic-bezier(0.65,0,0.35,1)';
      requestAnimationFrame(function () { outgoing.style.transform = 'translateY(0)'; });
    });
    // navigate once the cover finishes rising — this is the transition
    // itself completing, not a stall; the destination then reveals under
    // its own curtain instance above.
    navTimer = setTimeout(function () { navTimer = null; window.location.href = url.href; }, DUR_OUT);
  }, true);

  // ---- HISTORY NAVIGATION ----
  // Same-document history moves (the in-page hash links). Back here must not be
  // undone by a navigation still queued from a click a moment earlier.
  window.addEventListener('popstate', abandonTransition);

  window.addEventListener('pagehide', function (e) {
    // Timers are paused, not dropped, when a page is frozen: without this a
    // queued navigation would fire on restore and bounce the reader forward.
    clearTimers();
    leaving = false;
    // Leaving with the cover down is what made a restored page render black —
    // the frozen snapshot kept the opaque overlay. Drop it before the freeze;
    // on a real unload it stays so the transition looks unbroken.
    if (e.persisted) removeCurtains();
  });

  window.addEventListener('pageshow', function (e) {
    if (!e.persisted) return;
    // Restored from the back/forward cache: no script re-runs, so anything the
    // interrupted navigation left behind has to be undone here instead.
    abandonTransition();
    unlockScroll();
    revealOnScreen();
  });

  // The menu locks page scrolling while it is open. A restore that lands with
  // the menu closed must not keep the lock its navigation left behind.
  function unlockScroll() {
    var menu = document.querySelector('[data-menu-open]');
    var open = menu && menu.getAttribute('data-menu-open') === 'true';
    if (!open && document.body.style.overflow === 'hidden') document.body.style.overflow = '';
  }

  // Reveal-on-scroll elements sit hidden until their animation runs. Anything
  // already on screen after a restore is shown immediately, so a state frozen
  // mid-animation cannot leave the view blank.
  function revealOnScreen() {
    // The shared reveal engine knows every reveal kind and heals its own
    // stuck elements; the opacity pass below only covers pages without it.
    if (window.SWUTReveal && typeof window.SWUTReveal.sweep === 'function') {
      try { window.SWUTReveal.sweep(); } catch (e) {}
    }
    var els = document.querySelectorAll('[data-reveal]');
    var vh = window.innerHeight || document.documentElement.clientHeight || 0;
    for (var i = 0; i < els.length; i++) {
      var el = els[i];
      var r = el.getBoundingClientRect();
      if (r.bottom <= 0 || r.top >= vh) continue;
      if (parseFloat(window.getComputedStyle(el).opacity) !== 0) continue;
      el.style.opacity = '1';
      el.style.transform = 'none';
    }
  }
})();
