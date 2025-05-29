// Populate projects section
import { projects } from '../data/projects.js';

function setupProjectsToggle() {
    const projectsToggle = document.getElementById('projects-toggle');
    let projectsExpanded = false;
    const visibleCount = 6;

    // Function to update toggle button visibility
    function updateToggleVisibility() {
        const activeFilter = document.querySelector('.filter-btn.active').getAttribute('data-filter');
        const filteredProjects = getFilteredProjects(activeFilter);
        
        // Hide toggle button if filtered projects are 6 or less
        if (filteredProjects.length <= visibleCount) {
            projectsToggle.style.display = 'none';
        } else {
            projectsToggle.style.display = 'flex';
        }
    }

    // Function to get filtered projects based on active filter
    function getFilteredProjects(filter) {
        const allProjects = document.querySelectorAll('.project-card');
        if (filter === 'all') {
            return Array.from(allProjects);
        }
        return Array.from(allProjects).filter(project => 
            project.getAttribute('data-category') === filter
        );
    }

    // Function to apply show more/less logic
    function applyShowMoreLess() {
        const activeFilter = document.querySelector('.filter-btn.active').getAttribute('data-filter');
        const filteredProjects = getFilteredProjects(activeFilter);
        
        // First, hide all projects
        document.querySelectorAll('.project-card').forEach(project => {
            project.classList.add('hidden');
        });
        
        // Show filtered projects based on current state
        const projectsToShow = projectsExpanded ? filteredProjects : filteredProjects.slice(0, visibleCount);
        
        projectsToShow.forEach(project => {
            project.classList.remove('hidden');
        });
        
        // Update button text and icons
        updateToggleButton();
        updateToggleVisibility();
    }

    // Function to update toggle button appearance
    function updateToggleButton() {
        const showMoreText = projectsToggle.querySelector('.show-more');
        const showLessText = projectsToggle.querySelector('.show-less');
        const showMoreIcon = projectsToggle.querySelector('.show-more-icon');
        const showLessIcon = projectsToggle.querySelector('.show-less-icon');

        if (projectsExpanded) {
            showMoreText.classList.add('hidden');
            showLessText.classList.remove('hidden');
            showMoreIcon.classList.add('hidden');
            showLessIcon.classList.remove('hidden');
        } else {
            showMoreText.classList.remove('hidden');
            showLessText.classList.add('hidden');
            showMoreIcon.classList.remove('hidden');
            showLessIcon.classList.add('hidden');
        }
    }

    // Toggle button click handler
    projectsToggle.addEventListener('click', () => {
        projectsExpanded = !projectsExpanded;
        applyShowMoreLess();
    });

    // Reset expansion state when filter changes
    function resetExpansionState() {
        projectsExpanded = false;
        applyShowMoreLess();
    }

    // Initialize
    updateToggleVisibility();
    
    // Return reset function to be called when filters change
    return resetExpansionState;
}

// Updated project filtering with show more/less integration
function setupProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    // Initialize toggle functionality and get reset function
    const resetToggleState = setupProjectsToggle();
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');
            
            // Update active filter button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Reset toggle state when filter changes
            resetToggleState();
        });
    });
}

