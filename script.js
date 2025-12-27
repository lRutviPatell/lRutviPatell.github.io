// Typing effect
const roles = [
  "Graduate Student in Health Informatics",
  "Healthcare Data Analytics",
  "AI in Healthcare",
  "Pharm D | Clinical Informatics"
];

let i = 0, j = 0;
const typed = document.getElementById("typed-text");

function type() {
  if (j < roles[i].length) {
    typed.textContent += roles[i][j++];
    setTimeout(type, 80);
  } else {
    setTimeout(erase, 1500);
  }
}

function erase() {
  if (j > 0) {
    typed.textContent = roles[i].slice(0, --j);
    setTimeout(erase, 40);
  } else {
    i = (i + 1) % roles.length;
    setTimeout(type, 80);
  }
}

type();

// Theme toggle
const toggle = document.getElementById("theme-toggle");
toggle.onclick = () => {
  document.body.classList.toggle("light");
};
