const text = [
  "Graduate Student in Health Informatics",
  "Healthcare Data Analytics",
  "AI in Healthcare",
  "Pharm D | Clinical Informatics"
];

let index = 0;
let charIndex = 0;
const speed = 80;
const eraseSpeed = 40;
const delay = 1500;

const typedText = document.getElementById("typed-text");

function typeEffect() {
  if (charIndex < text[index].length) {
    typedText.textContent += text[index].charAt(charIndex);
    charIndex++;
    setTimeout(typeEffect, speed);
  } else {
    setTimeout(eraseEffect, delay);
  }
}

function eraseEffect() {
  if (charIndex > 0) {
    typedText.textContent = text[index].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(eraseEffect, eraseSpeed);
  } else {
    index = (index + 1) % text.length;
    setTimeout(typeEffect, speed);
  }
}

document.addEventListener("DOMContentLoaded", typeEffect);
