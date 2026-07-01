(function () {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const nav = document.getElementById('siteNav');

  function onNavScroll() {
    if (!nav) return;
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }

  window.addEventListener('scroll', onNavScroll, { passive: true });
  onNavScroll();

  const revealEls = document.querySelectorAll('.reveal, .feature-media, .feature-text');
  if ('IntersectionObserver' in window && !reduceMotion) {
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealEls.forEach(function (el) {
      io.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add('in');
    });
  }

  function updateNavLabel() {
    const full = document.querySelector('.nav-cta .full');
    const short = document.querySelector('.nav-cta .short');
    if (!full || !short) return;

    if (window.innerWidth < 860) {
      full.style.display = 'none';
      short.style.display = 'inline';
    } else {
      full.style.display = 'inline';
      short.style.display = 'none';
    }
  }

  updateNavLabel();
  window.addEventListener('resize', updateNavLabel);
})();
