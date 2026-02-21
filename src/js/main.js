/* ==========================================================================
   Swing Digital - JavaScript principal
   Navigation, animations au scroll, menu mobile
   ========================================================================== */

function initFaqAccordion() {
  var faqButtons = document.querySelectorAll('.faq-item__button');
  if (!faqButtons.length) return;

  var faqButtonsArray = Array.prototype.slice.call(faqButtons);

  function toggleFaq(button, forceOpen) {
    var panelId = button.getAttribute('aria-controls');
    var panel = document.getElementById(panelId);
    if (!panel) return;
    var isExpanded = button.getAttribute('aria-expanded') === 'true';
    var shouldOpen = typeof forceOpen === 'boolean' ? forceOpen : !isExpanded;
    button.setAttribute('aria-expanded', shouldOpen ? 'true' : 'false');
    panel.hidden = !shouldOpen;
  }

  faqButtonsArray.forEach(function (button) {
    button.addEventListener('click', function () {
      toggleFaq(button);
    });

    button.addEventListener('keydown', function (e) {
      var key = e.key;
      var currentIndex = faqButtonsArray.indexOf(button);

      if (key === 'ArrowDown') {
        e.preventDefault();
        var nextIndex = (currentIndex + 1) % faqButtonsArray.length;
        faqButtonsArray[nextIndex].focus();
      }

      if (key === 'ArrowUp') {
        e.preventDefault();
        var prevIndex = (currentIndex - 1 + faqButtonsArray.length) % faqButtonsArray.length;
        faqButtonsArray[prevIndex].focus();
      }

      if (key === 'Home') {
        e.preventDefault();
        faqButtonsArray[0].focus();
      }

      if (key === 'End') {
        e.preventDefault();
        faqButtonsArray[faqButtonsArray.length - 1].focus();
      }

      if (key === ' ' || key === 'Enter') {
        e.preventDefault();
        toggleFaq(button);
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', function () {

  // --- Navigation scroll ---
  var nav = document.getElementById('nav');
  var scrollThreshold = 50;

  function handleNavScroll() {
    if (window.scrollY > scrollThreshold) {
      nav.classList.add('nav--scrolled');
    } else {
      nav.classList.remove('nav--scrolled');
    }
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });

  // --- Active nav link ---
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.nav__link');

  var currentHash = '';

  function updateActiveLink() {
    var scrollPos = window.scrollY + 200;

    sections.forEach(function (section) {
      var top = section.offsetTop;
      var height = section.offsetHeight;
      var id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(function (link) {
          link.classList.remove('nav__link--active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('nav__link--active');
          }
        });
        // Mettre à jour le hash dans l'URL sans provoquer de scroll
        if (currentHash !== id) {
          currentHash = id;
          history.replaceState(null, '', '#' + id);
        }
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });

  // --- Menu mobile ---
  var hamburger = document.getElementById('hamburger');
  var mobileMenu = document.getElementById('mobileMenu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      var isOpen = mobileMenu.classList.contains('nav__overlay--open');

      if (isOpen) {
        mobileMenu.classList.remove('nav__overlay--open');
        hamburger.classList.remove('nav__hamburger--open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      } else {
        mobileMenu.classList.add('nav__overlay--open');
        hamburger.classList.add('nav__hamburger--open');
        hamburger.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
      }
    });

    // Fermer le menu au clic sur un lien
    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileMenu.classList.remove('nav__overlay--open');
        hamburger.classList.remove('nav__hamburger--open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Fermer le menu avec la touche Échap
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        if (mobileMenu.classList.contains('nav__overlay--open')) {
          mobileMenu.classList.remove('nav__overlay--open');
          hamburger.classList.remove('nav__hamburger--open');
          hamburger.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
          hamburger.focus();
        }
      }
    });
  }

  // --- Animations au scroll (Intersection Observer) ---
  var fadeElements = document.querySelectorAll('.fade-in');

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in--visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0,
      rootMargin: '0px 0px 100px 0px'
    });

    // Rendre immédiatement visibles les éléments déjà dans ou au-dessus du viewport
    // (corrige le cas de navigation par ancre #section)
    var viewportBottom = window.scrollY + window.innerHeight + 100;
    fadeElements.forEach(function (el) {
      if (el.getBoundingClientRect().top + window.scrollY < viewportBottom) {
        el.classList.add('fade-in--visible');
      } else {
        observer.observe(el);
      }
    });
  } else {
    // Fallback : tout afficher directement
    fadeElements.forEach(function (el) {
      el.classList.add('fade-in--visible');
    });
  }

  // --- Smooth scroll pour les ancres ---
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;

      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        var offsetTop = target.offsetTop - 70;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
        // Mettre à jour le hash dans l'URL
        var id = targetId.substring(1);
        currentHash = id;
        history.pushState(null, '', targetId);
      }
    });
  });

  // --- Scroll vers l'ancre au chargement ---
  if (window.location.hash) {
    var target = document.querySelector(window.location.hash);
    if (target) {
      // Petit délai pour laisser le layout se stabiliser
      setTimeout(function () {
        window.scrollTo({
          top: target.offsetTop - 70,
          behavior: 'smooth'
        });
      }, 100);
    }
  }

  // --- Bouton retour en haut ---
  var backToTop = document.querySelector('.footer__back-to-top');
  if (backToTop) {
    backToTop.addEventListener('click', function () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  initFaqAccordion();

});

if (document.readyState !== 'loading') {
  initFaqAccordion();
}
