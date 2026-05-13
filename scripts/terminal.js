import { commands, commandList } from './terminal-commands.js';

export class Terminal {
    constructor() {
        this.outputEl = document.getElementById('terminal-output');
        this.inputEl  = document.getElementById('terminal-input');
        this.overlay  = document.getElementById('terminal-overlay');
        this.history  = [];   // command history
        this.histIdx  = -1;   // history navigation index
    }

    init() {
        this._bindEvents();
        this._printWelcome();
    }

    // ── Event wiring ──────────────────────────────────────
    _bindEvents() {
        // Keyboard input
        this.inputEl.addEventListener('keydown', e => this._onKey(e));

        // Click anywhere in output → focus input
        this.outputEl.addEventListener('click', () => this.inputEl.focus());

        // Traffic-light close button & × button
        document.getElementById('term-btn-close').addEventListener('click',   () => this.close());
        document.getElementById('term-btn-close-x').addEventListener('click', () => this.close());

        // Navbar toggle buttons (desktop + mobile)
        document.querySelectorAll('#terminal-toggle, #terminal-toggle-mobile')
            .forEach(btn => btn.addEventListener('click', () => this.toggle()));

        // Ctrl+` shortcut
        document.addEventListener('keydown', e => {
            if ((e.ctrlKey || e.metaKey) && e.key === '`') {
                e.preventDefault();
                this.toggle();
            }
        });

        // Click outside the window → close
        this.overlay.addEventListener('click', e => {
            if (e.target === this.overlay) this.close();
        });
    }

    // ── Key handler ───────────────────────────────────────
    _onKey(e) {
        switch (e.key) {
            case 'Enter': {
                const raw = this.inputEl.value;
                const cmd = raw.trim();
                this.inputEl.value = '';
                this._appendPromptLine(raw);
                if (cmd) {
                    this.history.unshift(cmd);
                    this.histIdx = -1;
                    this._exec(cmd);
                }
                break;
            }
            case 'ArrowUp':
                e.preventDefault();
                if (this.histIdx < this.history.length - 1) {
                    this.histIdx++;
                    this.inputEl.value = this.history[this.histIdx];
                }
                break;
            case 'ArrowDown':
                e.preventDefault();
                if (this.histIdx > 0) {
                    this.histIdx--;
                    this.inputEl.value = this.history[this.histIdx];
                } else {
                    this.histIdx = -1;
                    this.inputEl.value = '';
                }
                break;
            case 'Tab':
                e.preventDefault();
                this._autocomplete();
                break;
            case 'l':
                if (e.ctrlKey) { e.preventDefault(); this.clear(); }
                break;
            case 'c':
                if (e.ctrlKey) {
                    this._appendPromptLine(this.inputEl.value + '^C');
                    this.inputEl.value = '';
                }
                break;
        }
    }

    // ── Execute command ───────────────────────────────────
    _exec(raw) {
        const parts = raw.trim().split(/\s+/);
        const name  = parts[0].toLowerCase();
        const args  = parts.slice(1);

        const fn = commands[name];
        if (fn) {
            const result = fn(args, this);
            if (result != null) this._appendOutput(result);
        } else {
            this._appendOutput(
                `<div class="t-error">bash: ${this._esc(name)}: command not found</div>` +
                `<div class="t-dim">Type <span class="t-accent">help</span> to see available commands.</div>`
            );
        }
        this._scroll();
    }

    // ── Tab autocomplete ──────────────────────────────────
    _autocomplete() {
        const val     = this.inputEl.value.trim().toLowerCase();
        if (!val) return;
        const matches = commandList.filter(c => c.startsWith(val));
        if (matches.length === 1) {
            this.inputEl.value = matches[0];
        } else if (matches.length > 1) {
            this._appendPromptLine(this.inputEl.value);
            this._appendOutput(`<div class="t-dim">${matches.join('&nbsp;&nbsp;&nbsp;')}</div>`);
        }
    }

    // ── DOM helpers ───────────────────────────────────────
    _appendPromptLine(cmd) {
        this.outputEl.insertAdjacentHTML('beforeend', `
            <div class="t-prompt-line">
                <span class="t-user">farhan</span><span class="t-sep">@</span><span class="t-host">portfolio</span><span class="t-colon">:~$</span><span class="t-input-echo"> ${this._esc(cmd)}</span>
            </div>`);
        this._scroll();
    }

    _appendOutput(html) {
        const div = document.createElement('div');
        div.className = 'terminal-out-block';
        div.innerHTML = html;
        this.outputEl.appendChild(div);
        this._scroll();
    }

    _printWelcome() {
        this._appendOutput(`

<div class="t-welcome-banner">
<pre class="ascii-art">
<span class="t-green">  ██████╗  ██████╗ ██████╗ ████████╗███████╗ ██████╗ ██╗     ██╗ ██████╗ </span>
<span class="t-green">  ██╔══██╗██╔═══██╗██╔══██╗╚══██╔══╝██╔════╝██╔═══██╗██║     ██║██╔═══██╗</span>
<span class="t-accent">  ██████╔╝██║   ██║██████╔╝   ██║   █████╗  ██║   ██║██║     ██║██║   ██║ </span>
<span class="t-dim">  ██╔═══╝ ██║   ██║██╔══██╗   ██║   ██╔══╝  ██║   ██║██║     ██║██║   ██║ </span>
<span class="t-dim">  ██║     ╚██████╔╝██║  ██║   ██║   ██║     ╚██████╔╝███████╗██║╚██████╔╝ </span>
<span class="t-dim">  ╚═╝      ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚═╝      ╚═════╝ ╚══════╝╚═╝ ╚═════╝ </span>
</pre>

</div>
<div class="t-welcome-sub">
  <span class="t-green">✓</span> <span class="t-white">Portfolio Terminal v2.0</span>
  <span class="t-dim"> — Interactive Mode</span>
</div>
<div class="t-dim">Type <span class="t-accent">help</span> to see commands · <span class="t-accent">↑↓</span> history · <span class="t-accent">Tab</span> autocomplete · <span class="t-accent">Ctrl+\`</span> toggle</div>
<div class="t-spacer"></div>`);
    }

    // ── Public API ────────────────────────────────────────
    clear() {
        this.outputEl.innerHTML = '';
        this._printWelcome();
    }

    toggle() {
        this.overlay.classList.contains('t-hidden') ? this.open() : this.close();
    }

    open() {
        this.overlay.classList.remove('t-hidden');
        // Next frame so transition fires
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                this.overlay.classList.add('t-visible');
                setTimeout(() => this.inputEl.focus(), 150);
            });
        });
    }

    close() {
        this.overlay.classList.remove('t-visible');
        setTimeout(() => this.overlay.classList.add('t-hidden'), 300);
    }

    // ── Utils ─────────────────────────────────────────────
    _scroll() { this.outputEl.scrollTop = this.outputEl.scrollHeight; }
    _esc(t)   { return String(t).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
}
