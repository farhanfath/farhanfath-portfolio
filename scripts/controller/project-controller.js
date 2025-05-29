// Populate projects section
import { projects } from '../data/projects.js';

function populateProjects() {
    const container = document.getElementById('projects-container');
    const visibleCount = 6;
    
    projects.forEach((project, index) => {
        const projectElement = document.createElement('div');
        projectElement.className = `project-card dark:bg-dark-card fade-in ${index >= visibleCount ? 'hidden' : ''} stagger-animation`;
        projectElement.setAttribute('data-category', project.category);
        projectElement.style.setProperty('--stagger', index);
        
        const gradientColors = {
            android: 'from-gray-800 to-black',
            web: 'from-gray-700 to-gray-900',
            ml: 'from-gray-600 to-gray-800',
            desktop: 'from-gray-500 to-gray-700',
        };
        
        const icons = {
            android: 'smartphone',  
            web: 'globe',
            ml: 'brain',
            desktop: 'monitor',
        };
        
        projectElement.innerHTML = `
            <div class="project-image bg-gradient-to-br ${gradientColors[project.category]} flex items-center justify-center relative">
                ${
                project.image
                    ? `<img src="${project.image}" alt="${project.title}" class="absolute inset-0 w-full h-full object-cover rounded-t-xl opacity-50 group-hover:opacity-100 transition-opacity duration-300">`
                    : `<i data-lucide="${icons[project.category]}" class="project-icon w-20 h-20 text-white z-10"></i>`
                }
            </div>
            <div class="p-8">
                <div class="flex items-center justify-between mb-3">
                    <span class="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">${project.category}</span>
                    <div class="flex space-x-1">
                        <div class="w-2 h-2 bg-gray-900 dark:bg-white rounded-full"></div>
                        <div class="w-2 h-2 bg-gray-600 rounded-full"></div>
                        <div class="w-2 h-2 bg-gray-400 rounded-full"></div>
                    </div>
                </div>
                <h3 class="text-2xl font-bold text-gray-900 dark:text-dark-text mb-3">${project.title}</h3>
                <p class="text-gray-600 dark:text-gray-400 mb-6 text-base leading-relaxed">${project.description}</p>
                <div class="flex flex-wrap gap-2 mb-8">
                    ${project.tags.slice(0, 3).map(tag => `
                        <span class="bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white px-3 py-1 rounded-full text-sm font-semibold">${tag}</span>
                    `).join('')}
                    ${project.tags.length > 3 ? `<span class="text-gray-900 dark:text-white text-sm font-semibold">+${project.tags.length - 3} more</span>` : ''}
                </div>
                <button class="w-full bg-black dark:bg-white text-white dark:text-black py-4 rounded-xl hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-300 font-bold view-project-btn flex items-center justify-center space-x-3 group" data-project-id="${project.id}">
                    <span>View Details</span>
                    <i data-lucide="arrow-right" class="w-5 h-5 group-hover:translate-x-1 transition-transform"></i>
                </button>
            </div>
        `;
        container.appendChild(projectElement);
    });
    
    lucide.createIcons();
}

// Project filtering
function setupProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');
            
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
}

// Enhanced project modal functionality
function setupProjectModal() {
    const modal = document.getElementById('project-modal');
    const closeBtns = [document.getElementById('close-modal'), document.getElementById('close-modal-footer')];
    const modalTitle = document.getElementById('modal-title');
    const modalSubtitle = document.getElementById('modal-subtitle');
    
    // Close modal
    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            modal.classList.add('hidden');
        });
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.add('hidden');
        }
    });
    
    // Tab functionality
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabName = btn.getAttribute('data-tab');
            
            tabButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === `tab-${tabName}`) {
                    content.classList.add('active');
                }
            });
        });
    });
    
    // Open modal
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('view-project-btn')) {
            const projectId = parseInt(e.target.getAttribute('data-project-id'));
            const project = projects.find(p => p.id === projectId);
            
            if (project) {
                modalTitle.textContent = project.title;
                modalSubtitle.textContent = project.subtitle;
                
                // Populate overview tab
                document.getElementById('modal-description').textContent = project.fullDescription;
                document.getElementById('modal-duration').textContent = project.duration;
                document.getElementById('modal-team').textContent = project.teamSize;
                document.getElementById('modal-category').textContent = project.category.charAt(0).toUpperCase() + project.category.slice(1);
                
                // Populate features tab
                const featuresContainer = document.getElementById('modal-features');
                featuresContainer.innerHTML = project.features.map(feature => `
                    <div class="feature-item">
                        <div class="flex items-start space-x-3">
                            <i data-lucide="check" class="w-6 h-6 text-green-500 mt-0.5 flex-shrink-0"></i>
                            <span class="text-gray-600 dark:text-gray-400 text-lg">${feature}</span>
                        </div>
                    </div>
                `).join('');
                
                // Populate technologies tab
                const techContainer = document.getElementById('modal-technologies');
                techContainer.innerHTML = project.technologies.map(tech => `
                    <div class="tech-item text-center">
                        <div class="bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white px-4 py-3 rounded-xl font-bold text-lg">
                            ${tech}
                        </div>
                    </div>
                `).join('');
                
                // Populate achievements tab
                const achievementsContainer = document.getElementById('modal-achievements');
                achievementsContainer.innerHTML = project.achievements.map(achievement => `
                    <div class="achievement-item">
                        <div class="flex items-start space-x-3">
                            <i data-lucide="trophy" class="w-6 h-6 text-yellow-500 mt-0.5 flex-shrink-0"></i>
                            <span class="text-gray-600 dark:text-gray-400 text-lg">${achievement}</span>
                        </div>
                    </div>
                `).join('');
                
                // Reset to first tab
                tabButtons.forEach(b => b.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));
                document.querySelector('.tab-button[data-tab="overview"]').classList.add('active');
                document.getElementById('tab-overview').classList.add('active');
                
                lucide.createIcons();
                modal.classList.remove('hidden');

                // view code and live demo links
                const viewCodeBtn = document.getElementById('view-code-btn');
                const liveDemoBtn = document.getElementById('live-demo-btn');

                if (project.codeUrl) {
                    viewCodeBtn.classList.remove('hidden');
                    viewCodeBtn.addEventListener('click', () => {
                        window.open(project.codeUrl, '_blank');
                    });
                } else {
                    viewCodeBtn.classList.add('hidden');
                }

                if (project.demoUrl) {
                    liveDemoBtn.classList.remove('hidden');
                    liveDemoBtn.addEventListener('click', () => {
                        window.open(project.demoUrl, '_blank');
                    });
                } else {
                    liveDemoBtn.classList.add('hidden');
                }
            }
        }
    });
}

export { populateProjects, setupProjectFilters, setupProjectModal };