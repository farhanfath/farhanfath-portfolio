import { skillsData } from '../data/skills.js';

function levelToChipClass(level) {
    if (level >= 5) return 'skill-chip--expert';
    if (level >= 4) return 'skill-chip--advanced';
    if (level >= 3) return 'skill-chip--intermediate';
    return 'skill-chip--familiar';
}

function renderSkillCard(category, index, arr) {
    const isFeatured = index === 0;
    // Last card is orphaned when the number of non-featured cards is odd
    const nonFeaturedCount = arr.length - 1;
    const isOrphan = !isFeatured && index === arr.length - 1 && nonFeaturedCount % 2 === 1;

    const chipsHTML = category.skills
        .map(skill =>
            `<span class="skill-chip ${levelToChipClass(skill.level)}">${skill.name}</span>`
        )
        .join('');

    const extraClass = isFeatured || isOrphan ? ' skill-card--featured' : '';
    const countBadge = (isFeatured || isOrphan)
        ? `<span class="skill-card-count">${category.skills.length} technologies</span>`
        : '';

    return `
    <div class="skill-card${extraClass} fade-in">
        <div class="skill-card-header">
            <div class="skill-card-icon-wrap">
                <i data-lucide="${category.icon}" class="skill-card-icon"></i>
            </div>
            <h3 class="skill-card-title">${category.title}</h3>
            ${countBadge}
        </div>
        <div class="skill-chips">
            ${chipsHTML}
        </div>
        <i data-lucide="${category.icon}" class="skill-card-watermark"></i>
    </div>`;
}

export function populateSkills() {
    const container = document.getElementById('skills-container');
    if (!container) return;
    container.innerHTML = skillsData.map((cat, i, arr) => renderSkillCard(cat, i, arr)).join('');
    lucide.createIcons();
}
