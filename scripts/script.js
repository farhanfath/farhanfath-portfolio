import { populateCertificates, setupCertificatesToggle } from './controller/certificate-controller.js';
import { populateExperiences, setupExperienceToggle } from './controller/experience-controller.js';
import { populateProjects, setupProjectFilters, setupProjectModal, setupProjectsToggle } from './controller/project-controller.js';
import { setupAboutToggle } from './controller/about-controller.js';
import { typeWriter } from './controller/typing-text-controller.js';
import { navigationController } from './controller/navigation-controller.js';

// Initialize Lucide icons
lucide.createIcons();

// Show more/less functionality
function setupToggleButtons() {
    setupAboutToggle();
    setupExperienceToggle();
    setupProjectsToggle();
    setupCertificatesToggle();
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

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Start typing animation
    setTimeout(typeWriter, 1000);
    
    // Initialize navigation controller
    navigationController();

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