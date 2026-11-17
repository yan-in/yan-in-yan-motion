/* =====================================================================
   YAN EPIFANIO — home.
   Header, menu mobile, rolagem para âncoras, link ativo, revelação (.rv),
   acordeão e barra fixa de ações.
   ===================================================================== */
(function () {
  'use strict';

  var header = document.getElementById('header');
  var burger = document.getElementById('burger');
  var nav = document.getElementById('nav');
  var buybar = document.getElementById('buybar');
  var links = Array.prototype.slice.call(nav.querySelectorAll('.header__link'));
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- header: sombra ao rolar; recolhe ao descer, volta ao subir ---------- */
  var lastY = window.scrollY;
  function updateBuybar() {
    if (!buybar) return;
    buybar.classList.toggle('is-hidden', window.scrollY < 240 || header.classList.contains('is-open'));
  }

  function onScroll() {
    var y = window.scrollY;
    header.classList.toggle('is-solid', y > 30);
    var down = y > lastY + 4, up = y < lastY - 4;
    if (down && y > 240 && !header.classList.contains('is-open')) header.classList.add('is-hidden');
    else if (up || y <= 240) header.classList.remove('is-hidden');
    updateBuybar();
    if (down || up) lastY = y;
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- menu mobile ---------- */
  links.forEach(function (link, i) { link.style.setProperty('--i', (0.08 + i * 0.06) + 's'); });

  function setMenu(open) {
    header.classList.toggle('is-open', open);
    document.body.classList.toggle('no-scroll', open);
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    burger.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    updateBuybar();
    if (open) header.classList.remove('is-hidden');
  }
  burger.addEventListener('click', function () { setMenu(!header.classList.contains('is-open')); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });
  window.addEventListener('resize', function () { if (window.innerWidth >= 900) setMenu(false); });

  /* ---------- rolagem animada para as âncoras ---------- */
  function easeInOutCubic(t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }

  function scrollToTarget(target) {
    var headerH = header.offsetHeight;
    var startY = window.scrollY;
    var endY = target.getBoundingClientRect().top + startY - (headerH - 16);
    var maxY = document.documentElement.scrollHeight - window.innerHeight;
    endY = Math.max(0, Math.min(endY, maxY));
    var dist = endY - startY;
    if (reduceMotion || Math.abs(dist) < 2) { window.scrollTo(0, endY); return; }
    var duration = Math.min(1200, 400 + Math.abs(dist) * 0.2);
    var t0 = null;
    function step(ts) {
      if (t0 === null) t0 = ts;
      var p = Math.min(1, (ts - t0) / duration);
      window.scrollTo(0, startY + dist * easeInOutCubic(p));
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href^="#"]');
    if (!a) return;
    var id = a.getAttribute('href').slice(1);
    if (!id) return;
    var target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    var wasOpen = header.classList.contains('is-open');
    setMenu(false);
    if (history.pushState) history.pushState(null, '', '#' + id);
    setTimeout(function () { scrollToTarget(target); }, wasOpen ? 120 : 0);
  });

  /* ---------- títulos palavra por palavra (.words) ---------- */
  function splitWords(el) {
    var i = 0;
    var walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null);
    var nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(function (node) {
      if (!node.nodeValue.trim()) return;
      var frag = document.createDocumentFragment();
      node.nodeValue.split(/(\s+)/).forEach(function (part) {
        if (!part) return;
        if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
        var w = document.createElement('span');
        w.className = 'w';
        w.style.setProperty('--i', i++);
        w.textContent = part;
        frag.appendChild(w);
      });
      node.parentNode.replaceChild(frag, node);
    });
  }
  document.querySelectorAll('.words').forEach(splitWords);

  /* ---------- números que contam ao aparecer ---------- */
  function countUp(el) {
    var m = el.textContent.match(/^(\D*)(\d+)(\D*)$/);
    if (!m || reduceMotion) return;
    var target = +m[2], t0 = null, dur = 1400;
    function step(ts) {
      if (t0 === null) t0 = ts;
      var p = Math.min(1, (ts - t0) / dur);
      var e = 1 - Math.pow(1 - p, 3);
      el.textContent = m[1] + Math.round(target * e) + m[3];
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  /* ---------- link ativo + revelação ao rolar ---------- */
  var sections = Array.prototype.slice.call(document.querySelectorAll('main section[id]'));
  if ('IntersectionObserver' in window) {
    var activeObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var id = entry.target.id;
        links.forEach(function (l) { l.classList.toggle('is-active', l.getAttribute('href') === '#' + id); });
      });
    }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });
    sections.forEach(function (s) { activeObs.observe(s); });

    var revealObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        entry.target.querySelectorAll('[data-count]').forEach(countUp);
        if (entry.target.hasAttribute('data-count')) countUp(entry.target);
        revealObs.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -4% 0px', threshold: 0.01 });
    document.querySelectorAll('.rv, .words').forEach(function (el) { revealObs.observe(el); });
  } else {
    document.querySelectorAll('.rv, .words').forEach(function (el) { el.classList.add('is-in'); });
  }

  /* ---------- parallax suave no hero (mouse, desktop) ---------- */
  var hero = document.querySelector('.hero');
  var reels = document.querySelector('.hero__reels');
  var heroText = document.querySelector('.hero__text');
  if (hero && reels && !reduceMotion && window.matchMedia('(hover: hover)').matches) {
    var px = 0, py = 0, tx = 0, ty = 0, raf = null;
    hero.addEventListener('mousemove', function (e) {
      var r = hero.getBoundingClientRect();
      tx = (e.clientX - r.left) / r.width - 0.5;
      ty = (e.clientY - r.top) / r.height - 0.5;
      if (!raf) raf = requestAnimationFrame(tick);
    });
    hero.addEventListener('mouseleave', function () { tx = 0; ty = 0; if (!raf) raf = requestAnimationFrame(tick); });
    function tick() {
      px += (tx - px) * 0.08; py += (ty - py) * 0.08;
      if (window.innerWidth >= 900) {
        reels.style.translate = (px * 22) + 'px ' + (py * 16) + 'px';
        reels.style.rotate = (px * 2) + 'deg';
        heroText.style.translate = (px * -8) + 'px ' + (py * -6) + 'px';
      } else {
        reels.style.translate = ''; reels.style.rotate = ''; heroText.style.translate = '';
      }
      raf = (Math.abs(tx - px) > 0.001 || Math.abs(ty - py) > 0.001) ? requestAnimationFrame(tick) : null;
    }
  }

  /* ---------- filtro dos cases ---------- */
  var filters = document.getElementById('filters');
  var cases = Array.prototype.slice.call(document.querySelectorAll('#cases-grid .case'));
  var empty = document.getElementById('cases-empty');
  if (filters) {
    filters.addEventListener('click', function (e) {
      var btn = e.target.closest('.chip');
      if (!btn) return;
      var cat = btn.getAttribute('data-filter');
      filters.querySelectorAll('.chip').forEach(function (c) { c.setAttribute('aria-pressed', c === btn ? 'true' : 'false'); });
      var shown = 0;
      cases.forEach(function (c) {
        var show = cat === 'todos' || c.getAttribute('data-cat') === cat;
        c.hidden = !show;
        c.classList.remove('case--in');
        if (show) {
          c.classList.add('is-in');
          void c.offsetWidth; // reinicia a animação
          c.style.setProperty('--d', (shown * 0.07).toFixed(2) + 's');
          c.classList.add('case--in');
          shown++;
        }
      });
      if (empty) empty.hidden = shown > 0;
    });
  }

  /* ---------- acordeão "Dúvidas rápidas" ---------- */
  var items = document.querySelectorAll('.accordion__item');
  items.forEach(function (item) {
    var btn = item.querySelector('.accordion__title');
    btn.addEventListener('click', function () {
      var open = item.classList.contains('is-open');
      items.forEach(function (other) {
        other.classList.remove('is-open');
        other.querySelector('.accordion__title').setAttribute('aria-expanded', 'false');
      });
      if (!open) { item.classList.add('is-open'); btn.setAttribute('aria-expanded', 'true'); }
    });
  });

  /* ---------- checkout Pix ---------- */
  var pixForm = document.getElementById('pix-form');
  if (pixForm) {
    var pixService = document.getElementById('pix-servico');
    var customAmountField = document.getElementById('pix-custom-field');
    var customAmount = document.getElementById('pix-custom-amount');
    var pixSubmit = document.getElementById('pix-submit');
    var pixStatus = document.getElementById('pix-status');

    document.querySelectorAll('[data-pix-plan]').forEach(function (link) {
      link.addEventListener('click', function () {
        pixService.value = link.getAttribute('data-pix-plan');
        pixService.dispatchEvent(new Event('change'));
      });
    });

    function showPixStatus(message, isError) {
      pixStatus.textContent = message;
      pixStatus.classList.toggle('is-error', isError);
      pixStatus.hidden = false;
    }

    pixService.addEventListener('change', function () {
      var isCustom = pixService.value === 'custom';
      customAmountField.hidden = !isCustom;
      customAmount.required = isCustom;
      pixStatus.hidden = true;
      if (isCustom) customAmount.focus();
    });

    pixForm.addEventListener('submit', async function (e) {
      e.preventDefault();
      var isCustom = pixService.value === 'custom';
      var amount = isCustom ? Number(customAmount.value) : Number(pixService.value);
      if (!Number.isFinite(amount) || amount < 50) {
        showPixStatus('O valor mínimo para gerar o Pix é R$ 50,00.', true);
        if (isCustom) customAmount.focus();
        return;
      }

      var option = pixService.options[pixService.selectedIndex];
      var description = isCustom ? 'Sinal de projeto — Yan Epifanio' : option.textContent.trim();
      pixSubmit.disabled = true;
      pixSubmit.textContent = 'Gerando Pix…';
      pixStatus.hidden = true;

      try {
        var response = await fetch('https://mercado-pago-api.yan-dossantos-543.workers.dev/create_preference', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            amount: amount,
            descricao: description + ' (Yan Epifanio)'
          })
        });
        var raw = await response.text();
        var data = null;
        try { data = JSON.parse(raw); } catch (parseError) { /* report the server response below */ }

        if (!response.ok) {
          throw new Error((data && (data.error || data.message)) || raw || 'Erro ao criar checkout.');
        }
        if (!data || !data.redirect_url) {
          throw new Error('O checkout não retornou um endereço de pagamento.');
        }

        var redirectUrl = new URL(data.redirect_url);
        if (redirectUrl.protocol !== 'https:') {
          throw new Error('O endereço de pagamento recebido não é seguro.');
        }
        window.location.assign(redirectUrl.href);
      } catch (error) {
        console.error('Erro ao gerar Pix:', error);
        showPixStatus('Não foi possível gerar o Pix. ' + error.message, true);
        pixSubmit.disabled = false;
        pixSubmit.textContent = 'Tentar novamente';
      }
    });
  }
})();
