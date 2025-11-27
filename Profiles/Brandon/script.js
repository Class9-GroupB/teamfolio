document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Custom Cursor Logic ---
    const cursorDot = document.querySelector('[data-cursor-dot]');
    const cursorOutline = document.querySelector('[data-cursor-outline]');
    
    // Check if cursor elements exist to prevent errors
    if (cursorDot && cursorOutline) {
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            // Dot follows instantly
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            // Outline follows with delay (The "Floaty" Luxury feel)
            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: "forwards" });
        });
    }

    // --- 2. Hover States (Updated) ---
    // Added '.prj-btn' so the cursor reacts to your new project buttons
    const hoverables = document.querySelectorAll('a, button, .card, .social-btn, .image-wrapper, .prj-btn');
    
    hoverables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            document.body.classList.add('hovering');
        });
        el.addEventListener('mouseleave', () => {
            document.body.classList.remove('hovering');
        });
    });

    // --- 3. Navbar Blur Effect ---
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // --- 4. Scroll Reveal Animation ---
    const revealElements = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 100; // Trigger when element is 100px into view

        revealElements.forEach((reveal) => {
            const elementTop = reveal.getBoundingClientRect().top;

            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    // Trigger once on load to catch elements already visible
    revealOnScroll();

    // --- 5. Smooth Scroll for Anchor Links ---
    // Ensures clicking nav links scrolls smoothly to the section
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});