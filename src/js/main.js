/**
 * Swing Digital - Main JavaScript
 * Vanilla JS - no framework
 * WCAG 2.2 AA compliant
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize
    initNavActiveState();
    initHamburger();
    initDropdown();
    initAccessibility();
    initEventListeners();
    initScrollTracking();
    initDisclosure();
    initVimeoConditional();
    initPodcastPlayer();
    initScrollReveal();
    initHeroVideo();
    initAnchorRedirects();
    initDisabledCTA();
    initHeaderSpacing();
    initContactVideo();
    initBackToTop();
});

var manualAnchorHash = null;
var manualAnchorUntil = 0;

/**
 * Etat actif du menu — lit data-section et data-page sur <body>
 */
function initNavActiveState() {
    var section = document.body.dataset.section;
    if (!section) return;

    // Retirer tous les etats actifs
    document.querySelectorAll('.site-nav__link, .site-nav__btn').forEach(function(el) {
        el.classList.remove('site-nav__link--active', 'site-nav__btn--active');
        el.removeAttribute('aria-current');
    });

    // Appliquer l'etat actif selon data-section
    var sectionMap = {
        'accueil': 'index.html',
        'espaces': 'espaces-augmentes.html',
        'reservations': 'reservations.html'
    };

    if (sectionMap[section]) {
        var link = document.querySelector('.site-nav__link[href="' + sectionMap[section] + '"]');
        if (link) {
            link.classList.add('site-nav__link--active');
            link.setAttribute('aria-current', 'page');
        }
    }

    // Section experiences — activer le bouton dropdown
    if (section === 'experiences') {
        var btn = document.querySelector('.site-nav__btn[aria-controls="submenu-experiences"]');
        if (btn) {
            btn.classList.add('site-nav__btn--active');
        }
        // Activer le lien du sous-menu correspondant a data-page
        var page = document.body.dataset.page;
        if (page) {
            // Comparer via URL pour eviter les faux positifs de suffixe
            // (ex: foo.html comme suffixe de bar-foo.html)
            var currentPath = window.location.pathname;
            document.querySelectorAll('.site-nav__submenu-link').forEach(function(link) {
                var href = link.getAttribute('href');
                if (!href) return;
                try {
                    var resolved = new URL(href, window.location.href).pathname;
                    if (resolved === currentPath) {
                        link.setAttribute('aria-current', 'page');
                    }
                } catch (e) {
                    // URL malformee : on ignore silencieusement ce lien
                }
            });
        }
    }
}

/**
 * Menu hamburger mobile
 * Toggle, focus trap, Escape, clic exterieur
 */
function initHamburger() {
    var burger = document.querySelector('.site-nav__burger');
    var menu = document.getElementById('main-menu');
    if (!burger || !menu) return;

    burger.addEventListener('click', function() {
        var isOpen = burger.getAttribute('aria-expanded') === 'true';
        toggleMenu(!isOpen);
    });

    // Fermeture Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && burger.getAttribute('aria-expanded') === 'true') {
            toggleMenu(false);
            burger.focus();
        }
    });

    // Clic exterieur ferme le menu
    document.addEventListener('click', function(e) {
        if (burger.getAttribute('aria-expanded') === 'true' &&
            !menu.contains(e.target) && !burger.contains(e.target)) {
            toggleMenu(false);
        }
    });

    function toggleMenu(open) {
        burger.setAttribute('aria-expanded', open ? 'true' : 'false');
        menu.classList.toggle('site-nav__list--open', open);

        if (open) {
            // Focus trap : premier lien focusable dans le menu
            var firstLink = menu.querySelector('a, button');
            if (firstLink) firstLink.focus();
        }
    }
}

/**
 * Sous-menu dropdown Experiences Series
 * Conforme AcceDe Web — clic uniquement, clavier complet
 */
