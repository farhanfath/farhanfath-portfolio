/**
 * 3D Card Tilt with glare effect.
 * – Works only on pointer (mouse) devices; skips touch screens.
 * – Perspective is applied inline per-card so cards in a grid are independent.
 * – Glare follows the cursor as a radial-gradient overlay.
 */

const TILT_MAX   = 13;    // degrees max rotation each axis
const SCALE      = 1.03;  // slight lift on hover
const PERSPECTIVE = 900;  // px

export function setupCardTilt(selector = '.project-card') {
    // Skip if the device is primarily touch (no fine pointer)
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const cards = document.querySelectorAll(selector);

    cards.forEach(card => {
        // Inject glare layer (absolute, full-size, pointer-events:none)
        const glare = document.createElement('div');
        glare.className = 'card-glare';
        card.appendChild(glare);

        // ── Handlers ───────────────────────────────────────────────────
        card.addEventListener('mouseenter', () => {
            // Fast response while tilting
            card.style.transition = 'transform 0.1s ease, box-shadow 0.15s ease';
        });

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;   // cursor x inside card
            const y = e.clientY - rect.top;    // cursor y inside card
            const cx = rect.width  / 2;
            const cy = rect.height / 2;

            // Normalise to -1 … +1
            const nx = (x - cx) / cx;
            const ny = (y - cy) / cy;

            const rotX =  -ny * TILT_MAX;   // tilt up when cursor near top
            const rotY =   nx * TILT_MAX;   // tilt right when cursor near right

            card.style.transform =
                `perspective(${PERSPECTIVE}px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(${SCALE},${SCALE},${SCALE})`;

            // Glare: radial highlight at cursor position
            const gx = (x / rect.width)  * 100;
            const gy = (y / rect.height) * 100;
            glare.style.background =
                `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.18) 0%, transparent 65%)`;
        });

        card.addEventListener('mouseleave', () => {
            // Slow, elastic reset
            card.style.transition =
                'transform 0.55s cubic-bezier(0.23,1,0.32,1), box-shadow 0.4s ease';
            card.style.transform =
                `perspective(${PERSPECTIVE}px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)`;
            glare.style.background = '';
        });
    });
}
