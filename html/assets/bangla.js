// CTFL Prep Bangla layer — loads LAST (after layout.js created .sec-head/.sec-body).
// Mechanics: wraps each .sec-body's non-.bn children in div.en; CSS flips .en/.bn via
// body.lang-bn (site) or section.lang-bn/.lang-en (per-section override, higher specificity).
// Buttons: per-section "বাংলা/EN" in .sec-head (sections having .bn only) + menubar toggle.
// Storage: ctflg-lang ('bn'|'en'), ctflg-lang-sec {page:{sN:'bn'|'en'}} (overrides).
(function () {
  var page = location.pathname.split('/').pop().replace(/\.html?$/, '') || 'index';
  function load(k, d) { try { return JSON.parse(localStorage.getItem(k)) || d; } catch (e) { return d; } }
  function store(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }

  // site language from storage (default English — exam is in English)
  var siteLang = load('ctflg-lang', 'en');
  if (siteLang === 'bn') document.body.classList.add('lang-bn');

  // The UI engines build their labels before this file runs; if the site language
  // is Bangla on arrival (or switched), relabel the already-built controls.
  function relabelUI() {
    var bn = document.body.classList.contains('lang-bn');
    var ta = document.getElementById('toggle-all');
    if (ta) {
      var closed = document.querySelectorAll('main section.closed').length > 0;
      ta.textContent = bn ? (closed ? CTFL_BN.expandAll : CTFL_BN.collapseAll)
                          : (closed ? 'Expand all ▾' : 'Collapse all ▴');
    }
    document.querySelectorAll('button.read-toggle').forEach(function (b) {
      b.textContent = bn ? (b.classList.contains('on') ? CTFL_BN.read : CTFL_BN.markRead)
                         : (b.classList.contains('on') ? '✓ Read' : 'Mark read');
    });
    document.querySelectorAll('.quiz').forEach(function (quiz) {
      var sbar = quiz.querySelector('.scorebar');
      if (!sbar) return;
      var span = sbar.querySelector('span');
      var done = sbar.querySelector('.done'), ok = sbar.querySelector('.ok');
      if (span && done && ok) {
        span.firstChild.textContent = (bn ? CTFL_BN.answered : 'Answered') + ' ';
        done.nextSibling.textContent = ' / ' + quiz.querySelectorAll('.q').length + ' · ' + (bn ? CTFL_BN.correct : 'Correct') + ' ';
      }
      var reset = sbar.querySelector('.quiz-reset');
      if (reset) reset.textContent = bn ? CTFL_BN.resetQuiz : '↺ Reset quiz';
    });
  }
  if (siteLang === 'bn') relabelUI();

  // 1) wrap English content so CSS can flip it
  document.querySelectorAll('main section .sec-body').forEach(function (body) {
    var bn = body.querySelector(':scope > .bn');
    if (!bn) return;
    if (body.querySelector(':scope > .en')) return; // already wrapped
    var en = document.createElement('div');
    en.className = 'en';
    while (body.firstChild && body.firstChild !== bn) en.appendChild(body.firstChild);
    body.insertBefore(en, bn);
  });

  // 2) restore per-section overrides
  var overrides = load('ctflg-lang-sec', {});
  var secOv = overrides[page] || {};

  // 3) per-section buttons (only where a .bn block exists)
  document.querySelectorAll('main section').forEach(function (sec, i) {
    var body = sec.querySelector(':scope > .sec-body');
    if (!body || !body.querySelector(':scope > .bn')) return;
    var id = 's' + i;
    var head = sec.querySelector(':scope > .sec-head');
    if (!head) return;
    var btn = document.createElement('button');
    btn.className = 'lang-toggle';
    function isBn() {
      if (sec.classList.contains('lang-bn')) return true;
      if (sec.classList.contains('lang-en')) return false;
      return document.body.classList.contains('lang-bn');
    }
    function sync() { btn.textContent = isBn() ? 'EN' : 'বাংলা'; }
    if (secOv[id] === 'bn') sec.classList.add('lang-bn');
    if (secOv[id] === 'en') sec.classList.add('lang-en');
    btn.addEventListener('click', function () {
      if (isBn()) { sec.classList.remove('lang-bn'); sec.classList.add('lang-en'); secOv[id] = 'en'; }
      else { sec.classList.remove('lang-en'); sec.classList.add('lang-bn'); secOv[id] = 'bn'; }
      overrides[page] = secOv; store('ctflg-lang-sec', overrides);
      sync();
    });
    sync();
    head.appendChild(btn);
  });

  // 4) menubar language toggle (site-wide; resets section overrides)
  var right = document.querySelector('nav.menubar .mright');
  if (right) {
    var btn = document.createElement('button');
    btn.className = 'theme-toggle lang-site';
    btn.setAttribute('aria-label', 'Toggle Bangla / English');
    function syncSite() { btn.textContent = document.body.classList.contains('lang-bn') ? 'EN' : 'বাংলা'; }
    btn.addEventListener('click', function () {
      var toBn = !document.body.classList.contains('lang-bn');
      document.body.classList.toggle('lang-bn', toBn);
      store('ctflg-lang', toBn ? 'bn' : 'en');
      // site toggle = uniform language; clear per-section overrides
      document.querySelectorAll('section.lang-bn, section.lang-en').forEach(function (s) {
        s.classList.remove('lang-bn', 'lang-en');
      });
      overrides[page] = {}; secOv = {}; store('ctflg-lang-sec', overrides);
      document.querySelectorAll('.lang-toggle').forEach(function (b) { b.textContent = toBn ? 'EN' : 'বাংলা'; });
      syncSite(); relabelUI();
    });
    syncSite();
    right.appendChild(btn);
  }
})();