function initDropdown() {
    var buttons = document.querySelectorAll('.site-nav__btn[aria-controls]');

    buttons.forEach(function(btn) {
        var submenuId = btn.getAttribute('aria-controls');
        var submenu = document.getElementById(submenuId);
        if (!submenu) return;
        btn.setAttribute('aria-haspopup', 'true');

        // Clic toggle
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            var isOpen = btn.getAttribute('aria-expanded') === 'true';
            closeAllDropdowns();
            if (!isOpen) {
                openDropdown(btn, submenu);
            }
        });

        // Clavier sur le bouton
        btn.addEventListener('keydown', function(e) {
            var items = submenu.querySelectorAll('.site-nav__submenu-link');
            if (items.length === 0) return;

            if (e.key === 'ArrowDown') {
                e.preventDefault();
                if (btn.getAttribute('aria-expanded') !== 'true') {
                    openDropdown(btn, submenu);
                }
                items[0].focus();
            }

            if (e.key === 'Escape') {
                closeDropdown(btn, submenu);
                btn.focus();
            }
        });

        // Clavier dans le sous-menu
        submenu.addEventListener('keydown', function(e) {
            var items = Array.from(submenu.querySelectorAll('.site-nav__submenu-link'));
            var currentIndex = items.indexOf(document.activeElement);

            if (e.key === 'ArrowDown') {
                e.preventDefault();
                var next = currentIndex + 1 < items.length ? currentIndex + 1 : 0;
                items[next].focus();
            }

            if (e.key === 'ArrowUp') {
                e.preventDefault();
                if (currentIndex <= 0) {
                    btn.focus();
                } else {
                    items[currentIndex - 1].focus();
                }
            }

            if (e.key === 'Home') {
                e.preventDefault();
                items[0].focus();
            }

            if (e.key === 'End') {
                e.preventDefault();
                items[items.length - 1].focus();
            }

            if (e.key === 'Escape') {
                e.preventDefault();
                closeDropdown(btn, submenu);
                btn.focus();
            }
        });

        // Fermeture quand le focus quitte le sous-menu
        submenu.addEventListener('focusout', function(e) {
            // Verifier apres un tick que le focus n'est pas reste dans le sous-menu ou sur le bouton
            setTimeout(function() {
                if (!submenu.contains(document.activeElement) && document.activeElement !== btn) {
                    closeDropdown(btn, submenu);
                }
            }, 0);
        });
    });

    // Clic exterieur ferme les dropdowns
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.site-nav__item')) {
            closeAllDropdowns();
        }
    });

    function openDropdown(btn, submenu) {
        btn.setAttribute('aria-expanded', 'true');
        submenu.classList.add('site-nav__submenu--open');
    }

    function closeDropdown(btn, submenu) {
        btn.setAttribute('aria-expanded', 'false');
        submenu.classList.remove('site-nav__submenu--open');
    }

    // Sous-menu niveau 3 (Monroe)
    var desktopMq = window.matchMedia('(min-width: 1024px)');
    var toggles = document.querySelectorAll('.site-nav__submenu-toggle[aria-controls]');
    toggles.forEach(function(toggle) {
        var subId = toggle.getAttribute('aria-controls');
        var sub = document.getElementById(subId);
        var parentItem = toggle.closest('.site-nav__submenu-item--has-children');
        if (!sub) return;
        toggle.setAttribute('aria-haspopup', 'true');

        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            var isOpen = toggle.getAttribute('aria-expanded') === 'true';
            if (isOpen && !desktopMq.matches) {
                closeLevel3(toggle, sub);
            } else {
                closeAllLevel3(toggle);
                openLevel3(toggle, sub);
            }
        });

        if (parentItem) {
            parentItem.addEventListener('mouseenter', function() {
                if (desktopMq.matches) {
                    closeAllLevel3(toggle);
                    openLevel3(toggle, sub);
                }
            });

            parentItem.addEventListener('mouseleave', function() {
                if (desktopMq.matches) {
                    closeLevel3(toggle, sub);
                }
            });

            parentItem.addEventListener('focusin', function() {
                if (desktopMq.matches) {
                    closeAllLevel3(toggle);
                    openLevel3(toggle, sub);
                }
            });

            parentItem.addEventListener('focusout', function() {
                setTimeout(function() {
                    if (desktopMq.matches && !parentItem.contains(document.activeElement)) {
                        closeLevel3(toggle, sub);
                    }
                }, 0);
            });
        }

        // Escape ferme le sous-menu niveau 3
        sub.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                e.stopPropagation();
                closeLevel3(toggle, sub);
                toggle.focus();
            }
        });
    });

    function openLevel3(toggle, submenu) {
        toggle.setAttribute('aria-expanded', 'true');
        submenu.classList.add('site-nav__submenu--open');
        alignLevel3(submenu);
    }

    function closeLevel3(toggle, submenu) {
        toggle.setAttribute('aria-expanded', 'false');
        submenu.classList.remove('site-nav__submenu--open', 'site-nav__submenu--align-left');
    }

    function closeAllLevel3(exceptToggle) {
        document.querySelectorAll('.site-nav__submenu-toggle[aria-controls]').forEach(function(t) {
            if (t === exceptToggle) return;
            var s3 = document.getElementById(t.getAttribute('aria-controls'));
            if (s3) {
                closeLevel3(t, s3);
            }
        });
    }

    function alignLevel3(submenu) {
        if (!desktopMq.matches) {
            submenu.classList.remove('site-nav__submenu--align-left');
            return;
        }

        submenu.classList.remove('site-nav__submenu--align-left');
        // Flip si le sous-menu déborde à droite du viewport.
        requestAnimationFrame(function() {
            if (submenu.getBoundingClientRect().right > window.innerWidth - 16) {
                submenu.classList.add('site-nav__submenu--align-left');
            }
        });
    }

    function closeAllDropdowns() {
        // Fermer niveau 3 aussi
        document.querySelectorAll('.site-nav__submenu-toggle[aria-controls]').forEach(function(t) {
            var s3 = document.getElementById(t.getAttribute('aria-controls'));
            if (s3) {
                t.setAttribute('aria-expanded', 'false');
                s3.classList.remove('site-nav__submenu--open', 'site-nav__submenu--align-left');
            }
        });
        document.querySelectorAll('.site-nav__btn[aria-controls]').forEach(function(b) {
            var s = document.getElementById(b.getAttribute('aria-controls'));
            if (s) {
                b.setAttribute('aria-expanded', 'false');
                s.classList.remove('site-nav__submenu--open');
            }
        });
    }
}

