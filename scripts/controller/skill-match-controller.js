import { skillsData } from '../data/skills.js';

// ── Preset role definitions ────────────────────────────────────────────────
const presets = [
    {
        id: 'android',
        label: 'Android Engineer',
        icon: 'smartphone',
        skills: [
            'Kotlin', 'Java', 'Android SDK', 'Jetpack Compose', 'MVVM Architecture',
            'Firebase', 'Room Database', 'Retrofit / OkHttp', 'Git / GitHub', 'Android Studio',
        ],
    },
    {
        id: 'fullstack',
        label: 'Full Stack Dev',
        icon: 'layers',
        skills: [
            'JavaScript', 'PHP', 'Laravel', 'MySQL', 'REST API Integration',
            'Tailwind CSS', 'Git / GitHub', 'Postman', 'Bootstrap',
        ],
    },
    {
        id: 'ml',
        label: 'ML / AI Engineer',
        icon: 'brain',
        skills: [
            'Python', 'TensorFlow Lite', 'Gemini API', 'Google Vision API',
            'OpenCV', 'NumPy / Pandas', 'N8n Automation',
        ],
    },
    {
        id: 'infra',
        label: 'IT Infrastructure',
        icon: 'server',
        skills: [
            'VMware / vSphere', 'Linux Server Admin', 'Network Configuration',
            'Moodle LMS', 'Thin Client Management', 'Access Control (ACL)',
        ],
    },
];

// ── Extra skills Farhan doesn't have — for realistic recruiter searches ────
const extraPool = [
    'React', 'Vue.js', 'Next.js', 'TypeScript', 'Node.js',
    'Docker', 'Kubernetes', 'AWS', 'GCP', 'Azure',
    'Flutter', 'Swift', 'iOS', 'React Native',
    'MongoDB', 'PostgreSQL', 'Redis',
    'Rust', 'C++', 'C#',
];

// ── Build flat skill lookup map (name.lowercase → skill data) ─────────────
const skillMap = new Map(); // lowercase → { name, level, category }
const displayNameMap = new Map(); // lowercase → display name

for (const cat of skillsData) {
    for (const s of cat.skills) {
        const key = s.name.toLowerCase();
        skillMap.set(key, { ...s, category: cat.title });
        displayNameMap.set(key, s.name);
    }
}
// Add extra pool display names (not in skillMap — they're "not in stack")
for (const name of extraPool) {
    displayNameMap.set(name.toLowerCase(), name);
}

// ── Constants ─────────────────────────────────────────────────────────────
const LEVEL_LABEL  = { 5: 'Expert', 4: 'Advanced', 3: 'Intermediate', 2: 'Familiar', 1: 'Learning' };
const LEVEL_WEIGHT = { 5: 1.0, 4: 0.85, 3: 0.7, 2: 0.5, 1: 0.3 };
const CIRCUMFERENCE = 2 * Math.PI * 50; // r=50 → ~314.16

// ── State ─────────────────────────────────────────────────────────────────
let selected   = new Set(); // Set of lowercase skill keys
let activePreset = null;

// ── Main entry ─────────────────────────────────────────────────────────────
export function setupSkillMatch() {
    const container = document.getElementById('skill-match-container');
    if (!container) return;

    container.innerHTML = renderUI();
    lucide.createIcons();
    bindEvents();
    renderResult();
}

