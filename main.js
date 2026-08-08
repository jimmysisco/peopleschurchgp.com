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

  // Simple tab switcher (used by the CLASS page)
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
