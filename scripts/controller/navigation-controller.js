export function navigationController() {
    let lastScrollTop = 0;
    let scrollThreshold = 10; // Minimum scroll distance to trigger
    let navTimeout;

    // Navigation elements
    const nav = document.getElementById('main-nav');
    const goToTopBtn = document.getElementById('go-to-top');

    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    // Scroll event listener for navigation hide/show
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Show/hide go-to-top button
        if (scrollTop > 300) {
            goToTopBtn.classList.remove('go-to-top-hidden');
        } else {
            goToTopBtn.classList.add('go-to-top-hidden');
        }

        // Navigation hide/show logic
        if (Math.abs(lastScrollTop - scrollTop) <= scrollThreshold) {
            return; // Don't do anything if scroll distance is too small
        }

        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down & past header height
            nav.classList.add('nav-hidden');
            // Close mobile menu if open
            mobileMenu.classList.add('hidden');
        } else {
            // Scrolling up
            nav.classList.remove('nav-hidden');
        }

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
    }, { passive: true });

    // Go to top button functionality
    goToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Close mobile menu when clicking nav links
    document.querySelectorAll('#mobile-menu a').forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.add('hidden');
        });
    });

    // Dark mode functionality
    const themeToggle = document.getElementById('theme-toggle');
    const themeToggleMobile = document.getElementById('theme-toggle-mobile');
    const html = document.documentElement;

    const currentTheme = localStorage.getItem('theme') || 'light';
    html.classList.toggle('dark', currentTheme === 'dark');

    function toggleTheme() {
        html.classList.toggle('dark');
        const isDark = html.classList.contains('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        lucide.createIcons();
    }

    themeToggle.addEventListener('click', toggleTheme);
    themeToggleMobile.addEventListener('click', toggleTheme);

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Show navigation when hovering near top of screen
    document.addEventListener('mousemove', function(e) {
        if (e.clientY < 100) {
            nav.classList.remove('nav-hidden');
        }
    });
}