// ── Render ─────────────────────────────────────────────────────────────────
function renderUI() {
    // All skills: Farhan's first (sorted by level desc), then extra pool
    const farhanSkills = [...skillMap.keys()].sort((a, b) => {
        const la = skillMap.get(a).level;
        const lb = skillMap.get(b).level;
        return lb - la || a.localeCompare(b);
    });
    const extraKeys = extraPool.map(n => n.toLowerCase()).filter(k => !skillMap.has(k));

    const allKeys = [...new Set([...farhanSkills, ...extraKeys])];

    return `
<div class="smc-wrap">

  <!-- ── Left: Input ── -->
  <div class="smc-input-panel">

    <div class="smc-presets-block">
      <p class="smc-section-label">⚡ Quick Presets</p>
      <div class="smc-preset-row">
        ${presets.map(p => `
          <button class="smc-preset-btn" data-preset="${p.id}">
            <i data-lucide="${p.icon}" class="smc-preset-icon"></i>
            <span>${p.label}</span>
          </button>`).join('')}
      </div>
    </div>

    <div class="smc-divider-line">
      <span>or pick skills manually</span>
    </div>

    <div class="smc-pool-block">
      <div class="smc-pool-header">
        <p class="smc-section-label">🛠 Skill Pool</p>
        <button class="smc-clear-btn" id="smc-clear">
          <i data-lucide="x" style="width:0.75rem;height:0.75rem"></i> Clear all
        </button>
      </div>
      <div class="smc-pool" id="smc-pool">
        ${allKeys.map(key => {
            const name = displayNameMap.get(key) || key;
            const inStack = skillMap.has(key);
            return `<button class="smc-chip ${inStack ? '' : 'smc-chip--external'}" data-skill="${key}">${name}</button>`;
        }).join('')}
      </div>
    </div>

  </div>

  <!-- ── Right: Result ── -->
  <div class="smc-result-panel">

    <div class="smc-score-block">
      <div class="smc-ring-wrap">
        <svg class="smc-ring-svg" viewBox="0 0 120 120">
          <circle class="smc-ring-bg" cx="60" cy="60" r="50"/>
          <circle class="smc-ring-fill" id="smc-ring-fill"
            cx="60" cy="60" r="50"
            stroke-dasharray="${CIRCUMFERENCE.toFixed(2)}"
            stroke-dashoffset="${CIRCUMFERENCE.toFixed(2)}"/>
        </svg>
        <div class="smc-score-center">
          <span class="smc-score-num" id="smc-score-num">–</span>
          <span class="smc-score-unit" id="smc-score-unit">match</span>
        </div>
      </div>
      <div class="smc-score-status" id="smc-score-status">Select skills to begin</div>
      <div class="smc-score-detail" id="smc-score-detail"></div>
    </div>

    <div class="smc-breakdown" id="smc-breakdown">
      <div class="smc-breakdown-empty" id="smc-breakdown-empty">
        <i data-lucide="mouse-pointer-click" style="width:2rem;height:2rem;opacity:.35"></i>
        <span>Breakdown will appear here</span>
      </div>
    </div>

    <div class="smc-cta" id="smc-cta">
      <a href="#contact" class="smc-cta-btn">
        <i data-lucide="send" style="width:1rem;height:1rem"></i>
        Let's Work Together!
      </a>
    </div>

  </div>

</div>`;
}

// ── Events ─────────────────────────────────────────────────────────────────
function bindEvents() {
    // Presets
    document.querySelectorAll('.smc-preset-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.dataset.preset;
            if (activePreset === id) {
                activePreset = null;
                selected.clear();
            } else {
                activePreset = id;
                const preset = presets.find(p => p.id === id);
                selected = new Set(preset.skills.map(s => s.toLowerCase()));
            }
            document.querySelectorAll('.smc-preset-btn').forEach(b => b.classList.remove('active'));
            if (activePreset) btn.classList.add('active');
            syncChips();
            renderResult();
        });
    });

    // Clear
    document.getElementById('smc-clear').addEventListener('click', () => {
        selected.clear();
        activePreset = null;
        document.querySelectorAll('.smc-preset-btn').forEach(b => b.classList.remove('active'));
        syncChips();
        renderResult();
    });

    // Chips
    document.querySelectorAll('.smc-chip').forEach(chip => {
        chip.addEventListener('click', () => {
            const key = chip.dataset.skill;
            selected.has(key) ? selected.delete(key) : selected.add(key);
            // deactivate preset when manually editing
            activePreset = null;
            document.querySelectorAll('.smc-preset-btn').forEach(b => b.classList.remove('active'));
            chip.classList.toggle('active', selected.has(key));
            renderResult();
        });
    });
}

function syncChips() {
    document.querySelectorAll('.smc-chip').forEach(chip => {
        chip.classList.toggle('active', selected.has(chip.dataset.skill));
    });
}

