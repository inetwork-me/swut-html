/* Shared SWUT event collection. Consumed by the Events archive, product
   event sections, and event detail pages. Status is always derived from the
   event's end date in its own timezone — never stored. */
(function () {
  var EVENTS = [
    {
      slug: 'idea-statica-coffee-and-learn',
      title: 'IDEA StatiCa Coffee & Learn',
      summary: 'A day exploring IDEA StatiCa V26.1, with a focus on Detail, Anchoring Design enhancements, and Connection, alongside real project experiences and BIM workflows.',
      image: 'assets/events/coffee-learn-2026-01.png',
      imageAlt: 'Attendees of IDEA StatiCa Coffee & Learn 2026 at Triumph Luxury Hotel, Cairo',
      imagePosition: '50% 45%',
      linkedin: 'https://www.linkedin.com/posts/iengs_swutsolutions-ideastatica-trimble-activity-7513525909987979264-6RsD',
      start: '2026-10-05T09:00:00',
      end: '2026-10-05T15:05:00',
      timezone: 'Africa/Cairo',
      utcOffset: '+03:00',
      venue: 'Triumph Luxury Hotel',
      online: false,
      products: ['IDEA StatiCa'],
      services: ['Training & Technical Workshops'],
      href: 'Event.dc.html?event=idea-statica-coffee-and-learn',
    },
    {
      slug: 'idea-statica-coffee-and-learn-egypt-2026',
      title: 'IDEA StatiCa Coffee & Learn Egypt',
      summary: 'Hosted at SWUT Solutions, with IDEA StatiCa engineers Martin Horáček and Lukáš Juříček presenting the CBFEM method and live demonstrations for structural steel design.',
      image: 'assets/events/coffee-learn-egypt-2026-01.png',
      imageAlt: 'SWUT Solutions team with IDEA StatiCa speakers Martin Horáček and Lukáš Juříček',
      imagePosition: '50% 45%',
      gallery: ['assets/events/coffee-learn-egypt-2026-02.png', 'assets/events/coffee-learn-egypt-2026-03.png', 'assets/events/coffee-learn-egypt-2026-04.png'],
      // Exact session date isn't stated in the post; dated by the LinkedIn post (16 April 2026).
      dateText: 'April 2026',
      start: '2026-04-16T09:00:00',
      end: '2026-04-16T17:00:00',
      timezone: 'Africa/Cairo',
      utcOffset: '+02:00',
      venue: 'SWUT Solutions, Cairo',
      online: false,
      products: ['IDEA StatiCa'],
      services: ['Training & Technical Workshops'],
      linkedin: 'https://www.linkedin.com/posts/iengs_swutsolutions-ideastatica-structuralengineering-activity-7450564766818930688-BdsI',
      href: 'Event.dc.html?event=idea-statica-coffee-and-learn-egypt-2026',
    },
    {
      slug: 'idea-statica-coffee-and-learn-egypt-2025',
      title: 'IDEA StatiCa Coffee & Learn Session',
      summary: 'Hosted at SWUT Solutions and led by Channel Manager Dominik Barič, with practical insights and demonstrations of the latest IDEA StatiCa workflows.',
      image: 'assets/events/coffee-learn-egypt-2025-01.png',
      imageAlt: 'Attendees and the SWUT team at the IDEA StatiCa Coffee & Learn session',
      imagePosition: '50% 45%',
      // Exact session date isn't stated in the post; dated by the LinkedIn post (7 November 2025).
      dateText: 'November 2025',
      start: '2025-11-07T09:00:00',
      end: '2025-11-07T17:00:00',
      timezone: 'Africa/Cairo',
      utcOffset: '+02:00',
      venue: 'SWUT Solutions, Cairo',
      online: false,
      products: ['IDEA StatiCa'],
      services: ['Training & Technical Workshops'],
      linkedin: 'https://www.linkedin.com/posts/iengs_ideastatica-swutsolutions-coffeeandlearn-activity-7392614464849833984-pxoa',
      href: 'Event.dc.html?event=idea-statica-coffee-and-learn-egypt-2025',
    },
  ];

  /* Technical workshops are a service, not events: they appear on product pages and the
     Training & Technical Workshops page only — never in the Events archive. */
  var WORKSHOPS = [
    {
      slug: 'midas-gts-nx-technical-workshops-2026',
      title: 'MIDAS GTS NX Technical Workshops',
      summary: 'Eng. Darshan of the MIDAS technical team led workshops on advanced geotechnical analysis in MIDAS GTS NX, including a focused session with the National Authority for Tunnels.',
      image: 'assets/workshops/midas-gts-nx-2026-01.png',
      imageAlt: 'MIDAS GTS NX workshop in a meeting room with an application case on screen',
      imagePosition: '50% 50%',
      // Exact dates aren't stated in the post; dated by the LinkedIn post (30 April 2026).
      dateText: 'April 2026',
      start: '2026-04-30T09:00:00',
      end: '2026-04-30T17:00:00',
      timezone: 'Africa/Cairo',
      utcOffset: '+03:00',
      venue: 'Client sites, Egypt',
      online: false,
      products: ['MIDAS'],
      services: ['Training & Technical Workshops'],
      linkedin: 'https://www.linkedin.com/posts/midas-midasgtsnx-geotechnicalengineering-ugcPost-7455536959021576192-0uc2',
      href: 'Event.dc.html?event=midas-gts-nx-technical-workshops-2026',
    },
    {
      slug: 'midas-civil-nx-shaker-training-2026',
      title: 'MIDAS CIVIL NX Bridge Engineering Training',
      summary: 'Specialized MIDAS CIVIL NX training for Shaker Consultancy Group, delivered with MIDAS R&D Centre India: API automation, superstructure and shell modelling, and railway bridge dynamics.',
      image: 'assets/workshops/midas-civil-nx-shaker-01.png',
      imageAlt: 'Eng. Mital Chovatiya leading MIDAS CIVIL NX training for Shaker Consultancy Group',
      imagePosition: '50% 50%',
      // Exact dates aren't stated in the post; dated by the LinkedIn post (2 March 2026).
      dateText: 'March 2026',
      start: '2026-03-02T09:00:00',
      end: '2026-03-02T17:00:00',
      timezone: 'Africa/Cairo',
      utcOffset: '+02:00',
      venue: 'Shaker Consultancy Group, Egypt',
      online: false,
      products: ['MIDAS'],
      services: ['Training & Technical Workshops'],
      linkedin: 'https://www.linkedin.com/posts/swutsolutions-midas-bridgeengineering-ugcPost-7434186963928322049-Zd9r',
      href: 'Event.dc.html?event=midas-civil-nx-shaker-training-2026',
    },
  ];

  var PRODUCTS = ['IDEA StatiCa', 'ZWCAD', 'MIDAS', 'Bentley'];

  function endTime(ev) { return new Date(ev.end + (ev.utcOffset || 'Z')).getTime(); }
  function startTime(ev) { return new Date(ev.start + (ev.utcOffset || 'Z')).getTime(); }
  function status(ev) { return Date.now() <= endTime(ev) ? 'upcoming' : 'past'; }

  function dateLabel(ev) {
    if (ev.dateText) return ev.dateText;
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

  window.SWUTWorkshops = {
    all: sort(WORKSHOPS),
    byProduct: function (product) { return sort(WORKSHOPS.filter(function (w) { return (w.products || []).indexOf(product) !== -1; })); },
    status: status,
    dateLabel: dateLabel,
    place: place,
  };

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
