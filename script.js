/* ===============================
   SCROLL REVEAL
   =============================== */
const revealElements = document.querySelectorAll(".reveal, .reveal-left, .reveal-right");

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  { threshold: 0.1 }
);

revealElements.forEach(el => observer.observe(el));

/* ===============================
   MOBILE MENU TOGGLE
   =============================== */
const mobileToggle = document.querySelector(".mobile-toggle");
const navLinks = document.querySelector(".nav-links");

if (mobileToggle) {
  mobileToggle.addEventListener("click", () => {
    navLinks.classList.toggle("nav-active");
    
    // Toggle icon
    const icon = mobileToggle.querySelector("i");
    if (navLinks.classList.contains("nav-active")) {
      icon.classList.remove("fa-bars");
      icon.classList.add("fa-times");
    } else {
      icon.classList.remove("fa-times");
      icon.classList.add("fa-bars");
    }
  });
}

// Close menu when clicking a link
document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("nav-active");
    const icon = mobileToggle.querySelector("i");
    if (icon) {
      icon.classList.remove("fa-times");
      icon.classList.add("fa-bars");
    }
  });
});

/* ===============================
   THEME TOGGLE
   =============================== */
const themeToggle = document.getElementById("themeToggle");
const body = document.body;
const themeIcon = themeToggle.querySelector("i");

// Load saved theme
if (localStorage.getItem("theme") === "light") {
  body.classList.add("light");
  themeIcon.classList.remove("fa-moon");
  themeIcon.classList.add("fa-sun");
}

// Toggle theme
themeToggle.addEventListener("click", () => {
  body.classList.toggle("light");

  if (body.classList.contains("light")) {
    localStorage.setItem("theme", "light");
    themeIcon.classList.remove("fa-moon");
    themeIcon.classList.add("fa-sun");
  } else {
    localStorage.setItem("theme", "dark");
    themeIcon.classList.remove("fa-sun");
    themeIcon.classList.add("fa-moon");
  }
});

/* ===============================
   PARTICLE BACKGROUND
   =============================== */
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let particles = Array.from({ length: 60 }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  r: Math.random() * 1.5 + 0.5,
  v: Math.random() * 0.4 + 0.1
}));

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(p => {
    p.y -= p.v;
    if (p.y < 0) p.y = canvas.height;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    
    // Check theme for color
    if (body.classList.contains("light")) {
        ctx.fillStyle = "rgba(37, 99, 235, 0.2)"; // Blue-600 low opacity
    } else {
        ctx.fillStyle = "rgba(59, 130, 246, 0.4)"; // Blue-500 low opacity
    }
    
    ctx.fill();
  });

  requestAnimationFrame(animateParticles);
}
animateParticles();

/* ===============================
   TYPING EFFECT
   =============================== */
const typingElement = document.getElementById("typing-text");
if (typingElement) {
  const textArray = ["Healthcare Analytics", "Clinical Data", "Patient Outcomes", "EHR Systems"];
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const currentText = textArray[textIndex];
    
    if (isDeleting) {
      typingElement.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingElement.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentText.length) {
      isDeleting = true;
      typeSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % textArray.length;
      typeSpeed = 500; // Pause before new word
    }

    setTimeout(type, typeSpeed);
  }

  type();
}

/* ===============================
   SCROLL SPY & BACK TO TOP
   =============================== */
const backToTopBtn = document.getElementById("backToTop");
const sections = document.querySelectorAll("section");
const navLinksItems = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  // Back to Top
  if (window.scrollY > 300) {
    if (backToTopBtn) backToTopBtn.classList.add("visible");
  } else {
    if (backToTopBtn) backToTopBtn.classList.remove("visible");
  }

  // Scroll Spy
  let current = "";
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - 150) {
      current = section.getAttribute("id");
    }
  });

  navLinksItems.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href").includes(current)) {
      link.classList.add("active");
    }
  });
});

if (backToTopBtn) {
  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