// ── Calculate + render result ───────────────────────────────────────────────
function renderResult() {
    const ring    = document.getElementById('smc-ring-fill');
    const numEl   = document.getElementById('smc-score-num');
    const unitEl  = document.getElementById('smc-score-unit');
    const statEl  = document.getElementById('smc-score-status');
    const detEl   = document.getElementById('smc-score-detail');
    const bdEl    = document.getElementById('smc-breakdown');
    const ctaEl   = document.getElementById('smc-cta');
    const emptyEl = document.getElementById('smc-breakdown-empty');

    const total = selected.size;

    if (total === 0) {
        ring.style.strokeDashoffset = CIRCUMFERENCE;
        ring.setAttribute('class', 'smc-ring-fill');
        numEl.textContent  = '–';
        unitEl.textContent = 'match';
        statEl.textContent = 'Select skills to begin';
        detEl.textContent  = '';
        if (emptyEl) emptyEl.style.display = 'flex';
        bdEl.querySelectorAll('.smc-breakdown-section').forEach(el => el.remove());
        ctaEl.classList.remove('visible');
        return;
    }

    // Partition into matched / missing
    const matched = [];
    const missing = [];
    for (const key of selected) {
        const skill = skillMap.get(key);
        skill ? matched.push(skill) : missing.push(key);
    }

    // Weighted score (missing = 0 weight)
    const weightSum = matched.reduce((s, sk) => s + LEVEL_WEIGHT[sk.level], 0);
    const pct = Math.round((weightSum / total) * 100);

    // Ring animation
    const offset = CIRCUMFERENCE * (1 - pct / 100);
    ring.style.strokeDashoffset = offset;
    ring.setAttribute('class', 'smc-ring-fill ' +
        (pct >= 75 ? 'smc-ring--green' : pct >= 50 ? 'smc-ring--yellow' : 'smc-ring--red'));

    numEl.textContent  = `${pct}%`;
    unitEl.textContent = 'match';

    // Status
    const emoji  = pct >= 85 ? '🔥' : pct >= 70 ? '✅' : pct >= 50 ? '⚡' : '📚';
    const label  = pct >= 85 ? 'Excellent Match!' : pct >= 70 ? 'Strong Match' : pct >= 50 ? 'Good Overlap' : 'Partial Match';
    statEl.textContent = `${emoji} ${label}`;
    detEl.textContent  = `${matched.length} of ${total} skills matched`;

    // Breakdown
    if (emptyEl) emptyEl.style.display = 'none';
    bdEl.querySelectorAll('.smc-breakdown-section').forEach(el => el.remove());

    let html = '';
    if (matched.length) {
        html += `<div class="smc-breakdown-section">
          <div class="smc-bd-title smc-bd-match-title">
            <i data-lucide="check-circle-2" style="width:.875rem;height:.875rem"></i>
            Matched (${matched.length})
          </div>
          ${matched
            .sort((a, b) => b.level - a.level)
            .map(sk => {
                const lvlCls = sk.level >= 5 ? 'expert' : sk.level >= 4 ? 'advanced' : sk.level >= 3 ? 'intermediate' : 'familiar';
                return `<div class="smc-bd-item smc-bd-item--match">
                  <i data-lucide="check" class="smc-bd-icon smc-bd-icon--match"></i>
                  <span class="smc-bd-name">${sk.name}</span>
                  <span class="smc-bd-level smc-bd-level--${lvlCls}">${LEVEL_LABEL[sk.level]}</span>
                </div>`;
            }).join('')}
        </div>`;
    }

    if (missing.length) {
        html += `<div class="smc-breakdown-section">
          <div class="smc-bd-title smc-bd-miss-title">
            <i data-lucide="x-circle" style="width:.875rem;height:.875rem"></i>
            Not in stack (${missing.length})
          </div>
          ${missing.map(key => `
            <div class="smc-bd-item smc-bd-item--miss">
              <i data-lucide="x" class="smc-bd-icon smc-bd-icon--miss"></i>
              <span class="smc-bd-name">${displayNameMap.get(key) || key}</span>
            </div>`).join('')}
        </div>`;
    }

    const frag = document.createRange().createContextualFragment(html);
    bdEl.appendChild(frag);

    // CTA
    pct >= 70 ? ctaEl.classList.add('visible') : ctaEl.classList.remove('visible');

    lucide.createIcons();
}
