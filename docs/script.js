// Menu Hamburger Mobile
document.addEventListener('DOMContentLoaded', function() {
    // Détection de la page active
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('nav a');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href) {
            // Pour la page d'accueil (index.html ou /)
            if ((currentPath.includes('index.html') || currentPath === '/' || currentPath.endsWith('/')) && href.includes('#about')) {
                link.classList.add('active');
            }
            // Pour la page projets
            else if (currentPath.includes('projets.html') && href.includes('projets.html')) {
                link.classList.add('active');
            }
            // Pour la page contact
            else if (currentPath.includes('contact.html') && href.includes('contact.html')) {
                link.classList.add('active');
            }
        }
    });

    const hamburger = document.querySelector('.hamburger');
    const navUl = document.querySelector('nav ul');
    const navLinks = document.querySelectorAll('nav a');

    // Toggle menu quand on clique sur le hamburger
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navUl.classList.toggle('active');
        });
    }

    // Fermer le menu quand on clique sur un lien
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (hamburger) {
                hamburger.classList.remove('active');
                navUl.classList.remove('active');
            }
        });
    });

    // Fermer le menu au redimensionnement de la fenêtre
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            if (hamburger) {
                hamburger.classList.remove('active');
                navUl.classList.remove('active');
            }
        }
    });

    // Bouton retour en haut (handled below with IntersectionObserver)

    // Animation des éléments au scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observer les articles et cartes
    document.querySelectorAll('.project-card, .contact-card').forEach(el => {
        observer.observe(el);
    });

    // Smooth scroll pour les liens anchor
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

    // Compteurs d'animation
    const counters = document.querySelectorAll('.counter-value');
    let hasRun = false;

    const runCounters = () => {
        if (hasRun) return;

        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000;
            const increment = target / (duration / 50);
            let current = 0;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    setTimeout(updateCounter, 50);
                } else {
                    counter.textContent = target;
                    hasRun = true;
                }
            };

            updateCounter();
        });
    };

    // Déclencher les compteurs quand on scroll jusqu'à leur section
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !hasRun) {
                runCounters();
            }
        }, { threshold: 0.5 });
        
        statsObserver.observe(statsSection);
    }

    // Back to Top Button
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});
