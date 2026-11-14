// CTFL Prep menu bar v4 — journey-grouped: brand · current · Chapters ▾ · Practice ▾ · Glossary · Cheat sheet · toggles.
// Practice = original content only (3 original mocks); official ISTQB samples link out (copyright — not embedded).
// Dropdowns open on hover/focus (CSS) and on click (touch) — this script builds the structure and wires the theme toggle.
(function () {
  var here = (location.pathname.split('/').pop() || 'index.html');
  function page(href, label, desc) { return { href: href, label: label, desc: desc }; }
  var GROUPS = [
    {
      key: 'ch', type: 'drop', label: 'Chapters',
      items: [
        page('chapter-01.html', 'Ch 1 — Fundamentals', '~7–8 Q'),
        page('chapter-02.html', 'Ch 2 — In the SDLC', '~7 Q'),
        page('chapter-03.html', 'Ch 3 — Static Testing', '~4 Q'),
        page('chapter-04.html', 'Ch 4 — Techniques (K3)', '~10–11 Q'),
        page('chapter-05.html', 'Ch 5 — Management', '~9 Q'),
        page('chapter-06.html', 'Ch 6 — Tools', '~3 Q'),
        page('explainers.html', 'Explainers — the WHY', 'the why behind the terms'),
        page('advice.html', 'Exam advice', 'tactics from real examinees')
      ]
    },
    {
      key: 'pr', type: 'drop', label: 'Practice',
      items: [
        page('math-walkthroughs.html', 'K3 Math — step by step', 'worked technique walkthroughs'),
        page('drills.html', 'K3 Drills', 'fresh numbers every round'),
        page('mock-01.html', 'Mock exam 1', '40 Q · original questions'),
        page('mock-02.html', 'Mock exam 2', '40 Q · original questions'),
        page('mock-03.html', 'Mock exam 3', '40 Q · original questions'),
        page('official-samples.html', 'Official samples', "ISTQB's free official exams — external")
      ]
    },
    { key: 'glo', type: 'link', href: 'glossary.html', label: 'Glossary' },
    { key: 'cs', type: 'link', href: 'final-day-cheatsheet.html', label: 'Cheat sheet' }
  ];
  var current = null, currentGroupLabel = '';
  GROUPS.forEach(function (g) {
    if (g.type === 'link' && g.href === here) { current = g.label; currentGroupLabel = ''; }
    if (g.type === 'drop') g.items.forEach(function (it) {
      if (it.href === here) { current = it.label; currentGroupLabel = g.label; }
    });
  });

  var nav = document.createElement('nav');
  nav.className = 'menubar';
  var html = '<div class="mbrand"><a href="index.html">CTFL <span>v4.0</span></a>' +
    (current ? '<span class="mhere">' + (currentGroupLabel ? currentGroupLabel + ' · ' : '') + current + '</span>' : '') +
    '</div><div class="mright">';
  GROUPS.forEach(function (g) {
    if (g.type === 'link') {
      html += '<a class="mtop' + (g.href === here ? ' active' : '') + '" href="' + g.href + '">' + g.label + '</a>';
    } else {
      var hasActive = g.items.some(function (it) { return it.href === here; });
      html += '<div class="mgroup' + (hasActive ? ' has-active' : '') + '">' +
        '<button class="mtop mdrop-btn" aria-haspopup="true">' + g.label + ' <span class="mcar">▾</span></button>' +
        '<div class="mdrop">';
      g.items.forEach(function (it) {
        html += '<a class="mitem' + (it.href === here ? ' active' : '') + '" href="' + it.href + '">' +
          '<span class="mitem-l">' + it.label + '</span><span class="mitem-d">' + it.desc + '</span></a>';
      });
      html += '</div></div>';
    }
  });
  html += '</div>';
  nav.innerHTML = html;
  var btn = document.createElement('button');
  btn.className = 'theme-toggle';
  btn.setAttribute('aria-label', 'Toggle dark mode');
  nav.querySelector('.mright').appendChild(btn);
  document.body.insertBefore(nav, document.body.firstChild);

  // click-toggle for touch (hover/focus handled in CSS)
  nav.querySelectorAll('.mdrop-btn').forEach(function (b) {
    b.addEventListener('click', function (e) {
      e.preventDefault();
      var g = b.parentElement;
      var open = g.classList.contains('open');
      nav.querySelectorAll('.mgroup.open').forEach(function (o) { o.classList.remove('open'); });
      if (!open) g.classList.add('open');
    });
  });
  document.addEventListener('click', function (e) {
    if (!nav.contains(e.target)) nav.querySelectorAll('.mgroup.open').forEach(function (o) { o.classList.remove('open'); });
  });

  function sync() {
    btn.textContent = document.documentElement.getAttribute('data-theme') === 'dark' ? '☀️' : '🌙';
  }
  btn.addEventListener('click', function () {
    var next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem('ctflg-theme', next); } catch (e) {}
    sync();
  });
  sync();
})();
