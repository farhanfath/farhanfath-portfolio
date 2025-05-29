import { certificates } from "../data/certificates.js";

// Populate certificates section
export function populateCertificates() {
    const container = document.getElementById('certificates-container');
    const visibleCount = 3;
    
    certificates.forEach((cert, index) => {
        const certElement = document.createElement('div');
        certElement.className = `certificate-card fade-in ${index >= visibleCount ? 'hidden' : ''} stagger-animation`;
        certElement.style.setProperty('--stagger', index);
        
        certElement.innerHTML = `
            <div class="certificate-preview">
                <div class="w-20 h-20 rounded-full flex items-center justify-center text-white font-bold text-2xl" style="background-color: ${cert.color}">
                    <i data-lucide="${cert.icon}" class="w-10 h-10"></i>
                </div>
                <div class="certificate-overlay">
                    <button class="bg-white text-gray-900 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                        View Certificate
                    </button>
                </div>
            </div>
            <div class="certificate-content">
                <div class="flex items-center justify-between mb-2">
                    <span class="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">${cert.type}</span>
                    <span class="text-xs font-semibold text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-600 px-2 py-1 rounded-full">${cert.year}</span>
                </div>
                <h3 class="text-lg font-bold text-gray-900 dark:text-dark-text mb-2">${cert.title}</h3>
                <p class="text-gray-600 dark:text-gray-400 font-semibold">${cert.issuer}</p>
            </div>
        `;
        container.appendChild(certElement);
    });
    
    lucide.createIcons();
}