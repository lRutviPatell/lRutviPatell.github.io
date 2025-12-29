/* SCROLL REVEAL */
const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  { threshold: 0.15 }
);

reveals.forEach(el => observer.observe(el));

/* THEME TOGGLE */
const themeToggle = document.getElementById("themeToggle");

if (localStorage.theme === "light") {
  document.body.classList.add("light");
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
  localStorage.theme = document.body.classList.contains("light") ? "light" : "dark";
});

/* PARTICLES */
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

let particles = Array.from({ length: 60 }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  r: Math.random() * 1.6 + 0.6,
  v: Math.random() * 0.35 + 0.1
}));

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.y -= p.v;
    if (p.y < 0) p.y = canvas.height;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(59,130,246,0.35)";
    ctx.fill();
  });
  requestAnimationFrame(animate);
}
animate();
