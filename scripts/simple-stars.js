// Simple Animated Stars Background
class SimpleStars {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.stars = [];
        this.mouse = { x: 0, y: 0 };
        this.animationId = null;

        console.log('SimpleStars: Starting initialization...');
        this.init();
        this.createStars();
        this.animate();
        this.setupEventListeners();
    }

    init() {
        // Create canvas
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');

        // Set canvas properties
        this.canvas.style.position = 'absolute';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.zIndex = '1';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.opacity = '0.7';

        // Add to hero section
        const heroSection = document.getElementById('home');
        if (heroSection) {
            heroSection.appendChild(this.canvas);
            console.log('SimpleStars: Canvas added to hero section');
        }

        this.resize();
    }

    createStars() {
        this.stars = [];
        const starCount = window.innerWidth < 768 ? 150 : 300;

        for (let i = 0; i < starCount; i++) {
            this.stars.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                radius: Math.random() * 2 + 0.5,
                originalRadius: Math.random() * 2 + 0.5,
                speed: Math.random() * 0.5 + 0.1,
                angle: Math.random() * Math.PI * 2,
                twinkleSpeed: Math.random() * 0.02 + 0.01,
                opacity: Math.random() * 0.8 + 0.2,
                targetOpacity: Math.random() * 0.8 + 0.2
            });
        }

        console.log(`SimpleStars: Created ${this.stars.length} stars`);
    }

    animate() {
        this.animationId = requestAnimationFrame(() => this.animate());

        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        const time = Date.now() * 0.001;

        this.stars.forEach((star, index) => {
            // Gentle movement
            star.x += Math.sin(time * star.speed + star.angle) * 0.3;
            star.y += Math.cos(time * star.speed + star.angle) * 0.2;

            // Wrap around screen
            if (star.x < 0) star.x = this.canvas.width;
            if (star.x > this.canvas.width) star.x = 0;
            if (star.y < 0) star.y = this.canvas.height;
            if (star.y > this.canvas.height) star.y = 0;

            // Twinkling effect
            star.opacity += (star.targetOpacity - star.opacity) * 0.02;
            if (Math.abs(star.opacity - star.targetOpacity) < 0.01) {
                star.targetOpacity = Math.random() * 0.8 + 0.2;
            }

            // Size variation for twinkling
            star.radius = star.originalRadius + Math.sin(time * star.twinkleSpeed * 4) * 0.3;

            // Mouse interaction - gentle push effect
            const dx = star.x - this.mouse.x;
            const dy = star.y - this.mouse.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
                const force = (100 - distance) / 100;
                star.x += (dx / distance) * force * 0.5;
                star.y += (dy / distance) * force * 0.5;
            }

            // Draw star
            this.ctx.save();
            this.ctx.globalAlpha = star.opacity;
            this.ctx.fillStyle = '#ffffff';
            this.ctx.shadowColor = '#ffffff';
            this.ctx.shadowBlur = star.radius * 2;

            this.ctx.beginPath();
            this.ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            this.ctx.fill();

            // Add sparkle effect for larger stars
            if (star.originalRadius > 1.5) {
                this.ctx.globalAlpha = star.opacity * 0.3;
                this.ctx.beginPath();
                this.ctx.arc(star.x, star.y, star.radius * 3, 0, Math.PI * 2);
                this.ctx.fill();
            }

            this.ctx.restore();
        });

        // Add some connecting lines between nearby stars (constellation effect)
        this.drawConstellations();
    }

    drawConstellations() {
        this.ctx.save();
        this.ctx.strokeStyle = '#ffffff';
        this.ctx.globalAlpha = 0.1;
        this.ctx.lineWidth = 0.5;

        for (let i = 0; i < this.stars.length; i++) {
            for (let j = i + 1; j < this.stars.length; j++) {
                const star1 = this.stars[i];
                const star2 = this.stars[j];

                const dx = star1.x - star2.x;
                const dy = star1.y - star2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                // Only connect nearby stars
                if (distance < 80 && Math.random() > 0.98) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(star1.x, star1.y);
                    this.ctx.lineTo(star2.x, star2.y);
                    this.ctx.stroke();
                }
            }
        }

        this.ctx.restore();
    }

    setupEventListeners() {
        // Mouse movement
        window.addEventListener('mousemove', (event) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mouse.x = event.clientX - rect.left;
            this.mouse.y = event.clientY - rect.top;
        });

        // Window resize
        window.addEventListener('resize', () => {
            this.resize();
            this.createStars(); // Recreate stars for new dimensions
        });

        // Touch events for mobile
        window.addEventListener('touchmove', (event) => {
            if (event.touches.length > 0) {
                const rect = this.canvas.getBoundingClientRect();
                this.mouse.x = event.touches[0].clientX - rect.left;
                this.mouse.y = event.touches[0].clientY - rect.top;
            }
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
        console.log('SimpleStars: Destroyed');
    }
}

export { SimpleStars };