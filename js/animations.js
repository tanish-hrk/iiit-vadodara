/* ============================================
   IIIT Vadodara — Scroll Animations
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    initScrollReveal();
});

function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

    if (revealElements.length === 0) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
        revealElements.forEach(el => {
            el.classList.add('revealed');
        });
        return;
    }

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -60px 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(el => {
        observer.observe(el);
    });

    // Also add stagger classes to grid children
    addStaggerToGrids();
}

function addStaggerToGrids() {
    const grids = document.querySelectorAll('.stats-grid, .programs-grid, .faculty-grid, .gallery-grid');

    grids.forEach(grid => {
        const children = grid.children;
        Array.from(children).forEach((child, index) => {
            if (!child.classList.contains('reveal') && 
                !child.classList.contains('reveal-left') &&
                !child.classList.contains('reveal-right') &&
                !child.classList.contains('reveal-scale')) {
                child.classList.add('reveal');
            }
            const staggerIndex = Math.min(index + 1, 8);
            child.classList.add(`stagger-${staggerIndex}`);
        });
    });

    // Re-observe newly added reveal elements
    const newRevealElements = document.querySelectorAll('.reveal:not(.revealed), .reveal-left:not(.revealed), .reveal-right:not(.revealed), .reveal-scale:not(.revealed)');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        rootMargin: '0px 0px -60px 0px',
        threshold: 0.1
    });

    newRevealElements.forEach(el => observer.observe(el));
}
