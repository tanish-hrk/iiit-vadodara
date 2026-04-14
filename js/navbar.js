/* ============================================
   IIIT Vadodara — Navbar Controller
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const mobileOverlay = document.querySelector('.mobile-overlay');

    if (!navbar) return;

    // === Scroll behavior ===
    let lastScroll = 0;

    function handleScroll() {
        const currentScroll = window.scrollY;

        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
            navbar.classList.remove('at-top');
        } else {
            navbar.classList.remove('scrolled');
            navbar.classList.add('at-top');
        }

        lastScroll = currentScroll;
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    // === Mobile Toggle ===
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            const isActive = navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');

            if (mobileOverlay) {
                if (isActive) {
                    mobileOverlay.style.display = 'block';
                    requestAnimationFrame(() => mobileOverlay.classList.add('active'));
                } else {
                    mobileOverlay.classList.remove('active');
                    setTimeout(() => { mobileOverlay.style.display = 'none'; }, 300);
                }
            }

            document.body.style.overflow = isActive ? 'hidden' : '';
        });

        // Close on overlay click
        if (mobileOverlay) {
            mobileOverlay.addEventListener('click', closeMenu);
        }
    }

    function closeMenu() {
        if (navToggle) navToggle.classList.remove('active');
        if (navMenu) navMenu.classList.remove('active');
        if (mobileOverlay) {
            mobileOverlay.classList.remove('active');
            setTimeout(() => { mobileOverlay.style.display = 'none'; }, 300);
        }
        document.body.style.overflow = '';
    }

    // === Mobile Dropdown Toggling ===
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        const link = item.querySelector('.nav-link');
        const dropdown = item.querySelector('.dropdown');

        if (link && dropdown) {
            link.addEventListener('click', (e) => {
                // Only for mobile
                if (window.innerWidth <= 1024) {
                    e.preventDefault();
                    
                    // Close other open dropdowns
                    navItems.forEach(otherItem => {
                        if (otherItem !== item) {
                            const otherDropdown = otherItem.querySelector('.dropdown');
                            if (otherDropdown) {
                                otherDropdown.classList.remove('mobile-open');
                            }
                        }
                    });

                    dropdown.classList.toggle('mobile-open');
                }
            });
        }
    });

    // === Close menu on nav link click (mobile) ===
    document.querySelectorAll('.dropdown-link').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 1024) {
                closeMenu();
            }
        });
    });

    // === Close menu on resize ===
    window.addEventListener('resize', () => {
        if (window.innerWidth > 1024) {
            closeMenu();
            document.querySelectorAll('.dropdown').forEach(d => {
                d.classList.remove('mobile-open');
            });
        }
    });

    // === Search Toggle ===
    const searchBtn = document.getElementById('searchBtn');
    const searchBox = document.getElementById('searchBox');

    if (searchBtn && searchBox) {
        searchBtn.addEventListener('click', (e) => {
            e.preventDefault();
            searchBox.classList.toggle('active');
        });

        // Close search on external click
        document.addEventListener('click', (e) => {
            if (!searchBtn.contains(e.target) && !searchBox.contains(e.target)) {
                searchBox.classList.remove('active');
            }
        });
    }

    // === Close menu on Escape key ===
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeMenu();
            if (searchBox) searchBox.classList.remove('active');
        }
    });
});
