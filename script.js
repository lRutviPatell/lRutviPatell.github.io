/* Progress bar */
window.addEventListener("scroll", () => {
  const h = document.documentElement;
  document.getElementById("progress-bar").style.width =
    (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100 + "%";
});

/* Reveal + skill animation */
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add("show");

      e.target.querySelectorAll(".bar div").forEach(bar => {
        bar.style.width = bar.dataset.level + "%";
      });
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

/* Dark mode */
const toggle = document.getElementById("toggle");
if (localStorage.theme === "dark") document.body.classList.add("dark");
toggle.onclick = () => {
  document.body.classList.toggle("dark");
  localStorage.theme = document.body.classList.contains("dark") ? "dark" : "light";
};

/* Cursor glow */
const glow = document.getElementById("cursor-glow");
document.addEventListener("mousemove", e => {
  glow.style.left = e.clientX + "px";
  glow.style.top = e.clientY + "px";
});

/* Particles */
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
