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

// Export functions if needed
window.SwingDigital = {
    initNavigation,
    initAccessibility,
    initEventListeners
};
