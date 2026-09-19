// People's Church — shared site behavior
document.addEventListener('DOMContentLoaded', () => {
  const yearEls = document.querySelectorAll('.year');
  yearEls.forEach(el => el.textContent = '© ' + new Date().getFullYear() + ' People\'s Church, Grande Prairie.');

  const header = document.getElementById('siteHeader');
  const toTop = document.getElementById('toTop');
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (header) header.classList.toggle('scrolled', y > 20);
    if (toTop) toTop.classList.toggle('show', y > 500);
  });

  const menuToggle = document.getElementById('menuToggle');
  if (menuToggle) {
    menuToggle.addEventListener('click', () => document.body.classList.toggle('menu-open'));
  }
  document.querySelectorAll('#siteNav a').forEach(a => {
    a.addEventListener('click', () => document.body.classList.remove('menu-open'));
  });

  if (toTop) toTop.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));

  // Hero background video: fade in only once it actually starts playing.
  // If no file exists at assets/video/hero-loop.mp4, the placeholder collage stays visible.
  const heroVideo = document.getElementById('heroVideo');
  if (heroVideo) {
    heroVideo.addEventListener('playing', () => heroVideo.classList.add('is-playing'));
  }

  // Simple tab switcher (used by the CLASS page and the About page submenu)
  const classTabs = document.querySelectorAll('.class-tab');
  if (classTabs.length) {
    classTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const target = tab.getAttribute('data-tab');
        classTabs.forEach(t => t.classList.toggle('active', t === tab));
        document.querySelectorAll('.class-panel').forEach(p => {
          p.classList.toggle('active', p.id === 'panel-' + target);
        });
      });
    });

    // Sub-nav quick-links that jump to & activate a specific tab (e.g. About page)
    document.querySelectorAll('[data-tab-link]').forEach(link => {
      link.addEventListener('click', () => {
        const target = link.getAttribute('data-tab-link');
        const tabBtn = document.querySelector('.class-tab[data-tab="' + target + '"]');
        if (tabBtn) tabBtn.click();
      });
    });

    // Deep-link support: about.html#pastor opens straight to that tab
    const hash = location.hash.replace('#', '');
    if (hash) {
      const tabBtn = document.querySelector('.class-tab[data-tab="' + hash + '"]');
      if (tabBtn) tabBtn.click();
    }
  }

  // Peeking horizontal carousel for the Children's Ministry program tabs (#programs).
  // Panels sit side-by-side; clicking a tab scrolls the strip to that panel,
  // and the strip is natively swipeable on touch devices.
  const programsPanels = document.querySelector('#programs .class-panels');
  if (programsPanels) {
    const programTabs = document.querySelectorAll('#programs .class-tab');
    const programPanelEls = programsPanels.querySelectorAll('.class-panel');

    const scrollToProgramPanel = (id) => {
      const panel = programsPanels.querySelector('#panel-' + id);
      if (!panel) return;
      const target = panel.getBoundingClientRect().left - programsPanels.getBoundingClientRect().left + programsPanels.scrollLeft;
      programsPanels.scrollTo({ left: target, behavior: 'smooth' });
    };
    programTabs.forEach(tab => {
      tab.addEventListener('click', () => scrollToProgramPanel(tab.getAttribute('data-tab')));
    });

    // Keep the tab highlight in sync when the user swipes/scrolls the strip directly.
    const activateProgramTab = (id) => {
      programTabs.forEach(t => t.classList.toggle('active', t.getAttribute('data-tab') === id));
    };
    const programsIO = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting && e.intersectionRatio > 0.6) {
          activateProgramTab(e.target.id.replace('panel-', ''));
        }
      });
    }, { root: programsPanels, threshold: [0.6] });
    programPanelEls.forEach(p => programsIO.observe(p));
  }

  // Video lightbox (used by the Church Center promo thumbnail on the landing page)
  const videoLightbox = document.getElementById('videoLightbox');
  const lightboxVideo = document.getElementById('lightboxVideo');
  const videoTrigger = document.getElementById('videoLightboxTrigger');
  const videoClose = document.getElementById('videoLightboxClose');
  if (videoLightbox && lightboxVideo && videoTrigger) {
    const openLightbox = () => {
      videoLightbox.classList.add('open');
      lightboxVideo.play();
      document.body.style.overflow = 'hidden';
    };
    const closeLightbox = () => {
      videoLightbox.classList.remove('open');
      lightboxVideo.pause();
      lightboxVideo.currentTime = 0;
      document.body.style.overflow = '';
    };
    videoTrigger.addEventListener('click', openLightbox);
    if (videoClose) videoClose.addEventListener('click', closeLightbox);
    videoLightbox.addEventListener('click', (e) => { if (e.target === videoLightbox) closeLightbox(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });
  }

  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, {threshold: 0.15});
  revealEls.forEach(el => io.observe(el));

  // Active nav link based on current page
  const page = (location.pathname.split('/').pop() || 'index.html');
  document.querySelectorAll('#siteNav a.nav-link').forEach(a => {
    const href = a.getAttribute('href').split('#')[0] || 'index.html';
    if (href === page || (page === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
});
