document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Scroll Reveal Animation (CRITICAL) ---
    // The CSS hides elements with class="reveal" (opacity: 0).
    // This script detects when they scroll into view and makes them visible (opacity: 1).
    const revealElements = document.querySelectorAll('.fade-in, .reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 100; // Trigger when element is 100px up the screen

        revealElements.forEach((reveal) => {
            const elementTop = reveal.getBoundingClientRect().top;

            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('visible'); // Matches the CSS .visible class
                reveal.classList.add('active');  // Backup class depending on CSS version
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    // Run once on load to show the Header/Hero immediately
    revealOnScroll();


    // --- 2. Navbar Glass Effect ---
    // Adds a darker background when you scroll down
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(15, 23, 42, 0.95)';
                navbar.style.borderBottom = '1px solid rgba(56, 189, 248, 0.2)'; // Blue tint border
            } else {
                navbar.style.background = 'rgba(15, 23, 42, 0.85)';
                navbar.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
            }
        });
    }


    // --- 3. Mobile Menu Toggle ---
    // Handles opening/closing the menu on small screens
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            // Toggle logic
            if (navLinks.style.display === 'flex') {
                navLinks.style.display = 'none';
            } else {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '70px'; // Height of navbar
                navLinks.style.right = '0';
                navLinks.style.width = '100%';
                navLinks.style.background = '#0f172a'; // Dark Slate
                navLinks.style.padding = '2rem';
                navLinks.style.borderBottom = '1px solid rgba(255,255,255,0.1)';
                navLinks.style.zIndex = '999';
                navLinks.style.gap = '20px';
            }
        });
    }
});