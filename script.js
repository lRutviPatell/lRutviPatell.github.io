/* ===============================
   SCROLL REVEAL ANIMATIONS
   =============================== */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // staggered delay for smoother feel
        entry.target.style.transitionDelay = `${index * 0.08}s`;
        entry.target.classList.add("show");
      }
    });
  },
  {
    threshold: 0.2
  }
);

revealElements.forEach((el) => revealObserver.observe(el));

/* ===============================
   DARK MODE TOGGLE (PERSISTENT)
   =============================== */

const toggle = document.getElementById("toggle");

// Load saved theme
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
}

// Toggle on click
if (toggle) {
  toggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    // Save preference
    if (document.body.classList.contains("dark")) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
  });
}

/* ===============================
   OPTIONAL: SMOOTH SCROLL FOR ANCHORS
   (future-proof, safe to keep)
   =============================== */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

/* ===============================
   PAGE LOAD FADE (HERO POLISH)
   =============================== */

window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});
