/**
 * FallingStars — A layered canvas animation:
 *  - Background: small twinkling static stars
 *  - Foreground: diagonal falling stars (shooting stars) with glowing tails
 */
class SimpleStars {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.bgStars = [];       // Static twinkling background stars
        this.fallingStars = [];  // Active falling/shooting stars
        this.animationId = null;
        this.lastSpawn = 0;
        this.spawnInterval = 600; // ms between new falling stars

        this.init();
        this.createBgStars();
        this.animate();
        this.setupEventListeners();
    }

    init() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');

        this.canvas.style.position = 'absolute';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.zIndex = '1';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.opacity = '0.85';

        const heroSection = document.getElementById('home');
        if (heroSection) {
            heroSection.appendChild(this.canvas);
        }

        this.resize();
    }

    // ── Background Stars ─────────────────────────────────────────────────
    createBgStars() {
        this.bgStars = [];
        const count = window.innerWidth < 768 ? 120 : 260;
        for (let i = 0; i < count; i++) {
            this.bgStars.push(this.newBgStar(true));
        }
    }

    newBgStar(randomY = false) {
        const radius = Math.random() * 1.4 + 0.3;
        return {
            x: Math.random() * this.canvas.width,
            y: randomY ? Math.random() * this.canvas.height : 0,
            radius,
            baseRadius: radius,
            opacity: Math.random() * 0.6 + 0.2,
            targetOpacity: Math.random() * 0.7 + 0.3,
            twinkleRate: Math.random() * 0.012 + 0.004,
            twinklePhase: Math.random() * Math.PI * 2,
        };
    }

    updateBgStar(star) {
        // Twinkling
        star.twinklePhase += star.twinkleRate;
        star.opacity = 0.25 + 0.55 * (0.5 + 0.5 * Math.sin(star.twinklePhase));
        star.radius = star.baseRadius * (0.85 + 0.3 * Math.sin(star.twinklePhase * 1.3));
    }

    drawBgStar(star) {
        const ctx = this.ctx;
        ctx.save();
        ctx.globalAlpha = star.opacity;
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = '#c7d8ff';
        ctx.shadowBlur = star.radius * 3;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }

    // ── Falling Stars ─────────────────────────────────────────────────────
    spawnFallingStar() {
        const w = this.canvas.width;
        const h = this.canvas.height;
        const isMobile = w < 768;

        // Start from random point across top ~60% width, upper area
        const startX = Math.random() * w * 1.2 - w * 0.1;
        const startY = Math.random() * h * 0.3 - 20;

        // Angle: mostly downward with slight diagonal (30°–60° from horizontal)
        const angleDeg = 40 + Math.random() * 25;
        const angleRad = (angleDeg * Math.PI) / 180;

        const speed = (isMobile ? 4 : 5) + Math.random() * 4;
        const length = (isMobile ? 60 : 90) + Math.random() * 80;
        const width = 1.2 + Math.random() * 1.2;
        const maxOpacity = 0.6 + Math.random() * 0.4;

        return {
            x: startX,
            y: startY,
            vx: Math.cos(angleRad) * speed,
            vy: Math.sin(angleRad) * speed,
            length,
            width,
            maxOpacity,
            opacity: 0,
            phase: 'fade-in', // fade-in → active → fade-out
            life: 0,
            maxLife: length / speed * 2, // frames to travel the full length + tail
        };
    }

    updateFallingStar(star) {
        star.x += star.vx;
        star.y += star.vy;
        star.life++;

        const half = star.maxLife / 2;
        if (star.life < half * 0.3) {
            star.opacity = (star.life / (half * 0.3)) * star.maxOpacity;
        } else if (star.life > star.maxLife * 0.7) {
            const fadeProgress = (star.life - star.maxLife * 0.7) / (star.maxLife * 0.3);
            star.opacity = star.maxOpacity * (1 - fadeProgress);
        } else {
            star.opacity = star.maxOpacity;
        }
    }

    isOutOfBounds(star) {
        return (
            star.life > star.maxLife ||
            star.x - star.length > this.canvas.width ||
            star.y - star.length > this.canvas.height ||
            star.opacity <= 0
        );
    }

    drawFallingStar(star) {
        if (star.opacity <= 0) return;
        const ctx = this.ctx;

        // Tail end (start of gradient, behind the head)
        const tailX = star.x - star.vx / Math.hypot(star.vx, star.vy) * star.length;
        const tailY = star.y - star.vy / Math.hypot(star.vx, star.vy) * star.length;

        const grad = ctx.createLinearGradient(tailX, tailY, star.x, star.y);
        grad.addColorStop(0, `rgba(255,255,255,0)`);
        grad.addColorStop(0.6, `rgba(200,220,255,${(star.opacity * 0.4).toFixed(3)})`);
        grad.addColorStop(1, `rgba(255,255,255,${star.opacity.toFixed(3)})`);

        ctx.save();
        ctx.globalAlpha = 1;
        ctx.strokeStyle = grad;
        ctx.lineWidth = star.width;
        ctx.lineCap = 'round';
        ctx.shadowColor = '#a0c4ff';
        ctx.shadowBlur = 6;

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(star.x, star.y);
        ctx.stroke();

        // Bright head glow
        ctx.shadowBlur = 10;
        ctx.globalAlpha = star.opacity;
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.width * 0.9, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
    }

    // ── Main Loop ─────────────────────────────────────────────────────────
    animate() {
        this.animationId = requestAnimationFrame((ts) => this.animate(ts));

        const ctx = this.ctx;
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Background stars
        this.bgStars.forEach(star => {
            this.updateBgStar(star);
            this.drawBgStar(star);
        });

        // Spawn new falling stars periodically (random chance each frame)
        const now = performance.now();
        if (now - this.lastSpawn > this.spawnInterval) {
            this.fallingStars.push(this.spawnFallingStar());
            this.lastSpawn = now;
            // Occasionally spawn a burst of 2
            if (Math.random() < 0.25) {
                setTimeout(() => {
                    this.fallingStars.push(this.spawnFallingStar());
                }, 150 + Math.random() * 250);
            }
        }

        // Update & draw falling stars, cull finished ones
        this.fallingStars = this.fallingStars.filter(star => {
            this.updateFallingStar(star);
            this.drawFallingStar(star);
            return !this.isOutOfBounds(star);
        });
    }

    // ── Lifecycle ─────────────────────────────────────────────────────────
    setupEventListeners() {
        window.addEventListener('resize', () => {
            this.resize();
            this.createBgStars();
        });
    }

    resize() {
        const heroSection = document.getElementById('home');
        if (heroSection) {
            this.canvas.width = heroSection.offsetWidth;
            this.canvas.height = heroSection.offsetHeight;
        }
    }

    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        if (this.canvas && this.canvas.parentElement) {
            this.canvas.parentElement.removeChild(this.canvas);
        }
    }
}

export { SimpleStars };