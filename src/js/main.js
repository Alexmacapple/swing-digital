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

    // Styles for skip link
    const style = document.createElement('style');
    style.textContent = `
        .skip-link {
            position: absolute;
            top: -40px;
            left: 0;
            background: #000;
            color: #fff;
            padding: 8px;
            z-index: 100;
        }
        .skip-link:focus {
            top: 0;
        }
    `;
    document.head.appendChild(style);
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

// Export functions if needed
window.SwingDigital = {
    initNavigation,
    initAccessibility,
    initEventListeners,
    initScrollTracking,
    updateNavActive
};
