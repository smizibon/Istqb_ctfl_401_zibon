// CTFL Prep progress engine — per-chapter + total progress, persisted in localStorage.
// Contract: <body data-ch="ch5"> … <div id="chapter-progress"></div> inside/near the hero.
// Sections get an injected read-toggle; quiz progress is persisted as a snapshot
// (incl. a per-question results array) and rehydrated into the DOM on page load,
// so the chapter bar and the hub dashboard always agree. Index page:
// <div id="total-progress"> and body WITHOUT data-ch renders the dashboard for ch1..ch6.
(function () {
  var KEY = 'ctflg-progress-v1';
  var CHAPTERS = [
    { id: 'ch1', name: 'Ch 1 — Fundamentals', file: 'chapter-01.html' },
    { id: 'ch2', name: 'Ch 2 — Testing in the SDLC', file: 'chapter-02.html' },
    { id: 'ch3', name: 'Ch 3 — Static Testing', file: 'chapter-03.html' },
    { id: 'ch4', name: 'Ch 4 — Test Techniques (K3)', file: 'chapter-04.html' },
    { id: 'ch5', name: 'Ch 5 — Test Management', file: 'chapter-05.html' },
    { id: 'ch6', name: 'Ch 6 — Test Tools', file: 'chapter-06.html' }
  ];
  function load() { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; } }
  function save(d) { try { localStorage.setItem(KEY, JSON.stringify(d)); } catch (e) {} }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]; }); }

  function bar(pct, cls) {
    return '<div class="pbar"><div class="pfill ' + (cls || '') + '" style="width:' + Math.round(pct) + '%"></div></div>';
  }
  var chId = document.body.getAttribute('data-ch');
  var data = load();

  if (chId) {
    // ---- chapter page: read toggles + live chapter bar ----
    if (!data[chId]) data[chId] = { read: [] };
    if (!data[chId].read) data[chId].read = [];
    var host = document.getElementById('chapter-progress');
    var sections = document.querySelectorAll('main section');

    sections.forEach(function (sec, i) {
      var id = 's' + i;
      var h2 = sec.querySelector('h2');
      if (!h2) return;
      var btn = document.createElement('button');
      btn.className = 'read-toggle' + (data[chId].read.indexOf(id) >= 0 ? ' on' : '');
      btn.textContent = data[chId].read.indexOf(id) >= 0 ? (window.t ? t('read','✓ Read') : '✓ Read') : (window.t ? t('markRead','Mark read') : 'Mark read');
      btn.addEventListener('click', function () {
        var idx = data[chId].read.indexOf(id);
        if (idx >= 0) { data[chId].read.splice(idx, 1); btn.classList.remove('on'); btn.textContent = window.t ? t('markRead','Mark read') : 'Mark read'; }
        else { data[chId].read.push(id); btn.classList.add('on'); btn.textContent = window.t ? t('read','✓ Read') : '✓ Read'; }
        // marking read implies having seen the content — open the section too
        if (sec.classList.contains('closed')) sec.classList.remove('closed');
        save(data); render();
      });
      h2.appendChild(btn);
      sec.setAttribute('data-sid', id);
    });

    // Rehydrate quiz state from the stored snapshot so the chapter bar and
    // the hub dashboard agree after a reload. If the snapshot carries a
    // per-question results array, mark exactly; older snapshots (no results)
    // fall back to just marking the first N questions answered.
    (function rehydrate() {
      var snap = (load()[chId] || {}).quiz;
      if (!snap || !snap.answered) return;
      var qs = document.querySelectorAll('.quiz .q');
      for (var i = 0; i < qs.length; i++) {
        var r = snap.results && snap.results.length > i ? snap.results[i] : undefined;
        var legacy = !snap.results && i < snap.answered; // old snapshots: first-N answered, correctness unknown
        var picks = Array.isArray(r) ? r : (r === true || r === false || legacy ? null : undefined);
        if (picks === undefined && !legacy) continue;
        var q = qs[i];
        q.classList.add('answered');
        var btns = q.querySelectorAll('button');
        btns.forEach(function (b) { b.disabled = true; });
        var ansStr = q.getAttribute('data-a') || '';
        btns.forEach(function (b) {
          if (ansStr.indexOf(b.getAttribute('data-k')) >= 0) b.classList.add('correct');
        });
        if (picks) picks.forEach(function (pk) {
          if (ansStr.indexOf(pk) < 0) {
            var pb = q.querySelector('button[data-k="' + pk + '"]');
            if (pb) pb.classList.add('wrong');
          }
        });
      }
      refreshScorebars();
    })();

    // quiz.js builds its sticky scorebar at load with zeroed counters; after
    // rehydration its closure counters are stale — recompute the DOM directly.
    function refreshScorebars() {
      document.querySelectorAll('.quiz').forEach(function (quiz) {
        var sbar = quiz.querySelector('.scorebar');
        if (!sbar) return;
        var qs = quiz.querySelectorAll('.q'), a = 0, c = 0;
        qs.forEach(function (q) {
          if (q.classList.contains('answered')) { a++; if (q.querySelector('button.correct')) c++; }
        });
        var done = sbar.querySelector('.done'), ok = sbar.querySelector('.ok');
        if (done) done.textContent = a;
        if (ok) ok.textContent = c;
        var msg = sbar.querySelector('.msg'), target = parseInt(quiz.getAttribute('data-target') || '0', 10);
        if (msg && target && a === qs.length && a > 0) {
          msg.textContent = c >= target
            ? '✅ ' + c + '/' + qs.length + ' — target met'
            : '🔁 ' + c + '/' + qs.length + ' — below target ' + target + '. Review the explanations under each miss, then ↺ Reset quiz to redo.';
        }
      });
    }

    function quizState() {
      var qs = document.querySelectorAll('.quiz .q');
      var answered = document.querySelectorAll('.quiz .q.answered').length;
      var correct = 0;
      document.querySelectorAll('.quiz .q.answered').forEach(function (q) {
        if (q.querySelector('button.correct')) correct++;
      });
      // aggregate across ALL quizzes on the page (e.g. ch4 Part B + Part C)
      var target = 0;
      document.querySelectorAll('.quiz').forEach(function (qz) {
        target += parseInt(qz.getAttribute('data-target') || '0', 10);
      });
      return { total: qs.length, answered: answered, correct: correct, target: target };
    }
    function render() {
      if (!host) return;
      var q = quizState();
      var nSec = document.querySelectorAll('main section[data-sid]').length;
      var nRead = data[chId].read.length;
      var readPct = nSec ? (nRead / nSec) * 100 : 0;
      var quizPct = q.total ? (q.answered / q.total) * 100 : 0;
      var overall = nSec + q.total ? ((nRead + q.answered) / (nSec + q.total)) * 100 : 0;
      var cls = q.target && q.answered === q.total && q.correct >= q.target ? 'good' : '';
      host.innerHTML =
        '<div class="cp-head">' + (window.t ? t('chapterProgress','Chapter progress') : 'Chapter progress') + ' — <b>' + Math.round(overall) + '%</b></div>' + bar(overall, cls) +
        '<div class="cp-detail">Reading: ' + nRead + '/' + nSec + ' sections · Quiz: ' + q.answered + '/' + q.total +
        ' ' + (window.t ? t('answered','answered') : 'answered') + ', <b>' + q.correct + ' ' + (window.t ? t('correct','correct') : 'correct') + '</b>' + (q.target ? ' (target ' + q.target + ')' : '') +
        (q.target && q.answered === q.total
          ? (q.correct >= q.target ? ' · ✅ ' + (window.t ? t('quizTargetMet','quiz target met — chapter done') : 'quiz target met — chapter done') : ' · 🔁 ' + (window.t ? t('quizBelow','below target — review misses, then reset the quiz to redo') : 'below target — review misses, then reset the quiz to redo'))
          : '') + '</div>';
    }
    document.addEventListener('click', function () { setTimeout(render, 50); });
    render();
  }

  // ---- index page: total dashboard ----
  var total = document.getElementById('total-progress');
  if (total && !chId) {
    var rows = '', doneCh = 0, agg = { r: 0, rs: 0, a: 0, q: 0 };
    CHAPTERS.forEach(function (c) {
      var d = load()[c.id] || { read: [] };
      var nSec = 0;
      // sections can only be known on chapter pages; use stored count if present
      nSec = d.nSec || 0;
      var quiz = d.quiz || null;
      agg.r += (d.read || []).length; agg.rs += nSec;
      if (quiz) { agg.a += Math.min(quiz.answered, quiz.total); agg.q += quiz.total; }
      var pct = 0;
      if (nSec + (quiz ? quiz.total : 0) > 0)
        pct = (((d.read || []).length + (quiz ? Math.min(quiz.answered, quiz.total) : 0)) / (nSec + (quiz ? quiz.total : 0))) * 100;
      if (pct >= 100) doneCh++;
      rows += '<tr><td><a class="plink" href="' + c.file + '">' + esc(c.name) + ' →</a></td><td style="min-width:140px">' + bar(pct, pct >= 100 ? 'good' : '') +
        '</td><td>' + Math.round(pct) + '%</td><td>' + (quiz ? quiz.correct + '/' + quiz.total + (quiz.target ? ' (target ' + quiz.target + ')' : '') : '—') + '</td></tr>';
    });
    var totalPct = (agg.rs + agg.q) > 0 ? ((agg.r + agg.a) / (agg.rs + agg.q)) * 100 : 0;
    total.innerHTML = '<h2 style="color:#fff;border:none;margin:0 0 6px">' + (window.t ? t('totalProgress','Total progress') : 'Total progress') + ' — ' + Math.round(totalPct) + '%</h2>' +
      bar(totalPct, 'big') +
      '<table class="ptable"><thead><tr><th>' + (window.t ? t('thChapter','Chapter') : 'Chapter') + '</th><th>' + (window.t ? t('thProgress','Progress') : 'Progress') + '</th><th>%</th><th>' + (window.t ? t('thQuiz','Quiz score (target)') : 'Quiz score (target)') + '</th></tr></thead><tbody>' + rows + '</tbody></table>' +
      '<div class="cp-detail">' + (totalPct === 0 ? (window.t ? t('startCaption','Nothing yet — start with Ch 2 and your progress appears here.') : 'Nothing yet — start with Ch 2 and your progress appears here.') : doneCh + '/6 ' + (window.t ? t('completeCaption','chapters complete · complete = all sections read + every quiz question answered') : 'chapters complete · complete = all sections read + every quiz question answered')) + '</div>';
  }

  // ---- persistence: quiz snapshots (written once at load AND after each answer) ----
  function writeSnapshot() {
    if (!chId) return;
    var d = load();
    if (!d[chId]) d[chId] = { read: [] };
    var qs = document.querySelectorAll('.quiz .q');
    var answered = 0, correct = 0;
    var results = new Array(qs.length).fill(null); // position-indexed; null = unanswered
    qs.forEach(function (q, i) {
      if (!q.classList.contains('answered')) return;
      answered++;
      if (q.querySelector('button.correct')) correct++;
      // remember WHAT was picked, so a reload can show the wrong choice too
      var picks = [];
      var wrongBtn = q.querySelector('button.wrong');
      var ansStr2 = q.getAttribute('data-a') || '';
      if (wrongBtn) picks.push(wrongBtn.getAttribute('data-k'));
      q.querySelectorAll('button.picked').forEach(function (b) {
        var k = b.getAttribute('data-k');
        if (picks.indexOf(k) < 0 && ansStr2.indexOf(k) < 0) picks.push(k);
      });
      if (!picks.length) picks = ansStr2.split('');
      results[i] = picks;
    });
    var target = 0;
    document.querySelectorAll('.quiz').forEach(function (qz) { target += parseInt(qz.getAttribute('data-target') || '0', 10); });
    d[chId].nSec = document.querySelectorAll('main section[data-sid]').length;
    d[chId].quiz = { answered: answered, correct: correct, total: qs.length, target: target, results: results };
    save(d);
  }
  writeSnapshot(); // visited-but-never-clicked chapters still persist a snapshot
  document.addEventListener('click', function () {
    if (!chId) return;
    setTimeout(writeSnapshot, 60);
  });
})();
