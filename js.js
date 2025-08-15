const canvas = document.querySelector('.particles');
const ctx = canvas.getContext('2d');

let particlesArray = [];
let mouse = {
    x: null,
    y: null,
    radius: 100
};

// Redimensionner le canvas
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Suivi de la souris
window.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
});

// Classe particule
class Particle {
    constructor(x, y, size, color, speedX, speedY) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.speedX = speedX;
        this.speedY = speedY;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    update() {
        // Déplacement
        this.x += this.speedX;
        this.y += this.speedY;

        // Réaction à la souris
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx*dx + dy*dy);
        if(distance < mouse.radius) {
            let angle = Math.atan2(dy, dx);
            let repel = (mouse.radius - distance)/10;
            this.x -= Math.cos(angle) * repel;
            this.y -= Math.sin(angle) * repel;
        }

        // Rebondir sur les bords
        if(this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if(this.y < 0 || this.y > canvas.height) this.speedY *= -1;

        this.draw();
    }
}

// Créer les particules
function initParticles(num=120) {
    particlesArray = [];
    for(let i = 0; i < num; i++){
        let size = Math.random() * 3 + 1;
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        let speedX = (Math.random() - 0.5) * 1.2;
        let speedY = (Math.random() - 0.5) * 1.2;
        let color = `rgba(${50 + Math.random()*50}, ${50 + Math.random()*50}, ${50 + Math.random()*50}, 0.8)`;
        particlesArray.push(new Particle(x, y, size, color, speedX, speedY));
    }
}

// Relier les particules proches entre elles
function connectParticles() {
    for(let a = 0; a < particlesArray.length; a++){
        for(let b = a; b < particlesArray.length; b++){
            let dx = particlesArray[a].x - particlesArray[b].x;
            let dy = particlesArray[a].y - particlesArray[b].y;
            let distance = Math.sqrt(dx*dx + dy*dy);
            if(distance < 120){
                ctx.strokeStyle = `rgba(200,200,200,${1 - distance/120})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}

// Animation
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesArray.forEach(p => p.update());
    connectParticles();
    requestAnimationFrame(animate);
}

initParticles();
animate();
