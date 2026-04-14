/* ============================================
   IIIT Vadodara — Animated Stat Counters
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    initCounters();
});

function initCounters() {
    // Look for elements with data-target attribute
    const counters = document.querySelectorAll('[data-target]');
    if (counters.length === 0) return;

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.3
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Only animate if it hasn't been animated yet
                if (!entry.target.classList.contains('animated')) {
                    animateCounter(entry.target);
                    entry.target.classList.add('animated');
                }
            }
        });
    }, observerOptions);

    counters.forEach(counter => {
        // Only watch elements that are meant to be counters (have a number as target)
        const targetValue = counter.getAttribute('data-target');
        if (!isNaN(targetValue) && targetValue !== null && targetValue !== '') {
            observer.observe(counter);
        }
    });
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'), 10);
    const suffix = element.getAttribute('data-suffix') || '';
    const prefix = element.getAttribute('data-prefix') || '';
    const duration = 2000; // 2 seconds
    const startTime = performance.now();
    const startValue = 0;

    function easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
    }

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutCubic(progress);
        const currentValue = Math.round(startValue + (target - startValue) * easedProgress);

        // Update text content
        // If the element has children (like nested spans), we might want to only update a specific one
        // but for now, we'll replace the content or update the specific node.
        if (element.children.length === 0) {
            element.textContent = prefix + formatNumber(currentValue) + suffix;
        } else {
            // Find a child or update the first text node? 
            // Let's assume the element itself is the target if it has data-target
            element.textContent = prefix + formatNumber(currentValue) + suffix;
        }

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

function formatNumber(num) {
    if (num >= 1000) {
        return num.toLocaleString('en-IN');
    }
    return num.toString();
}

/* === Chart Bar Animation === */
document.addEventListener('DOMContentLoaded', () => {
    const chartBars = document.querySelectorAll('.chart-bar[data-height]');
    if (chartBars.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const height = entry.target.getAttribute('data-height');
                entry.target.style.height = height + '%';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    chartBars.forEach(bar => {
        // If height isn't set in style attribute or CSS, initialize it
        if (!bar.style.height || bar.style.height === '0px') {
            bar.style.height = '0';
        }
        observer.observe(bar);
    });
});
