/* ==========================================================================
   Donalds Bay Limited — Motion & Behaviour
   ========================================================================== */

document.documentElement.classList.add('js');

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* --------------------------------------------------------------------------
   Reveals (IntersectionObserver)
   -------------------------------------------------------------------------- */
const revealables = document.querySelectorAll('[data-reveal]');

function revealAll() {
  revealables.forEach((el) => el.classList.add('is-in'));
}

if (reduced || !('IntersectionObserver' in window)) {
  revealAll();
} else {
  let delivered = false;

  const io = new IntersectionObserver((entries, obs) => {
    delivered = true;
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-in');
      obs.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0 });

  revealables.forEach((el) => io.observe(el));

  setTimeout(() => {
    if (!delivered) { revealAll(); return; }
    revealables.forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) el.classList.add('is-in');
    });
  }, 2500);
}

/* --------------------------------------------------------------------------
   Smooth scroll — Lenis
   -------------------------------------------------------------------------- */
let lenis = null;

if (!reduced && window.Lenis) {
  lenis = new Lenis({ duration: 1.1, smoothWheel: true });
  window.lenis = lenis;
  const raf = (time) => { lenis.raf(time); requestAnimationFrame(raf); };
  requestAnimationFrame(raf);
}

document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener('click', (e) => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    if (lenis) lenis.scrollTo(target, { offset: -70 });
    else target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
  });
});

/* --------------------------------------------------------------------------
   Sticky Nav Bar
   -------------------------------------------------------------------------- */
const nav = document.getElementById('nav');
if (nav) {
  const onScroll = () => nav.classList.toggle('is-stuck', window.scrollY > 20);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

/* --------------------------------------------------------------------------
   Mobile Drawer Menu
   -------------------------------------------------------------------------- */
const navToggle = document.querySelector('.nav__toggle');
if (nav && navToggle) {
  const setMenu = (open) => {
    nav.classList.toggle('is-open', open);
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.textContent = open ? 'Close' : 'Menu';
  };
  navToggle.addEventListener('click', () => setMenu(!nav.classList.contains('is-open')));
  nav.querySelectorAll('.nav__links a').forEach((a) =>
    a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });
  window.matchMedia('(min-width: 961px)').addEventListener('change', (e) => {
    if (e.matches) setMenu(false);
  });
}

/* --------------------------------------------------------------------------
   Site Operations Clock (WAT — West Africa Time)
   -------------------------------------------------------------------------- */
const clocks = ['clock', 'clock-studio', 'clock-foot'].map((id) => document.getElementById(id)).filter(Boolean);
if (clocks.length) {
  const fmt = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Africa/Lagos', hour: '2-digit', minute: '2-digit', hour12: false
  });
  const tick = () => {
    const t = `WAT ${fmt.format(new Date())}`;
    clocks.forEach((c) => { c.textContent = t; });
  };
  tick();
  setInterval(tick, 30000);
}

/* --------------------------------------------------------------------------
   Company Showreel Modal
   -------------------------------------------------------------------------- */
const reelDialog = document.getElementById('reelModal');
if (reelDialog && typeof reelDialog.showModal === 'function') {
  const reelVideo = reelDialog.querySelector('video');
  const heroMedia = document.querySelector('.hero__media video');

  const openReel = () => {
    reelDialog.showModal();
    if (lenis) lenis.stop();
    document.body.style.overflow = 'hidden';
    if (heroMedia) heroMedia.pause();
    if (reelVideo) {
      reelVideo.currentTime = 0;
      reelVideo.play().catch(() => {});
    }
  };

  const closeReel = () => { if (reelDialog.open) reelDialog.close(); };

  document.querySelectorAll('[data-reel-open]').forEach((btn) =>
    btn.addEventListener('click', openReel));
  document.querySelectorAll('[data-reel-close]').forEach((btn) =>
    btn.addEventListener('click', closeReel));

  reelDialog.addEventListener('click', (e) => {
    if (e.target === reelDialog) closeReel();
  });

  reelDialog.addEventListener('close', () => {
    if (reelVideo) reelVideo.pause();
    if (lenis) lenis.start();
    document.body.style.overflow = '';
    if (heroMedia && !reduced) heroMedia.play().catch(() => {});
  });
}

/* --------------------------------------------------------------------------
   Project Gallery / Showcase Modal
   -------------------------------------------------------------------------- */
