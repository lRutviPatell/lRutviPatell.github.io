const elements = document.querySelectorAll(".fade-in");

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

elements.forEach(el => observer.observe(el));

/* Scroll animations */
document.querySelectorAll(".fade").forEach(el => {
  new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) el.classList.add("show");
    });
  }, { threshold: 0.15 }).observe(el);
});

/* Dark mode */
const toggle = document.getElementById("toggle");
if (localStorage.theme === "dark") document.body.classList.add("dark");

toggle?.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  localStorage.theme = document.body.classList.contains("dark") ? "dark" : "light";
});
