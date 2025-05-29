import { experiences } from '../data/experiences.js'; 

// Populate experience section
export function populateExperiences() {
    const container = document.getElementById('experience-container');
    const visibleCount = 3;
    
    experiences.forEach((exp, index) => {
        const expElement = document.createElement('div');
        expElement.className = `bg-white dark:bg-dark-card rounded-2xl shadow-lg p-10 card-hover fade-in experience-item ${index >= visibleCount ? 'hidden' : ''} group`;
        expElement.style.setProperty('--stagger', index);
        expElement.innerHTML = `
            <div class="flex items-start space-x-6 mb-6">
                <div class="company-logo group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 flex items-center justify-center rounded-full w-16 h-16" style="background-color: bg-white">
                    ${/\.(png|jpe?g|svg)$/.test(exp.logo)
                        ? `<img src="${exp.logo}" alt="${exp.company} logo" class="w-10 h-10 object-contain">`
                        : `<span class="text-white font-bold text-xl">${exp.logo}</span>`
                    }
                </div>
                <div class="flex-1">
                    <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                        <div>
                            <h3 class="text-2xl font-bold text-gray-900 dark:text-dark-text group-hover:text-black dark:group-hover:text-white transition-colors">${exp.title}</h3>
                            <p class="text-gray-900 dark:text-gray-300 font-bold text-lg mt-1">${exp.company}</p>
                        </div>
                        <div class="text-gray-600 dark:text-gray-400 mt-3 md:mt-0">
                            <span class="bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white px-4 py-2 rounded-full text-sm font-semibold">${exp.period}</span>
                        </div>
                    </div>
                </div>
            </div>
            <ul class="text-gray-700 dark:text-gray-300 space-y-3 ml-20">
                ${exp.achievements.map((achievement, i) => `
                    <li class="flex items-start space-x-3 hover-lift" style="--stagger: ${i}">
                        <i data-lucide="check-circle" class="w-6 h-6 text-green-500 mt-0.5 flex-shrink-0"></i>
                        <span class="text-lg">${achievement}</span>
                    </li>
                `).join('')}
            </ul>
        `;
        container.appendChild(expElement);
    });
    
    lucide.createIcons();
}