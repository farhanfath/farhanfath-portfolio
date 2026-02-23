import { experiences } from '../data/experiences.js';

function populateExperiences() {
    const container = document.getElementById('experience-container');
    const visibleCount = 3;

    // Reset container classes
    container.classList.remove('space-y-6', 'sm:space-y-8');
    container.classList.add('relative');

    // Animated vertical timeline line
    const timelineLine = document.createElement('div');
    timelineLine.className = 'timeline-gradient-line';
    container.appendChild(timelineLine);

    experiences.forEach((companyData, index) => {
        const isHidden = index >= visibleCount;
        const accentColor = companyData.color || '#6B7280';

        const expElement = document.createElement('div');
        expElement.className = `experience-item fade-in ${isHidden ? 'hidden' : ''}`;
        expElement.style.setProperty('--accent-color', accentColor);
        expElement.style.setProperty('--stagger', index);

        // Determine role span text
        const periods = companyData.roles.map(r => r.period);
        // Try to extract a date range span: first period's start to last period's end
        const periodSpan = periods.length > 1
            ? `${periods[periods.length - 1].split(' - ')[0]} – ${periods[0].split(' - ')[1] || periods[0].split(' - ')[0]}`
            : periods[0];

        expElement.innerHTML = `
            <!-- Timeline dot -->
            <div class="exp-timeline-dot" style="border-color: ${accentColor}; box-shadow: 0 0 0 4px ${accentColor}22;">
                <div class="exp-timeline-dot-inner" style="background: ${accentColor};"></div>
            </div>

            <!-- Card -->
            <div class="exp-card group">
                <!-- Colored accent top bar -->
                <div class="exp-accent-bar" style="background: linear-gradient(90deg, ${accentColor}, ${accentColor}99);"></div>

                <!-- Company Header -->
                <div class="exp-company-header">
                    <div class="exp-logo-wrap" style="background: ${accentColor}18; border: 1.5px solid ${accentColor}44;">
                        ${/\.(png|jpe?g|svg)$/i.test(companyData.logo)
                ? `<img src="${companyData.logo}" alt="${companyData.company}" class="exp-logo-img">`
                : `<span class="exp-logo-text" style="color:${accentColor};">${companyData.logo}</span>`
            }
                    </div>
                    <div class="exp-company-info">
                        <h3 class="exp-company-name">${companyData.company}</h3>
                        <span class="exp-period-badge">
                            <i data-lucide="calendar" class="exp-badge-icon"></i>
                            ${periodSpan}
                        </span>
                    </div>
                </div>

                <!-- Divider -->
                <div class="exp-divider"></div>

                <!-- Roles list -->
                <div class="exp-roles-list">
                    ${companyData.roles.map((role, roleIndex) => `
                        <div class="exp-role-item ${roleIndex > 0 ? 'exp-role-item--border' : ''}">
                            <!-- Role connector dot -->
                            <div class="exp-role-dot" style="background: ${accentColor};"></div>

                            <div class="exp-role-content">
                                <div class="exp-role-header">
                                    <h4 class="exp-role-title">${role.title}</h4>
                                    <span class="exp-role-period">${role.period}</span>
                                </div>
                                <ul class="exp-achievements-list">
                                    ${role.achievements.map((ach, i) => `
                                        <li class="exp-achievement" style="animation-delay: ${(roleIndex * 0.1 + i * 0.05).toFixed(2)}s">
                                            <i data-lucide="check-circle-2" class="exp-check-icon" style="color: ${accentColor};"></i>
                                            <span>${ach}</span>
                                        </li>
                                    `).join('')}
                                </ul>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        container.appendChild(expElement);
    });

    lucide.createIcons();
}

function setupExperienceToggle() {
    const experienceToggle = document.getElementById('experience-toggle');
    const experienceSection = document.getElementById('experience');
    let experienceExpanded = false;

    experienceToggle.addEventListener('click', () => {
        experienceExpanded = !experienceExpanded;

        const allItems = document.querySelectorAll('.experience-item');

        if (experienceExpanded) {
            // Show all hidden items with a staggered fade-in
            allItems.forEach((item, index) => {
                if (item.classList.contains('hidden')) {
                    item.classList.remove('hidden');
                    // Small stagger delay per item
                    setTimeout(() => {
                        item.classList.add('visible');
                    }, (index - 2) * 80);
                }
            });
        } else {
            // Hide items beyond the first 3
            allItems.forEach((item, index) => {
                if (index >= 3) {
                    item.classList.remove('visible');
                    item.classList.add('hidden');
                }
            });

            setTimeout(() => {
                experienceSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }

        experienceToggle.querySelector('.show-more').classList.toggle('hidden', experienceExpanded);
        experienceToggle.querySelector('.show-less').classList.toggle('hidden', !experienceExpanded);
        experienceToggle.querySelector('.show-more-icon').classList.toggle('hidden', experienceExpanded);
        experienceToggle.querySelector('.show-less-icon').classList.toggle('hidden', !experienceExpanded);
    });
}

export { populateExperiences, setupExperienceToggle };