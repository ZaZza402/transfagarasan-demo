document.addEventListener('DOMContentLoaded', function() {

    // --- AOS (Animate on Scroll) Initialization ---
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });


    // --- Sticky Header Logic ---
    const header = document.getElementById('main-header');
    if (header) {
        const stickyThreshold = 10;
        const handleScroll = () => {
            if (window.scrollY > stickyThreshold) {
                header.classList.add('sticky');
            } else {
                header.classList.remove('sticky');
            }
        };
        window.addEventListener('scroll', handleScroll);
    }

    
    // --- Mobile Navigation Logic ---
    const hamburgerBtn = document.getElementById('hamburger-button');
    const navPanel = document.getElementById('main-nav');
    const menuOverlay = document.getElementById('menu-overlay');
    const navLinks = navPanel.querySelectorAll('a');
    const body = document.body;

    // Function to open or close the menu
    const toggleMenu = () => {
        const isOpen = navPanel.classList.contains('is-open');
        hamburgerBtn.setAttribute('aria-expanded', !isOpen);
        navPanel.classList.toggle('is-open');
        menuOverlay.classList.toggle('is-open');
        body.classList.toggle('body-no-scroll');
    };

    // Function to close the menu (used by multiple event listeners)
    const closeMenu = () => {
        hamburgerBtn.setAttribute('aria-expanded', 'false');
        navPanel.classList.remove('is-open');
        menuOverlay.classList.remove('is-open');
        body.classList.remove('body-no-scroll');
    };
    
    if (hamburgerBtn && navPanel && menuOverlay) {
        // Open/close menu when hamburger is clicked
        hamburgerBtn.addEventListener('click', toggleMenu);

        // Close menu when the overlay is clicked
        menuOverlay.addEventListener('click', closeMenu);

        // Close menu when a navigation link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                // We add a small delay to ensure the scroll happens smoothly
                // before the menu disappears completely.
                closeMenu();
                
                // Smooth scroll to section (original functionality)
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

});