/**
 * Accessibility Setup
 */
function initAccessibility() {
    // Skip link est maintenant en dur dans le HTML — plus besoin de addSkipLink()
    manageFocusOutline();
}

function manageFocusOutline() {
    document.addEventListener('keydown', function() {
        document.body.classList.add('keyboard-nav');
    });

    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-nav');
    });
}

/**
 * Event Listeners — smooth scroll pour ancres internes
 */
function initEventListeners() {
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            var href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                var target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    manualAnchorHash = href;
                    manualAnchorUntil = Date.now() + 2500;
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    window.history.replaceState(null, '', href);
                }
            }
        });
    });
}

/**
 * Scroll Tracking — met a jour l'URL anchor selon la section visible
 */
function initScrollTracking() {
    var sections = document.querySelectorAll('section[id]');
    if (sections.length === 0) return;

    var visibleSections = new Map();

    function isVisibleNonSectionAnchor(hash) {
        if (!hash || /^#page-\d+$/.test(hash)) return false;

        try {
            var target = document.querySelector(hash);
            if (!target || target.tagName.toLowerCase() === 'section') return false;

            var rect = target.getBoundingClientRect();
            return rect.top >= 0 && rect.top <= window.innerHeight;
        } catch (e) {
            return false;
        }
    }

    var observer = new IntersectionObserver(function(entries) {
        if (manualAnchorHash && Date.now() < manualAnchorUntil) {
            if (window.location.hash !== manualAnchorHash) {
                window.history.replaceState(null, '', manualAnchorHash);
            }
            return;
        }

        if (manualAnchorHash && isVisibleNonSectionAnchor(manualAnchorHash)) {
            if (window.location.hash !== manualAnchorHash) {
                window.history.replaceState(null, '', manualAnchorHash);
            }
            return;
        }

        if (isVisibleNonSectionAnchor(window.location.hash)) return;

        manualAnchorHash = null;

        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                visibleSections.set(entry.target.id, entry.intersectionRatio);
            } else {
                visibleSections.delete(entry.target.id);
            }
        });

        var currentSection = null;
        var maxRatio = 0;

        visibleSections.forEach(function(ratio, id) {
            if (ratio > maxRatio) {
                maxRatio = ratio;
                currentSection = id;
            }
        });

        if (currentSection && window.location.hash !== '#' + currentSection) {
            window.history.replaceState(null, '', '#' + currentSection);
        }
    }, {
        root: null,
        rootMargin: '0px',
        threshold: 0.3
    });

    sections.forEach(function(section) {
        observer.observe(section);
    });
}

