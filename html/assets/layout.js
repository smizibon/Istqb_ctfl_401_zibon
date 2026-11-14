// CTFL Prep layout engine — collapsible sections for at-a-glance reading.
// Sections render as: [chevron + h2 + kbadge + one-line .sec-sum] when closed,
// full body when open. Default: collapsed (first content section open).
// State persists per page in localStorage. Contract: <script src="assets/layout.js">
// placed BEFORE progress.js. A button inside .sec-head (e.g. the read-toggle) never toggles.
(function () {
  // unique per page: data-ch, else explicit data-page, else filename (official pages), else 'index'
  var page = document.body.getAttribute('data-ch')
    || document.body.getAttribute('data-page')
    || (location.pathname ? location.pathname.split('/').pop().replace(/\.html?$/, '') : '')
    || 'index';
  var KEY = 'ctflg-collapse-v1';
  function load() { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; } }
  var st = load();
  if (!st[page]) st[page] = {};
  function save() { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) {} }

  var secs = [].slice.call(document.querySelectorAll('main section'));
  var wired = 0;

  secs.forEach(function (sec, i) {
    var h2 = sec.querySelector('h2');
    if (!h2) return;
    var id = 's' + i;

    // build .sec-head from h2 + immediately following .kbadge / .sec-sum
    var head = document.createElement('div');
    head.className = 'sec-head';
    sec.insertBefore(head, sec.firstChild);
    head.appendChild(h2);
    var next = head.nextElementSibling;
    while (next && (next.classList.contains('kbadge') || next.classList.contains('sec-sum'))) {
      var cur = next; next = next.nextElementSibling;
      head.appendChild(cur);
    }

    // wrap the remainder in .sec-body
    var body = document.createElement('div');
    body.className = 'sec-body';
    while (head.nextSibling) body.appendChild(head.nextSibling);
    sec.appendChild(body);

    var open;
    if (st[page].hasOwnProperty(id)) open = !!st[page][id];
    else if (sec.hasAttribute('data-open')) open = true;   // section flagged to start open
    else open = (wired === 0); // first section starts open
    sec.classList.toggle('closed', !open);
    wired++;

    head.addEventListener('click', function (e) {
      if (e.target.closest('button') || e.target.closest('a')) return;
      var nowOpen = sec.classList.contains('closed');
      sec.classList.toggle('closed', !nowOpen);
      st[page][id] = nowOpen; save();
    });
  });

  // expand / collapse all control
  var crumbs = document.querySelector('nav.crumbs');
  if (crumbs && wired) {
    var btn = document.createElement('button');
    btn.id = 'toggle-all';
    btn.textContent = window.t ? t('expandAll','Expand all ▾') : 'Expand all ▾';
    function anyClosed() { return document.querySelectorAll('main section.closed').length > 0; }
    function refresh() { btn.textContent = anyClosed() ? (window.t ? t('expandAll','Expand all ▾') : 'Expand all ▾') : (window.t ? t('collapseAll','Collapse all ▴') : 'Collapse all ▴'); }
    btn.addEventListener('click', function () {
      var open = anyClosed();
      secs.forEach(function (s, i) { s.classList.toggle('closed', !open); st[page]['s' + i] = open; });
      save(); refresh();
    });
    crumbs.appendChild(btn);
    refresh();
  }

  // anchor links should open the target section
  function openFor(target) {
    if (!target || !target.closest) return;
    var sec = target.closest('section');
    if (sec && sec.classList.contains('closed')) {
      sec.classList.remove('closed');
      var idx = secs.indexOf(sec);
      if (idx >= 0) { st[page]['s' + idx] = true; save(); }
      document.querySelectorAll('#toggle-all').forEach(function (b) {
        b.textContent = document.querySelectorAll('main section.closed').length > 0 ? (window.t ? t('expandAll','Expand all ▾') : 'Expand all ▾') : (window.t ? t('collapseAll','Collapse all ▴') : 'Collapse all ▴');
      });
    }
  }
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href^="#"]');
    if (!a) return;
    openFor(document.getElementById(a.getAttribute('href').slice(1)));
  });

  // arriving via #hash from another page: open the target section and land on it
  if (location.hash) {
    var hashTarget = document.getElementById(location.hash.slice(1));
    if (hashTarget) { openFor(hashTarget); setTimeout(function () { hashTarget.scrollIntoView(); }, 0); }
  }

  // printing should reveal everything: open all sections and all reveal cards
  window.addEventListener('beforeprint', function () {
    document.querySelectorAll('main section.closed').forEach(function (s) { s.classList.remove('closed'); });
    document.querySelectorAll('details.kc').forEach(function (d) { d.open = true; });
  });
})();
