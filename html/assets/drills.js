// CTFL Prep — K3 drills engine (drills.html)
// Four widgets: BVA/EP generator · coverage meter · decision-table count · state-machine stepper.
// Language: English + Bangla strings chosen at render time from body.lang-bn (no engine hooks).
// Storage: ONLY localStorage key 'ctflg-k3-drills' (versioned, try/catch-guarded). No other keys touched.
(function () {
  'use strict';
  document.body.classList.add('drills-js');

  /* ---------- tiny utils ---------- */
  function ri(min, max) { return min + Math.floor(Math.random() * (max - min + 1)); }
  function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
  function L(en, bn) { return document.body.classList.contains('lang-bn') ? bn : en; }
  function el(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  }
  function fmtN(n) { return String(n); }

  /* ---------- session store (key: ctflg-k3-drills, v1) ---------- */
  var KEY = 'ctflg-k3-drills';
  var STORE = (function () {
    try {
      var s = JSON.parse(localStorage.getItem(KEY));
      if (s && s.v === 1 && s.w) return s;
    } catch (e) {}
    return { v: 1, w: {} };
  })();
  function saveStore() { try { localStorage.setItem(KEY, JSON.stringify(STORE)); } catch (e) {} }
  function stats(id) {
    if (!STORE.w[id]) STORE.w[id] = { s: 0, c: 0, k: 0, b: 0 };
    return STORE.w[id];
  }
  function record(id, ok) {
    var t = stats(id);
    t.s++;
    if (ok) { t.c++; t.k++; if (t.k > t.b) t.b = t.k; } else { t.k = 0; }
    saveStore();
    return t;
  }
  function sessionHTML(t) {
    return L('seen ' + t.s + ' · correct ' + t.c + ' · best streak ' + t.b,
             'দেখা ' + t.s + ' · সঠিক ' + t.c + ' · সেরা ধারা ' + t.b);
  }
  function sessionEl(id) {
    var span = el('span', 'dsession', sessionHTML(stats(id)));
    span.setAttribute('data-w', id);
    return span;
  }
  function refreshSession(id) {
    var t = stats(id);
    document.querySelectorAll('.dsession[data-w="' + id + '"]').forEach(function (s) { s.innerHTML = sessionHTML(t); });
  }

  /* ---------- shared UI pieces ---------- */
  function button(label, alt) {
    var b = el('button', 'dbtn' + (alt ? ' alt' : ''));
    b.type = 'button';
    b.textContent = label;
    return b;
  }
  // answer checking: comma/semicolon/space separated values compared as a SET (order-insensitive)
  function parseSet(str) {
    return str.split(/[,;\s]+/).map(function (s) { return s.trim(); }).filter(function (s) { return s.length > 0; });
  }
  function sameSet(got, want) {
    var g = got.map(Number).filter(function (n) { return !isNaN(n); });
    if (g.length !== got.length || g.length !== want.length) return false;
    var gs = g.slice().sort(function (a, b) { return a - b; });
    var ws = want.slice().sort(function (a, b) { return a - b; });
    return gs.every(function (v, i) { return v === ws[i]; });
  }
  // numeric answers: accept "4", "4 tests", "36.5%"
  function parseNum(str) {
    var m = String(str).match(/-?\d+(\.\d+)?/);
    return m ? parseFloat(m[0]) : null;
  }
  function pct(n, d) { return Math.round((n / d) * 1000) / 10; }
  function verdict(ok, good, bad) {
    return el('div', 'verdict ' + (ok ? 'ok' : 'no'), ok ? good : bad);
  }
  function solBox(stepsHTML) {
    return el('div', 'drill-sol box work', '<span class="box-tag">✏️ ' + L('Worked recipe — every step', 'ধাপে ধাপে সমাধান — সম্পূর্ণ রেসিপি') + '</span>' + stepsHTML);
  }
  function numline(lo, hi, onSet, labEn, labBn) {
    var cells = [lo - 1, lo, lo + 1, '…', hi - 1, hi, hi + 1];
    var html = '';
    cells.forEach(function (c) {
      if (c === '…') { html += '<div class="nl-dots">…</div>'; return; }
      var tag = (c === lo - 1 || c === hi - 1) ? 'b−1' : (c === lo || c === hi) ? 'b' : 'b+1';
      html += '<div class="nl-cell' + (onSet.indexOf(c) >= 0 ? ' on' : '') + '">' + c + '<small>' + tag + '</small></div>';
    });
    html += '<div class="nl-lab">' + L(labEn, labBn) + '</div>';
    return '<div class="numline">' + html + '</div>';
  }

  /* ================================================================
     WIDGET 1 — BVA / EP generator
     ================================================================ */
  (function widgetBVA() {
    var root = document.getElementById('drill-bva');
    if (!root) return;
    var ID = 'bva';
    var q = null; // current question object

    var RULE2 = '<b>2-value (ISTQB default): {boundary, nearest neighbour}</b>';
    var RULE3 = '<b>3-value: {b−1, b, b+1}</b>';
    var RULE3BN = '<b>3-value: {b−1, b, b+1}</b>';
    var RULE2BN = '<b>2-value (ISTQB-র ডিফল্ট): {boundary, নিকটতম neighbour}</b>';
    var RULE_EP = '<b>One test per valid partition; EACH invalid partition gets its own test case</b> (bundling invalids = defect masking)';
    var RULE_EPBN = '<b>প্রতিটি valid partition-এ একটি test; প্রতিটি invalid partition পায় নিজের আলাদা test</b> (invalid জমা দিলে = defect masking)';

    function gen() {
      var lo = ri(3, 45);
      var hi = lo + ri(12, 85);
      var mode = pick(['a', 'b', 'c']);
      q = { mode: mode, lo: lo, hi: hi };
      if (mode === 'c') {
        var kind = pick(['simple', 'multi']);
        if (kind === 'simple') {
          q.ep = { kind: 'simple', valids: 1, invalids: 3, ans: 4 };
        } else {
          var cap = pick([100, 120, 500]);
          var parts = pick([2, 3]);
          var cuts = [];
          if (parts === 2) cuts = [ri(20, cap - 20)];
          else cuts = [ri(15, Math.floor(cap / 2) - 5), ri(Math.floor(cap / 2) + 5, cap - 15)];
          q.ep = { kind: 'multi', cap: cap, cuts: cuts, valids: parts, invalids: 3, ans: parts + 3 };
        }
      }
      render();
    }

    function promptHTML() {
      if (q.mode === 'a') {
        return L('A field accepts values <b>' + q.lo + '–' + q.hi + '</b>. List the <b>complete 2-value BVA set</b> (comma-separated).',
                 'একটি ফিল্ড <b>' + q.lo + '–' + q.hi + '</b> মান গ্রহণ করে। <b>সম্পূর্ণ 2-value BVA সেট</b> লেখো (কমা দিয়ে আলাদা করে)।');
      }
      if (q.mode === 'b') {
        return L('A field accepts values <b>' + q.lo + '–' + q.hi + '</b>. List the <b>complete 3-value BVA set</b> (comma-separated).',
                 'একটি ফিল্ড <b>' + q.lo + '–' + q.hi + '</b> মান গ্রহণ করে। <b>সম্পূর্ণ 3-value BVA সেট</b> লেখো (কমা দিয়ে আলাদা করে)।');
      }
      if (q.ep.kind === 'simple') {
        return L('A field accepts values <b>' + q.lo + '–' + q.hi + '</b>. Values below, values above, and non-numeric input are all invalid. <b>How many minimum EP test cases</b> (one per valid partition + each invalid partition separate)?',
                 'একটি ফিল্ড <b>' + q.lo + '–' + q.hi + '</b> মান গ্রহণ করে। এর নিচের, উপরের এবং সংখ্যা-নয় এমন ইনপুট — সবই invalid। <b>ন্যূনতম কতটি EP test case</b> (প্রতিটি valid partition-এ একটি + প্রতিটি invalid partition আলাদা)?');
      }
      var cap = q.ep.cap, c = q.ep.cuts;
      var names = ['low', 'medium', 'high'];
      var bands = '';
      if (c.length === 1) {
        bands = '0–' + c[0] + ' → "' + names[0] + '"; ' + (c[0] + 1) + '–' + cap + ' → "' + names[2] + '"';
      } else {
        bands = '0–' + c[0] + ' → "' + names[0] + '"; ' + (c[0] + 1) + '–' + c[1] + ' → "' + names[1] + '"; ' + (c[1] + 1) + '–' + cap + ' → "' + names[2] + '"';
      }
      return L('A rating field must be a number <b>0–' + cap + '</b> and rates: ' + bands + '. Below 0, above ' + cap + ', and non-numeric input are invalid. <b>How many minimum EP test cases</b> (one per valid partition + each invalid partition separate)?',
               'একটি rating ফিল্ডের মান অবশ্যই সংখ্যা <b>0–' + cap + '</b>, আর রেটিং: ' + bands + '। 0-এর নিচে, ' + cap + '-এর উপরে ও সংখ্যা-নয় ইনপুট invalid। <b>ন্যূনতম কতটি EP test case</b> (প্রতিটি valid partition-এ একটি + প্রতিটি invalid partition আলাদা)?');
    }

    function answer() {
      if (q.mode === 'a') return [q.lo - 1, q.lo, q.hi, q.hi + 1];
      if (q.mode === 'b') return [q.lo - 1, q.lo, q.lo + 1, q.hi - 1, q.hi, q.hi + 1];
      return q.ep.ans;
    }

    function solutionHTML() {
      var lo = q.lo, hi = q.hi;
      if (q.mode === 'a') {
        return '<ol class="steps">' +
          '<li>' + L('Rule', 'নিয়ম') + ': ' + RULE2 + '</li>' +
          '<li>' + L('Boundaries identified: <b>' + lo + '</b> (lower) and <b>' + hi + '</b> (upper).', 'Boundary চিহ্নিত: নিচের <b>' + lo + '</b>, উপরের <b>' + hi + '</b>।') + '</li>' +
          '<li>' + L('Boundary ' + lo + ' → {' + lo + ', ' + (lo - 1) + '} — the neighbour comes from the adjacent (invalid) partition.', 'Boundary ' + lo + ' → {' + lo + ', ' + (lo - 1) + '} — neighbour আসে পাশের (invalid) partition থেকে।') + '</li>' +
          '<li>' + L('Boundary ' + hi + ' → {' + hi + ', ' + (hi + 1) + '}.', 'Boundary ' + hi + ' → {' + hi + ', ' + (hi + 1) + '}।') + '</li>' +
          '<li>' + L('Counted one by one: ' + (lo - 1) + ', ' + lo + ', ' + hi + ', ' + (hi + 1) + ' → <b>4 tests</b>.', 'একটি একটি করে গুনে: ' + (lo - 1) + ', ' + lo + ', ' + hi + ', ' + (hi + 1) + ' → <b>৪টি test</b>।') + '</li>' +
          '</ol>' +
          numline(lo, hi, [lo - 1, lo, hi, hi + 1], 'highlighted = the 2-value set {b, neighbour} at each boundary', 'হাইলাইট = প্রতিটি boundary-তে 2-value সেট {b, neighbour}');
      }
      if (q.mode === 'b') {
        return '<ol class="steps">' +
          '<li>' + L('Rule', 'নিয়ম') + ': ' + L(RULE3, RULE3BN) + '</li>' +
          '<li>' + L('Boundaries identified: <b>' + lo + '</b> and <b>' + hi + '</b>. Each boundary contributes THREE values.', 'Boundary: <b>' + lo + '</b> ও <b>' + hi + '</b>। প্রতিটি boundary তিনটি মান দেয়।') + '</li>' +
          '<li>' + L('Boundary ' + lo + ' → {' + (lo - 1) + ', ' + lo + ', ' + (lo + 1) + '}.', 'Boundary ' + lo + ' → {' + (lo - 1) + ', ' + lo + ', ' + (lo + 1) + '}।') + '</li>' +
          '<li>' + L('Boundary ' + hi + ' → {' + (hi - 1) + ', ' + hi + ', ' + (hi + 1) + '}.', 'Boundary ' + hi + ' → {' + (hi - 1) + ', ' + hi + ', ' + (hi + 1) + '}।') + '</li>' +
          '<li>' + L('Counted one by one: ' + (lo - 1) + ', ' + lo + ', ' + (lo + 1) + ', ' + (hi - 1) + ', ' + hi + ', ' + (hi + 1) + ' → <b>6 tests</b>.', 'একটি একটি করে গুনে: ' + (lo - 1) + ', ' + lo + ', ' + (lo + 1) + ', ' + (hi - 1) + ', ' + hi + ', ' + (hi + 1) + ' → <b>৬টি test</b>।') + '</li>' +
          '</ol>' +
          numline(lo, hi, [lo - 1, lo, lo + 1, hi - 1, hi, hi + 1], 'highlighted = the 3-value set {b−1, b, b+1} at each boundary', 'হাইলাইট = প্রতিটি boundary-তে 3-value সেট {b−1, b, b+1}');
      }
      // EP
      var steps = '<ol class="steps"><li>' + L('Rule', 'নিয়ম') + ': ' + L(RULE_EP, RULE_EPBN) + '</li>';
      if (q.ep.kind === 'simple') {
        steps += '<li>' + L('Valid partition: [' + lo + '–' + hi + '] → <b>1 test</b>.', 'Valid partition: [' + lo + '–' + hi + '] → <b>১টি test</b>।') + '</li>' +
          '<li>' + L('Invalid partitions (each its OWN test): below ' + lo + ' → 1, above ' + hi + ' → 1, non-numeric → 1 = <b>3 tests</b>.', 'Invalid partition (প্রতিটির নিজের আলাদা test): ' + lo + '-এর নিচে → ১, ' + hi + '-এর উপরে → ১, সংখ্যা-নয় → ১ = <b>৩টি test</b>।') + '</li>' +
          '<li>' + L('Counted: 1 + 3 = <b>4 minimum tests</b>.', 'গুনে: 1 + 3 = <b>ন্যূনতম ৪টি test</b>।') + '</li></ol>';
      } else {
        var cap = q.ep.cap, c = q.ep.cuts;
        var vtxt;
        if (c.length === 1) vtxt = '[0–' + c[0] + '] and [' + (c[0] + 1) + '–' + cap + ']';
        else vtxt = '[0–' + c[0] + '], [' + (c[0] + 1) + '–' + c[1] + '] and [' + (c[1] + 1) + '–' + cap + ']';
        steps += '<li>' + L('Valid partitions (different behaviour each): ' + vtxt + ' → <b>' + q.ep.valids + ' tests</b>.', 'Valid partition (আচরণে আলাদা): ' + vtxt + ' → <b>' + q.ep.valids + 'টি test</b>।') + '</li>' +
          '<li>' + L('Invalid partitions (each its OWN test): below 0 → 1, above ' + cap + ' → 1, non-numeric → 1 = <b>3 tests</b>.', 'Invalid partition (প্রতিটির নিজের আলাদা test): 0-এর নিচে → ১, ' + cap + '-এর উপরে → ১, সংখ্যা-নয় → ১ = <b>৩টি test</b>।') + '</li>' +
          '<li>' + L('Counted: ' + q.ep.valids + ' + 3 = <b>' + q.ep.ans + ' minimum tests</b>.', 'গুনে: ' + q.ep.valids + ' + 3 = <b>ন্যূনতম ' + q.ep.ans + 'টি test</b>।') + '</li></ol>';
      }
      return steps;
    }

    var promptBox, input, feed, sess;

    function render() {
      root.innerHTML = '';
      promptBox = el('div', 'drill-prompt', promptHTML());
      root.appendChild(promptBox);
      var ctr = el('div', 'drill-controls');
      input = el('input');
      input.setAttribute('type', 'text');
      input.setAttribute('aria-label', L('Your answer', 'তোমার উত্তর'));
      if (q.mode === 'c') input.setAttribute('placeholder', L('e.g. 6', 'যেমন 6'));
      else input.setAttribute('placeholder', L('e.g. 17, 18, 60, 61', 'যেমন 17, 18, 60, 61'));
      var check = button(L('Check', 'যাচাই'));
      check.addEventListener('click', checkAns);
      input.addEventListener('keydown', function (e) { if (e.key === 'Enter') checkAns(); });
      var news = button(L('New numbers ▸', 'নতুন সংখ্যা ▸'), true);
      news.addEventListener('click', gen);
      sess = sessionEl(ID);
      ctr.appendChild(input); ctr.appendChild(check); ctr.appendChild(news); ctr.appendChild(sess);
      root.appendChild(ctr);
      feed = el('div');
      root.appendChild(feed);
      input.focus();
    }

    function checkAns() {
      if (!input.value.trim()) return;
      var ans = answer();
      var ok;
      if (q.mode === 'c') {
        var n = parseNum(input.value);
        ok = n !== null && Math.abs(n - ans) < 0.001;
      } else {
        ok = sameSet(parseSet(input.value), ans);
      }
      record(ID, ok);
      refreshSession(ID);
      feed.innerHTML = '';
      feed.appendChild(verdict(ok,
        L('✓ Correct — ' + (q.mode === 'c' ? ans + ' tests' : ans.join(', ')), '✓ সঠিক — ' + (q.mode === 'c' ? ans + ' test' : ans.join(', '))),
        L('✗ Not the exam answer — here is the full recipe:', '✗ পরীক্ষার উত্তর এটা নয় — সম্পূর্ণ রেসিপি দেখো:')));
      feed.appendChild(solBox(solutionHTML()));
    }

    gen();
  })();

  /* ================================================================
     WIDGET 2 — coverage meter drill
     ================================================================ */
  (function widgetCOV() {
    var root = document.getElementById('drill-cov');
    if (!root) return;
    var ID = 'cov';
    var q = null;

    function gen() {
      var variant = pick([1, 2]);
      if (variant === 1) {
        var N = ri(10, 90);
        var nT = pick([1, 2]);
        var tests = [];
        for (var i = 0; i < nT; i++) {
          var above = Math.random() < 0.6;
          tests.push({ x: above ? N + ri(1, 25) : N - ri(1, 25) });
        }
        q = { v: 1, N: N, tests: tests, stmts: 4, branches: 2 };
      } else {
        var N2 = ri(10, 60), M2 = N2 + ri(10, 30);
        var nT2 = ri(1, 3);
        var tests2 = [];
        for (var j = 0; j < nT2; j++) {
          var combo = pick([['T', 'T'], ['T', 'F'], ['F', 'T']]);
          var xv;
          if (combo[0] === 'T' && combo[1] === 'T') xv = N2 + ri(1, M2 - N2 - 1);
          else if (combo[0] === 'T' && combo[1] === 'F') xv = M2 + ri(0, 25);
          else xv = N2 - ri(1, 20);
          tests2.push({ x: xv });
        }
        q = { v: 2, N: N2, M: M2, tests: tests2, stmts: 6, branches: 4 };
      }
      compute();
      render();
    }

    function compute() {
      var scov = [], bcov = [];
      q.tests.forEach(function (t) {
        var s, b;
        if (q.v === 1) {
          s = [1, 2, 4]; if (t.x > q.N) s.push(3);
          b = t.x > q.N ? ['D-T'] : ['D-F'];
        } else {
          s = [1, 2, 4, 6]; if (t.x > q.N) s.push(3); if (t.x < q.M) s.push(5);
          b = [];
          b.push(t.x > q.N ? 'D1-T' : 'D1-F');
          b.push(t.x < q.M ? 'D2-T' : 'D2-F');
        }
        scov.push(s); bcov.push(b);
      });
      var uniqS = [], uniqB = [];
      scov.forEach(function (a) { a.forEach(function (x) { if (uniqS.indexOf(x) < 0) uniqS.push(x); }); });
      bcov.forEach(function (a) { a.forEach(function (x) { if (uniqB.indexOf(x) < 0) uniqB.push(x); }); });
      q.perTestS = scov; q.perTestB = bcov;
      q.covS = pct(uniqS.length, q.stmts);
      q.covB = pct(uniqB.length, q.branches);
    }

    function snippetHTML() {
      if (q.v === 1) {
        return '<pre>1  read x\n2  if (x &gt; ' + q.N + '):        # decision D\n3      print("high")\n4  print("end")</pre>';
      }
      return '<pre>1  read x\n2  if (x &gt; ' + q.N + '):        # decision D1\n3      print("high")\n4  if (x &lt; ' + q.M + '):        # decision D2\n5      print("low")\n6  print("end")</pre>';
    }
    function promptHTML() {
      var t = 'Tests given: ' + q.tests.map(function (tt, i) { return 'Test ' + (i + 1) + ': x=' + tt.x; }).join(' · ') + '.';
      return snippetHTML() + '<p>' + t + '</p><p><b>' + L('What is the statement coverage % and the branch coverage % achieved by exactly these tests?', 'শুধু এই test-গুলোতে statement coverage কত % আর branch coverage কত %?') + '</b></p>';
    }

    function solutionHTML() {
      var rows = '';
      q.tests.forEach(function (tt, i) {
        rows += '<li>' + L('Test ' + (i + 1) + ' (x=' + tt.x + '): executes statements {' + q.perTestS[i].join(', ') + '} · takes {' + q.perTestB[i].join(', ') + '}',
                           'Test ' + (i + 1) + ' (x=' + tt.x + '): statement {' + q.perTestS[i].join(', ') + '} চালায় · {' + q.perTestB[i].join(', ') + '} নেয়') + '</li>';
      });
      var sU = [], bU = [];
      q.perTestS.forEach(function (a) { a.forEach(function (x) { if (sU.indexOf(x) < 0) sU.push(x); }); });
      q.perTestB.forEach(function (a) { a.forEach(function (x) { if (bU.indexOf(x) < 0) bU.push(x); }); });
      return '<ol class="steps">' + rows +
        '<li>' + L('Statements: ' + sU.length + ' of ' + q.stmts + ' executed → ' + sU.length + '/' + q.stmts + ' = <b>' + q.covS + '% statement coverage</b>.',
                   'Statement: ' + q.stmts + 'টির মধ্যে ' + sU.length + 'টি চলল → ' + sU.length + '/' + q.stmts + ' = <b>' + q.covS + '% statement coverage</b>।') + '</li>' +
        '<li>' + L('Branches: ' + bU.length + ' of ' + q.branches + ' decision outcomes taken → ' + bU.length + '/' + q.branches + ' = <b>' + q.covB + '% branch coverage</b>.',
                   'Branch: ' + q.branches + 'টির মধ্যে ' + bU.length + 'টি decision outcome নেওয়া হলো → ' + bU.length + '/' + q.branches + ' = <b>' + q.covB + '% branch coverage</b>।') + '</li>' +
        '<li>' + L('Theorem: <b>100% branch ⇒ 100% statement — never the reverse</b>. Coverage cannot detect missing functionality.',
                   'উপপাদ্য: <b>100% branch ⇒ 100% statement — কখনোই উল্টোটা নয়</b>। Coverage অনুপস্থিত functionality ধরতে পারে না।') + '</li>' +
        '</ol>';
    }

    var inS, inB, feed;

    function render() {
      root.innerHTML = '';
      root.appendChild(el('div', 'drill-prompt', promptHTML()));
      var ctr = el('div', 'drill-controls');
      inS = el('input'); inS.type = 'text'; inS.placeholder = L('statement %', 'statement %');
      inB = el('input'); inB.type = 'text'; inB.placeholder = L('branch %', 'branch %');
      var check = button(L('Check', 'যাচাই'));
      check.addEventListener('click', checkAns);
      var news = button(L('New numbers ▸', 'নতুন সংখ্যা ▸'), true);
      news.addEventListener('click', gen);
      ctr.appendChild(el('label', null, L('Statement %:', 'Statement %:')));
      ctr.appendChild(inS);
      ctr.appendChild(el('label', null, L('Branch %:', 'Branch %:')));
      ctr.appendChild(inB);
      ctr.appendChild(check); ctr.appendChild(news);
      ctr.appendChild(sessionEl(ID));
      root.appendChild(ctr);
      feed = el('div');
      root.appendChild(feed);
      inS.focus();
    }

    function checkAns() {
      if (!inS.value.trim() || !inB.value.trim()) return;
      var a = parseNum(inS.value), b = parseNum(inB.value);
      var ok = a !== null && b !== null && Math.abs(a - q.covS) < 0.05 && Math.abs(b - q.covB) < 0.05;
      record(ID, ok);
      refreshSession(ID);
      feed.innerHTML = '';
      feed.appendChild(verdict(ok,
        L('✓ Correct — statement ' + q.covS + '% · branch ' + q.covB + '%', '✓ সঠিক — statement ' + q.covS + '% · branch ' + q.covB + '%'),
        L('✗ Check the division again — here is every step:', '✗ ভাগটা আবার দেখো — এই নাও সব ধাপ:')));
      feed.appendChild(solBox(solutionHTML()));
    }

    gen();
  })();

  /* ================================================================
     WIDGET 3 — decision table count drill
     ================================================================ */
  (function widgetDT() {
    var root = document.getElementById('drill-dt');
    if (!root) return;
    var ID = 'dt';
    var q = null;

    var CONDS = [
      { name: 'Gold member', vals: ['Y', 'N'] },
      { name: 'Rush delivery', vals: ['Y', 'N'] },
      { name: 'Premium support', vals: ['Y', 'N'] },
      { name: 'VIP tier', vals: ['Bronze', 'Silver', 'Gold'] },
      { name: 'Order size', vals: ['S', 'M', 'L'] }
    ];
    var ACTIONS = ['20%', '5%', '10%', 'none', '15%', '0%', 'free ship', 'gift'];

    function gen() {
      var shape = pick([[2, 2], [2, 3], [2, 2, 2], [2, 2, 3]]);
      var chosen = [];
      var pool = CONDS.slice();
      shape.forEach(function (nv) {
        // pick a condition with that many values (binary ones are interchangeable)
        var idx = pool.findIndex(function (c) { return c.vals.length === nv; });
        if (idx < 0) idx = 0;
        chosen.push(pool.splice(idx, 1)[0]);
      });
      // all combos
      var combos = [];
      (function rec(i, cur) {
        if (i === chosen.length) { combos.push(cur.slice()); return; }
        chosen[i].vals.forEach(function (v) { cur.push(v); rec(i + 1, cur); cur.pop(); });
      })(0, []);
      var product = combos.length;
      var collapse = Math.random() < 0.65;
      var cCond = null, cVal = null, group = [];
      var actions;
      if (collapse) {
        // choose a binary condition; rules where cond=val share one action.
        // Non-group rules get distinct labels that also differ from `shared`,
        // so ONLY the stated group ever has identical actions.
        var bi = chosen.findIndex(function (c) { return c.vals.length === 2; });
        cCond = bi;
        cVal = chosen[bi].vals[ri(0, 1)];
        group = combos.map(function (c, i) { return c[bi] === cVal ? i : -1; }).filter(function (i) { return i >= 0; });
        var shared = pick(ACTIONS);
        var n = 0;
        actions = combos.map(function (c, i) {
          return group.indexOf(i) >= 0 ? shared : 'A' + (++n);
        });
      } else {
        // make all actions distinct so collapse is impossible
        actions = combos.map(function (c, i) { return 'A' + (i + 1); });
      }
      q = {
        conds: chosen, combos: combos, product: product, collapse: collapse,
        cCond: cCond, cVal: cVal, group: group, actions: actions,
        minTests: collapse ? product - group.length + 1 : product
      };
      render();
    }

    function promptHTML() {
      var cTxt = q.conds.map(function (c) { return c.name + ' (' + c.vals.join('/') + ')'; }).join(' · ');
      var col = '';
      if (q.collapse) {
        col = ' It is stated that: <b>rules where ' + q.conds[q.cCond].name + ' = ' + q.cVal + ' all have identical actions</b> (they collapse).';
      } else {
        col = ' Every rule has a <b>different</b> action.';
      }
      return L('Conditions: <b>' + cTxt + '</b>.' + col + '<br><b>How many full rules, and how many minimum tests after collapsing?</b>',
               'Condition: <b>' + cTxt + '</b>।' + (q.collapse
                 ? ' বলা হয়েছে: <b>যেসব rule-এ ' + q.conds[q.cCond].name + ' = ' + q.cVal + ', তাদের action একই</b> (ওরা collapse হবে)।'
                 : ' প্রতিটি rule-এর action <b>আলাদা</b>।') + '<br><b>পূর্ণ table-এ কতটি rule, আর collapse করার পরে ন্যূনতম কতটি test?</b>');
    }

    function tableHTML() {
      var head = '<thead><tr><th></th>';
      for (var i = 0; i < q.product; i++) head += '<th' + (q.group.indexOf(i) >= 0 ? ' class="dt-hl"' : '') + '>R' + (i + 1) + '</th>';
      head += '</tr></thead>';
      var rows = '';
      q.conds.forEach(function (c, ci) {
        rows += '<tr><td>' + c.name + '</td>';
        q.combos.forEach(function (cb, i) {
          rows += '<td' + (q.group.indexOf(i) >= 0 ? ' class="dt-hl"' : '') + '>' + cb[ci] + '</td>';
        });
        rows += '</tr>';
      });
      rows += '<tr><td><b>Action</b></td>';
      q.combos.forEach(function (cb, i) {
        rows += '<td' + (q.group.indexOf(i) >= 0 ? ' class="dt-hl"' : '') + '>' + q.actions[i] + '</td>';
      });
      rows += '</tr>';
      return '<table class="dt-mini good">' + head + '<tbody>' + rows + '</tbody></table>';
    }

    function solutionHTML() {
      var prodTxt = q.conds.map(function (c) { return c.vals.length; }).join(' × ') + ' = <b>' + q.product + ' full rules</b>';
      var steps = '<ol class="steps">' +
        '<li>' + L('Rule: full rules = <b>product of condition values</b>; collapse rules ONLY when actions are identical; minimum tests = collapsed rules.', 'নিয়ম: পূর্ণ rule = <b>condition মানের গুণফল</b>; শুধুমাত্র action একই হলে collapse; ন্যূনতম test = collapse-এর পরের rule সংখ্যা।') + '</li>' +
        '<li>' + L('Product: ' + prodTxt + '.', 'গুণফল: ' + prodTxt + '।') + '</li>';
      if (q.collapse) {
        steps += '<li>' + L('Collapse: the ' + q.group.length + ' highlighted rules (' + q.conds[q.cCond].name + ' = ' + q.cVal + ', other conditions = don\'t care "−") share one action → they merge into 1 rule.',
                            'Collapse: হাইলাইট করা ' + q.group.length + 'টি rule (' + q.conds[q.cCond].name + ' = ' + q.cVal + ', বাকি condition = don\'t care "−") একই action পায় → ওরা ১টি rule-এ মিশে যায়।') + '</li>' +
          '<li>' + L('Counted: ' + q.product + ' − ' + q.group.length + ' + 1 = <b>' + q.minTests + ' minimum tests</b>.', 'গুনে: ' + q.product + ' − ' + q.group.length + ' + 1 = <b>ন্যূনতম ' + q.minTests + 'টি test</b>।') + '</li></ol>';
      } else {
        steps += '<li>' + L('No two rules share an action → nothing collapses → minimum tests = full rules = <b>' + q.minTests + '</b>.', 'কোনো দুটি rule-এর action এক নয় → collapse হবে না → ন্যূনতম test = পূর্ণ rule = <b>' + q.minTests + '</b>।') + '</li></ol>';
      }
      return steps + tableHTML();
    }

    var inFull, inMin, feed;

    function render() {
      root.innerHTML = '';
      root.appendChild(el('div', 'drill-prompt', promptHTML()));
      var ctr = el('div', 'drill-controls');
      inFull = el('input'); inFull.type = 'text'; inFull.placeholder = L('full rules', 'পূর্ণ rule');
      inMin = el('input'); inMin.type = 'text'; inMin.placeholder = L('min tests', 'ন্যূনতম test');
      var check = button(L('Check', 'যাচাই'));
      check.addEventListener('click', checkAns);
      var news = button(L('New numbers ▸', 'নতুন সংখ্যা ▸'), true);
      news.addEventListener('click', gen);
      ctr.appendChild(el('label', null, L('Full rules:', 'পূর্ণ rule:')));
      ctr.appendChild(inFull);
      ctr.appendChild(el('label', null, L('Minimum tests:', 'ন্যূনতম test:')));
      ctr.appendChild(inMin);
      ctr.appendChild(check); ctr.appendChild(news);
      ctr.appendChild(sessionEl(ID));
      root.appendChild(ctr);
      feed = el('div');
      root.appendChild(feed);
      inFull.focus();
    }

    function checkAns() {
      if (!inFull.value.trim() || !inMin.value.trim()) return;
      var a = parseNum(inFull.value), b = parseNum(inMin.value);
      var ok = a !== null && b !== null && a === q.product && b === q.minTests;
      record(ID, ok);
      refreshSession(ID);
      feed.innerHTML = '';
      feed.appendChild(verdict(ok,
        L('✓ Correct — ' + q.product + ' full rules · ' + q.minTests + ' minimum tests', '✓ সঠিক — পূর্ণ rule ' + q.product + ' · ন্যূনতম ' + q.minTests + ' test'),
        L('✗ Count again — here is the table and the product:', '✗ আবার গুনো — টেবিল আর গুণফল এই নাও:')));
      feed.appendChild(solBox(solutionHTML()));
    }

    gen();
  })();

  /* ================================================================
     WIDGET 4 — state-machine stepper (music player)
     ================================================================ */
  (function widgetSM() {
    var root = document.getElementById('drill-sm');
    if (!root) return;
    var ID = 'sm';

    var STATES = {
      Idle:    { x: 105, y: 118 },
      Playing: { x: 340, y: 62 },
      Paused:  { x: 340, y: 190 }
    };
    // the 5 valid transitions (ch4 A6)
    var TRANS = [
      { id: 't1', from: 'Idle',    ev: 'Play',  to: 'Playing', label: 'Play: Idle → Playing' },
      { id: 't2', from: 'Paused',  ev: 'Play',  to: 'Playing', label: 'Play: Paused → Playing' },
      { id: 't3', from: 'Playing', ev: 'Pause', to: 'Paused',  label: 'Pause: Playing → Paused' },
      { id: 't4', from: 'Playing', ev: 'Stop',  to: 'Idle',    label: 'Stop: Playing → Idle' },
      { id: 't5', from: 'Paused',  ev: 'Stop',  to: 'Idle',    label: 'Stop: Paused → Idle' }
    ];
    var EVENTS = ['Play', 'Pause', 'Stop'];

    var cur = 'Idle';
    var covered = {};   // transition ids covered this session
    var invalidFound = 0;

    function svgHTML() {
      return '' +
      '<svg viewBox="0 0 460 250" role="img" aria-label="Music player state machine">' +
      '<defs><marker id="sm-arrowhead" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" style="fill:var(--ink-soft)"></path></marker></defs>' +
      // Idle -> Playing (Play)
      '<path class="sm-arrow" d="M 140 102 C 205 28, 265 30, 312 48"></path>' +
      '<text class="sm-arrow-label" x="200" y="26">Play</text>' +
      // Playing -> Idle (Stop)
      '<path class="sm-arrow" d="M 312 76 C 262 100, 200 104, 143 115"></path>' +
      '<text class="sm-arrow-label" x="212" y="112">Stop</text>' +
      // Paused -> Playing (Play)
      '<path class="sm-arrow" d="M 356 172 L 356 86"></path>' +
      '<text class="sm-arrow-label" x="364" y="132">Play</text>' +
      // Playing -> Paused (Pause)
      '<path class="sm-arrow" d="M 378 86 L 378 172"></path>' +
      '<text class="sm-arrow-label" x="326" y="132">Pause</text>' +
      // Paused -> Idle (Stop)
      '<path class="sm-arrow" d="M 302 200 C 235 224, 175 212, 140 136"></path>' +
      '<text class="sm-arrow-label" x="196" y="228">Stop</text>' +
      '<g class="sm-states">' +
      '<g id="stg-Idle"><circle class="st-c" cx="105" cy="118" r="40"></circle><text x="105" y="123" text-anchor="middle">Idle</text></g>' +
      '<g id="stg-Playing"><circle class="st-c" cx="340" cy="62" r="38"></circle><text x="340" y="67" text-anchor="middle">Playing</text></g>' +
      '<g id="stg-Paused"><circle class="st-c" cx="340" cy="190" r="36"></circle><text x="340" y="195" text-anchor="middle">Paused</text></g>' +
      '</g>' +
      '<g id="sm-dot" style="transform:translate(105px,118px)"><circle r="7"></circle></g>' +
      '</svg>';
    }

    var statusEl, checkEl, countEl;

    function nCovered() { return TRANS.filter(function (t) { return covered[t.id]; }).length; }

    function syncUI(animState) {
      // dot
      var dot = root.querySelector('#sm-dot');
      if (dot) {
        var p = STATES[cur];
        dot.style.transform = 'translate(' + p.x + 'px,' + p.y + 'px)';
      }
      // checklist
      if (checkEl) {
        checkEl.innerHTML = TRANS.map(function (t) {
          return '<li class="' + (covered[t.id] ? 'done' : '') + '" data-t="' + t.id + '">' + t.label + '</li>';
        }).join('');
      }
      if (statusEl) {
        var n = nCovered();
        statusEl.className = 'sm-status' + (n === 5 ? ' complete' : '');
        statusEl.textContent = n === 5
          ? L('0-switch complete ✓ — all 5 valid transitions covered', '0-switch সম্পূর্ণ ✓ — ৫টি valid transition-ই ঢাকা পড়েছে')
          : L(n + '/5 covered — 0-switch needs every valid transition once', n + '/5 ঢাকা পড়েছে — 0-switch-এর জন্য প্রতিটি valid transition অন্তত একবার দরকার');
      }
      if (countEl) {
        countEl.textContent = L('invalid pairs found: ' + invalidFound + ' (the machine has 4 illegal pairs: Stop-in-Idle, Play-in-Playing, Pause-in-Idle, Pause-in-Paused) · current state: ' + cur,
                                'invalid জোড়া পাওয়া গেছে: ' + invalidFound + ' (এই machine-এ ৪টি illegal জোড়া: Idle-এ Stop, Playing-এ Play, Idle-এ Pause, Paused-এ Pause) · বর্তমান state: ' + cur);
      }
    }

    function fire(ev) {
      var t = TRANS.filter(function (x) { return x.from === cur && x.ev === ev; })[0];
      var valid = !!t;
      record(ID, valid);
      refreshSession(ID);
      if (valid) {
        cur = t.to;
        covered[t.id] = true;
      } else {
        invalidFound++;
        var g = root.querySelector('#stg-' + cur);
        if (g) {
          g.classList.remove('sm-invalid');
          void g.getBoundingClientRect(); // restart animation
          g.classList.add('sm-invalid');
          setTimeout(function () { g.classList.remove('sm-invalid'); }, 500);
        }
      }
      syncUI();
    }

    function reset() {
      cur = 'Idle';
      covered = {};
      invalidFound = 0;
      syncUI();
    }

    (function render() {
      root.innerHTML = '';
      var wrap = el('div', 'sm-wrap');
      var svgBox = el('div', 'sm-svg', svgHTML());
      var side = el('div', 'sm-side');
      side.innerHTML = '<p style="font-size:.85rem;margin:4px 0">' +
        L('Fire an event. Valid transitions animate the dot; illegal (event, state) pairs shake red.', 'একটা event চালাও। Valid transition হলে dot সরে যায়; illegal (event, state) জোড়া লাল হয়ে কাঁপে।') + '</p>';
      statusEl = el('div', 'sm-status');
      checkEl = el('ul', 'sm-check');
      countEl = el('div', 'sm-count');
      var ctr = el('div', 'drill-controls');
      EVENTS.forEach(function (ev) {
        var b = button('▶ ' + ev);
        if (ev === 'Pause') b.textContent = '⏸ Pause';
        if (ev === 'Stop') b.textContent = '⏹ Stop';
        if (ev === 'Play') b.textContent = '▶ Play';
        b.addEventListener('click', function () { fire(ev); });
        ctr.appendChild(b);
      });
      var rs = button(L('↺ Reset', '↺ রিসেট'), true);
      rs.addEventListener('click', reset);
      ctr.appendChild(rs);
      ctr.appendChild(sessionEl(ID));
      side.appendChild(statusEl); side.appendChild(checkEl); side.appendChild(countEl);
      side.appendChild(ctr);
      wrap.appendChild(svgBox); wrap.appendChild(side);
      root.appendChild(wrap);
      syncUI();
    })();
  })();

})();
