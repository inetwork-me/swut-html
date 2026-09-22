/* Single source of truth for the product selector used by every SWUT form. */
(function () {
  var MIDAS = ['MIDAS GEN', 'MIDAS CIVIL NX', 'MIDAS GTS NX'];

  function options(o) {
    o = o || {};
    var list = [];
    if (o.general) list.push({ name: 'General enquiry' });
    if (o.notApplicable) list.push({ name: 'Not sure / Not applicable' });
    list.push({ name: 'IDEA StatiCa' });
    list.push({ name: 'ZWCAD' });
    list.push({ name: 'Bentley' });
    list.push({ group: 'MIDAS' });
    MIDAS.forEach(function (n) { list.push({ name: n, nested: true }); });
    if (o.notSure) list.push({ name: 'Not sure / Other' });
    return list;
  }

  function names(o) { return options(o).filter(function (i) { return i.name; }).map(function (i) { return i.name; }); }

  // Rows for the custom listbox: group headings are not selectable.
  // Divider flags keep a 1px rule between selectable rows without doubling
  // it above the group heading or repeating it directly beneath one.
  function rows(o, current, pick) {
    var firstNestedSeen = false;
    return options(o).map(function (it, i) {
      if (it.group) {
        return { name: it.group, isGroup: true, isNested: false, isNestedFirst: false, isPlain: false, isPlainFirst: false, checked: false, select: function () {} };
      }
      var base = { name: it.name, isGroup: false, checked: current === it.name, select: function () { pick(it.name); } };
      if (it.nested) {
        var first = !firstNestedSeen;
        firstNestedSeen = true;
        return Object.assign(base, { isNested: !first, isNestedFirst: first, isPlain: false, isPlainFirst: false });
      }
      return Object.assign(base, { isNested: false, isNestedFirst: false, isPlain: i !== 0, isPlainFirst: i === 0 });
    });
  }

  // Legacy saved/linked values that name the brand only must not resolve to a product.
  function isBrandOnlyMidas(v) { return typeof v === 'string' && /^midas$/i.test(v.trim()); }

  function match(raw, o) {
    if (!raw) return '';
    var key = String(raw).toLowerCase().replace(/[\s-]+/g, '');
    var hit = names(o).find(function (n) { return n.toLowerCase().replace(/\s+/g, '') === key; });
    return hit || '';
  }

  window.SWUTProductOptions = { MIDAS: MIDAS, options: options, names: names, rows: rows, match: match, isBrandOnlyMidas: isBrandOnlyMidas };
  try { window.dispatchEvent(new Event('swut-products-ready')); } catch (e) {}
})();
