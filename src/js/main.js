/**
 * Swing Digital - Main JavaScript
 * Vanilla JS - no framework
 * WCAG 2.2 AA compliant
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('Swing Digital - Page chargée');

    // Initialize
    initNavigation();
    initAccessibility();
    initEventListeners();
    initScrollTracking();
    initDisclosure();
    try { initVideoSound(); } catch (e) { console.warn('Video init:', e); }
    initPodcastPlayer();
    initScrollReveal();
});

/**
 * Navigation Setup
 */
function initNavigation() {
    const navLinks = document.querySelectorAll('.navbar__link');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Update active state
            navLinks.forEach(l => l.removeAttribute('aria-current'));
            this.setAttribute('aria-current', 'page');
        });
    });
}

/**
 * Accessibility Setup
 */
function initAccessibility() {
    // Skip to main content link
    addSkipLink();

    // Focus management
    manageFocusOutline();
}

function addSkipLink() {
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Aller au contenu principal';

    const body = document.body;
    body.insertBefore(skipLink, body.firstChild);
}

function manageFocusOutline() {
    // Show focus outline on keyboard navigation only
    document.addEventListener('keydown', function() {
        document.body.classList.add('keyboard-nav');
    });

    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-nav');
    });
}

/**
 * Event Listeners
 */
function initEventListeners() {
    // Smooth scroll (already in CSS, but JavaScript fallback)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                document.querySelector(href).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Scroll Tracking - Update URL anchor based on visible section
 */
function initScrollTracking() {
    const sections = document.querySelectorAll('section[id]');

    if (sections.length === 0) return;

    // Intersection Observer options - detect when section enters viewport
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.3 // Trigger when 30% of section is visible
    };

    // Track which section has the most visibility
    let visibleSections = new Map();

    // Callback for intersection observer
    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Calculate intersection ratio and store it
                visibleSections.set(entry.target.id, entry.intersectionRatio);
            } else {
                visibleSections.delete(entry.target.id);
            }
        });

        // Find the section with the highest intersection ratio
        let currentSection = null;
        let maxRatio = 0;

        visibleSections.forEach((ratio, id) => {
            if (ratio > maxRatio) {
                maxRatio = ratio;
                currentSection = id;
            }
        });

        // Update URL hash if a section is currently the most visible
        if (currentSection && window.location.hash !== `#${currentSection}`) {
            window.history.replaceState(null, '', `#${currentSection}`);
            updateNavActive(currentSection);
        }
    };

    // Create observer
    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all sections
    sections.forEach(section => {
        observer.observe(section);
    });
}

/**
 * Update navigation active state based on current section
 */
function updateNavActive(currentSectionId) {
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === `#${currentSectionId}`) {
            link.setAttribute('aria-current', 'page');
        } else {
            link.removeAttribute('aria-current');
        }
    });
}

/**
 * Video Sound Toggle (Vimeo Player API)
 */
function initVideoSound() {
    var iframe = document.getElementById('vimeo-monroe');
    var playBtn = document.querySelector('.page11__play-btn');
    var soundBtn = document.querySelector('.page11__sound-btn');

    if (!iframe || typeof Vimeo === 'undefined') return;

    var player = new Vimeo.Player(iframe);

    if (playBtn) {
        playBtn.addEventListener('click', function() {
            var isPlaying = playBtn.getAttribute('aria-pressed') === 'true';
            if (isPlaying) {
                player.pause();
                playBtn.setAttribute('aria-pressed', 'false');
            } else {
                player.play();
                playBtn.setAttribute('aria-pressed', 'true');
            }
        });
    }

    if (soundBtn) {
        soundBtn.addEventListener('click', function() {
            var isSoundOn = soundBtn.getAttribute('aria-pressed') === 'true';
            if (isSoundOn) {
                player.setVolume(0);
                soundBtn.setAttribute('aria-pressed', 'false');
            } else {
                player.setVolume(1);
                soundBtn.setAttribute('aria-pressed', 'true');
            }
        });
    }
}