/**
 * Chargement conditionnel de Vimeo Player API
 * Charge le script uniquement si une iframe Vimeo est presente
 */
function initVimeoConditional() {
    if (!document.querySelector('iframe[src*="vimeo"]')) return;

    var script = document.createElement('script');
    script.src = 'https://player.vimeo.com/api/player.js';
    script.onload = function() {
        initVideoSound();
    };
    document.head.appendChild(script);
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
 * Exclut les boutons du header (hamburger + dropdown geres separement)
 */
function initDisclosure() {
    var buttons = document.querySelectorAll('#main-content button[aria-expanded][aria-controls]');

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
                    btn.focus();
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
 */
function initPodcastPlayer() {
    var player = document.getElementById('page33-player');
    var episodes = document.querySelectorAll('.page33__episode');
    if (!player || !episodes.length) return;

    episodes.forEach(function(ep) {
        var btn = ep.querySelector('.page33__episode-btn');
        if (!btn) return;
        btn.addEventListener('click', function() {
            var vid = ep.dataset.vid;
            var title = ep.dataset.title;
            player.src = 'https://www.youtube.com/embed/' + vid + '?rel=0&autoplay=1';
            player.title = title;
            episodes.forEach(function(e) {
                e.classList.remove('page33__episode--active');
                var otherBtn = e.querySelector('.page33__episode-btn');
                if (otherBtn) otherBtn.removeAttribute('aria-current');
            });
            ep.classList.add('page33__episode--active');
            btn.setAttribute('aria-current', 'true');
        });
    });
}

/**
 * Scroll Reveal — revelation progressive des elements au scroll
 * Respecte prefers-reduced-motion
 */
function initScrollReveal() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

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

    if (elements.length === 0) {
        document.querySelectorAll('#main-content section').forEach(function(section) {
            var children = section.children;
            for (var i = 0; i < children.length; i++) {
                children[i].classList.add('reveal');
            }
        });
    } else {
        elements.forEach(function(el) {
            if (el.closest('#page-1')) return;
            el.classList.add('reveal');
        });
    }

    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal--visible');
                observer.unobserve(entry.target);
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

/**
 * Hero Video - controle du son
 */
function initHeroVideo() {
    var video = document.getElementById('hero-video');
    var btn = document.getElementById('hero-sound-btn');
    if (!video || !btn) return;

    btn.addEventListener('click', function() {
        if (video.muted) {
            video.muted = false;
            btn.setAttribute('aria-pressed', 'true');
            btn.setAttribute('aria-label', 'Couper le son');
        } else {
            video.muted = true;
            btn.setAttribute('aria-pressed', 'false');
            btn.setAttribute('aria-label', 'Activer le son');
        }
    });
}

/**
 * Redirection des ancres orphelines (ex-single-page)
 * Execute uniquement sur index.html (guard data-page === 'accueil')
 */
function initAnchorRedirects() {
    if (document.body.dataset.page !== 'accueil') return;

    var anchorRedirects = {
        'page-5': 'espaces-augmentes.html',
        'page-6': 'espaces-augmentes.html',
        'page-7': 'espaces-augmentes.html',
        'page-9': 'experiences-series.html',
        'page-10': 'experiences-series.html',
        'page-11': 'experience-monroe.html',
        'page-12': 'experience-monroe.html',
        'page-13': 'experience-monroe.html',
        'page-24': 'experience-monroe.html',
        'page-14': 'monroe-piece.html',
        'page-15': 'monroe-piece.html',
        'page-16': 'monroe-piece.html',
        'page-17': 'monroe-piece.html',
        'page-18': 'monroe-piece.html',
        'page-19': 'monroe-piece.html',
        'page-20': 'monroe-roman-graphique.html',
        'page-21': 'monroe-roman-graphique.html',
        'page-22': 'monroe-roman-graphique.html',
        'page-23': 'monroe-installation.html',
        'page-25': 'monroe-photographie.html',
        'page-26': 'monroe-photographie.html',
        'page-27': 'monroe-composition.html',
        'page-28': 'monroe-composition.html',
        'page-29': 'monroe-composition.html',
        'page-30': 'monroe-composition.html',
        'page-31': 'monroe-composition.html',
        'page-32': 'monroe-composition.html',
        'page-33': 'monroe-podcasts.html',
        'page-34': 'monroe-interviews.html',
        'page-35': 'monroe-interviews.html',
        'page-36': 'monroe-interviews.html',
        'page-37': 'monroe-experiences.html',
        'page-38': 'monroe-experiences.html',
        'page-39': 'monroe-experiences.html',
        'page-40': 'monroe-quiz.html',
        'page-41': 'monroe-quiz.html',
        'page-42': 'voyage-autour-de-moi.html',
        'page-43': 'voyage-autour-de-moi.html',
        'page-44': 'voyage-autour-de-moi.html',
        'page-45': 'dessine-moi-le-vent.html',
        'page-46': 'dessine-moi-le-vent.html',
        'page-47': 'dessine-moi-le-vent.html',
        'page-48': 'ni-vues-ni-connues.html',
        'page-49': 'ni-vues-ni-connues.html',
        'page-50': 'marilyn.html',
        'page-51': 'marilyn.html',
        'page-52': 'marilyn.html',
        'page-53': 'toulouse-lautrec.html',
        'page-54': 'toulouse-lautrec.html',
        'page-55': 'charlotte-henschel.html',
        'page-56': 'charlotte-henschel.html',
        'page-57': 'xr-corporate.html',
        'page-58': 'reservations.html',
        'page-59': 'reservations.html',
        'page-60': 'reservations.html',
        'page-61': 'reservations.html'
    };

    var hash = window.location.hash.replace('#', '');
    if (hash && anchorRedirects[hash]) {
        window.location.replace(anchorRedirects[hash]);
    }
}

/**
 * Ajuste dynamiquement le spacing sous le header fixe
 * Necessaire pour le zoom 200% (RGAA 10.4 / WCAG 1.4.4)
 */
function initHeaderSpacing() {
    var header = document.querySelector('.site-header');
    if (!header) return;

    function update() {
        var h = header.offsetHeight;
        document.documentElement.style.setProperty('--header-height', h + 'px');
        document.documentElement.style.setProperty('--header-height-actual', h + 'px');
        // Ne PAS écrire de style inline sur le breadcrumb — le CSS gère
        // le margin-top via calc(var(--header-height) + var(--safe-top))
    }

    update();
    var resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(update, 100);
    }, { passive: true });
}

