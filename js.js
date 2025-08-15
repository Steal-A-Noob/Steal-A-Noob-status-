const canvas = document.querySelector('.particles');
const ctx = canvas.getContext('2d');

let particlesArray = [];
const colors = ['#aaaaaa', '#cccccc', '#ffffff']; // gris clair/blanc
const maxDistance = 120; // distance pour relier les particules

// Initialisation du canvas
function initCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', initCanvas);
initCanvas();

// Classe Particule
class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 0.3 - 0.15; // déplacement plus lent
        this.speedY = Math.random() * 0.3 - 0.15;
        this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Rebondir sur les bords
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Initialiser les particules
function initParticles(count = 120) {
    particlesArray = [];
    for (let i = 0; i < count; i++) {
        particlesArray.push(new Particle());
    }
}
initParticles();

// Relier les particules proches avec des lignes subtiles
function connectParticles() {
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
            let dx = particlesArray[a].x - particlesArray[b].x;
            let dy = particlesArray[a].y - particlesArray[b].y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < maxDistance) {
                ctx.strokeStyle = `rgba(200, 200, 200, ${1 - distance / maxDistance})`;
                ctx.lineWidth = 0.7;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}

// Animation des particules
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesArray.forEach(p => {
        p.update();
        p.draw();
    });
    connectParticles();
    requestAnimationFrame(animate);
}

animate();
