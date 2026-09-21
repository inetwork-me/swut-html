/* Shared SWUT event collection. Consumed by the Events archive, product
   event sections, and event detail pages. Status is always derived from the
   event's end date in its own timezone — never stored. */
(function () {
  var EVENTS = [
    {
      slug: 'idea-statica-coffee-and-learn',
      title: 'IDEA StatiCa Coffee & Learn',
      summary: 'Meet the IDEA StatiCa team for technical presentations, customer success stories, and discussions on structural design workflows.',
      image: 'https://files.cdn-files-a.com/uploads/12365954/2000_gi-6a9d4525d7321.jpg',
      imageAlt: 'IDEA StatiCa Coffee & Learn, Cairo',
      imagePosition: '50% 40%',
      start: '2026-10-05T09:00:00',
      end: '2026-10-05T15:05:00',
      timezone: 'Africa/Cairo',
      utcOffset: '+03:00',
      venue: 'Triumph Luxury Hotel',
      online: false,
      products: ['IDEA StatiCa'],
      services: ['Training'],
      href: 'Event.dc.html?event=idea-statica-coffee-and-learn',
    },
  ];

  var PRODUCTS = ['IDEA StatiCa', 'ZWCAD', 'Midas'];

  function endTime(ev) { return new Date(ev.end + (ev.utcOffset || 'Z')).getTime(); }
  function startTime(ev) { return new Date(ev.start + (ev.utcOffset || 'Z')).getTime(); }
  function status(ev) { return Date.now() <= endTime(ev) ? 'upcoming' : 'past'; }

  function dateLabel(ev) {
    try {
      return new Intl.DateTimeFormat('en-GB', {
        day: '2-digit', month: 'long', year: 'numeric', timeZone: ev.timezone,
      }).format(new Date(startTime(ev)));
    } catch (e) {
      return ev.start.slice(0, 10);
    }
  }

  function place(ev) { return ev.online ? 'Online' : ev.venue; }

  /* Upcoming first in chronological order, then past events newest first. */
  function sort(list) {
    var up = list.filter(function (e) { return status(e) === 'upcoming'; })
      .sort(function (a, b) { return startTime(a) - startTime(b); });
    var past = list.filter(function (e) { return status(e) === 'past'; })
      .sort(function (a, b) { return startTime(b) - startTime(a); });
    return up.concat(past);
  }

  function matchesQuery(ev, q) {
    if (!q) return true;
    var needle = q.trim().toLowerCase();
    if (!needle) return true;
    return [ev.title, ev.summary, place(ev)].join(' ').toLowerCase().indexOf(needle) !== -1;
  }

  function filter(opts) {
    var o = opts || {};
    return sort(EVENTS.filter(function (ev) {
      if (!matchesQuery(ev, o.q)) return false;
      if (o.product && o.product !== 'All products' && (ev.products || []).indexOf(o.product) === -1) return false;
      if (o.service && o.service !== 'All services' && (ev.services || []).indexOf(o.service) === -1) return false;
      if (o.date === 'Upcoming' && status(ev) !== 'upcoming') return false;
      if (o.date === 'Past' && status(ev) !== 'past') return false;
      return true;
    }));
  }

  function byProduct(product) {
    return sort(EVENTS.filter(function (ev) { return (ev.products || []).indexOf(product) !== -1; }));
  }

  function bySlug(slug) {
    for (var i = 0; i < EVENTS.length; i++) if (EVENTS[i].slug === slug) return EVENTS[i];
    return null;
  }

  function serviceOptions() {
    var seen = {};
    EVENTS.forEach(function (ev) { (ev.services || []).forEach(function (s) { seen[s] = true; }); });
    return ['All services'].concat(Object.keys(seen).sort());
  }

  window.SWUTEvents = {
    all: EVENTS,
    products: ['All products'].concat(PRODUCTS),
    serviceOptions: serviceOptions,
    dateOptions: ['All events', 'Upcoming', 'Past'],
    status: status,
    dateLabel: dateLabel,
    place: place,
    sort: sort,
    filter: filter,
    byProduct: byProduct,
    bySlug: bySlug,
  };
})();
