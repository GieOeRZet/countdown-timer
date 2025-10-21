const targetDate = new Date(2025, 9, 22, 10, 50, 0); 
const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");
const celebration = document.getElementById("celebration");

// --- Wskazówki zegara ---
const hourHand = document.getElementById("hour-hand");
const minuteHand = document.getElementById("minute-hand");
const secondHand = document.getElementById("second-hand");

// Wirtualny czas zegara (1h = 10s)
let virtualTime = 0; // w sekundach

function animateClock() {
  // Każda sekunda rzeczywista = 1/10 godziny = 360°/12h * 0.1h/s = 3°/s
  // Czyli 1 godzina trwa 10 sekund, więc 12 godzin = 120s.
  virtualTime += 0.016; // ok. 60 FPS => 1s ≈ 60 * 0.016 = 0.96 (poprawka)

  const hours = (virtualTime / 10) % 12; // 1h co 10s
  const minutes = (hours * 60) % 60;
  const seconds = (minutes * 60) % 60;

  const hourDeg = (hours / 12) * 360;
  const minuteDeg = (minutes / 60) * 360;
  const secondDeg = (seconds / 60) * 360;

  hourHand.style.transform = `translate(-50%, -100%) rotate(${hourDeg}deg)`;
  minuteHand.style.transform = `translate(-50%, -100%) rotate(${minuteDeg}deg)`;
  secondHand.style.transform = `translate(-50%, -100%) rotate(${secondDeg}deg)`;

  requestAnimationFrame(animateClock);
}
animateClock();

// --- Licznik odliczania ---
function updateTimer() {
  const now = new Date();
  const diff = targetDate - now;

  if (diff <= 0) {
    document.getElementById("timer").style.display = "none";
    document.querySelector("h1").textContent = "🎉 Czas minął! 🎉";
    celebration.classList.remove("hidden");
    startFireworks();
    clearInterval(interval);
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  daysEl.textContent = days;
  hoursEl.textContent = hours;
  minutesEl.textContent = minutes;
  secondsEl.textContent = seconds;
}

const interval = setInterval(updateTimer, 1000);
updateTimer();

/* 🎆 Prosta animacja fajerwerków */
function startFireworks() {
  const canvas = document.getElementById("fireworks");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];

  function createParticle() {
    const x = Math.random() * canvas.width;
    const y = canvas.height;
    const size = Math.random() * 3 + 2;
    const color = `hsl(${Math.random() * 360}, 100%, 60%)`;
    const speedX = (Math.random() - 0.5) * 5;
    const speedY = Math.random() * -10 - 5;
    particles.push({ x, y, size, color, speedX, speedY });
  }

  function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();
      p.x += p.speedX;
      p.y += p.speedY;
      p.speedY += 0.2;
      if (p.y > canvas.height) particles.splice(i, 1);
    }
  }

  function animate() {
    drawParticles();
    if (Math.random() < 0.2) createParticle();
    requestAnimationFrame(animate);
  }

  animate();
}
