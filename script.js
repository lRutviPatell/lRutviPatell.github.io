/* Scroll reveal */
const revealEls = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        entry.target.style.transitionDelay = `${i * 0.08}s`;
        entry.target.classList.add("show");
      }
    });
  },
  { threshold: 0.2 }
);

revealEls.forEach(el => observer.observe(el));

/* Dark mode */
const toggle = document.getElementById("toggle");
if (localStorage.theme === "dark") document.body.classList.add("dark");

toggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  localStorage.theme = document.body.classList.contains("dark") ? "dark" : "light";
});

/* Particle background */
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
let particles = [];
const count = 45;

function resize() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
}
resize();
addEventListener("resize", resize);

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.r = Math.random() * 1.5 + 0.5;
    this.v = Math.random() * 0.3 + 0.1;
    this.o = Math.random() * 0.25 + 0.05;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(37,99,235,${this.o})`;
    ctx.fill();
  }
  update() {
    this.y -= this.v;
    if (this.y < 0) this.reset();
    this.draw();
  }
}

for (let i = 0; i < count; i++) particles.push(new Particle());

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => p.update());
  requestAnimationFrame(animate);
}
animate();
