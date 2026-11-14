// CTFL Prep — K3 math walkthrough engine.
// Renders official sample-exam cards from window.WALKTHROUGHS (walkthrough-data.js).
// Click-to-advance steps: ONE step per click, no auto-play; viz re-renders per step.
// No-JS: all steps render visible; hiding applies only under body.wt-js.
(function () {
  'use strict';

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  // ---- visualizations (per-step highlight) ----

  function renderNumline(v) {
    var wrap = el('div', 'wt-numline');
    var on = v.on || [];
    var dense = (v.hi - v.lo) > 20; // compressed line: only the step's values, with … gaps
    var shown = dense ? on.slice().sort(function (a, b) { return a - b; })
                      : [];
    var prev = null;
    function cell(val, isOn) {
      var c = el('div', 'nl-cell' + (isOn ? ' on' : ''), String(val));
      if (dense && prev != null && val - prev > 1) wrap.appendChild(el('span', 'nl-dots', '…'));
      wrap.appendChild(c);
      prev = val;
    }
    if (dense) {
      on.forEach(function (val) { cell(val, true); });
      if (!on.length) wrap.appendChild(el('span', 'nl-dots', '(no values highlighted this step)'));
    } else {
      for (var n = v.lo; n <= v.hi; n++) cell(n, on.indexOf(n) !== -1);
    }
    return wrap;
  }

  function renderDT(v) {
    var t = document.createElement('table');
    t.className = 'wt-dt';
    var thead = document.createElement('thead');
    var hr = document.createElement('tr');
    (v.head || []).forEach(function (h) { hr.appendChild(el('th', null, h)); });
    thead.appendChild(hr);
    t.appendChild(thead);
    var tb = document.createElement('tbody');
    (v.rows || []).forEach(function (row, i) {
      var tr = document.createElement('tr');
      if ((v.hl || []).indexOf(i) !== -1) tr.className = 'dt-hl';
      row.forEach(function (c) { tr.appendChild(el('td', null, c)); });
      tb.appendChild(tr);
    });
    t.appendChild(tb);
    return t;
  }

  function renderViz(viz) {
    if (!viz || viz.type === 'none') return null;
    var frag = document.createDocumentFragment();
    if (viz.type === 'numline') frag.appendChild(renderNumline(viz));
    else if (viz.type === 'dt') frag.appendChild(renderDT(viz));
    return frag.childNodes.length ? frag : null;
  }

  // ---- cards ----

  function renderCard(card) {
    var art = el('article', 'wt-card');
    art.id = 'card-' + card.id;

    // header: OFFICIAL badge + appendix tag + source + LO + K-level
    var head = el('div', 'wt-head');
    head.appendChild(el('p', 'pbad official', '★ OFFICIAL — ISTQB sample exam question'));
    if (card.appendix) head.appendChild(el('span', 'wt-appendix', 'Appendix'));
    head.appendChild(el('span', 'wt-src', card.source));
    head.appendChild(el('span', 'wt-lo', card.lo));
    var kb = el('p', 'kbadge ' + (card.k || 'k3').toLowerCase(), card.k || 'K3');
    head.appendChild(kb);
    art.appendChild(head);

    // verbatim stem + options
    var stem = el('div', 'wt-stem');
    stem.innerHTML = card.stem;
    art.appendChild(stem);

    // teaching derivation label — clearly not the official rationale
    art.appendChild(el('p', 'wt-ours', '◆ Our step-by-step — teaching derivation, not the official rationale'));

    // steps (rendered visible; hidden by CSS only under body.wt-js)
    var ol = el('ol', 'wt-steps');
    var steps = card.steps || [];
    steps.forEach(function (s) {
      var li = el('li', 'wt-step');
      li.appendChild(el('h4', null, s.t));
      li.appendChild(el('p', null, s.d));
      var viz = renderViz(s.viz);
      if (viz) li.appendChild(viz);
      ol.appendChild(li);
    });
    art.appendChild(ol);

    // official answer banner (revealed with the final Answer step)
    var ans = el('p', 'wt-ans', 'Official answer: (' + card.answer + ') — ' + card.answerText + '  ✓');
    art.appendChild(ans);

    // controls: click-to-advance, no auto-play
    var ctl = el('div', 'wt-controls');
    var btn = el('button', 'wt-btn', '▸ Next step (1/' + steps.length + ')');
    var hint = el('span', 'wt-hint', 'predict first: write your answer on paper');
    var prog = el('span', 'wt-prog', 'steps revealed 0/' + steps.length);
    ctl.appendChild(btn); ctl.appendChild(hint); ctl.appendChild(prog);
    art.appendChild(ctl);

    var lis = ol.children, revealed = 0;
    btn.addEventListener('click', function () {
      if (revealed < steps.length) {
        lis[revealed].classList.add('revealed');
        revealed++;
        hint.textContent = '';
        prog.textContent = 'steps revealed ' + revealed + '/' + steps.length;
        if (revealed >= steps.length) {
          ans.classList.add('show');
          btn.disabled = true;
          btn.textContent = '✓ all steps revealed';
        } else {
          btn.textContent = '▸ Next step (' + (revealed + 1) + '/' + steps.length + ')';
        }
      }
    });

    return art;
  }

  function renderTech(tech, host) {
    // recipe line (cheat-sheet wording) with link to the recipe table
    var rec = el('p', 'wt-recipe');
    rec.appendChild(document.createTextNode('Recipe: ' + tech.recipe + '  '));
    var a = el('a', null, 'recipe ↗');
    a.href = 'final-day-cheatsheet.html#k3';
    rec.appendChild(a);
    host.insertBefore(rec, host.firstChild);
    (tech.cards || []).forEach(function (card) { host.appendChild(renderCard(card)); });

    // footer: drill link + compact official variants line
    var foot = el('div', 'wt-foot');
    var d = el('a', null, 'drill this type ▸');
    d.href = tech.drillHref;
    foot.appendChild(d);
    if (tech.variants && tech.variants.length) {
      var vars = el('span', 'wt-vars', 'More official variants: ');
      tech.variants.forEach(function (v, i) {
        if (i) vars.appendChild(document.createTextNode(' · '));
        var va = el('a', null, v.source);
        va.href = v.href;
        vars.appendChild(va);
      });
      foot.appendChild(vars);
    }
    host.appendChild(foot);
  }

  function init() {
    if (!window.WALKTHROUGHS || !window.WALKTHROUGHS.techniques) return;
    document.body.classList.add('wt-js');
    window.WALKTHROUGHS.techniques.forEach(function (tech) {
      var host = document.querySelector('.wt-cards[data-tech="' + tech.id + '"]');
      if (host) renderTech(tech, host);
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
