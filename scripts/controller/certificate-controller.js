import { certificates } from "../data/certificates.js";

// Populate certificates section
function populateCertificates() {
    const container = document.getElementById('certificates-container');
    const visibleCount = 3;
    
    certificates.forEach((cert, index) => {
        const certElement = document.createElement('div');
        certElement.className = `certificate-card fade-in ${index >= visibleCount ? 'hidden' : ''} stagger-animation`;
        certElement.style.setProperty('--stagger', index);
        
        certElement.innerHTML = `
            <div class="certificate-preview relative h-44 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 overflow-hidden flex items-center justify-center group">
                <div class="w-20 h-20 rounded-full flex items-center justify-center text-white font-bold text-2xl" style="background-color: ${cert.color}">
                ${cert.image ? 
                    `<img src="${cert.image}" alt="${cert.title}" class="absolute inset-0 w-full h-full object-cover rounded-t-xl opacity-50 group-hover:opacity-100 transition-opacity duration-300">` : 
                    `<i data-lucide="${cert.icon}" class="w-10 h-10"></i>`
                }
                </div>
                <div class="certificate-overlay absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <a href="${cert.url}" target="_blank" rel="noopener noreferrer" class="bg-white text-gray-900 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center gap-2">
                    View Certificate
                    <i data-lucide="external-link" class="w-4 h-4"></i>
                </a>
                </div>
            </div>
            <div class="certificate-content p-6">
                <div class="flex items-center justify-between mb-2">
                <span class="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">${cert.type}</span>
                <span class="text-xs font-semibold text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-600 px-2 py-1 rounded-full">${cert.year}</span>
                </div>
                <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2">${cert.title}</h3>
                <p class="text-gray-600 dark:text-gray-400 font-semibold">${cert.issuer}</p>
            </div>
        `;
        container.appendChild(certElement);
    });
    lucide.createIcons();
}

function setupCertificatesToggle() {
    const certificatesToggle = document.getElementById('certificates-toggle');
    const certificatesSection = document.getElementById('certifications');
    let certificatesExpanded = false;

    function scrollToCertificates() {
        if (certificatesSection) {
            certificatesSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

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

        // Smooth scroll ke atas saat show less diklik
        if (!certificatesExpanded) {
            // Delay sedikit untuk memberikan waktu animasi hide projects selesai
            setTimeout(() => {
                scrollToCertificates();
            }, 100);
        }

        certificatesToggle.querySelector('.show-more').classList.toggle('hidden', certificatesExpanded);
        certificatesToggle.querySelector('.show-less').classList.toggle('hidden', !certificatesExpanded);
        certificatesToggle.querySelector('.show-more-icon').classList.toggle('hidden', certificatesExpanded);
        certificatesToggle.querySelector('.show-less-icon').classList.toggle('hidden', !certificatesExpanded);
    });
}

export { populateCertificates, setupCertificatesToggle };