// Updated populateProjects function
function populateProjects() {
    const container = document.getElementById('projects-container');
    const visibleCount = 6;
    
    // Clear container first
    container.innerHTML = '';
    
    projects.forEach((project, index) => {
        const projectElement = document.createElement('div');
        projectElement.className = `project-card dark:bg-dark-card fade-in stagger-animation`;
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
            <div class="project-image bg-gradient-to-br ${gradientColors[project.category]} flex items-center justify-center relative rounded-t-xl">
                ${
                    project.image
                        ? `<img src="${project.image}" alt="${project.title}" class="absolute inset-0 w-full h-full object-cover rounded-t-xl opacity-50 group-hover:opacity-100 transition-opacity duration-300">`
                        : `<i data-lucide="${icons[project.category]}" class="project-icon w-20 h-20 text-white z-10"></i>`
                }
            </div>
            <div class="flex flex-col justify-between flex-1 p-8">
                <div>
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
                </div>
                <button class="w-full bg-black dark:bg-white text-white dark:text-black py-4 rounded-xl hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-300 font-bold view-project-btn flex items-center justify-center space-x-3 group" data-project-id="${project.id}">
                    <span>View Details</span>
                    <i data-lucide="arrow-right" class="w-5 h-5 group-hover:translate-x-1 transition-transform"></i>
                </button>
            </div>
        `;
        
        // Initial visibility: show first 6 projects, hide the rest
        if (index >= visibleCount) {
            projectElement.classList.add('hidden');
        }
        
        container.appendChild(projectElement);
    });
    
    lucide.createIcons();
}

// function populateProjects() {
//     const container = document.getElementById('projects-container');
//     const visibleCount = 6;
    
//     projects.forEach((project, index) => {
//         const projectElement = document.createElement('div');
//         projectElement.className = `project-card dark:bg-dark-card fade-in ${index >= visibleCount ? 'hidden' : ''} stagger-animation`;
//         projectElement.setAttribute('data-category', project.category);
//         projectElement.style.setProperty('--stagger', index);
        
//         const gradientColors = {
//             android: 'from-gray-800 to-black',
//             web: 'from-gray-700 to-gray-900',
//             ml: 'from-gray-600 to-gray-800',
//             desktop: 'from-gray-500 to-gray-700',
//         };
        
//         const icons = {
//             android: 'smartphone',  
//             web: 'globe',
//             ml: 'brain',
//             desktop: 'monitor',
//         };
        
//         projectElement.innerHTML = `
//             <div class="project-image bg-gradient-to-br ${gradientColors[project.category]} flex items-center justify-center relative rounded-t-xl">
//                 ${
//                     project.image
//                         ? `<img src="${project.image}" alt="${project.title}" class="absolute inset-0 w-full h-full object-cover rounded-t-xl opacity-50 group-hover:opacity-100 transition-opacity duration-300">`
//                         : `<i data-lucide="${icons[project.category]}" class="project-icon w-20 h-20 text-white z-10"></i>`
//                 }
//             </div>
//             <div class="flex flex-col justify-between flex-1 p-8"> <!-- Flex container to push button to bottom -->
//                 <div>
//                     <div class="flex items-center justify-between mb-3">
//                         <span class="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">${project.category}</span>
//                         <div class="flex space-x-1">
//                             <div class="w-2 h-2 bg-gray-900 dark:bg-white rounded-full"></div>
//                             <div class="w-2 h-2 bg-gray-600 rounded-full"></div>
//                             <div class="w-2 h-2 bg-gray-400 rounded-full"></div>
//                         </div>
//                     </div>
//                     <h3 class="text-2xl font-bold text-gray-900 dark:text-dark-text mb-3">${project.title}</h3>
//                     <p class="text-gray-600 dark:text-gray-400 mb-6 text-base leading-relaxed">${project.description}</p>
//                     <div class="flex flex-wrap gap-2 mb-8">
//                         ${project.tags.slice(0, 3).map(tag => `
//                             <span class="bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white px-3 py-1 rounded-full text-sm font-semibold">${tag}</span>
//                         `).join('')}
//                         ${project.tags.length > 3 ? `<span class="text-gray-900 dark:text-white text-sm font-semibold">+${project.tags.length - 3} more</span>` : ''}
//                     </div>
//                 </div>
//                 <button class="w-full bg-black dark:bg-white text-white dark:text-black py-4 rounded-xl hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-300 font-bold view-project-btn flex items-center justify-center space-x-3 group" data-project-id="${project.id}">
//                     <span>View Details</span>
//                     <i data-lucide="arrow-right" class="w-5 h-5 group-hover:translate-x-1 transition-transform"></i>
//                 </button>
//             </div>
//         `;
//         container.appendChild(projectElement);
//     });
    
//     lucide.createIcons();
// }

// Project filtering
// function setupProjectFilters() {
//     const filterBtns = document.querySelectorAll('.filter-btn');
//     const projectCards = document.querySelectorAll('.project-card');
    
//     filterBtns.forEach(btn => {
//         btn.addEventListener('click', () => {
//             const filter = btn.getAttribute('data-filter');
            
//             filterBtns.forEach(b => b.classList.remove('active'));
//             btn.classList.add('active');
            
//             projectCards.forEach(card => {
//                 const category = card.getAttribute('data-category');
//                 if (filter === 'all' || category === filter) {
//                     card.classList.remove('hidden');
//                 } else {
//                     card.classList.add('hidden');
//                 }
//             });
//         });
//     });
// }

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


                // gallery tab section
                const galleryContainer = document.getElementById('modal-gallery');
                if (project.gallery && project.gallery.length > 0) {
                    galleryContainer.innerHTML = project.gallery.map((image, index) => `
                        <div 
                            class="relative overflow-hidden rounded-xl cursor-pointer aspect-[3/4] transform transition duration-300 hover:scale-105 hover:shadow-xl group" 
                            data-index="${index}">
                            
                            <img 
                                src="${image}" 
                                alt="${project.title} Screenshot ${index + 1}" 
                                loading="lazy" 
                                class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110">
                            
                            <div 
                                class="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <i data-lucide="zoom-in" class="w-8 h-8 text-white"></i>
                            </div>
                        </div>
                    `).join('');
                } else {
                    galleryContainer.innerHTML = `
                        <div class="col-span-full text-center py-12">
                            <i data-lucide="image-off" class="w-16 h-16 text-gray-400 mx-auto mb-4"></i>
                            <p class="text-gray-500 dark:text-gray-400 text-lg">No gallery images available for this project</p>
                        </div>
                    `;
                }

                // Setup lightbox functionality
                setupLightbox(project.gallery || []);
            }
        }
    });
}

