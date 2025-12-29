/* ===============================
   SCROLL REVEAL ANIMATION
   =============================== */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  { threshold: 0.15 }
);

revealElements.forEach((el) => revealObserver.observe(el));


/* ===============================
   ACTIVE NAV LINK ON SCROLL
   =============================== */

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");

function setActiveNav() {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 120;
    const sectionHeight = section.offsetHeight;

    if (
      window.scrollY >= sectionTop &&
      window.scrollY < sectionTop + sectionHeight
    ) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
}

window.addEventListener("scroll", setActiveNav);


/* ===============================
   THEME TOGGLE (PERSISTENT)
   =============================== */

const themeToggle = document.getElementById("themeToggle");

// Load saved theme
if (localStorage.getItem("theme") === "light") {
  document.body.classList.add("light");
}

// Toggle theme
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");

  if (document.body.classList.contains("light")) {
    localStorage.setItem("theme", "light");
  } else {
    localStorage.setItem("theme", "dark");
  }
});


/* ===============================
   SUBTLE BACKGROUND GLOW (MOUSE)
   =============================== */

const glow = document.createElement("div");
glow.style.position = "fixed";
glow.style.width = "260px";
glow.style.height = "260px";
glow.style.borderRadius = "50%";
glow.style.pointerEvents = "none";
glow.style.background =
  "radial-gradient(circle, rgba(59,130,246,0.15), transparent 70%)";
glow.style.zIndex = "-1";
glow.style.transform = "translate(-50%, -50%)";
document.body.appendChild(glow);

document.addEventListener("mousemove", (e) => {
  glow.style.left = `${e.clientX}px`;
  glow.style.top = `${e.clientY}px`;
});


/* ===============================
   SAFE PRINT HANDLING
   =============================== */

window.addEventListener("beforeprint", () => {
  document.body.classList.add("print");
});

window.addEventListener("afterprint", () => {
  document.body.classList.remove("print");
});
