/* SWUT shared reveal engine — curtain reveals, text offsets, SVG line drawing.

   Design rules (learned the hard way):
   - Nothing is ever hidden until the animation clock is proven alive (two rAF
     ticks). If the host freezes rAF/timers, content simply renders visible.
   - Every sweep self-heals: any element we already revealed whose *computed*
     style is still the hidden value (interrupted transition, re-rendered node,
     paused clock) is snapped to its final state with the transition removed.
   - The script may be re-executed in a fresh context by the host, so each
     instance tears down the previous one and re-attaches to existing nodes
     without re-hiding them. */
(function () {
  if (window.__swutRevealStop) { try { window.__swutRevealStop(); } catch (e) {} }

  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var alive = false;
  var seen = ('WeakSet' in window) ? new WeakSet() : null;

  function delayOf(el) { return Number(el.getAttribute('data-reveal-delay') || 0); }
  function kindOf(el) { return el.getAttribute('data-reveal'); }

  function prep(el) {
    var kind = kindOf(el);
    var d = delayOf(el);
    if (kind === 'fade') {
      el.style.opacity = '0';
      el.style.transform = 'translateY(22px)';
      el.style.transition = 'opacity .7s ease ' + d + 'ms, transform .7s cubic-bezier(.22,1,.36,1) ' + d + 'ms';
    } else if (kind === 'mask') {
      var c = el.firstElementChild;
      if (c) { c.style.transform = 'translateY(110%)'; c.style.transition = 'transform .8s cubic-bezier(.22,1,.36,1) ' + d + 'ms'; }
    } else if (kind === 'curtain-up') {
      el.style.clipPath = 'inset(0 0 100% 0)';
      el.style.transition = 'clip-path 1.1s cubic-bezier(.76,0,.24,1) ' + d + 'ms';
    } else if (kind === 'curtain-left') {
      el.style.clipPath = 'inset(0 100% 0 0)';
      el.style.transition = 'clip-path .95s cubic-bezier(.76,0,.24,1) ' + d + 'ms';
    } else if (kind === 'curtain-right') {
      el.style.clipPath = 'inset(0 0 0 100%)';
      el.style.transition = 'clip-path .95s cubic-bezier(.76,0,.24,1) ' + d + 'ms';
    } else if (kind === 'draw') {
      var strokes = el.querySelectorAll('path,line,polyline,circle,rect,ellipse');
      for (var i = 0; i < strokes.length; i++) {
        var p = strokes[i], len = 0;
        try { len = p.getTotalLength ? p.getTotalLength() : 0; } catch (e) { len = 0; }
        if (!len) continue;
        var st = d + Math.min(i * 55, 1300);
        p.style.strokeDasharray = len;
        p.style.strokeDashoffset = len;
        p.style.transition = 'stroke-dashoffset 1.1s cubic-bezier(.65,0,.35,1) ' + st + 'ms';
      }
    }
  }

  /* Sets the revealed state. hard === true removes transitions and snaps. */
  function show(el, hard) {
    var kind = kindOf(el);
    el.__swutShown = true;
    if (kind === 'fade') {
      if (hard) el.style.transition = '';
      el.style.opacity = '1';
      el.style.transform = 'none';
    } else if (kind === 'mask') {
      var c = el.firstElementChild;
      if (c) { if (hard) c.style.transition = ''; c.style.transform = 'none'; }
    } else if (kind === 'curtain-up' || kind === 'curtain-left' || kind === 'curtain-right') {
      if (hard) { el.style.transition = ''; el.style.clipPath = 'none'; }
      else el.style.clipPath = 'inset(0 0 0 0)';
    } else if (kind === 'draw') {
      var strokes = el.querySelectorAll('path,line,polyline,circle,rect,ellipse');
      for (var i = 0; i < strokes.length; i++) {
        if (hard) { strokes[i].style.transition = ''; strokes[i].style.strokeDasharray = 'none'; }
        strokes[i].style.strokeDashoffset = '0';
      }
    }
  }

  /* True when the element is visibly NOT in its revealed state. */
  function stuck(el) {
    var kind = kindOf(el);
    var cs;
    if (kind === 'fade') { cs = getComputedStyle(el); return cs.opacity !== '1'; }
    if (kind === 'mask') {
      var c = el.firstElementChild;
      if (!c) return false;
      var t = getComputedStyle(c).transform;
      return t !== 'none' && t !== 'matrix(1, 0, 0, 1, 0, 0)';
    }
    if (kind === 'curtain-up' || kind === 'curtain-left' || kind === 'curtain-right') {
      cs = getComputedStyle(el).clipPath;
      return cs !== 'none' && cs.indexOf('100%') !== -1;
    }
    return false;
  }

  function inView(el) {
    var r = el.getBoundingClientRect();
    if (!r.width && !r.height) return false;
    return r.top < window.innerHeight + 80 && r.bottom > -80;
  }

  var t0 = Date.now();

  function sweep() {
    var nodes = document.querySelectorAll('[data-reveal]');
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      var known = seen && seen.has(el);
      if (!known) {
        if (seen) seen.add(el);
        // Hide off-screen content always; hide on-screen content only during
        // the page's entrance window, so late or frozen states can't stick.
        if (alive && !reduced && !el.__swutPrepped && (!inView(el) || Date.now() - t0 < 1500)) { el.__swutPrepped = true; prep(el); }
      }
      if (inView(el)) {
        if (!el.__swutShown) show(el, false);
        else if (stuck(el)) show(el, true);
      }
    }
  }

  function safeSweep() { try { sweep(); } catch (e) {} }

  window.SWUTReveal = {
    sweep: safeSweep,
    revealAll: function () {
      var nodes = document.querySelectorAll('[data-reveal]');
      for (var i = 0; i < nodes.length; i++) show(nodes[i], true);
    }
  };

  window.addEventListener('scroll', safeSweep, { passive: true });
  document.addEventListener('scroll', safeSweep, { passive: true, capture: true });
  window.addEventListener('resize', safeSweep);

  var iv = setInterval(safeSweep, 300);
  var mo = ('MutationObserver' in window) ? new MutationObserver(safeSweep) : null;
  if (mo) mo.observe(document.documentElement, { childList: true, subtree: true });

  window.__swutRevealStop = function () {
    clearInterval(iv);
    if (mo) mo.disconnect();
    window.removeEventListener('scroll', safeSweep);
    document.removeEventListener('scroll', safeSweep, true);
    window.removeEventListener('resize', safeSweep);
  };

  var ticks = 0;
  (function tick() {
    ticks++;
    if (ticks >= 2) alive = true;
    safeSweep();
    if (ticks < 60) requestAnimationFrame(tick);
  })();
  safeSweep();
})();
