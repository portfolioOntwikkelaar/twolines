const canvas = document.getElementById('motionField');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let lines = [];
const colors = ['#e38cff', '#ffbdf4', '#69d2ff', '#00ffcc'];
const maxLines = 100;

// Creëer bewegende lijnstructuren
class Line {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.length = Math.random() * 80 + 20;
    this.angle = Math.random() * Math.PI * 2;
    this.speed = Math.random() * 2 + 0.5;
    this.opacity = 1;
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }

  update() {
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed;
    this.opacity -= 0.015;
  }

  draw() {
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 2;
    ctx.globalAlpha = this.opacity;
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 15;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x - Math.cos(this.angle) * this.length, this.y - Math.sin(this.angle) * this.length);
    ctx.stroke();
    ctx.closePath();
    ctx.globalAlpha = 1;
  }
}

// Mouse interactie
let mouse = { x: null, y: null };
window.addEventListener('mousemove', e => {
  mouse.x = e.x;
  mouse.y = e.y;
  for (let i = 0; i < 4; i++) {
    lines.push(new Line(mouse.x, mouse.y));
  }
});

function animate() {
  ctx.fillStyle = 'rgba(16, 8, 31, 0.15)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  lines.forEach((line, i) => {
    line.update();
    line.draw();
    if (line.opacity <= 0) lines.splice(i, 1);
  });

  // Zachte kleurverschuiving in de achtergrond
  document.body.style.background = `radial-gradient(circle at ${50 + Math.sin(Date.now() * 0.0005) * 10}% 30%, var(--bg2), var(--bg1))`;

  requestAnimationFrame(animate);
}

animate();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
