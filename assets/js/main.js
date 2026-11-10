/* AX-Channels® — interactions (vanilla, no build step) */
(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));

  /* ---------- Header state ---------- */
  const header = $('.site-header');
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 24);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Mobile menu ---------- */
  const toggle = $('.menu-toggle');
  const menu = $('#mobile-menu');
  if (toggle && menu) {
    const setOpen = (open) => {
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      menu.hidden = !open;
      header.classList.toggle('is-scrolled', open || window.scrollY > 24);
    };
    toggle.addEventListener('click', () => setOpen(menu.hidden));
    $$('a', menu).forEach((a) => a.addEventListener('click', () => setOpen(false)));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !menu.hidden) { setOpen(false); toggle.focus(); } });
  }

  /* ---------- Active nav link (scroll spy) ---------- */
  const navLinks = $$('.nav-link');
  const sections = navLinks
    .map((a) => a.getAttribute('href'))
    .filter((h) => h && h.startsWith('#') && h.length > 1)
    .map((h) => $(h)).filter(Boolean);
  if ('IntersectionObserver' in window && sections.length) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        navLinks.forEach((a) => {
          const h = a.getAttribute('href');
          if (h && h.startsWith('#')) a.classList.toggle('is-active', h === '#' + en.target.id);
        });
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    sections.forEach((s) => spy.observe(s));
  }

  /* ---------- Reveal on scroll ---------- */
  const reveals = $$('.reveal');
  if (reduceMotion.matches || !('IntersectionObserver' in window)) {
    reveals.forEach((el) => el.classList.add('is-in'));
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach((el) => io.observe(el));
  }

  /* ---------- Pointer spotlight on cards ---------- */
  const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
  if (fine.matches) {
    $$('[data-spot]').forEach((el) => {
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect();
        el.style.setProperty('--mx', (e.clientX - r.left) + 'px');
        el.style.setProperty('--my', (e.clientY - r.top) + 'px');
      });
    });
  }

  /* ---------- Selected work: stacking case cards + 3D mockup tilt ---------- */
  const cases = $$('.case');
  if (cases.length) {
    if (reduceMotion.matches || !('IntersectionObserver' in window)) {
      cases.forEach((c) => c.classList.add('is-in'));
    } else {
      const caseIO = new IntersectionObserver((entries) => {
        entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('is-in'); caseIO.unobserve(en.target); } });
      }, { threshold: 0.3 });
      cases.forEach((c) => caseIO.observe(c));
    }
    const cards = cases.map((c) => $('.case-card', c));
    let ticking = false;
    const stack = () => {
      ticking = false;
      const sticky = window.innerWidth > 1100 && !reduceMotion.matches;
      cards.forEach((card, i) => {
        const next = cards[i + 1];
        if (!sticky || !next) { card.style.setProperty('--stack', 0); return; }
        const a = card.getBoundingClientRect(); const b = next.getBoundingClientRect();
        const p = Math.min(1, Math.max(0, (a.bottom - b.top) / a.height));
        card.style.setProperty('--stack', p.toFixed(3));
      });
    };
    window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(stack); } }, { passive: true });
    window.addEventListener('resize', stack);
    stack();
    if (fine.matches && !reduceMotion.matches) {
      cards.forEach((card) => {
        const mock = $('.case-visual > div', card);
        if (!mock) return;
        card.addEventListener('pointermove', (e) => {
          const r = card.getBoundingClientRect();
          const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
          mock.style.setProperty('--ry', (x * 16).toFixed(2) + 'deg');
          mock.style.setProperty('--rx', (-y * 10).toFixed(2) + 'deg');
        });
        card.addEventListener('pointerleave', () => { mock.style.setProperty('--ry', '0deg'); mock.style.setProperty('--rx', '0deg'); });
      });
    }
  }

  /* ---------- Hero carousel (accessible auto-rotation) ---------- */
  const carousel = $('.hero-carousel');
  if (carousel) {
    const slides = $$('.hero-slide');
    const thumbs = $$('[data-thumb]', carousel);
    const tabs = $$('[data-go]', carousel);
    const pauseBtn = $('.carousel-pause', carousel);
    const live = $('[data-live]', carousel);
    const DUR = 6000;
    let index = 0, timer = null, paused = reduceMotion.matches, userPaused = false;
    carousel.style.setProperty('--carousel-dur', DUR + 'ms');

    const render = () => {
      slides.forEach((s, i) => s.classList.toggle('is-active', i === index));
      thumbs.forEach((t, i) => t.classList.toggle('is-active', i === index));
      tabs.forEach((t, i) => {
        t.classList.toggle('is-active', i === index);
        t.classList.toggle('is-done', i < index);
        t.setAttribute('aria-selected', String(i === index));
        t.tabIndex = i === index ? 0 : -1;
      });
      if (live) live.textContent = `Slide ${index + 1} of ${slides.length}`;
    };
    const go = (i) => { index = (i + slides.length) % slides.length; render(); restart(); };
    const stop = () => { clearTimeout(timer); timer = null; };
    const restart = () => { stop(); if (!paused) timer = setTimeout(() => go(index + 1), DUR); };
    const setPaused = (p) => {
      paused = p; carousel.classList.toggle('is-paused', p);
      pauseBtn.setAttribute('aria-pressed', String(p));
      pauseBtn.setAttribute('aria-label', p ? 'Play slideshow' : 'Pause slideshow');
      restart();
    };

    tabs.forEach((t, i) => {
      t.addEventListener('click', () => go(i));
      t.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') { e.preventDefault(); go(index + 1); tabs[index].focus(); }
        if (e.key === 'ArrowLeft') { e.preventDefault(); go(index - 1); tabs[index].focus(); }
      });
    });
    pauseBtn.addEventListener('click', () => { userPaused = !paused; setPaused(!paused); });
    carousel.addEventListener('mouseenter', () => { if (!userPaused) { stop(); carousel.classList.add('is-paused'); } });
    carousel.addEventListener('mouseleave', () => { if (!userPaused && !paused) { carousel.classList.remove('is-paused'); restart(); } });
    carousel.addEventListener('focusin', () => { if (!userPaused) { stop(); carousel.classList.add('is-paused'); } });
    carousel.addEventListener('focusout', (e) => { if (!carousel.contains(e.relatedTarget) && !userPaused && !paused) { carousel.classList.remove('is-paused'); restart(); } });
    document.addEventListener('visibilitychange', () => { document.hidden ? stop() : restart(); });

    render();
    if (paused) setPaused(true); else restart();
  }

  /* ---------- Marquee pause control ---------- */
  const marquee = $('[data-marquee]');
  const mPause = $('.marquee-pause');
  if (marquee && mPause) {
    const track = $('.marquee-track', marquee);
    track.innerHTML += track.innerHTML; // duplicate for seamless loop
    $$('li', track).slice(track.children.length / 2).forEach((li) => li.setAttribute('aria-hidden', 'true'));
    if (reduceMotion.matches) { marquee.classList.add('is-paused'); mPause.hidden = true; }
    mPause.addEventListener('click', () => {
      const p = !marquee.classList.contains('is-paused');
      marquee.classList.toggle('is-paused', p);
      mPause.setAttribute('aria-pressed', String(p));
      mPause.textContent = p ? 'Play' : 'Pause';
    });
  }

  /* ---------- Custom cursor (fine pointers only) ---------- */
  const cursor = $('.cursor');
  if (cursor && window.matchMedia('(hover: hover) and (pointer: fine)').matches && !reduceMotion.matches) {
    let x = 0, y = 0, cx = 0, cy = 0, raf = null;
    const loop = () => { cx += (x - cx) * 0.2; cy += (y - cy) * 0.2; cursor.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`; raf = requestAnimationFrame(loop); };
    window.addEventListener('mousemove', (e) => { x = e.clientX; y = e.clientY; if (!raf) { document.body.classList.add('has-cursor'); loop(); } }, { passive: true });
    document.addEventListener('mouseover', (e) => cursor.classList.toggle('is-hover', !!e.target.closest('a, button, [role="tab"]')));
    document.addEventListener('mouseleave', () => document.body.classList.remove('has-cursor'));
    document.addEventListener('mouseenter', () => document.body.classList.add('has-cursor'));
  }

  /* ---------- Fit hero wordmark to available width ---------- */
  const wordmark = $('.wordmark');
  const wordText = $('.wordmark-text');
  if (wordmark && wordText) {
    const fit = () => {
      if (window.innerWidth <= 860) { wordmark.classList.remove('is-fitted'); wordmark.style.removeProperty('--wordmark-size'); return; }
      wordmark.classList.remove('is-fitted');
      const avail = wordmark.clientWidth - 4;
      const base = parseFloat(getComputedStyle(wordmark).fontSize);
      const width = wordText.getBoundingClientRect().width;
      if (!width || !avail) return;
      const size = Math.max(32, Math.floor(base * (avail / width) * 100) / 100);
      wordmark.style.setProperty('--wordmark-size', size + 'px');
      wordmark.classList.add('is-fitted');
    };
    const ready = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();
    ready.then(fit);
    fit();
    let rt; window.addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(fit, 80); });
  }

  /* ---------- Two-line headings: shrink a heading only if a line would overflow ---------- */
  const fitEls = $$('[data-fit]');
  if (fitEls.length) {
    const fitOne = (el) => {
      el.classList.remove('is-fitted');
      el.style.removeProperty('--fit-size');
      const avail = el.clientWidth;
      const widest = Math.max(...$$('.ln', el).map((l) => l.scrollWidth));
      if (!avail || !widest || widest <= avail) return;
      const base = parseFloat(getComputedStyle(el).fontSize);
      el.style.setProperty('--fit-size', Math.floor(base * (avail / widest) * 0.98 * 100) / 100 + 'px');
      el.classList.add('is-fitted');
    };
    const fitAll = () => fitEls.forEach(fitOne);
    fitAll();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitAll);
    if ('ResizeObserver' in window) {
      const widths = new WeakMap();
      const ro = new ResizeObserver((entries) => entries.forEach((en) => {
        const w = Math.round(en.contentRect.width);
        if (widths.get(en.target) !== w) { widths.set(en.target, w); fitOne(en.target); }
      }));
      fitEls.forEach((el) => ro.observe(el));
    } else {
      let ft; window.addEventListener('resize', () => { clearTimeout(ft); ft = setTimeout(fitAll, 80); });
    }
  }

  /* ---------- Services: sticky visual follows the panel in view ---------- */
  const stage = $('[data-services]');
  if (stage) {
    const panels = $$('[data-service]', stage);
    const slides = $$('[data-sv-slide]', stage);
    const labels = $$('[data-sv-label]', stage);
    const roll = $('[data-sv-roll]', stage);
    const frame = $('.sv-frame', stage);
    const list = $('.services-list', stage);
    let active = 0;
    stage.classList.add('is-live');

    const setActive = (i) => {
      if (i < 0) return;
      active = i;
      panels.forEach((p, n) => p.classList.toggle('is-active', n === i));
      slides.forEach((s, n) => { s.classList.toggle('is-active', n === i); s.classList.toggle('is-past', n < i); });
      labels.forEach((l, n) => l.classList.toggle('is-active', n === i));
      if (roll) roll.style.setProperty('--i', i);
    };
    setActive(0);

    if ('IntersectionObserver' in window) {
      const pio = new IntersectionObserver((entries) => {
        entries.forEach((en) => { if (en.isIntersecting) setActive(panels.indexOf(en.target)); });
      }, { rootMargin: '-45% 0px -45% 0px' });
      panels.forEach((p) => pio.observe(p));
    } else {
      panels.forEach((p) => p.classList.add('is-active'));
    }

    // scroll-linked progress bar + gentle parallax on the active image
    let ticking = false;
    const update = () => {
      ticking = false;
      if (!frame || !frame.offsetParent) return;
      const r = list.getBoundingClientRect();
      const mid = innerHeight / 2;
      const p = Math.min(1, Math.max(0, (mid - r.top) / r.height));
      frame.style.setProperty('--progress', p.toFixed(4));
      if (reduceMotion.matches) return;
      const pr = panels[active].getBoundingClientRect();
      const local = Math.min(1, Math.max(0, (mid - pr.top) / pr.height));
      slides[active].style.setProperty('--shift', ((0.5 - local) * 28).toFixed(1) + 'px');
    };
    const onStageScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
    window.addEventListener('scroll', onStageScroll, { passive: true });
    window.addEventListener('resize', onStageScroll);
    update();
  }

  /* ---------- Work page: category filters ---------- */
  const workGrid = $('[data-work-grid]');
  const filterBtns = $$('[data-filter]');
  if (workGrid && filterBtns.length) {
    const cards = $$('.work-card', workGrid);
    const empty = $('[data-work-empty]');
    $$('[data-filter-count]').forEach((el) => {
      const cat = el.dataset.filterCount;
      el.textContent = cards.filter((c) => cat === 'all' || (c.dataset.cat || '').split(' ').includes(cat)).length;
    });
    const apply = (cat) => {
      let shown = 0;
      cards.forEach((card) => {
        const match = cat === 'all' || (card.dataset.cat || '').split(' ').includes(cat);
        card.classList.toggle('is-hidden', !match);
        card.classList.remove('is-entering');
        if (match) {
          shown++;
          card.classList.add('is-in');
          if (!reduceMotion.matches) { void card.offsetWidth; card.classList.add('is-entering'); }
        }
      });
      if (empty) empty.hidden = shown > 0;
      filterBtns.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.filter === cat)));
    };
    filterBtns.forEach((b) => b.addEventListener('click', () => apply(b.dataset.filter)));
    const initial = location.hash.replace('#', '');
    if (filterBtns.some((b) => b.dataset.filter === initial)) apply(initial);
  }

  /* ---------- Footer year ---------- */
  const year = $('[data-year]'); if (year) year.textContent = new Date().getFullYear();
})();
