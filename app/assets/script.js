document.addEventListener('DOMContentLoaded', () => {
    
    // --- Navbar Glass Effect on Scroll ---
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(15, 23, 42, 0.95)';
            navbar.style.boxShadow = '0 4px 30px rgba(0,0,0,0.3)';
        } else {
            navbar.style.background = 'rgba(15, 23, 42, 0.85)';
            navbar.style.boxShadow = 'none';
        }
    });

    // --- Mobile Menu Toggle ---
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    menuBtn.addEventListener('click', () => {
        if (navLinks.style.display === 'flex') {
            navLinks.style.display = 'none';
        } else {
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '70px';
            navLinks.style.left = '0';
            navLinks.style.width = '100%';
            navLinks.style.background = '#0f172a';
            navLinks.style.padding = '2rem';
            navLinks.style.borderBottom = '1px solid rgba(255,255,255,0.1)';
        }
    });
});