const imageInput = document.getElementById("imageInput");
const topTextInput = document.getElementById("topText");
const bottomTextInput = document.getElementById("bottomText");
const downloadBtn = document.getElementById("downloadBtn");
const canvas = document.getElementById("memeCanvas");
const ctx = canvas.getContext("2d");
const themeToggle = document.getElementById("themeToggle");
let darkMode = false;

let uploadedImage;

// Particle Background Initialization
particlesJS("particles-js", {
  particles: {
    number: { value: 50 },
    size: { value: 3 },
    move: { speed: 1 },
    line_linked: { enable: true, color: "#ffffff" },
  },
});

// Theme Toggle
themeToggle.addEventListener("click", () => {
  darkMode = !darkMode;
  document.body.style.background = darkMode
    ? "linear-gradient(to right, #1e3c72, #2a5298)"
    : "linear-gradient(to right, #ff7e5f, #feb47b)";
  document.body.style.color = darkMode ? "#f7f7f7" : "#333";
});

// Handle Image Upload
imageInput.addEventListener("change", (e) => {
  const reader = new FileReader();
  reader.onload = () => {
    const img = new Image();
    img.src = reader.result;
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      uploadedImage = img;
    };
    document.body.style.background = getRandomColor();
  };
  reader.readAsDataURL(e.target.files[0]);
});

// Random Background Color Generator
function getRandomColor() {
  const colors = ["#ff7e5f", "#feb47b", "#1e3c72", "#2a5298", "#00c9ff", "#92fe9d"];
  return colors[Math.floor(Math.random() * colors.length)];
}

// Draw Text on Canvas
function drawText() {
  if (!uploadedImage) return;
  ctx.drawImage(uploadedImage, 0, 0);
  ctx.font = "50px Impact";
  ctx.fillStyle = "white";
  ctx.strokeStyle = "black";
  ctx.lineWidth = 5;
  ctx.textAlign = "center";

  // Top Text
  ctx.fillText(topTextInput.value, canvas.width / 2, 60);
  ctx.strokeText(topTextInput.value, canvas.width / 2, 60);

  // Bottom Text
  ctx.fillText(bottomTextInput.value, canvas.width / 2, canvas.height - 20);
  ctx.strokeText(bottomTextInput.value, canvas.width / 2, canvas.height - 20);
}

// Add Interactions
topTextInput.addEventListener("input", () => {
  drawText();
  animateCanvas();
});

bottomTextInput.addEventListener("input", () => {
  drawText();
  animateCanvas();
});

// Animate Canvas
function animateCanvas() {
  canvas.style.transition = "transform 0.3s ease";
  canvas.style.transform = "scale(1.05)";
  setTimeout(() => {
    canvas.style.transform = "scale(1)";
  }, 300);
}

// Download Meme
downloadBtn.addEventListener("click", () => {
  const link = document.createElement("a");
  link.download = "meme.png";
  link.href = canvas.toDataURL();
  link.click();
});
