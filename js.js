const canvas = document.querySelector('.particles');
const ctx = canvas.getContext('2d');

let starsArray = [];

// Initialiser canvas
function initCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', initCanvas);
initCanvas();

// Classe étoile
class Star {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedY = Math.random() * 0.5 + 0.2;
        this.opacity = Math.random();
        this.opacitySpeed = Math.random() * 0.02;
    }

    update() {
        this.y += this.speedY;
        if (this.y > canvas.height) {
            this.y = 0;
            this.x = Math.random() * canvas.width;
        }
        this.opacity += this.opacitySpeed;
        if(this.opacity > 1) this.opacity = 0;
    }

    draw() {
        ctx.fillStyle = `rgba(255,255,255,${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Initialiser étoiles
function initStars(count = 200) {
    starsArray = [];
    for(let i = 0; i < count; i++) {
        starsArray.push(new Star());
    }
}
initStars();

// Animation
function animate() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    starsArray.forEach(star => {
        star.update();
        star.draw();
    });
    requestAnimationFrame(animate);
}

animate();
