import { skillsData }  from './data/skills.js';
import { experiences } from './data/experiences.js';
import { projects }    from './data/projects.js';

export const commandList = [
    'help', 'whoami', 'about', 'skills', 'experience',
    'projects', 'open', 'contact', 'cv', 'neofetch',
    'clear', 'exit', 'ls', 'date', 'echo',
];

const pad = (str, len) => {
    const s = String(str);
    return s.length >= len ? s.substring(0, len) : s + ' '.repeat(len - s.length);
};

export const commands = {

    // ── help ──────────────────────────────────────────────
    help(args, term) {
        return `
<div class="t-section-title">Available Commands</div>
<div class="t-cmd-table">
  <div class="t-cmd-row"><span class="t-accent">whoami</span><span class="t-dim">Personal info &amp; current status</span></div>
  <div class="t-cmd-row"><span class="t-accent">about</span><span class="t-dim">Full professional bio</span></div>
  <div class="t-cmd-group">
    <div class="t-cmd-row"><span class="t-accent">skills</span><span class="t-dim">Technical skills by category</span></div>
    <div class="t-cmd-sub">--mobile &nbsp;·&nbsp; --lang &nbsp;·&nbsp; --ai &nbsp;·&nbsp; --infra &nbsp;·&nbsp; --web &nbsp;·&nbsp; --tools</div>
  </div>
  <div class="t-cmd-group">
    <div class="t-cmd-row"><span class="t-accent">experience</span><span class="t-dim">Work history — add name for detail</span></div>
    <div class="t-cmd-sub">[name] &nbsp;·&nbsp; e.g. <span class="t-accent">experience alfagift</span></div>
  </div>
  <div class="t-cmd-group">
    <div class="t-cmd-row"><span class="t-accent">projects</span><span class="t-dim">Project portfolio</span></div>
    <div class="t-cmd-sub">--android &nbsp;·&nbsp; --web &nbsp;·&nbsp; --ml &nbsp;·&nbsp; --desktop</div>
  </div>
  <div class="t-cmd-row"><span class="t-accent">open &lt;id&gt;</span><span class="t-dim">Open project detail (ID from projects)</span></div>
  <div class="t-cmd-row"><span class="t-accent">contact</span><span class="t-dim">Contact info &amp; social links</span></div>
  <div class="t-cmd-row"><span class="t-accent">cv</span><span class="t-dim">Open resume / CV</span></div>
  <div class="t-cmd-row"><span class="t-accent">neofetch</span><span class="t-dim">Portfolio system stats</span></div>
  <div class="t-cmd-row"><span class="t-accent">clear</span><span class="t-dim">Clear the terminal</span></div>
  <div class="t-cmd-row"><span class="t-accent">exit</span><span class="t-dim">Close terminal</span></div>
</div>
<div class="t-dim t-spacer-sm">Tip: <span class="t-accent">↑↓</span> history &nbsp;·&nbsp; <span class="t-accent">Tab</span> autocomplete &nbsp;·&nbsp; <span class="t-accent">Ctrl+\`</span> toggle</div>
<br/>`;
    },

    // ── whoami ────────────────────────────────────────────
    whoami(args, term) {
        return `
<div class="t-box">
  <div class="t-box-row"><span class="t-label">name</span><span class="t-white">Muhammad Farhan Fathurrohman</span></div>
  <div class="t-box-row"><span class="t-label">alias</span><span class="t-white">Farhan Fathur</span></div>
  <div class="t-box-row"><span class="t-label">role</span><span class="t-green">Android Engineer @ Alfagift</span></div>
  <div class="t-box-row"><span class="t-label">location</span><span class="t-white">DKI Jakarta, Indonesia 🇮🇩</span></div>
  <div class="t-box-row"><span class="t-label">education</span><span class="t-white">Universitas Gunadarma — Informatics Engineering (2021–2025)</span></div>
  <div class="t-box-row"><span class="t-label">speciality</span><span class="t-accent">Mobile Dev · IT Infrastructure · AI Integration</span></div>
  <div class="t-box-row"><span class="t-label">status</span><span class="t-green">● Open to opportunities</span></div>
</div>`;
    },

    // ── about ─────────────────────────────────────────────
    about(args, term) {
        return `
<div class="t-section-title">About</div>
<div class="t-paragraph">
  Android Engineer with <span class="t-green">2+ years</span> shipping production-grade features used by
  <span class="t-green">millions</span> of Alfagift loyalty app users. I specialize in
  <span class="t-accent">Kotlin &amp; Jetpack Compose</span>, designing clean MVVM architectures,
  integrating AI capabilities (Gemini, TensorFlow Lite), and running R&amp;D on
  next-gen mobile experiences.
</div>
<div class="t-paragraph">
  Beyond mobile, I manage IT infrastructure — <span class="t-accent">7 servers, 144 thin clients</span>
  and VMware virtualization environments at Gunadarma University.
</div>
<div class="t-paragraph">
  <span class="t-green">Distinction Graduate</span> of Bangkit Academy
  (Google × Gojek × Tokopedia × Traveloka) and a certified
  <span class="t-accent">BNSP Junior Mobile Programmer</span>.
</div>`;
    },

    // ── skills ────────────────────────────────────────────
    skills(args, term) {
        const flagMap = {
            '--mobile': 'mobile',
            '--lang':   'languages',
            '--ai':     'ai-ml',
            '--infra':  'infrastructure',
            '--web':    'web',
            '--tools':  'tools',
        };

        const bar = (level) => {
            const fill  = '█'.repeat(level);
            const empty = '░'.repeat(5 - level);
            const cls   = level >= 5 ? 't-green' : level >= 4 ? 't-accent' : level >= 3 ? 't-white' : 't-dim';
            const lbl   = ['', 'Learning', 'Familiar', 'Intermediate', 'Advanced', 'Expert'][level] || '';
            return `<span class="${cls}">${fill}${empty}</span> <span class="t-dim">${lbl}</span>`;
        };

        if (args[0] === '--help') {
            return `<div class="t-dim">Usage: <span class="t-accent">skills [flag]</span><br>Flags: --mobile  --lang  --ai  --infra  --web  --tools</div>`;
        }

        let filtered = skillsData;
        if (args[0] && flagMap[args[0]]) {
            filtered = skillsData.filter(c => c.id === flagMap[args[0]]);
        } else if (args[0]) {
            return `<div class="t-error">Unknown flag: ${args[0]}</div><div class="t-dim">Try: --mobile  --lang  --ai  --infra  --web  --tools</div>`;
        }

        let out = '';
        for (const cat of filtered) {
            out += `<div class="t-section-title">${cat.title}</div>`;
            for (const s of cat.skills) {
                out += `<div class="t-skill-row"><span class="t-skill-name">${pad(s.name, 24)}</span>${bar(s.level)}</div>`;
            }
            out += '<div class="t-spacer-sm"></div>';
        }
        return out;
    },

    // ── experience ────────────────────────────────────────
    experience(args, term) {
        if (!args.length || args[0] === '--list') {
            let out = `<div class="t-section-title">Work Experience</div>`;
            experiences.forEach((exp, i) => {
                const role = exp.roles[0];
                out += `<div class="t-exp-group">
                  <div class="t-exp-row">
                    <span class="t-exp-idx">${i + 1}.</span>
                    <span class="t-white">${exp.company}</span>
                  </div>
                  <div class="t-exp-sub">${role.title} &middot; ${role.period}</div>
                </div>`;
            });
            out += `<div class="t-dim t-spacer-sm">Type <span class="t-accent">experience &lt;name&gt;</span> for details &nbsp;e.g. <span class="t-accent">experience alfagift</span></div>`;
            return out;
        }

        const query = args.join(' ').toLowerCase();
        const match = experiences.find(e => e.company.toLowerCase().includes(query));
        if (!match) {
            return `<div class="t-error">No match for: "${query}"</div><div class="t-dim">Try: alfagift · gunadarma · lldikti · bangkit · mandiri</div>`;
        }

        let out = `<div class="t-section-title">${match.company}</div>`;
        for (const role of match.roles) {
            out += `<div class="t-role-title">${role.title} <span class="t-dim">· ${role.period}</span></div>`;
            for (const ach of role.achievements) {
                out += `<div class="t-ach-row"><span class="t-green">▸</span><span class="t-white"> ${ach}</span></div>`;
            }
            out += '<div class="t-spacer-sm"></div>';
        }
        return out;
    },

    // ── projects ──────────────────────────────────────────
    projects(args, term) {
        const catMap = { '--android': 'android', '--web': 'web', '--ml': 'ml', '--desktop': 'desktop' };
        let filtered = projects;

        if (args[0] && catMap[args[0]]) {
            filtered = projects.filter(p => p.category === catMap[args[0]]);
        } else if (args[0] && !catMap[args[0]]) {
            return `<div class="t-error">Unknown filter: ${args[0]}</div><div class="t-dim">Try: --android  --web  --ml  --desktop</div>`;
        }

        if (!filtered.length) return `<div class="t-error">No projects found for that filter.</div>`;

        let out = `<div class="t-section-title">Projects (${filtered.length})</div>`;
        for (const p of filtered) {
            const title = p.title.length > 34 ? p.title.slice(0, 33) + '…' : p.title;
            out += `<div class="t-proj-row">
              <span class="t-proj-id">${p.id}</span>
              <span class="t-proj-title">${title}</span>
              <span class="t-proj-meta">${p.category} &middot; ${p.duration}</span>
            </div>`;
        }
        out += `<div class="t-dim t-spacer-sm">Type <span class="t-accent">open &lt;id&gt;</span> to view details &nbsp;e.g. <span class="t-accent">open 1</span></div> <br/>`;
        return out;
    },

    // ── open <id> ─────────────────────────────────────────
    open(args, term) {
        if (!args[0]) return `<div class="t-error">Usage: open &lt;project-id&gt;</div><div class="t-dim">Run <span class="t-accent">projects</span> to see all IDs.</div>`;

        const id      = parseInt(args[0]);
        const project = projects.find(p => p.id === id);
        if (!project) return `<div class="t-error">Project #${id} not found.</div><div class="t-dim">Run <span class="t-accent">projects</span> to see available IDs.</div>`;

        setTimeout(() => {
            // Reveal all cards first (in case it's hidden by show-less)
            document.querySelectorAll('.project-card').forEach(c => c.classList.remove('hidden'));
            const card = document.querySelector(`[data-project-id="${id}"]`);
            if (card) {
                term.close();
                setTimeout(() => {
                    document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
                    setTimeout(() => card.click(), 500);
                }, 300);
            }
        }, 500);

        return `<div class="t-green">▸ Opening <span class="t-white">${project.title}</span>…</div>`;
    },

    // ── contact ───────────────────────────────────────────
    contact(args, term) {
        return `
<div class="t-section-title">Contact</div>
<div class="t-box">
  <div class="t-box-row"><span class="t-label">phone</span><span class="t-white">(+62) 81352243681</span></div>
  <div class="t-box-row"><span class="t-label">email</span><a class="t-link" href="mailto:farhanfathur73@gmail.com">farhanfathur73@gmail.com</a></div>
  <div class="t-box-row"><span class="t-label">linkedin</span><a class="t-link" href="https://linkedin.com/in/farhan-fathur/" target="_blank">linkedin.com/in/farhan-fathur/</a></div>
  <div class="t-box-row"><span class="t-label">github</span><a class="t-link" href="https://github.com/farhanfath/" target="_blank">github.com/farhanfath/</a></div>
</div>
<div class="t-dim t-spacer-sm">Or type <span class="t-accent">cv</span> to open the full resume.</div>`;
    },

    // ── cv ────────────────────────────────────────────────
    cv(args, term) {
        setTimeout(() => window.open('assets/cv/my-cv.pdf', '_blank'), 400);
        return `<div class="t-green">▸ Opening resume PDF…</div>`;
    },

    // ── neofetch ──────────────────────────────────────────
    neofetch(args, term) {
        const years = new Date().getFullYear() - 2021;
        return `
<div class="t-neo-wrap">
  <div class="t-neo-grid">
    <div class="t-neo-art">
<span class="t-green t-mono"> ██████╗ </span>
<span class="t-green t-mono">██╔═══██╗</span>
<span class="t-accent t-mono">██║   ██║</span>
<span class="t-accent t-mono">╚██████╔╝</span>
<span class="t-dim t-mono"> ╚═════╝ </span>
    </div>
    <div class="t-neo-info">
      <div class="t-neo-header"><span class="t-green t-bold">farhan</span><span class="t-dim">@</span><span class="t-accent t-bold">portfolio</span></div>
      <div class="t-neo-sep">─────────────────────────</div>
      <div class="t-neo-row"><span class="t-neo-label">OS</span><span class="t-white">Portfolio v2.0 · Terminal Edition</span></div>
      <div class="t-neo-row"><span class="t-neo-label">Role</span><span class="t-white">Android Engineer @ Alfagift</span></div>
      <div class="t-neo-row"><span class="t-neo-label">Kernel</span><span class="t-white">Kotlin 2.x + Jetpack Compose</span></div>
      <div class="t-neo-row"><span class="t-neo-label">Uptime</span><span class="t-white">${years}+ years engineering</span></div>
      <div class="t-neo-row"><span class="t-neo-label">Shell</span><span class="t-white">farhan-terminal v1.0</span></div>
      <div class="t-neo-row"><span class="t-neo-label">IDE</span><span class="t-white">Android Studio Meerkat</span></div>
      <div class="t-neo-row"><span class="t-neo-label">Packages</span><span class="t-white">42 skills · 10 projects · 6 certs</span></div>
      <div class="t-neo-row"><span class="t-neo-label">Network</span><span class="t-green">● Online — open to opportunities</span></div>
    </div>
  </div>
  <div class="t-neo-swatches">
    <span class="t-sw" style="background:#0d1117"></span>
    <span class="t-sw" style="background:#161b22"></span>
    <span class="t-sw" style="background:#21262d"></span>
    <span class="t-sw" style="background:#30363d"></span>
    <span class="t-sw" style="background:#56d364"></span>
    <span class="t-sw" style="background:#58a6ff"></span>
    <span class="t-sw" style="background:#e3b341"></span>
    <span class="t-sw" style="background:#f0f6fc"></span>
  </div>
</div>`;
    },

    // ── clear ─────────────────────────────────────────────
    clear(args, term) {
        term.clear();
        return null;
    },

    // ── exit ──────────────────────────────────────────────
    exit(args, term) {
        setTimeout(() => term.close(), 350);
        return `<div class="t-dim">Goodbye 👋  Closing terminal…</div>`;
    },

    // ── ls (easter egg) ───────────────────────────────────
    ls(args, term) {
        return `
<div class="t-ls">
  <span class="t-accent">about/</span>
  <span class="t-accent">experience/</span>
  <span class="t-accent">projects/</span>
  <span class="t-accent">skills/</span>
  <span class="t-accent">certifications/</span>
  <span class="t-accent">contact/</span>
  <span class="t-dim">cv.pdf</span>
  <span class="t-dim">README.md</span>
  <span class="t-dim">.gitconfig</span>
</div>
<div class="t-dim t-spacer-sm">These are just for fun 😄 — use <span class="t-accent">help</span> for real commands.</div>
<br/>
`;
    },

    // ── date ──────────────────────────────────────────────
    date(args, term) {
        return `<div class="t-white">${new Date().toString()}</div>`;
    },

    // ── echo ──────────────────────────────────────────────
    echo(args, term) {
        const text = args.join(' ');
        return `<div class="t-white">${text.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>`;
    },
};
