import { populateCertificates } from './controller/certificate-controller.js';
import { populateExperiences } from './controller/experience-controller.js';
import { populateProjects, setupProjectFilters, setupProjectModal } from './controller/project-controller.js';
// Initialize Lucide icons
lucide.createIcons();

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

// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Show more/less functionality
function setupToggleButtons() {
    // About section toggle
    const aboutToggle = document.getElementById('about-toggle');
    const aboutText = document.getElementById('about-text');
    const fullAboutText = "Computer Science undergraduate at Gunadarma University with practical experience in Android development using Kotlin and Jetpack Compose. Actively engaged in projects and internships that focus on creating user-friendly applications. Keen to further develop professional skills in a dynamic tech environment. Passionate about mobile development, machine learning, and system administration. Always eager to learn new technologies and contribute to innovative projects that make a positive impact on society.";
    const shortAboutText = "Computer Science undergraduate at Gunadarma University with practical experience in Android development using Kotlin and Jetpack Compose. Actively engaged in projects and internships that focus on creating user-friendly applications...";
    
    let aboutExpanded = false;
    aboutText.textContent = shortAboutText;
    
    aboutToggle.addEventListener('click', () => {
        aboutExpanded = !aboutExpanded;
        aboutText.textContent = aboutExpanded ? fullAboutText : shortAboutText;
        aboutToggle.querySelector('.show-more').classList.toggle('hidden', aboutExpanded);
        aboutToggle.querySelector('.show-less').classList.toggle('hidden', !aboutExpanded);
        aboutToggle.querySelector('.show-more-icon').classList.toggle('hidden', aboutExpanded);
        aboutToggle.querySelector('.show-less-icon').classList.toggle('hidden', !aboutExpanded);
    });
    
    // Experience section toggle
    const experienceToggle = document.getElementById('experience-toggle');
    let experienceExpanded = false;
    
    experienceToggle.addEventListener('click', () => {
        experienceExpanded = !experienceExpanded;
        const hiddenExperiences = document.querySelectorAll('.experience-item.hidden');
        const visibleExperiences = document.querySelectorAll('.experience-item:not(.hidden)');
        
        if (experienceExpanded) {
            hiddenExperiences.forEach(exp => exp.classList.remove('hidden'));
        } else {
            visibleExperiences.forEach((exp, index) => {
                if (index >= 3) exp.classList.add('hidden');
            });
        }
        
        experienceToggle.querySelector('.show-more').classList.toggle('hidden', experienceExpanded);
        experienceToggle.querySelector('.show-less').classList.toggle('hidden', !experienceExpanded);
        experienceToggle.querySelector('.show-more-icon').classList.toggle('hidden', experienceExpanded);
        experienceToggle.querySelector('.show-less-icon').classList.toggle('hidden', !experienceExpanded);
    });
    
    // Projects section toggle
    const projectsToggle = document.getElementById('projects-toggle');
    let projectsExpanded = false;
    
    projectsToggle.addEventListener('click', () => {
        projectsExpanded = !projectsExpanded;
        const hiddenProjects = document.querySelectorAll('.project-card.hidden');
        const visibleProjects = document.querySelectorAll('.project-card:not(.hidden)');
        
        if (projectsExpanded) {
            hiddenProjects.forEach(project => project.classList.remove('hidden'));
        } else {
            visibleProjects.forEach((project, index) => {
                if (index >= 6) project.classList.add('hidden');
            });
        }
        
        projectsToggle.querySelector('.show-more').classList.toggle('hidden', projectsExpanded);
        projectsToggle.querySelector('.show-less').classList.toggle('hidden', !projectsExpanded);
        projectsToggle.querySelector('.show-more-icon').classList.toggle('hidden', projectsExpanded);
        projectsToggle.querySelector('.show-less-icon').classList.toggle('hidden', !projectsExpanded);
    });

    // Certificates section toggle
    const certificatesToggle = document.getElementById('certificates-toggle');
    let certificatesExpanded = false;
    
    certificatesToggle.addEventListener('click', () => {
        certificatesExpanded = !certificatesExpanded;
        const hiddenCertificates = document.querySelectorAll('.certificate-card.hidden');
        const visibleCertificates = document.querySelectorAll('.certificate-card:not(.hidden)');
        
        if (certificatesExpanded) {
            hiddenCertificates.forEach(cert => cert.classList.remove('hidden'));
        } else {
            visibleCertificates.forEach((cert, index) => {
                if (index >= 3) cert.classList.add('hidden');
            });
        }
        
        certificatesToggle.querySelector('.show-more').classList.toggle('hidden', certificatesExpanded);
        certificatesToggle.querySelector('.show-less').classList.toggle('hidden', !certificatesExpanded);
        certificatesToggle.querySelector('.show-more-icon').classList.toggle('hidden', certificatesExpanded);
        certificatesToggle.querySelector('.show-less-icon').classList.toggle('hidden', !certificatesExpanded);
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            mobileMenu.classList.add('hidden');
        }
    });
});

// Typing animation
const typingText = document.getElementById('typing-text');
const texts = [
    'Mobile Developer & IT Infrastructure Engineer',
    'Android Developer with Kotlin & Jetpack Compose',
    'Course Instructor & Technology Enthusiast',
    'Computer Science Student at Gunadarma University'
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeWriter() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
        typingText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentText.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typeSpeed = 500;
    }

    setTimeout(typeWriter, typeSpeed);
}

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Contact form handling
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
    const body = encodeURIComponent(`Name: ${name}
Email: ${email}

Message:
${message}`);
    const mailtoLink = `mailto:farhanfathur73@gmail.com?subject=${subject}&body=${body}`;
    
    window.location.href = mailtoLink;
    alert('Thank you for your message! Your email client should open now.');
    this.reset();
});

// Active navigation highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('text-primary');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('text-primary');
        }
    });
});

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Start typing animation
    setTimeout(typeWriter, 1000);
    
    // Populate sections
    populateExperiences();
    populateProjects();
    populateCertificates();
    
    // Setup functionality
    setupProjectFilters();
    setupProjectModal();
    setupToggleButtons();
    
    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
    
    // Refresh icons after all content is loaded
    setTimeout(() => {
        lucide.createIcons();
    }, 100);
});