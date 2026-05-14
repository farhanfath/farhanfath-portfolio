// ── Toast ──────────────────────────────────────────────────────────────────
function showToast(message) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
        <i data-lucide="check-circle" style="width:1rem;height:1rem;flex-shrink:0"></i>
        <span>${message}</span>
    `;
    container.appendChild(toast);
    lucide.createIcons();

    // Fade out then remove
    setTimeout(() => {
        toast.classList.add('toast--out');
        setTimeout(() => toast.remove(), 280);
    }, 1800);
}

// ── Copy helper ────────────────────────────────────────────────────────────
async function copyText(text) {
    if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
    } else {
        // Legacy fallback
        const el = document.createElement('textarea');
        el.value = text;
        el.style.position = 'fixed';
        el.style.opacity = '0';
        document.body.appendChild(el);
        el.focus();
        el.select();
        document.execCommand('copy');
        el.remove();
    }
}

// ── Setup ──────────────────────────────────────────────────────────────────
export function setupContactCopy() {
    document.querySelectorAll('.copy-btn').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            e.stopPropagation();

            const text  = btn.dataset.copy;
            const label = btn.dataset.label || 'Text';
            if (!text) return;

            try {
                await copyText(text);

                // Swap icon to check-circle temporarily
                const iconEl = btn.querySelector('[data-lucide]');
                if (iconEl) {
                    iconEl.setAttribute('data-lucide', 'check');
                    lucide.createIcons();
                    setTimeout(() => {
                        iconEl.setAttribute('data-lucide', 'copy');
                        lucide.createIcons();
                    }, 1600);
                }

                showToast(`${label} copied!`);
            } catch {
                showToast('Could not copy — try manually');
            }
        });
    });
}
