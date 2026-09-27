/* Single source of truth for the product selector used by every SWUT form. */
(function () {
  var MIDAS = ['MIDAS GEN', 'MIDAS CIVIL NX', 'MIDAS GTS NX'];
  // Bentley products SWUT supplies — names as published on bentley.com.
  var BENTLEY = ['STAAD.Pro', 'PLAXIS 2D', 'OpenRoads Designer'];

  function options(o) {
    o = o || {};
    var list = [];
    if (o.general) list.push({ name: 'General enquiry' });
    if (o.notApplicable) list.push({ name: 'Not sure / Not applicable' });
    list.push({ name: 'IDEA StatiCa' });
    list.push({ name: 'ZWCAD' });
    list.push({ group: 'MIDAS' });
    MIDAS.forEach(function (n) { list.push({ name: n, nested: true }); });
    list.push({ group: 'Bentley' });
    BENTLEY.forEach(function (n) { list.push({ name: n, nested: true }); });
    if (o.notSure) list.push({ name: 'Not sure / Other' });
    return list;
  }

  function names(o) { return options(o).filter(function (i) { return i.name; }).map(function (i) { return i.name; }); }

  // Rows for the custom listbox: group headings are not selectable.
  // The first product under each heading has no top rule, so the 1px divider
  // is never doubled beneath a heading.
  function rows(o, current, pick) {
    var firstInGroup = false;
    return options(o).map(function (it, i) {
      if (it.group) {
        firstInGroup = true;
        return { name: it.group, isGroup: true, isNested: false, isNestedFirst: false, isPlain: false, isPlainFirst: false, checked: false, select: function () {} };
      }
      var base = { name: it.name, isGroup: false, checked: current === it.name, select: function () { pick(it.name); } };
      if (it.nested) {
        var first = firstInGroup;
        firstInGroup = false;
        return Object.assign(base, { isNested: !first, isNestedFirst: first, isPlain: false, isPlainFirst: false });
      }
      return Object.assign(base, { isNested: false, isNestedFirst: false, isPlain: i !== 0, isPlainFirst: i === 0 });
    });
  }

  // Legacy saved/linked values that name a brand only must not resolve to a product.
  function isBrandOnlyMidas(v) { return typeof v === 'string' && /^midas$/i.test(v.trim()); }
  function isBrandOnlyBentley(v) { return typeof v === 'string' && /^bentley$/i.test(v.trim()); }

  function match(raw, o) {
    if (!raw) return '';
    var key = String(raw).toLowerCase().replace(/[\s-]+/g, '');
    var hit = names(o).find(function (n) { return n.toLowerCase().replace(/\s+/g, '') === key; });
    return hit || '';
  }

  window.SWUTProductOptions = { MIDAS: MIDAS, BENTLEY: BENTLEY, options: options, names: names, rows: rows, match: match, isBrandOnlyMidas: isBrandOnlyMidas, isBrandOnlyBentley: isBrandOnlyBentley };
  try { window.dispatchEvent(new Event('swut-products-ready')); } catch (e) {}
})();