/**
 * Video contact (page 62) — play/pause + autoplay au scroll
 */
function initContactVideo() {
    var video = document.getElementById('contact-video');
    var btn = document.getElementById('contact-video-btn');
    if (!video || !btn) return;

    var labelPlay = 'Lancer la vidéo d\'ambiance de la section Contact';
    var labelPause = 'Mettre en pause la vidéo d\'ambiance de la section Contact';

    function setPlaying() {
        btn.setAttribute('aria-label', labelPause);
        btn.classList.add('page62__play-btn--playing');
    }

    function setPaused() {
        btn.setAttribute('aria-label', labelPlay);
        btn.classList.remove('page62__play-btn--playing');
    }

    // Video en pause par defaut — ne demarre qu'au clic sur le bouton
    video.pause();
    setPaused();

    // Bouton play/pause
    btn.addEventListener('click', function() {
        if (video.paused) {
            var playPromise = video.play();
            if (playPromise !== undefined) {
                playPromise.then(function() {
                    setPlaying();
                }).catch(function() {
                    setPaused(); /* iOS autoplay policy */
                });
            } else {
                setPlaying();
            }
        } else {
            video.pause();
            setPaused();
        }
    });
}


/**
 * Bouton retour en haut de page
 * Cree en JS (degradation gracieuse : absent si JS desactive)
 */
function initBackToTop() {
    var btn = document.createElement('button');
    btn.className = 'back-to-top';
    btn.setAttribute('type', 'button');
    btn.setAttribute('aria-label', 'Retour en haut de page');
    btn.innerHTML = '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M12 4l-8 8h5v8h6v-8h5z" fill="currentColor"/></svg>';
    document.body.appendChild(btn);

    var visible = false;
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300 && !visible) {
            btn.classList.add('back-to-top--visible');
            visible = true;
        } else if (window.scrollY <= 300 && visible) {
            btn.classList.remove('back-to-top--visible');
            visible = false;
        }
    }, { passive: true });

    btn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/**
 * CTA desactives (billetterie non definie)
 * Bloque le clic sur les boutons aria-disabled="true"
 */
function initDisabledCTA() {
    document.querySelectorAll('[aria-disabled="true"]').forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
        });
    });
}