function setupLightbox(images) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxImgContainer = document.getElementById('lightbox-img-container');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');
    const lightboxCounter = document.getElementById('lightbox-counter');
    const zoomControls = document.getElementById('zoom-controls');
    const zoomIn = document.getElementById('zoom-in');
    const zoomOut = document.getElementById('zoom-out');
    const zoomReset = document.getElementById('zoom-reset');
    const zoomLevel = document.getElementById('zoom-level');
    const galleryItems = document.querySelectorAll('[data-index]');

    let currentIndex = 0;
    let currentZoom = 1;
    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let translateX = 0;
    let translateY = 0;
    let lastTranslateX = 0;
    let lastTranslateY = 0;

    const MIN_ZOOM = 0.5;
    const MAX_ZOOM = 5;
    const ZOOM_STEP = 0.25;

    function updateZoomDisplay() {
        const percentage = Math.round(currentZoom * 100);
        zoomReset.textContent = `${percentage}%`;
        zoomLevel.textContent = `${percentage}%`;
        
        if (currentZoom !== 1) {
            zoomLevel.classList.remove('opacity-0');
            setTimeout(() => zoomLevel.classList.add('opacity-0'), 2000);
        } else {
            zoomLevel.classList.add('opacity-0');
        }
    }

    function applyTransform() {
        lightboxImg.style.transform = `scale(${currentZoom}) translate(${translateX}px, ${translateY}px)`;
        lightboxImgContainer.style.cursor = currentZoom > 1 ? 'grab' : 'default';
    }

    function resetZoom() {
        currentZoom = 1;
        translateX = 0;
        translateY = 0;
        lastTranslateX = 0;
        lastTranslateY = 0;
        applyTransform();
        updateZoomDisplay();
    }

    function zoomImage(factor, centerX = null, centerY = null) {
        const newZoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, currentZoom * factor));
        
        if (centerX !== null && centerY !== null && newZoom > currentZoom) {
            const rect = lightboxImg.getBoundingClientRect();
            const imgCenterX = rect.left + rect.width / 2;
            const imgCenterY = rect.top + rect.height / 2;
            
            const deltaX = (centerX - imgCenterX) / currentZoom;
            const deltaY = (centerY - imgCenterY) / currentZoom;
            
            translateX += deltaX;
            translateY += deltaY;
            lastTranslateX = translateX;
            lastTranslateY = translateY;
        }
        
        currentZoom = newZoom;
        
        if (currentZoom === 1) {
            translateX = 0;
            translateY = 0;
            lastTranslateX = 0;
            lastTranslateY = 0;
        }
        
        applyTransform();
        updateZoomDisplay();
    }

    function showImage(index) {
        if (images.length === 0) return;

        currentIndex = index;
        lightboxImg.src = images[currentIndex];
        lightboxCounter.textContent = `${currentIndex + 1} / ${images.length}`;
        lightbox.classList.add('opacity-100', 'visible');
        lightbox.classList.remove('opacity-0', 'invisible');
        lightboxImg.classList.add('opacity-100');
        document.body.style.overflow = 'hidden';
        
        resetZoom();
    }

    function hideImage() {
        lightbox.classList.remove('opacity-100', 'visible');
        lightbox.classList.add('opacity-0', 'invisible');
        lightboxImg.classList.remove('opacity-100');
        document.body.style.overflow = 'auto';
        resetZoom();
    }

    function nextImage() {
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
    }

    function prevImage() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        showImage(currentIndex);
    }

    // Mouse/Touch Events for Panning
    function handlePointerStart(e) {
        if (currentZoom <= 1) return;
        
        isDragging = true;
        lightboxImgContainer.style.cursor = 'grabbing';
        
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        
        startX = clientX - lastTranslateX;
        startY = clientY - lastTranslateY;
        
        e.preventDefault();
    }

    function handlePointerMove(e) {
        if (!isDragging || currentZoom <= 1) return;
        
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        
        translateX = clientX - startX;
        translateY = clientY - startY;
        
        applyTransform();
        e.preventDefault();
    }

    function handlePointerEnd() {
        if (!isDragging) return;
        
        isDragging = false;
        lightboxImgContainer.style.cursor = currentZoom > 1 ? 'grab' : 'default';
        lastTranslateX = translateX;
        lastTranslateY = translateY;
    }

    // Event Listeners
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => showImage(index));
    });

    lightboxClose.addEventListener('click', hideImage);
    lightboxNext.addEventListener('click', nextImage);
    lightboxPrev.addEventListener('click', prevImage);

    // Zoom Controls
    zoomIn.addEventListener('click', () => zoomImage(1 + ZOOM_STEP));
    zoomOut.addEventListener('click', () => zoomImage(1 - ZOOM_STEP));
    zoomReset.addEventListener('click', resetZoom);

    // Double-click to zoom
    lightboxImg.addEventListener('dblclick', (e) => {
        if (currentZoom === 1) {
            zoomImage(2, e.clientX, e.clientY);
        } else {
            resetZoom();
        }
    });

    // Mouse wheel zoom
    lightboxImgContainer.addEventListener('wheel', (e) => {
        e.preventDefault();
        const delta = e.deltaY > 0 ? (1 - ZOOM_STEP) : (1 + ZOOM_STEP);
        zoomImage(delta, e.clientX, e.clientY);
    });

    // Mouse events
    lightboxImgContainer.addEventListener('mousedown', handlePointerStart);
    document.addEventListener('mousemove', handlePointerMove);
    document.addEventListener('mouseup', handlePointerEnd);

    // Touch events
    lightboxImgContainer.addEventListener('touchstart', handlePointerStart, { passive: false });
    document.addEventListener('touchmove', handlePointerMove, { passive: false });
    document.addEventListener('touchend', handlePointerEnd);

    // Pinch to zoom (touch devices)
    let initialDistance = 0;
    let initialZoom = 1;

    lightboxImgContainer.addEventListener('touchstart', (e) => {
        if (e.touches.length === 2) {
            const touch1 = e.touches[0];
            const touch2 = e.touches[1];
            initialDistance = Math.hypot(
                touch2.clientX - touch1.clientX,
                touch2.clientY - touch1.clientY
            );
            initialZoom = currentZoom;
        }
    });

    lightboxImgContainer.addEventListener('touchmove', (e) => {
        if (e.touches.length === 2) {
            e.preventDefault();
            const touch1 = e.touches[0];
            const touch2 = e.touches[1];
            const currentDistance = Math.hypot(
                touch2.clientX - touch1.clientX,
                touch2.clientY - touch1.clientY
            );
            
            const scale = currentDistance / initialDistance;
            const newZoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, initialZoom * scale));
            
            currentZoom = newZoom;
            applyTransform();
            updateZoomDisplay();
        }
    }, { passive: false });

    // Click outside to close
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) hideImage();
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('visible')) return;

        switch (e.key) {
            case 'Escape':
                hideImage();
                break;
            case 'ArrowLeft':
                if (currentZoom === 1) prevImage();
                break;
            case 'ArrowRight':
                if (currentZoom === 1) nextImage();
                break;
            case '+':
            case '=':
                zoomImage(1 + ZOOM_STEP);
                break;
            case '-':
                zoomImage(1 - ZOOM_STEP);
                break;
            case '0':
                resetZoom();
                break;
        }
    });

    // Hide navigation if only one image
    if (images.length <= 1) {
        lightboxPrev.style.display = 'none';
        lightboxNext.style.display = 'none';
    }

    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    updateZoomDisplay();
}

// function setupProjectsToggle() {
//     const projectsToggle = document.getElementById('projects-toggle');
//     let projectsExpanded = false;

//     projectsToggle.addEventListener('click', () => {
//         projectsExpanded = !projectsExpanded;
//         const hiddenProjects = document.querySelectorAll('.project-card.hidden');
//         const visibleProjects = document.querySelectorAll('.project-card:not(.hidden)');

//         if (projectsExpanded) {
//             hiddenProjects.forEach(project => project.classList.remove('hidden'));
//         } else {
//             visibleProjects.forEach((project, index) => {
//                 if (index >= 6) project.classList.add('hidden');
//             });
//         }

//         projectsToggle.querySelector('.show-more').classList.toggle('hidden', projectsExpanded);
//         projectsToggle.querySelector('.show-less').classList.toggle('hidden', !projectsExpanded);
//         projectsToggle.querySelector('.show-more-icon').classList.toggle('hidden', projectsExpanded);
//         projectsToggle.querySelector('.show-less-icon').classList.toggle('hidden', !projectsExpanded);
//     });
// }

export { populateProjects, setupProjectFilters, setupProjectModal, setupProjectsToggle };