/* =====================================================================
   YAN EPIFANIO — "Orçamento em 2 minutos": 3 perguntas e a mensagem
   pronta para o WhatsApp (número em data-whats do #quiz).
   ===================================================================== */
(function () {
  'use strict';

  var quiz = document.getElementById('quiz');
  var whats = quiz.getAttribute('data-whats') || '';
  var panels = Array.prototype.slice.call(quiz.querySelectorAll('.quiz__panel'));
  var steps = Array.prototype.slice.call(quiz.querySelectorAll('.quiz__step'));
  var back = document.getElementById('quiz-back');
  var next = document.getElementById('quiz-next');
  var send = document.getElementById('quiz-send');
  var nameIn = document.getElementById('quiz-name');
  var handleIn = document.getElementById('quiz-handle');
  var preview = document.getElementById('quiz-preview');

  var state = { step: 1, goal: '', niche: '', deadline: '', name: '', handle: '' };

  /* ---------- escolhas (cards e chips) ---------- */
  quiz.querySelectorAll('[data-pick]').forEach(function (group) {
    var key = group.getAttribute('data-pick');
    group.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-value]');
      if (!btn) return;
      state[key] = btn.getAttribute('data-value');
      group.querySelectorAll('[data-value]').forEach(function (b) {
        b.setAttribute('aria-pressed', b === btn ? 'true' : 'false');
      });
      render();
    });
  });

  nameIn.addEventListener('input', function () { state.name = nameIn.value.trim(); render(); });
  handleIn.addEventListener('input', function () { state.handle = handleIn.value.trim(); render(); });

  /* ---------- navegação ---------- */
  function canNext() {
    if (state.step === 1) return !!state.goal;
    if (state.step === 2) return !!(state.niche && state.deadline);
    return false;
  }
  next.addEventListener('click', function () {
    if (!canNext()) return;
    state.step += 1;
    render();
    if (state.step === 3) nameIn.focus();
  });
  back.addEventListener('click', function () {
    if (state.step <= 1) return;
    state.step -= 1;
    render();
  });

  /* ---------- mensagem ---------- */
  function message() {
    return 'Olá, Yan! Sou ' + (state.name || '[nome]') + (state.handle ? ' (' + state.handle + ')' : '') + '.' +
      '\nObjetivo: ' + (state.goal || '[objetivo]') +
      '\nSegmento: ' + (state.niche || '[segmento]') +
      '\nPrazo: ' + (state.deadline || '[prazo]') +
      '\nPode me mandar um orçamento?';
  }

  function render() {
    panels.forEach(function (p) { p.hidden = +p.getAttribute('data-panel') !== state.step; });
    steps.forEach(function (s) {
      var n = +s.getAttribute('data-step');
      s.classList.toggle('is-current', n === state.step);
      s.classList.toggle('is-done', n < state.step);
      s.querySelector('.quiz__step-num').textContent = n < state.step ? '✓' : String(n);
      if (n === state.step) s.setAttribute('aria-current', 'step'); else s.removeAttribute('aria-current');
    });
    back.disabled = state.step === 1;
    next.hidden = state.step === 3;
    next.disabled = !canNext();
    send.hidden = state.step !== 3;
    var msg = message();
    if (preview.textContent !== msg) {
      preview.textContent = msg;
      preview.classList.remove('is-updated');
      void preview.offsetWidth;
      preview.classList.add('is-updated');
    }
    send.href = 'https://wa.me/' + whats + '?text=' + encodeURIComponent(msg);
  }

  render();
})();