/**
 * Disclosure Toggle (W3C ARIA APG pattern)
 * Ref: https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/
 */
function initDisclosure() {
    var buttons = document.querySelectorAll('button[aria-expanded][aria-controls]');

    for (var i = 0; i < buttons.length; i++) {
        (function(btn) {
            var targetId = btn.getAttribute('aria-controls');
            var target = document.getElementById(targetId);

            if (!target) return;

            btn.addEventListener('click', function(e) {
                e.preventDefault();
                var isExpanded = btn.getAttribute('aria-expanded') === 'true';

                if (isExpanded) {
                    btn.setAttribute('aria-expanded', 'false');
                    target.hidden = true;
                    btn.textContent = btn.dataset.labelShow || 'Voir les 8 citations presse';
                } else {
                    btn.setAttribute('aria-expanded', 'true');
                    target.hidden = false;
                    btn.textContent = btn.dataset.labelHide || 'Masquer les citations presse';
                }
            });
        })(buttons[i]);
    }
}

/**
 * Podcast player - Page 33
 * Change la video dans l'iframe au clic sur un episode
 */
function initPodcastPlayer() {
    const player = document.getElementById('page33-player');
    const episodes = document.querySelectorAll('.page33__episode');
    if (!player || !episodes.length) return;

    episodes.forEach(function(ep) {
        var btn = ep.querySelector('.page33__episode-btn');
        if (!btn) return;
        btn.addEventListener('click', function() {
            var vid = ep.dataset.vid;
            var title = ep.dataset.title;
            // Mettre a jour l'iframe
            player.src = 'https://www.youtube.com/embed/' + vid + '?rel=0&autoplay=1';
            player.title = title;
            // Mettre a jour l'etat actif
            episodes.forEach(function(e) {
                e.classList.remove('page33__episode--active');
                e.querySelector('.page33__episode-btn').removeAttribute('aria-current');
            });
            ep.classList.add('page33__episode--active');
            btn.setAttribute('aria-current', 'true');
        });
    });
}

/**
 * Scroll Reveal — revelation progressive des elements au scroll
 * Respecte prefers-reduced-motion via CSS
 */
function initScrollReveal() {
    // Ne pas animer si l'utilisateur prefere le mouvement reduit
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Cibler les elements a reveler dans chaque section
    var selectors = [
        'h1', 'h2', 'h3',
        '[class*="__title"]',
        '[class*="__intro"]',
        '[class*="__paragraph"]',
        '[class*="__text"]',
        '[class*="__description"]',
        '[class*="__card"]',
        '[class*="__image-wrapper"]',
        '[class*="__photo"]',
        'figure',
        '[class*="__faq"]',
        '[class*="__checklist"]',
        '[class*="__list"]'
    ].join(', ');

    var elements = document.querySelectorAll('#main-content section > * ' + selectors.split(', ').join(', #main-content section > * '));

    // Fallback : cibler les enfants directs de chaque section
    if (elements.length === 0) {
        document.querySelectorAll('#main-content section').forEach(function(section) {
            var children = section.children;
            for (var i = 0; i < children.length; i++) {
                children[i].classList.add('reveal');
            }
        });
    } else {
        elements.forEach(function(el) {
            // Ne pas ajouter sur les elements deja visibles (hero)
            if (el.closest('#page-1')) return;
            el.classList.add('reveal');
        });
    }

    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal--visible');
                observer.unobserve(entry.target); // Une seule fois
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.reveal').forEach(function(el) {
        observer.observe(el);
    });
}

// Export functions if needed
window.SwingDigital = {
    initNavigation,
    initAccessibility,
    initEventListeners,
    initScrollTracking,
    updateNavActive,
    initVideoSound,
    initDisclosure,
    initPodcastPlayer,
    initScrollReveal
};
