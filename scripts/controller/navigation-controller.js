export function navigationController() {
    let lastScrollTop = 0;
    let scrollThreshold = 10; // Minimum scroll distance to trigger
    let navTimeout;

    // Navigation elements
    const nav = document.getElementById('main-nav');
    const goToTopBtn = document.getElementById('go-to-top');
    const progressBar = document.getElementById('scroll-progress-bar');

    // ── Scroll Spy setup ────────────────────────────────────────────────────
    const sections   = Array.from(document.querySelectorAll('section[id]'));
    const desktopLinks = Array.from(document.querySelectorAll('.hidden.md\\:flex .nav-link[href^="#"]'));

    function updateScrollSpy() {
        // Trigger line: 40% from top of viewport
        const triggerY = window.scrollY + window.innerHeight * 0.4;
        let activeId = sections[0]?.id ?? '';

        for (const section of sections) {
            if (triggerY >= section.offsetTop) {
                activeId = section.id;
            }
        }

        desktopLinks.forEach(link => {
            const isActive = link.getAttribute('href') === `#${activeId}`;
            link.classList.toggle('nav-active', isActive);
        });
    }

    // Run once on load
    updateScrollSpy();

    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    // Scroll event listener for navigation hide/show
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // ── Scroll progress bar ──────────────────────────────────────────
        if (progressBar) {
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const progress = scrollHeight > 0 ? scrollTop / scrollHeight : 0;
            progressBar.style.transform = `scaleX(${progress})`;
        }

        // ── Scroll spy ───────────────────────────────────────────────────
        updateScrollSpy();
        
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

    function applyThemeChange() {
        html.classList.toggle('dark');
        const isDark = html.classList.contains('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        lucide.createIcons();
    }

    function toggleTheme(triggerEl) {
        // Fallback: no View Transitions support → instant toggle
        if (!document.startViewTransition) {
            applyThemeChange();
            return;
        }

        // Get ripple origin from the button that was clicked
        const rect = triggerEl.getBoundingClientRect();
        const x = rect.left + rect.width  / 2;
        const y = rect.top  + rect.height / 2;

        // Radius large enough to cover the farthest screen corner
        const endRadius = Math.hypot(
            Math.max(x, window.innerWidth  - x),
            Math.max(y, window.innerHeight - y)
        );

        const transition = document.startViewTransition(applyThemeChange);

        transition.ready.then(() => {
            document.documentElement.animate(
                {
                    clipPath: [
                        `circle(0px at ${x}px ${y}px)`,
                        `circle(${endRadius}px at ${x}px ${y}px)`,
                    ],
                },
                {
                    duration: 450,
                    easing: 'ease-in-out',
                    pseudoElement: '::view-transition-new(root)',
                }
            );
        });
    }

    themeToggle.addEventListener('click', () => toggleTheme(themeToggle));
    themeToggleMobile.addEventListener('click', () => toggleTheme(themeToggleMobile));

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

    // ── Tools dropdown ──────────────────────────────────────────────────────
    const toolsDropdown = document.getElementById('nav-tools-dropdown');
    if (toolsDropdown) {
        const trigger = toolsDropdown.querySelector('.nav-dropdown-trigger');

        // Toggle open on trigger click
        trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            toolsDropdown.classList.toggle('open');
        });

        // Close when clicking outside
        document.addEventListener('click', () => {
            toolsDropdown.classList.remove('open');
        });

        // "Skill Match Calculator" item → scroll to skills + open match view
        const skillMatchLink = document.getElementById('nav-skill-match-link');
        if (skillMatchLink) {
            skillMatchLink.addEventListener('click', () => {
                toolsDropdown.classList.remove('open');
                const skillsEl = document.getElementById('skills');
                if (skillsEl) skillsEl.scrollIntoView({ behavior: 'smooth' });
                setTimeout(() => {
                    window.dispatchEvent(new CustomEvent('open-skill-match'));
                }, 650);
            });
        }

        // "Terminal" item in dropdown → forward to terminal toggle button
        const terminalDropdownItem = document.getElementById('nav-terminal-in-dropdown');
        if (terminalDropdownItem) {
            terminalDropdownItem.addEventListener('click', () => {
                toolsDropdown.classList.remove('open');
                const termBtn = document.getElementById('terminal-toggle');
                if (termBtn) termBtn.click();
            });
        }
    }
}