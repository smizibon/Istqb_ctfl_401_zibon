// CTFL Prep quiz engine — retrieval practice with instant feedback (testing effect).
// Single-select: <div class="q" data-a="b"> … <button data-k="a">…
// Multi-select:  <div class="q" data-a="ae"> (letters sorted, N = length); clicking
//               toggles picks; auto-graded when N picks are made; exact set match required.
// Counters are derived from the DOM on every update, so externally rehydrated state
// (progress.js) is always reflected correctly. A "Reset quiz" control lives in the scorebar.
document.querySelectorAll('.quiz').forEach(function (quiz) {
  var qs = quiz.querySelectorAll('.q');
  var target = parseInt(quiz.getAttribute('data-target') || '0', 10);
  var bar = document.createElement('div');
  bar.className = 'scorebar';
  bar.innerHTML = '<span>' + (window.t ? t('answered','Answered') : 'Answered') + ' <b class="done">0</b> / ' + qs.length +
    ' · ' + (window.t ? t('correct','Correct') : 'Correct') + ' <b class="ok">0</b></span><span class="msg"></span>' +
    '<button class="quiz-reset" title="Clear all answers in this quiz and start over">' + (window.t ? t('resetQuiz','↺ Reset quiz') : '↺ Reset quiz') + '</button>';
  function state() {
    var answered = 0, correct = 0;
    qs.forEach(function (q) {
      if (!q.classList.contains('answered')) return;
      answered++;
      if (q.querySelector('button.correct')) correct++;
    });
    return { answered: answered, correct: correct };
  }
  function update() {
    var s = state();
    bar.querySelector('.done').textContent = s.answered;
    bar.querySelector('.ok').textContent = s.correct;
    var msg = bar.querySelector('.msg');
    if (s.answered < qs.length) {
      msg.textContent = target ? ((window.t ? t('target','Target') : 'Target') + ': ' + target + '/' + qs.length) : '';
    } else if (target) {
      msg.textContent = s.correct >= target
        ? '✅ ' + s.correct + '/' + qs.length + ' — ' + (window.t ? t('targetMet','target met') : 'target met')
        : '🔁 ' + s.correct + '/' + qs.length + ' — ' + (window.t ? t('belowTarget','below target') : 'below target') + ' ' + target + (window.t ? t('reviewThen','. Review the explanations under each miss, then ↺ Reset quiz to redo.') : '. Review the explanations under each miss, then ↺ Reset quiz to redo.');
    } else {
      msg.textContent = 'Done: ' + s.correct + '/' + qs.length;
    }
  }
  bar.querySelector('.quiz-reset').addEventListener('click', function () {
    qs.forEach(function (q) {
      q.classList.remove('answered');
      q.querySelectorAll('button').forEach(function (b) {
        b.disabled = false;
        b.classList.remove('correct', 'wrong', 'picked');
      });
    });
    update();
  });
  update();
  qs.forEach(function (q) {
    var ansStr = q.getAttribute('data-a') || '';
    var correctSet = ansStr.split('').sort();
    var multi = correctSet.length > 1;
    if (multi && !q.querySelector('.multi-hint')) {
      var h = document.createElement('p');
      h.className = 'multi-hint';
      h.textContent = 'Select ' + correctSet.length + ' — click ' + correctSet.length + ' options, auto-graded';
      q.insertBefore(h, q.querySelector('.opts'));
    }
    var picked = [];
    function finish(pickSet) {
      q.classList.add('answered');
      q.querySelectorAll('button').forEach(function (b) { b.disabled = true; });
      q.querySelectorAll('button').forEach(function (b) {
        if (correctSet.indexOf(b.getAttribute('data-k')) >= 0) b.classList.add('correct');
      });
      var ok = !multi ? (pickSet[0] === correctSet[0]) :
        pickSet.length === correctSet.length && pickSet.every(function (k) { return correctSet.indexOf(k) >= 0; });
      // mark EVERY wrong pick red (not just the last one)
      pickSet.forEach(function (pk) {
        if (correctSet.indexOf(pk) < 0) {
          var pb = q.querySelector('button[data-k="' + pk + '"]');
          if (pb) pb.classList.add('wrong');
        }
      });
      update();
    }
    q.querySelectorAll('button').forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (q.classList.contains('answered')) return;
        var k = btn.getAttribute('data-k');
        if (!multi) { finish([k]); return; }
        var idx = picked.indexOf(k);
        if (idx >= 0) { picked.splice(idx, 1); btn.classList.remove('picked'); }
        else if (picked.length < correctSet.length) { picked.push(k); btn.classList.add('picked'); }
        if (picked.length === correctSet.length) finish(picked.slice().sort());
      });
    });
  });
  quiz.appendChild(bar);
});

// Provenance badge on every question: body[data-provenance="official"|"original"]
document.querySelectorAll('.quiz .q').forEach(function (q) {
  var prov = document.body.getAttribute('data-provenance');
  if (!prov) return;
  var badge = document.createElement('p');
  badge.className = 'pbad ' + prov;
  badge.textContent = prov === 'official'
    ? '★ OFFICIAL — ISTQB sample exam question'
    : '◆ ORIGINAL — written for this site (not an ISTQB question)';
  q.insertBefore(badge, q.firstChild);
});
