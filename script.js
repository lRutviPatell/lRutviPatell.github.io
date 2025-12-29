/* Scroll progress */
window.addEventListener("scroll", () => {
  const h = document.documentElement;
  const progress = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
  document.getElementById("progress-bar").style.width = progress + "%";
});

/* Reveal */
const reveals = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      e.target.style.transitionDelay = `${i * 0.08}s`;
      e.target.classList.add("show");
    }
  });
}, { threshold: 0.2 });
reveals.forEach(el => observer.observe(el));

/* Dark mode */
const toggle = document.getElementById("toggle");
if (localStorage.theme === "dark") document.body.classList.add("dark");
toggle.onclick = () => {
  document.body.classList.toggle("dark");
  localStorage.theme = document.body.classList.contains("dark") ? "dark" : "light";
};

/* Mouse glow */
const glow = document.getElementById("cursor-glow");
document.addEventListener("mousemove", e => {
  glow.style.left = e.clientX + "px";
  glow.style.top = e.clientY + "px";
});

/* Skill bars */
document.querySelectorAll(".bar div").forEach(bar => {
  const level = bar.dataset.level;
  observer.observe(bar);
  bar.style.width = level + "%";
});

/* Particle background */
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;
let particles = Array.from({ length: 40 }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  r: Math.random() * 1.5 + 0.5,
  v: Math.random() * 0.3 + 0.1
}));

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.y -= p.v;
    if (p.y < 0) p.y = canvas.height;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(37,99,235,0.25)";
    ctx.fill();
  });
  requestAnimationFrame(animate);
}
animate();
