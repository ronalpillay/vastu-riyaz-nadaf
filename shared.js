/* ═══════════════════════════════════════════════════════
   VASTU RIYAZ NADAF — Shared Interactive JS
   Cursor glow · Magnetic buttons · Page entrance
   Counter · Stagger · Parallax
═══════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── PAGE ENTRANCE ─────────────────────────────────── */
  /* Handled in shared.css via @keyframes bodyIn */

  /* ── SHARED NAV SCROLL ─────────────────────────────── */
  var nb = document.getElementById('navbar');
  if (nb) {
    window.addEventListener('scroll', function () {
      nb.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });
  }

  /* ── MOBILE MENU ────────────────────────────────────── */
  var mb = document.getElementById('mBtn'), mm = document.getElementById('mMenu');
  if (mb && mm) {
    mb.addEventListener('click', function () {
      var open = mm.classList.toggle('on');
      mb.textContent = open ? '✕' : '☰';
      mb.setAttribute('aria-expanded', open);
    });
    mm.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        mm.classList.remove('on');
        mb.textContent = '☰';
      });
    });
  }

  /* ── SCROLL REVEAL ─────────────────────────────────── */
  var ro = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('in'); ro.unobserve(e.target); }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' });
  document.querySelectorAll('.r, .r-l, .r-r').forEach(function (el) { ro.observe(el); });

  /* ── NUMBER COUNTER ─────────────────────────────────── */
  document.querySelectorAll('[data-count]').forEach(function (el) {
    var fired = false;
    function runCounter() {
      if (fired) return; fired = true;
      var target = +el.dataset.count;
      var suffix = el.dataset.suffix || '';
      var duration = 1600, t0 = null;
      function step(ts) {
        if (!t0) t0 = ts;
        var p = Math.min((ts - t0) / duration, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(eased * target) + suffix;
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }
    var obs = new IntersectionObserver(function (entries) {
      if (!entries[0].isIntersecting) return;
      obs.disconnect(); runCounter();
    }, { threshold: 0.5 });
    obs.observe(el);
    /* also fire immediately if element is already in viewport on load */
    window.addEventListener('load', function () {
      var r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.92 && r.bottom > 0) {
        setTimeout(runCounter, 350);
      }
    }, { once: true });
  });

  /* ── CURSOR GLOW ON DARK SECTIONS ───────────────────── */
  var glowTargets = document.querySelectorAll(
    '.svc-sec, .test-sec, .feat-awd, .feat-quote-hero, .articles-sec, .feat-awd-grid, .awd-lead-side, .feat-detail'
  );
  glowTargets.forEach(function (sec) {
    if (getComputedStyle(sec).position === 'static') sec.style.position = 'relative';
    var glow = document.createElement('div');
    glow.className = 'cursor-glow';
    sec.insertBefore(glow, sec.firstChild);
    sec.addEventListener('mousemove', function (e) {
      var r = this.getBoundingClientRect();
      glow.style.background =
        'radial-gradient(650px circle at ' + (e.clientX - r.left) + 'px ' + (e.clientY - r.top) + 'px, rgba(139,105,20,.08) 0%, transparent 45%)';
    }, { passive: true });
    sec.addEventListener('mouseleave', function () { glow.style.background = ''; });
  });

  /* ── MAGNETIC BUTTONS ───────────────────────────────── */
  document.querySelectorAll('.btn-gol, .nav-cta, .btn-dk').forEach(function (btn) {
    btn.addEventListener('mousemove', function (e) {
      var r = this.getBoundingClientRect();
      var x = ((e.clientX - r.left) / r.width - 0.5) * 10;
      var y = ((e.clientY - r.top) / r.height - 0.5) * 8;
      this.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
      this.style.transition = 'transform .1s ease';
    });
    btn.addEventListener('mouseleave', function () {
      this.style.transform = 'translate(0,0)';
      this.style.transition = 'transform .5s cubic-bezier(.16,1,.3,1), background .45s, color .45s, border-color .45s, letter-spacing .3s';
    });
  });

  /* ── SERVICE ROW STAGGER ─────────────────────────────── */
  var rows = document.querySelectorAll('.svc-row');
  if (rows.length) {
    rows.forEach(function (row) {
      row.style.opacity = '0';
      row.style.transform = 'translateX(-18px)';
    });
    var svcObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var idx = Array.from(rows).indexOf(e.target);
        e.target.style.transition =
          'opacity .75s cubic-bezier(.16,1,.3,1) ' + (idx * 0.07) + 's, transform .75s cubic-bezier(.16,1,.3,1) ' + (idx * 0.07) + 's';
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateX(0)';
        svcObs.unobserve(e.target);
      });
    }, { threshold: 0.12 });
    rows.forEach(function (row) { svcObs.observe(row); });
  }

  /* ── ANIMATED RULE WIDTH ─────────────────────────────── */
  document.querySelectorAll('.manifesto-rule, .ft-rule, .pg-rule, .fd-rule').forEach(function (el) {
    el.style.width = '0';
    var rObs = new IntersectionObserver(function (entries) {
      if (!entries[0].isIntersecting) return;
      rObs.disconnect();
      el.style.transition = 'width .9s cubic-bezier(.16,1,.3,1)';
      el.style.width = '';
    }, { threshold: 1 });
    rObs.observe(el);
  });

  /* ── ABOUT IMAGE PARALLAX ────────────────────────────── */
  var aboutImg = document.querySelector('.about-img-col img, .about-photo-col img');
  if (aboutImg) {
    window.addEventListener('scroll', function () {
      var col = aboutImg.closest('.about-img-col, .about-photo-col');
      if (!col) return;
      var rect = col.getBoundingClientRect();
      var viewH = window.innerHeight;
      if (rect.bottom < 0 || rect.top > viewH) return;
      var progress = (viewH - rect.top) / (viewH + rect.height);
      aboutImg.style.transform = 'translateY(' + ((progress - 0.5) * 40) + 'px) scale(1.04)';
    }, { passive: true });
  }

  /* ── QUOTE MARK FADE IN ──────────────────────────────── */
  var bgQ = document.querySelector('.test-bg-q, .fqh-bg');
  if (bgQ) {
    bgQ.style.opacity = '0';
    var qObs = new IntersectionObserver(function (entries) {
      if (!entries[0].isIntersecting) return;
      qObs.disconnect();
      bgQ.style.transition = 'opacity 1.8s cubic-bezier(.16,1,.3,1)';
      bgQ.style.opacity = bgQ.classList.contains('fqh-bg') ? '.04' : '.05';
    }, { threshold: 0.05 });
    qObs.observe(bgQ);
  }

  /* ── HERO PARALLAX (homepage only) ──────────────────── */
  var heroBg = document.getElementById('heroBg');
  if (heroBg) {
    window.addEventListener('scroll', function () {
      if (window.scrollY < window.innerHeight * 1.2) {
        heroBg.style.transform = 'translateY(' + (window.scrollY * 0.32) + 'px)';
      }
    }, { passive: true });
  }

  /* ── AWARDS MARQUEE (homepage only) ─────────────────── */
  var awdTrack = document.getElementById('awdTrack');
  if (awdTrack) {
    var imgs = [];
    for (var i = 1; i <= 15; i++) imgs.push('Awards/awards' + i + '.jpg');
    var all = imgs.concat(imgs);
    all.forEach(function (src) {
      var d = document.createElement('div');
      d.className = 'awd-slide';
      var img = document.createElement('img');
      img.src = src; img.alt = ''; img.loading = 'lazy';
      var ov = document.createElement('div'); ov.className = 'awd-slide-ov';
      d.appendChild(img); d.appendChild(ov);
      awdTrack.appendChild(d);
    });
    awdTrack.style.animationDuration = (imgs.length * 2.5) + 's';
  }

})();