const projectDialog = document.getElementById('projectModal');
if (projectDialog && typeof projectDialog.showModal === 'function') {
  const stage = projectDialog.querySelector('.proj__stage');
  const titleEl = projectDialog.querySelector('.proj__title');
  const navEl = projectDialog.querySelector('.proj__nav');
  const count = projectDialog.querySelector('.proj__count');

  let galleries = {};
  try {
    const data = document.getElementById('gallery-data');
    if (data) galleries = JSON.parse(data.textContent);
  } catch (e) { galleries = {}; }

  let items = [];
  let index = 0;

  const setRatio = (r) => {
    if (r) projectDialog.style.setProperty('--ratio', r);
    else projectDialog.style.removeProperty('--ratio');
  };

  const titleOf = (card) => {
    const t = card.querySelector('.card__title');
    return t ? t.textContent.trim() : 'Project Showcase';
  };

  const open = (title) => {
    titleEl.textContent = title;
    navEl.hidden = items.length < 2;
    if (navEl.hidden) count.textContent = '';
    projectDialog.showModal();
    if (lenis) lenis.stop();
    document.body.style.overflow = 'hidden';
  };

  const show = () => {
    const it = items[index];
    setRatio(it.w / it.h);
    let el;
    if (it.type === 'video') {
      el = document.createElement('video');
      el.muted = true;
      el.loop = true;
      el.autoplay = true;
      el.playsInline = true;
      if (it.poster) el.poster = it.poster;
      el.src = it.src;
      el.setAttribute('aria-label', it.alt || '');
    } else {
      el = document.createElement('img');
      el.alt = it.alt || '';
      el.src = it.src;
    }
    stage.replaceChildren(el);
    if (el.play) el.play().catch(() => {});
    if (items.length > 1) {
      count.textContent = (index + 1) + ' / ' + items.length;
      const next = items[(index + 1) % items.length];
      if (next.type !== 'video') { const pre = new Image(); pre.src = next.src; }
    }
  };

  const step = (d) => {
    if (items.length < 2) return;
    index = (index + d + items.length) % items.length;
    show();
  };

  const openGallery = (card) => {
    const key = card.dataset.gallery;
    const list = galleries[key];
    if (!Array.isArray(list) || !list.length) return false;
    items = list;
    index = 0;
    show();
    open(titleOf(card));
    return true;
  };

  document.querySelectorAll('[data-gallery]').forEach((card) =>
    card.addEventListener('click', (e) => {
      if (openGallery(card)) e.preventDefault();
    }));

  projectDialog.querySelector('[data-project-prev]').addEventListener('click', () => step(-1));
  projectDialog.querySelector('[data-project-next]').addEventListener('click', () => step(1));
  projectDialog.querySelectorAll('[data-project-close]').forEach((b) =>
    b.addEventListener('click', () => projectDialog.close()));

  projectDialog.addEventListener('click', (e) => {
    if (e.target === projectDialog) projectDialog.close();
  });

  document.addEventListener('keydown', (e) => {
    if (!projectDialog.open) return;
    if (e.key === 'ArrowRight') step(1);
    else if (e.key === 'ArrowLeft') step(-1);
  });

  let touchX = null;
  stage.addEventListener('touchstart', (e) => { touchX = e.touches[0].clientX; }, { passive: true });
  stage.addEventListener('touchend', (e) => {
    if (touchX === null || items.length < 2) return;
    const dx = e.changedTouches[0].clientX - touchX;
    touchX = null;
    if (Math.abs(dx) > 40) step(dx < 0 ? 1 : -1);
  });

  projectDialog.addEventListener('close', () => {
    stage.replaceChildren();
    items = [];
    if (lenis) lenis.start();
    document.body.style.overflow = '';
  });
}

/* Esc key safety */
document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  document.querySelectorAll('dialog[open]').forEach((d) => d.close());
});

/* --------------------------------------------------------------------------
   Video Playback Optimization (Pause offscreen)
   -------------------------------------------------------------------------- */
const vids = document.querySelectorAll('video[autoplay]');
if (vids.length && 'IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(({ target }) => {
      const r = target.getBoundingClientRect();
      const onScreen = r.top < window.innerHeight && r.bottom > 0;
      if (onScreen) target.play().catch(() => {});
      else target.pause();
    });
  }, { threshold: 0.15 });
  vids.forEach((v) => io.observe(v));
}

/* --------------------------------------------------------------------------
   Portfolio Category Filtering
   -------------------------------------------------------------------------- */
const portfolioTabs = document.querySelectorAll('.portfolio-tab');
const portfolioCards = document.querySelectorAll('#portfolioGrid .card');

if (portfolioTabs.length && portfolioCards.length) {
  portfolioTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      portfolioTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.dataset.filter;
      portfolioCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.classList.remove('is-hidden');
          setTimeout(() => card.classList.add('is-in'), 50);
        } else {
          card.classList.add('is-hidden');
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   RFP Quote Form Interaction & Executive Portal Sync
   -------------------------------------------------------------------------- */
const rfpForm = document.getElementById('rfpForm');
if (rfpForm) {
  rfpForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = rfpForm.querySelector('button[type="submit"]');
    const orig = btn.textContent;
    btn.disabled = true;
    btn.textContent = 'Transmitting Specifications...';

    // Collect Form Data
    const selectedServices = Array.from(rfpForm.querySelectorAll('input[name="services"]:checked')).map(cb => cb.value).join(', ') || 'General Civil Works';
    const clientName = document.getElementById('clientName').value.trim();
    const clientEmail = document.getElementById('clientEmail').value.trim();
    const siteLocation = document.getElementById('siteLocation').value.trim();
    const budgetTier = document.getElementById('budgetTier').value;

    // Save directly to Executive Portal LocalStorage
    try {
      let existingCalls = JSON.parse(localStorage.getItem('donalds_bay_calls') || '[]');
      const newEntry = {
        id: 'CALL-' + Math.floor(100 + Math.random() * 900),
        client: clientName,
        contact: clientEmail,
        service: selectedServices,
        location: siteLocation,
        dateTime: new Date(Date.now() + 86400000 * 2).toISOString().slice(0, 16),
        format: 'Google Meet (Virtual)',
        budget: budgetTier,
        status: 'Pending'
      };
      existingCalls.unshift(newEntry);
      localStorage.setItem('donalds_bay_calls', JSON.stringify(existingCalls));
    } catch (err) {}

    setTimeout(() => {
      btn.textContent = 'Project Brief Received ✓';
      btn.style.background = '#00E599';
      btn.style.color = '#042125';
      alert('Thank you for contacting Donalds Bay Limited. Your project specifications have been transmitted to our Chief Engineer & Estimation Team and logged in the Executive Portal.');
      rfpForm.reset();
      setTimeout(() => {
        btn.disabled = false;
        btn.textContent = orig;
        btn.style.background = '';
        btn.style.color = '';
      }, 3500);
    }, 1000);
  });
}

