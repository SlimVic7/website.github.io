(function () {
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  const menuLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  const sections = [...document.querySelectorAll('main section[id]')];
  const revealItems = document.querySelectorAll('.reveal');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    menuLinks.forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const setActiveLink = () => {
    const scrollPosition = window.scrollY + 120;
    let activeId = '';

    sections.forEach((section) => {
      if (section.offsetTop <= scrollPosition) {
        activeId = section.id;
      }
    });

    document.querySelectorAll('.nav-links a').forEach((link) => {
      const href = link.getAttribute('href') || '';
      link.classList.toggle('active', href === `#${activeId}`);
    });
  };

  const revealObserver = 'IntersectionObserver' in window
    ? new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 })
    : null;

  if (revealObserver) {
    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }

  window.addEventListener('scroll', setActiveLink, { passive: true });
  window.addEventListener('load', setActiveLink);
  setActiveLink();
})();
